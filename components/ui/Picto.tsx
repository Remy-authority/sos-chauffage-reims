/**
 * Picto, un dessin au trait qui se trace dans un bloc `Vivant` (components/ui/Vivant.tsx).
 * Chaque trait peut porter un rôle animé (styles `.vivant` dans app/globals.css) :
 * « sonde » descend, « reecrit » s’efface et se redessine, « goutte » perle, « miel » est
 * tracé en couleur miel. `geste` anime le picto entier (« flotte »).
 */
export type Trait = { d: string; role?: 'sonde' | 'reecrit' | 'goutte' | 'miel' }

export default function Picto({
  traits,
  rang = 0,
  geste,
  viewBox = '0 0 24 24',
  epaisseur = 1.4,
  className,
}: {
  traits: Trait[]
  /** Rang du picto dans son bloc : décale son tracé après celui des précédents. */
  rang?: number
  geste?: 'flotte'
  viewBox?: string
  epaisseur?: number
  className: string
}) {
  return (
    <svg
      className={`overflow-visible ${className}${geste ? ` ${geste}` : ''}`}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={epaisseur}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {traits.map(({ d, role }, j) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className={`trait${role ? ` ${role}` : ''}`}
          style={{ ['--i' as string]: rang, ['--j' as string]: j }}
        />
      ))}
    </svg>
  )
}
