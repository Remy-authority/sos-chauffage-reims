/**
 * Génère les visuels d'un article au moment de sa publication (autoblog).
 *
 * Appelé par le workflow publish-article APRÈS publish-next-draft.mjs, avec le slug de
 * l'article qui vient d'être déplacé dans content/conseils/.
 *
 *   node scripts/generate-article-images.mjs <slug>
 *
 * Produit, selon la recette portefeuille (docs/RECETTE-VISUELS-ARTICLES.md) :
 *  - la couverture, au chemin déjà déclaré dans le frontmatter `cover:`, décrite par `coverAlt:`
 *  - un visuel de corps `/conseils/<slug>-1.jpg`, inséré dans le texte après la 2e section
 *
 * En cas d'échec, sort en code 1 SANS rien committer : le workflow s'arrête, `main` reste
 * intact et le brouillon repart au prochain passage. Un article ne se publie jamais nu.
 *
 * Nécessite FAL_KEY dans l'environnement (IMAGE_PROVIDER=gemini : GEMINI_API_KEY).
 * Contrôle sans appel payant : node scripts/generate-article-images.mjs --prompt "<sujet>" [--corps] [--slug <slug>] [--titre "<titre>"]
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import matter from 'gray-matter'
import { imagePorteUnDocument } from './check-image-text.mjs'

const MODEL = 'gemini-3.1-flash-image-preview'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`
const ROOT = process.cwd()
const CONSEILS = path.join(ROOT, 'content', 'conseils')
const PUBLIC = path.join(ROOT, 'public')
const MAX_TENTATIVES = 3

// Mode contrôle, SANS aucun appel payant : imprime la consigne réellement envoyée.
//   node scripts/generate-article-images.mjs --prompt "<sujet>" [--corps] [--slug <slug>] [--titre "<titre>"]
const args = process.argv.slice(2)
const option = (nom) => {
  const i = args.indexOf(nom)
  return i === -1 ? undefined : args[i + 1]
}
const modePrompt = args.includes('--prompt')
const slug = modePrompt ? option('--slug') || 'essai' : args[0]
if (!slug || slug.startsWith('--')) {
  console.error('Usage : node scripts/generate-article-images.mjs <slug>')
  process.exit(1)
}

const provider = process.env.IMAGE_PROVIDER || 'flux'
const apiKey = provider === 'flux' ? process.env.FAL_KEY : process.env.GEMINI_API_KEY
if (!apiKey && !modePrompt) {
  console.error(
    provider === 'flux'
      ? 'FAL_KEY absent de l\'environnement.'
      : 'GEMINI_API_KEY absent de l\'environnement.',
  )
  process.exit(1)
}

// Style visuel du site : ancre géographique et métier, pour que deux sites du portefeuille
// ne produisent jamais la même imagerie (anti-footprint).
const stylePath = path.join(ROOT, 'config', 'image-style.json')
if (!fs.existsSync(stylePath)) {
  console.error(`Style visuel manquant : ${stylePath}`)
  process.exit(1)
}
const style = JSON.parse(fs.readFileSync(stylePath, 'utf8'))

/**
 * Types de scène. Le SUJET de l'article ne sert qu'à choisir l'un d'eux par mots-clés : il
 * n'entre JAMAIS tel quel dans la consigne (sinon FLUX dessine la panne, la personne ou le
 * décor qu'il décrit). Chaque scène a une vue large (couverture) et une vue proche (corps).
 * L'ordre compte : la première règle qui correspond l'emporte.
 */
