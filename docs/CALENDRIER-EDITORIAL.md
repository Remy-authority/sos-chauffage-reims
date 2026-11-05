# CALENDRIER-EDITORIAL.md v3, Blog conseils, SOS Chauffage Reims

> Réécrit le 05/11/2026 (chantier « Articles à 7 par semaine », demandé par Rémy le 05/11/2026, règle portefeuille #R82).
> Remplace la v2 (3 puis 5 articles par semaine). Les 37 anciens brouillons (052 à 088) ont été repris, fusionnés ou écartés ;
> leur contenu utile vit dans les brouillons 101 à 193 ci-dessous.

## Règles de ce calendrier

- Cadence : **7 articles par semaine**, un chaque jour à 05:38 UTC (workflow `publish-article.yml`).
- Stock : **93 brouillons**, du 2026-11-06 au 2027-02-06, soit 13.3 semaines.
- Ordre : sujets de **propriétaires** d'abord (le partenaire ne prend que des propriétaires) ; sujets de locataire et de chauffage collectif à la fin (D062, D061).
- **Aucun article de ville** (« chauffagiste + commune ») : ils doublonnent les pages de zones. Deux anciens articles de ville refusés par Google et sans clic sont redirigés (301) vers leur page service.
- Jamais deux articles de la même rubrique à la suite.
- Volumes : Planificateur de mots-clés Google (France, gratuit, compte 8607271853) et Search Console du site (16 mois). DataForSEO n'a pas été utilisé.
- Chaque brouillon passe `scripts/verifier-brouillon.mjs` (title servi 30-60, description 120-160, FAQ 3 et plus, 600 mots et plus, aucun tiret cadratin, aucune image) ; le script de publication refuse un brouillon hors règles.
- Les images (couverture + visuel de corps) naissent le jour de la publication, jamais pour un brouillon.

## Fusions et doublons écartés

- Fusionnés : 066 dans 065 (hors gel), 075 dans 059 (détartrage du ballon), 087 dans 071 (grands froids), 088 dans 081 (fin d'hiver).
- Écartés (sujet déjà couvert par un article publié) : 064, 069, 072, 079.

## Calendrier

| N° | Date | Requête visée | Volume | Intention | Rubrique | Service lié | Fichier |
|---|---|---|---|---|---|---|---|
| 101 | ven 06/11/2026 | location chaudière | 390/mois + Search Console « location chaudière reims » 171 vues | commerciale | Remplacement | depannage-chaudiere-gaz | `101-location-chaudiere-comment-ca-marche.mdx` |
| 102 | sam 07/11/2026 | ramonage chaudière gaz / obligatoire | 720 + 480 + fioul 390 + Search Console « ramonage cormontreuil » | information | Entretien | entretien-chaudiere-annuel | `102-ramonage-chaudiere-obligatoire-gaz-fioul.mdx` |
| 103 | dim 08/11/2026 | prix désembouage radiateur | 590 + 880 | transactionnelle | Prix | radiateur-froid-desembouage-purge | `103-prix-desembouage-radiateurs-ce-qui-fait-varier.mdx` |
| 104 | lun 09/11/2026 | fuite plancher chauffant / fuite sous chape | 110 + requête Search Console « fuite sous chape » | urgence | Fuite | fuite-chaudiere-circuit-chauffage | `104-fuite-plancher-chauffant-sous-chape-signes.mdx` |
| 105 | mar 10/11/2026 | pression chaudière qui monte toute seule | requête Search Console (position 36) + pression chaudière 1 000 | urgence | Chaudière gaz | fuite-chaudiere-circuit-chauffage | `105-pression-chaudiere-monte-toute-seule.mdx` |
| 106 | mer 11/11/2026 | recherche de fuite chauffage | requête Search Console « recherche de fuite reims » 78 vues | commerciale | Fuite | fuite-chaudiere-circuit-chauffage | `106-recherche-fuite-circuit-chauffage-methodes.mdx` |
| 107 | jeu 12/11/2026 | chauffe-eau gaz | 5 400 | urgence | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `107-chauffe-eau-gaz-ne-sallume-plus-causes.mdx` |
| 108 | ven 13/11/2026 | odeur de gaz | 390 | urgence | Sécurité | urgence-depannage-chauffage-chaudiere | `108-fuite-de-gaz-suspectee-bons-reflexes.mdx` |
| 109 | sam 14/11/2026 | désembouage plancher chauffant | 1 000 | transactionnelle | Plancher chauffant | radiateur-froid-desembouage-purge | `109-desembouage-plancher-chauffant-deroule-prix.mdx` |
| 110 | dim 15/11/2026 | certificat de ramonage | 390 + ramonage assurance 320 | information | Entretien | entretien-chaudiere-annuel | `110-certificat-ramonage-assurance.mdx` |
| 111 | lun 16/11/2026 | entretien pompe à chaleur | 1 300 + prix 880 + obligatoire 210 | transactionnelle | Pompe à chaleur | depannage-pompe-a-chaleur | `111-entretien-pompe-a-chaleur-obligatoire-prix.mdx` |
| 112 | mar 17/11/2026 | entretien chaudière fioul prix | 390 | transactionnelle | Prix | entretien-chaudiere-annuel | `112-prix-entretien-chaudiere-fioul.mdx` |
| 113 | mer 18/11/2026 | prix ballon eau chaude / remplacement ballon | 880 + 320 | transactionnelle | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `113-remplacement-ballon-eau-chaude-prix-deroule.mdx` |
| 114 | jeu 19/11/2026 | remplacement chaudière gaz | 1 300 + changer chaudière gaz 880 + prix remplacement 880 | transactionnelle | Remplacement | depannage-chaudiere-gaz | `114-remplacer-chaudiere-gaz-etapes-devis.mdx` |
| 115 | ven 20/11/2026 | prix circulateur / carte électronique chaudière | circulateur 2 900 + carte électronique 170 | transactionnelle | Prix | depannage-chaudiere-gaz | `115-prix-remplacement-piece-chaudiere.mdx` |
| 116 | sam 21/11/2026 | MaPrimeRénov' 2026 | 4 400 + 1 300 | information | Aides | depannage-pompe-a-chaleur | `116-maprimerenov-2026-chauffage.mdx` |
| 117 | dim 22/11/2026 | monoxyde de carbone symptômes | 14 800 + intoxication 1 600 + symptômes 1 000 | urgence | Sécurité | urgence-depannage-chauffage-chaudiere | `117-monoxyde-carbone-symptomes-intoxication.mdx` |
| 118 | lun 23/11/2026 | éco-PTZ | 22 200 | information | Aides | depannage-chaudiere-gaz | `118-eco-ptz-travaux-chauffage.mdx` |
| 119 | mar 24/11/2026 | remplacement chaudière fioul | 1 000 + vers PAC 260 | commerciale | Remplacement | depannage-pompe-a-chaleur | `119-remplacer-chaudiere-fioul-pompe-a-chaleur.mdx` |
| 120 | mer 25/11/2026 | circulateur chauffage | 2 900 + bloqué 170 + débloquer 70 | urgence | Chaudière gaz | urgence-depannage-chauffage-chaudiere | `120-circulateur-chauffage-bloque-symptomes.mdx` |
| 121 | jeu 26/11/2026 | chaudière fioul interdite | 390 + interdiction 140 + condensation 1 600 | information | Chaudière fioul | depannage-chaudiere-fioul | `121-chaudiere-fioul-interdite-ce-que-dit-la-loi.mdx` |
| 122 | ven 27/11/2026 | robinet / tête thermostatique | 12 100 + 6 600 + vanne thermostatique 2 900 | information | Radiateurs | radiateur-froid-desembouage-purge | `122-tete-thermostatique-reglage-chiffres.mdx` |
| 123 | sam 28/11/2026 | remplacer chaudière gaz par pompe à chaleur | 880 | commerciale | Remplacement | depannage-pompe-a-chaleur | `123-remplacer-chaudiere-gaz-pompe-a-chaleur.mdx` |
| 124 | dim 29/11/2026 | code erreur chaudière | 90 | urgence | Codes erreur | depannage-chaudiere-gaz | `124-chaudiere-code-erreur-premiers-reflexes.mdx` |
| 125 | lun 30/11/2026 | coup de pouce chauffage | 1 000 + CEE pompe à chaleur 320 | information | Aides | depannage-pompe-a-chaleur | `125-cee-coup-de-pouce-chauffage.mdx` |
| 126 | mar 01/12/2026 | chaudière Saunier Duval / F28 | 9 900 + F28 1 900 + code erreur 170 | urgence | Codes erreur | depannage-chaudiere-gaz | `126-chaudiere-saunier-duval-codes-erreur.mdx` |
| 127 | mer 02/12/2026 | pompe à chaleur air-eau | 12 100 + installation 1 000 | commerciale | Pompe à chaleur | depannage-pompe-a-chaleur | `127-pompe-a-chaleur-air-eau-maison-annees-70.mdx` |
| 128 | jeu 03/12/2026 | vanne 3 voies chaudière | 1 000 + eau chaude mais pas de chauffage 50 | urgence | Chaudière gaz | depannage-chaudiere-gaz | `128-chaudiere-chauffe-eau-mais-pas-radiateurs-vanne-3-voies.mdx` |
| 129 | ven 04/12/2026 | radiateur fonte | 9 900 + peindre 2 400 + rénover 590 | information | Radiateurs | radiateur-froid-desembouage-purge | `129-radiateurs-fonte-garder-renover-changer.mdx` |
| 130 | sam 05/12/2026 | thermostat d'ambiance | 2 900 + programmable 1 600 + thermostat chaudière 1 300 + sans fil 880 | information | Comprendre son chauffage | depannage-chaudiere-gaz | `130-thermostat-ambiance-programmation-chaudiere.mdx` |
| 131 | dim 06/12/2026 | chaudière Frisquet | 6 600 + code erreur 50 | urgence | Codes erreur | depannage-chaudiere-gaz | `131-chaudiere-frisquet-codes-erreur.mdx` |
| 132 | lun 07/12/2026 | détartrage ballon | 720 + ballon calcaire 170 | information | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `132-ballon-eau-chaude-calcaire-detartrage.mdx` |
| 133 | mar 08/12/2026 | gicleur chaudière fioul | 880 | information | Chaudière fioul | depannage-chaudiere-fioul | `133-gicleur-chaudiere-fioul-role-usure.mdx` |
| 134 | mer 09/12/2026 | durée de vie chaudière gaz | 720 + durée de vie chaudière 260 + fioul 70 | information | Remplacement | depannage-chaudiere-gaz | `134-duree-de-vie-chaudiere-gaz-fioul.mdx` |
| 135 | jeu 10/12/2026 | chaudière De Dietrich | 6 600 + code erreur 390 | urgence | Codes erreur | depannage-chaudiere-gaz | `135-chaudiere-de-dietrich-codes-erreur.mdx` |
| 136 | ven 11/12/2026 | purgeur automatique | 2 900 | information | Radiateurs | radiateur-froid-desembouage-purge | `136-purgeur-automatique-chauffage.mdx` |
| 137 | sam 12/12/2026 | détecteur monoxyde de carbone | 14 800 + obligatoire 1 000 | information | Sécurité | entretien-chaudiere-annuel | `137-detecteur-monoxyde-carbone-ou-placer.mdx` |
| 138 | dim 13/12/2026 | disconnecteur chaudière / remettre pression | 1 900 + 390 + 170 | urgence | Chaudière gaz | depannage-chaudiere-gaz | `138-remettre-eau-chaudiere-disconnecteur.mdx` |
| 139 | lun 14/12/2026 | chaudière Viessmann | 4 400 + codes 20 | urgence | Codes erreur | depannage-chaudiere-gaz | `139-chaudiere-viessmann-codes-erreur.mdx` |
| 140 | mar 15/12/2026 | ventouse chaudière | 1 600 | information | Chaudière gaz | depannage-chaudiere-gaz | `140-ventouse-chaudiere-role-regles.mdx` |
| 141 | mer 16/12/2026 | radiateur basse température | 1 900 + radiateur à eau 2 900 | information | Radiateurs | radiateur-froid-desembouage-purge | `141-radiateur-basse-temperature-utile.mdx` |
| 142 | jeu 17/12/2026 | chaudière hybride | 590 + prix 90 | commerciale | Remplacement | depannage-chaudiere-gaz | `142-chaudiere-hybride-avantages-limites.mdx` |
| 143 | ven 18/12/2026 | courbe de chauffe | 480 + sonde extérieure 390 + régulation 260 | information | Comprendre son chauffage | depannage-chaudiere-gaz | `143-courbe-de-chauffe-sonde-exterieure-reglage.mdx` |
| 144 | sam 19/12/2026 | chaudière Atlantic | 1 300 + code erreur 140 | urgence | Codes erreur | depannage-chaudiere-gaz | `144-chaudiere-atlantic-codes-erreur.mdx` |
| 145 | dim 20/12/2026 | température idéale maison | 1 300 + économiser chauffage 210 | information | Comprendre son chauffage | entretien-chaudiere-annuel | `145-temperature-ideale-maison-economiser-chauffage.mdx` |
| 146 | lun 21/12/2026 | corps de chauffe chaudière | 880 + entartré 10 | information | Chaudière gaz | depannage-chaudiere-gaz | `146-corps-de-chauffe-chaudiere-entartre.mdx` |
| 147 | mar 22/12/2026 | résistance ballon eau chaude | 880 + thermostat ballon 1 000 | urgence | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `147-resistance-thermostat-ballon-eau-chaude-panne.mdx` |
| 148 | mer 23/12/2026 | fioul domestique / biofioul | 9 900 + biofioul 1 000 + chaudière biofioul 480 | information | Chaudière fioul | depannage-chaudiere-fioul | `148-biofioul-fioul-domestique-chaudiere.mdx` |
| 149 | jeu 24/12/2026 | code erreur ELM Leblanc | 170 | urgence | Codes erreur | depannage-chaudiere-gaz | `149-chaudiere-elm-leblanc-codes-erreur.mdx` |
| 150 | ven 25/12/2026 | pot à boue / filtre magnétique | 720 + 210 + filtre chaudière 110 | information | Radiateurs | radiateur-froid-desembouage-purge | `150-pot-a-boue-filtre-magnetique-chauffage.mdx` |
| 151 | sam 26/12/2026 | soupape de sécurité chaudière | 1 600 | urgence | Fuite | fuite-chaudiere-circuit-chauffage | `151-soupape-securite-chaudiere-goutte.mdx` |
| 152 | dim 27/12/2026 | dimensionnement pompe à chaleur | 480 + puissance 70 | information | Pompe à chaleur | depannage-pompe-a-chaleur | `152-puissance-pompe-a-chaleur-dimensionnement.mdx` |
| 153 | lun 28/12/2026 | chaudière murale gaz / au sol | 1 300 + 480 | information | Comprendre son chauffage | depannage-chaudiere-gaz | `153-chaudiere-murale-ou-au-sol.mdx` |
| 154 | mar 29/12/2026 | code erreur Chaffoteaux | 170 + 90 | urgence | Codes erreur | depannage-chaudiere-gaz | `154-chaudiere-chaffoteaux-codes-erreur.mdx` |
| 155 | mer 30/12/2026 | bruit pompe à chaleur | 880 + bruit voisinage 170 | urgence | Pompe à chaleur | depannage-pompe-a-chaleur | `155-pompe-a-chaleur-bruyante-causes.mdx` |
| 156 | jeu 31/12/2026 | température ballon eau chaude | 390 + réglage 90 + légionellose 50 | information | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `156-temperature-ballon-eau-chaude-legionellose.mdx` |
| 157 | ven 01/01/2027 | isolation tuyaux chauffage | 1 300 | information | Comprendre son chauffage | entretien-chaudiere-annuel | `157-isolation-tuyaux-chauffage-calorifuge.mdx` |
| 158 | sam 02/01/2027 | chaudière fuit | 590 + fuite chaudière 590 | urgence | Fuite | fuite-chaudiere-circuit-chauffage | `158-chaudiere-fuit-origine-fuite.mdx` |
| 159 | dim 03/01/2027 | bouton réarmement chaudière fioul | 140 + en sécurité 40 | urgence | Chaudière fioul | depannage-chaudiere-fioul | `159-bouton-rearmement-chaudiere-fioul.mdx` |
| 160 | lun 04/01/2027 | consommation chaudière gaz | 210 | information | Chaudière gaz | depannage-chaudiere-gaz | `160-consommation-chaudiere-gaz-normale.mdx` |
| 161 | mar 05/01/2027 | durée de vie pompe à chaleur | 1 000 + garantie 260 | information | Pompe à chaleur | depannage-pompe-a-chaleur | `161-duree-de-vie-pompe-a-chaleur-garantie.mdx` |
| 162 | mer 06/01/2027 | durée de vie ballon eau chaude | 260 | information | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `162-duree-de-vie-ballon-eau-chaude-usure.mdx` |
| 163 | jeu 07/01/2027 | chaudière gaz interdite | 170 + 2026 50 | information | Remplacement | depannage-chaudiere-gaz | `163-chaudiere-gaz-interdite-2026.mdx` |
| 164 | ven 08/01/2027 | changer radiateur | 320 + remplacer 110 | commerciale | Radiateurs | radiateur-froid-desembouage-purge | `164-remplacer-radiateur-eau-deroule.mdx` |
| 165 | sam 09/01/2027 | eau chaude sanitaire | 720 + micro-accumulation 70 + double service 30 | information | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `165-eau-chaude-sanitaire-ballon-ou-chaudiere.mdx` |
| 166 | dim 10/01/2027 | nettoyage cuve fioul | 880 + neutralisation 590 + cuve enterrée 170 | information | Chaudière fioul | depannage-chaudiere-fioul | `166-nettoyage-neutralisation-cuve-fioul.mdx` |
| 167 | lun 11/01/2027 | passoire thermique location | 210 | information | DPE | depannage-chaudiere-gaz | `167-dpe-chauffage-passoire-thermique-bailleur.mdx` |
| 168 | mar 12/01/2027 | carte électronique chaudière | 170 | urgence | Chaudière gaz | depannage-chaudiere-gaz | `168-carte-electronique-chaudiere-panne-signes.mdx` |
| 169 | mer 13/01/2027 | pompe à chaleur air-air ou air-eau | 170 | commerciale | Pompe à chaleur | depannage-pompe-a-chaleur | `169-pompe-a-chaleur-air-air-ou-air-eau.mdx` |
| 170 | jeu 14/01/2027 | chaudière gaz plus d'eau chaude | 70 + 40 | urgence | Chaudière gaz | depannage-chaudiere-gaz | `170-chaudiere-chauffe-mais-plus-eau-chaude.mdx` |
| 171 | ven 15/01/2027 | chaudière basse température | 590 | information | Remplacement | depannage-chaudiere-gaz | `171-chaudiere-basse-temperature-remplacer.mdx` |
| 172 | sam 16/01/2027 | produit désembouage / inhibiteur | 260 + 70 | information | Radiateurs | radiateur-froid-desembouage-purge | `172-produit-desembouage-inhibiteur.mdx` |
| 173 | dim 17/01/2027 | ballon eau chaude fuit | 390 | urgence | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `173-ballon-eau-chaude-fuit-reparer-ou-changer.mdx` |
| 174 | lun 18/01/2027 | collecteur plancher chauffant | 1 000 + hydraulique 1 300 | information | Plancher chauffant | radiateur-froid-desembouage-purge | `174-collecteur-plancher-chauffant-reglage.mdx` |
| 175 | mar 19/01/2027 | sonde température chaudière | 210 + 110 | urgence | Chaudière gaz | depannage-chaudiere-gaz | `175-sonde-temperature-chaudiere-defaillante.mdx` |
| 176 | mer 20/01/2027 | conduit 3CE | 260 | information | Copropriété | depannage-chaudiere-gaz | `176-conduit-3ce-chaudiere-copropriete.mdx` |
| 177 | jeu 21/01/2027 | chaudière fioul consommation | 260 | information | Chaudière fioul | depannage-chaudiere-fioul | `177-chaudiere-fioul-consommation-grands-froids.mdx` |
| 178 | ven 22/01/2027 | température hors gel | 390 + mode hors gel 10 | information | Absence | urgence-depannage-chauffage-chaudiere | `178-vacances-hiver-chauffage-hors-gel.mdx` |
| 179 | sam 23/01/2027 | évacuation condensats chaudière | condensats 50 + évacuation 20 | urgence | Chaudière gaz | depannage-chaudiere-gaz | `179-evacuation-condensats-bouchee-chaudiere.mdx` |
| 180 | dim 24/01/2027 | vase d'expansion pompe à chaleur | 210 | information | Pompe à chaleur | depannage-pompe-a-chaleur | `180-vase-expansion-pompe-a-chaleur.mdx` |
| 181 | lun 25/01/2027 | anode ballon | 210 | urgence | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `181-ballon-eau-chaude-odeur-oeuf-pourri-anode.mdx` |
| 182 | mar 26/01/2027 | chaudière après coupure de courant | pas de volume mesuré (symptôme) | urgence | Chaudière gaz | urgence-depannage-chauffage-chaudiere | `182-chaudiere-redemarre-mal-apres-coupure-courant.mdx` |
| 183 | mer 27/01/2027 | chaudière ne chauffe pas assez grand froid | pas de volume mesuré (symptôme) | urgence | Urgence | urgence-depannage-chauffage-chaudiere | `183-chaudiere-puissance-insuffisante-grands-froids.mdx` |
| 184 | jeu 28/01/2027 | consommation pompe à chaleur | 320 | information | Pompe à chaleur | depannage-pompe-a-chaleur | `184-pompe-a-chaleur-consommation-hiver.mdx` |
| 185 | ven 29/01/2027 | chauffage maison ancienne | 70 | information | Comprendre son chauffage | depannage-chaudiere-gaz | `185-chauffage-maison-ancienne-brique-craie.mdx` |
| 186 | sam 30/01/2027 | ballon eau chaude 200 litres | 110 + capacité 50 | information | Ballon d'eau chaude | ballon-eau-chaude-cumulus | `186-capacite-ballon-eau-chaude-combien-litres.mdx` |
| 187 | dim 31/01/2027 | flamme jaune chaudière | pas de volume mesuré (symptôme) | urgence | Sécurité | depannage-chaudiere-gaz | `187-flamme-chaudiere-gaz-jaune-orange.mdx` |
| 188 | lun 01/02/2027 | chaudière tourne en continu | pas de volume mesuré (symptôme) | urgence | Chaudière gaz | depannage-chaudiere-gaz | `188-chaudiere-gaz-tourne-en-continu.mdx` |
| 189 | mar 02/02/2027 | garantie chaudière | 210 | information | Remplacement | depannage-chaudiere-gaz | `189-garantie-chaudiere-ce-qui-est-couvert.mdx` |
| 190 | mer 03/02/2027 | chauffage collectif ou individuel | 170 | information | Copropriété | depannage-chaudiere-gaz | `190-chauffage-collectif-ou-individuel.mdx` |
| 191 | jeu 04/02/2027 | équilibrage radiateurs | à mesurer (Planificateur) | informationnelle | Radiateurs | radiateur-froid-desembouage-purge | `191-equilibrage-radiateurs-chauffage-central.mdx` |
| 192 | ven 05/02/2027 | répartiteur frais chauffage | 590 + répartiteur 320 | information | Copropriété | radiateur-froid-desembouage-purge | `192-repartiteurs-frais-chauffage.mdx` |
| 193 | sam 06/02/2027 | chaudière fin d'hiver | pas de volume mesuré (saison) | information | Entretien | entretien-chaudiere-annuel | `193-chaudiere-fin-hiver-verifier-avant-printemps.mdx` |
