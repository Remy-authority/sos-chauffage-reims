import { Landmark } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SourceLine } from '@/components/schemas/SchemaFrame'
import type { FaitLocal } from '@/lib/content'

/** Encadré « Repère local » d'une commune : un fait sourcé, avec sa source et sa date. */
export function RepereLocal({ fait, commune }: { fait?: FaitLocal; commune: string }) {
  if (!fait?.texte) return null
  return (
    <AnimatedSection
      as="aside"
      aria-label={`Repère local, ${commune}`}
      className="mb-12 rounded-bloc border-l-4 border-braise-500 bg-white p-6 text-center shadow-pose sm:p-7 lg:text-left"
    >
      <div className="flex flex-col items-center gap-2 lg:flex-row">
        <Landmark size={18} className="text-braise-600" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-braise-600">
          Repère local
        </span>
      </div>
      <div className="mt-3 leading-relaxed text-fonte-900">{fait.texte}</div>
      <SourceLine source={fait.source} className="mt-3" />
    </AnimatedSection>
  )
}

export default RepereLocal
