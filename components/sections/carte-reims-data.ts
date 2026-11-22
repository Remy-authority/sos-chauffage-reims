/**
 * Secteur servi : toutes les communes dont le centre est à 40 km de Reims ou moins, plus celles
 * qui ont leur page, sans aucun trou gris (#R60, Rémy 22/11/2026). Contours : public/carte/secteur-*.svg.
 * Source : geo.api.gouv.fr (contours IGN Admin Express, départements 51, 02, 08),
 * projection équirectangulaire centrée sur Reims, carte ronde de 46 km de rayon, simplifiée.
 * Généré par scripts/carte-reims.py : ne pas éditer à la main.
 */
export const CARTE = { w: 1000, h: 1000, cx: 500, cy: 500, rayon: 435, cadre: 500, km: 40, servies: 455, reims: { x: 518, y: 505 }, atelier: { x: 464, y: 521 } }

type Etiquette = { x: number; y: number; taille: number; lignes: string[] }

/** Communes qui ont leur page : cliquables vers /zones/<slug>. */
export const PAGES: { slug: string; nom: string; km: number; x: number; y: number; etiquette: Etiquette | null; d: string }[] = [
  { slug: 'tinqueux', nom: "Tinqueux", km: 3.2, x: 467, y: 511, etiquette: { x: 458, y: 556, taille: 19, lignes: ["Tinqueux"] }, d: 'M459 527l6-10l-6-2l0-2l-11-1l6-8l-1-3l6-2l2-5l2 7l2 4l4-3l16 2l-3 10z' },
  { slug: 'saint-brice-courcelles', nom: "Saint-Brice-Courcelles", km: 3.5, x: 465, y: 485, etiquette: { x: 465, y: 424, taille: 19, lignes: ["Saint-Brice-", "Courcelles"] }, d: 'M450 481l8-5l1 4l8-4l6-11l8 9l-8 9l1 9l-3 5l0 3l3-2l0 5l-5-1l-2 2l-2 0l-3-5l-5-15z' },
  { slug: 'cormontreuil', nom: "Cormontreuil", km: 4.8, x: 516, y: 550, etiquette: { x: 515, y: 610, taille: 19, lignes: ["Cormontreuil"] }, d: 'M532 541l-1 2l2 2l-4 10l-12 10l-2 0l0-11l-1 3l-2-2l-3 3l-10-5l3-6l11-13l3 4z' },
  { slug: 'bezannes', nom: "Bezannes", km: 4.9, x: 468, y: 543, etiquette: { x: 455, y: 581, taille: 19, lignes: ["Bezannes"] }, d: 'M458 565l2-3l-7-6l-1-4l1-1l-2-3l4-5l-2-2l4-11l18-12l-3 5l1 8l-2 4l2 1l13 5l-5 11l3 2l-3 4l2 2l-3 2l-4-3l-4 7l-8-3l-4 4z' },
  { slug: 'betheny', nom: "Bétheny", km: 5.0, x: 524, y: 452, etiquette: { x: 568, y: 436, taille: 19, lignes: ["Bétheny"] }, d: 'M499 432l3 0l0-2l3-1l3 4l6-2l5 2l2-4l2-1l0-9l8 0l0-3l3 3l-3 9l2 4l12 12l5 14l-3 0l5 12l-8 3l0 4l-3 3l-2-3l-5-2l-9 4l-1-2l-10 10l-9-6l2-2l-4-5l-1-5l-5-1z' },
  { slug: 'cernay-les-reims', nom: "Cernay-lès-Reims", km: 5.5, x: 560, y: 505, etiquette: { x: 583, y: 527, taille: 19, lignes: ["Cernay-", "lès-Reims"] }, d: 'M577 482l1 3l0 9l5 3l-5 6l0 2l3 0l1 5l-4 8l6 2l-3 11l-5 5l-7-5l-3 4l-22-10l6-14l-9-3l5-11l-7 1l-2-10l3-1l-2-4l17-10l3 5l2-1l-1 4l8-2l0 5l8 1z' },
  { slug: 'taissy', nom: "Taissy", km: 7.0, x: 541, y: 564, etiquette: { x: 540, y: 564, taille: 19, lignes: ["Taissy"] }, d: 'M545 585l-3-1l-6 3l-13 0l-3-9l2-4l-7-9l6-3l3-5l2 2l1-1l6-12l-2-3l1-2l5 3l5 2l3-2l11 7l1-3l10 8l-6 10l-4 2l-2-1z' },
  { slug: 'witry-les-reims', nom: "Witry-lès-Reims", km: 7.3, x: 561, y: 450, etiquette: { x: 571, y: 397, taille: 19, lignes: ["Witry-lès-", "Reims"] }, d: 'M539 482l5-5l-1-4l9-3l-2-9l-2 1l-1-4l3 0l-5-14l-12-12l-1-3l7-3l9 7l9-13l1 4l4-2l1 2l9-8l4 5l-6 8l6 5l-7 9l10 7l12 18l-2 5l-4 5l-7 0l-3 7l-8-1l0-5l-8 2l1-4l-2 1l-3-5z' },
  { slug: 'puisieulx', nom: "Puisieulx", km: 8.5, x: 566, y: 565, etiquette: { x: 567, y: 637, taille: 19, lignes: ["Puisieulx"] }, d: 'M567 556l2-6l9-12l-2-1l2-3l3-4l6 1l-3 18l-4 0l4 3l-9 17l-3 0l3 2l-3 3l1 1l-3 11l-6 13l-14-5l2-3l-7-6l10-18l2 1l4-2z' },
  { slug: 'muizon', nom: "Muizon", km: 10.8, x: 384, y: 482, etiquette: { x: 388, y: 483, taille: 19, lignes: ["Muizon"] }, d: 'M416 476l-1 13l-11-3l0 5l-6-3l-13 6l-3-4l-4 4l-5-3l-6-1l-5-8l-3 1l-3-6l-4-1l4-5l7 3l10 3l20-3l4 3l4-2l5 1l2-2z' },
  { slug: 'sillery', nom: "Sillery", km: 10.9, x: 588, y: 579, etiquette: { x: 612, y: 579, taille: 19, lignes: ["Sillery"] }, d: 'M584 552l13 13l-1 3l14 2l-2 3l2 2l-6 8l-3-3l-8 14l-6-4l-3 6l-5-1l-4 10l-3 0l1-4l-7-3l7-23l-1-1l3-3l-3-2l3 0z' },
  { slug: 'prunay', nom: "Prunay", km: 11.5, x: 612, y: 556, etiquette: { x: 619, y: 609, taille: 19, lignes: ["Prunay"] }, d: 'M617 588l-2-8l-7-7l2-3l-14-2l1-3l-17-16l4 0l3-12l7 1l0-3l5-7l3-3l16 0l0 5l5-1l3 6l1-1l6 8l5-2l3 3l-8 10l8 6l-3 4l6 2l-10 10l-10 4l-3-1l-2 3l2 2z' },
]

