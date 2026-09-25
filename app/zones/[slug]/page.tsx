import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { notFound } from 'next/navigation'
import { MapPin, Phone } from 'lucide-react'
import { getServices, getZone, getZones } from '@/lib/content'
import { buildMetadata, jsonLdScript, zoneJsonLd } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { Faq } from '@/components/ui/Faq'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ServiceBlock } from '@/components/ui/ServiceBlock'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { PrixBloc } from '@/components/ui/PrixBloc'
import { RepereLocal } from '@/components/ui/RepereLocal'

export const dynamicParams = false

export function generateStaticParams() {
  return getZones().map((z) => ({ slug: z.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const z = getZone(params.slug)
  if (!z) return {}
  return buildMetadata({
    title: z.metaTitle,
    description: z.metaDescription,
    path: `/zones/${z.slug}`,
  })
}

/**
 * Image de tête : UNIQUE par commune, câblée sur son slug (public/zones/<slug>.jpg).
 * Repli générique (logique template N+1) : si le visuel dédié n'a pas encore été
 * produit pour une nouvelle commune, on retombe sur une image de secours existante
 * plutôt que d'afficher une image cassée au build.
 */
const HERO_FALLBACK = '/zones/zone-rue.jpg'

function getHeroSrc(slug: string): string {
  const dedicated = `/zones/${slug}.jpg`
  const existsOnDisk = existsSync(join(process.cwd(), 'public', 'zones', `${slug}.jpg`))
  return existsOnDisk ? dedicated : HERO_FALLBACK
}

/** Comparaison de noms de communes insensible aux accents, à la casse et aux tirets. */
function cle(nom: string): string {
  return nom
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function ZonePage({ params }: { params: { slug: string } }) {
  const zone = getZone(params.slug)
  if (!zone) notFound()

  const zones = getZones()
  const hero = getHeroSrc(zone.slug)
  // Communes proches : liens vers les pages DU SITE (nom ou slug → page).
  const voisines = zone.neighbours
    .map((n) => ({ nom: n, page: zones.find((z) => cle(z.name) === cle(n) || z.slug === cle(n)) }))
    .filter((v) => v.page?.slug !== zone.slug)

  // Maillage : les prestations les plus probables sur une commune résidentielle.
  const mainServices = getServices()
    .filter((s) =>
      [
        'urgence-depannage-chauffage-chaudiere',
        'depannage-chaudiere-gaz',
        'radiateur-froid-desembouage-purge',
        'ballon-eau-chaude-cumulus',
      ].includes(s.slug),
    )
    .slice(0, 4)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(zoneJsonLd(zone)) }}
      />

      <Breadcrumbs
        items={[
          { name: 'Accueil', path: '/' },
          { name: "Zones d'intervention", path: '/zones' },
          { name: zone.name, path: `/zones/${zone.slug}` },
        ]}
      />

      <section className="grain relative overflow-hidden bg-gradient-to-b from-fonte-950 via-fonte-900 to-fonte-950 py-16 lg:py-20">
        <div aria-hidden="true" className="trame absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="text-center lg:col-span-7 lg:text-left">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-braise-400 lg:justify-start">
              <MapPin size={16} />
              {zone.name} · {zone.postalCode}
            </p>
            <h1 className="mt-5 text-4xl leading-[1.1] text-craie-50 md:text-5xl">{zone.h1}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-craie-200 lg:mx-0">{zone.intro}</p>
            <div className="mt-8">
              <Button href={`tel:${siteConfig.phone}`} variant="braise" size="lg">
                <Phone size={18} strokeWidth={2.5} />
                {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-panneau border border-flamme-400/20 shadow-pose">
              <Image
                src={hero}
                alt={`${siteConfig.trade} à ${zone.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <article className="bg-craie-50 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <RepereLocal fait={zone.fait} commune={zone.name} />

          {/* Visuel de corps : porté par les blocs de CHAQUE commune (image ou schéma),
              plus aucune image partagée entre communes (règle Rémy du 27/07/2026). */}
          <div className="texte-page space-y-10">
            {zone.blocks.map((b) => (
              <ServiceBlock key={b.heading} block={b} zoneSlug={zone.slug} />
            ))}
          </div>

          <PrixBloc ids={zone.prix} lieu={zone.name} />

          <AnimatedSection className="mt-16">
            <h2 className="text-center text-2xl lg:text-left">Nos prestations à {zone.name}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {mainServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-3 rounded-bloc border border-craie-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-flamme-400/40 hover:shadow-pose"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-flamme-600/10 text-flamme-600">
                      <ServiceIcon icon={s.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-fonte-900 group-hover:text-flamme-700">
                      {s.navTitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {voisines.length > 0 && (
            <AnimatedSection className="mt-14">
              {/* « à proximité » et non « limitrophes » : certaines communes de la
                  liste sont voisines sans partager une limite communale. */}
              <h2 className="text-center text-2xl lg:text-left">Autres communes desservies à proximité</h2>
              <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {voisines.map(({ nom, page }) => (
                  <li key={nom}>
                    {page ? (
                      <Link
                        href={`/zones/${page.slug}`}
                        className="inline-flex rounded-full border border-craie-300 bg-white px-4 py-2 text-sm text-craie-700 transition-colors hover:border-flamme-500 hover:text-flamme-700"
                      >
                        {page.name}
                      </Link>
                    ) : (
                      <span className="inline-flex rounded-full border border-craie-200 bg-craie-100 px-4 py-2 text-sm text-craie-600">
                        {nom}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          )}
        </div>
      </article>

      <Faq items={zone.faq} eyebrow={zone.name} />

      <CtaBanner
        title={`Plus de chauffage à ${zone.name} ?`}
        subtitle={`Nous intervenons à ${zone.name} et dans les communes voisines. Donnez-nous le type d'appareil et le code affiché, nous vous annonçons le tarif et un créneau réaliste.`}
      />
    </>
  )
}
