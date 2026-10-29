# tasks/todo.md — SOS Chauffage Reims

## MISE À JOUR du 29-30/10/2026 (kickoff portefeuille, GO Rémy « ok go vas y »), branche `maj-29-10`
- [x] Note AVANT 4/10 ; plan et deux scrollytellings validés
- [x] Bloc 1 chaudière qui se déshabille, bloc 3 circuit remis en chauffe
- [x] Accueil réordonné (prestations photo, symptômes, FAQ, pourquoi nous, zones bloc 7, formulaire final)
- [x] Horaires justes partout, paragraphes courts, angles droits, en-tête opaque, compteur 4 étapes
- [x] Relecture critique à froid (1 sous-agent) : 13 points traités
- [x] Contrôles : design, blocs-pages, navigation, visuels, texte, fin de site www CODE 0 ; vitesse -2 ; 0 recherche perdue
- [ ] Footprint + check-serie sur le commit final
- [ ] GO Rémy, fusion sur main, curl 200, Rank OS (travaux, capture, Indexation = accueil)

## MISE À JOUR du 25/09/2026 (CEO Opus 5.5, règle ../tasks/regle-mise-a-jour-site.md), branche `maj-25-09`

### Décisions de Rémy (25/09, mode interview, ne plus reposer)
- Article « chaudière en panne : louer un chauffage d'appoint ou réparer, ce que ça coûte à Reims » (capte « location chaudière reims »).
- Les 5 retouches ordinateur exigées par les contrôles : OUI (menu Zones déroulant, H1 3 lignes max, texte du bloc 1 raccourci, bloc 2 centré, un schéma sur l'accueil). Couleurs, polices, photos inchangées.
- Mesure DataForSEO (~0,10 $) : OUI, faite. Requête d'argent = « chauffagiste reims » 390/mois (CLAUDE.md §0).
- H1 accueil : « Chauffagiste d'urgence à Reims, on remonte à la cause. »
- Intouchables : numéro 09 39 20 00 17, contact@, formulaire, aucun backlink.

### État des lieux (25/09)
- GSC 28 j : 580 vues, 5 clics (tous sur des articles). Fal.ai 11,40 $.
- Série sur la PRODUCTION (`../tasks/.maj-reims/avant-*.txt`) : design ECHEC 5 (H1 4 lignes, 698 car. bloc 1, aucun schéma, alignement, « pas de photo » à vérifier), navigation ECHEC 3 (aucun menu déroulant, contact sans FAQ ni prestations, bloc 2 non centré), blocs ECHEC 21/21 (aucun visuel de corps dans la source), visuels articles OK (33 + 55 à la publication), footprint : doublons internes des FAQ zones (« Notre ligne est ouverte… » ×12).
- Curl : /tarifs 404 qui sert le title « Électricien d'urgence à Annecy » (page 404 héritée), accueil title 61 car., description 225 car., H1 sans le métier.
- Accueil : zones (ServiceArea) en bloc 6 → à descendre en bloc 8. Pied de page mobile très long, texte non centré sur mobile.

### Quatre listes Search Console
1. Vues ≥ 10 sans clic (28 j) : pilier /services/urgence-depannage-chauffage-chaudiere 141 (pos 69,5) ; /conseils/entretien-chaudiere-location-qui-paie 58 (20) ; /conseils/desembouage-circuit-chauffage-a-quoi-ca-sert-quand-envisager 52 (85) ; /conseils 51 (50) ; / 32 (64) ; /conseils/vanne-thermostatique-bloquee-radiateur-ne-reagit-plus 26 (28) ; /services/fuite-chaudiere-circuit-chauffage 26 (85) ; /contact 19 (62) ; /zones/cormontreuil 19 (38) ; /conseils/chaudiere-perd-pression-vase-expansion 13 (8,8) ; /zones/witry-les-reims 13 (13,5) ; /services/ballon-eau-chaude-cumulus 12 (49) ; /services/radiateur-froid-desembouage-purge 11 (6,6) ; /zones/bezannes 11 (54) ; /services/depannage-chaudiere-fioul 10 (65).
2. Gains rapides (pos 8-30, 90 j) : location chaudière reims 80 (22) ; location chauffage reims 27 (26) ; entretien chaudière fioul autour de moi 6 (11) ; installation chauffage cormontreuil 6 (18) ; chauffagiste autour de moi 4 (10) ; chauffagiste 2 (12,5) ; chauffagiste 24h/24 (15) ; chauffagiste fuel (10) ; dépannage chaudière fioul autour de moi (8).
3. Prix : aucune requête mesurée en GSC ; volumes Google : désembouage radiateur 6 600, tarif entretien chaudière gaz 1 300, prix entretien chaudière 1 000, prix désembouage radiateur 1 000, prix désembouage 720, prix remplacement chaudière 90, prix dépannage chaudière 50.
4. Pilier : /services/urgence-depannage-chauffage-chaudiere (141 vues, pos 69,5) ; requêtes : urgence chaudière 39, sos chauffage 30, dépannage chauffage urgence 20, sos dépannage chaudière 20, sos chaudière 18, chauffagiste urgence 11, urgence dépannage chaudière 8, urgence chauffage 6.

### Note AVANT (25/09, grille §6) : 0/10
1 ❌ (H1 sans métier, desc 225, title 61) · 2 ❌ (pas de /tarifs) · 3 ❌ (pilier 3 blocs) · 4 ❌ (aucun fait sourcé, titles sans « chauffagiste ») · 5 ❌ · 6 ❌ · 7 ❌ (mobile non centré, pied de page long) · 8 ❌ (21 pages sans visuel de corps) · 9 ❌ (3/semaine, 56 brouillons) · 10 ❌ (série rouge)

### Note APRÈS (26/09) : 10/10
1 ✅ 2 ✅ 3 ✅ 4 ✅ 5 ✅ 6 ✅ 7 ✅ 8 ✅ 9 ✅ 10 ✅ (fin-de-site CODE 0 aucun défaut). EN LIGNE main d9a67b0, GO Rémy 26/09.

### Chantiers
- [x] A1 Builder pages : blocs image/schéma, /tarifs, contact riche, 404 propre, prix sur prestations et communes, communes voisines, centrage mobile des pages
- [x] A2 Builder accueil : H1, bloc 1 ≤ 320 car., zones en bloc 8, schéma, menu Zones, bloc 2 centré, pied de page mobile en volets, Tarifs au pied de page
- [x] B Tarifs et faits sourcés (content/tarifs.json, content/schemas.json)
- [x] C Prestations : pilier profond + 8 prestations (titles, descriptions, blocs, FAQ, prix, emplacements d'images)
- [x] D Communes : 12 pages (title chauffagiste + commune, fait sourcé, FAQ réécrites, emplacements d'images)
- [x] E Autoblog : cron 1-5, brouillons ≥ 65 dont l'article location/appoint, titres des articles vus sans clic, maillage
- [x] F Photos (après C et D) : couvertures et corps, regardées une par une
- [x] Contrôles passe 1, captures 3 formats, relecture critique, passe 2
- [x] Livraison à Rémy (GO), puis mise en ligne, Rank OS, indexation


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
- [x] Builder : page climatisation LIVRÉE (876199e) + retouche cover 002 + fix llms.txt
      (exclusion clim contradictoire retirée). Addendum SEO flottant commité par le CEO
      suite au signalement du Builder (bon réflexe de sa part)

## PROCHAINE SESSION (reprise du 29/07)

- [ ] Vérifier la sentinelle cron : le premier run PLANIFIÉ de publish-article.yml a-t-il
      tourné mercredi ~05:00 UTC ? (gh run list, event=schedule) → article 011 publié ?
- [ ] AUDIT CEO de la page climatisation (876199e) : conformité spec 7.1, lien croisé PAC,
      image (nouveau standard DA), grid accueil à 9 + FAQ à 7, llms.txt, cover 002 refaite
      (distinguable de la carte galerie), balayage tirets/chiffres
- [ ] DÉCISION Rémy/CEO : 9e choix « climatisation » dans le LeadForm de l'accueil
      (grille 4×2 → arbitrage design, le Builder attend le feu vert)
- [ ] Builder (si accord) : lien PAC→clim cliquable, lien clim sur Bezannes (spec 7.3),
      sous-titre « Quatre logiques » à rafraîchir, LeadForm selon décision
- [ ] Veilles : 09 Twilio (watcher), favicon GSC, calendrier v3 (novembre)

## MISE À JOUR 29/10/2026 (« vraiment dégueulasse », Rémy) : état des lieux §0.2
Search Console : 28 j = 24 clics / 1 423 vues (28 j d'avant : 4 / 588) ; 0 clic du 25 au 28/10 alors que les vues montent. 5 demandes (07/09, 09/10, 16/10, 19/10 appel, 22/10).
1. Vues sans clic (≥ 10, 28 j) : pilier urgence 82 (pos 74), /conseils 57, /zones/cormontreuil 57 (11,4), /contact 48, voyant-rouge 49 (9,1), entretien-location-qui-paie 46, changer-chaudiere-bien-loue 45 (6,3), fioul-fume 39 (7,9), fuite 25, gaz 23, gaz-ne-sallume-pas 23, premier-allumage 21, bezannes 16, fioul-premier-froid 16, cernay 14, ballon 10, entretien 10.
2. Gains rapides (pos 8-30) : location chaudière reims 158 vues/90 j (24,9), location chauffage reims 55 (26), ramonage cormontreuil 29 (15,9), dépannage chauffage reims 14 (25,4), chaudière reims (30), « autour de moi » fioul (10-12), chauffagiste autour de moi (9,6), chauffagiste fuel (10,7).
3. Requêtes de prix : quasi rien (devis dépannage chaudière fioul 1, pos 48) ; /tarifs 2 vues.
4. Clics d'achat sans demande : radiateur-froid 3, accueil 2, witry 1, fioul 1.
Contrôles AVANT (prod) : audit-design CODE 1 (points 11 et 12 : bloc 1 décentré, titre 4 lignes / accroche 3 à 320 px) ; navigation 0, blocs 0, visuels 0 ; check-texte ECHEC 1 700 mots / 800.
Note AVANT : 4/10 (1 title/H1 ✅, 2 tarifs ✅, 3 pilier ✅ mais pos 74, 4 zones ❌ pastilles pas de carte, 5 vues sans clic ❌, 6 maillage ✅, 7 bloc 1 ❌ photo à 12 %, 8 accueil ❌ 1 700 mots + icônes génériques, 9 pied de page non mesuré ❌, 10 contrôles ❌).
