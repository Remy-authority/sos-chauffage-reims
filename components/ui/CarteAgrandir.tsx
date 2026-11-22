'use client'

import { useRef, useState, type ReactNode } from 'react'

/**
 * Cadre de la carte du secteur (#R60, modèle du site de toiture de Beauvais) : au téléphone et à
 * la tablette, « Agrandir la carte » la grossit 2,5 fois dans un cadre carré qu'on fait défiler du
 * doigt, ouverte sur Reims (cx, cy en fraction de la carte), pour lire chaque nom.
 */
export default function CarteAgrandir({ cx, cy, children }: { cx: number; cy: number; children: ReactNode }) {
  const cadre = useRef<HTMLDivElement>(null)
  const [grande, setGrande] = useState(false)

  function basculer() {
    setGrande((g) => !g)
    requestAnimationFrame(() => {
      const c = cadre.current
      if (c) c.scrollTo({ left: c.scrollWidth * cx - c.clientWidth / 2, top: c.scrollHeight * cy - c.clientHeight / 2 })
    })
  }

  return (
    <div data-grande={grande ? '' : undefined} className="contents">
      <div ref={cadre} className={`carte-cadre rounded-[3px] ${grande ? 'border border-craie-200' : ''}`}>
        <div className="carte-plan">{children}</div>
      </div>
      <button
        type="button"
        onClick={basculer}
        aria-pressed={grande}
        className="mx-auto mt-3 flex min-h-11 items-center gap-2 rounded-[3px] border border-craie-300 bg-white px-4 text-sm font-medium text-fonte-900 transition-colors hover:border-flamme-600 lg:hidden"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4M8 11h6" />
          {!grande && <path d="M11 8v6" />}
        </svg>
        {grande ? 'Réduire la carte' : 'Agrandir la carte pour lire les noms'}
      </button>
    </div>
  )
}
