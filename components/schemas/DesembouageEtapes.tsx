import type { SchemasData } from '@/lib/content'
import { SchemaFrame } from './SchemaFrame'

type Data = NonNullable<SchemasData['desembouage-etapes']>

/**
 * `desembouage-etapes` : le circuit se lit de haut en bas comme une canalisation
 * dont l'eau s'éclaircit à chaque étape (rail brun fonte → bleu flamme).
 */
export function DesembouageEtapes({ data }: { data?: Data }) {
  if (!data?.etapes?.length) return null
  return (
    <SchemaFrame id="desembouage-etapes" titre={data.titre} source={data.source}>
      <div className="relative pl-12 sm:pl-14">
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-[1.125rem] top-3 w-3 rounded-full bg-gradient-to-b from-fonte-700 via-braise-400 to-flamme-500 sm:left-[1.375rem]"
        />
        <ol className="space-y-4">
          {data.etapes.map((e, i) => (
            <li key={e.titre} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-12 top-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-fonte-900 font-display text-sm font-medium text-craie-50 shadow-pose sm:-left-14 sm:h-10 sm:w-10"
              >
                {i + 1}
              </span>
              <div className="rounded-bloc border border-craie-200 bg-craie-50 px-4 py-3 sm:px-5 sm:py-4">
                <div className="font-semibold leading-snug text-fonte-950">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {e.titre}
                </div>
                <div className="mt-1 text-sm leading-relaxed text-craie-700">{e.texte}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SchemaFrame>
  )
}

export default DesembouageEtapes
