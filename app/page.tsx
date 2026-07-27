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
      {/*
        Ordre des sections, propre à ce site et volontairement différent de celui
        des autres sites du portefeuille. La séquence suit l'ordre des questions
        que se pose quelqu'un dont le chauffage vient de s'arrêter, et non l'ordre
        d'une plaquette de présentation :
          1. vous traitez mon cas → Gallery, la preuve visuelle du métier, tout de suite
          2. qu'est-ce que j'ai   → Symptoms, avant même la grille des prestations
          3. quelle prestation    → Services
          4. vous venez chez moi  → ServiceArea
          5. ça se passe comment  → Process, refermé par sa bande de chiffres
          6. vous êtes qui        → About, une fois rassuré sur l'essentiel
          7. pourquoi vous        → WhyUs, juste avant le formulaire
        Le « qui sommes-nous » passe donc en aval : sur une urgence, il ne vient
        qu'après « pouvez-vous m'aider, et quand ».
        Rythme des fonds : l'alternance clair/sombre est tenue jusqu'au formulaire,
        avec une seule paire sombre assumée, Process et Stats, la bande de chiffres
        étant faite pour refermer le bloc sombre du déroulé. La queue de page
        (formulaire, FAQ) reste claire par nature, et le bandeau CTA rebascule
        sur le sombre pour préparer l'entrée dans le pied de page.
      */}
      <Hero />
      <TrustBar />
      {siteConfig.features.gallery && <Gallery />}
      <Symptoms services={services} />
      <Services services={services} />
      <ServiceArea zones={zones} />
      <Process />
      <Stats />
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
