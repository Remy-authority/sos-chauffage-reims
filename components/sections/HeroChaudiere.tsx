'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { getImageProps } from 'next/image'
import { DessinChaudiere, animerChaudiere, MIEL, type GeoChaudiere } from '@/components/ui/DessinChaudiere'
import { EVENEMENT_SITUATION } from '@/components/ui/LeadForm'
import {
  CADRAGE_ORDI,
  CHAUDIERE_ORDI,
  CHAUDIERE_TEL,
  ETAPES_CHAUDIERE,
  FIN_CHAUDIERE,
  GRILLE_ORDI,
  PHOTO_CHAUDIERE,
  PHOTO_CHAUDIERE_TEL,
  QUALITE_BLOC1,
  SURTITRE_CHAUDIERE,
  TAILLES_BLOC1,
  VOILE_ORDI,
  VOILE_TELEPHONE,
} from '@/components/sections/chaudiere-reglages'

/**
 * HeroChaudiere, le bloc 1 « le balayage » (scénario validé par Rémy le 29/10/2026, « ok go vas
 * y ») : le dépannage d'une chaudière, en UNE scène sur UNE photo, la buanderie, du début à la fin.
 * Le bloc 3 montre une autre prestation (le circuit de chauffage de la maison) avec une autre animation.
 *
 *  ÉCRAN 1    la chaudière murale, titre, texte, boutons, formulaire.
 *  BALAYAGE   (b0 à b1) texte, voile et formulaire s'effacent en une centaine de pixels ; une ligne
 *             jaune miel traverse la photo de droite à gauche ; derrière elle, le capot de la
 *             chaudière s'efface sur place et montre l'intérieur dessiné (DessinChaudiere) ;
 *             (g0 à g1) la caméra s'approche de la chaudière.
 *  DÉPANNAGE  (c0 à c1) les cinq étapes se jouent dedans : code lu, pression remise, brûleur
 *             rallumé, pièce changée, eau chaude qui repart ; la carte « 02 / 05 » dit l'étape.
 *  (g2)       la caméra recule à sa place.
 *  RETOUR     (r0 à r1) la ligne repart de gauche à droite et rend la photo ; (f0 à f1) l'écran 1
 *             revient tel qu'au début, sur place.
 *
 * Moteur repris de HeroReflet (forage-puits-nord.fr) : piste haute, panneau collant sous l'en-tête,
 * texte et formulaire dans un calque collant de hauteur nulle sur ordinateur ; un seul
 * requestAnimationFrame par défilement (écouteur passif), styles écrits dans le DOM ; la photo et son
 * dessin forment UN calque, posé par transform seul, jamais un bord de photo visible. « Réduire les
 * animations », économie de données ou réseau lent : la version fixe, puis la chaudière ouverte et
 * ses cinq étapes en liste.
 */

type Cle = 'ordi' | 'mobile'
type Limites = { b0: number; b1: number; g0: number; g1: number; c0: number; c1: number; g2: number; r0: number; r1: number; f0: number; f1: number }
type Pose = { s: number; x: number; y: number }

const LIMITES: Record<Cle, Limites> = {
  ordi: { b0: 0.05, b1: 0.21, g0: 0.22, g1: 0.28, c0: 0.3, c1: 0.84, g2: 0.88, r0: 0.88, r1: 0.94, f0: 0.91, f1: 0.97 },
  mobile: { b0: 0.05, b1: 0.21, g0: 0.22, g1: 0.28, c0: 0.3, c1: 0.84, g2: 0.88, r0: 0.88, r1: 0.93, f0: 0.93, f1: 0.98 },
}
const FONDU_PX = 100
const RIEN = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const useEffetAvantPeinture = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lisse = (t: number) => t * t * (3 - 2 * t)

function reseauLent() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  return !!c && (c.saveData === true || ['slow-2g', '2g', '3g'].includes(c.effectiveType ?? ''))
}

const opacite = (el: HTMLElement | null, v: number) => {
  if (!el) return
  el.style.opacity = v.toFixed(3)
  el.style.visibility = v < 0.01 ? 'hidden' : ''
}

