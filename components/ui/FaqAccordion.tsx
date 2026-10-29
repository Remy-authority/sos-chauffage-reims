import { Plus } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { FaqItem } from '@/lib/content'

/**
 * FAQ en volets natifs (`<details>`), tous FERMÉS au chargement (mise à jour du 29/10/2026) :
 * les réponses sont dans le HTML servi, lisibles par Google et les IA, et l'accueil ne montre
 * que les questions (#R67, FAQ fermée non comptée). Sans JavaScript, chaque volet s'ouvre quand même.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <AnimatedSection className="mt-12 space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-bloc border border-craie-200 bg-white/80 transition-colors open:border-braise-300 open:bg-white open:shadow-pose hover:border-craie-300"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left lg:px-8 lg:py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-lg font-medium leading-snug text-fonte-900 group-open:text-fonte-950 lg:text-xl">
              {item.q}
            </h3>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] bg-flamme-600/10 text-flamme-700 transition-transform duration-300 group-open:rotate-45 group-open:bg-braise-500 group-open:text-white"
              aria-hidden="true"
            >
              <Plus size={16} strokeWidth={2.5} />
            </span>
          </summary>
          <p className="px-6 pb-6 leading-relaxed text-craie-600 lg:px-8 lg:pb-8">{item.a}</p>
        </details>
      ))}
    </AnimatedSection>
  )
}
