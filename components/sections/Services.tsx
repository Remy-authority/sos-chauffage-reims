import Link from 'next/link'
import { Check } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import type { Service } from '@/lib/content'

/**
 * Grille des prestations, sur fond sombre. Chaque carte est un lien vers sa page
 * dédiée : c'est la porte d'entrée du maillage interne du site.
 */
export function Services({ services }: { services: Service[] }) {
  return (
    <section
      id="prestations"
      className="grain relative overflow-hidden bg-gradient-to-b from-fonte-950 via-fonte-900 to-fonte-950 py-24 lg:py-32"
      aria-labelledby="prestations-title"
    >
      <div aria-hidden="true" className="trame absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          id="prestations-title"
          eyebrow="Nos prestations"
          title={
            <>
              Chaque appareil
              <br />
              <span className="titre-braise">tombe en panne à sa façon</span>
            </>
          }
          subtitle="Le gaz se met en sécurité, le fioul cale sur son brûleur, la pompe à chaleur souffre dehors, le circuit s'encrasse en silence. Quatre logiques différentes, quatre diagnostics différents."
          variant="dark"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <AnimatedSection key={service.slug} delay={(idx % 3) * 0.1}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-bloc border border-fonte-700/50 bg-fonte-900/45 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-flamme-400/45 hover:bg-fonte-800/60"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-br from-flamme-500/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                />

                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-flamme-500/25 to-flamme-500/5 text-flamme-300 ring-1 ring-flamme-400/25">
                  <ServiceIcon icon={service.icon} className="h-7 w-7" />
                </span>

                <h3 className="mt-8 text-2xl leading-snug text-craie-50">{service.navTitle}</h3>

                <ul className="mt-5 space-y-2.5">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-craie-200">
                      <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-braise-400" />
                      {b}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto pt-8 text-sm font-medium text-braise-400 transition-colors group-hover:text-braise-300">
                  Voir la prestation
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
