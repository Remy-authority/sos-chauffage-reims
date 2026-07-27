import { Euro, Flame, MapPin, Timer } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { siteConfig } from '@/config/site.config'

/**
 * Bandeau de réassurance juste sous le hero. Aucune certification ni chiffre
 * d'activité : uniquement des engagements de fonctionnement, vérifiables.
 */
const items = [
  {
    icon: Timer,
    label: 'Urgence 7j/7',
    description: 'Ligne ouverte week-ends et jours fériés',
  },
  {
    icon: Euro,
    label: 'Prix annoncé avant',
    description: "Le tarif est donné avant l'intervention",
  },
  {
    icon: Flame,
    label: 'Toutes énergies',
    description: 'Gaz, fioul, pompe à chaleur, ballon',
  },
  {
    icon: MapPin,
    label: `${siteConfig.city} et environs`,
    description: `Rayon d'environ ${siteConfig.serviceArea.radiusKm} km`,
  },
]

export function TrustBar() {
  return (
    <section className="relative border-b border-craie-200 bg-craie-50">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, label, description }, i) => (
            <AnimatedSection key={label} delay={i * 0.06} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-flamme-600/10 text-flamme-600">
                <Icon size={22} strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-semibold text-fonte-950">{label}</p>
                <p className="text-xs leading-relaxed text-craie-500">{description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