const SCENES = [
  {
    cle: 'collectif',
    motif: /collectif|immeuble|syndic|copropri/,
    large: 'Wide architectural interior photograph of the clean, modern collective boiler room of a recent apartment building: a row of three newly installed white wall-mounted condensing boilers in cascade above neatly insulated pipes in white cladding, a pale grey epoxy floor and bright ceiling light panels.',
    proche: 'Close architectural interior photograph of neatly insulated pipes in white cladding and polished chrome valves running beneath a row of newly installed white wall-mounted condensing boilers in a clean, modern collective boiler room.',
  },
  {
    cle: 'desembouage',
    motif: /d[ée]sembou|embou|boue|filtre magn[ée]tique/,
    large: 'Wide architectural interior photograph of a bright, tastefully furnished renovated living room with two spotless modern white horizontal steel panel radiators with fine vertical ribs, each mounted low under its own large window, a light oak parquet floor, a linen sofa and a low oak table.',
    proche: 'Close architectural interior photograph of the underside of a single newly installed compact rectangular white wall-hung gas combi boiler, short straight copper pipes dropping vertically from it, one of them fitted with a compact newly installed magnetic system filter, a smooth matt black cylinder.',
  },
  {
    cle: 'thermodynamique',
    motif: /thermodynamique/,
    large: 'Wide architectural interior photograph of a clean, bright renovated utility room with a newly installed heat pump water heater standing on a light grey tiled floor beside white shelving: a tall white floor-standing cylinder about 1.8 metres tall, crowned by a round pale grey fan housing with a circular grille and two short grey air ducts rising into the ceiling.',
    proche: 'Close architectural interior photograph of the upper half of a newly installed heat pump water heater standing on the floor of a clean bright utility room: a tall white cylinder crowned by a round pale grey fan housing with a circular grille, two short grey air ducts rising into the ceiling.',
  },
  {
    cle: 'pac',
    motif: /pompe [àa] chaleur|\bpac\b|unit[ée] ext[ée]rieure|d[ée]givr|aérotherm|aerotherm/,
    exterieur: true,
    large: 'Wide architectural exterior photograph of the side terrace of a recently built house: a newly installed air-to-water heat pump outdoor unit, a white box with a large round fan grille, standing on low feet on clean light grey paving against a smooth pale rendered wall.',
    proche: 'Close architectural exterior photograph of a newly installed air-to-water heat pump outdoor unit, a white box with a large round fan grille and neatly insulated pipes running into a smooth pale rendered wall, on clean light grey paving.',
  },
  {
    cle: 'securite-ballon',
    motif: /groupe de s[ée]curit[ée]/,
    large: 'Wide architectural interior photograph of a clean, bright renovated utility room with a newly installed tall white cylindrical electric hot water tank standing on a light grey tiled floor, neat copper and chrome connections at its base.',
    proche: 'Close architectural interior photograph of the polished chrome safety valve assembly, a small white drain funnel and straight copper pipes beneath a newly installed white cylindrical hot water tank, clean light grey wall tiles.',
  },
  {
    cle: 'ballon',
    motif: /ballon|cumulus|eau chaude sanitaire|eau chaude/,
    large: 'Wide architectural interior photograph of a clean, bright renovated utility room with a newly installed tall white cylindrical electric hot water tank standing on a light grey tiled floor beside white shelving.',
    proche: 'Close architectural interior photograph of a newly installed tall white cylindrical hot water tank and its neat copper and chrome connections in a clean bright utility room.',
  },
  {
    cle: 'plancher',
    motif: /plancher chauffant|collecteur/,
    large: 'Wide architectural interior photograph of a bright renovated open-plan living room with a warm light oak parquet floor heated from below, large windows and a linen sofa.',
    proche: 'Close architectural interior photograph of a neat brass underfloor heating manifold with white valve heads, fitted in a clean white technical cupboard of a recent house.',
  },
  {
    cle: 'clim',
    motif: /climatis|\bclim\b|split/,
    large: 'Wide architectural interior photograph of a bright renovated bedroom with a slim white wall-mounted air conditioner indoor unit placed high on the wall above the bed.',
    proche: 'Close architectural interior photograph of a slim white wall-mounted air conditioner indoor unit high on a smooth pale wall of a bright renovated room.',
  },
  {
    cle: 'radiateur',
    motif: /radiateur|vanne|thermostatique|purg|pointeau/,
    large: 'Wide architectural interior photograph of a bright, tastefully furnished renovated living room: a single modern white horizontal steel panel radiator with fine vertical ribs, mounted low on the wall under a large window, a white thermostatic valve on its side pipe, a linen sofa and a low oak table nearby, a light oak parquet floor.',
    proche: 'Close architectural interior photograph of the end of a modern white horizontal steel panel radiator with fine vertical ribs, its smooth white thermostatic valve head with a plain ribbed grip on a short chrome pipe, a bright furnished room softly blurred behind.',
  },
  {
    cle: 'vase',
    motif: /vase d'expansion|vase d’expansion|expansion/,
    large: 'Wide architectural interior photograph of a bright renovated utility room with a single newly installed compact rectangular white wall-hung gas combi boiler, a squat red cylindrical expansion vessel with rounded ends mounted horizontally on the wall just below it and joined to it by a short copper pipe.',
    proche: 'Close architectural interior photograph of a squat red cylindrical expansion vessel with rounded ends, mounted horizontally on a pale wall just below a single newly installed compact rectangular white wall-hung gas combi boiler and joined to its underside by a short straight copper pipe.',
  },
  {
    cle: 'fioul',
    motif: /fioul|mazout|cuve|br[ûu]leur|gicleur/,
    large: 'Wide architectural interior photograph of a clean, tidy, freshly painted boiler room in a recent family house: a newly installed floor-standing oil condensing boiler, a white rectangular cabinet about waist height with a round insulated flue pipe rising from its top and bending into the wall, copper supply lines at its side, a light grey tiled floor.',
    proche: 'Close architectural interior photograph of a newly installed floor-standing oil condensing boiler in a clean freshly painted boiler room: a white rectangular cabinet about waist height, a round insulated flue pipe rising from its top and bending into the wall, neat copper supply lines and chrome valves at its side.',
  },
  {
    cle: 'conduit',
    motif: /conduit|ventouse|fum[ée]e|fa[çc]ade|ext[ée]rieur/,
    exterieur: true,
    large: 'Wide architectural exterior photograph of the clean, smooth, pale rendered facade of a recently built house beside a large window, with a small round white boiler flue terminal, a short horizontal pipe ending in a round cap, protruding from the wall.',
    proche: 'Close architectural exterior photograph of a small round white boiler flue terminal, a short horizontal pipe ending in a round cap, protruding from a clean, smooth, pale rendered wall of a recently built house.',
  },
  {
    cle: 'raccords',
    motif: /fuite|goutte|raccord|robinet|remplissage|pression|manom[èe]tre/,
    large: 'Wide architectural interior photograph of a bright renovated utility room with a single newly installed compact rectangular white wall-hung gas combi boiler, short straight copper pipes and chrome valves dropping vertically from its underside, a dry spotless light grey tiled floor.',
    proche: 'Close architectural interior photograph of the underside of a single newly installed compact rectangular white wall-hung gas combi boiler: short straight shiny copper pipes with polished chrome valves dropping vertically from it into a spotless pale wall.',
  },
]

