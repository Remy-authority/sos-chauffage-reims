import { siteConfig } from '@/config/site.config'

/**
 * Atelier de l'entreprise (Rémy, 22/11/2026). Tout lit `siteConfig.atelier` : vide = rien.
 * La note Google ne sort que si elle passe les seuils (4,5 et 15 avis), contrôlés ICI aussi,
 * pour qu'une saisie sous le seuil ne s'affiche jamais. Jamais de lien, de date ni de nom.
 */
export const atelier = siteConfig.atelier

export const NOTE_MIN = 4.5
export const AVIS_MIN = 15

/** « ★ 5,0/5 sur Google · 20 avis », ou null si la note ne doit pas s'afficher. */
export function texteNote(): string | null {
  const a = atelier
  if (!a || a.note === null || a.avis === null) return null
  if (a.note < NOTE_MIN || a.avis < AVIS_MIN) return null
  return `★ ${a.note.toFixed(1).replace('.', ',')}/5 sur Google · ${a.avis} avis`
}

/** « rue Joseph Cugnot, Tinqueux » */
export function texteAdresse(): string | null {
  return atelier ? `${atelier.rue}, ${atelier.ville}` : null
}

/** Repère dessiné : une épingle dont le cœur est une petite flamme (le métier). */
export function RepereAtelier({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 20" className={className} aria-hidden="true" focusable="false">
      <path
        d="M8 19.2c-.3 0-.6-.2-.8-.4C4.6 15.6 1.5 11.6 1.5 7.9a6.5 6.5 0 0 1 13 0c0 3.7-3.1 7.7-5.7 10.9-.2.2-.5.4-.8.4Z"
        fill="currentColor"
        opacity=".95"
      />
      <path
        d="M8.2 3.6c.2 1.3 1.6 2 1.9 3.6.3 1.6-.8 3.1-2.2 3.1-1.3 0-2.2-1-2.1-2.3 0-.8.5-1.4.9-1.8 0 .7.3 1.1.7 1.2-.3-1.4.2-2.8.8-3.8Z"
        fill="#fff"
      />
    </svg>
  )
}

/**
 * Bloc 1 : la ligne sobre sous la description. Deux morceaux insécables qui se rangent
 * côte à côte quand la place le permet, l'un sous l'autre sinon (téléphone).
 * Taille en largeur du bloc (cqi), comme le titre et la description (#R70).
 */
export function AtelierBloc1({ className = '' }: { className?: string }) {
  const adresse = texteAdresse()
  if (!atelier || !adresse) return null
  const note = texteNote()
  return (
    <p
      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[min(4cqi,14px)] leading-snug text-white/85 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.6)] lg:justify-start lg:text-[min(2.6cqi,0.9375rem)] ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <RepereAtelier className="h-[1.15em] w-[0.95em] shrink-0 text-braise-400" />
        <span>
          <span className="font-semibold text-white">{atelier.libelle}</span> · {adresse}
        </span>
      </span>
      {note && <span className="whitespace-nowrap text-white/85">{note}</span>}
    </p>
  )
}
