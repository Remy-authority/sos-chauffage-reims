# SEO-GEO-PLAN.md — SOS Chauffage Reims

> Plan mots-clés + architecture de pages, rédigé par l'agent SEO le 27/07/2026.
> **Ce document est la référence unique des pages du site : le Builder crée
> exactement les pages listées ici, ni plus ni moins.** Rien n'est encore
> réécrit au moment de la rédaction : les fichiers `content/services/*.json`
> et `content/zones/*.json` actuels sont encore ceux de Metz (débouchage
> canalisation), hérités de la duplication du 27/07/2026, à renommer et
> réécrire intégralement (voir section 6).
>
> ⏰ Rappel calendaire : ce site doit être en ligne avant fin septembre 2026
> pour être indexé au démarrage du pic de demande (octobre-novembre). Le
> `CALENDRIER-EDITORIAL.md` qui accompagne ce plan est construit dans cette
> logique : les sujets utiles à l'hiver sortent en premier, le premier
> trimestre de publication est le plus fourni.
>
> Contexte concurrentiel (benchmark) : page 1 tenue par IZI by EDF
> (plateforme nationale adossée à EDF, le concurrent le plus sérieux),
> des annuaires/plateformes génériques, et des artisans locaux pour la
> plupart faibles, à l'exception de La Maison du Chauffage et Coutiez SAS
> (corrects mais pas premium). Aucun artisan local vraiment premium :
> notre angle est le site local expert du dépannage urgent, ce que ni
> IZI (générique, pas d'ancrage local réel) ni les artisans faibles
> n'offrent. Volume estimé 250-500 recherches/mois, CPC 6-12 euros.

---

## 0. Cadrage métier (rappel, ne pas dévier)

Le site couvre le **dépannage chauffage et chaudière** : chaudière en panne
(gaz ou fioul), pompe à chaleur en panne, radiateur froid, fuite sur chaudière
ou circuit de chauffage, panne de ballon d'eau chaude, et l'entretien annuel
obligatoire. **Le site NE couvre PAS** :

- la plomberie générale ni la recherche de fuite d'eau sanitaire (hors
  chauffage) : déjà couvert par `sos-fuite-angers.fr` ailleurs dans le
  portefeuille ;
- le débouchage de canalisations : déjà couvert par
  `sos-debouchage-metz.fr` ; ne jamais utiliser le mot « désembouage » dans un
  sens canalisation/évacuation ici, il désigne exclusivement le nettoyage du
  circuit de chauffage (radiateurs, tuyauterie de chauffage) ;
- l'électricité générale : déjà couvert par `sos-electricien-annecy.fr` et
  `sos-electricien-dijon.fr` ;
- la climatisation, les poêles à bois/granulés et l'installation neuve
  (chaudière neuve, pompe à chaleur neuve hors dépannage) : marchés et
  installateurs différents, hors positionnement « dépannage » de ce site. La
  pompe à chaleur est couverte ici uniquement sous l'angle dépannage d'un
  appareil existant, jamais sous l'angle installation/vente.

Doctrine SEO/GEO du CLAUDE.md : pas de fiche Google Business, pas d'avis, SEO
organique + citabilité IA uniquement. Aucun chiffre inventé (pas de nombre
d'interventions, pas d'années d'expérience, pas de fréquence d'entretien
chiffrée sans source), aucune fausse certification, pas de tiret cadratin
dans les textes visibles (virgule ou point à la place).

---

## 1. Carte des mots-clés

Priorité : **Haute** = intention transactionnelle urgente, à cibler dès la
mise en ligne. **Moyenne** = decision-stage ou informationnelle à fort volume.
**Basse** = longue traîne ou appareil moins répandu localement, utile pour la
couverture mais pas prioritaire pour le lancement.

### 1.1 Requêtes d'urgence (intention transactionnelle, priorité Haute)

