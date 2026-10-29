import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CarteCommunes } from '@/components/schemas/CarteCommunes'
import { siteConfig } from '@/config/site.config'

/**
 * Zone d'intervention, bloc 7 de l'accueil (#R46, #R60, mise à jour du 29/10/2026) : la carte
 * DESSINÉE des communes autour de Reims (positions officielles, geo.api.gouv.fr), chaque commune
 * cliquable vers sa page, la liste à côté. Plus de pastilles ni de colonnes de texte (#R67).
 */
export function ServiceArea() {
  const { city, serviceArea } = siteConfig

  return (
    <section id="zone" className="relative bg-craie-100 py-12 md:py-20 lg:py-28" aria-labelledby="zone-title">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionHeader
          id="zone-title"
          eyebrow="Zone d'intervention"
          title={
            <>
              {city} et{' '}
              <span className="titre-fonte italic">son agglomération</span>
            </>
          }
          subtitle={`Chaque commune a sa page. Nous allons jusqu'à ${serviceArea.radiusKm}\u00a0km\u00a0: la vôtre manque ? Un appel suffit.`}
        />

        <AnimatedSection className="mt-12 rounded-bloc border border-craie-200 bg-white p-5 shadow-pose sm:p-8">
          <CarteCommunes nu />
          <div className="mt-6 border-t border-craie-200 pt-5 text-center lg:text-left">
            <Link
              href="/zones"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-flamme-600 hover:text-flamme-700"
            >
              Toutes les zones
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
