import { siteConfig } from '@/config/site.config'

/**
 * Atelier de l'entreprise (Rémy, 22/11/2026). Tout lit `siteConfig.atelier` : vide = rien.
 * La note Google ne sort que si elle passe les seuils (4,5 et 15 avis), contrôlés ICI aussi,
 * pour qu'une saisie sous le seuil ne s'affiche jamais. Jamais de lien, de date ni de nom.
 */
export const atelier = siteConfig.atelier

export const NOTE_MIN = 4.5
export const AVIS_MIN = 15

/** « 5,0/5 sur Google · 20 avis », ou null si la note ne doit pas s'afficher. */
export function texteNote(): string | null {
  const a = atelier
  if (!a || a.note === null || a.avis === null) return null
  if (a.note < NOTE_MIN || a.avis < AVIS_MIN) return null
  return `${a.note.toFixed(1).replace('.', ',')}/5 sur Google · ${a.avis} avis`
}

/** Le « G » de Google, dans ses quatre couleurs (Rémy 22/11/2026 : « le vrai logo de Google »). */
export function LogoGoogle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

/** La note, précédée du « G » : jamais de lien, jamais de date, jamais de nom. */
export function NoteGoogle({ className = '' }: { className?: string }) {
  const note = texteNote()
  if (!note) return null
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${className}`}>
      <LogoGoogle className="h-[1.1em] w-[1.1em] shrink-0" />
      <span>{note}</span>
    </span>
  )
}

/** Cinq étoiles, remplies à proportion de la note (4,6 = quatre étoiles et six dixièmes). */
function Etoiles({ note }: { note: number }) {
  const etoile = 'M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z'
  const rangee = (fill: string) => (
    <span className="flex gap-[0.08em]">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-[1em] w-[1em] shrink-0" aria-hidden="true" focusable="false">
          <path d={etoile} fill={fill} />
        </svg>
      ))}
    </span>
  )
  return (
    <span className="relative inline-flex" aria-hidden="true">
      {rangee('#D9D4CC')}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(note / 5) * 100}%` }}>
        {rangee('#FBBC05')}
      </span>
    </span>
  )
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
 * Bloc 1 : la note Google seule, sous la description (Rémy 22/11/2026 : l'adresse de l'atelier ne
 * va JAMAIS au bloc 1 ; elle vit sur la carte des zones, la page contact et le pied de page).
 * Mise en avant dans un encadré blanc aux angles arrondis (Rémy 22/11/2026 : « pas assez mis en
 * avant, au même titre qu'une description »). Le texte lu reste « 5,0/5 sur Google · 20 avis ».
 * Taille en largeur du bloc (cqi), comme le titre et la description (#R70).
 */
export function NoteBloc1({ className = '' }: { className?: string }) {
  const texte = texteNote()
  if (!texte || !atelier || atelier.note === null || atelier.avis === null) return null
  const note = atelier.note.toFixed(1).replace('.', ',')
  return (
    <p className={`flex justify-center lg:justify-start ${className}`}>
      <span className="inline-flex items-center gap-[0.55em] whitespace-nowrap rounded-xl bg-white px-[0.95em] py-[0.55em] text-[min(4.2cqi,15px)] leading-none text-fonte-950 shadow-[0_6px_20px_-6px_rgb(0_0_0_/_0.45)] lg:text-[min(2.7cqi,1rem)]">
        <span className="sr-only">{texte}</span>
        <LogoGoogle className="h-[1.15em] w-[1.15em] shrink-0" />
        <span aria-hidden="true" className="font-bold tabular-nums">{note}</span>
        <Etoiles note={atelier.note} />
        <span aria-hidden="true" className="text-fonte-600">{atelier.avis} avis</span>
      </span>
    </p>
  )
}
