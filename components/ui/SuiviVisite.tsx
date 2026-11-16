'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * MODÈLE du compteur de visites, SANS DOUBLON (Rémy 13/11/2026). Chaque site le
 * copie tel quel dans `components/ui/SuiviVisite.tsx` à sa mise à jour du
 * formulaire (`tasks/regle-formulaire.md` §8), puis le CEO du site écrit la date
 * du jour dans `compteurSansDoublonLe` de sa fiche Rank OS (`cockpit/data/sites.json`) :
 * avant cette date, Rank OS affiche « environ ».
 *
 * Ce que font les visiteurs (Rémy 18/10/2026) : pour chaque page vue, UNE liste
 * de clés « origine:page:mesure » part vers Rank OS quand le visiteur quitte la
 * page (cockpit `lib/visites.ts`, volet « Visiteurs » et « Formulaire » de la
 * fiche du site). Aucun cookie, aucun identifiant, aucune donnée personnelle,
 * rien de bloquant (`sendBeacon`).
 *
 * SANS DOUBLON : les mesures du formulaire (debut, fh, fb, e2, e3, envoi) partent
 * UNE fois par navigateur et par jour de Paris. Une marque locale du jour
 * (`localStorage`, clé `rr-formulaire-jour`, seulement la date et les mesures
 * déjà parties) l'empêche de recompter la même personne qui change de page,
 * recharge ou revient. Lecture ou écriture refusée (navigation privée, stockage
 * bloqué) : on compte comme avant, par page. Les mesures de lecture (visite,
 * s30, d50, d100, tel) restent comptées par page, comme avant.
 *
 * Origines : pub (gclid, gbraid, wbraid, src=gads ou utm_source=google, retenue
 * pour tout l'onglet), google, bing, ia (ChatGPT, Perplexity, Gemini, Claude,
 * Copilot, Mistral), direct, autre.
 * Pages : accueil, prestation (/services), zone (/zones), conseil (/conseils),
 * contact (/contact, /devis), autre.
 * Mesures : visite, s30 (30 s d'attention, onglet visible), d50 (moitié de la
 * page), d100 (bas de la page), debut (formulaire commencé :
 * `data-clic-formulaire` ou <form>), fh ou fb (le formulaire commencé est dans
 * la moitié HAUTE ou BASSE de la page, envoyé seulement avec un debut), e2 et e3
 * (étape 2 puis 3 atteinte : évènement `rr-etape` de detail 2 ou 3), envoi
 * (demande acceptée par /api/contact), tel (appel).
 *
 * Visite de test (`sessionStorage.visite-test = '1'`) : RIEN ne part. Les clés
 * sont gardées dans `window.__visites` et `sessionStorage['visite-test-cles']`
 * (d'une page à l'autre) pour être lues à la main. Navigateur piloté par un
 * robot (`navigator.webdriver`) hors test : rien ne part non plus.
 * Fichier identique sur tous les sites du portefeuille.
 *
 * FORMULAIRE ABANDONNÉ (Rémy 16/11/2026, `tasks/regle-formulaire.md` §11) : un MAIL à
 * Rémy SEUL (route Rank OS `/api/alertes/abandon`), jamais au partenaire, jamais de SMS,
 * jamais compté comme une demande, RIEN d'affiché au visiteur.
 *  - Téléphone complet tapé (10 chiffres, 9 sur un site .be) et pas d'envoi 60 s après
 *    le dernier geste dans le formulaire, ou départ de la page avant : « Contact à rappeler »
 *    avec tout ce qui est rempli (choix des étapes, champs, page, origine).
 *  - Au moins un choix cliqué (bouton `aria-pressed`, `role=radio` ou `role=option` du
 *    formulaire), sans téléphone, puis départ : « Formulaire abandonné », étape X sur Y
 *    (lue dans le texte « Étape X/Y » du formulaire, sinon `rr-etape`).
 *  - Envoi réussi (/api/contact) après un de ces mails : un mail court « Finalement envoyé ».
 * Un mail par visiteur, par cas et par jour (`localStorage` `rr-abandon`), aucun après un
 * envoi du jour. Lecture générique : champs `input`/`textarea`/`select` nommés du formulaire
 * (titre = son `<label>`), piège `company` et `aria-hidden` ignorés, commune = bouton cliqué
 * dans un `role=group` dont l'`aria-label` dit « commune ». Écartés : robots, localhost,
 * aperçus Vercel sauf un test dont un champ commence par « TEST » ; côté Rank OS, numéros de
 * Rémy et des partenaires, Thaïlande. Visite de test : rien ne part, les envois se lisent
 * dans `window.__abandons` et `sessionStorage['abandon-test']`, attente réglable par
 * `sessionStorage['abandon-delai']` (millisecondes).
 */

