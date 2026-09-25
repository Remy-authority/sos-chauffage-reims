import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'
import { LegalPage } from '@/components/layout/LegalPage'

export const metadata: Metadata = buildMetadata({
  title: 'Politique de cookies',
  description: `Utilisation des cookies sur le site ${siteConfig.businessName}.`,
  path: '/politique-cookies',
  noindex: true,
})

export default function PolitiqueCookies() {
  return (
    <LegalPage
      title="Politique de cookies"
      subtitle="Nos pages n'installent ni cookie à visée publicitaire ni outil de suivi appartenant à un tiers."
    >
      <section>
        <h2>Qu&apos;est-ce qu&apos;un cookie</h2>
        <p>
          Le terme désigne un fichier de quelques lignes qu&apos;un site enregistre dans votre
          navigateur pendant votre visite. Il sert par exemple à retenir un choix que vous avez
          fait, ou à rendre possible une fonction technique de la page.
        </p>
      </section>
      <section>
        <h2>Cookies utilisés sur ce site</h2>
        <p>
          Les seuls cookies susceptibles d&apos;être enregistrés ici sont ceux sans lesquels le site ne marcherait pas.
          <strong> Aucun cookie publicitaire, aucun traceur tiers, aucune mesure d&apos;audience</strong>{' '}
          n&apos;est utilisé en l&apos;état.
        </p>
      </section>
      <section>
        <h2>Gérer les cookies</h2>
        <p>
          Les réglages de votre navigateur permettent de bloquer tout cookie, ou d&apos;être prévenu
          chaque fois qu&apos;un site tente d&apos;en enregistrer un. La navigation sur le site reste possible.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question sur ce point :{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </section>
    </LegalPage>
  )
}
