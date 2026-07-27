import type { ReactNode } from 'react'
import { GradientBlob } from '@/components/ui/GradientBlob'

/**
 * Bandeau d'en-tête sombre des pages internes. Reprend le traitement du hero
 * (fond pétrole, grille masquée, halo animé) en version courte : c'est ce qui fait
 * qu'une page zone ou un article restent visuellement dans le même monde que
 * l'accueil, au lieu de repartir sur une page blanche générique.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  children,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  children?: ReactNode
}) {
  return (
    <section className="grain relative overflow-hidden bg-gradient-to-b from-fonte-950 via-fonte-900 to-fonte-950 pb-20 pt-32 lg:pb-24 lg:pt-40">
      <div aria-hidden="true" className="trame absolute inset-0" />
      <GradientBlob className="-right-32 -top-24" color="flamme" size={520} intensity="normal" duration={20} />
      <GradientBlob className="-bottom-20 -left-40" color="braise" size={380} intensity="subtle" duration={16} />

      <div
        className={`relative mx-auto max-w-4xl px-6 lg:px-10 ${
          align === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        {eyebrow && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-braise-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl leading-[1.1] text-craie-50 md:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && (
          <p
            className={`mt-6 text-lg leading-relaxed text-craie-200 md:text-xl ${
              align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            }`}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