| Mot-clé | Intention de recherche | Page cible |
|---|---|---|
| chauffagiste urgence Reims | Trouver un pro disponible immédiatement | `urgence-depannage-chauffage-chaudiere` |
| dépannage chaudière Reims | Panne active, recherche d'un service | `urgence-depannage-chauffage-chaudiere` |
| chaudière en panne | Panne active, souvent sans mention de ville (mobile) | `urgence-depannage-chauffage-chaudiere` |
| panne de chauffage | Panne active, terme générique le plus cherché | `urgence-depannage-chauffage-chaudiere` |
| plus de chauffage que faire | Panne active, tournure conversationnelle (fort en GEO) | `urgence-depannage-chauffage-chaudiere` |
| chauffagiste 24h/24 Reims | Recherche de disponibilité, souvent le soir/week-end | `urgence-depannage-chauffage-chaudiere` |
| plus d'eau chaude Reims | Panne active, même trajet de recherche que la panne de chauffage | `ballon-eau-chaude-cumulus` |
| fuite chaudière Reims | Panne active avec composante urgence (dégât des eaux) | `fuite-chaudiere-circuit-chauffage` |

### 1.2 Requêtes par service et par appareil (decision-stage, priorité Haute à Moyenne)

| Mot-clé | Intention de recherche | Priorité | Page cible |
|---|---|---|---|
| dépannage chaudière gaz Reims | Panne identifiée, énergie gaz | Haute | `depannage-chaudiere-gaz` |
| chaudière gaz qui ne démarre plus | Panne identifiée, gaz | Haute | `depannage-chaudiere-gaz` |
| dépannage chaudière fioul Reims | Panne identifiée, énergie fioul | Moyenne | `depannage-chaudiere-fioul` |
| chaudière fioul en panne | Panne identifiée, fioul | Moyenne | `depannage-chaudiere-fioul` |
| pompe à chaleur en panne Reims | Panne identifiée, PAC | Moyenne | `depannage-pompe-a-chaleur` |
| PAC qui ne chauffe plus | Panne identifiée, PAC, formulation courte | Moyenne | `depannage-pompe-a-chaleur` |
| pompe à chaleur qui fait du bruit | Symptôme, avant diagnostic | Basse | `depannage-pompe-a-chaleur` |
| radiateur froid Reims | Symptôme, avant diagnostic (chaudière ou circuit) | Haute | `radiateur-froid-desembouage-purge` |
| purge radiateur | Geste utilisateur, souvent avant appel | Moyenne | `radiateur-froid-desembouage-purge` |
| désembouage circuit de chauffage | Solution recherchée après diagnostic | Basse | `radiateur-froid-desembouage-purge` |
| fuite circuit de chauffage | Panne identifiée, hors chaudière elle-même | Moyenne | `fuite-chaudiere-circuit-chauffage` |
| ballon d'eau chaude en panne | Panne identifiée | Haute | `ballon-eau-chaude-cumulus` |
| cumulus qui ne chauffe plus | Panne identifiée, formulation courante | Moyenne | `ballon-eau-chaude-cumulus` |
| entretien chaudière Reims | Recherche planifiée, non urgente | Moyenne | `entretien-chaudiere-annuel` |
| contrat entretien chaudière obligatoire | Recherche informationnelle/réglementaire | Moyenne | `entretien-chaudiere-annuel` |

### 1.3 Requêtes informationnelles (haut de funnel, blog + FAQ, forte valeur GEO)

Ces requêtes sont posées telles quelles à ChatGPT/Perplexity/AI Overviews :
c'est le terrain de jeu du GEO. Contenu factuel, structuré en questions/
réponses, sans avoir besoin d'invoquer d'avis ou de fiche Google.

- pourquoi ma chaudière se met en sécurité
- pourquoi mon radiateur est froid en haut ou froid en bas
- combien coûte un dépannage de chaudière (facteurs de prix, pas de chiffre
  inventé)
- chaudière gaz ou fioul, quelles pannes sont différentes
- pompe à chaleur ou chaudière, quelles pannes sont différentes
- faut-il réparer ou remplacer une chaudière ancienne
- à quoi sert le groupe de sécurité du ballon d'eau chaude
- que couvre un contrat d'entretien annuel de chaudière
- pourquoi entretenir sa chaudière avant l'hiver plutôt qu'en pleine saison
- désembouage du circuit de chauffage, à quoi ça sert
- chaudière qui fait du bruit, faut-il s'inquiéter
- pression de chaudière trop basse ou trop haute, que faire

### 1.4 Requêtes locales longue traîne (pages zones, priorité Haute pour la conversion)

Motif = `[service ou "dépannage chaudière"] + [commune]`, ex. « dépannage
chaudière Tinqueux », « chauffagiste Bétheny ». Volume unitaire faible mais
conversion très élevée : recherche géolocalisée saisie depuis un mobile
pendant la panne.