/** Pose de la photo : point (cx, cy) du fichier amené en (X, Y) de l'écran, sans jamais montrer un bord. */
function poser(g: GeoChaudiere, W: number, Hp: number, s: number, cx: number, cy: number, X: number, Y: number): Pose {
  return {
    s,
    x: clamp(X - cx * s, W - g.L * s, 0),
    y: clamp(Y - cy * s, Hp - g.H * s, 0),
  }
}

const CSS = `
.hch{--entete:72px;--barre:61px}
@media (min-width:768px){.hch{--barre:0px}}
.hch-piste{position:relative;height:460svh}
.hch-ecran1{min-height:calc(max(calc(100svh - var(--entete)),540px) - var(--barre))}
.hch-panneau{position:sticky;top:var(--entete);height:max(calc(100svh - var(--entete)),540px);overflow:hidden}
.hch-texte{position:sticky;top:var(--entete);height:0;z-index:10;pointer-events:none}
@media (max-width:1023px){.hch-ecran1{justify-content:flex-start}.hch-ecran1::before{content:'';flex:1 1 0}.hch-ecran1::after{content:'';flex:1 1 0}}
@media (min-width:1024px){
.hch-piste{height:520vh}
.hch-panneau{height:max(calc(100vh - var(--entete)),640px)}
.hch-calque{position:absolute;left:0;right:0;top:0;z-index:10;pointer-events:none;height:calc(520vh - max(calc(100vh - var(--entete)),640px))}
.hch-colle{position:sticky;top:var(--entete);height:0}
.hch-cadre{height:max(calc(100vh - var(--entete)),640px)}
.hch-texte{position:static;height:auto;pointer-events:auto}
.hch-ecran1{min-height:0}
}
@keyframes dch-flux{to{stroke-dashoffset:-44}}
.dch-flux{animation:dch-flux 1s linear infinite}
@media (max-width:1023px){.hch [data-c^="e"]{display:none}}
`
export default function HeroChaudiere({
  versionA,
  texte,
  formulaire,
}: {
  /** Le bloc 1, tel quel (rendu serveur, repli). */
  versionA: ReactNode
  /** Colonne texte (sans photo : la séquence pose la sienne dans le panneau). */
  texte: ReactNode
  /** Colonne formulaire (ordinateur). */
  formulaire: ReactNode
}) {
  const [mode, setMode] = useState<'A' | 'B' | 'F'>('A')

  const section = useRef<HTMLElement>(null)
  const piste = useRef<HTMLDivElement>(null)
  const panneau = useRef<HTMLDivElement>(null)
  const texteRef = useRef<HTMLDivElement>(null)
  const zoneTexteRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const voileRef = useRef<HTMLDivElement>(null)
  const calqueOrdi = useRef<HTMLDivElement>(null)
  const calqueTel = useRef<HTMLDivElement>(null)
  const svgOrdi = useRef<SVGSVGElement>(null)
  const svgTel = useRef<SVGSVGElement>(null)
  const carteRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const titreRef = useRef<HTMLParagraphElement>(null)
  const phraseRef = useRef<HTMLParagraphElement>(null)
  const barresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const maj = () => setMode(mq.matches || reseauLent() ? 'F' : 'B')
    maj()
    mq.addEventListener('change', maj)
    return () => mq.removeEventListener('change', maj)
  }, [])

  useEffetAvantPeinture(() => {
    if (mode !== 'B') return
    const sectionEl = section.current!
    const pisteEl = piste.current!
    const panneauEl = panneau.current!
    const grandMq = window.matchMedia('(min-width: 1024px)')
    // La photo paysage dès la tablette : la chaudière verticale y serait trop grande pour le zoom.
    const paysageMq = window.matchMedia('(min-width: 768px)')
    let cle: Cle = grandMq.matches ? 'ordi' : 'mobile'
    let paysage = paysageMq.matches

    let entete = 72
    let W = 0
    let Hp = 0
    let g: GeoChaudiere = CHAUDIERE_ORDI
    // Deux poses du calque : l'écran 1 (repos) et la chaudière vue de près (pendant le dépannage).
    let repos: Pose = { s: 1, x: 0, y: 0 }
    let pres: Pose = repos
    // Course de la ligne, en pixels du fichier : du bord droit visible au bord gauche visible.
    let xD = 0
    let xG = 0

    const mesurer = () => {
      cle = grandMq.matches ? 'ordi' : 'mobile'
      paysage = paysageMq.matches
      const en = document.querySelector('header')
      entete = en ? Math.round(en.getBoundingClientRect().height) : 72
      sectionEl.style.setProperty('--entete', `${entete}px`)
      W = panneauEl.offsetWidth
      Hp = panneauEl.offsetHeight
      g = paysage ? CHAUDIERE_ORDI : CHAUDIERE_TEL
      const cx = (g.x0 + g.x1) / 2
      const cy = (g.y0 + g.y1) / 2
      const carte = carteRef.current
      if (cle === 'ordi') {
        // Comme la version fixe : la chaudière dans la colonne du milieu, entre texte et formulaire.
        const s = Math.max(W / g.L, Hp / g.H) * CADRAGE_ORDI.marge
        repos = poser(g, W, Hp, s, cx, cy, W * CADRAGE_ORDI.centreX, Hp / 2)
        const sp = Math.max(s, Math.min(CADRAGE_ORDI.zoomMax, (CADRAGE_ORDI.hauteurChaudiere * Hp) / (g.y1 - g.y0)))
        pres = poser(g, W, Hp, sp, cx, cy, W * 0.56, Hp * 0.52)
        const bord = Math.max(40, (W - 1280) / 2 + 40)
        if (carte) {
          carte.style.left = `${bord}px`
          carte.style.width = '340px'
        }
      } else {
        const s = Math.max(W / g.L, Hp / g.H)
        repos = poser(g, W, Hp, s, cx, cy, W / 2, Hp / 2)
        if (carte) {
          carte.style.left = ''
          carte.style.width = ''
        }
        // Près : la chaudière entière entre la carte de l'étape et la barre du bas. Tablette : la
        // chaudière est en haut de la photo paysage, la carte passe donc en bas de l'écran.
        const haut = paysage ? 12 : (carte ? carte.offsetTop + carte.offsetHeight : 160) + 12
        const bas = paysage ? (carte ? carte.offsetTop : Hp - 180) - 12 : Hp - 61 - 12
        const sp = clamp((bas - haut) / (g.y1 - g.y0), s, s * 1.25)
        pres = poser(g, W, Hp, sp, cx, cy, W / 2, (haut + bas) / 2)
      }
      const marge = 30 / repos.s
      xD = Math.min(g.L, (W - repos.x) / repos.s) + marge
      xG = Math.max(0, -repos.x / repos.s) - marge
      // Téléphone : le formulaire grandit d'étape en étape ; s'il dépasse la photo à la fin de la
      // scène, la section s'allonge d'autant (jamais de recouvrement du bloc suivant).
      const t = texteRef.current
      const carteForm = t?.querySelector('[role=region]')
      const basForm = t && carteForm ? carteForm.getBoundingClientRect().bottom - t.getBoundingClientRect().top + 24 : 0
      sectionEl.style.paddingBottom = cle === 'mobile' ? `${Math.max(0, Math.ceil(basForm - Hp))}px` : ''
      dernier = -1
    }

    let raf = 0
    let dernier = -1
    let etapeAffichee = -2
    const barres = Array.from(barresRef.current?.querySelectorAll<HTMLElement>('[data-barre]') ?? [])

    const rendre = () => {
      raf = 0
      const rpiste = pisteEl.getBoundingClientRect()
      const course = Math.max(1, rpiste.height - Hp)
      const p = clamp((entete - rpiste.top) / course)
      if (p === dernier) return
      dernier = p
      const L = LIMITES[cle]

      // Téléphone : le texte colle à l'écran tant que dure la scène, puis repart AVEC la photo.
      const zone = zoneTexteRef.current
      if (zone) {
        const lache = cle === 'mobile' && p >= 1
        zone.style.position = lache ? 'absolute' : ''
        zone.style.left = lache ? '0' : ''
        zone.style.right = lache ? '0' : ''
        zone.style.top = lache ? `${pisteEl.offsetTop + pisteEl.offsetHeight - Hp}px` : ''
      }

      // Texte (et formulaire sur ordinateur) : fondu court, puis retour sur place à la fin.
      const f = clamp((p * course) / FONDU_PX)
      const retour = lisse(clamp((p - L.f0) / (L.f1 - L.f0)))
      const opa = Math.max(1 - lisse(f), retour)
      for (const el of cle === 'ordi' ? [texteRef.current, formRef.current] : [texteRef.current]) {
        if (!el) continue
        el.style.opacity = opa.toFixed(3)
        el.style.transform = f > 0 && retour === 0 ? `translateY(${((cle === 'ordi' ? -24 : -16) * lisse(f)).toFixed(1)}px)` : ''
        el.style.visibility = opa < 0.02 ? 'hidden' : ''
        el.style.pointerEvents = opa < 0.6 ? 'none' : ''
      }
      opacite(voileRef.current, opa)

      // La ligne : de droite à gauche à l'aller, de gauche à droite au retour (même découpe).
      let x: number
      let trait = false
      if (p <= L.b0) x = g.L * 2
      else if (p < L.b1) {
        x = xD + (xG - xD) * lisse((p - L.b0) / (L.b1 - L.b0))
        trait = true
      } else if (p <= L.r0) x = -g.L
      else if (p < L.r1) {
        x = xG + (xD - xG) * lisse((p - L.r0) / (L.r1 - L.r0))
        trait = true
      } else x = g.L * 2

      // La caméra s'approche après le balayage et recule avant le retour de la ligne.
      const z = p < L.c1 ? lisse(clamp((p - L.g0) / (L.g1 - L.g0))) : 1 - lisse(clamp((p - L.c1) / (L.g2 - L.c1)))
      const calque = paysage ? calqueOrdi.current : calqueTel.current
      if (calque) {
        const s = repos.s + (pres.s - repos.s) * z
        const tx = repos.x + (pres.x - repos.x) * z
        const ty = repos.y + (pres.y - repos.y) * z
        calque.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,0) scale(${s.toFixed(5)})`
      }

      // Le dépannage : k de 0 à 5, un court palier au début et à la fin de chaque étape.
      const seg = clamp((p - L.c0) / (L.c1 - L.c0)) * 5
      const i = Math.min(4, Math.floor(seg))
      const k = seg >= 5 ? 5 : i + lisse(clamp((seg - i - 0.1) / 0.8))
      const svg = paysage ? svgOrdi.current : svgTel.current
      if (svg) animerChaudiere(svg, x, trait, k, g)

      // Carte de l'étape.
      const fini = p > L.c1
      const etape = fini ? 5 : p < L.c0 ? 0 : i
      if (etape !== etapeAffichee) {
        etapeAffichee = etape
        const e = etape === 5 ? FIN_CHAUDIERE : ETAPES_CHAUDIERE[etape]
        if (numRef.current) numRef.current.textContent = `0${Math.min(5, etape + 1)}`
        if (titreRef.current) titreRef.current.textContent = e.titre
        if (phraseRef.current) phraseRef.current.textContent = e.phrase
      }
      barres.forEach((b, j) => {
        b.style.transform = `scaleX(${clamp(k - j).toFixed(3)})`
      })
      const entree = lisse(clamp((p - (L.c0 - 0.04)) / 0.04))
      // La carte s'efface avant le retour du titre : la fin de la scène est l'écran 1, rien par-dessus.
      const sortie = cle === 'ordi'
        ? 1 - lisse(clamp((p - L.r0) / (L.f0 - L.r0)))
        : 1 - lisse(clamp((p - L.c1) / (L.g2 - L.c1)))
      opacite(carteRef.current, entree * sortie)
    }
    const planifier = () => {
      if (!raf) raf = requestAnimationFrame(rendre)
    }
    const surTaille = () => {
      mesurer()
      planifier()
    }
    // Téléphone : une situation choisie au début de la scène mène tout de suite à sa fin, où le
    // formulaire attend sur la photo (jamais un formulaire qui s'efface pendant la saisie).
    const versLaFin = () => {
      if (cle !== 'mobile') return
      const r = pisteEl.getBoundingClientRect()
      const course = Math.max(1, r.height - Hp)
      if ((entete - r.top) / course >= LIMITES.mobile.f1) return
      window.scrollTo({ top: window.scrollY + r.top - entete + course, behavior: 'instant' as ScrollBehavior })
    }

    mesurer()
    if (svgOrdi.current) animerChaudiere(svgOrdi.current, CHAUDIERE_ORDI.L * 2, false, 0, CHAUDIERE_ORDI)
    if (svgTel.current) animerChaudiere(svgTel.current, CHAUDIERE_TEL.L * 2, false, 0, CHAUDIERE_TEL)
    const ro = new ResizeObserver(surTaille)
    ro.observe(panneauEl)
    if (texteRef.current) ro.observe(texteRef.current)
    window.addEventListener('scroll', planifier, { passive: true })
    window.addEventListener(EVENEMENT_SITUATION, versLaFin)
    grandMq.addEventListener('change', surTaille)
    paysageMq.addEventListener('change', surTaille)
    document.fonts?.ready.then(() => surTaille())
    rendre()
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', planifier)
      window.removeEventListener(EVENEMENT_SITUATION, versLaFin)
      grandMq.removeEventListener('change', surTaille)
      paysageMq.removeEventListener('change', surTaille)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [mode])

  if (mode !== 'B') {
    return (
      <>
        {versionA}
        {mode === 'F' && <ChaudiereFixe />}
      </>
    )
  }

  const { props: ph } = getImageProps({
    src: PHOTO_CHAUDIERE.src,
    alt: '',
    width: PHOTO_CHAUDIERE.largeur,
    height: PHOTO_CHAUDIERE.hauteur,
    quality: QUALITE_BLOC1,
    sizes: TAILLES_BLOC1.ordi,
    priority: true,
  })
  const { props: pt } = getImageProps({
    src: PHOTO_CHAUDIERE_TEL.src,
    alt: '',
    width: PHOTO_CHAUDIERE_TEL.largeur,
    height: PHOTO_CHAUDIERE_TEL.hauteur,
    quality: PHOTO_CHAUDIERE_TEL.qualite,
    sizes: TAILLES_BLOC1.mobile,
    priority: true,
  })
  const CALQUE = 'pointer-events-none absolute left-0 top-0 origin-top-left select-none'
  const IMG = 'absolute inset-0 h-full w-full max-w-none'
  return (
    <section ref={section} id="top" aria-labelledby="titre-hero" data-hero-b="" className="hch relative isolate flex flex-col bg-fonte-950 [overflow-x:clip] lg:block">
      <style>{CSS}</style>
      <div className="hch-calque contents lg:block">
        <div className="hch-colle contents lg:block">
          <div className="hch-cadre contents lg:flex lg:items-center lg:py-14">
            <div className={`contents ${GRILLE_ORDI}`}>
              <div ref={zoneTexteRef} className="hch-texte order-1 lg:col-start-1 lg:flex lg:flex-col lg:justify-center">
                <div ref={texteRef} className="hch-ecran1 pointer-events-auto relative flex flex-col justify-center py-6 will-change-[opacity] lg:block lg:py-0">
                  {texte}
                </div>
              </div>
              {/* Ordinateur seulement : au téléphone, le formulaire est dans la colonne texte. */}
              <div ref={formRef} className="relative z-10 order-3 hidden lg:pointer-events-auto lg:col-start-3 lg:flex lg:flex-col lg:justify-center">
                {formulaire}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={piste} className="hch-piste order-2">
        <div ref={panneau} className="hch-panneau bg-fonte-950">
          {/* La buanderie et l'intérieur de la chaudière : UN calque par format, photo et dessin bougent ensemble. */}
          <div ref={calqueOrdi} aria-hidden="true" className={`${CALQUE} hidden md:block`} style={{ width: CHAUDIERE_ORDI.L, height: CHAUDIERE_ORDI.H }}>
            <picture>
              <source media="(max-width: 767px)" srcSet={RIEN} />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img {...ph} alt="" className={IMG} />
            </picture>
            <DessinChaudiere g={CHAUDIERE_ORDI} id="chaud-o" svgRef={svgOrdi} className="absolute left-0 top-0" style={{ width: CHAUDIERE_ORDI.L, height: CHAUDIERE_ORDI.H }} />
          </div>
          <div ref={calqueTel} aria-hidden="true" className={`${CALQUE} md:hidden`} style={{ width: CHAUDIERE_TEL.L, height: CHAUDIERE_TEL.H }}>
            <picture>
              <source media="(min-width: 768px)" srcSet={RIEN} />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img {...pt} alt="" className={IMG} />
            </picture>
            <DessinChaudiere g={CHAUDIERE_TEL} id="chaud-t" svgRef={svgTel} className="absolute left-0 top-0" style={{ width: CHAUDIERE_TEL.L, height: CHAUDIERE_TEL.H }} />
          </div>
          <div ref={voileRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 lg:hidden" style={{ backgroundImage: VOILE_TELEPHONE }} />
            <div className={`absolute inset-0 hidden lg:block ${VOILE_ORDI}`} />
          </div>

          {/* La carte de l'étape : en haut (à gauche sur ordinateur), la chaudière est au milieu. */}
          <div
            ref={carteRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-3 mx-auto max-w-md rounded-[3px] border border-white/10 bg-fonte-950/90 px-5 py-4 shadow-[0_10px_40px_rgb(0_0_0/0.45)] md:bottom-6 md:top-auto lg:inset-x-auto lg:bottom-auto lg:top-8 lg:mx-0 lg:max-w-none lg:px-7 lg:py-6"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-braise-300">{SURTITRE_CHAUDIERE}</p>
            <p className="mt-2 flex items-baseline gap-2 font-display lg:mt-3">
              <span ref={numRef} className="text-[26px] font-semibold leading-none tabular-nums lg:text-[34px]" style={{ color: MIEL }}>
                01
              </span>
              <span className="text-sm text-white/50">/ 05</span>
            </p>
            <p ref={titreRef} className="mt-2 font-display text-[19px] font-semibold leading-snug text-white lg:mt-3 lg:text-[23px]">
              {ETAPES_CHAUDIERE[0].titre}
            </p>
            <p ref={phraseRef} className="mt-1 min-h-[2.6em] text-[14px] leading-snug [text-wrap:balance] text-white/80 lg:mt-2 lg:text-[15.5px]">
              {ETAPES_CHAUDIERE[0].phrase}
            </p>
            <div ref={barresRef} className="mt-3 grid grid-cols-5 gap-1.5 lg:mt-5">
              {ETAPES_CHAUDIERE.map((e) => (
                <div key={e.court} className="h-[3px] overflow-hidden bg-white/15">
                  <div data-barre="" className="h-full origin-left" style={{ transform: 'scaleX(0)', background: MIEL }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Repli (« réduire les animations », réseau lent) : la chaudière ouverte, dépannée, puis les cinq
 * étapes en liste, sous le bloc 1. Cadre = 1 480 x 1 400 pixels de la photo de l'ordinateur autour
 * de la chaudière, étiquettes comprises.
 */
const CADRE_FIXE = { x: 1177, y: 0, l: 1480, h: 1400 }
export function ChaudiereFixe() {
  const svg = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (svg.current) animerChaudiere(svg.current, -CHAUDIERE_ORDI.L, false, 5, CHAUDIERE_ORDI)
  }, [])
  const { props } = getImageProps({
    src: PHOTO_CHAUDIERE.src,
    alt: PHOTO_CHAUDIERE.alt,
    width: PHOTO_CHAUDIERE.largeur,
    height: PHOTO_CHAUDIERE.hauteur,
    quality: QUALITE_BLOC1,
    sizes: '(min-width: 1024px) 1500px, 300vw',
  })
  const c = CADRE_FIXE
  return (
    <section aria-label="Le dépannage d’une chaudière, en cinq étapes" className="bg-fonte-950 py-10 lg:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-14 lg:px-10">
        <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[3px]" style={{ aspectRatio: `${c.l} / ${c.h}` }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            {...props}
            loading="lazy"
            className="absolute max-w-none"
            style={{
              width: `${(PHOTO_CHAUDIERE.largeur / c.l) * 100}%`,
              height: `${(PHOTO_CHAUDIERE.hauteur / c.h) * 100}%`,
              left: `${(-c.x / c.l) * 100}%`,
              top: `${(-c.y / c.h) * 100}%`,
            }}
          />
          <DessinChaudiere g={CHAUDIERE_ORDI} id="chaud-f" svgRef={svg} viewBox={`${c.x} ${c.y} ${c.l} ${c.h}`} className="absolute inset-0 h-full w-full" />
        </div>
        <ol className="space-y-4">
          {ETAPES_CHAUDIERE.map((e, j) => (
            <li key={e.court} className="flex gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[2px] font-display text-sm font-bold text-fonte-950" style={{ background: MIEL }}>
                {j + 1}
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-white">{e.titre}</p>
                <p className="text-[15px] leading-snug text-white/75 [text-wrap:balance]">{e.phrase}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