const ADRESSE = 'https://cockpit-psi-three.vercel.app/api/alertes/visite'
const FORMULAIRE = '[data-clic-formulaire], form'
const CLE_ORIGINE = 'rr-visite-origine'
const CLE_JOUR = 'rr-formulaire-jour'
const CLE_TEST = 'visite-test-cles'
const IA = /(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|gemini\.google\.com|claude\.ai|copilot\.microsoft\.com|mistral\.ai|you\.com)$/
const ORIGINES = ['pub', 'google', 'bing', 'ia', 'direct', 'autre']
/** Mesures du formulaire : une fois par navigateur et par jour de Paris. */
const UNE_FOIS_PAR_JOUR = ['debut', 'fh', 'fb', 'e2', 'e3', 'envoi']

let surEnvoi: (() => void) | null = null

function enTest(): boolean {
  try {
    return sessionStorage.getItem('visite-test') === '1'
  } catch {
    return false
  }
}

/** Le jour de Paris, « AAAA-MM-JJ ». */
function jourParis(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
}

/** Mesures du formulaire déjà parties aujourd'hui ; `null` si la marque est illisible (on compte alors comme avant). */
function dejaParties(): Set<string> | null {
  try {
    const brut = localStorage.getItem(CLE_JOUR)
    if (!brut) return new Set()
    const marque = JSON.parse(brut) as { j?: unknown; m?: unknown }
    if (marque.j !== jourParis() || !Array.isArray(marque.m)) return new Set()
    return new Set(marque.m.filter((x): x is string => typeof x === 'string'))
  } catch {
    return null
  }
}

function marquer(mesures: Set<string>) {
  try {
    localStorage.setItem(CLE_JOUR, JSON.stringify({ j: jourParis(), m: Array.from(mesures) }))
  } catch {}
}

function envoyer(cles: string[]) {
  if (cles.length === 0) return
  if (enTest()) {
    const w = window as unknown as { __visites?: string[] }
    ;(w.__visites ??= []).push(...cles)
    try {
      const avant = JSON.parse(sessionStorage.getItem(CLE_TEST) ?? '[]') as string[]
      sessionStorage.setItem(CLE_TEST, JSON.stringify([...avant, ...cles]))
    } catch {}
    return
  }
  if (navigator.webdriver) return
  const corps = JSON.stringify({ v: cles })
  try {
    if (navigator.sendBeacon?.(ADRESSE, corps)) return
  } catch {}
  fetch(ADRESSE, { method: 'POST', body: corps, keepalive: true, mode: 'no-cors' }).catch(() => {})
}

/** D'où vient la visite : lue sur la première page, puis retenue pour tout l'onglet. */
function origine(): string {
  try {
    const p = new URLSearchParams(location.search)
    const pub =
      ['gclid', 'gbraid', 'wbraid'].some((k) => p.get(k)) || p.get('src') === 'gads' || /^google$/i.test(p.get('utm_source') ?? '')
    if (pub) {
      sessionStorage.setItem(CLE_ORIGINE, 'pub')
      return 'pub'
    }
    const retenue = sessionStorage.getItem(CLE_ORIGINE)
    if (retenue && ORIGINES.includes(retenue)) return retenue
    let hote = ''
    try {
      hote = new URL(document.referrer).hostname
    } catch {}
    let o = 'autre'
    if (!hote || hote === location.hostname) o = 'direct'
    else if (IA.test(hote)) o = 'ia'
    else if (/(^|\.)google\.[a-z.]+$/.test(hote)) o = 'google'
    else if (/(^|\.)bing\.com$/.test(hote)) o = 'bing'
    sessionStorage.setItem(CLE_ORIGINE, o)
    return o
  } catch {
    return 'autre'
  }
}

// ── Formulaire abandonné (Rémy 16/11/2026) ─────────────────────────────────
const ADRESSE_ABANDON = 'https://cockpit-psi-three.vercel.app/api/alertes/abandon'
const CLE_ABANDON = 'rr-abandon'
const CLE_ABANDON_TEST = 'abandon-test'
const ATTENTE = 60_000
const CHOIX = '[aria-pressed], [role=radio], [role=option]'

type ChampLu = { k: string; l: string; v: string; t: boolean }
const abandon = {
  choix: [] as { e: number; t: string }[],
  champs: new Map<string, ChampLu>(),
  commune: '',
  etape: 1,
  total: 0,
  page: '',
  envoye: false,
  minuteur: 0,
  /** Secours si `localStorage` est illisible. */
  partis: new Set<string>(),
}

