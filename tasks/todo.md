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
- [ ] SUITE : compte-rendu Builder → contrôle visuel CEO (côte à côte Metz ET Dijon, 1 image
      unique par commune, zéro tiret cadratin) → passe corrective éventuelle → Autoblog

## Décisions en attente de Rémy (à trancher, non bloquant pour lancer le Builder)

- Rayon d'intervention : le SEO propose 15 km (Metz est à 30). Le Builder posera 15 en DEMO.
- Périodicité réglementaire de l'entretien chaudière : aucun chiffre publié tant que la source
  n'est pas confirmée (le site renverra à « la réglementation en vigueur »).
- Achat du domaine sos-chauffage-reims.fr + numéro 09 dédié + email + nom commercial.

## En attente de Rémy

- Validation + achat du domaine `sos-chauffage-reims.fr` (dispo AFNIC le 27/07, pas acheté)
- Numéro 09 dédié, email de contact, nom commercial / identité artisan
- Comptes-rendus SEO / Builder / Autoblog à coller au CEO pour supervision