/** Noms des autres communes servies (les plus peuplées, tant qu'il y a la place). */
export const NOMS: { nom: string; etiquette: Etiquette }[] = [
  { nom: "Épernay", etiquette: { x: 442, y: 763, taille: 14, lignes: ["Épernay"] } },
  { nom: "Rethel", etiquette: { x: 774, y: 158, taille: 14, lignes: ["Rethel"] } },
  { nom: "Fismes", etiquette: { x: 223, y: 440, taille: 14, lignes: ["Fismes"] } },
  { nom: "Aÿ-Champagne", etiquette: { x: 487, y: 737, taille: 14, lignes: ["Aÿ-", "Champagne"] } },
  { nom: "Mourmelon-le-Grand", etiquette: { x: 776, y: 651, taille: 14, lignes: ["Mourmelon-", "le-Grand"] } },
  { nom: "Fagnières", etiquette: { x: 722, y: 872, taille: 14, lignes: ["Fagnières"] } },
  { nom: "Suippes", etiquette: { x: 887, y: 659, taille: 14, lignes: ["Suippes"] } },
  { nom: "Blancs-Coteaux", etiquette: { x: 464, y: 903, taille: 14, lignes: ["Blancs-", "Coteaux"] } },
  { nom: "Dormans", etiquette: { x: 193, y: 733, taille: 14, lignes: ["Dormans"] } },
  { nom: "Fère-en-Tardenois", etiquette: { x: 80, y: 590, taille: 14, lignes: ["Fère-en-", "Tardenois"] } },
  { nom: "Villeneuve-sur-Aisne", etiquette: { x: 451, y: 280, taille: 14, lignes: ["Villeneuve-", "sur-Aisne"] } },
  { nom: "Warmeriville", etiquette: { x: 670, y: 388, taille: 14, lignes: ["Warmeriville"] } },
  { nom: "Bazancourt", etiquette: { x: 611, y: 364, taille: 14, lignes: ["Bazancourt"] } },
  { nom: "Braine", etiquette: { x: 111, y: 391, taille: 14, lignes: ["Braine"] } },
  { nom: "Sissonne", etiquette: { x: 399, y: 126, taille: 14, lignes: ["Sissonne"] } },
  { nom: "Gueux", etiquette: { x: 404, y: 505, taille: 14, lignes: ["Gueux"] } },
  { nom: "Sault-lès-Rethel", etiquette: { x: 763, y: 232, taille: 14, lignes: ["Sault-lès-", "Rethel"] } },
  { nom: "Jonchery-sur-Vesle", etiquette: { x: 319, y: 464, taille: 14, lignes: ["Jonchery-", "sur-Vesle"] } },
  { nom: "Boult-sur-Suippe", etiquette: { x: 584, y: 334, taille: 14, lignes: ["Boult-sur-", "Suippe"] } },
  { nom: "Avize", etiquette: { x: 481, y: 843, taille: 14, lignes: ["Avize"] } },
  { nom: "Pontfaverger-Moronvilliers", etiquette: { x: 718, y: 475, taille: 14, lignes: ["Pontfaverger-", "Moronvilliers"] } },
  { nom: "Saint-Erme-Outre-et-Ramecourt", etiquette: { x: 365, y: 182, taille: 14, lignes: ["Saint-Erme-Outre-", "et-Ramecourt"] } },
  { nom: "Cormicy", etiquette: { x: 402, y: 354, taille: 14, lignes: ["Cormicy"] } },
  { nom: "Dizy", etiquette: { x: 452, y: 709, taille: 14, lignes: ["Dizy"] } },
  { nom: "Bourgogne-Fresne", etiquette: { x: 508, y: 357, taille: 14, lignes: ["Bourgogne-", "Fresne"] } },
  { nom: "Mardeuil", etiquette: { x: 412, y: 744, taille: 14, lignes: ["Mardeuil"] } },
  { nom: "Loivre", etiquette: { x: 459, y: 392, taille: 14, lignes: ["Loivre"] } },
  { nom: "Hermonville", etiquette: { x: 394, y: 388, taille: 14, lignes: ["Hermonville"] } },
  { nom: "Bruyères-et-Montbérault", etiquette: { x: 213, y: 187, taille: 14, lignes: ["Bruyères-et-", "Montbérault"] } },
  { nom: "Tours-sur-Marne", etiquette: { x: 579, y: 748, taille: 14, lignes: ["Tours-sur-", "Marne"] } },
  { nom: "Saint-Martin-d'Ablois", etiquette: { x: 354, y: 794, taille: 14, lignes: ["Saint-Martin-", "d'Ablois"] } },
  { nom: "Damery", etiquette: { x: 377, y: 709, taille: 14, lignes: ["Damery"] } },
  { nom: "Château-Porcien", etiquette: { x: 681, y: 170, taille: 14, lignes: ["Château-", "Porcien"] } },
  { nom: "Pierry", etiquette: { x: 437, y: 787, taille: 14, lignes: ["Pierry"] } },
  { nom: "Bétheniville", etiquette: { x: 768, y: 447, taille: 14, lignes: ["Bétheniville"] } },
  { nom: "Les Septvallons", etiquette: { x: 201, y: 383, taille: 14, lignes: ["Les", "Septvallons"] } },
  { nom: "Juniville", etiquette: { x: 777, y: 328, taille: 14, lignes: ["Juniville"] } },
  { nom: "Mareuil-le-Port", etiquette: { x: 275, y: 721, taille: 14, lignes: ["Mareuil-", "le-Port"] } },
  { nom: "Auménancourt", etiquette: { x: 500, y: 328, taille: 14, lignes: ["Auménancourt"] } },
  { nom: "Recy", etiquette: { x: 729, y: 811, taille: 14, lignes: ["Recy"] } },
  { nom: "Asfeld", etiquette: { x: 565, y: 237, taille: 14, lignes: ["Asfeld"] } },
  { nom: "Livry-Louvercy", etiquette: { x: 713, y: 686, taille: 14, lignes: ["Livry-", "Louvercy"] } },
  { nom: "Chouilly", etiquette: { x: 490, y: 792, taille: 14, lignes: ["Chouilly"] } },
  { nom: "Beine-Nauroy", etiquette: { x: 667, y: 516, taille: 14, lignes: ["Beine-", "Nauroy"] } },
  { nom: "Val-de-Vesle", etiquette: { x: 671, y: 578, taille: 14, lignes: ["Val-de-", "Vesle"] } },
  { nom: "Rilly-la-Montagne", etiquette: { x: 487, y: 643, taille: 14, lignes: ["Rilly-la-", "Montagne"] } },
  { nom: "Le Mesnil-sur-Oger", etiquette: { x: 529, y: 881, taille: 14, lignes: ["Le Mesnil-", "sur-Oger"] } },
  { nom: "Isles-sur-Suippe", etiquette: { x: 680, y: 357, taille: 14, lignes: ["Isles-sur-", "Suippe"] } },
  { nom: "Verzy", etiquette: { x: 605, y: 658, taille: 14, lignes: ["Verzy"] } },
  { nom: "Avenay-Val-d'Or", etiquette: { x: 513, y: 698, taille: 14, lignes: ["Avenay-", "Val-d'Or"] } },
  { nom: "Trélou-sur-Marne", etiquette: { x: 161, y: 701, taille: 14, lignes: ["Trélou-", "sur-Marne"] } },
  { nom: "Ambonnay", etiquette: { x: 608, y: 699, taille: 14, lignes: ["Ambonnay"] } },
  { nom: "Juvigny", etiquette: { x: 694, y: 785, taille: 14, lignes: ["Juvigny"] } },
  { nom: "Tagnon", etiquette: { x: 700, y: 268, taille: 14, lignes: ["Tagnon"] } },
]