/** La boîte du formulaire : l'ancêtre le plus haut qui porte `data-clic-formulaire` (ou un <form>). */
function racine(el: Element): Element | null {
  let r: Element | null = null
  for (let x: Element | null = el; x; x = x.parentElement) if (x.matches(FORMULAIRE)) r = x
  return r
}

/** « Étape 2/3 » ou « Étape 2 sur 3 » écrit dans le formulaire. */
function etapeLue(root: Element): { n: number; total: number } | null {
  const m = /[ÉE]tape\s*(\d)\s*(?:\/|sur)\s*(\d)/i.exec(root.textContent ?? '')
  return m ? { n: Number(m[1]), total: Number(m[2]) } : null
}

function propre(s: string | null | undefined, max: number): string {
  return (s ?? '').replace(/\s+/g, ' ').trim().slice(0, max)
}

function lireChamps(root: Element) {
  root.querySelectorAll('input, textarea, select').forEach((n) => {
    const c = n as HTMLInputElement
    if (['hidden', 'submit', 'button', 'checkbox', 'radio', 'file', 'password'].includes(c.type)) return
    if (c.name === 'company' || c.tabIndex === -1 || c.closest('[aria-hidden="true"]')) return
    const k = c.name || c.id
    if (!k) return
    let l = ''
    try {
      if (c.id) l = root.querySelector(`label[for="${CSS.escape(c.id)}"]`)?.textContent ?? ''
    } catch {}
    l = propre((l || c.closest('label')?.textContent || c.getAttribute('aria-label') || c.placeholder || k).replace(/\(facultatif\)|[*:]/gi, ''), 60)
    const t = c.type === 'tel' || /t[ée]l|phone|portable|mobile/i.test(k)
    abandon.champs.set(k, { k, l, v: propre(c.value, 400), t })
  })
}

/** Le téléphone tapé en entier, sinon `null`. */
function telComplet(): string | null {
  const min = /\.be$/.test(location.hostname) ? 9 : 10
  for (const c of Array.from(abandon.champs.values())) {
    if (c.t && c.v.replace(/\D/g, '').length >= min) return c.v
  }
  return null
}

function partisDuJour(): Set<string> {
  const s = new Set(abandon.partis)
  try {
    const m = JSON.parse(localStorage.getItem(CLE_ABANDON) ?? 'null') as { j?: unknown; m?: unknown } | null
    if (m && m.j === jourParis() && Array.isArray(m.m)) m.m.forEach((x) => typeof x === 'string' && s.add(x))
  } catch {}
  return s
}

function noterParti(cas: string) {
  abandon.partis.add(cas)
  if (enTest()) return
  try {
    localStorage.setItem(CLE_ABANDON, JSON.stringify({ j: jourParis(), m: Array.from(partisDuJour()) }))
  } catch {}
}

function delai(): number {
  if (enTest()) {
    try {
      const n = Number(sessionStorage.getItem('abandon-delai'))
      if (n > 0) return n
    } catch {}
  }
  return ATTENTE
}

function partirAbandon(cas: 'tel' | 'debut' | 'fin') {
  window.clearTimeout(abandon.minuteur)
  const deja = partisDuJour()
  if (deja.has(cas)) return
  if (cas !== 'fin' && (abandon.envoye || deja.has('envoi'))) return
  const champs = Array.from(abandon.champs.values())
  const h = location.hostname
  const test = h.endsWith('.vercel.app') && champs.some((c) => /^test\b/i.test(c.v))
  const corps = {
    cas,
    choix: abandon.choix,
    champs,
    commune: abandon.commune,
    etape: abandon.etape,
    total: abandon.total || undefined,
    page: abandon.page || location.pathname,
    origine: origine(),
    test,
  }
  noterParti(cas)
  if (enTest()) {
    const w = window as unknown as { __abandons?: unknown[] }
    ;(w.__abandons ??= []).push(corps)
    try {
      const avant = JSON.parse(sessionStorage.getItem(CLE_ABANDON_TEST) ?? '[]') as unknown[]
      sessionStorage.setItem(CLE_ABANDON_TEST, JSON.stringify([...avant, corps]))
    } catch {}
    return
  }
  if (navigator.webdriver) return
  if (h === 'localhost' || /^[\d.:]+$/.test(h) || (h.endsWith('.vercel.app') && !test)) return
  const texte = JSON.stringify(corps)
  try {
    if (navigator.sendBeacon?.(ADRESSE_ABANDON, texte)) return
  } catch {}
  fetch(ADRESSE_ABANDON, { method: 'POST', body: texte, keepalive: true, mode: 'no-cors' }).catch(() => {})
}