/** Pièces possibles pour une chaudière murale (scène par défaut). Un mot du sujet l'impose,
 *  sinon le slug choisit, pour que deux articles voisins ne montrent pas la même pièce. */
const PIECES_CHAUDIERE = [
  { motif: /cuisine|appartement|locat|propri[ée]taire|bail|lou[ée]/, piece: 'bright renovated apartment kitchen with light oak worktops and tall white cabinets' },
  { motif: /buanderie|linge/, piece: 'bright renovated laundry room with white shelving and a light grey tiled floor' },
  { motif: /cellier|garage|local technique/, piece: 'clean renovated utility room with tidy white storage cabinets' },
  { motif: /entr[ée]e|couloir|placard/, piece: 'renovated hallway alcove of a recent family house with light oak shelving' },
  { motif: /salle de bain|salle d'eau/, piece: 'bright renovated bathroom with large smooth pale grey porcelain tiles and a light oak vanity unit' },
]

function graineDe(texte) {
  return [...texte].reduce((n, c) => (Math.imul(n, 31) + c.charCodeAt(0)) >>> 0, 7)
}

/**
 * Consigne d'image. RÉÉCRITE LE 25/09/2026 (mise à jour du site) sur le modèle de
 * peintre-beauvais.fr (13/09, #L217). L'ancienne consigne (longue, en français, genre
 * « photographie documentaire », « Éviter de montrer des personnes », décor « craie
 * champenoise ») a produit sur les 33 articles publiés : poêles à bois, artisans de face,
 * tuyaux rouillés, caves en pierre, texte brodé sur les vêtements, une machine à laver prise
 * pour une chaudière. Causes : FLUX tronque une consigne longue et ne garde que le sujet de
 * tête ; le genre « documentaire » fait venir des personnes (#L154) ; une négation fait venir
 * ce qu'elle interdit ; le décor régional commande des caves en pierre (#L089).
 * Désormais : 5 phrases en anglais, la première EST l'image finie, choisie par mots-clés parmi
 * des scènes d'équipement neuf ; aucune négation ; le style du site se réduit à sa lumière
 * et à sa palette (config/image-style.json).
 */
function habillerPrompt(scene, { corps = false, titre = '' } = {}) {
  const sujet = (scene || '').toLowerCase()
  const secours = (titre || '').toLowerCase()
  const trouvee = SCENES.find((s) => s.motif.test(sujet)) || SCENES.find((s) => s.motif.test(secours))

  const graine = graineDe(slug)
  let cadre
  if (trouvee) {
    cadre = corps ? trouvee.proche : trouvee.large
  } else {
    // Scène par défaut : la chaudière gaz murale neuve, dans une pièce propre.
    const imposee = PIECES_CHAUDIERE.find((p) => p.motif.test(sujet)) || PIECES_CHAUDIERE.find((p) => p.motif.test(secours))
    const piece = imposee ? imposee.piece : PIECES_CHAUDIERE[(graine + (corps ? 1 : 0)) % PIECES_CHAUDIERE.length].piece
    cadre = corps
      ? `Close architectural interior photograph of a single newly installed compact rectangular white wall-hung gas combi boiler with a flat blank front, short straight copper pipes and chrome valves dropping vertically from its underside, in a ${piece}.`
      : `Wide architectural interior photograph of a ${piece}, with a single newly installed compact rectangular white wall-hung gas combi boiler fixed on the wall, short straight copper pipes dropping vertically from its underside.`
  }

  // Palette choisie par le SLUG (stable), décalée pour le visuel de corps : deux images d'un
  // même article ne partagent jamais la même teinte.
  const exterieur = trouvee?.exterieur
  const palettes = exterieur ? style.palettesExterieur : style.palettes
  const palette = palettes[(graine + (corps ? 1 : 0)) % palettes.length]
  return [
    cadre,
    `Editorial magazine quality, realistic photograph, contemporary 2020s renovation, ${palette}.`,
    `Every appliance has a plain, smooth, completely blank white casing; pipes are straight, clean and evenly spaced; flawless pristine finish, spotless surfaces.`,
    `${exterieur ? style.lumiereExterieur : style.lumiere}, gentle shadows, architectural photographer framing, one single coherent ${exterieur ? 'scene' : 'room'}.`,
    `A calm, tidy, ${exterieur ? 'well-kept' : 'tastefully furnished'} home photographed as an unoccupied still life, every surface blank and plain.`,
  ].join(' ')
}

if (modePrompt) {
  console.log(habillerPrompt(option('--prompt') || '', { corps: args.includes('--corps'), titre: option('--titre') || '' }))
  process.exit(0)
}

const articlePath = path.join(CONSEILS, `${slug}.mdx`)
if (!fs.existsSync(articlePath)) {
  console.error(`Article introuvable : ${articlePath}`)
  process.exit(1)
}

const raw = fs.readFileSync(articlePath, 'utf8')
const parsed = matter(raw)
const { data: fm } = parsed

// Le frontmatter est conservé TEL QUEL (texte brut) : on ne le réécrit jamais via
// matter.stringify, qui reformaterait les blocs YAML imbriqués (faq, listes) et
// produirait des diffs parasites sur tout l'article. Seul le corps est modifié.
const finFrontmatter = raw.indexOf('\n---', 3)
if (!raw.startsWith('---') || finFrontmatter === -1) {
  console.error('Article sans frontmatter exploitable.')
  process.exit(1)
}
let frontmatterBrut = raw.slice(0, finFrontmatter + 4)
let body = raw.slice(finFrontmatter + 4)

const FLUX_ENDPOINT = 'https://fal.run/fal-ai/flux/dev'

/** Appelle l'API image et renvoie les octets de l'image. */
async function genererImage(prompt) {
  if (provider === 'flux') {
    const res = await fetch(FLUX_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Key ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        // JAMAIS 'landscape_16_9' (rend 1024x576) : docs/RECETTE-IMAGES-FLUX.md du
        // portefeuille, correction du 11/08.
        image_size: { width: 1280, height: 720 },
        num_images: 1,
        num_inference_steps: 28,
        enable_safety_checker: false,
      }),
    })
    if (!res.ok) throw new Error(`FLUX ${res.status} : ${(await res.text()).slice(0, 300)}`)
    const json = await res.json()
    const url = json?.images?.[0]?.url
    if (!url) throw new Error('Réponse FLUX sans image.')
    const bin = await fetch(url)
    if (!bin.ok) throw new Error(`Téléchargement image ${bin.status}`)
    return Buffer.from(await bin.arrayBuffer())
  }

  // Repli Gemini, conservé tel quel pour IMAGE_PROVIDER=gemini.
  const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
        imageConfig: { imageSize: '2K', aspectRatio: '16:9' },
      },
    }),
  })

  if (!res.ok) {
    throw new Error(`API ${res.status} : ${(await res.text()).slice(0, 300)}`)
  }

  const json = await res.json()
  const parts = json?.candidates?.[0]?.content?.parts ?? []
  const image = parts.find((p) => p.inlineData?.data)
  if (!image) {
    throw new Error('Réponse sans image (contenu probablement filtré).')
  }
  return Buffer.from(image.inlineData.data, 'base64')
}

