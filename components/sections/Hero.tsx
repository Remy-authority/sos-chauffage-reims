import type { CSSProperties } from 'react'
import { getImageProps } from 'next/image'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import { LeadForm } from '@/components/ui/LeadForm'
import ReassuranceVive from '@/components/ui/ReassuranceVive'
import HeroChaudiere from '@/components/sections/HeroChaudiere'
import {
  CADRAGE_ORDI,
  CHAUDIERE_ORDI,
  GRILLE_ORDI,
  PHOTO_CHAUDIERE,
  PHOTO_CHAUDIERE_TEL,
  QUALITE_BLOC1,
  TAILLES_BLOC1,
  VOILE_ORDI,
  VOILE_TELEPHONE,
} from '@/components/sections/chaudiere-reglages'

/**
 * Hero, bloc 1 « le balayage » (mise à jour du 29/10/2026, scénario validé par Rémy, « ok go vas
 * y ») : le dépannage d'une chaudière murale, la prestation la plus demandée ; le circuit de
 * chauffage de la maison a son propre récit au bloc 3.
 *
 * ÉCRAN 1 : une seule photo, la chaudière dans sa buanderie. Ordinateur : la photo en fond plein
 * cadre, titre et boutons CENTRÉS VERTICALEMENT à gauche, formulaire noir opaque centré
 * verticalement à droite, la chaudière au milieu. Téléphone et tablette : la photo verticale couvre
 * TOUT le premier écran ; sur-titre, titre, accroche et formulaire posés dessus, centrés entre
 * l'en-tête et la barre du bas (#R70). Au défilement, HeroChaudiere fait passer une ligne jaune
 * miel sur la photo : derrière elle le capot s'efface sur place, la caméra s'approche et les cinq
 * étapes du dépannage s'y jouent, puis la ligne repart et rend la photo.
 * « Réduire les animations » ou réseau lent : ce bloc tel quel, puis la chaudière ouverte et les étapes.
 *
 * L'en-tête du site est FIXE (HeaderClient) : une cale de sa hauteur, du même noir, est posée avant
 * le bloc, pour que la photo commence sous l'en-tête comme sur les autres sites.
 */
const RIEN = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/** Photo du bloc 1 pour UN format d'écran : la source de l'autre format est vide, une seule photo téléchargée. */
function PhotoBloc1({ format, className, style }: { format: 'telephone' | 'ordi'; className: string; style?: CSSProperties }) {
  const tel = format === 'telephone'
  const { props } = getImageProps({
    src: tel ? PHOTO_CHAUDIERE_TEL.src : PHOTO_CHAUDIERE.src,
    alt: PHOTO_CHAUDIERE.alt,
    fill: true,
    priority: true,
    sizes: tel ? TAILLES_BLOC1.mobile : TAILLES_BLOC1.ordi,
    quality: tel ? PHOTO_CHAUDIERE_TEL.qualite : QUALITE_BLOC1,
  })
  return (
    <picture>
      <source media={tel ? '(min-width: 768px)' : '(max-width: 767px)'} srcSet={RIEN} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...props} className={className} style={{ ...props.style, ...style }} />
    </picture>
  )
}

/**
 * Ordinateur, premier rendu : la photo posée en CSS exactement comme la pose de repos de
 * HeroChaudiere (agrandie de `marge`, la chaudière vers `centreX`, jamais un bord visible), pour
 * qu'elle ne saute pas quand la séquence prend la main. Unités du conteneur (cqw, cqh) = le panneau.
 */
const g = CHAUDIERE_ORDI
const LARGEUR = `(max(100cqw, ${(g.L / g.H).toFixed(5)} * 100cqh) * ${CADRAGE_ORDI.marge})`
const POSE_ORDI: CSSProperties = {
  width: `calc${LARGEUR}`,
  height: `calc(${LARGEUR} * ${(g.H / g.L).toFixed(5)})`,
  left: `clamp(calc(100cqw - ${LARGEUR}), calc(${CADRAGE_ORDI.centreX * 100}cqw - ${(((g.x0 + g.x1) / 2) / g.L).toFixed(5)} * ${LARGEUR}), 0px)`,
  top: `clamp(calc(100cqh - ${LARGEUR} * ${(g.H / g.L).toFixed(5)}), calc(50cqh - ${(((g.y0 + g.y1) / 2) / g.L).toFixed(5)} * ${LARGEUR}), 0px)`,
  maxWidth: 'none',
}

