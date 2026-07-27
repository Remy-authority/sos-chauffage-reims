import { Clock, Phone } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { LiveDot } from '@/components/ui/LiveDot'
import { siteConfig } from '@/config/site.config'

/**
 * Bandeau d'appel à l'action, présent en fin de chaque page. Transition de fond
 * du crème vers le pétrole : c'est lui qui prépare l'entrée dans le footer sombre.
 */
export function CtaBanner({
  title,
  subtitle,
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section
      id="appel"
      className="relative overflow-hidden bg-gradient-to-b from-craie-100 to-fonte-950 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <AnimatedSection className="relative overflow-hidden rounded-cadre border border-flamme-400/25 bg-gradient-to-br from-fonte-900 via-fonte-800 to-fonte-950 p-10 text-center lg:p-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--teinte-braise-500)/0.2),transparent_58%)]"
          />
          <div aria-hidden="true" className="trame absolute inset-0" />

          <div className="relative">
            <LiveDot>Ligne ouverte {siteConfig.availability}</LiveDot>

            <h2 className="mt-7 text-[clamp(2rem,5vw,3.75rem)] leading-[1.06] text-craie-50">
              {title ?? (
                <>
                  Plus de chauffage chez vous ?
                  <br />
                  <span className="titre-braise">Appelez, on décroche.</span>
                </>
              )}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-craie-300">
              {subtitle ??
                "Le type d'appareil et le code affiché suffisent à démarrer. Nous vous disons ce qui est en cause, ce que ça coûte et sous quel délai nous pouvons passer."}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={`tel:${siteConfig.phone}`} variant="braise" size="lg">
                <Phone size={20} strokeWidth={2.5} />
                {siteConfig.phoneDisplay}
              </Button>
              <Button href="/contact#formulaire" variant="voile" size="lg">
                Écrire ma demande
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-craie-400">
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-braise-400" />
                {siteConfig.availability}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-craie-500" aria-hidden="true" />
                Sans engagement
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-craie-500" aria-hidden="true" />
                Prix annoncé avant
              </li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default CtaBanner
