import type { ReactNode } from 'react'
import type { SourceRef } from '@/lib/content'

const MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

/** « 2026-09 » → « septembre 2026 » ; « 2026-09-25 » → « 25 septembre 2026 » ; sinon tel quel. */
export function formatSourceDate(date: string | undefined): string {
  if (!date) return ''
  const m = date.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/)
  if (!m) return date
  const mois = MOIS[Number(m[2]) - 1]
  if (!mois) return date
  return m[3] ? `${Number(m[3])} ${mois} ${m[1]}` : `${mois} ${m[1]}`
}

/** Ligne « Source : nom, date » avec lien externe (nofollow). */
export function SourceLine({ source, className = '' }: { source?: SourceRef; className?: string }) {
  if (!source?.nom) return null
  const date = formatSourceDate(source.date)
  return (
    <div className={`text-xs leading-relaxed text-craie-500 ${className}`}>
      Source :{' '}
      {source.url ? (
        <a
          href={source.url}
          target="_blank"
          rel="nofollow noopener"
          className="font-medium text-flamme-600 underline underline-offset-2 hover:text-flamme-500"
        >
          {source.nom}
        </a>
      ) : (
        source.nom
      )}
      {date && (source.releve ? <>, relevé le {date}</> : <>, {date}</>)}
    </div>
  )
}

/**
 * Cadre commun des schémas : titre, dessin, source dessous. Le titre n'est pas un
 * H2/H3 (il ne doit pas casser la hiérarchie des blocs de la page). Aucun <p> ici :
 * les schémas vivent dans `.texte-page`, dont la règle `.texte-page p` écraserait
 * les tailles de texte du dessin.
 */
export function SchemaFrame({
  titre,
  source,
  children,
  note,
  id,
}: {
  titre?: string
  source?: SourceRef
  children: ReactNode
  note?: ReactNode
  id: string
}) {
  return (
    <figure
      data-schema={id}
      className="not-prose mt-8 rounded-bloc border border-craie-200 bg-white p-5 shadow-pose sm:p-8"
    >
      {titre && (
        <div className="text-center font-display text-lg font-medium leading-snug text-fonte-950 sm:text-xl lg:text-left">
          {titre}
        </div>
      )}
      <div className={titre ? 'mt-6' : ''}>{children}</div>
      {(note || source) && (
        <figcaption className="mt-6 space-y-1 border-t border-craie-200 pt-4 text-center lg:text-left">
          {note && <div className="text-xs leading-relaxed text-craie-500">{note}</div>}
          <SourceLine source={source} />
        </figcaption>
      )}
    </figure>
  )
}
