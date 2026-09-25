import Link from 'next/link'
import { ArrowRight, Euro } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { getTarifLignes } from '@/lib/content'

/**
 * Bloc « Prix indicatifs » des prestations et des communes : les lignes de
 * content/tarifs.json désignées par le champ `prix` de la page, puis un lien vers
 * /tarifs, où chaque prix est affiché avec sa source et sa date.
 *
 * C'est, avec le pied de page, le seul endroit d'où /tarifs est relié
 * (jamais dans le menu, jamais dans le bloc 1 : règle Rémy du 18/09/2026).
 */
export function PrixBloc({ ids, lieu }: { ids?: string[]; lieu?: string }) {
  const lignes = getTarifLignes(ids)
  if (!lignes.length) return null

  return (
    <AnimatedSection
      as="section"
      aria-labelledby="prix-indicatifs"
      className="mt-16 rounded-bloc border border-flamme-600/20 bg-white p-6 shadow-pose sm:p-8"
    >
      <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:text-left">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-flamme-600/10 text-flamme-600">
          <Euro size={20} aria-hidden="true" />
        </span>
        <h2 id="prix-indicatifs" className="text-2xl">
          Prix indicatifs{lieu ? ` à ${lieu}` : ''}
        </h2>
      </div>

      <ul className="mt-6 divide-y divide-craie-200 border-y border-craie-200">
        {lignes.map((l) => (
          <li
            key={l.id}
            className="flex flex-col items-center gap-1 py-3 text-center sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:text-left"
          >
            <span className="text-craie-700">{l.poste}</span>
            <span className="shrink-0 font-semibold text-fonte-950">
              {l.prix}
              {l.unite && <span className="ml-1 text-sm font-normal text-craie-500">{l.unite}</span>}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left">
        <span className="text-sm leading-relaxed text-craie-600">
          Des fourchettes relevées dans des sources publiques, pas un devis : nous confirmons le
          prix au téléphone, avant de nous déplacer.
        </span>
        <Link
          href="/tarifs"
          className="group inline-flex shrink-0 items-center gap-2 font-medium text-flamme-600 underline underline-offset-2 hover:text-flamme-500"
        >
          Tous nos tarifs
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </AnimatedSection>
  )
}

export default PrixBloc
