import { CalendarCheck, FileCheck2, Flame, ShieldCheck, type LucideIcon } from 'lucide-react'
import type { SchemasData } from '@/lib/content'
import { SchemaFrame } from './SchemaFrame'

type Data = NonNullable<SchemasData['entretien-obligation']>

const ICONES: LucideIcon[] = [CalendarCheck, Flame, FileCheck2, ShieldCheck]

/**
 * `entretien-obligation` : ce que prévoit la règle d'entretien, point par point,
 * en cartes iconographiées (2 colonnes dès la tablette, 1 sur téléphone).
 */
export function EntretienObligation({ data }: { data?: Data }) {
  if (!data?.points?.length) return null
  return (
    <SchemaFrame id="entretien-obligation" titre={data.titre} source={data.source}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {data.points.map((pt, i) => {
          const Icon = ICONES[i % ICONES.length]
          return (
            <li
              key={pt.titre}
              className="flex flex-col items-center gap-3 rounded-bloc border border-flamme-600/15 bg-flamme-600/5 p-4 text-center sm:items-start sm:text-left"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-flamme-600 text-white">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold leading-snug text-fonte-950">{pt.titre}</div>
                <div className="mt-1 text-sm leading-relaxed text-craie-700">{pt.texte}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </SchemaFrame>
  )
}

export default EntretienObligation
