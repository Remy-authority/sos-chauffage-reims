import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Symptoms } from '@/components/sections/Symptoms'
import { Process } from '@/components/sections/Process'
import { Stats } from '@/components/sections/Stats'
import { WhyUs } from '@/components/sections/WhyUs'
import { Gallery } from '@/components/sections/Gallery'
import { ServiceArea } from '@/components/sections/ServiceArea'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LeadForm } from '@/components/ui/LeadForm'
import { Faq } from '@/components/ui/Faq'
import { CtaBanner } from '@/components/ui/CtaBanner'

const TITLE = `Dépannage chauffage et chaudière à ${siteConfig.city}, intervention rapide`
const DESC = `Dépannage de chauffage et de chaudière à ${siteConfig.city} et dans l'agglomération : chaudière gaz ou fioul en panne, pompe à chaleur, radiateur froid, ballon d'eau chaude, entretien annuel. Urgence 7j/7, prix annoncé avant intervention.`

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESC, path: '/' })

export default function HomePage() {
  const services = getServices()
  const zones = getZones()

  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <Services services={services} />
      {/* Table de triage symptôme → cause : section propre à ce site, placée juste
          après la grille des prestations pour rattraper le visiteur qui ne sait pas
          quelle prestation lui correspond. */}
      <Symptoms services={services} />
      <Process />
      <Stats />
      <WhyUs />
      {siteConfig.features.gallery && <Gallery />}
      <ServiceArea zones={zones} />

      <section id="devis" className="bg-sand-100 py-24 lg:py-32" aria-labelledby="devis-title">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionHeader
            id="devis-title"
            eyebrow="Décrire ma panne"
            title={
              <>
                Trois questions,
                <span className="text-gradient-ink italic"> et on vous rappelle</span>
              </>
            }
            subtitle="Le type d'appareil, le code d'erreur affiché et ce que vous avez perdu, le chauffage, l'eau chaude ou les deux : avec ça, notre estimation au téléphone est déjà juste."
          />
          <div className="mt-12">
            <LeadForm />
          </div>
        </div>
      </section>

      <Faq
        items={siteConfig.homeFaq as unknown as { q: string; a: string }[]}
        subtitle={`Urgence, prix, énergies traitées, entretien obligatoire, réparer ou remplacer : ce qu'on nous demande le plus souvent à ${siteConfig.city}.`}
      />

      <CtaBanner />
    </>
  )
}
