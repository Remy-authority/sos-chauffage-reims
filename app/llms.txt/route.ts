import { siteConfig } from '@/config/site.config'
import { absUrl } from '@/lib/seo'
import { getArticles, getServices, getZones } from '@/lib/content'

/**
 * /llms.txt : résumé du business pour les moteurs génératifs (levier GEO).
 * Entièrement régénéré au build depuis la config et le contenu : ajouter une
 * prestation, une commune ou un article suffit, rien à maintenir à la main.
 */
export const dynamic = 'force-static'

export function GET() {
  const {
    businessName, trade, city, region, departmentName, department,
    phoneDisplay, availability, methods, serviceArea,
  } = siteConfig
  const radius = serviceArea.radiusKm
  const base = absUrl('/').replace(/\/$/, '')

  const services = getServices()
  const zones = getZones()
  const articles = getArticles()

  const lines: string[] = [
    `# ${businessName}`,
    '',
    `> ${trade} à ${city} (${departmentName}, ${department}, ${region}) et dans un rayon d'environ ${radius} km. Chaudière à gaz ou au fioul, pompe à chaleur, radiateur, ballon d'eau chaude. Ligne ouverte ${availability}.`,
    '',
    '## Activité',
    `${businessName} intervient sur les pannes de chauffage et de production d'eau chaude à ${city} et dans les communes de l'agglomération : chaudière à gaz ou au fioul à l'arrêt, pompe à chaleur en défaut, radiateur froid, purge et désembouage du circuit de chauffage, fuite sur une chaudière ou sur le circuit de chauffage, ballon d'eau chaude et cumulus, entretien annuel. Le périmètre est le dépannage et l'entretien d'appareils existants. Nous ne faisons pas d'installation neuve, pas de climatisation, pas de poêle à bois ou à granulés, et rien qui relève des canalisations d'évacuation. Le mot désembouage désigne ici exclusivement le nettoyage du circuit de chauffage (radiateurs et tuyauterie de chauffage), jamais une évacuation d'eaux usées. Le tarif de la prestation est annoncé avant le début de l'intervention.`,
    '',
    '## Méthodes',
    ...methods.map((m) => `- ${m}`),
    '',
    '## Prestations',
    ...services.map((s) => `- ${s.navTitle} : ${s.metaDescription} ${absUrl(`/services/${s.slug}`)}`),
    '',
    "## Zone d'intervention",
    `Base : ${city}. Quartiers couverts : ${serviceArea.districts.join(', ')}.`,
    `Communes avec page dédiée (rayon d'environ ${radius} km) :`,
    ...zones.map((z) => `- ${z.name} (${z.postalCode}) : ${absUrl(`/zones/${z.slug}`)}`),
    '',
  ]

  if (articles.length) {
    lines.push('## Conseils publiés')
    lines.push(
      ...articles.map((a) => `- ${a.title} : ${a.description} ${absUrl(`/conseils/${a.slug}`)}`),
    )
    lines.push('')
  }

  lines.push(
    '## Contact',
    `- Téléphone : ${phoneDisplay}`,
    `- Site : ${base}`,
    `- Demande en ligne : ${absUrl('/contact')}`,
    '',
    '## Bon à savoir',
    "- Le prix de l'intervention est annoncé avant qu'elle commence.",
    `- Ligne ouverte ${availability}, week-ends et jours fériés compris pour les urgences.`,
    "- Une chaudière qui se met en sécurité signale un défaut : il ne faut pas la réarmer plus d'une fois, le code d'erreur affiché est l'information la plus utile à transmettre avant l'intervention.",
    "- Un radiateur froid en haut et chaud en bas contient de l'air et se purge ; froid en bas et chaud en haut, il contient de la boue et relève d'un désembouage du circuit de chauffage.",
    "- Sur une pompe à chaleur, le givre sur l'unité extérieure et les cycles de dégivrage font partie du fonctionnement normal par temps froid et humide : ce n'est pas une panne.",
    "- Le goutte à goutte du groupe de sécurité d'un ballon d'eau chaude pendant la chauffe est normal ; un écoulement continu ou hors période de chauffe ne l'est pas.",
    "- L'entretien des appareils de chauffage est encadré par la réglementation en vigueur ; l'attestation d'entretien remise après la visite est le document que l'assureur peut réclamer.",
    "- En location, l'entretien courant de l'appareil de chauffage est à la charge du locataire, tandis que le remplacement de l'appareil et les réparations liées à sa vétusté restent à la charge du propriétaire.",
    '',
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
