# ETAT.md — Journal de bord SOS Chauffage Reims

> Mémoire du projet. Chaque session lit ce fichier en arrivant et le met à jour avant de finir.
> Dernière mise à jour : 2026-07-27 (création du dossier, session CEO-portefeuille).

---

## 🔖 POINT DE REPRISE (état exact au 27/07/2026 — à lire en premier)

**Site n°5 du portefeuille** (métier : dépannage chauffage/chaudière, ville : Reims, 51). Rien
n'est en ligne : dossier créé par duplication de **`sos-debouchage-metz.fr`** (socle design
PROTEC-DARD + process éprouvés), contenu Metz nettoyé, git initialisé.

**⏰ IMPÉRATIF CALENDAIRE : ce site doit être EN LIGNE avant fin septembre 2026.** Le pic de
demande chauffage/chaudière démarre en octobre (première vague de froid) : un site mis en ligne
fin septembre a 4-6 semaines pour être indexé et commencer à monter avant le pic. Chaque semaine
de retard = des appels perdus pendant LA saison qui justifie ce site. Décision de Rémy : Reims
passe AVANT Clermont-Ferrand précisément pour ça.

**Opportunité validée** par le benchmark vague 2 (détail : `RENT & RANK/docs/BENCHMARK.md`) :
verdict 🟡 Jouable, n°5 du top 5 mais LE PLUS GROS VOLUME du groupe (~250-500 recherches/mois
estimées, CPC 6-12 €). Page 1 : 1 annuaire, 3 plateformes dont IZI by EDF (le concurrent le plus
sérieux : plateforme nationale adossée à EDF, PAS un artisan local), 4 artisans locaux faibles,
2 corrects (La Maison du Chauffage, Coutiez SAS). Aucun artisan local vraiment premium : la
fenêtre est là. Saisonnalité assumée : pic octobre-février, creux été (documenté, c'est le prix
du gros volume hivernal).

**Domaine pressenti : `sos-chauffage-reims.fr`** (vérifié DISPONIBLE à l'AFNIC le 27/07/2026,
ACHETÉ le 27/07/2026 (validation registrar en cours) ; 8 candidats libres dont chauffagiste-reims.fr, voir conversation
CEO-portefeuille). Numéro 09 dédié à prévoir (règle du portefeuille).

---

## ⚠️ DESIGN : MÊME ADN QUE METZ/DIJON, IDENTITÉ DISTINCTE (voir CLAUDE.md section 2)

