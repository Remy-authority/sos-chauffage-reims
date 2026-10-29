import type { Trait } from '@/components/ui/Picto'

/**
 * Pictos DESSINÉS du chauffage, un par prestation, avec la phrase courte de sa carte (mise à jour du
 * 29/10/2026, #R71) : servis par les prestations ET par les symptômes de l'accueil.
 */
export const CARTES: Record<string, { phrase: string; traits: Trait[] }> = {
  'urgence-depannage-chauffage-chaudiere': {
    phrase: 'Maison sans chauffage le soir ou le week-end : la ligne reste ouverte.',
    traits: [
      { d: 'M12 4.5a8 8 0 1 0 0 16 8 8 0 0 0 0-16z' },
      { d: 'M12 8.5v4l2.8 1.8', role: 'reecrit' },
      { d: 'M3.5 5.5 6 3M20.5 5.5 18 3', role: 'miel' },
    ],
  },
  'depannage-chaudiere-gaz': {
    phrase: "Mise en sécurité, pression tombée, allumage raté : on lit le code d'abord.",
    traits: [
      { d: 'M12 3c3 3.5 5.5 6.5 5.5 10a5.5 5.5 0 0 1-11 0c0-2.2 1-4 2.6-5.6.2 1.8 1 3 2.4 3.6C11 8.4 11.4 5.6 12 3z' },
      { d: 'M12 14.2c1 .9 1.6 1.8 1.6 2.7a1.6 1.6 0 0 1-3.2 0c0-.9.6-1.8 1.6-2.7z', role: 'miel' },
    ],
  },
  'depannage-chaudiere-fioul': {
    phrase: 'Brûleur qui cale, gicleur encrassé, filtre ou cuve en cause.',
    traits: [
      { d: 'M12 3.5c-3 4-5 6.6-5 9a5 5 0 0 0 10 0c0-2.4-2-5-5-9z' },
      { d: 'M9.6 13a2.4 2.4 0 0 0 2.4 2.4', role: 'goutte' },
      { d: 'M4 20.5h16', role: 'miel' },
    ],
  },
  'depannage-pompe-a-chaleur': {
    phrase: 'Unité extérieure givrée, dégivrage sans fin, radiateurs à peine tièdes.',
    traits: [
      { d: 'M3 6h18v12H3z' },
      { d: 'M9 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z' },
      { d: 'M9 9.5v5M6.5 12h5', role: 'reecrit' },
      { d: 'M15.5 9h3M15.5 12h3M15.5 15h3', role: 'miel' },
    ],
  },
  'radiateur-froid-desembouage-purge': {
    phrase: "Purge de l'air en haut, désembouage de la boue en bas.",
    traits: [
      { d: 'M4 8h16v10H4z' },
      { d: 'M8 8v10M12 8v10M16 8v10' },
      { d: 'M7 5.5c.6-.8.6-1.4 0-2.2M12 5.5c.6-.8.6-1.4 0-2.2M17 5.5c.6-.8.6-1.4 0-2.2', role: 'miel' },
      { d: 'M6 18v2.5M18 18v2.5' },
    ],
  },
  'fuite-chaudiere-circuit-chauffage': {
    phrase: 'Eau sous la chaudière, ou pression qui baisse chaque semaine.',
    traits: [
      { d: 'M3 5.5h10a2.5 2.5 0 0 1 2.5 2.5v3' },
      { d: 'M3 9h9.5' },
      { d: 'M15.5 14c-1.5 2-2.5 3.3-2.5 4.5a2.5 2.5 0 0 0 5 0c0-1.2-1-2.5-2.5-4.5z', role: 'goutte' },
    ],
  },
  'ballon-eau-chaude-cumulus': {
    phrase: "Plus d'eau chaude : résistance, thermostat ou groupe de sécurité.",
    traits: [
      { d: 'M7 3.5h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z' },
      { d: 'M9 8h6', role: 'reecrit' },
      { d: 'M12 11.5c-1.3 1.6-2 2.6-2 3.4a2 2 0 0 0 4 0c0-.8-.7-1.8-2-3.4z', role: 'goutte' },
    ],
  },
  'entretien-chaudiere-annuel': {
    phrase: "Visite annuelle obligatoire, combustion réglée, attestation remise pour l'assureur.",
    traits: [
      { d: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3.5 17.5l3 3 5.8-5.8a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.6-.6-2.6z' },
      { d: 'M15 18.5l2 2 4-4', role: 'miel' },
    ],
  },
  'depannage-climatisation': {
    phrase: "Appareil qui souffle tiède ou goutte sous l'unité intérieure.",
    traits: [
      { d: 'M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9' },
      { d: 'M9.5 4.6 12 7l2.5-2.4M9.5 19.4 12 17l2.5 2.4', role: 'miel' },
    ],
  },
}

