import { Wind } from 'lucide-react'
import type { SchemasData } from '@/lib/content'
import { SchemaFrame } from './SchemaFrame'

type Data = NonNullable<SchemasData['monoxyde']>

/**
 * `monoxyde` : UN chiffre sourcé, en grand, et sa phrase d'explication.
 * Le chiffre vient tel quel de content/schemas.json.
 */
export function Monoxyde({ data }: { data?: Data }) {
  if (!data?.chiffre) return null
  return (
    <SchemaFrame id="monoxyde" titre={data.titre} source={data.source}>
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
          {/* Anneaux d'alerte : le gaz ne se voit pas, il se diffuse */}
          <svg viewBox="0 0 128 128" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="64" cy="64" r="60" className="fill-braise-500/5 stroke-braise-400/40" strokeWidth="2" strokeDasharray="4 6" />
            <circle cx="64" cy="64" r="46" className="fill-braise-500/10 stroke-braise-400/60" strokeWidth="2" />
            <circle cx="64" cy="64" r="32" className="fill-braise-500" />
          </svg>
          <Wind size={30} className="relative text-white" aria-hidden="true" />
        </div>
        <div>
          <div className="font-display text-4xl font-medium leading-none text-braise-600 sm:text-5xl">
            {data.chiffre}
          </div>
          <div className="mt-3 leading-relaxed text-craie-700">{data.texte}</div>
        </div>
      </div>
    </SchemaFrame>
  )
}

export default Monoxyde