- Socle hérité de Metz = système PROTEC-DARD (Inter + Fraunces, Framer Motion) : le GARDER.
- À créer pour Reims : palette propre au métier chauffage (chaleur maîtrisée, différente
  d'Angers, Annecy, Metz prune/cuivre/carmin de Dijon), images 100 % nouvelles (décors champenois),
  variations de compositions, textes entièrement réécrits.
- Règles permanentes : 1 image de tête UNIQUE par page commune (`public/zones/<slug>.jpg`),
  jamais de pool partagé ; codes postaux vérifiés sur geo.api.gouv.fr ; aucun lien entre les
  sites du portefeuille.
- Référence originelle en lecture seule :
  `/Users/zaouiremy/Desktop/Claude code/Template siteweb/Prospects/Deratisation/PROTEC-DARD/`

---

## 1. CE QU'ON SAIT (acquis)

- Socle technique et visuel hérité de Metz : Next.js, autoblog + GitHub Action
  `publish-article.yml` (à réactiver), couche design PROTEC-DARD.
- `config/site.config.ts`, `content/services/*.json`, `content/zones/*.json`,
  `content/legal.json`, logo : encore ceux de Metz (débouchage), MODÈLES de structure à
  réécrire intégralement pour chauffage/Reims.
- Leçon Dijon à répliquer : le SEO écrit son plan AVANT que le Builder ne touche au contenu
  (le plan SEO est la référence unique des pages à créer).
- Nouvelle étape standard du portefeuille (27/07/2026) : soumission Bing Webmaster Tools
  après la mise en ligne (levier SEO + GEO, ChatGPT s'appuie sur Bing). Session guidée avec Rémy.

## 2. RESTE À FAIRE (checklist playbook)

- [ ] Rémy : valider le domaine (reco : sos-chauffage-reims.fr), l'acheter, fournir le 09 dédié + email + nom commercial
- [x] CEO (27/07) : repo GitHub `Remy-authority/sos-chauffage-reims` (public, `main` poussé) + projet Vercel `sos-chauffage-reims` relié au repo + `SEO_NOINDEX=1` posé en Production AVANT le premier déploiement + Framework Preset vérifié via l'API : « nextjs » ✓ (leçon Dijon) + GitHub Action `publish-article.yml` active
- [x] SEO : carte mots-clés chauffage/chaudière Reims + `docs/SEO-GEO-PLAN.md` + `docs/CALENDRIER-EDITORIAL.md` ALIGNÉ SUR LA SAISON (sujets chauffage d'octobre à février en priorité, entretien/été ensuite ; codes postaux via geo.api.gouv.fr) — fait le 27/07/2026, AUDITÉ ET VALIDÉ par le CEO le 27/07 (contre-vérification indépendante des 12 communes sur geo.api.gouv.fr : codes postaux, populations et distances tous exacts)
- [x] Builder (27/07) : `config/site.config.ts` (identité Reims, palette « chaleur maîtrisée », persona DEMO, numéro de fiction `phoneIsDemo: true`, rayon 30 km déclaré UNE SEULE FOIS via `SERVICE_RADIUS_KM`) + `content/legal.json` (téléphone et email retirés du JSON, désormais lus depuis la config)
- [x] Builder (27/07) : `content/services/*.json` (8) et `content/zones/*.json` (12) réécrits intégralement selon `docs/SEO-GEO-PLAN.md`, codes postaux revérifiés sur geo.api.gouv.fr le jour même
- [x] Builder sur Opus (27/07) : identité visuelle Reims (ADN PROTEC-DARD conservé, palette et logo propres, section « du symptôme à la cause » spécifique au site, animation `heat-rise`)
- [x] Builder (27/07) : logo, favicon + `icon-192/512.png`, portrait persona, OG, 32 visuels générés dont **12 images de commune uniques** (aucun pool partagé), aucun texte/logo/visage flou
- [x] Builder (27/07) : SEO technique, schema `HVACBusiness` à la place de `Plumber`, `FAQPage` sur toutes les FAQ, `llms.txt` régénéré dynamiquement (8 services + 12 zones)
- [x] Autoblog (27/07) : 9 drafts T1 (001-009, octobre-décembre) livrés et AUDITÉS par le CEO :
      conformes doctrine (auteur = persona DEMO, réponses directes en ouverture, zéro tiret,
      zéro chiffre inventé, zéro mot hors périmètre)
- [x] Contrôle visuel CEO du 27/07 : POSITIF sous réserve d'une passe corrective à 3 points
      (backdrop menu mobile, restructuration fingerprint tailwind, permutation des sections
      d'accueil, les 2 derniers exigés par la directive du CEO-portefeuille « barre Dijon »).
      12 communes différenciées confirmées, côte à côte Metz/Dijon/Reims distinct, compteur
      30 km vérifié au DOM (l'alerte « 28 km » de l'agent était une capture mi-animation)
- [x] Passe corrective Builder (28fe2cb) livrée et RE-CONTRÔLÉE par le CEO le 27/07 : voile
      menu mobile vérifié en capture (assombrit, floute, ferme au clic), empreinte Tailwind
      cassée (zéro reliquat ink/sand/brand/accent/--c-, lexique braise/flamme/craie/fonte,
      48 classes d'opacité toutes vivantes), sections réellement permutées (alternance des
      fonds saine, une seule paire sombre assumée), tsc + build verts. Barre « niveau Dijon »
      du CEO-portefeuille : ATTEINTE sur les 6 critères
- [x] VALIDATION RÉMY (27/07 preview, 28/07 GO de mise en ligne). Merge fait, 10 articles publiés.
- [x] CEO (28/07) Étape 6 partie infra : zone DNS OVH posée (schéma Dijon : A @ → 76.76.21.21,
      CNAME www → cname.vercel-dns.com., emails préservés), domaines ajoutés au projet Vercel
      (www canonique, apex en 308). En attente : activation AFNIC (le domaine ne résout pas encore).
- [ ] Builder (dernière passe avant bascule) : `seo.canonicalBase` → `https://www.sos-chauffage-reims.fr`
      + numéro provisoire à déplacer dans la vraie plage fiction ARCEP (09 39 98 XX XX) : le
      09 39 51 42 00 actuel est HORS plage fiction, potentiellement attribuable à un tiers
- [ ] CEO : quand AFNIC actif + Builder passé → retirer `SEO_NOINDEX` de Vercel Production,
      redéployer, vérifier robots.txt public = Allow → LE SITE EST EN LIGNE ⏰ (large avance
      sur l'échéance fin septembre)
- [ ] Post-mise en ligne : GSC (propriété + sitemap + TXT de validation via OVH) + Bing
      Webmaster Tools (session guidée avec Rémy)
- [ ] Au premier achat du 09 par le watcher portefeuille : Builder injecte le numéro
      (site.config, une ligne) + vérif voice_url + cockpit

## 3. DÉCISIONS RÉMY

- 25/07/2026 : top 5 vague 2 validé.
- 27/07/2026 : ordre inversé, Reims (chauffage) passe n°5 AVANT Clermont (n°6) pour l'impératif
  saisonnier. Objectif global réaffirmé : ~10 sites, plusieurs métiers, toujours de l'urgence.
- 27/07/2026 : **rayon d'intervention 30 km** (et non les 15 km proposés par le SEO). Les 12
  communes du plan restent valables (toutes sous 13 km), le rayon élargit la zone annoncée.
- 27/07/2026 : **domaine validé : sos-chauffage-reims.fr**, ACHETÉ par Rémy le 27/07 (en attente de validation registrar/AFNIC). DNS à ne pas toucher avant l'Étape 6.
- 27/07/2026 : le numéro 09 sera pris sur **Twilio**. MISE À JOUR 28/07 après vérification
  CEO : le système Twilio du portefeuille existe et fonctionne (clés dans
  `APPLICATIONS/RépondeurIA/leadcatch/.env.local`, bundle réglementaire FR approuvé, numéros
  Metz et Dijon déjà achetés avec renvoi vers le 07 de Rémy). Le 09 de Reims n'est PAS encore
  acheté : stock Twilio de +339 vérifié à ZÉRO le 28/07. La surveillance d'achat automatique
  du CEO-portefeuille tourne (processus `achat-09-twilio.sh` vérifié actif) : NE PAS lancer
  de 2e surveillance (risque de double achat). À l'achat : vérifier voice_url, puis Builder
  pour site.config + cockpit (recette `docs/INFRA-NOUVEAU-SITE.md` du portefeuille).
- 28/07/2026 : infra domaine/email gérée par le CEO-portefeuille via l'API OVH : domaine
  commandé (AFNIC en cours), redirection `contact@sos-chauffage-reims.fr` → boîte de Rémy
  posée (MX + SPF, schéma Dijon). Le pointage DNS vers Vercel attendra le GO de mise en ligne.
- 28/07/2026 : CEO site : `RESEND_API_KEY` + `RESEND_FROM` posées en Production sur le projet
  Vercel Reims (recette INFRA §2) : les leads du formulaire partiront par email dès la mise
  en ligne (prendra effet au prochain déploiement).
- 27/07/2026 : **validation visuelle Rémy du site → merge sur `main` fait** (commit 88edd49).
  La prod Vercel sert le site Reims complet, toujours noindex.
- 27/07/2026 : **nouvelle cadence éditoriale décidée par Rémy** : 10 articles publiés le jour
  même, puis **3 articles/semaine pendant 6 mois** (≈78 publications). La GitHub Action héritée
  de Metz fait déjà exactement 3/semaine (cron lun/mer/ven 05:00 UTC, FIFO sur les préfixes de
  content/drafts/) : rien à développer, il faut ALIMENTER le réservoir de drafts. Le calendrier
  éditorial 24 sujets/12 mois est SUPERSEDÉ : le SEO doit produire un calendrier étendu
  (~80 sujets ordonnés, saisonnalité recalée sur un démarrage fin juillet, zéro cannibalisation),
  l'Autoblog rédige par lots de 13 (≈1 mois de publications), audit CEO entre chaque lot.
  MISE À JOUR 28/07 : livré, voir `docs/CALENDRIER-EDITORIAL.md` v2 (78 sujets, sujets 1-10
  déjà consommés/en cours retirés de la liste) et l'historique ci-dessous. En attente d'audit CEO.

## 4. HISTORIQUE DES SESSIONS

- **27/07/2026 (CEO-portefeuille)** : création du dossier par duplication de Metz, nettoyage du
  contenu Metz, CLAUDE.md adapté (identité Reims + impératif calendaire), journal neuf, git
  initialisé. Aucun contenu Reims encore écrit : SEO d'abord, puis Builder.
- **27/07/2026 (CEO site, infrastructure)** : repo GitHub `Remy-authority/sos-chauffage-reims`
  créé et `main` poussé. Projet Vercel `sos-chauffage-reims` créé et relié au repo,
  `SEO_NOINDEX=1` posé en Production AVANT le premier déploiement, Framework Preset vérifié
  par l'API : « nextjs » (leçon Dijon appliquée). Premier déploiement Ready en 41 s,
  production `https://sos-chauffage-reims.vercel.app` en HTTP 200, robots.txt = `Disallow: /`
  (noindex confirmé). GitHub Action `publish-article.yml` active. Message de lancement SEO
  préparé et remis à Rémy : le plan SEO (`docs/SEO-GEO-PLAN.md`) sera la référence unique
  des pages, le Builder n'improvise rien (leçon Dijon). Prochaine étape : compte-rendu SEO,
  puis lancement Builder.
- **27/07/2026 (SEO)** : rédaction de `docs/SEO-GEO-PLAN.md` (8 pages services dont dépannage
  pompe à chaleur, chaudière gaz/fioul, radiateur froid, fuite, ballon d'eau chaude, entretien
  annuel ; 12 pages zones avec codes postaux vérifiés un par un sur geo.api.gouv.fr, rayon
  proposé 15 km ; schema.org `HVACBusiness` suggéré à la place de `Plumber` hérité de Metz) et
  de `docs/CALENDRIER-EDITORIAL.md` (24 sujets sur 12 mois, cadence pondérée 9/6/4/5 par
  trimestre pour que le premier trimestre de publication, Octobre-Décembre, soit le plus
  fourni). Périmètre respecté : uniquement `docs/`, aucun fichier `content/`, `config/` ou
  code touché. En attente d'audit CEO avant transmission au Builder.
- **27/07/2026 (CEO, audit SEO)** : audit des deux livrables SEO, verdict POSITIF. Contre-vérification
  indépendante des 12 communes sur geo.api.gouv.fr (script CEO) : codes postaux, populations et
  distances tous exacts. Doctrine respectée (aucun chiffre inventé, pas de tiret cadratin dans les
  textes destinés au site, périmètre docs/ seul). Couverture blog vérifiée : 24 sujets, chaque
  service couvert par au moins 2 articles, cadence pondérée 9/6/4/5 confirmée dans le calendrier.
  Deux points relevés, non bloquants : le plan indique « rayon 20 km retenu pour Metz » alors que
  Rémy a tranché 30 km le 26/07 (sans effet sur la proposition Reims) ; la proposition de rayon
  15 km et la périodicité réglementaire de l'entretien restent à trancher/confirmer par Rémy.
  Message Builder préparé et remis à Rémy. Écart signalé par le SEO (page PAC à la place d'une
  page « remplacement chaudière », remplacement traité en blog + FAQ entretien) : approuvé par le
  CEO, cohérent avec le positionnement dépannage.
- **27/07/2026 (Builder, Opus)** : identité et contenu Reims livrés sur la branche
  `builder/design-contenu-reims`. Palette « chaleur maîtrisée » (ink brun fumé, sand craie,
  brand bleu de flamme de gaz, accent braise) : base chaude là où Metz est un noir bleu pétrole
  et Dijon un noir prune, donc un écart visible avant même les couleurs d'accent. Logo refait
  (radiateur + flamme) et décliné en favicon. 8 pages services et 12 pages communes écrites
  d'après le plan SEO, sans en dévier. Nouvelle section « du symptôme à la cause » (8 paires
  symptôme/piste renvoyant vers la bonne prestation) : c'est la variation de structure qui
  éloigne le plus le site d'un clone recoloré de Metz. Décision Rémy du 30 km appliquée depuis
  une constante unique de la config, donc cohérente partout (texte, compteur animé, llms.txt,
  footer) : 7 occurrences vérifiées dans le rendu, aucune trace de 15 ou 20 km.
  Vérifications : `tsc` propre, `npm run build` vert (37 pages), 22 captures Playwright
  desktop et mobile, contrôle automatisé des 29 pages rendues (zéro tiret cadratin, zéro
  occurrence de « plombier » ou de vocabulaire canalisation hérité, zéro URL Metz).
  Deux défauts corrigés en cours de route : la première flamme du logo se lisait comme une
  goutte d'eau (contresens sur un site de chauffage), et deux classes d'opacité Tailwind
  invalides héritées du template (`bg-brand-500/12`, `bg-brand-500/6`) étaient silencieusement
  mortes. Reste au CEO : contrôle visuel côte à côte avec Metz et Dijon.
- **27/07/2026 (Builder, correctifs post-contrôle CEO)** : les trois corrections demandées,
  et rien d'autre. 1) Menu mobile : voile plein viewport ajouté, posé en z-[45] pour passer
  au-dessus de la barre d'appel collante (z-40) tout en restant sous l'en-tête (z-50), avec
  blocage du défilement de la page. Le voile est un vrai bouton de fermeture, donc sans
  aria-hidden, sinon la règle globale du projet l'aurait rendu inerte ; clics du panneau
  vérifiés intacts. 2) Empreinte Tailwind cassée : lexique de tokens propre au métier
  (braise, flamme, craie, fonte à la place de accent, brand, sand, ink), variables CSS
  passées de `--c-*` à `--teinte-*`, rayons, ombres et animations renommés, ordre des blocs
  de tailwind.config.ts et structure de globals.css revus, variantes de Button et de
  GradientBlob renommées. Renommage fait par script ancré sur les préfixes d'utilitaires,
  puis contrôle des 68 classes à opacité contre le CSS généré : zéro classe morte.
  3) Ordre des sections d'accueil réellement permuté, avec la logique documentée dans
  app/page.tsx. Premier essai corrigé : il alignait trois fonds sombres à la suite.
  Vérifications : tsc propre, build vert (37 pages), 22 captures desktop et mobile
  re-tirées, contrôle des 29 pages rendues toujours au vert.
- **28/07/2026 (SEO)** : `docs/CALENDRIER-EDITORIAL.md` v2, suite au changement d'échelle décidé
  par Rémy (3 articles/semaine pendant 6 mois via la GitHub Action FIFO existante, ≈78
  publications au lieu de 24/an). Les sujets 1-9 de la v1 déjà publiés et le sujet 10 (pression
  de chaudière) en cours ont été retirés ; la numérotation reprend à 11. Les 14 sujets restants
  de la v1 (anciens 11-24) sont réutilisés et repositionnés, complétés par 64 sujets nouveaux
  organisés en familles (par appareil gaz/fioul/PAC, par symptôme, par pièce, par situation
  locataire/propriétaire/copropriété, par événement achat/vente/absence) pour éviter toute
  cannibalisation à cette échelle. Fenêtre couverte : Août 2026 à Janvier 2027 (6 mois pleins à
  partir de cette semaine), 13 sujets/mois, saisonnalité recalée sur ce départ (Août-Septembre
  entretien/prép, Octobre démarrage, Novembre-Janvier pic). Mars-avril (sortie d'hiver) hors
  fenêtre, à traiter dans une v3 si la campagne se prolonge. Répartition par service vérifiée par
  extraction automatique du tableau (78 lignes, chaque service couvert par au moins 2 articles,
  minimum sur `fuite-chaudiere-circuit-chauffage`). Périmètre respecté : uniquement
  `docs/CALENDRIER-EDITORIAL.md` et `docs/ETAT.md` touchés. En attente d'audit CEO avant
  lancement de la rédaction des lots par l'Autoblog.
