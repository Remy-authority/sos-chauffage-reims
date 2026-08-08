/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  site.config.ts, LE fichier unique qui pilote l'identité du site.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Coeur du template « site local N+1 ». Pour déployer un nouveau site (autre
 *  métier / ville / locataire) : on édite CE fichier + le logo + content/*.json,
 *  SANS toucher aux composants ni au SEO.
 *
 *  ⚠️ Garde-fous :
 *   - `palette` est la SOURCE UNIQUE des couleurs. lib/theme.ts la convertit en
 *     CSS variables (canaux RGB) posées sur <html>, tailwind.config.ts les lit.
 *     Changer la palette d'un site N+1 = éditer ce bloc, rien d'autre.
 *   - `features.reviews=false` tant qu'il n'y a pas d'avis réels (aucun faux avis).
 *   - `legal` = gabarit paramétrable : NE PAS inventer SIREN / éditeur.
 *   - `showAddress=false` par défaut : pas d'`address` dans le schema tant que
 *     Rémy n'a pas tranché (artisan mobile vs adresse physique exposée).
 *   - Tout ce qui est marqué DEMO attend une donnée réelle de Rémy.
 *   - Le rayon d'intervention est déclaré UNE SEULE FOIS (`SERVICE_RADIUS_KM`)
 *     puis réutilisé partout (config, compteur animé, textes générés). Leçon
 *     Metz du 27/07/2026 : un rayon écrit à la fois en texte et en nombre finit
 *     par être corrigé à moitié.
 */

/**
 * Rayon d'intervention, en kilomètres. TRANCHÉ PAR RÉMY le 27/07/2026 : 30 km
 * (et non les 15 km proposés par le plan SEO). Ce n'est donc PAS une valeur DEMO.
 * ⚠️ Ne jamais réécrire cette valeur en dur dans un texte : toujours l'injecter
 * depuis `siteConfig.serviceArea.radiusKm`. C'est exactement le sens de la leçon
 * Metz du 27/07/2026 (un rayon écrit à la fois en texte, en nombre nu et dans un
 * compteur animé finit par n'être corrigé qu'à moitié).
 */
