import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Picto from '@/components/ui/Picto'
import { CARTES } from '@/components/ui/pictos-chauffage'
import Vivant from '@/components/ui/Vivant'
import { siteConfig } from '@/config/site.config'
import type { Service } from '@/lib/content'

/**
 * Prestations, sur fond sombre (mise à jour du 29/10/2026, #R67 et #R71) : une carte par
 * prestation, UNE phrase courte, un picto DESSINÉ pour l'appareil qui se trace à l'apparition ;
 * les cartes arrivent une à une, empilées au téléphone, jamais un carrousel. Chaque carte est un
 * lien vers sa page : c'est la porte d'entrée du maillage interne.
 */
export function Services({ services }: { services: Service[] }) {
  const cartes = services.filter((s) => CARTES[s.slug])

  return (
    <section
      id="prestations"
      className="grain relative overflow-hidden bg-gradient-to-b from-fonte-950 via-fonte-900 to-fonte-950 py-12 md:py-20 lg:py-28"
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
          subtitle={`Dépannage chauffage à ${siteConfig.city} : gaz, fioul, pompe à chaleur, circuit.`}
          variant="dark"
        />

        <Vivant as="ul" seuil={0.15} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cartes.map((service, idx) => (
            <li
              key={service.slug}
              className={`apparait${idx === cartes.length - 1 && cartes.length % 2 ? ' md:col-span-2 lg:col-span-1' : ''}`}
              style={{ ['--k' as string]: idx % 3 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col items-center gap-4 rounded-bloc border border-fonte-700/60 bg-fonte-900/50 p-7 text-center transition-colors duration-300 hover:border-flamme-400/50 hover:bg-fonte-800/60 md:flex-row md:items-start md:text-left"
              >
                <Picto
                  traits={CARTES[service.slug].traits}
                  rang={idx % 3}
                  epaisseur={1.4}
                  className="h-11 w-11 shrink-0 text-braise-300"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <h3 className="text-xl leading-snug text-craie-50">{service.navTitle}</h3>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-braise-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-craie-300">{CARTES[service.slug].phrase}</p>
                </div>
              </Link>
            </li>
          ))}
        </Vivant>
      </div>
    </section>
  )
}
