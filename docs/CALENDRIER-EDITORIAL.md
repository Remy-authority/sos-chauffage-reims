# CALENDRIER-EDITORIAL.md — Blog conseils, SOS Chauffage Reims

> 12 mois de sujets pour l'autoblog (`content/drafts/NNN-slug.mdx` →
> publication via `publish-article.yml`), rédigé par l'agent SEO le
> 27/07/2026. Aucun draft n'existe encore : contrairement au calendrier de
> Metz (qui devait réconcilier des drafts déjà écrits), ce calendrier part
> d'une page blanche et sert directement de liste de rédaction dans l'ordre.
>
> **Calage saisonnier (règle absolue de ce calendrier)** : le site doit être
> en ligne avant fin septembre 2026, juste avant le pic de demande chauffage
> qui démarre en octobre. **Mois 1 de ce calendrier = premier mois de
> publication, visé Octobre 2026.** Les sujets sont classés par utilité
> saisonnière, pas par ordre alphabétique ni par service : le premier
> trimestre de publication (Octobre à Décembre, Mois 1-3) est le **plus
> fourni** (3 articles/mois, 9 au total) parce que c'est la période où les
> pannes sont les plus fréquentes et où l'indexation doit déjà être solide.
> La cadence redescend ensuite (2/mois de Janvier à Avril, 1/mois de Mai à
> Juillet) avant de remonter en Août-Septembre (2/mois) pour préparer la
> saison suivante avec des sujets entretien. Ce cycle de 12 mois est fait
> pour se répéter chaque année : à la fin du Mois 12 (Septembre), on
> reprend au Mois 1 (Octobre) avec de nouveaux sujets.
>
> Cadence totale : **24 articles sur 12 mois**, volontairement pondérée
> (9 en Q1 Oct-Déc, 6 en Q2 Jan-Mars, 4 en Q3 Avr-Juin, 5 en Q4 Juil-Sept)
> plutôt qu'un rythme plat de 2/mois, pour que le contenu soit prêt au
> moment où la demande existe. Rémy/CEO peut resserrer ou élargir la
> cadence, l'ordre des sujets reste valable dans tous les cas (publier dans
> l'ordre, ou par priorité ⭐ si le temps manque).

Règles pour chaque article (rappel doctrine, cf. `SEO-GEO-PLAN.md` et
`CLAUDE.md`) :

- Pas de chiffre inventé (aucune fréquence, aucun prix, aucun nombre
  d'années d'expérience non confirmé par Rémy).
- Pas de tiret cadratin nulle part dans le texte visible : virgule ou point.
- Réponse directe en ouverture d'article (1-2 phrases qui répondent à la
  question du titre), développement ensuite : c'est ce que les moteurs IA
  reprennent pour la citabilité GEO.
- FAQ ou section questions/réponses en fin d'article quand le sujet s'y
  prête, cohérente avec les `faq[]` de la page service liée.
- CTA final vers 1-2 pages services pertinentes (voir maillage,
  `SEO-GEO-PLAN.md` section 4), jamais un bloc générique répété à
  l'identique sur tous les articles.
- Jamais de mention de plomberie générale, débouchage de canalisation,
  installation électrique, climatisation ou installation neuve de chaudière/
  pompe à chaleur : hors périmètre (cf. `SEO-GEO-PLAN.md` section 0).
- Prénom d'auteur = persona du site une fois défini par le Builder
  (cohérence avec `config/site.config.ts`).

---

## Mois 1 — Octobre (3 articles, priorité maximale : remise en route de la saison)

1. ⭐ **Chaudière qui ne redémarre pas après l'été : les vérifications avant
   d'appeler un pro**
   Angle GEO : premier redémarrage de la saison, symptôme le plus recherché
   en octobre. Réponse directe en ouverture (causes les plus fréquentes :
   pression, alimentation, sécurité déclenchée), sans inviter à une
   manipulation technique dangereuse. Lien vers
   `urgence-depannage-chauffage-chaudiere`.
2. ⭐ **Radiateur froid dès les premiers froids : purger soi-même ou appeler
   un chauffagiste**
   Angle GEO : geste utilisateur simple (purge) expliqué clairement, avec la
   limite claire entre ce qui se fait seul et ce qui nécessite un
   professionnel (air résiduel après purge, radiateur qui reste froid).
   Lien vers `radiateur-froid-desembouage-purge`.
