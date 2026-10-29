import type { GeoChaudiere } from '@/components/ui/DessinChaudiere'

/**
 * Réglages partagés du bloc 1 « le balayage » (Hero.tsx côté serveur, HeroChaudiere.tsx côté
 * navigateur) : mêmes adresses d'image, même qualité, même cadrage, pour que la séquence reprenne
 * au pixel près la photo déjà affichée par le premier rendu.
 *
 * Photos du 29/10/2026 (nano-banana-pro, agrandies x2 par Real-ESRGAN) : une seule photo par écran
 * du début à la fin du récit (Rémy, 27/10 : « le scrollytelling est une continuité »). Coordonnées
 * en pixels de chaque fichier, mesurées le 29/10/2026 sur une grille (ordinateur remesuré le soir même,
 * le premier relevé décalait le dessin d'un tiers).
 */
export const PHOTO_CHAUDIERE = {
  src: '/accueil/bloc1-chaudiere.webp',
  alt: 'Chaudière murale à condensation dans une buanderie, manomètre et écran de commande, tuyaux de cuivre dessous',
  largeur: 3840,
  hauteur: 2143,
}
export const PHOTO_CHAUDIERE_TEL = {
  src: '/accueil/bloc1-chaudiere-telephone.webp',
  largeur: 1520,
  hauteur: 3024,
  /** Qualité 50 : identique à 70 en taille réelle, deux fois plus légère (mesuré le 15/10/2026). */
  qualite: 50,
}
export const QUALITE_BLOC1 = 70

/**
 * L'intérieur dessiné sur chaque photo (DessinChaudiere) : le capot, le haut du panneau de
 * commande, l'écran, le manomètre et les cinq tuyaux sous la chaudière.
 */
export const CHAUDIERE_ORDI: GeoChaudiere = {
  L: 3840, H: 2143, x0: 1600, y0: 95, x1: 2235, y1: 1268, yP: 950,
  ecr: { x: 1857, y: 1060, l: 120, h: 64 },
  mano: { x: 2121, y: 1105, r: 40 },
  tuyaux: [1735, 1818, 1917, 2002, 2079],
  u: 2, etqT: 26, court: false,
}
export const CHAUDIERE_TEL: GeoChaudiere = {
  L: 1520, H: 3024, x0: 270, y0: 700, x1: 1250, y1: 2480, yP: 2050,
  ecr: { x: 668, y: 2148, l: 186, h: 96 },
  mano: { x: 1045, y: 2195, r: 50 },
  tuyaux: [455, 600, 755, 890, 1055],
  u: 3.9, etqT: 0, court: true,
}

/**
 * Cadrage de l'ordinateur : la photo couvre l'écran, posée pour mettre la
 * chaudière dans la colonne du milieu, entre le texte et le formulaire, sans jamais montrer un bord.
 * Pendant le dépannage, la caméra s'approche (x 1,6 au plus : la photo reste nette en densité 2).
 */
export const CADRAGE_ORDI = { marge: 1.0, centreX: 0.54, zoomMax: 0.72, hauteurChaudiere: 0.78 }

/** Mêmes `sizes` partout : la photo téléchargée pour le premier rendu est reprise telle quelle. */
export const TAILLES_BLOC1 = {
  /** Tablette et ordinateur : la photo (format 1,79) couvre le panneau ; en tablette, c'est la hauteur qui la règle. */
  ordi: '(max-width: 1023px) calc((100vh - 72px) * 1.792), 100vw',
  /** Téléphone : largeur RÉELLE de la photo à l'écran, couverte par la largeur ou la hauteur visible. */
  mobile: 'max(100vw, calc((100vh - 72px) * 0.503))',
}

/** Voile du téléphone : la chaudière est blanche, le texte blanc s'y pose sur une ombre franche, jamais un aplat. */
export const VOILE_TELEPHONE =
  'radial-gradient(ellipse 95% 46% at 50% 44%,rgb(var(--teinte-fonte-950)/0.62) 0%,rgb(var(--teinte-fonte-950)/0.4) 62%,rgb(var(--teinte-fonte-950)/0.18) 100%),linear-gradient(180deg,rgb(var(--teinte-fonte-950)/0.7) 0%,rgb(var(--teinte-fonte-950)/0.52) 40%,rgb(var(--teinte-fonte-950)/0.4) 70%,rgb(var(--teinte-fonte-950)/0.6) 100%)'

/** Voile de l'ordinateur : sombre sous le texte et sous le formulaire, clair sur la chaudière. */
export const VOILE_ORDI =
  'bg-[linear-gradient(90deg,rgb(var(--teinte-fonte-950)/0.86)_0%,rgb(var(--teinte-fonte-950)/0.76)_24%,rgb(var(--teinte-fonte-950)/0.5)_38%,rgb(var(--teinte-fonte-950)/0.12)_50%,rgb(var(--teinte-fonte-950)/0.1)_60%,rgb(var(--teinte-fonte-950)/0.5)_70%,rgb(var(--teinte-fonte-950)/0.72)_100%)]'

/** Grille de l'ordinateur : texte à gauche, la chaudière au milieu, le formulaire à droite, centrés verticalement. */
export const GRILLE_ORDI =
  'lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)_23rem] lg:items-stretch lg:gap-8 lg:px-10 xl:grid-cols-[minmax(0,35rem)_minmax(0,1fr)_25rem]'

/** Les cinq étapes du dépannage, une phrase chacune (aucun chiffre inventé). */
export const SURTITRE_CHAUDIERE = 'Dépannage d’une chaudière'
export const ETAPES_CHAUDIERE = [
  { court: 'code', titre: 'Le code de panne lu', phrase: 'Nous lisons le défaut affiché avant de toucher à la moindre pièce.' },
  { court: 'pression', titre: 'La pression contrôlée', phrase: 'Le manomètre et le vase d’expansion disent si le circuit manque d’eau.' },
  { court: 'bruleur', titre: 'Le brûleur rallumé', phrase: 'Nous suivons l’allumage, le ventilateur et la flamme, pas à pas.' },
  { court: 'piece', titre: 'La pièce en cause changée', phrase: 'Seule la pièce fautive est remplacée, après accord sur le prix.' },
  { court: 'chauffe', titre: 'La maison en chauffe', phrase: 'L’eau chaude repart vers les radiateurs, nous vérifions chaque pièce.' },
] as const
export const FIN_CHAUDIERE = {
  titre: 'Votre chauffage repart',
  phrase: 'Décrivez votre panne en une minute, nous vous rappelons.',
}
