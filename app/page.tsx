import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { getServices } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Symptoms } from '@/components/sections/Symptoms'
import CircuitMaison from '@/components/sections/CircuitMaison'
import { ServiceArea } from '@/components/sections/ServiceArea'
import { PourquoiNous } from '@/components/sections/PourquoiNous'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LeadForm } from '@/components/ui/LeadForm'
import { Faq } from '@/components/ui/Faq'
import { CtaBanner } from '@/components/ui/CtaBanner'

// Requête d'argent en tête (« chauffagiste reims », CLAUDE.md §0). Le title est
// posé en `absolute` : le gabarit « %s, SOS Chauffage Reims » du layout ne doit
// pas l'allonger au-delà de 60 caractères.
const TITLE = `Chauffagiste ${siteConfig.city}, dépannage chaudière d'urgence 7j/7`
const DESC = `Chauffagiste d'urgence à ${siteConfig.city} : chaudière gaz ou fioul en panne, radiateurs froids, plus d'eau chaude. Ligne ouverte 7j/7, prix annoncé avant de commencer.`

export const metadata: Metadata = {
  ...buildMetadata({ title: TITLE, description: DESC, path: '/' }),
  title: { absolute: TITLE },
}

export default function HomePage() {
  const services = getServices()

  return (
    <>
      {/*
        Ordre des sections (mise à jour du 29/10/2026, plan validé par Rémy ; revu le 30/10 après la
        relecture à froid : l'ancien bloc « situations » répétait les prestations, il est fondu dedans).
        Les questions que se pose quelqu'un dont le chauffage vient de s'arrêter, 800 mots visibles au plus (#R67).
          1. Hero          le métier, la ville, le formulaire (scrollytelling de la chaudière)
          2. Services      quelle prestation (carte photo, une phrase, un picto vivant)
          3. CircuitMaison le circuit remis en chauffe (scrollytelling, schéma dessiné)
          4. Symptoms      qu'est-ce que j'ai (volets fermés)
          5. FAQ fermée    ce qu'on nous demande
          6. PourquoiNous  qui êtes-vous, pourquoi vous
          7. ServiceArea   vous venez chez moi (carte des communes, bloc 7 : #R46)
          8. formulaire de fin d'accueil (#R71), 9. bandeau d'appel
        Fonds : photo, sombre, clair, clair foncé, clair vers clair foncé, clair, clair foncé, blanc, sombre.
      */}
      <Hero />
      <Services services={services} />
      <CircuitMaison />
      <Symptoms services={services} />
      <Faq
        items={siteConfig.homeFaq as unknown as { q: string; a: string }[]}
        subtitle={`Ce qu'on nous demande le plus souvent à ${siteConfig.city}.`}
      />

      <PourquoiNous />
      <ServiceArea />

      <section id="devis" className="bg-white py-12 md:py-20 lg:py-28" aria-labelledby="devis-title">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionHeader
            id="devis-title"
            eyebrow="Décrire ma panne"
            title={
              <>
                Quatre questions,
                <span className="titre-fonte italic"> et on vous rappelle</span>
              </>
            }
            subtitle="Quatre réponses suffisent pour une estimation juste."
          />
          <div className="mt-10">
            <LeadForm />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