3. **Chaudière gaz qui se met en sécurité au redémarrage : pourquoi et que
   faire**
   Angle GEO : réponse directe sur les causes courantes de mise en sécurité
   (pression, évacuation des fumées, allumage), sans conseil touchant au
   gaz lui-même. Lien vers `depannage-chaudiere-gaz`.

## Mois 2 — Novembre (3 articles, pic de pannes)

4. ⭐ **Chaudière en panne en plein froid : les bons réflexes avant
   l'intervention**
   Angle GEO : article de référence pour la requête « chaudière en panne »,
   réponse directe en ouverture, gestes sûrs en attendant (protéger le sol,
   ne pas forcer sur l'appareil). Lien vers
   `urgence-depannage-chauffage-chaudiere`.
5. **Chaudière fioul qui ne démarre pas par temps froid : les causes
   possibles**
   Angle GEO : causes propres au fioul (gicleur encrassé, cuve, filtre),
   distinctes des causes gaz pour éviter le duplicate avec l'article Mois 1.
   Lien vers `depannage-chaudiere-fioul`.
6. **Pompe à chaleur qui ne chauffe plus quand il fait froid : panne ou
   simple dégivrage**
   Angle GEO : désambiguïsation utile (un cycle de dégivrage n'est pas une
   panne), forte valeur GEO sur une question que beaucoup d'utilisateurs de
   PAC se posent en hiver. Lien vers `depannage-pompe-a-chaleur`.

## Mois 3 — Décembre (3 articles, cœur de saison)

7. ⭐ **Chauffagiste en urgence à Reims : ce qui est couvert par une
   intervention d'urgence en plein hiver**
   Angle GEO : clarifie le périmètre d'une urgence (tous types d'appareils,
   disponibilité), utile pour la requête « chauffagiste urgence Reims ».
   Lien vers `urgence-depannage-chauffage-chaudiere`.
8. **Fuite d'eau sous la chaudière : les gestes à faire avant notre arrivée**
   Angle GEO : gestes de sécurité (couper l'eau si accessible, protéger le
   sol), réponse directe en ouverture. Lien vers
   `fuite-chaudiere-circuit-chauffage`.
9. **Plus d'eau chaude à la maison : les causes possibles d'une panne de
   ballon**
   Angle GEO : requête à fort volume, souvent confondue avec une panne de
   chauffage, d'où l'intérêt de la désambiguïser ici. Lien vers
   `ballon-eau-chaude-cumulus`.

## Mois 4 — Janvier (2 articles, gel et pression)

10. ⭐ **Pression de chaudière trop basse ou trop haute : ce que ça signifie**
    Angle GEO : explication du manomètre et des seuils habituels sans
    donner de chiffre non vérifié comme universel, orientée diagnostic.
    Lien vers `depannage-chaudiere-gaz`.
