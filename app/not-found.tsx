import Link from 'next/link'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-b from-fonte-950 via-fonte-900 to-fonte-950 px-6 pb-24 pt-32">
      <div aria-hidden="true" className="trame absolute inset-0" />
      <div className="relative mx-auto max-w-lg text-center">
        <p className="font-display text-7xl font-medium text-braise-400">404</p>
        <h1 className="mt-6 text-3xl text-craie-50 md:text-4xl">Cette page n&apos;existe pas</h1>
        <p className="mt-4 leading-relaxed text-craie-300">
          Le lien est peut-être ancien ou mal recopié. Repartez de l&apos;accueil, ou appelez-nous si
          c&apos;est urgent.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="flamme" size="lg">
            Retour à l&apos;accueil
          </Button>
          <Button href={`tel:${siteConfig.phone}`} variant="voile" size="lg">
            <Phone size={18} strokeWidth={2.5} />
            {siteConfig.phoneDisplay}
          </Button>
        </div>
        <Link
          href="/zones"
          className="mt-8 inline-block text-sm text-craie-400 transition-colors hover:text-braise-300"
        >
          Voir nos zones d&apos;intervention
        </Link>
      </div>
    </section>
  )
}
