# tasks/todo.md — SOS Chauffage Reims

> Suivi opérationnel des sessions. La checklist de référence long terme vit dans
> `docs/ETAT.md` (section 2). Ici : les tâches des sessions en cours.
> ⏰ IMPÉRATIF : site EN LIGNE avant fin septembre 2026 (pic de la saison de chauffe en octobre).

## Session du 27/07/2026 (CEO — infrastructure + lancement SEO)

- [x] Lire CLAUDE.md + docs/ETAT.md + tasks/lessons.md (hérité de Metz)
- [x] Créer le repo GitHub `Remy-authority/sos-chauffage-reims` + push de `main`
- [x] Créer le projet Vercel relié au repo (liaison git vérifiée par l'API)
- [x] Poser `SEO_NOINDEX=1` en environnement Production AVANT tout déploiement
- [x] VÉRIFIER Framework Preset = « nextjs » via l'API Vercel : confirmé (leçon Dijon)
- [x] Vérifier `app/robots.ts` (IS_NOINDEX câblé sur SEO_NOINDEX=1 + previews Vercel)
- [x] Vérifier que le build Vercel passe (Ready en 41 s, HTTP 200, robots.txt = Disallow: /)
- [x] Vérifier la GitHub Action `publish-article.yml` : active sur le nouveau repo
- [x] Préparer le message SEO (le plan SEO est la référence unique des pages, AVANT le Builder)
- [x] Mettre à jour docs/ETAT.md avant la fin de session
- [x] SUITE : Rémy colle le message à l'agent SEO → compte-rendu SEO → audit CEO → message Builder

## Session du 27/07/2026 (CEO — audit SEO + lancement Builder)

- [x] Audit CEO des 2 livrables SEO : verdict POSITIF (plan = référence unique des pages)
- [x] Contre-vérification indépendante des 12 communes sur geo.api.gouv.fr : tout exact
- [x] Vérification couverture blog : 24 sujets, chaque service couvert par au moins 2 articles
- [x] Message Builder préparé et remis à Rémy
- [x] SUITE : compte-rendu Builder reçu le 27/07 → contrôle CEO en cours

## Session du 27/07/2026 (CEO — contrôle du travail Builder)

- [x] Contrôles statiques indépendants : 8 services + 12 zones = plan SEO exact, codes postaux
      conformes, 12 images communes uniques par hash (+ 3 visuels « gestes » assumés), poids
      public/ 5,2 Mo, SERVICE_RADIUS_KM=30 déclaré une fois, legal.json sans tél/email en dur
      (bloc hébergeur Vercel légitime), HVACBusiness effectif, zéro tiret cadratin dans le
      contenu (les seules occurrences « débouchage »/« 15 km » sont des commentaires de code)
- [x] Vérification tsc + npm run build : verts (37 pages)
- [x] Animation heat-rise : réellement inversée par rapport au flow-down de Metz (pas un
      renommage), durée différente ; ombres désormais lues depuis la palette
- [x] Palettes côte à côte : Metz pétrole / Dijon prune / Reims brun chaud, distinctes
- [x] Contrôle visuel par agent navigateur (47 captures) + revue CEO des captures clés :
      12 communes réellement différenciées (images ET textes), zéro section vide, zéro image
      cassée, zéro erreur console, header intérieur lisible, côte à côte Metz/Dijon/Reims
      convaincant (3 identités distinctes, 3 concepts de carte hero différents)
- [x] Fausse alerte « compteur 28 km » de l'agent : re-testé par le CEO avec attente complète
      (script Playwright), valeurs finales correctes 24h/24, 7j/7, 30 km, 8 prestations.
      C'était une capture à ~90 % de l'animation (leçon Metz confirmée une 2e fois)
- [x] Verdict CEO : POSITIF sous réserve d'une passe corrective à 3 points
- [x] Passe corrective Builder (28fe2cb) : les 3 points livrés
- [x] Autoblog : 9 drafts T1 livrés (3b03eaa)
- [x] Re-contrôle CEO de la passe corrective, TOUT REVÉRIFIÉ INDÉPENDAMMENT :
      zéro reliquat des anciens tokens (ink/sand/brand/accent/--c-), ordre des sections
      réellement permuté (non superposable à Metz), tsc + build verts, 48 classes d'opacité
      toutes vivantes dans le CSS généré, voile du menu mobile vérifié en capture (page
      assombrie et floutée, clic sur le voile ferme le menu), alternance des fonds saine
      sur la pleine page (une seule paire sombre, assumée)
- [x] Audit CEO des 9 drafts Autoblog : conformes (frontmatter complet, auteur = persona DEMO
      Aurélien Godart, ouvertures en réponse directe, zéro tiret, zéro chiffre inventé, zéro
      mot hors périmètre ; l'unique « canalisation » est la désambiguïsation exigée par le
      plan SEO). Point noté : champ `author` du frontmatter dormant (non consommé par le
      template), sans effet de rendu, à brancher plus tard si utile
- [ ] VALIDATION RÉMY sur la preview → merge `main`
- [ ] Ensuite : achat domaine + 09 Twilio (clés attendues) + email/identité → mise en ligne Étape 6

## Directive du CEO-portefeuille reçue le 27/07/2026 (barre « niveau Dijon » + fingerprint)

Constats CEO sur Reims vis-à-vis de cette barre :
- [x] Palette métier propre : OUI ; composant signature : OUI (« du symptôme à la cause ») ;
      animations propres : OUI (heat-rise réellement inversée) ; textes/photos nouveaux : OUI
      (sous réserve du contrôle visuel en cours)
- [ ] ÉCART 1 : structure du tailwind.config quasi identique à Metz (mêmes noms de tokens
      ink/sand/brand/accent, même ordre, mêmes variables --c-*) : fingerprint partagé intact.
      À corriger par le Builder avant exposition.
- [ ] ÉCART 2 : ordre des sections d'accueil NON permuté (séquence de Metz + une insertion
      Symptoms). À permuter réellement par le Builder.

## Décisions tranchées par Rémy le 27/07/2026

- [x] Rayon d'intervention : 30 KM (correctif envoyé au Builder, qui avait reçu 15 en DEMO)
- [x] Domaine validé : sos-chauffage-reims.fr (achat à faire)
- [x] Numéro 09 : à prendre sur Twilio, tâche CEO

## En attente de Rémy

- Accès API Twilio (Account SID + Auth Token, ou clé API) pour que le CEO cherche et achète
  le 09. Prérequis Twilio pour un numéro FR : dossier réglementaire (adresse + identité) approuvé.
- Achat du domaine sos-chauffage-reims.fr (ou feu vert explicite pour un achat via Vercel par le CEO)
- Email de contact + nom commercial / identité artisan
- Périodicité réglementaire de l'entretien chaudière : aucun chiffre publié tant que la source
  n'est pas confirmée (le site renverra à « la réglementation en vigueur »).

## En attente de Rémy

- Validation + achat du domaine `sos-chauffage-reims.fr` (dispo AFNIC le 27/07, pas acheté)
- Numéro 09 dédié, email de contact, nom commercial / identité artisan
- Comptes-rendus SEO / Builder / Autoblog à coller au CEO pour supervision