/** Réessaie : l'API filtre parfois une génération sans raison durable. */
async function genererAvecReprises(prompt, etiquette) {
  let derniere
  for (let essai = 1; essai <= MAX_TENTATIVES; essai++) {
    try {
      const octets = await genererImage(prompt)

      // GARDE-FOU DU 11/08/2026 (docs/RECETTE-GARDE-FOU-IMAGES.md du portefeuille) :
      // le cron publie sans qu'aucun humain ne voie l'image. Une image portant un
      // document, un panneau ou un montant est refusée et régénérée. Le rejet
      // réutilise la boucle de reprises existante.
      const verdict = await imagePorteUnDocument(octets)
      if (verdict.rejet) throw new Error(`image refusée par le garde-fou : ${verdict.motif}`)

      console.log(`  ${etiquette} : image obtenue (essai ${essai}, ${Math.round(octets.length / 1024)} Ko bruts)`)
      return octets
    } catch (err) {
      derniere = err
      console.log(`  ${etiquette} : essai ${essai} échoué (${err.message})`)
      if (essai < MAX_TENTATIVES) await new Promise((r) => setTimeout(r, 4000 * essai))
    }
  }
  throw derniere
}

/**
 * Écrit l'image redimensionnée et compressée en JPEG.
 *
 * L'API rend un JPEG 2K d'environ 3 Mo : inexploitable tel quel sur le web, il faut le
 * ramener à 1600 px de large et le recompresser. `sharp` fait ça partout (macOS comme
 * runner Ubuntu, qui n'a ni sips ni ImageMagick). Repli sur les outils système si sharp
 * venait à manquer, et en dernier recours l'image brute plutôt qu'un article sans visuel.
 */
