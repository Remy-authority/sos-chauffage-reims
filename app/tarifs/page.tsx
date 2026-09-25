import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CalendarClock, Phone } from 'lucide-react'
import { getTarifs, publicFileExists, resolveBlockImage } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import { PageHeader } from '@/components/layout/PageHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { Faq } from '@/components/ui/Faq'
import { LeadForm } from '@/components/ui/LeadForm'
import { ServiceBlock } from '@/components/ui/ServiceBlock'
import { SourceLine } from '@/components/schemas/SchemaFrame'

/**
 * /tarifs : fourchettes de prix, TOUTES sourcées (nom, date, lien), depuis
 * content/tarifs.json. Aucun prix dans le JSON-LD, aucun priceRange : la seule
 * donnée structurée de la page est la FAQ (FAQPage), comme sur les autres pages.
 * Reliée depuis le pied de page, les prestations et les communes (bloc « Prix
 * indicatifs ») seulement : jamais depuis le menu ni le bloc 1.
 */
export function generateMetadata(): Metadata {
  const t = getTarifs()
  if (!t) return {}
  const cover = t.cover && publicFileExists(t.cover.src) ? t.cover.src : undefined
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/tarifs',
    ogImage: cover,
  })
}

export default function TarifsPage() {
  const t = getTarifs()
  if (!t) notFound()

  const cover = t.cover && publicFileExists(t.cover.src) ? t.cover : undefined
  const firstImageIndex = t.blocks.findIndex((b) => resolveBlockImage(b))

  return (
    <>
      <PageHeader eyebrow="Tarifs" title={t.h1} subtitle={t.intro} image={cover}>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-craie-50/15 bg-craie-50/5 px-4 py-2 text-sm text-craie-200">
          <CalendarClock size={16} className="text-braise-400" aria-hidden="true" />
          Mis à jour : {t.miseAJour}
        </p>
      </PageHeader>

      {/* Tableaux poste par poste, un par groupe. Sur téléphone, chaque ligne
          devient une carte empilée (aucun débordement horizontal). */}
      <section className="bg-craie-50 py-16 lg:py-24" aria-label="Grille de prix">
        <div className="mx-auto max-w-6xl space-y-14 px-6 lg:px-10">
          {t.groupes.map((g) => (
            <AnimatedSection key={g.titre} as="section">
              <h2 className="text-center text-3xl leading-snug lg:text-left">{g.titre}</h2>
              <table className="mt-6 block w-full border-collapse text-left lg:table">
                <thead className="hidden lg:table-header-group">
                  <tr className="border-b-2 border-fonte-900 text-xs uppercase tracking-[0.14em] text-craie-500">
                    <th scope="col" className="py-3 pr-4 font-semibold">Poste</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Prix constaté</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">À savoir</th>
                    <th scope="col" className="py-3 font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody className="block space-y-3 lg:table-row-group lg:space-y-0">
                  {g.lignes.map((l) => (
                    <tr
                      key={l.id}
                      id={`tarif-${l.id}`}
                      className="block rounded-bloc border border-craie-200 bg-white p-5 text-center shadow-pose lg:table-row lg:rounded-none lg:border-0 lg:border-b lg:border-craie-200 lg:bg-transparent lg:p-0 lg:text-left lg:shadow-none"
                    >
                      <th
                        scope="row"
                        className="block font-semibold text-fonte-950 lg:table-cell lg:py-4 lg:pr-4 lg:align-top"
                      >
                        {l.poste}
                      </th>
                      <td className="mt-2 block lg:mt-0 lg:table-cell lg:whitespace-nowrap lg:py-4 lg:pr-4 lg:align-top">
                        <span className="font-display text-2xl font-medium text-flamme-700 lg:text-xl">
                          {l.prix}
                        </span>
                        {l.unite && <span className="ml-1 text-sm text-craie-500">{l.unite}</span>}
                      </td>
                      <td className="mt-2 block text-sm leading-relaxed text-craie-700 empty:hidden lg:mt-0 lg:table-cell lg:empty:table-cell lg:py-4 lg:pr-4 lg:align-top">
                        {l.note}
                      </td>
                      <td className="mt-3 block border-t border-craie-200 pt-3 lg:mt-0 lg:table-cell lg:border-0 lg:py-4 lg:align-top">
                        <SourceLine source={l.source} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AnimatedSection>
          ))}
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-craie-600">
            Ces fourchettes sont relevées dans les sources citées sur chaque ligne, à la date
            indiquée. Elles ne remplacent pas un devis : nous annonçons le prix de votre
            intervention au téléphone, avant de nous déplacer.
          </p>
        </div>
      </section>

      {t.blocks.length > 0 && (
        <article className="bg-white py-16 lg:py-24">
          <div className="texte-page mx-auto max-w-3xl space-y-10 px-6 lg:px-10">
            {t.blocks.map((b, i) => (
              <ServiceBlock key={b.heading} block={b} eager={i === firstImageIndex} />
            ))}
          </div>
        </article>
      )}

      {t.cas.length > 0 && (
        <section className="bg-craie-100 py-16 lg:py-24" aria-labelledby="cas-concrets">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <h2 id="cas-concrets" className="text-center text-3xl leading-snug md:text-4xl lg:text-left">
              Cas concrets, chiffrés
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {t.cas.map((c, idx) => (
                <AnimatedSection
                  key={c.titre}
                  as="li"
                  delay={(idx % 3) * 0.07}
                  className="flex flex-col rounded-bloc border border-craie-200 bg-white p-6 text-center shadow-pose lg:text-left"
                >
                  <h3 className="font-display text-xl font-medium leading-snug text-fonte-950">{c.titre}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-craie-700">{c.situation}</p>
                  <ul className="mt-5 flex-1 divide-y divide-craie-200 border-y border-craie-200 text-sm">
                    {c.lignes.map(([poste, montant]) => (
                      <li key={poste} className="flex items-baseline justify-between gap-4 py-2.5 text-left">
                        <span className="text-craie-700">{poste}</span>
                        <span className="shrink-0 font-medium text-fonte-950">{montant}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-baseline justify-between gap-4 text-left">
                    <span className="text-sm font-semibold uppercase tracking-[0.12em] text-craie-500">Total</span>
                    <span className="font-display text-2xl font-medium text-braise-600">{c.total}</span>
                  </div>
                </AnimatedSection>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Faq items={t.faq} eyebrow="Tarifs" />

      <section className="bg-craie-50 py-16 lg:py-24" aria-labelledby="demande-prix">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="text-center lg:col-span-5 lg:text-left">
            <h2 id="demande-prix" className="text-3xl leading-snug md:text-4xl">
              Le prix de votre panne, avant tout déplacement
            </h2>
            <p className="mt-4 leading-relaxed text-craie-600">
              Décrivez l&apos;appareil et ce qu&apos;il affiche : nous vous rappelons avec une
              estimation pour votre cas. Si la maison est déjà froide, appelez plutôt : c&apos;est la voie la plus courte.
            </p>
            <div className="mt-6">
              <Button href={`tel:${siteConfig.phone}`} variant="braise" size="lg">
                <Phone size={18} strokeWidth={2.5} />
                {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div id="formulaire" className="scroll-mt-28">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
