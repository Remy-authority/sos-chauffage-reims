import type { SchemasData } from '@/lib/content'
import { SchemaFrame } from './SchemaFrame'

type Data = NonNullable<SchemasData['tva-taux']>

/** « 5,5 % » → 5.5 ; illisible → NaN. */
function tauxNombre(t: string): number {
  const m = t.replace(',', '.').match(/\d+(\.\d+)?/)
  return m ? Number(m[0]) : NaN
}

/**
 * `tva-taux` : un taux par ligne, dessiné en barre proportionnelle au taux le plus
 * élevé du tableau (aucune valeur ajoutée : les longueurs viennent des taux lus).
 */
export function TvaTaux({ data }: { data?: Data }) {
  if (!data?.lignes?.length) return null
  const valeurs = data.lignes.map((l) => tauxNombre(l.taux))
  const max = Math.max(...valeurs.filter((v) => Number.isFinite(v)), 0)
  return (
    <SchemaFrame id="tva-taux" titre={data.titre} source={data.source}>
      <ul className="space-y-5">
        {data.lignes.map((l, i) => {
          const v = valeurs[i]
          const largeur = max > 0 && Number.isFinite(v) ? Math.max(8, (v / max) * 100) : 8
          return (
            <li key={`${l.taux}-${l.cas}`}>
              <div className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-right font-display text-2xl font-medium text-flamme-700 sm:w-20 sm:text-3xl">
                  {l.taux}
                </span>
                <span className="relative h-4 flex-1 overflow-hidden rounded-full bg-craie-100">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-flamme-500 to-braise-500"
                    style={{ width: `${largeur}%` }}
                  />
                </span>
              </div>
              <div className="mt-2 pl-0 text-center text-sm leading-relaxed text-craie-700 sm:pl-[5.75rem] sm:text-left">
                {l.cas}
              </div>
            </li>
          )
        })}
      </ul>
    </SchemaFrame>
  )
}

export default TvaTaux