### 1.5 Négatif / à ne jamais cibler

- climatisation, clim, poêle à bois, poêle à granulés, installation de pompe
  à chaleur neuve, installation de chaudière neuve hors remplacement d'un
  appareil en fin de vie (hors positionnement dépannage, cf. cadrage) ;
- plomberie générale, recherche de fuite d'eau sanitaire, débouchage de
  canalisation (chevauchement avec Angers et Metz, cf. cadrage) ;
- électricien, installation électrique (chevauchement avec Annecy et Dijon) ;
- toute requête impliquant avis Google, note, classement (doctrine sans avis).

Note : contrairement au site Metz où « plombier » était à éviter, **« chauffagiste »
n'est pas un mot à éviter ici, c'est le terme métier cible** à utiliser
naturellement dans les H1, intros et FAQ.

---

## 2. Architecture de pages

### 2.1 Pages SERVICES (8) — `content/services/*.json`

Ordre = ordre `order` recommandé (urgence en premier). Les 8 fichiers déjà
présents dans `content/services/` sont des templates Metz à renommer et
réécrire intégralement (mapping exact en section 6).

| order | slug | H1 cible | Mot-clé principal | Angle |
|---|---|---|---|---|
| 1 | `urgence-depannage-chauffage-chaudiere` | Urgence dépannage chauffage et chaudière à Reims | chauffagiste urgence Reims, chaudière en panne | Disponibilité immédiate, tous types d'appareils, gestes de sécurité en attendant |
| 2 | `depannage-chaudiere-gaz` | Dépannage de chaudière à gaz à Reims | chaudière gaz en panne Reims | Causes propres au gaz (mise en sécurité, pression) |
| 3 | `depannage-chaudiere-fioul` | Dépannage de chaudière au fioul à Reims | chaudière fioul en panne Reims | Causes propres au fioul (démarrage à froid, gicleur, cuve) |
| 4 | `depannage-pompe-a-chaleur` | Dépannage de pompe à chaleur à Reims | pompe à chaleur en panne Reims | Diagnostic PAC air-eau/air-air, distinct d'une panne de chaudière classique |
| 5 | `radiateur-froid-desembouage-purge` | Radiateur froid, purge et désembouage à Reims | radiateur froid Reims, désembouage circuit chauffage | Diagnostic radiateur froid (air, boue, vanne), geste utilisateur possible vs intervention |
| 6 | `fuite-chaudiere-circuit-chauffage` | Fuite de chaudière et de circuit de chauffage à Reims | fuite chaudière Reims | Urgence dégât des eaux, distinction fuite chaudière vs fuite circuit |
| 7 | `ballon-eau-chaude-cumulus` | Dépannage de ballon d'eau chaude et cumulus à Reims | ballon eau chaude en panne Reims | Panne d'eau chaude, groupe de sécurité, résistance |
| 8 | `entretien-chaudiere-annuel` | Entretien annuel de chaudière à Reims | entretien chaudière Reims, contrat entretien | Obligation réglementaire, contenu de la visite, meilleur moment (avant l'hiver) |

Notes de construction (structure identique au modèle
`curage-canalisation-haute-pression.json` de Metz : `intro`, `bullets` (3),
`blocks` (2-3), `relatedServices` (2), `faq` (3-4), `image`) :

- Page 1 (urgence) : bloc « que faire en attendant » avec gestes sûrs (ex.
  couper le chauffage si fuite active, ne pas forcer sur la chaudière, protéger
  le sol en cas d'écoulement) — pas de manipulation technique dangereuse
  (jamais d'instruction touchant au gaz).
- Pages 2, 3 et 4 (gaz / fioul / PAC) : bien distinguer les causes de panne
  propres à chaque énergie/appareil (mise en sécurité et pression pour le gaz,
  encrassement du gicleur et démarrage à froid pour le fioul, dégivrage et
  unité extérieure pour la PAC) pour éviter le duplicate entre les trois
  pages.
- Page 5 (radiateur froid / désembouage) : rappeler explicitement que ce
  désembouage concerne le circuit de chauffage (radiateurs, tuyauterie), pas
  les canalisations d'évacuation, pour éviter toute confusion GEO avec le site
  Metz.
- Page 8 (entretien) : formuler la périodicité en renvoyant à « la
  réglementation en vigueur » sans donner de chiffre précis tant que Rémy n'a
  pas validé une source (l'entretien annuel des chaudières est encadré par un
  texte réglementaire, mais le CEO doit faire confirmer le détail exact avant
  affichage, cf. doctrine « donnée non confirmée = DEMO »). Inclure un bloc
  « réparer ou remplacer » : la question du remplacement d'une chaudière en
  fin de vie est traitée ici et en blog plutôt que sur une page dédiée, pour
  rester dans le positionnement dépannage et non vente d'installation neuve.
- Le mot « plombier » ne doit apparaître nulle part dans ces pages.

### 2.2 Pages ZONES (12) — `content/zones/*.json`

Communes de l'agglomération rémoise retenues par proximité et population,
codes postaux **vérifiés un par un le 27/07/2026 via l'API officielle
geo.api.gouv.fr** (`https://geo.api.gouv.fr/communes?nom=<commune>&fields=nom,code,codesPostaux,centre,population`),
jamais de mémoire, conformément à la leçon Metz (une erreur de code postal
est déjà passée en prod). Rayon proposé : **15 km autour de Reims** (à
trancher par Rémy dans `config/site.config.ts` → `serviceArea.radiusKm`),
couvre la plus éloignée des 12 (Muizon, 12,5 km) avec marge. Reims elle-même
n'a **pas** de page zone dédiée (ville de base, comme Metz dans le site n°3) :
ses quartiers sont cités dans `serviceArea.districts` et dans le maillage des
pages services/accueil, pas en pages séparées.

| slug | Commune | Code postal (vérifié geo.api.gouv.fr) | Distance de Reims | Pourquoi cette commune |
|---|---|---|---|---|
| `tinqueux` | Tinqueux | 51430 | 4,8 km ouest | Plus grande commune limitrophe (10 771 hab.), mix pavillonnaire et collectif |
| `betheny` | Bétheny | 51450 | 5,0 km nord | Résidentiel dense (6 975 hab.), proche zone d'activités |
| `cormontreuil` | Cormontreuil | 51350 | 4,1 km sud | Pavillonnaire (6 534 hab.), commune limitrophe directe |
| `bezannes` | Bezannes | 51430 | 5,8 km sud-ouest | Quartier d'affaires récent (gare TGV, 5 039 hab.), constructions neuves |
| `witry-les-reims` | Witry-lès-Reims | 51420 | 6,4 km nord-est | Pavillonnaire en expansion (4 950 hab.) |
| `saint-brice-courcelles` | Saint-Brice-Courcelles | 51370 | 5,2 km nord-ouest | Résidentiel (3 566 hab.), proche Reims |
| `cernay-les-reims` | Cernay-lès-Reims | 51420 | 3,8 km est | Commune limitrophe directe, pavillonnaire (1 624 hab.) |
| `taissy` | Taissy | 51500 | 5,8 km sud-est | Pavillonnaire (2 194 hab.), lisière de la Montagne de Reims |
| `muizon` | Muizon | 51140 | 12,5 km ouest | Plus excentrée (2 081 hab.), habitat individuel, bon complément fioul |
| `sillery` | Sillery | 51500 | 9,3 km sud-est | Village viticole (1 824 hab.), habitat ancien et pavillonnaire |
| `prunay` | Prunay | 51360 | 9,8 km est | Habitat individuel (1 042 hab.), secteur plus rural |
| `puisieulx` | Puisieulx | 51500 | 7,0 km sud-est | Petit village résidentiel (466 hab.) |

Ces 12 communes couvrent les quatre points cardinaux autour de Reims
(nord : Bétheny ; sud : Cormontreuil, Taissy ; est : Cernay-lès-Reims,
Prunay ; ouest : Tinqueux, Muizon ; nord-ouest : Saint-Brice-Courcelles ;
nord-est : Witry-lès-Reims ; sud-ouest : Bezannes ; sud-est : Sillery,
Puisieulx), avec un mix de communes limitrophes denses et de communes plus
excentrées à l'habitat plus ancien, ce qui permet de différencier
réellement chaque page (cf. angles ci-dessous) plutôt que de dupliquer un
même contenu géolocalisé douze fois.

**⚠️ Action Builder avant publication** : revérifier ces codes postaux au
moment de la mise en ligne (l'API peut évoluer entre-temps) plutôt que de
recopier ce tableau sans contrôle.

Structure de page (identique au modèle `woippy.json` de Metz) : `context`
(1 phrase factuelle et neutre, pas de superlatif creux), `intro`, `blocks`
(prestations dans la commune + urgence + communes limitrophes desservies),
`neighbours` (2-3), `faq` (3-4). Angle propre par page :

- **Bezannes** : forte proportion de logements récents → chaudières récentes,
  pannes plutôt liées à la régulation/mise en service qu'à la vétusté, bon
  angle pour parler mise en service plutôt qu'entretien d'urgence.
- **Tinqueux, Bétheny, Cormontreuil, Saint-Brice-Courcelles, Cernay-lès-Reims** :
  communes limitrophes denses, mix pavillonnaire/collectif → mettre en avant
  la rapidité d'intervention depuis Reims.
- **Witry-lès-Reims, Taissy** : secteurs pavillonnaires en expansion →
  chaudières d'âges variés, bon terrain pour le bloc réparer/remplacer.
- **Muizon, Sillery, Prunay, Puisieulx** : communes plus excentrées et à
  l'habitat plus ancien (villages viticoles côté Sillery/Puisieulx) → bon
  terrain pour les chaudières fioul et l'entretien préventif avant l'hiver.

### 2.3 Page listing zones

`app/zones/page.tsx` : lister les 12 communes ci-dessus + Reims, avec lien
vers chaque page zone. Pas de contenu à écrire ici, juste s'assurer que le
Builder couvre les 12 zones du tableau 2.2.

### 2.4 Page d'accueil

H1 recommandé : « Dépannage chauffage et chaudière à Reims, intervention
rapide ». Reprend la liste des 8 services en aperçu + zone de couverture
(Reims + 12 communes) + FAQ homepage (5-6 questions transversales, mix
urgence/prix/process, tirées de la section 1.3) :

1. Que faire si ma chaudière tombe en panne en plein hiver ?
2. Intervenez-vous le week-end et en soirée ?
3. Combien coûte un dépannage de chaudière ?
4. Faut-il réparer ou remplacer une chaudière ancienne ?
5. Intervenez-vous sur les chaudières gaz, fioul et les pompes à chaleur ?
6. Que couvre l'entretien annuel obligatoire de la chaudière ?

---

## 3. Stratégie GEO (citabilité IA)

1. **FAQ systématique** sur chaque page (`faq[]`) avec des réponses
   autonomes : une réponse doit avoir du sens citée seule, hors contexte de la
   page, car c'est ainsi que les moteurs IA l'extraient.
2. **Réponses courtes en tête de bloc** : première phrase = réponse directe à
   la question du H2/FAQ, développement ensuite. Format « question → réponse
   → nuance/exception ».
3. **`llms.txt`** (`app/llms.txt/route.ts`, déjà présent dans le template) : à
   tenir à jour avec la liste des 8 services + 12 zones + articles publiés,
   description en une ligne par page. Vérifier avec le Builder que la route
   régénère bien la liste dynamiquement.
4. **Articles de désambiguïsation métier** (section 1.3) : « chaudière gaz ou
   fioul, quelles pannes sont différentes », « pompe à chaleur ou chaudière,
   quelles pannes sont différentes », « faut-il réparer ou remplacer une
   chaudière ancienne ». Ce type de contenu est très repris tel quel par les
   IA génératives sur les requêtes de comparaison.
5. **Données structurées** : le template gère un schema `Plumber` via
   `lib/seo.ts` (hérité du site débouchage). Pour ce site, schema.org propose
   un type plus précis : **`HVACBusiness`** (sous-type de
   `HomeAndConstructionBusiness`), qui correspond exactement au métier
   chauffage/chaudière. À faire vérifier et adapter par le Builder plutôt que
   de garder `Plumber` par défaut. Ajouter le balisage `FAQPage` sur les blocs
   `faq[]` s'il n'est pas déjà généré automatiquement.
6. **Pas de contenu dupliqué entre zones** : chaque page zone garde un angle
   propre (type d'habitat, ancienneté, énergie dominante), voir section 2.2.

---

## 4. Maillage interne

- Chaque page service renvoie vers les 2 pages zones les plus proches du cœur
  de cible (via `relatedServices` + liens zones dans les blocs texte).
- Chaque page zone renvoie vers la page service la plus probable pour cette
  commune (ex. Sillery/Puisieulx/Muizon, habitat plus ancien → mettre en
  avant `depannage-chaudiere-fioul` et `entretien-chaudiere-annuel` en
  premier lien ; Bezannes, logements récents → `depannage-pompe-a-chaleur`
  possible en second plan, urgence en premier quand même).
- Chaque article de blog (section GEO) renvoie vers 1-2 pages services
  pertinentes en fin d'article, pas un bloc générique répété.

---

## 5. Ce qui reste à trancher par Rémy

- Rayon d'intervention exact (`serviceArea.radiusKm`) : je propose 15 km,
  cohérent avec l'agglomération rémoise resserrée (plus dense que le rayon 20
  km retenu pour Metz).
- Validation du domaine `sos-chauffage-reims.fr` (statut au 27/07/2026 :
  disponible, pas encore acheté, cf. `docs/ETAT.md`).
- Périodicité exacte de l'entretien annuel de chaudière à afficher en page 8 :
  ne pas publier de chiffre avant confirmation d'une source fiable (cf. note
  section 2.1).

---

## 6. Résumé pour le Builder

1. Renommer et réécrire intégralement les 8 fichiers `content/services/*.json`
   (actuellement des templates Metz) selon le mapping suivant, en suivant la
   structure du tableau 2.1 :

   | Fichier Metz actuel | Nouveau fichier Reims |
   |---|---|
   | `urgence-debouchage-canalisation.json` | `urgence-depannage-chauffage-chaudiere.json` |
   | `debouchage-wc-toilettes-bouchees.json` | `depannage-chaudiere-gaz.json` |
   | `debouchage-evier-lavabo-douche.json` | `depannage-chaudiere-fioul.json` |
   | `curage-canalisation-haute-pression.json` | `depannage-pompe-a-chaleur.json` |
   | `inspection-camera-canalisation.json` | `radiateur-froid-desembouage-purge.json` |
   | `debouchage-canalisation-enterree-regard.json` | `fuite-chaudiere-circuit-chauffage.json` |
   | `debouchage-bac-a-graisse.json` | `ballon-eau-chaude-cumulus.json` |
   | `debouchage-colonne-immeuble-copropriete.json` | `entretien-chaudiere-annuel.json` |

2. Renommer et réécrire intégralement les 12 fichiers `content/zones/*.json`
   (actuellement des communes de Metz) selon le mapping suivant, contenu
   entièrement nouveau à partir du tableau 2.2 :

   | Fichier Metz actuel | Nouveau fichier Reims |
   |---|---|
   | `montigny-les-metz.json` | `tinqueux.json` |
   | `woippy.json` | `betheny.json` |
   | `marly.json` | `cormontreuil.json` |
   | `le-ban-saint-martin.json` | `bezannes.json` |
   | `longeville-les-metz.json` | `witry-les-reims.json` |
   | `moulins-les-metz.json` | `saint-brice-courcelles.json` |
   | `saint-julien-les-metz.json` | `cernay-les-reims.json` |
   | `ars-sur-moselle.json` | `taissy.json` |
   | `marange-silvange.json` | `muizon.json` |
   | `scy-chazelles.json` | `sillery.json` |
   | `plappeville.json` | `prunay.json` |
   | `augny.json` | `puisieulx.json` |

3. Mettre à jour `config/site.config.ts` : `trade`, `city`, `serviceArea`
   (base Reims, radiusKm 15, districts = quartiers de Reims, à faire
   confirmer par le CEO avant usage plutôt que de les improviser),
   `usps`/`methods` adaptés au chauffage (ex. caméra thermique, manomètre de
   pression, détecteur de gaz portatif, plutôt que les équivalents
   canalisation de Metz), `homeFaq` à partir de la section 2.4, palette
   couleurs propre à ce site (chaleur maîtrisée, différente d'Angers, Annecy,
   Metz et Dijon, cf. CLAUDE.md).
4. Ne jamais utiliser « désembouage » dans un sens canalisation/évacuation :
   ici il désigne uniquement le circuit de chauffage.
5. Ne jamais afficher les codes postaux du tableau 2.2 sans les avoir
   revérifiés au moment de la mise en ligne.
6. Adapter le schema.org de `lib/seo.ts` de `Plumber` vers `HVACBusiness`
   (voir section 3, point 5).
