import { Check } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

/**
 * Points clés d'une prestation, en bandeau juste sous la réponse courte.
 * Téléphone : grille régulière de 2 colonnes, icône au-dessus, texte centré (une
 * dernière case seule occupe toute la largeur). Dès 640 px : inchangé (3 colonnes,
 * icône à gauche).
 */
export function ServiceQuickFacts({ bullets }: { bullets: string[] }) {
  if (!bullets?.length) return null

  return (
    <AnimatedSection delay={0.1} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {bullets.map((b) => (
        <div
          key={b}
          className="flex flex-col items-center gap-2 rounded-bloc border border-craie-200 bg-white px-4 py-4 text-center shadow-pose last:odd:col-span-2 sm:flex-row sm:items-start sm:gap-3 sm:px-5 sm:text-left sm:last:odd:col-span-1"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-flamme-600 text-white">
            <Check size={12} strokeWidth={3.5} aria-hidden="true" />
          </span>
          <span className="text-sm font-medium leading-snug text-fonte-900">{b}</span>
        </div>
      ))}
    </AnimatedSection>
  )
}

export default ServiceQuickFacts
