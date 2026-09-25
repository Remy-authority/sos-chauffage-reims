import { getSchemas } from '@/lib/content'
import { ArbrePanne } from './ArbrePanne'
import { CarteCommunes } from './CarteCommunes'
import { DerouleUrgence } from './DerouleUrgence'
import { DesembouageEtapes } from './DesembouageEtapes'
import { EntretienObligation } from './EntretienObligation'
import { Monoxyde } from './Monoxyde'
import { TvaTaux } from './TvaTaux'

/** Identifiants de schémas connus (contrat du 25/09/2026). */
export const SCHEMA_IDS = [
  'arbre-panne',
  'deroule-urgence',
  'entretien-obligation',
  'tva-taux',
  'desembouage-etapes',
  'monoxyde',
  'carte-communes',
] as const

export type SchemaId = (typeof SCHEMA_IDS)[number]

export function isSchemaId(id: string | undefined): id is SchemaId {
  return Boolean(id) && (SCHEMA_IDS as readonly string[]).includes(id as string)
}

/**
 * Registre des schémas : identifiant (champ `schema` d'un bloc) → composant.
 * Données lues dans content/schemas.json. Un identifiant inconnu ne rend rien.
 * `zoneSlug` : commune de la page, mise en valeur sur `carte-communes`.
 */
export function SchemaVisuel({ id, zoneSlug }: { id: string; zoneSlug?: string }) {
  if (!isSchemaId(id)) return null
  const data = getSchemas()
  switch (id) {
    case 'arbre-panne':
      return <ArbrePanne />
    case 'deroule-urgence':
      return <DerouleUrgence data={data['deroule-urgence']} />
    case 'entretien-obligation':
      return <EntretienObligation data={data['entretien-obligation']} />
    case 'tva-taux':
      return <TvaTaux data={data['tva-taux']} />
    case 'desembouage-etapes':
      return <DesembouageEtapes data={data['desembouage-etapes']} />
    case 'monoxyde':
      return <Monoxyde data={data.monoxyde} />
    case 'carte-communes':
      return <CarteCommunes data={data['carte-communes']} zoneSlug={zoneSlug} />
  }
}

export default SchemaVisuel