/** Un geste dans le formulaire : après le rendu, relire l'étape et les champs, relancer les 60 s si le téléphone est complet. */
function suivreFormulaire(root: Element) {
  abandon.page = location.pathname
  window.setTimeout(() => {
    if (root.isConnected) {
      const lue = etapeLue(root)
      if (lue) {
        abandon.etape = lue.n
        abandon.total = lue.total
      }
      lireChamps(root)
    }
    if (abandon.envoye) return
    window.clearTimeout(abandon.minuteur)
    if (telComplet()) abandon.minuteur = window.setTimeout(() => partirAbandon('tel'), delai())
  }, 60)
}

/** Demande partie (/api/contact) : plus aucun mail d'abandon ; « Finalement envoyé » si un mail est déjà parti. */
function abandonEnvoye() {
  abandon.envoye = true
  window.clearTimeout(abandon.minuteur)
  const deja = partisDuJour()
  noterParti('envoi')
  if (deja.has('tel') || deja.has('debut')) partirAbandon('fin')
}

function typePage(chemin: string): string {
  if (chemin === '/') return 'accueil'
  const premier = chemin.split('/')[1]
  if (premier === 'services') return 'prestation'
  if (premier === 'zones') return 'zone'
  if (premier === 'conseils') return 'conseil'
  if (premier === 'contact' || premier === 'devis') return 'contact'
  return 'autre'
}

/**
 * Le formulaire commencé est-il dans la moitié haute (fh) ou basse (fb) de la
 * page ? Un bloc épinglé (scrollytelling du bloc 1) bouge avec le défilement :
 * on mesure alors la place de la section qui le contient, jamais l'écran.
 */
function cotePage(el: Element): 'fh' | 'fb' {
  try {
    let repere: Element = el.closest(FORMULAIRE) ?? el
    for (let x: Element | null = repere; x && x !== document.body; x = x.parentElement) {
      const pos = getComputedStyle(x).position
      if (pos === 'sticky' || pos === 'fixed') repere = x.parentElement ?? x
    }
    const haut = repere.getBoundingClientRect().top + window.scrollY
    return haut < document.documentElement.scrollHeight / 2 ? 'fh' : 'fb'
  } catch {
    return 'fh'
  }
}

