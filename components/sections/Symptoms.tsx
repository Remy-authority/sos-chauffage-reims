import Link from 'next/link'
import { ArrowUpRight, Plus } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Picto from '@/components/ui/Picto'
import Vivant from '@/components/ui/Vivant'
import { CARTES } from '@/components/ui/pictos-chauffage'
import type { Service } from '@/lib/content'

/**
 * Section « du symptôme à la cause », propre à ce site.
 *
 * Raison d'être : sur une panne de chauffage, le visiteur ne connaît pas le nom de
 * la prestation dont il a besoin, il connaît son symptôme (« un radiateur reste
 * froid », « plus d'eau chaude »). Cette table de triage fait le pont entre les
 * deux, ce qui sert deux objectifs à la fois : orienter l'utilisateur vers la
 * bonne page, et offrir aux moteurs génératifs des paires question/réponse courtes
 * et autonomes, très citables.
 *
 * Mise à jour du 29/10/2026 : huit volets FERMÉS (`<details>`), le symptôme en titre, la cause et
 * la prestation à l'ouverture ; la cause reste dans le HTML pour Google et les IA, l'accueil ne
 * montre que les symptômes (#R67). Le schéma « arbre de panne » reste sur les pages de prestation.
 *
 * ⚠️ Contenu volontairement prudent : on nomme la piste la plus probable, jamais
 * un diagnostic définitif ni un geste technique dangereux.
 */
const SYMPTOMS: { symptom: string; cause: string; slug: string }[] = [
  {
    symptom: 'Plus de chauffage nulle part',
    cause: "Le générateur s'est arrêté ou sa régulation ne commande plus rien. Le code affiché sur l'appareil indique la famille de défauts, avant toute intervention.",
    slug: 'urgence-depannage-chauffage-chaudiere',
  },
  {
    symptom: 'La chaudière se met en sécurité',
    cause: "Ce n'est pas la panne, c'est la réaction de l'appareil à un défaut : pression trop basse, surchauffe, évacuation des fumées ou allumage. Réarmer plus d'une fois ne règle rien.",
    slug: 'depannage-chaudiere-gaz',
  },
  {
    symptom: 'Le voyant rouge du brûleur est allumé',
    cause: "Sur une installation au fioul, le brûleur a tenté de démarrer sans obtenir de flamme correcte. La cause est souvent en amont : cuve, filtre, ligne d'alimentation.",
    slug: 'depannage-chaudiere-fioul',
  },
  {
    symptom: "L'unité extérieure est couverte de givre",
    cause: "Par temps froid et humide, le givre et les cycles de dégivrage font partie du fonctionnement d'une pompe à chaleur. Le défaut commence quand le givre ne part jamais.",
    slug: 'depannage-pompe-a-chaleur',
  },
  {
    symptom: 'Un radiateur froid en haut, chaud en bas',
    cause: "De l'air s'est accumulé en partie haute. Une purge le règle, suivie d'un contrôle de la pression au manomètre de la chaudière.",
    slug: 'radiateur-froid-desembouage-purge',
  },
  {
    symptom: 'Un radiateur chaud en haut, froid en bas',
    cause: "Ce n'est plus de l'air mais de la boue tassée dans la partie basse. Purger n'y changera rien, c'est le circuit de chauffage qu'il faut nettoyer.",
    slug: 'radiateur-froid-desembouage-purge',
  },
  {
    symptom: 'La pression baisse toutes les semaines',
    cause: "Le circuit perd de l'eau, souvent sans trace visible, ou la soupape évacue à cause d'un vase d'expansion fatigué. Le contrôle à froid puis à chaud départage les deux.",
    slug: 'fuite-chaudiere-circuit-chauffage',
  },
  {
    symptom: "Plus d'eau chaude, mais le chauffage marche",
    cause: "La panne est du côté de la production d'eau chaude : ballon indépendant, ou partie sanitaire d'une chaudière mixte. Deux installations, deux diagnostics.",
    slug: 'ballon-eau-chaude-cumulus',
  },
]

export function Symptoms({ services }: { services: Service[] }) {
  const byslug = new Map(services.map((s) => [s.slug, s]))
  const rows = SYMPTOMS.map((row) => ({ ...row, service: byslug.get(row.slug) })).filter(
    (row) => row.service,
  )

  if (!rows.length) return null

  return (
    <section id="symptomes" className="relative bg-craie-100 py-12 md:py-20 lg:py-28" aria-labelledby="symptomes-title">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          id="symptomes-title"
          eyebrow="Du symptôme à la cause"
          title={
            <>
              Ce que vous voyez,{' '}
              <span className="titre-fonte italic">d&apos;où ça vient</span>
            </>
          }
          subtitle="Ouvrez le symptôme qui ressemble au vôtre."
        />

        <Vivant seuil={0.15} className="mt-12 grid items-start gap-3 md:grid-cols-2">
          {rows.map((row, idx) => (
            <details
              key={row.symptom}
              style={{ ['--k' as string]: idx % 2 }}
              className="apparait group rounded-bloc border border-craie-200 bg-white transition-colors open:border-braise-300 open:shadow-pose hover:border-braise-300"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] bg-braise-500/10 text-braise-600">
                  <Picto traits={CARTES[row.slug]?.traits ?? []} rang={idx % 2} epaisseur={1.5} className="h-6 w-6" />
                </span>
                <h3 className="min-w-0 flex-1 font-display text-lg font-medium leading-snug text-fonte-950">{row.symptom}</h3>
                <Plus
                  size={18}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="shrink-0 text-flamme-600 transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <div className="px-5 pb-5 text-left sm:pl-20">
                <p className="text-sm leading-relaxed text-craie-600">{row.cause}</p>
                <Link
                  href={`/services/${row.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-flamme-600 hover:text-flamme-700"
                >
                  {row.service!.navTitle}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </details>
          ))}
        </Vivant>
      </div>
    </section>
  )
}
