import type { ReactNode } from 'react'

/**
 * Pastille « ligne ouverte » : point braise qui pulse dans une puce arrondie.
 * Sert de marqueur de disponibilité dans le hero, le footer et les bandeaux CTA.
 */
export function LiveDot({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-braise-500/30 bg-braise-500/10 px-4 py-2 text-sm text-braise-300 backdrop-blur ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-braise-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-braise-400" />
      </span>
      {children}
    </span>
  )
}
