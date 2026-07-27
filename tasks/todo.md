# tasks/todo.md — SOS Chauffage Reims

> Suivi opérationnel des sessions. La checklist de référence long terme vit dans
> `docs/ETAT.md` (section 2). Ici : les tâches des sessions en cours.
> ⏰ IMPÉRATIF : site EN LIGNE avant fin septembre 2026 (pic de la saison de chauffe en octobre).

## Session du 27/07/2026 (CEO — infrastructure + lancement SEO)

- [ ] Lire CLAUDE.md + docs/ETAT.md + tasks/lessons.md (hérité de Metz)
- [ ] Créer le repo GitHub `Remy-authority/sos-chauffage-reims` + push de `main`
- [ ] Créer le projet Vercel relié au repo
- [ ] Poser `SEO_NOINDEX=1` en environnement Production AVANT tout déploiement
- [ ] VÉRIFIER Framework Preset = « nextjs » (leçon Dijon : le CLI peut créer en « Other » → 404)
- [ ] Vérifier `app/robots.ts` (previews bloquées par VERCEL_ENV, prod par SEO_NOINDEX)
- [ ] Vérifier que le build Vercel passe (déploiement Ready, robots.txt = Disallow: /)
- [ ] Vérifier la GitHub Action `publish-article.yml` sur le nouveau repo
- [ ] Préparer le message SEO (le plan SEO est la référence unique des pages, AVANT le Builder)
- [ ] Mettre à jour docs/ETAT.md avant la fin de session

## En attente de Rémy

- Validation + achat du domaine `sos-chauffage-reims.fr` (dispo AFNIC le 27/07, pas acheté)
- Numéro 09 dédié, email de contact, nom commercial / identité artisan
- Comptes-rendus SEO / Builder / Autoblog à coller au CEO pour supervision