export default function SuiviVisite() {
  const chemin = usePathname()

  useEffect(() => {
    const w = window as unknown as { __suiviVisiteFetch?: boolean }
    if (w.__suiviVisiteFetch) return
    w.__suiviVisiteFetch = true
    const fetchOrigine = window.fetch
    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const reponse = await fetchOrigine(...args)
      try {
        const a = args[0]
        const url = typeof a === 'string' ? a : a instanceof URL ? a.href : a.url
        if (reponse.ok && /\/api\/contact\b/.test(url)) {
          surEnvoi?.()
          abandonEnvoye()
        }
      } catch {}
      return reponse
    }
  }, [])

  // Formulaire abandonné : suivi pour tout l'onglet (une navigation interne n'est pas un départ).
  useEffect(() => {
    const auClic = (ev: Event) => {
      const el = ev.target instanceof Element ? ev.target : null
      const root = el && racine(el)
      if (!el || !root) return
      const bouton = el.closest(CHOIX)
      if (bouton && root.contains(bouton)) {
        const t = propre(bouton.textContent, 80)
        const e = etapeLue(root)?.n ?? abandon.etape
        if (t) abandon.choix = [...abandon.choix.filter((c) => c.e < e), { e, t }]
      }
      const groupe = el.closest('[role=group]')
      const btn = el.closest('button')
      if (groupe && btn && /commune/i.test(groupe.getAttribute('aria-label') ?? '')) abandon.commune = propre(btn.textContent, 80)
      suivreFormulaire(root)
    }
    const aLaSaisie = (ev: Event) => {
      const el = ev.target instanceof Element ? ev.target : null
      if (!el?.matches('input, textarea, select')) return
      const root = racine(el)
      if (root) suivreFormulaire(root)
    }
    const aLEtape = (ev: Event) => {
      const n = (ev as CustomEvent<number>).detail
      if (typeof n === 'number' && n >= 1 && n <= 9) abandon.etape = n
    }
    const auDepart = () => {
      if (abandon.envoye) return
      if (telComplet()) partirAbandon('tel')
      else if (abandon.choix.length > 0) partirAbandon('debut')
    }
    const auMasquage = () => {
      if (document.visibilityState === 'hidden') auDepart()
    }
    document.addEventListener('click', auClic, true)
    document.addEventListener('input', aLaSaisie, true)
    document.addEventListener('change', aLaSaisie, true)
    document.addEventListener('visibilitychange', auMasquage)
    window.addEventListener('pagehide', auDepart)
    window.addEventListener('rr-etape', aLEtape)
    return () => {
      document.removeEventListener('click', auClic, true)
      document.removeEventListener('input', aLaSaisie, true)
      document.removeEventListener('change', aLaSaisie, true)
      document.removeEventListener('visibilitychange', auMasquage)
      window.removeEventListener('pagehide', auDepart)
      window.removeEventListener('rr-etape', aLEtape)
    }
  }, [])

  useEffect(() => {
    if (!chemin) return
    const prefixe = `${origine()}:${typePage(chemin)}:`
    const acquises = new Set<string>(['visite'])
    const envoyees = new Set<string>()
    const vider = () => {
      const nouvelles = Array.from(acquises).filter((m) => !envoyees.has(m))
      nouvelles.forEach((m) => envoyees.add(m))
      // Sans doublon : une mesure du formulaire déjà partie aujourd'hui de ce navigateur ne repart pas.
      const parties = dejaParties()
      const aEnvoyer = nouvelles.filter((m) => {
        if (!UNE_FOIS_PAR_JOUR.includes(m) || parties === null) return true
        // Haut ou bas : seulement avec un « debut » qui part lui aussi.
        if (m === 'fh' || m === 'fb') return nouvelles.includes('debut') && !parties.has('debut')
        return !parties.has(m)
      })
      if (parties !== null) {
        const avant = parties.size
        aEnvoyer.forEach((m) => UNE_FOIS_PAR_JOUR.includes(m) && parties.add(m))
        if (parties.size !== avant) marquer(parties)
      }
      envoyer(aEnvoyer.map((m) => prefixe + m))
    }

    // Attention : secondes passées avec l'onglet visible.
    let secondes = 0
    const tic = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      secondes += 1
      if (secondes >= 30) {
        acquises.add('s30')
        window.clearInterval(tic)
      }
    }, 1000)

    // Défilement : profondeur maximale atteinte (une page courte est déjà « en bas »).
    const auDefilement = () => {
      const hauteur = document.documentElement.scrollHeight
      const bas = window.scrollY + window.innerHeight
      if (bas >= hauteur * 0.5) acquises.add('d50')
      if (bas >= hauteur - 40) acquises.add('d100')
    }
    auDefilement()

    // Formulaire commencé (et où sur la page), appel.
    const commence = (el: Element) => {
      if (acquises.has('debut')) return
      acquises.add('debut')
      acquises.add(cotePage(el))
    }
    const auClic = (ev: Event) => {
      const el = ev.target instanceof Element ? ev.target : null
      if (!el) return
      if (el.closest('a[href^="tel:"]')) acquises.add('tel')
      if (el.closest(FORMULAIRE) && el.closest('button, [role=button], [role=radio], [role=option], label, input, textarea, select')) commence(el)
    }
    const aLaSaisie = (ev: Event) => {
      const el = ev.target instanceof Element ? ev.target : null
      if (el?.matches('input, textarea, select') && el.closest(FORMULAIRE)) commence(el)
    }
    surEnvoi = () => acquises.add('envoi')
    const aLEtape = (ev: Event) => {
      const n = (ev as CustomEvent<number>).detail
      if (n === 2 || n === 3) acquises.add(`e${n}`)
    }

    const auMasquage = () => {
      if (document.visibilityState === 'hidden') vider()
    }
    window.addEventListener('scroll', auDefilement, { passive: true })
    window.addEventListener('resize', auDefilement)
    document.addEventListener('click', auClic, true)
    document.addEventListener('focusin', aLaSaisie, true)
    document.addEventListener('visibilitychange', auMasquage)
    window.addEventListener('pagehide', vider)
    window.addEventListener('rr-etape', aLEtape)

    return () => {
      window.clearInterval(tic)
      window.removeEventListener('scroll', auDefilement)
      window.removeEventListener('resize', auDefilement)
      document.removeEventListener('click', auClic, true)
      document.removeEventListener('focusin', aLaSaisie, true)
      document.removeEventListener('visibilitychange', auMasquage)
      window.removeEventListener('pagehide', vider)
      window.removeEventListener('rr-etape', aLEtape)
      surEnvoi = null
      vider()
    }
  }, [chemin])

  return null
}
