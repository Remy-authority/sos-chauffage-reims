import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'
import { getServices } from '@/lib/content'
import { Faq } from '@/components/ui/Faq'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { PageHeader } from '@/components/layout/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { LeadForm } from '@/components/ui/LeadForm'
import { CtaBanner } from '@/components/ui/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: `Contact chauffagiste ${siteConfig.city}, urgence chaudière 7j/7`,
  description: `Chaudière ou chauffage en panne à ${siteConfig.city} ? Laissez votre demande : nous vous rappelons, situons la panne avec vous et annonçons le prix avant de nous déplacer.`,
  path: '/contact',
})

const infos = [
  { icon: Phone, label: 'Téléphone', value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
  { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Clock, label: 'Disponibilité', value: siteConfig.availability },
  {
    icon: MapPin,
    label: 'Zone',
    value: `${siteConfig.city} et environ ${siteConfig.serviceArea.radiusKm} km autour`,
  },
]

/**
 * FAQ pratique de la page contact (écrite le 25/09/2026) : ce qu'il faut avoir
 * sous la main, le code d'erreur, la zone, la suite donnée au formulaire.
 * Aucun délai ni prix promis.
 */
const contactFaq = [
  {
    q: 'Quels repères noter sur la chaudière avant de téléphoner ?',
    a: "La marque de l'appareil et, si vous la trouvez, sa plaque signalétique, souvent collée sous le capot ou sur le flanc. Jetez aussi un œil au manomètre pour nous donner la pression affichée, et dites-nous ce qui manque : le chauffage, l'eau chaude, ou les deux. Ces trois repères suffisent pour que la conversation porte tout de suite sur la bonne famille de pannes.",
  },
  {
    q: "Un code s'affiche sur la chaudière : comment nous le transmettre ?",
    a: "Recopiez-le exactement, lettres comprises, et précisez s'il clignote ou reste fixe. Attention à ne pas le confondre avec la température réglée, qui s'affiche souvent au même endroit. Un seul réarmement permet de voir si le défaut revient ; au-delà, mieux vaut laisser l'appareil arrêté et nous transmettre le code, c'est lui qui oriente le diagnostic.",
  },
  {
    q: `Jusqu'où vous déplacez-vous autour de ${siteConfig.city} ?`,
    a: `Notre base est ${siteConfig.city} et nous couvrons les communes situées dans un rayon d'environ ${siteConfig.serviceArea.radiusKm} km. Indiquez votre commune dans le formulaire ou dès le début de l'appel : si elle sort de notre secteur, nous vous le disons franchement plutôt que de vous faire attendre.`,
  },
  {
    q: 'Le formulaire est parti : comment se déroule la suite ?',
    a: "Le rappel se fait sur le numéro que vous avez laissé, et il ne repart pas de zéro : nous avons déjà lu la panne choisie, la commune et le degré d'urgence. L'échange sert à vérifier quelques détails sur l'appareil, puis à vous donner le montant de l'intervention ; un passage n'est fixé qu'ensuite, et seulement si ce montant vous convient. Gardez votre téléphone à portée de main, et si de l'eau s'écoule, coupez l'appareil sans attendre notre appel.",
  },
]

export default function ContactPage() {
  const services = getServices()
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Dites-nous ce qui
            <span className="titre-braise"> ne chauffe plus</span>
          </>
        }
        subtitle="Une panne qui ne peut pas attendre se règle au téléphone. Pour le reste, le formulaire suffit."
      />

      <section className="bg-craie-50 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <AnimatedSection className="text-center lg:text-left">
              <h2 className="text-3xl">Nous joindre</h2>
              <p className="mt-4 leading-relaxed text-craie-600">
                Un logement qui ne chauffe plus en plein hiver ne se décrit pas bien par écrit.
                Au téléphone, nous posons les bonnes questions en direct et vous indiquons dans la foulée
                quoi couper et quoi laisser en marche jusqu&apos;à notre passage.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="mt-8 space-y-3">
              {infos.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-bloc border border-craie-200 bg-white p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-flamme-600/10 text-flamme-600">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-craie-500">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block break-all font-medium text-fonte-950 transition-colors hover:text-flamme-600"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-fonte-950">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="mt-8">
              <Button href={`tel:${siteConfig.phone}`} variant="braise" size="lg" className="w-full">
                <Phone size={18} strokeWidth={2.5} />
                Appeler maintenant
              </Button>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-7">
            <div id="formulaire" className="scroll-mt-28">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Les 9 prestations, pour qu'une visite sur /contact ne soit jamais un cul-de-sac */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="contact-prestations">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 id="contact-prestations" className="text-3xl leading-snug md:text-4xl">
              Pour quelle panne nous contactez-vous ?
            </h2>
            <p className="mt-4 leading-relaxed text-craie-600">
              Chaque page détaille les symptômes, les causes possibles et ce que nous vérifions sur place.
            </p>
          </AnimatedSection>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => (
              <AnimatedSection key={s.slug} as="li" delay={(idx % 3) * 0.05}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-center gap-3 rounded-bloc border border-craie-200 bg-craie-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-flamme-400/40 hover:shadow-pose"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-flamme-600/10 text-flamme-600">
                    <ServiceIcon icon={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-medium text-fonte-900 group-hover:text-flamme-700">
                    {s.navTitle}
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-craie-400 transition-transform group-hover:translate-x-1 group-hover:text-flamme-600" />
                </Link>
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </section>

      <Faq
        items={contactFaq}
        eyebrow="Avant d'appeler"
        title={
          <>
            Prendre contact,
            <span className="titre-fonte ml-3 italic">en pratique</span>
          </>
        }
      />

      <CtaBanner />
    </>
  )
}
