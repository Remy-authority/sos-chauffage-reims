import type { Metadata } from 'next'
import legal from '@/content/legal.json'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'
import { LegalPage } from '@/components/layout/LegalPage'

/**
 * Mentions légales, conformité droit français (éditeur identifié).
 * GABARIT piloté par content/legal.json : les champs vides s'affichent
 * « À compléter », jamais une valeur inventée. Page indexable (signal E-E-A-T).
 */
export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description: `Mentions légales de ${siteConfig.businessName}.`,
  path: '/mentions-legales',
})

function V({ children }: { children?: string }) {
  const val = (children || '').trim()
  return val ? <>{val}</> : <em className="not-italic text-braise-600">À compléter</em>
}

export default function MentionsLegales() {
  const e = legal.editeur

  return (
    <LegalPage
      title="Mentions légales"
      subtitle={`Éditeur, hébergeur et conditions d'utilisation du site ${siteConfig.businessName}.`}
    >
      <section>
        <h2>Éditeur du site</h2>
        <ul className="mt-5 space-y-2">
          <li>
            <strong>Dénomination :</strong> <V>{e.raisonSociale}</V>
          </li>
          <li>
            <strong>Forme juridique :</strong> <V>{e.formeJuridique}</V>
          </li>
          <li>
            <strong>Numéro d&apos;immatriculation :</strong> <V>{e.numeroImmatriculation}</V>,{' '}
            <V>{e.registre}</V>
          </li>
          <li>
            <strong>Siège social :</strong> <V>{e.adresse}</V>
          </li>
          <li>
            <strong>Directeur de la publication :</strong> <V>{e.directeurPublication}</V>
          </li>
          {/* Contact : lu depuis la config, jamais dupliqué dans legal.json.
              Le 09 définitif (ligne Twilio) ne se changera qu'à un seul endroit. */}
          <li>
            <strong>Contact :</strong> {siteConfig.email} · {siteConfig.phoneDisplay}
          </li>
        </ul>
      </section>

      <section>
        <h2>Prestataire des interventions</h2>
        <p>
          Les dépannages et entretiens de chauffage proposés sur ce site sont réalisés par une
          entreprise distincte de son éditeur. Dès l&apos;ouverture commerciale du site, cette page
          indiquera l&apos;identité de cet artisan, son assurance et ses qualifications.
        </p>
      </section>

      <section>
        <h2>Assurance professionnelle</h2>
        <p>{legal.assurance.couverture}</p>
        <p>
          <strong>Assureur :</strong> <V>{legal.assurance.assureur}</V> ·{' '}
          <strong>Police n° :</strong> <V>{legal.assurance.police}</V>
        </p>
      </section>

      <section>
        <h2>Hébergeur</h2>
        <p>
          {legal.hebergeur.nom}, {legal.hebergeur.adresse}.{' '}
          <a href={legal.hebergeur.site} rel="noopener noreferrer" target="_blank">
            {legal.hebergeur.site}
          </a>
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Textes, visuels et charte graphique de ce site relèvent du Code de la propriété
          intellectuelle. Les copier, en tout ou en partie, suppose l&apos;accord écrit de
          l&apos;éditeur, obtenu avant toute réutilisation.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des données transmises via le formulaire est décrit dans notre{' '}
          <a href="/politique-confidentialite">politique de confidentialité</a>.
        </p>
      </section>
    </LegalPage>
  )
}
