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
  const zones = getZones()

  return (
    <>
      {/*
        Ordre des sections, propre à ce site. La séquence suit les questions que se
        pose quelqu'un dont le chauffage vient de s'arrêter :
          1. Hero         le métier, la ville, le numéro
          2. TrustBar     les engagements de fonctionnement
          3. Gallery      vous traitez mon cas (bloc 2, texte centré, cartes photo)
          4. Symptoms     qu'est-ce que j'ai (schéma « arbre de panne » + cartes)
          5. Services     quelle prestation
          6. Process      ça se passe comment
          7. Stats        la bande de chiffres qui referme le déroulé
          8. ServiceArea  vous venez chez moi (les 12 communes en liens)
          9. About        vous êtes qui
         10. WhyUs        pourquoi vous
         11. formulaire, 12. FAQ, 13. bandeau d'appel
        Règle du portefeuille (18/09/2026) : les zones couvertes ne sont jamais le
        bloc 2 de l'accueil, elles vont en bloc 7 ou 8. Ici, bloc 8.
        Rythme des fonds (jamais trois sombres d'affilée) :
          sombre, clair, sombre, clair, sombre (Services), clair (Process),
          sombre (Stats, bande courte), clair (ServiceArea, About, WhyUs,
          formulaire, FAQ), puis le bandeau d'appel rebascule sur le sombre
          pour préparer l'entrée dans le pied de page.
      */}
      <Hero />
      <TrustBar />
      {siteConfig.features.gallery && <Gallery />}
      <Symptoms services={services} />
      <Services services={services} />
      <Process />
      <Stats />
      <ServiceArea zones={zones} />
      <About />
      <WhyUs />

      <section id="devis" className="bg-craie-100 py-24 lg:py-32" aria-labelledby="devis-title">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionHeader
            id="devis-title"
            eyebrow="Décrire ma panne"
            title={
              <>
                Trois questions,
                <span className="titre-fonte italic"> et on vous rappelle</span>
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
