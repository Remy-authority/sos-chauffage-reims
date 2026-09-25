import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SchemaVisuel } from '@/components/schemas'
import { extractNumberedSteps } from '@/lib/text'
import { resolveBlockImage, type ContentBlock } from '@/lib/content'

/**
 * Bloc de contenu d'une page service, zone ou tarifs.
 *
 * Si le corps contient une liste numérotée rédigée en prose (« 1. … 2. … »), elle
 * est rendue en checklist visuelle plutôt qu'en pavé : le texte SEO reste identique,
 * seule sa mise en forme change.
 *
 * Visuel du bloc (contrat du 25/09/2026) : une image de corps (`image`) OU un
 * schéma (`schema`), jamais les deux. L'image n'est rendue que si son fichier
 * existe dans public/ (les photos arrivent après les textes).
 *
 * Téléphone : titre et paragraphes centrés ; ordinateur (lg) : inchangé, à gauche.
 */
export function ServiceBlock({
  block,
  eager = false,
  zoneSlug,
}: {
  block: ContentBlock
  eager?: boolean
  zoneSlug?: string
}) {
  const steps = extractNumberedSteps(block.body)
  const image = resolveBlockImage(block)

  return (
    <AnimatedSection as="section" className="scroll-mt-28">
      <h2 className="text-center lg:text-left">{block.heading}</h2>

      {steps ? (
        <>
          {steps.lead && <p className="text-center lg:text-left">{steps.lead}</p>}
          <ol className="mt-6 space-y-3">
            {steps.steps.map((s, i) => (
              <li
                key={s.slice(0, 32)}
                className="flex gap-4 rounded-bloc border border-craie-200 bg-white p-5 shadow-pose"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-braise-500 font-display text-sm font-medium text-white">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-craie-700">{s}</span>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p className="text-center lg:text-left">{block.body}</p>
      )}

      {image ? (
        <figure className="mt-8">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-bloc border border-craie-200 shadow-pose">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              loading={eager ? 'eager' : 'lazy'}
            />
          </div>
          {image.caption && (
            <figcaption className="mt-3 text-center text-sm text-craie-500 lg:text-left">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ) : (
        block.schema && <SchemaVisuel id={block.schema} zoneSlug={zoneSlug} />
      )}
    </AnimatedSection>
  )
}

export default ServiceBlock
