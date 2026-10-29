import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Picto from '@/components/ui/Picto'
import { CARTES } from '@/components/ui/pictos-chauffage'
import Vivant from '@/components/ui/Vivant'
import { siteConfig } from '@/config/site.config'
import type { Service } from '@/lib/content'

/**
 * Photo de chaque carte : l'appareil en entier, compris en trois secondes (#R61). Les six
 * photos de l'ancien bloc « situations » reprennent leur prestation : ce bloc les remplace
 * (relecture du 30/10/2026, l'accueil citait trois fois les mêmes pannes).
 */
const PHOTOS: Record<string, { src: string; alt: string }> = {
  'urgence-depannage-chauffage-chaudiere': {
    src: '/services/urgence-depannage-chauffage-chaudiere.jpg',
    alt: 'Buanderie avec une chaudière murale et une caisse à outils ouverte au sol',
  },
  'depannage-chaudiere-gaz': {
    src: '/gallery/01-chaudiere-gaz-murale.jpg',
    alt: 'Chaudière murale à gaz ouverte, écran de contrôle allumé',
  },
  'depannage-chaudiere-fioul': {
    src: '/gallery/02-bruleur-fioul.jpg',
    alt: 'Brûleur de chaudière au fioul déposé sur un établi de chaufferie',
  },
  'depannage-pompe-a-chaleur': {
    src: '/gallery/03-pompe-a-chaleur.jpg',
    alt: "Unité extérieure de pompe à chaleur posée le long d'une maison",
  },
  'radiateur-froid-desembouage-purge': {
    src: '/gallery/04-purge-radiateur.jpg',
    alt: 'Purgeur de radiateur ouvert avec un verre posé dessous',
  },
  'fuite-chaudiere-circuit-chauffage': {
    src: '/services/fuite-chaudiere-circuit-chauffage.jpg',
    alt: 'Raccords en cuivre sous une chaudière murale, bassine posée au sol',
  },
  'ballon-eau-chaude-cumulus': {
    src: '/gallery/06-ballon-eau-chaude.jpg',
    alt: "Local technique : groupe de sécurité raccordé à un ballon d'eau chaude",
  },
  'entretien-chaudiere-annuel': {
    src: '/services/entretien-chaudiere-annuel.jpg',
    alt: "Mains gantées qui démontent le brûleur d'une chaudière murale ouverte",
  },
  'depannage-climatisation': {
    src: '/services/depannage-climatisation.jpg',
    alt: 'Séjour lumineux, unité murale de climatisation au-dessus du canapé',
  },
}

/**
 * Prestations, bloc 2 sur fond sombre (mise à jour du 29/10/2026, #R67 et #R71) : une carte
 * photo par prestation, UNE phrase courte, un picto DESSINÉ qui se trace à l'apparition. Sur
 * ordinateur, l'urgence occupe la grande case et les huit autres l'entourent ; au téléphone,
 * les cartes arrivent une à une, empilées, jamais un carrousel. Chaque carte mène à sa page :
 * c'est la porte d'entrée du maillage interne.
 */
export function Services({ services }: { services: Service[] }) {
  const cartes = services.filter((s) => CARTES[s.slug] && PHOTOS[s.slug])

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

        <Vivant as="ul" seuil={0.1} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cartes.map((service, idx) => {
            const grande = idx === 0
            const photo = PHOTOS[service.slug]
            return (
              <li
                key={service.slug}
                className={`apparait${grande ? ' md:col-span-2 lg:row-span-2' : ''}`}
                style={{ ['--k' as string]: idx % 3 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-bloc border border-fonte-700/60 ${
                    grande ? 'aspect-[4/3] md:aspect-[16/9] lg:aspect-auto' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={grande ? '(min-width: 1024px) 800px, 100vw' : '(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw'}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-fonte-950 via-fonte-950/55 to-fonte-950/0"
                  />
                  <div
                    className={`relative flex flex-col items-center gap-3 text-center md:flex-row md:items-end md:text-left ${
                      grande ? 'p-6 lg:p-10' : 'p-6'
                    }`}
                  >
                    <Picto
                      traits={CARTES[service.slug].traits}
                      rang={idx % 3}
                      epaisseur={1.4}
                      className={`${grande ? 'h-12 w-12 lg:h-14 lg:w-14' : 'h-10 w-10'} shrink-0 text-braise-300`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-center gap-2 md:justify-start">
                        <h3 className={`${grande ? 'text-2xl lg:text-3xl' : 'text-xl'} leading-snug text-craie-50`}>
                          {service.navTitle}
                        </h3>
                        <ArrowUpRight
                          size={16}
                          aria-hidden="true"
                          className="shrink-0 text-braise-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </div>
                      <p className={`mt-1.5 leading-relaxed text-craie-200 ${grande ? 'text-base lg:text-lg' : 'text-sm'}`}>
                        {CARTES[service.slug].phrase}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </Vivant>
      </div>
    </section>
  )
}
