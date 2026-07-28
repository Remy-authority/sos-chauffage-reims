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
- [x] VALIDATION RÉMY sur la preview (27/07) → merge `main` fait (88edd49), prod noindex OK
- [ ] Ensuite : 09 Twilio (clés attendues) + email/identité → mise en ligne Étape 6
      (domaine acheté, validation registrar en cours)

## Session du 27/07/2026 (CEO — publication jour J + montée en cadence éditoriale)

- [x] Merge builder → main après validation Rémy, prod vérifiée (pages Reims servies, noindex)
- [x] Mécanique de publication auditée : Action lun/mer/ven 05:00 UTC déjà en place (= la
      cadence 3/semaine demandée), publication FIFO par préfixe, collision de slug détectée
- [x] 9 publications du jour : 9/9 runs OK après fix du workflow, content/drafts vide,
      9 articles dans content/conseils sur main, prod redéployée
- [x] Draft 010 livré, audité, publié : 10 articles en ligne au total
- [x] Calendrier v2 SEO livré et audité : 78 sujets (11→88), 11 contrôles verts, validé
- [x] GO de mise en ligne donné par Rémy (28/07) : DNS OVH posé (schéma Dijon), domaines
      ajoutés au projet Vercel (www canonique + apex 308), en attente activation AFNIC
- [x] Builder : canonicalBase + numéro fiction ARCEP (322b8d7), contre-vérifié CEO → SEO_NOINDEX
      retiré → 🎉 SITE EN LIGNE le 28/07/2026, robots/sitemap/canonical publics tous verts
- [x] Autoblog lot 1 (011-023, 4eaed83) : AUDITÉ CEO, 13/13 conformes, réservoir plein pour
      la publication auto (prochaine : mercredi 05:00 UTC). Retitrage sujet 14 sans âge : validé
- [x] Autoblog lot 2 (024-036, f125472) : AUDITÉ CEO 13/13 conformes (les mentions
      canalisation/électricien sont les désambiguïsations et renvois de périmètre demandés)
- [x] Autoblog lot 3 (037-049, efe084b) : AUDITÉ CEO 13/13 conformes. Contrôles ciblés :
      zéro code constructeur inventé (040), renvoi électrique correct (046), chevauchement
      042/043 vs article 006 publié mesuré à 2,4 % et 1,3 % (négligeable)
- [x] Autoblog lot 4 (050-062, 1b0c75e) : AUDITÉ CEO 13/13 conformes, lecture intégrale des
      articles sécurité par le CEO : 052 exemplaire (ordre des réflexes exact, services
      relégués après sécurisation), 060 distinction eau/air impeccable avec renvoi au
      protocole, 053 sans obligation affirmée, « débouchage » du 056 limité aux condensats.
      Micro-retouche demandée avec le lot 5 : lien interne direct 060 → article 052
- [x] Autoblog lot 5 (063-075 + retouche 060, 65813bb) : AUDITÉ CEO 13/13 conformes,
      retouche 060 vérifiée (2 liens directs vers l'article 052), 072 sans délai ni majoration,
      chevauchements 065/066 : 1,6 %, 070/019 : 0 %, 069/050 : 2,1 % (négligeables)
- [x] Autoblog lot 6 (076-088, 8031982) : AUDITÉ CEO 13/13 conformes, 12 paires à risque
      mesurées, pire chevauchement 2,9 %. CALENDRIER V2 TERMINÉ : 88 articles produits au
      total (10 publiés + 78 en réservoir jusqu'à fin janvier 2027)
- [ ] Sentinelle posée : vérifier le PREMIER run planifié du cron (mercredi 29/07 ~05:00 UTC),
      un cron neuf doit être vu tourner une fois. Si absent mercredi midi : vérifier l'onglet
      Actions (les crons de repos neufs démarrent parfois avec du retard)
- [x] Builder Opus (88 couvertures d'articles, f5b4461) : AUDITÉ CEO. Contre-vérifié : 88 images
      uniques par empreinte, 9,8 Mo total, aucun fichier >300 Ko, 88 frontmatters câblés au slug
      POST-publication (anomalie de nommage anticipée par le Builder, publication simulée),
      cover servie en prod (77 Ko), échantillon visuel contrôlé dont sécurité (sobres) et paires
      à risque (distinguables). Diff strictement limité : 88 mdx +1 ligne chacun
- [ ] À planifier vers novembre 2026 : calendrier v3 par le SEO (sortie d'hiver mars-avril,
      hors fenêtre de la v2, signalé par le SEO dès la livraison v2)
- [x] Bing Webmaster Tools (29/07) : 11 sites importés depuis GSC par Rémy, sitemaps soumis
      pour tous les sites (statut processing). Onglet « AI Performance » repéré = métrique GEO
      à surveiller. Idée portefeuille notée : IndexNow dans l'Action de publication
- [x] GSC VALIDÉE le 29/07 (après correction du jeton : la fenêtre GSC tronquait l'affichage,
      leçon consignée). Propriété visible dans la liste. Favicon absent de la liste GSC =
      simple délai de crawl (Angers/Metz : même config, icône affichée ; Dijon récent : globe
      aussi). Sitemap à soumettre par Rémy si pas déjà fait.
- [ ] Micro-amélioration future Builder (non urgent, tout le portefeuille) : servir /favicon.ico
      (404 partout actuellement), + commentaire email obsolète dans site.config.ts
- [ ] Ensuite : Bing Webmaster Tools (session guidée)
- [ ] Cosmétique, à glisser dans une future passe Builder : commentaire obsolète au-dessus de
      `email` dans site.config.ts (« domaine pas encore acheté »)
- [ ] Autoblog : rédaction par lots de 13, audit CEO entre chaque lot, réservoir toujours
      ≥ 2 semaines d'avance (6 drafts minimum)

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

## Session du 28/07/2026 (CEO — extension clim + passe photos)

- [x] Décision Rémy : ajout prestation CLIMATISATION → message SEO (addendum, frontière
      PAC/clim) et décision consignée. Les 88 articles existants ne sont pas retouchés.
- [x] Décision Rémy : passe DA photos (décors trop pauvres) → message Builder Opus
      (planche contact 3 piles, priorité galerie accueil)
- [x] Audit CEO de l'addendum SEO clim : VALIDÉ (table de frontière PAC/clim au cordeau,
      renvois croisés symétriques, sections 0/1.5/2.1/2.4/4/6 amendées et datées, note v3)
- [x] Audit CEO de la passe photos : VALIDÉ. Contre-vérifié : 120 images uniques, 13,3 Mo,
      88 covers câblées, prod à jour Y COMPRIS l'optimiseur d'images (vérifié visuellement).
      Résidu identifié : la cover de l'article 002 (mur lépreux) conservée à cause d'une
      « référence » ambiguë du CEO (leçon consignée) → dans la mission clim
- [ ] Builder : page climatisation (addendum section 7) + lien croisé PAC + image service
      + retouche cover 002 → audit CEO