async function ecrireJpeg(octets, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true })

  try {
    const { default: sharp } = await import('sharp')
    await sharp(octets)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(destination)
    const ko = Math.round(fs.statSync(destination).size / 1024)
    console.log(`  -> ${path.relative(ROOT, destination)} (${ko} Ko, via sharp)`)
    return
  } catch (err) {
    console.log(`  sharp indisponible (${err.message}), repli sur les outils système`)
  }

  const tmp = destination.replace(/\.jpe?g$/i, '') + '.tmp.jpg'
  fs.writeFileSync(tmp, octets)
  const outils = [
    ['sips', ['-Z', '1600', '-s', 'format', 'jpeg', '-s', 'formatOptions', '72', tmp, '--out', destination]],
    ['magick', [tmp, '-resize', '1600x>', '-quality', '72', destination]],
    ['convert', [tmp, '-resize', '1600x>', '-quality', '72', destination]],
  ]
  for (const [bin, args] of outils) {
    try {
      execFileSync(bin, args, { stdio: 'ignore' })
      fs.unlinkSync(tmp)
      const ko = Math.round(fs.statSync(destination).size / 1024)
      console.log(`  -> ${path.relative(ROOT, destination)} (${ko} Ko, via ${bin})`)
      return
    } catch {
      /* outil absent : on tente le suivant */
    }
  }

  fs.renameSync(tmp, destination)
  const ko = Math.round(fs.statSync(destination).size / 1024)
  console.log(`  -> ${path.relative(ROOT, destination)} (${ko} Ko, NON COMPRESSÉ, aucun outil disponible)`)
}

