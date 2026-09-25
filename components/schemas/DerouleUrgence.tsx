import type { SchemasData } from '@/lib/content'
import { SchemaFrame } from './SchemaFrame'

type Data = NonNullable<SchemasData['deroule-urgence']>

/**
 * `deroule-urgence` : les étapes de notre intervention, en frise verticale
 * numérotée (lisible à 390 px, identique sur ordinateur).
 */
export function DerouleUrgence({ data }: { data?: Data }) {
  if (!data?.etapes?.length) return null
  const n = data.etapes.length
  return (
    <SchemaFrame id="deroule-urgence" titre={data.titre} source={data.source}>
      <ol className="relative space-y-4">
        {data.etapes.map((e, i) => (
          <li key={e.titre} className="relative flex gap-4">
            {/* Rail : trait qui relie chaque pastille à la suivante */}
            {i < n - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-5 top-11 h-[calc(100%-1.75rem)] w-0.5 -translate-x-1/2 bg-gradient-to-b from-braise-400 to-flamme-400"
              />
            )}
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-braise-500 font-display text-base font-medium text-white shadow-halo-braise">
              {i + 1}
            </span>
            <div className="flex-1 rounded-bloc border border-craie-200 bg-craie-50 px-4 py-3 sm:px-5 sm:py-4">
              <div className="font-semibold leading-snug text-fonte-950">{e.titre}</div>
              <div className="mt-1 text-sm leading-relaxed text-craie-700">{e.texte}</div>
            </div>
          </li>
        ))}
      </ol>
    </SchemaFrame>
  )
}

export default DerouleUrgence
