'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DessinCircuit, animerCircuit, type FormatCircuit } from '@/components/ui/DessinCircuit'

/**
 * CircuitMaison, le bloc 3 de l'accueil (mise à jour du 29/10/2026, scénario validé par Rémy) :
 * le circuit de chauffage de la maison raconté au défilement. Le bloc 1 balaie la photo d'une
 * chaudière ; ici, au contraire, CADRE FIXE et un seul dessin en couleur (DessinCircuit) où les
 * objets changent d'état : l'air purgé, la boue chassée, la pression refaite, puis les radiateurs
 * qui chauffent un à un.
 *
 * - En-tête CENTRÉ dans le flux, puis une scène COLLANTE dans une piste haute (une cale d'une
 *   course par étape, jamais un padding).
 * - ORDINATEUR : étape active, progression et liste à gauche, dessin à droite.
 *   TÉLÉPHONE ET TABLETTE : dessin en haut (cadre vertical), étape active centrée dessous.
 * - REPLI (rendu serveur, « réduire les animations ») : dessin final fixe et les cinq étapes en
 *   liste ; les cinq titres et textes sont dans le HTML serveur.
 * - Moteur : un seul requestAnimationFrame par défilement (écouteur passif), écoute coupée hors
 *   écran ; React ne se rend qu'au changement d'étape.
 */

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const pad2 = (n: number) => String(n).padStart(2, '0')
/** Course de défilement par étape, en hauteur d'écran. */
const COURSE = { ordi: 0.42, mobile: 0.4 }
/** Proportion des deux cadres du dessin (viewBox de DessinCircuit). */
const RAPPORT = { ordi: 1280 / 800, mobile: 760 / 1000 }

/** Les cinq étapes, une phrase chacune (aucun chiffre inventé). */
const ETAPES = [
  { cle: 'froid', titre: 'Des radiateurs restent froids', texte: 'La chaudière tourne, mais l’eau chaude n’arrive pas partout dans la maison.' },
  { cle: 'air', titre: 'L’air est purgé en haut', texte: 'Froid en haut, c’est de l’air : nous ouvrons chaque purgeur, radiateur par radiateur.' },
  { cle: 'boue', titre: 'La boue chassée en bas', texte: 'Froid en bas, c’est de la boue : une pompe de rinçage la sort du circuit.' },
  { cle: 'pression', titre: 'La pression refaite', texte: 'Nous remettons de l’eau jusqu’à la bonne pression, le voyant rouge s’éteint.' },
  { cle: 'chaleur', titre: 'Les pièces chauffent une à une', texte: 'L’eau chaude repart, nous vérifions chaque radiateur, du salon à l’étage.' },
] as const
const N = ETAPES.length

