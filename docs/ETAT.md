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
PAS ENCORE ACHETÉ ; 8 candidats libres dont chauffagiste-reims.fr, voir conversation
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
- [ ] Autoblog : drafts T1 orientés saison de chauffe (préfixes 001-…)
- [ ] Contrôle visuel CEO (côte à côte avec Metz et Dijon : assez distinct ?) → validation Rémy → mise en ligne (Étape 6) ⏰ avant fin septembre
- [ ] Post-mise en ligne : GSC (propriété + sitemap) + Bing Webmaster Tools (nouvelle étape standard)

## 3. DÉCISIONS RÉMY

- 25/07/2026 : top 5 vague 2 validé.
- 27/07/2026 : ordre inversé, Reims (chauffage) passe n°5 AVANT Clermont (n°6) pour l'impératif
  saisonnier. Objectif global réaffirmé : ~10 sites, plusieurs métiers, toujours de l'urgence.
- 27/07/2026 : **rayon d'intervention 30 km** (et non les 15 km proposés par le SEO). Les 12
  communes du plan restent valables (toutes sous 13 km), le rayon élargit la zone annoncée.
- 27/07/2026 : **domaine validé : sos-chauffage-reims.fr** (reste à acheter).
- 27/07/2026 : le numéro 09 sera pris sur **Twilio**, tâche CEO (en attente des accès API
  Twilio de Rémy ; aucun identifiant Twilio trouvé sur la machine). Attention : un numéro
  français sur Twilio exige un dossier réglementaire approuvé (justificatif d'adresse et
  d'identité) avant l'achat.

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
