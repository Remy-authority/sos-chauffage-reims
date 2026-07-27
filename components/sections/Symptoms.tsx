import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
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
    <section
      id="symptomes"
      className="relative overflow-hidden bg-craie-100 py-24 lg:py-32"
      aria-labelledby="symptomes-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(var(--teinte-braise-500)/0.06),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          id="symptomes-title"
          eyebrow="Du symptôme à la cause"
          title={
            <>
              Vous décrivez ce que vous voyez,
              <br />
              <span className="titre-fonte italic">on vous dit d&apos;où ça vient</span>
            </>
          }
          subtitle="Huit symptômes qui reviennent en boucle pendant la saison de chauffe, et la piste la plus probable derrière chacun. De quoi savoir quoi nous dire au téléphone."
        />

        <ul className="mt-16 grid gap-4 md:grid-cols-2">
          {rows.map((row, idx) => (
            <AnimatedSection key={row.symptom} delay={(idx % 2) * 0.08} as="li">
              <Link
                href={`/services/${row.slug}`}
                className="group flex h-full gap-5 rounded-bloc border border-craie-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-braise-400/45 hover:shadow-pose-forte"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-braise-500/10 text-braise-600 transition-colors group-hover:bg-braise-500/15">
                  <ServiceIcon icon={row.service!.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-medium leading-snug text-fonte-950">
                    {row.symptom}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-craie-600">
                    {row.cause}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-flamme-600 transition-all group-hover:gap-2.5">
                    {row.service!.navTitle}
                    <ArrowUpRight size={15} />
                  </span>
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  )
}