export default function CircuitMaison() {
  const [mode, setMode] = useState<'fixe' | 'anime'>('fixe')
  const [format, setFormat] = useState<FormatCircuit>('ordi')
  const [actif, setActif] = useState(1)
  const pisteRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const carteRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const legendeRef = useRef<HTMLDivElement>(null)
  const barreRef = useRef<HTMLDivElement>(null)
  const fixeRef = useRef<SVGSVGElement>(null)

  /* Choix du rendu : largeur et « réduire les animations ». */
  useIsoLayoutEffect(() => {
    const large = window.matchMedia('(min-width: 1024px)')
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)')
    const maj = () => {
      setFormat(large.matches ? 'ordi' : 'mobile')
      setMode(reduit.matches ? 'fixe' : 'anime')
    }
    maj()
    large.addEventListener('change', maj)
    reduit.addEventListener('change', maj)
    return () => {
      large.removeEventListener('change', maj)
      reduit.removeEventListener('change', maj)
    }
  }, [])

  /* Repli : le dessin final. */
  useIsoLayoutEffect(() => {
    if (mode === 'fixe' && fixeRef.current) animerCircuit(fixeRef.current, N)
  }, [mode, format])

  /* Moteur : mesures et dessin dans un seul requestAnimationFrame par défilement. */
  useIsoLayoutEffect(() => {
    if (mode !== 'anime') return
    const piste = pisteRef.current
    const scene = sceneRef.current
    const carte = carteRef.current
    const svg = svgRef.current
    if (!piste || !scene || !carte || !svg) return
    const ordi = format === 'ordi'
    const rapport = RAPPORT[format]
    let raf = 0
    let proche = true
    let dernier = 0
    let haut = 72
    let largeurFenetre = 0

    const mesurer = () => {
      const vh = window.innerHeight
      const entete = document.querySelector('header')?.getBoundingClientRect().height ?? 72
      const barre = document.querySelector<HTMLElement>('[aria-label="Actions rapides"]')
      const barreBas = barre && getComputedStyle(barre).display !== 'none' ? barre.offsetHeight : 0
      const libre = vh - entete - barreBas
      largeurFenetre = window.innerWidth
      const largeur = carte.parentElement?.clientWidth ?? carte.clientWidth
      const plein = largeur / rapport
      if (ordi) {
        const h = Math.round(clamp(Math.min(libre - 56, plein), 280, 2000))
        carte.style.height = `${h}px`
        carte.style.width = `${Math.round(Math.min(largeur, h * rapport))}px`
        haut = entete + Math.max(0, (libre - scene.offsetHeight) / 2)
      } else {
        const hTexte = (legendeRef.current?.offsetHeight ?? 160) + 16
        const ecart = 12
        const h = Math.round(clamp(libre - 24 - hTexte - ecart, 220, plein))
        carte.style.height = `${h}px`
        carte.style.width = `${Math.round(Math.min(largeur, h * rapport))}px`
        haut = entete + Math.max(8, (libre - (h + ecart + hTexte)) / 2)
      }
      scene.style.top = `${Math.round(haut)}px`
    }

    const calculer = () => {
      raf = 0
      const r = piste.getBoundingClientRect()
      const course = Math.max(1, r.height - scene.offsetHeight)
      const brut = (haut - r.top) / course
      const q = clamp((brut + 0.06) / 0.9) * N
      animerCircuit(svg, q)
      if (barreRef.current) barreRef.current.style.transform = `scaleX(${(q / N).toFixed(4)})`
      const cur = Math.min(N, Math.floor(q) + 1)
      if (cur !== dernier) {
        dernier = cur
        setActif(cur)
      }
    }
    const planifier = () => {
      if (!raf && proche) raf = requestAnimationFrame(calculer)
    }
    const toutRefaire = () => {
      // Téléphone : la barre d'adresse qui se replie change la hauteur, jamais la largeur.
      if (!ordi && window.innerWidth === largeurFenetre) return planifier()
      mesurer()
      planifier()
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        proche = e.isIntersecting
        if (proche) planifier()
      },
      { rootMargin: '25% 0px 25% 0px' },
    )
    obs.observe(piste)
    window.addEventListener('scroll', planifier, { passive: true })
    window.addEventListener('resize', toutRefaire)
    mesurer()
    calculer()
    let vivant = true
    document.fonts?.ready.then(() => {
      if (vivant) {
        mesurer()
        planifier()
      }
    })
    return () => {
      vivant = false
      if (raf) cancelAnimationFrame(raf)
      obs.disconnect()
      window.removeEventListener('scroll', planifier)
      window.removeEventListener('resize', toutRefaire)
      carte.style.removeProperty('height')
      carte.style.removeProperty('width')
      scene.style.removeProperty('top')
    }
  }, [mode, format])

  const entete = (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-braise-600">Radiateurs froids</p>
      <h2 id="titre-circuit" className="mt-3 text-[2rem] leading-[1.1] text-fonte-950 [text-wrap:balance] md:text-5xl">
        Le circuit remis en chauffe
      </h2>
      <p className="mt-4 leading-relaxed text-craie-600 [text-wrap:balance] md:text-lg">
        Faites défiler : la maison passe du froid au chaud, pièce après pièce.
      </p>
    </div>
  )

  /* ── REPLI : dessin final fixe et les cinq étapes en liste ── */
  if (mode === 'fixe') {
    return (
      <section className="bg-craie-50 py-12 md:py-24" aria-labelledby="titre-circuit">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {entete}
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-12">
            <ol className="order-2 space-y-6 lg:order-1" role="list">
              {ETAPES.map((e, i) => (
                <li key={e.cle} className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-start lg:gap-4 lg:text-left">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-braise-500 text-sm font-bold text-white" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-fonte-950 [text-wrap:balance]">{e.titre}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-craie-600 [text-wrap:balance]">{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="order-1 overflow-hidden rounded-[3px] border border-craie-200 bg-white lg:order-2">
              <DessinCircuit format={format} svgRef={fixeRef} className="block h-auto w-full" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* Texte de l'étape active : les cinq textes superposés dans la même case. */
  const phrases = (
    <ol className="grid" role="list">
      {ETAPES.map((e, k) => {
        const on = k + 1 === actif
        return (
          <li
            key={e.cle}
            aria-current={on ? 'step' : undefined}
            className={`[grid-area:1/1] transition-[opacity,transform] duration-300 ease-out ${
              on ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1.5 opacity-0'
            }`}
          >
            <h3 className="font-sans text-xl font-semibold leading-tight text-fonte-950 [text-wrap:balance] lg:text-[1.75rem]">{e.titre}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-craie-600 [text-wrap:balance] lg:mt-3 lg:text-base">{e.texte}</p>
          </li>
        )
      })}
    </ol>
  )

  const progression = (
    <div aria-hidden="true" className="relative h-[3px] w-full bg-craie-200">
      <div ref={barreRef} className="absolute inset-0 origin-left bg-braise-500" style={{ transform: 'scaleX(0)' }} />
      {ETAPES.slice(1).map((_, k) => (
        <span key={k} className="absolute -top-[3px] h-[9px] w-[2px] bg-craie-50" style={{ left: `${((k + 1) / N) * 100}%` }} />
      ))}
    </div>
  )

  const compteur = (taille: 'grand' | 'petit') => (
    <p className="tabular-nums leading-none text-braise-600" aria-hidden="true">
      <span className={taille === 'grand' ? 'text-2xl font-semibold' : 'text-base font-semibold'}>{pad2(actif)}</span>
      <span className="ml-1 text-sm font-medium text-craie-400">/ {pad2(N)}</span>
    </p>
  )

  const carte = (
    <div className="flex w-full flex-col items-center justify-center">
      <div ref={carteRef} className="relative w-full overflow-hidden rounded-[3px] border border-craie-200 bg-white">
        <DessinCircuit format={format} svgRef={svgRef} className="absolute inset-0 block h-full w-full" />
      </div>
    </div>
  )

  const cale = <div aria-hidden="true" style={{ height: `${Math.round(N * COURSE[format] * 100)}vh` }} />

  /* ── ORDINATEUR : étape active et liste à gauche, dessin à droite ── */
  if (format === 'ordi') {
    return (
      <section className="bg-craie-50 pb-16 pt-24" aria-labelledby="titre-circuit">
        <div className="mx-auto max-w-7xl px-10">{entete}</div>
        <div ref={pisteRef} className="relative mt-10">
          <div ref={sceneRef} className="sticky" style={{ top: 72 }}>
            <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,0.62fr)_minmax(0,1.7fr)] items-stretch gap-10 px-10">
              <div ref={legendeRef} className="flex flex-col justify-center gap-6">
                {compteur('grand')}
                {phrases}
                {progression}
                <ol className="grid gap-2" aria-hidden="true">
                  {ETAPES.map((e, k) => (
                    <li
                      key={e.cle}
                      className={`text-sm transition-colors duration-300 ${
                        k + 1 === actif ? 'font-semibold text-fonte-950' : k + 1 < actif ? 'text-craie-600' : 'text-craie-400'
                      }`}
                    >
                      {e.titre}
                    </li>
                  ))}
                </ol>
              </div>
              {carte}
            </div>
          </div>
          {cale}
        </div>
      </section>
    )
  }

  /* ── TÉLÉPHONE ET TABLETTE : dessin en haut, étape active centrée dessous ── */
  return (
    <section className="bg-craie-50 pb-12 pt-14 md:pb-16 md:pt-20" aria-labelledby="titre-circuit">
      <div className="px-6">{entete}</div>
      <div ref={pisteRef} className="relative mt-6">
        <div ref={sceneRef} className="sticky" style={{ top: 72 }}>
          <div className="mx-auto flex max-w-xl flex-col px-4 sm:px-6 md:max-w-3xl">
            {carte}
            <div ref={legendeRef} className="mx-auto mt-3 w-full max-w-md text-center md:max-w-xl">
              {progression}
              <div className="mt-3 flex justify-center">{compteur('petit')}</div>
              <div className="mt-2">{phrases}</div>
            </div>
          </div>
        </div>
        {cale}
      </div>
    </section>
  )
}
