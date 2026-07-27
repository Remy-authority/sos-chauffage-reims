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
- [ ] CEO : repo GitHub + projet Vercel + `SEO_NOINDEX=1` en Production AVANT tout déploiement + Framework Preset « nextjs » vérifié (leçon Dijon : le CLI peut créer le projet en « Other », tout part en 404)
- [ ] SEO : carte mots-clés chauffage/chaudière Reims + `docs/SEO-GEO-PLAN.md` + `docs/CALENDRIER-EDITORIAL.md` ALIGNÉ SUR LA SAISON (sujets chauffage d'octobre à février en priorité, entretien/été ensuite ; codes postaux via geo.api.gouv.fr)
- [ ] Builder : `config/site.config.ts` (identité, palette chauffage, persona DEMO, numéro fiction ARCEP en attendant le 09) + `content/legal.json`
- [ ] Builder : `content/services/*.json` et `content/zones/*.json` (communes agglo Reims) selon le plan SEO
- [ ] Builder sur Opus : identité visuelle Reims (ADN PROTEC-DARD, rendu distinct de Metz ET Dijon)
- [ ] Builder : logo, favicon, portrait persona, images (1 UNIQUE par commune, décors champenois, aucun texte/logo/visage flou)
- [ ] Autoblog : drafts T1 orientés saison de chauffe (préfixes 001-…)
- [ ] Contrôle visuel CEO (côte à côte avec Metz et Dijon : assez distinct ?) → validation Rémy → mise en ligne (Étape 6) ⏰ avant fin septembre
- [ ] Post-mise en ligne : GSC (propriété + sitemap) + Bing Webmaster Tools (nouvelle étape standard)

## 3. DÉCISIONS RÉMY

- 25/07/2026 : top 5 vague 2 validé.
- 27/07/2026 : ordre inversé, Reims (chauffage) passe n°5 AVANT Clermont (n°6) pour l'impératif
  saisonnier. Objectif global réaffirmé : ~10 sites, plusieurs métiers, toujours de l'urgence.

## 4. HISTORIQUE DES SESSIONS

- **27/07/2026 (CEO-portefeuille)** : création du dossier par duplication de Metz, nettoyage du
  contenu Metz, CLAUDE.md adapté (identité Reims + impératif calendaire), journal neuf, git
  initialisé. Aucun contenu Reims encore écrit : SEO d'abord, puis Builder.