11. **Radiateurs froids en haut et chauds en bas (ou l'inverse) : que faire**
    Angle GEO : diagnostic par symptôme localisé (air emprisonné vs boue
    accumulée), complète l'article purge du Mois 1. Lien vers
    `radiateur-froid-desembouage-purge`.

## Mois 5 — Février (2 articles)

12. **Chaudière qui fait du bruit (claquement, sifflement) : faut-il
    s'inquiéter**
    Angle GEO : symptôme sonore, très recherché tel quel, réponse par type
    de bruit sans diagnostic technique dangereux. Lien vers
    `depannage-chaudiere-gaz`.
13. **Plus de chauffage du tout : comment savoir si le problème vient de la
    chaudière ou d'ailleurs**
    Angle GEO : désambiguïsation (thermostat, vanne, chaudière), article
    de type « aiguillage » très citable en GEO. Lien vers
    `urgence-depannage-chauffage-chaudiere`.

## Mois 6 — Mars (2 articles, sortie d'hiver)

14. **Trace d'humidité près des radiateurs : fuite du circuit de chauffage
    ou autre cause**
    Angle GEO : diagnostic différentiel (fuite circuit vs condensation vs
    infiltration extérieure au chauffage). Lien vers
    `fuite-chaudiere-circuit-chauffage`.
15. **Ballon d'eau chaude qui fuit ou qui goutte : faut-il le réparer ou le
    changer**
    Angle GEO : critère de décision (âge de l'appareil, localisation de la
    fuite) sans chiffre de durée de vie inventé. Lien vers
    `ballon-eau-chaude-cumulus`.

## Mois 7 — Avril (2 articles, bascule vers l'entretien)

16. **Réparer ou remplacer sa chaudière : comment trancher avant le
    prochain hiver**
    Angle GEO : article de décision, très recherché en sortie d'hiver quand
    l'appareil a posé problème toute la saison. Lien vers
    `entretien-chaudiere-annuel` et `urgence-depannage-chauffage-chaudiere`.
17. **Chaudière gaz ou fioul, quelles pannes sont différentes**
    Angle GEO : article de désambiguïsation métier, fort potentiel GEO sur
    les requêtes de comparaison. Lien vers `depannage-chaudiere-gaz` et
    `depannage-chaudiere-fioul`.

## Mois 8 — Mai (1 article)

18. **Pompe à chaleur ou chaudière, quelles pannes sont différentes**
    Angle GEO : complète la désambiguïsation du Mois 7 pour les foyers
    équipés en PAC, question de comparaison fréquente à l'achat comme à la
    panne. Lien vers `depannage-pompe-a-chaleur`.

## Mois 9 — Juin (1 article)

19. **Groupe de sécurité du ballon d'eau chaude : à quoi il sert, pourquoi
    il goutte parfois**
    Angle GEO : désambiguïsation d'un phénomène souvent pris à tort pour
    une fuite (goutte-à-goutte normal du groupe de sécurité). Lien vers
    `ballon-eau-chaude-cumulus`.

## Mois 10 — Juillet (1 article, creux été assumé)

20. **Désembouage de circuit de chauffage : à quoi ça sert et quand
    l'envisager**
    Angle GEO : sujet d'entretien de fond, faible urgence, adapté à la
    période creuse. Rappeler explicitement qu'il s'agit du circuit de
    chauffage, pas des canalisations d'évacuation. Lien vers
    `radiateur-froid-desembouage-purge`.

## Mois 11 — Août (2 articles, anticipation de la rentrée)

21. **Combien coûte un dépannage de chaudière : les critères qui font
    varier le prix**
    Angle GEO : requête à fort volume, traitée par facteurs (type de panne,
    pièce à remplacer, énergie) sans jamais donner de fourchette chiffrée
    tant que Rémy n'a pas validé une grille tarifaire. Lien vers
    `urgence-depannage-chauffage-chaudiere`.
22. **Chaudière de plus de 15 ans : les signes qu'il est temps d'anticiper
    son remplacement avant l'hiver**
    Angle GEO : signaux d'alerte (âge, pannes répétées, rendement), formulé
    sans donner d'âge limite universel présenté comme une règle absolue.
    Lien vers `entretien-chaudiere-annuel`.

## Mois 12 — Septembre (2 articles, préparation de la saison suivante)

23. ⭐ **Entretien annuel de chaudière : ce que couvre la visite obligatoire**
    Angle GEO : réponse factuelle et structurée (ce qui est contrôlé,
    pourquoi c'est obligatoire), sans avancer de périodicité chiffrée avant
    validation de la source réglementaire par Rémy (cf. `SEO-GEO-PLAN.md`
    section 2.1). Lien vers `entretien-chaudiere-annuel`.
24. ⭐ **Pourquoi entretenir sa chaudière avant l'automne plutôt qu'en plein
    hiver**
    Angle GEO : article de bascule qui referme le cycle annuel et renvoie
    naturellement vers les sujets du Mois 1 de l'année suivante (remise en
    route). Lien vers `entretien-chaudiere-annuel`.

---

## Répartition par page service (vérification de couverture)

- `urgence-depannage-chauffage-chaudiere` : sujets 1, 4, 7, 13, 16, 21 (6)
- `depannage-chaudiere-gaz` : sujets 3, 10, 12, 17 (4)
- `depannage-chaudiere-fioul` : sujets 5, 17 (2)
- `depannage-pompe-a-chaleur` : sujets 6, 18 (2)
- `radiateur-froid-desembouage-purge` : sujets 2, 11, 20 (3)
- `fuite-chaudiere-circuit-chauffage` : sujets 8, 14 (2)
- `ballon-eau-chaude-cumulus` : sujets 9, 15, 19 (3)
- `entretien-chaudiere-annuel` : sujets 16, 22, 23, 24 (4)

Chaque page service est couverte par au moins 2 articles, aucune ne dépend
d'un seul sujet de blog pour exister en maillage interne.