/** Découpe le corps en sections de niveau 2. */
function sections(texte) {
  const lignes = texte.split('\n')
  const out = []
  lignes.forEach((ligne, i) => {
    if (/^##\s+/.test(ligne)) out.push({ index: i, titre: ligne.replace(/^##\s+/, '').trim() })
  })
  return out
}

/** Insère le visuel de corps après le premier paragraphe de la section choisie. */
function insererVisuel(texte, ligneSection, markdown) {
  const lignes = texte.split('\n')
  let i = ligneSection + 1
  while (i < lignes.length && lignes[i].trim() === '') i++
  while (i < lignes.length && lignes[i].trim() !== '') i++ // fin du 1er paragraphe
  lignes.splice(i, 0, '', markdown)
  return lignes.join('\n')
}

async function main() {
  console.log(`Visuels de l'article « ${fm.title ?? slug} »`)

  // 1. Couverture, décrite par coverAlt quand l'autoblog l'a rédigé.
  //
  // Beaucoup de brouillons n'ont aucun `cover:` (constat du 04/08 : 5 sites sur 17, dont
  // tous ceux de Besançon). On ne se bloque pas pour autant : on calcule le chemin selon la
  // convention déclarée du site et on insère la ligne dans le frontmatter, sans toucher au
  // reste du bloc.
  let coverRel = fm.cover
  let coverAAjouter = false
  if (!coverRel) {
    coverRel = style.convention === 'dossier'
      ? `/conseils/${slug}/cover.jpg`
      : `/conseils/${slug}.jpg`
    coverAAjouter = true
    console.log(`  aucun \`cover:\` déclaré, chemin retenu : ${coverRel}`)
  }
  const coverDest = path.join(PUBLIC, coverRel.replace(/^\//, ''))

  if (fs.existsSync(coverDest)) {
    // GARDE-FOU DU 11/08/2026, section « 3 bis » de docs/RECETTE-GARDE-FOU-IMAGES.md :
    // une image PRÉ-EXISTANTE (brouillon pré-illustré, asset déplacé par
    // publish-next-draft) ne passait par aucun contrôle. On la vérifie ici aussi.
    const verdict = await imagePorteUnDocument(fs.readFileSync(coverDest))
    if (verdict.rejet) {
      throw new Error(`couverture pré-existante refusée par le garde-fou (${coverRel}) : ${verdict.motif}`)
    }
    console.log(`  couverture déjà présente, conservée et contrôlée : ${coverRel}`)
  } else {
    // Sans coverAlt, le titre de l'article fait une description de scène acceptable.
    const sceneCover = fm.coverAlt || fm.title || slug
    const octets = await genererAvecReprises(habillerPrompt(sceneCover, { titre: fm.title }), 'couverture')
    await ecrireJpeg(octets, coverDest)
  }

  // Déclare la couverture dans le frontmatter si elle n'y était pas. Insertion d'une seule
  // ligne juste avant le `---` de fermeture : le reste du bloc n'est jamais reformaté.
  if (coverAAjouter) {
    const lignes = frontmatterBrut.split('\n')
    const fin = lignes.lastIndexOf('---')
    const alt = (fm.title || slug).replace(/"/g, "'")
    lignes.splice(fin, 0, `cover: "${coverRel}"`, `coverAlt: "${alt}"`)
    frontmatterBrut = lignes.join('\n')
    fs.writeFileSync(articlePath, frontmatterBrut + body)
    console.log('  `cover:` et `coverAlt:` ajoutés au frontmatter')
  }

  // 2. Visuel de corps, s'il n'y en a pas déjà un.
  const aDejaVisuel = /!\[[^\]]*\]\(|<Figure|<Image/.test(body)
  if (aDejaVisuel) {
    console.log('  visuel de corps déjà présent, rien à ajouter.')
  } else {
    const h2 = sections(body)
    if (h2.length === 0) throw new Error('Article sans section de niveau 2 : aucun point d\'insertion.')

    // 2e section de préférence : la 1re est souvent introductive.
    const cible = h2[Math.min(1, h2.length - 1)]

    // Contexte concret pour la scène : le début de la section visée.
    const suite = body.split('\n').slice(cible.index + 1).join(' ').replace(/\s+/g, ' ').trim()
    const extrait = suite.slice(0, 320)

    const scene = `${cible.titre}. Éléments concrets à représenter, tirés du texte : ${extrait}`
    const octets = await genererAvecReprises(habillerPrompt(scene, { corps: true, titre: fm.title }), 'visuel de corps')

    // Le visuel suit la convention du site, déduite du chemin de la couverture :
    // dossier par article (/conseils/<slug>/cover.jpg) ou fichiers à plat.
    const coverParArticle = new RegExp(`/conseils/${slug}/`).test(coverRel || '')
    const cheminVisuel = coverParArticle ? `/conseils/${slug}/corps-1.jpg` : `/conseils/${slug}-1.jpg`
    await ecrireJpeg(octets, path.join(PUBLIC, cheminVisuel.replace(/^\//, '')))

    const alt = cible.titre.replace(/"/g, '')
    body = insererVisuel(body, cible.index, `![${alt}](${cheminVisuel})`)
    fs.writeFileSync(articlePath, frontmatterBrut + body)
    console.log(`  visuel inséré après la section « ${cible.titre} »`)
  }

  console.log('Visuels de l\'article prêts.')
}

main().catch((err) => {
  console.error(`\nÉCHEC de la génération des visuels : ${err.message}`)
  console.error('Publication annulée : rien ne sera committé, le brouillon repartira au prochain passage.')
  process.exit(1)
})
