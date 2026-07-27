import { siteConfig } from '@/config/site.config'

/**
 * Identité visuelle du site : un radiateur stylisé (quatre éléments verticaux
 * reliés par leur nourrice basse) surmonté d'une flamme braise. Deux signes,
 * deux lectures : l'appareil qu'on dépanne, et la chaleur qu'il produit.
 *
 * Le bloc-marque bleu flamme reste lisible sur le crème craie comme sur le brun
 * fumé : un seul jeu de couleurs pour tous les fonds. La silhouette tient à
 * 16 px, ce qui en fait aussi un favicon utilisable tel quel (voir app/icon.svg,
 * qui reprend le même tracé en couleurs figées).
 *
 * Le pictogramme est en SVG, le nom en HTML : la typographie Fraunces du site
 * s'applique donc réellement au mot-symbole (pas de police système figée).
 */
export function LogoMark({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="14" className="fill-brand-600" />
      {/* Flamme : la chaleur produite. Silhouette à léchée intérieure, et non une
          simple ogive : une ogive se lit comme une goutte d'eau, contresens
          complet sur un site de chauffage (vérifié au rendu avant de figer). */}
      <path
        d="M24 6.2c1.6 4.2 5.7 5.9 5.7 10.1a5.7 5.7 0 0 1-11.4 0c0-2.1 1-3.3 2.1-4.3.3 1.7 1.2 2.4 2.1 2.5-.7-2.7-.7-5.6 1.5-8.3z"
        className="fill-accent-400"
      />
      {/* Radiateur : quatre éléments verticaux. */}
      <g className="fill-sand-50">
        <rect x="11.5" y="22" width="4.2" height="14" rx="2.1" />
        <rect x="18.9" y="22" width="4.2" height="14" rx="2.1" />
        <rect x="26.3" y="22" width="4.2" height="14" rx="2.1" />
        <rect x="33.7" y="22" width="4.2" height="14" rx="2.1" />
      </g>
      {/* Nourrice basse qui relie les éléments. */}
      <rect x="9.5" y="34.6" width="29" height="3.6" rx="1.8" className="fill-sand-50" />
    </svg>
  )
}

export function Logo({
  tone = 'dark',
  className = '',
}: {
  /** `dark` : texte encre sur fond clair. `light` : texte crème sur fond sombre. */
  tone?: 'dark' | 'light'
  className?: string
}) {
  const light = tone === 'light'
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] font-medium tracking-tight ${
            light ? 'text-sand-50' : 'text-ink-950'
          }`}
        >
          SOS Chauffage
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
            light ? 'text-accent-300' : 'text-accent-600'
          }`}
        >
          {siteConfig.city} · {siteConfig.departmentName}
        </span>
      </span>
    </span>
  )
}

export default Logo
