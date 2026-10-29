import Picto, { type Trait } from './Picto'
import Vivant from './Vivant'

/**
 * Réassurance du bloc 1, pictos VIVANTS dessinés pour le chauffage (#R71) : chaque picto se trace à
 * l'apparition, puis garde un geste discret. Le devis s'écrit ligne à ligne, la loupe relit la
 * flamme, l'aiguille de l'horloge tourne, le repère flotte. Sans JavaScript ou avec « réduire les
 * animations », les pictos restent dessinés et immobiles (Vivant et Picto, styles `.vivant` dans
 * app/globals.css).
 */
const REASSURANCE: { traits: Trait[]; flotte?: boolean; lignes: [string, string] }[] = [
  {
    traits: [
      { d: 'M5 3.5h14v17H5z' },
      { d: 'M8 8h8', role: 'reecrit' },
      { d: 'M8 11.5h5', role: 'reecrit' },
      { d: 'M15.6 14.4a2.6 2.6 0 1 0 0 3.7' },
      { d: 'M11.6 15.6h3.2M11.6 17h3.2', role: 'miel' },
    ],
    lignes: ['Prix annoncé', 'avant de commencer'],
  },
  {
    traits: [
      { d: 'M10.5 3.5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z' },
      { d: 'm15.6 15.6 4.9 4.9' },
      { d: 'M10.5 7c-1.6 1.8-2.4 3-2.4 4.2a2.4 2.4 0 0 0 4.8 0c0-1.2-.8-2.4-2.4-4.2z', role: 'goutte' },
    ],
    lignes: ['Le défaut lu', 'avant la pièce'],
  },
  {
    traits: [
      { d: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z' },
      { d: 'M12 6.5V12l3.6 2.2', role: 'reecrit' },
      { d: 'M12 3v1.6M21 12h-1.6M12 21v-1.6M3 12h1.6' },
    ],
    lignes: ['Urgences', '24 h/24, 7j/7'],
  },
  {
    traits: [
      { d: 'M12 21.5s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z' },
      { d: 'M12 7.6a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2z' },
    ],
    flotte: true,
    lignes: ['Reims et', '30 km autour'],
  },
]

/** `clair` : sur fond blanc, sous la photo du téléphone (jamais le sombre du formulaire juste dessous). */
export default function ReassuranceVive({ className, clair = false }: { className: string; clair?: boolean }) {
  return (
    <Vivant
      as="ul"
      seuil={0.4}
      className={`grid grid-cols-2 gap-x-4 gap-y-5 text-[13px] leading-snug ${clair ? 'font-medium text-fonte-900' : 'text-craie-100'} sm:text-sm lg:gap-x-6 ${className}`}
    >
      {REASSURANCE.map(({ traits, flotte, lignes }, i) => (
        <li key={lignes.join(' ')} className="flex flex-col items-center gap-2 text-center md:flex-row md:items-start md:gap-3 md:text-left">
          <Picto traits={traits} rang={i} geste={flotte ? 'flotte' : undefined} epaisseur={1.5} className={`h-8 w-8 shrink-0 ${clair ? 'text-braise-600' : 'text-braise-300'}`} />
          <span aria-label={lignes.join(' ')}>
            {lignes.map((l) => (
              <span key={l} aria-hidden="true" className="block whitespace-nowrap">
                {l}
              </span>
            ))}
          </span>
        </li>
      ))}
    </Vivant>
  )
}