const SERVICE_RADIUS_KM = 30

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  /* ── Identité commerciale (louable / remplaçable par l'artisan locataire) ── */
  businessName: 'SOS Chauffage Reims',
  trade: 'Dépannage chauffage et chaudière',
  tradeShort: 'Chauffage',
  city: 'Reims',
  region: 'Grand Est',
  departmentName: 'Marne',
  department: '51',

  /* ── Contact ── */
  // DEMO – numéro pris dans la plage 09 39 98 00 00 à 09 39 98 99 99, que l'ARCEP
  // réserve à la fiction : aucun abonné réel ne peut se la voir attribuer, donc
  // aucun risque d'appeler un tiers. Le 09 définitif viendra de la ligne Twilio du
  // site : au moment de la bascule, SEULES ces deux lignes changent, tout le site
  // (liens tel:, schema JSON-LD, llms.txt, mentions légales) les lit d'ici.
  phone: '+33939200040',
  phoneDisplay: '09 39 20 00 40',
  phoneIsDemo: true,
  // DEMO – domaine pas encore acheté.
  email: 'contact@sos-chauffage-reims.fr',

  /* ── Branding ── */
  logo: '/logo.svg',

  /**
   * Palette « chaleur maîtrisée », propre à ce site.
   *
   * Le lexique des familles est celui du MÉTIER, pas un vocabulaire de template
   * réutilisé d'un site à l'autre (ce qui rendrait deux sites du portefeuille
   * rapprochables automatiquement par leurs seuls noms de tokens) :
   *
   *  - `braise` : URGENCE et action uniquement (CTA, eyebrow, point vivant).
   *               C'est la « chaleur » : ce que le client vient chercher.
   *  - `flamme` : bleu de flamme de gaz. Porte la structure, les icônes, les liens.
   *               C'est la « maîtrise » : le réglage juste, la flamme bleue et
   *               stable d'une chaudière qui fonctionne bien.
   *  - `craie`  : crème, écho à la craie de Champagne sur laquelle Reims est
   *               bâtie (caves, sous-sol, façades). Sections claires.
   *  - `fonte`  : brun fumé profond, la fonte d'un radiateur et le noir d'un âtre.
   *               Volontairement CHAUD, là où les autres sites du portefeuille ont
   *               des noirs froids : c'est le premier écart visible, avant même
   *               les couleurs d'accent.
   *
   * Règle de composition : `flamme` porte la structure, `braise` ne sert qu'à l'action.
   */
  palette: {
    braise: {
      300: '#F9B478',
      400: '#E8791A',
      500: '#BF5405',
      600: '#8F3D06',
    },
    flamme: {
      300: '#7CC0EC',
      400: '#3E97D8',
      500: '#1B76BC',
      600: '#125A93',
      700: '#0D4470',
    },
    craie: {
      50: '#FAF8F5',
      100: '#F3EFE9',
      200: '#E7E0D6',
      300: '#D6CABE',
      400: '#B2A296',
      500: '#877A70',
      600: '#655B54',
      700: '#45403C',
    },
    fonte: {
      600: '#57433A',
      700: '#42322B',
      800: '#30241F',
      900: '#211815',
      950: '#150F0D',
    },
  },

  /** Alias de compatibilité (manifest, thème navigateur, OG). */
  colors: {
    primary: '#125A93',
    primaryDark: '#0D4470',
    accent: '#BF5405',
    dark: '#150F0D',
    light: '#FAF8F5',
  },

  /* ── Réassurance / preuve ── */
  availability: '24h/24 · 7j/7',
  responseTime: 'Intervention rapide sur Reims et son agglomération',
  usps: ['Devis avant intervention', 'Gaz, fioul et pompe à chaleur', 'Artisan local', 'Urgence 7j/7'],
  methods: [
    'Analyseur de combustion',
    'Contrôle de pression au manomètre',
    'Caméra thermique',
    'Détecteur de gaz portatif',
  ],

  /* ── Zone d'intervention (schema areaServed + bloc zones) ── */
  serviceArea: {
    base: 'Reims',
    radiusKm: SERVICE_RADIUS_KM,
    // Quartiers de Reims cités pour la couverture géo fine (maillage, pas de page dédiée).
    districts: [
      'Centre-ville', 'Clairmarais', 'Cérès', 'Saint-Remi', 'Barbâtre',
      'Chemin Vert', 'Croix-Rouge', 'Murigny', 'Orgeval', 'Neufchâtel',
      'Wilson', 'Maison Blanche', 'Sainte-Anne', 'Courlancy',
    ],
  },

  /* ── Leads / formulaire ── */
  // Vide => l'API interne /api/contact gère le fallback (log + email tier gratuit).
  formEndpoint: '',

  /* ── SEO global ── */
  seo: {
    // Domaine final. Convention du portefeuille : le `www` est la version canonique,
    // l'apex `sos-chauffage-reims.fr` redirige dessus en 308 (réglé côté Vercel).
    // Toutes les URL absolues du site (canonical, OG, sitemap, JSON-LD, llms.txt)
    // sont construites à partir d'ici.
    canonicalBase: 'https://www.sos-chauffage-reims.fr',
    defaultOgImage: '/og.jpg',
    locale: 'fr_FR',
    lang: 'fr',
  },

  /* ── Feature flags ── */
  features: {
    reviews: false, // ⛔ aucun avis affiché
    gallery: true,
    blog: true,
  },

  /* ── Persona artisan (DEMO, à remplacer par les infos du loueur) ── */
  persona: {
    // DEMO – à remplacer par les infos du loueur
    name: 'Aurélien Godart',
    // DEMO – portrait généré, remplaçable par une photo réelle
    photo: '/persona.jpg',
    // DEMO – à remplacer par les infos du loueur
    title: 'Responsable des interventions chauffage',
    // DEMO – à remplacer par les infos du loueur
    quote:
      "Une chaudière qui s'arrête a presque toujours prévenu avant. On lit ce qu'elle dit, puis on répare la cause, pas le symptôme.",
  },

  /* ── Bloc « à propos » ── */
  about: {
    eyebrow: 'Qui sommes-nous',
    title: 'Le chauffage,\nnotre seul métier',
    // DEMO – texte à valider avec le loueur
    body: [
      "SOS Chauffage Reims intervient sur les pannes de chauffage et d'eau chaude à Reims et dans les communes de l'agglomération. Chaudière à l'arrêt, radiateurs qui restent froids, pompe à chaleur qui ne suit plus, plus une goutte d'eau chaude : nous rétablissons d'abord la situation, puis nous expliquons ce qui l'a provoquée.",
      "Nous ne faisons que du chauffage et de l'eau chaude sanitaire liée à l'appareil. Gaz, fioul, pompe à chaleur, ballon : ce sont quatre logiques de panne différentes, et c'est ce qui rend le diagnostic utile. Le devis est annoncé avant l'intervention.",
    ],
    highlight: 'Gaz, fioul, pompe à chaleur, ballon',
  },

  /* ── Étapes d'intervention ── */
  process: [
    {
      icon: 'phone',
      step: '01',
      title: 'Votre appel',
      desc: "Vous décrivez ce qui se passe : plus de chauffage, un code d'erreur affiché, un radiateur froid, plus d'eau chaude. Nous situons l'appareil et le degré d'urgence.",
      duration: 'Immédiat',
    },
    {
      icon: 'search',
      step: '02',
      title: 'Diagnostic sur place',
      desc: "Lecture du code défaut, contrôle de la pression, de l'alimentation et des sécurités, analyse de combustion si l'appareil brûle un combustible. On cherche la cause, pas seulement le voyant.",
      duration: 'Sur site',
    },
    {
      icon: 'tool',
      step: '03',
      title: 'Réparation',
      desc: "Remise en service quand c'est un réglage ou une sécurité, remplacement de la pièce en cause quand elle est fautive. Vous savez ce qui est remplacé et pourquoi.",
      duration: 'Jour J',
    },
    {
      icon: 'check',
      step: '04',
      title: 'Contrôle et conseil',
      desc: "Nous vérifions la montée en température et le bon fonctionnement des sécurités, puis nous vous disons ce qui doit être surveillé pour ne pas revivre la même panne.",
      duration: 'Avant de partir',
    },
  ],

  /**
   * Chiffres affichés. Règle : uniquement des données vérifiables sur le site lui-même
   * (disponibilité annoncée, rayon d'intervention, nombre de prestations et de communes).
   * ⛔ Aucun chiffre d'activité inventé (interventions réalisées, années d'expérience).
   */
  stats: [
    { value: 24, suffix: 'h/24', label: 'Ligne urgence' },
    { value: 7, suffix: 'j/7', label: 'Week-ends et fériés' },
    { value: SERVICE_RADIUS_KM, suffix: ' km', label: 'Rayon autour de Reims' },
    { value: 8, suffix: '', label: 'Prestations chauffage' },
  ],

  whyUs: [
    {
      icon: 'shield',
      title: 'On lit la panne avant de changer une pièce',
      desc: "Une mise en sécurité n'est pas une panne, c'est un message. Nous remontons à ce qui l'a déclenchée avant de remplacer quoi que ce soit, sinon le défaut revient au prochain coup de froid.",
    },
    {
      icon: 'clock',
      title: 'Une ligne ouverte 7j/7',
      desc: "Une maison sans chauffage un dimanche de janvier ne peut pas attendre le lundi, surtout avec un bébé ou une personne âgée. Vous nous joignez le week-end et les jours fériés.",
    },
    {
      icon: 'euro',
      title: 'Le prix annoncé avant',
      desc: "Vous savez ce que coûte l'intervention avant qu'elle commence. Si le diagnostic change la donne, vous l'apprenez avant la réparation, pas sur la facture.",
    },
    {
      icon: 'star',
      title: 'Artisan local, pas une plateforme',
      desc: "Vous parlez à la personne qui intervient. Pas de centrale nationale qui revend votre demande au premier disponible du secteur.",
    },
  ],

  /* ── FAQ accueil ── */
  homeFaq: [
    {
      q: 'Que faire si ma chaudière tombe en panne en plein hiver ?',
      a: "Coupez le chauffage si vous voyez de l'eau s'écouler sous l'appareil, relevez le code d'erreur affiché sur l'écran, et n'insistez pas sur le bouton de réarmement au-delà d'une tentative : une sécurité qui se redéclenche protège quelque chose. Fermez les pièces inoccupées pour concentrer la chaleur restante et appelez. Le code d'erreur que vous nous donnez au téléphone oriente déjà le diagnostic et la pièce à emporter.",
    },
    {
      q: 'Intervenez-vous le week-end et en soirée ?',
      a: "Oui. Une panne de chauffage ou d'eau chaude ne choisit pas son horaire, et c'est justement le soir et le week-end qu'elle se déclare, au moment où la maison redemande de la puissance. Notre ligne est ouverte les week-ends et les jours fériés pour les urgences à Reims et dans les communes de l'agglomération.",
    },
    {
      q: 'Combien coûte un dépannage de chaudière ?',
      a: "Le prix dépend de trois choses : la nature de la panne, la pièce à remplacer si une pièce est en cause, et l'énergie de l'appareil. Une sécurité à réarmer après diagnostic, une carte électronique à changer ou un corps de chauffe percé ne représentent pas le même travail. Nous annonçons le tarif de l'intervention au téléphone à partir de ce que vous décrivez, puis nous le confirmons sur place avant de commencer. Aucun travail n'est lancé sans votre accord.",
    },
    {
      q: 'Faut-il réparer ou remplacer une chaudière ancienne ?',
      a: "La question se tranche sur trois critères, pas sur l'âge seul : le coût de la réparation comparé à celui d'un appareil neuf, la disponibilité des pièces détachées du modèle, et la répétition des pannes sur les dernières saisons. Une chaudière ancienne mais bien entretenue, dont la pièce fautive existe encore, se répare sans hésiter. Une chaudière dont les pièces ne se trouvent plus ou qui vous a déjà immobilisé plusieurs fois dans l'hiver appelle une décision de remplacement, qu'il vaut mieux prendre hors saison que dans l'urgence.",
    },
    {
      q: 'Intervenez-vous sur les chaudières gaz, fioul et les pompes à chaleur ?',
      a: "Oui, sur les trois, ainsi que sur les ballons d'eau chaude et les circuits de radiateurs. Ces appareils ne tombent pas en panne pour les mêmes raisons : le gaz se met en sécurité sur un défaut de pression ou d'évacuation, le fioul cale plutôt sur un gicleur encrassé ou un problème d'alimentation depuis la cuve, la pompe à chaleur souffre surtout au niveau de son unité extérieure et de ses cycles de dégivrage. C'est pour ça que nous vous demandons le type d'appareil dès le premier appel.",
    },
    {
      q: "Que couvre l'entretien annuel obligatoire de la chaudière ?",
      a: "La visite d'entretien couvre le nettoyage et la vérification de l'appareil, le contrôle des organes de sécurité et de l'évacuation des fumées, le réglage de la combustion et la mesure des émissions, puis la remise d'une attestation d'entretien. Cette attestation est le document que votre assureur peut réclamer après un sinistre. L'entretien des appareils de chauffage est encadré par la réglementation en vigueur : nous vous indiquons ce qu'elle impose pour votre appareil au moment de la prise de rendez-vous.",
    },
    {
      q: 'Intervenez-vous aussi sur les pannes de climatisation ?',
      a: "Oui, sur la climatisation en mode rafraîchissement : un appareil qui ne refroidit plus ou souffle tiède, de l'eau qui apparaît sous l'unité intérieure, et l'entretien des filtres avant la saison chaude. Une précision utile si votre appareil est réversible : quand il ne chauffe plus en hiver, la panne relève du mode chauffage et se traite comme une panne de pompe à chaleur, pas comme une panne de climatisation. Ce sont deux diagnostics différents sur la même machine, alors indiquez-nous le mode dans lequel elle vous lâche.",
    },
  ],

  /* ── Légal (GABARIT, à compléter par Rémy avant prod) ── */
  legal: {
    showAddress: false, // false => schema SANS address
    address: { street: '', postalCode: '51100', city: 'Reims' },
  },
} as const
