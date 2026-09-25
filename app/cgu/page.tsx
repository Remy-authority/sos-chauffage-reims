import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'
import { LegalPage } from '@/components/layout/LegalPage'

export const metadata: Metadata = buildMetadata({
  title: "Conditions générales d'utilisation",
  description: `Conditions générales d'utilisation du site ${siteConfig.businessName}.`,
  path: '/cgu',
  noindex: true,
})

export default function CGU() {
  return (
    <LegalPage
      title="Conditions générales d'utilisation"
      subtitle={`Règles d'usage du site ${siteConfig.businessName}.`}
    >
      <section>
        <h2>1. Acceptation</h2>
        <p>
          Toute navigation sur ce site emporte l&apos;adhésion aux règles d&apos;usage exposées
          ci-dessous. Une personne qui ne les approuve pas doit renoncer à le consulter.
        </p>
      </section>
      <section>
        <h2>2. Objet du site</h2>
        <p>
          Le site présente des prestations de {siteConfig.trade.toLowerCase()} à {siteConfig.city} (
          {siteConfig.departmentName}, {siteConfig.department}) et dans les communes voisines. Les
          informations publiées ont une valeur indicative : seul le devis remis avant intervention
          fait foi sur le contenu et le prix de la prestation.
        </p>
      </section>
      <section>
        <h2>3. Demandes envoyées via le site</h2>
        <p>
          Remplir le formulaire de demande n&apos;engage personne : aucun contrat ni aucune commande
          ne naît de cet envoi. Il ouvre seulement un échange, au terme duquel chacune des deux
          parties reste libre de proposer, d&apos;accepter ou de décliner une prestation.
        </p>
      </section>
      <section>
        <h2>4. Contenus des conseils</h2>
        <p>
          Nos articles de conseils donnent des repères d&apos;ordre général, valables pour la plupart
          des installations mais pas pour chacune. Ils ne remplacent pas un diagnostic sur place.
          Reproduire chez soi un geste qui y est décrit, sans avoir d&apos;abord contrôlé l&apos;état
          réel de son installation, se fait sous sa propre responsabilité : l&apos;éditeur ne répond
          pas des dommages qui en découleraient.
        </p>
      </section>
      <section>
        <h2>5. Responsabilité</h2>
        <p>
          Les informations de ce site sont vérifiées avec soin avant publication, sans que
          l&apos;éditeur puisse promettre qu&apos;elles couvrent tous les cas. Sa responsabilité ne
          peut être recherchée pour un préjudice indirect lié à l&apos;usage du site, ni pour une
          indisponibilité temporaire de celui-ci.
        </p>
      </section>
      <section>
        <h2>6. Droit applicable</h2>
        <p>
          Le droit français s&apos;applique à ces règles d&apos;usage. Un différend né de leur
          application serait porté devant les juridictions françaises.
        </p>
      </section>
    </LegalPage>
  )
}
