import Link from 'next/link'
import { ChevronDown, Clock, Euro, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { LiveDot } from '@/components/ui/LiveDot'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'

/** Liens légaux, communs aux deux mises en page. */
const LEGAL = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-confidentialite', label: 'Confidentialité' },
  { href: '/politique-cookies', label: 'Cookies' },
  { href: '/cgu', label: 'CGU' },
]

/** Volet dépliant du pied de page mobile. Les liens restent dans le HTML, replié ou non. */
function Volet({ titre, liens }: { titre: string; liens: { href: string; label: string }[] }) {
  return (
    <details className="group border-b border-fonte-800">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xs font-semibold uppercase tracking-[0.18em] text-braise-400 [&::-webkit-details-marker]:hidden">
        {titre}
        <ChevronDown size={16} aria-hidden="true" className="transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-3 pb-5">
        {liens.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-craie-300 transition-colors hover:text-braise-300">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}

/**
 * Pied de page. Deux mises en page :
 *  - téléphone (sous 1024 px) : COURT (Rémy, 23/09/2026). Identité centrée en une
 *    phrase, listes Prestations, Zones et Informations en volets dépliants, contact
 *    et mentions compacts, marge basse pour que la barre d'appel collante ne masque
 *    pas le dernier lien ;
 *  - ordinateur : la mise en page d'origine, inchangée, plus le lien Tarifs.
 * La page /tarifs n'est reliée que d'ici, des prestations et d'un paragraphe de
 * corps : jamais du menu (règle du portefeuille du 18/09/2026).
 */
export function Footer() {
  const year = new Date().getFullYear()
  const services = getServices()
  const zones = getZones()

  const liensServices = services.map((s) => ({ href: `/services/${s.slug}`, label: s.navTitle }))
  const liensZones = [
    ...zones.map((z) => ({ href: `/zones/${z.slug}`, label: z.name })),
    { href: '/zones', label: 'Toutes les zones' },
  ]
  const liensInfos = [
    { href: '/tarifs', label: 'Tarifs' },
    { href: '/conseils', label: 'Conseils' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="relative bg-fonte-950 text-craie-100">
      <div className="filet-chaud absolute inset-x-0 top-0" aria-hidden="true" />

      {/* ── Téléphone et tablette ─────────────────────────────────────────── */}
      <div className="px-6 pb-32 pt-12 lg:hidden">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo tone="light" />
          </div>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-craie-300">
            Dépannage et entretien de chauffage à {siteConfig.city} et dans l&apos;agglomération.
          </p>
        </div>

        <div className="mt-8 border-t border-fonte-800">
          <Volet titre="Prestations" liens={liensServices} />
          <Volet titre="Zones" liens={liensZones} />
          <Volet titre="Informations" liens={liensInfos} />
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-sm">
          <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 text-craie-100 hover:text-braise-300">
            <Phone size={15} className="text-braise-400" aria-hidden="true" />
            {siteConfig.phoneDisplay}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 break-all text-craie-100 hover:text-braise-300">
            <Mail size={15} className="shrink-0 text-braise-400" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>

        <div className="mt-8 text-center text-xs text-craie-400">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-braise-300">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="mt-3">
            © {year} {siteConfig.businessName}
          </p>
        </div>
      </div>

      {/* ── Ordinateur (mise en page d'origine) ───────────────────────────── */}
      <div className="mx-auto hidden max-w-7xl px-6 py-20 lg:block lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-md leading-relaxed text-craie-300">
              Dépannage et entretien de chauffage à {siteConfig.city} et dans les communes de
              l&apos;agglomération. Chaudière à gaz ou au fioul, pompe à chaleur, radiateurs, ballon
              d&apos;eau chaude. Un métier, un diagnostic avant réparation, un prix annoncé avant
              l&apos;intervention.
            </p>
            <LiveDot className="mt-8">Ligne urgence ouverte {siteConfig.availability}</LiveDot>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-braise-400">
              Prestations
            </h2>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-craie-300 transition-colors hover:text-braise-300"
                  >
                    {s.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-braise-400">
              Zones
            </h2>
            <ul className="space-y-3">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link
                    href={`/zones/${z.slug}`}
                    className="text-sm text-craie-300 transition-colors hover:text-braise-300"
                  >
                    {z.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-braise-400">
              Contact
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-braise-400" />
                <a href={`tel:${siteConfig.phone}`} className="text-craie-100 hover:text-braise-300">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-braise-400" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-craie-100 hover:text-braise-300"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-braise-400" />
                <span className="text-craie-300">
                  {siteConfig.city} et un rayon d&apos;environ {siteConfig.serviceArea.radiusKm} km
                  <br />
                  {siteConfig.departmentName} ({siteConfig.department}), {siteConfig.region}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-braise-400" />
                <span className="text-craie-300">{siteConfig.availability}</span>
              </li>
              <li className="flex items-start gap-3">
                <Euro size={16} className="mt-0.5 shrink-0 text-braise-400" />
                <Link href="/tarifs" className="text-craie-100 hover:text-braise-300">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-fonte-800 pt-8 text-sm text-craie-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.businessName}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-braise-300">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