export function Hero() {
  const reassurance = (classe: string, clair = false) => <ReassuranceVive className={classe} clair={clair} />

  /* Colonne texte, partagée par la version fixe et la séquence. Titre et accroche : deux lignes au
     plus de 320 à 1 920 px, lignes insécables, taille en largeur du bloc (cqi), jamais en vw (#R70). */
  const texte = (
    <div className="px-6 lg:px-0">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center [container-type:inline-size] lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-braise-300 [text-shadow:0_1px_8px_rgb(0_0_0_/_0.5)] sm:text-xs sm:tracking-[0.18em]">
          <span className="hidden h-px w-8 shrink-0 bg-braise-300/70 lg:block" aria-hidden="true" />
          {siteConfig.city} et {siteConfig.serviceArea.radiusKm} km autour
        </p>

        <h1
          id="titre-hero"
          className="mt-4 whitespace-nowrap text-[min(9.4cqi,2.5rem)] font-semibold leading-[1.08] text-white [text-shadow:0_1px_12px_rgb(0_0_0_/_0.4)] sm:text-[min(9.4cqi,2.9rem)] lg:mt-5 lg:text-[min(9.6cqi,3.3rem)] xl:text-[min(9.6cqi,3.6rem)]"
        >
          <span className="block">Chauffagiste d&apos;urgence</span>{' '}
          <span className="block text-braise-300">à {siteConfig.city}</span>
        </h1>

        {/* Téléphone, pendant la séquence : retirée à l'étape des coordonnées, pour que le
            formulaire tienne dans la photo. */}
        <p className="mt-3 text-[min(5cqi,16px)] leading-relaxed text-white/90 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.5),0_0_16px_rgb(0_0_0_/_0.4)] max-lg:[.hch-ecran1:has([data-etape='3'])_&]:hidden sm:text-[min(3.1cqi,1.125rem)] lg:mt-6 lg:text-[min(3.2cqi,1.2rem)]">
          <span className="block sm:whitespace-nowrap">
            <span className="block whitespace-nowrap sm:inline">On remonte à la cause</span>{' '}
            <span className="block whitespace-nowrap sm:inline">avant de changer une pièce.</span>
          </span>{' '}
          <span className="hidden whitespace-nowrap sm:block">Gaz, fioul, pompe à chaleur, ligne ouverte 7j/7.</span>
        </p>

        {/* Téléphone et tablette : LE formulaire du bloc 1, sous le titre, dans la photo. */}
        <div className="mt-5 w-full max-w-md lg:hidden">
          <LeadForm variante="compact" ecran1 />
        </div>

        {/* Ordinateur : le numéro et « Décrire ma panne ». Téléphone : l'appel est dans la barre du bas. */}
        <div className="mt-8 hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex h-[52px] items-center gap-2 whitespace-nowrap rounded-[3px] bg-braise-500 px-6 font-semibold tabular-nums tracking-wide text-white transition-colors hover:bg-braise-400"
          >
            <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
            {siteConfig.phoneDisplay}
          </a>
          <a
            href="#devis"
            className="inline-flex h-[52px] items-center whitespace-nowrap rounded-[3px] border border-white/30 bg-white/[0.07] px-6 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/[0.14]"
          >
            Décrire ma panne
          </a>
        </div>

        {reassurance('mt-9 hidden w-full max-w-[32rem] border-t border-white/15 pt-6 lg:grid')}
      </div>
    </div>
  )

  const formulaire = (
    <div className="w-full">
      <LeadForm variante="compact" titre="Décrivez votre panne" />
    </div>
  )

  const versionA = (
    <section
      className="relative isolate overflow-hidden bg-fonte-950 lg:flex lg:min-h-[max(calc(100svh-72px),640px)] lg:items-center lg:py-14"
      aria-labelledby="titre-hero"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden [container-type:size] lg:block" aria-hidden="true">
        <PhotoBloc1 format="ordi" className="absolute" style={POSE_ORDI} />
        <div className={`absolute inset-0 ${VOILE_ORDI}`} />
      </div>
      <div className={`relative ${GRILLE_ORDI}`}>
        {/* Téléphone et tablette : tout le premier écran, la photo dessous, le texte centré entre
            l'en-tête et la barre du bas (61 px, absente dès 768 px). */}
        <div className="relative isolate flex min-h-[max(calc(100svh-72px),540px)] flex-col justify-center pb-[calc(61px+1.5rem)] pt-6 md:pb-6 lg:col-start-1 lg:min-h-0 lg:p-0">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:hidden" aria-hidden="true">
            <PhotoBloc1 format="telephone" className="object-cover md:hidden" />
            {/* Tablette : la photo paysage, comme la séquence (la chaudière verticale y serait trop grande). */}
            <PhotoBloc1 format="ordi" className="hidden object-cover md:block" />
            <div className="absolute inset-0" style={{ backgroundImage: VOILE_TELEPHONE }} />
          </div>
          {texte}
        </div>
        <div className="hidden lg:col-start-3 lg:flex lg:flex-col lg:justify-center">{formulaire}</div>
      </div>
    </section>
  )

  return (
    <>
      <div aria-hidden="true" className="h-[72px] bg-fonte-950" />
      <HeroChaudiere versionA={versionA} texte={texte} formulaire={formulaire} />
      {/* Téléphone et tablette : la réassurance sur fond BLANC sous la photo, distincte du formulaire noir. */}
      <div className="border-b border-craie-200 bg-white py-8 lg:hidden">
        <div className="px-6">{reassurance('mx-auto w-full max-w-lg md:max-w-2xl md:grid-cols-4', true)}</div>
      </div>
    </>
  )
}
