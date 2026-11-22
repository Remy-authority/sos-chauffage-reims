import { SectionHeader } from '@/components/ui/SectionHeader'
import Picto, { type Trait } from '@/components/ui/Picto'
import Vivant from '@/components/ui/Vivant'

/**
 * « Pourquoi nous » (mise à jour du 29/10/2026) : remplace les anciens blocs « Qui sommes-nous » et
 * « Quatre engagements », qui disaient deux fois la même chose en 300 mots (#R67). Quatre
 * engagements (photo retirée le 22/11/2026 à la demande de Rémy), chacun avec un picto DESSINÉ
 * qui se trace à l'apparition puis garde un geste (#R71).
 */
const ENGAGEMENTS: { titre: string; phrase: string; traits: Trait[]; flotte?: boolean }[] = [
  {
    titre: 'La panne lue avant la pièce',
    phrase: 'Une mise en sécurité est un message : on remonte à sa cause.',
    traits: [
      { d: 'M10.5 3.5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z' },
      { d: 'm15.6 15.6 4.9 4.9' },
      { d: 'M10.5 7c-1.6 1.8-2.4 3-2.4 4.2a2.4 2.4 0 0 0 4.8 0c0-1.2-.8-2.4-2.4-4.2z', role: 'goutte' },
    ],
  },
  {
    titre: 'Une ligne ouverte 7j/7',
    phrase: "Un dimanche de janvier sans chauffage n'attend pas le lundi.",
    traits: [
      { d: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z' },
      { d: 'M12 6.5V12l3.6 2.2', role: 'reecrit' },
      { d: 'M12 3v1.6M21 12h-1.6M12 21v-1.6M3 12h1.6' },
    ],
  },
  {
    titre: 'Le prix annoncé avant',
    phrase: 'Le montant est donné avant le premier coup de clé.',
    traits: [
      { d: 'M5 3.5h14v17H5z' },
      { d: 'M8 8h8', role: 'reecrit' },
      { d: 'M8 11.5h5', role: 'reecrit' },
      { d: 'M15.6 14.4a2.6 2.6 0 1 0 0 3.7' },
      { d: 'M11.6 15.6h3.2M11.6 17h3.2', role: 'miel' },
    ],
  },
  {
    titre: 'Un seul interlocuteur',
    phrase: "Votre demande n'est jamais mise en concurrence entre plusieurs entreprises.",
    traits: [
      { d: 'M3.5 11 12 4l8.5 7' },
      { d: 'M6 9.2V20h12V9.2' },
      { d: 'M12 11.2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM9 20c0-1.8 1.3-3 3-3s3 1.2 3 3', role: 'miel' },
    ],
    flotte: true,
  },
]

export function PourquoiNous() {
  return (
    <section id="pourquoi-nous" className="relative bg-craie-50 py-12 md:py-20 lg:py-28" aria-labelledby="pourquoi-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          id="pourquoi-title"
          eyebrow="Pourquoi nous"
          title={
            <>
              Le chauffage,{' '}
              <span className="titre-fonte italic">notre cœur de métier</span>
            </>
          }
        />

        {/* Rémy 22/11/2026 : la photo de chaufferie retirée ; les quatre engagements seuls, en cartes
            de même hauteur, chacun avec son picto dessiné qui se trace puis garde un geste. */}
        <Vivant as="ul" seuil={0.3} className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {ENGAGEMENTS.map(({ titre, phrase, traits, flotte }, i) => (
            <li
              key={titre}
              className="apparait flex h-full flex-col items-center gap-3 rounded-panneau border border-craie-200 bg-white px-6 py-7 text-center shadow-pose lg:items-start lg:text-left"
              style={{ ['--k' as string]: i }}
            >
              <Picto
                traits={traits}
                rang={i}
                geste={flotte ? 'flotte' : undefined}
                epaisseur={1.5}
                className="h-11 w-11 text-braise-600"
              />
              <h3 className="text-balance text-xl leading-snug text-fonte-950">{titre}</h3>
              <p className="text-balance text-sm leading-relaxed text-craie-600">{phrase}</p>
            </li>
          ))}
        </Vivant>
      </div>
    </section>
  )
}
