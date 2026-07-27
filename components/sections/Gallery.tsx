import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { siteConfig } from '@/config/site.config'

/**
 * Galerie des situations traitées.
 *
 * ⚠️ Cadrage éditorial : ce ne sont pas des « réalisations » revendiquées (le site
 * n'a pas encore d'historique d'intervention et le CLAUDE.md interdit d'inventer
 * une preuve). Ce sont les cas de figure du métier, présentés comme tels.
 */
const items = [
  {
    src: '/gallery/01-chaudiere-gaz-murale.jpg',
    alt: 'Chaudière murale à gaz ouverte, écran de contrôle allumé',
    title: 'Chaudière à gaz',
    caption: 'Mise en sécurité, pression tombée, allumage qui échoue.',
  },
  {
    src: '/gallery/02-bruleur-fioul.jpg',
    alt: 'Brûleur de chaudière au fioul déposé sur un établi de chaufferie',
    title: 'Brûleur fioul',
    caption: "Gicleur encrassé, filtre colmaté, ligne d'alimentation désamorcée.",
  },
  {
    src: '/gallery/03-pompe-a-chaleur.jpg',
    alt: "Unité extérieure de pompe à chaleur posée le long d'une maison",
    title: 'Pompe à chaleur',
    caption: 'Unité extérieure, dégivrage, régulation mal réglée.',
  },
  {
    src: '/gallery/04-purge-radiateur.jpg',
    alt: "Purgeur de radiateur ouvert avec un récipient posé dessous",
    title: 'Radiateur froid',
    caption: "Froid en haut, c'est de l'air. Froid en bas, c'est de la boue.",
  },
  {
    src: '/gallery/05-manometre-pression.jpg',
    alt: 'Manomètre de chaudière relevé pendant un contrôle de pression',
    title: 'Contrôle de pression',
    caption: 'À froid puis à chaud, pour distinguer fuite et vase fatigué.',
  },
  {
    src: '/gallery/06-ballon-eau-chaude.jpg',
    alt: "Ballon d'eau chaude et son groupe de sécurité dans un local technique",
    title: "Ballon d'eau chaude",
    caption: 'Résistance, thermostat, groupe de sécurité entartré.',
  },
]

export function Gallery() {
  return (
    <section
      className="noise-overlay relative overflow-hidden bg-ink-950 py-24 lg:py-32"
      aria-labelledby="gallery-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgb(var(--c-brand-600)/0.25),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          id="gallery-title"
          eyebrow="Sur le terrain"
          title={
            <>
              Les situations
              <span className="text-gradient-accent"> que nous traitons</span>
            </>
          }
          subtitle={`Six cas de figure qui reviennent tout l'hiver sur l'agglomération de ${siteConfig.city}, et ce qu'on regarde en premier.`}
          variant="dark"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <AnimatedSection
              key={item.src}
              delay={(idx % 3) * 0.08}
              className="group relative overflow-hidden rounded-card border border-ink-700/50"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-900">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-xl font-medium text-sand-50">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-sand-300">{item.caption}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
