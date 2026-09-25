/**
 * lib/content.ts, Loaders `content/` (fs + typage) pour le SSG.
 *
 * Tout est lu au BUILD (Server Components / generateStaticParams) → zéro runtime.
 * Sources : content/services/*.json, content/zones/*.json, content/conseils/*.mdx.
 *
 * ⚠️ Les TEXTES définitifs (h1, meta, blocs, faq) viennent du SEO (ST-2) puis du
 * Rédacteur (ST-5). Ici on ne définit que la STRUCTURE + des placeholders.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

/* ───────────────────────────── Types ───────────────────────────── */

export interface FaqItem {
  q: string
  a: string
}

/** Image de corps d'un bloc (contrat du 25/09/2026). */
export interface BlockImage {
  src: string
  alt: string
  caption?: string
  /** Cadrage (object-position) quand le sujet n'est pas au centre de la photo. */
  position?: string
}

/** Source affichée sous un chiffre, un fait ou un schéma. */
export interface SourceRef {
  nom: string
  url: string
  date: string
  /** true : la page source n'affiche pas de date, `date` est celle de notre relevé. */
  releve?: boolean
}

/**
 * Un bloc de contenu structuré (H2 + corps). Porte une image OU un schéma,
 * jamais les deux (contrat du 25/09/2026). L'ancienne forme (`image` en chaîne
 * + `imageAlt` / `imageCaption`) reste lue pour ne rien casser.
 */
export interface ContentBlock {
  heading: string
  body: string
  image?: BlockImage | string
  imageAlt?: string
  imageCaption?: string
  /** Identifiant d'un schéma de `content/schemas.json` (ex. `tva-taux`). */
  schema?: string
}

/** Fait local sourcé d'une commune (encadré « Repère local »). */
export interface FaitLocal {
  texte: string
  source: SourceRef
}

export interface Service {
  slug: string
  /** Intitulé court (nav / carte). */
  navTitle: string
  h1: string
  metaTitle: string
  metaDescription: string
  /** Icône logique (mappée côté UI par ST-3). */
  icon: string
  /** Réponse courte GEO « En bref ». */
  intro: string
  /** Puces de la carte service. */
  bullets: string[]
  /** Corps structuré (H2). Placeholders jusqu'à ST-5. */
  blocks: ContentBlock[]
  faq: FaqItem[]
  /** Maillage interne → slugs de services liés. */
  relatedServices: string[]
  /** Ordre d'affichage dans la grille d'accueil. */
  order: number
  /** Image hero de la page service (chemin public). */
  image?: string
  /** Identifiants de lignes de `content/tarifs.json` (bloc « Prix indicatifs »). */
  prix?: string[]
}

export interface Zone {
  slug: string
  name: string
  postalCode: string
  /** Phrase de contexte courte (carte du hub /zones). Optionnel. */
  context?: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  blocks: ContentBlock[]
  /** Communes proches DU SITE (noms), rendues en liens vers leurs pages. */
  neighbours: string[]
  faq: FaqItem[]
  /** Identifiants de lignes de `content/tarifs.json` (bloc « Prix indicatifs »). */
  prix?: string[]
  /** Fait local sourcé (encadré « Repère local »). */
  fait?: FaitLocal
}

export interface Article {
  slug: string
  title: string
  /** Title servi à Google (60 car. max) ; repli sur `title`. */
  seoTitle?: string
  description: string
  date: string
  category: string
  cover?: string
  /** Description de la couverture (frontmatter `coverAlt`). */
  coverAlt?: string
  /** Maillage interne automatique → slugs de services. */
  relatedServices: string[]
  /** FAQ de l'article (frontmatter `faq:`), affichée + FAQPage JSON-LD (GEO). */
  faq: FaqItem[]
  /** Corps MDX brut (compilé côté page). */
  content: string
}

/* ─────────────────────── Helpers fs + validation ─────────────────────── */

function readJsonDir<T>(dir: string, required: (keyof T)[]): T[] {
  const full = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), 'utf8')
      let data: T
      try {
        data = JSON.parse(raw)
      } catch (e) {
        throw new Error(`content/${dir}/${f} : JSON invalide, ${(e as Error).message}`)
      }
      for (const key of required) {
        if (data[key] === undefined || data[key] === null) {
          throw new Error(`content/${dir}/${f} : champ requis manquant « ${String(key)} »`)
        }
      }
      return data
    })
}

/* ───────────────────────────── Services ───────────────────────────── */

export function getServices(): Service[] {
  const items = readJsonDir<Service>('services', [
    'slug', 'navTitle', 'h1', 'metaTitle', 'metaDescription',
  ])
  return items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

export function getService(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug)
}

/* ───────────────────────────── Zones ───────────────────────────── */

export function getZones(): Zone[] {
  return readJsonDir<Zone>('zones', [
    'slug', 'name', 'postalCode', 'metaTitle', 'metaDescription',
  ]).sort((a, b) => a.name.localeCompare(b.name, 'fr'))
}

export function getZone(slug: string): Zone | undefined {
  return getZones().find((z) => z.slug === slug)
}

/* ───────────────────── Visuels de corps des blocs ───────────────────── */

/** Vrai si le fichier public existe sur disque (les photos arrivent après les textes). */
export function publicFileExists(src: string | undefined): boolean {
  if (!src || !src.startsWith('/')) return false
  return fs.existsSync(path.join(process.cwd(), 'public', src))
}

/**
 * Image d'un bloc, normalisée, SEULEMENT si le fichier existe : tant que l'image
 * n'est pas produite, le bloc se rend sans visuel plutôt qu'avec une image cassée.
 */
export function resolveBlockImage(block: ContentBlock): BlockImage | undefined {
  const img: BlockImage | undefined =
    typeof block.image === 'string'
      ? { src: block.image, alt: block.imageAlt || block.heading, caption: block.imageCaption }
      : block.image
  if (!img || !publicFileExists(img.src)) return undefined
  return { ...img, alt: img.alt || block.heading }
}

/* ───────────────────────────── Tarifs ───────────────────────────── */

export interface TarifLigne {
  id: string
  poste: string
  prix: string
  unite?: string
  note?: string
  source: SourceRef
}

export interface TarifGroupe {
  titre: string
  lignes: TarifLigne[]
}

export interface CasConcret {
  titre: string
  situation: string
  /** Paires [poste, montant]. */
  lignes: [string, string][]
  total: string
}

export interface Tarifs {
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  miseAJour: string
  cover?: BlockImage
  groupes: TarifGroupe[]
  blocks: ContentBlock[]
  cas: CasConcret[]
  faq: FaqItem[]
}

function readJsonFile<T>(file: string): T | undefined {
  const full = path.join(CONTENT_DIR, file)
  if (!fs.existsSync(full)) return undefined
  try {
    return JSON.parse(fs.readFileSync(full, 'utf8')) as T
  } catch (e) {
    throw new Error(`content/${file} : JSON invalide, ${(e as Error).message}`)
  }
}

export function getTarifs(): Tarifs | undefined {
  const t = readJsonFile<Tarifs>('tarifs.json')
  if (!t) return undefined
  return {
    ...t,
    groupes: t.groupes || [],
    blocks: t.blocks || [],
    cas: t.cas || [],
    faq: t.faq || [],
  }
}

/** Lignes de tarifs.json dans l'ordre des identifiants demandés (inconnus ignorés). */
export function getTarifLignes(ids: string[] | undefined): TarifLigne[] {
  if (!ids?.length) return []
  const all = (getTarifs()?.groupes || []).flatMap((g) => g.lignes)
  return ids
    .map((id) => all.find((l) => l.id === id))
    .filter((l): l is TarifLigne => Boolean(l))
}

/* ───────────────────────────── Schémas ───────────────────────────── */

export interface SchemaEtape {
  titre: string
  texte: string
}

export interface SchemasData {
  'arbre-panne'?: {
    titre: string
    branches: { symptome: string; cause: string; prestation: string }[]
    source?: SourceRef
  }
  'deroule-urgence'?: { titre: string; etapes: SchemaEtape[]; source?: SourceRef }
  'entretien-obligation'?: {
    titre: string
    points: { titre: string; texte: string }[]
    source?: SourceRef
  }
  'tva-taux'?: {
    titre: string
    lignes: { taux: string; cas: string }[]
    source?: SourceRef
  }
  'desembouage-etapes'?: { titre: string; etapes: SchemaEtape[]; source?: SourceRef }
  monoxyde?: { titre: string; chiffre: string; texte: string; source?: SourceRef }
  'carte-communes'?: { titre: string; source?: SourceRef }
  [id: string]: unknown
}

export function getSchemas(): SchemasData {
  return readJsonFile<SchemasData>('schemas.json') || {}
}

/* ───────────────────── Positions des communes (carte) ───────────────────── */

export interface CommuneGeo {
  slug: string
  nom: string
  insee: string
  codePostal: string
  lon: number
  lat: number
}

export interface CommunesGeo {
  source: SourceRef
  centre: CommuneGeo
  communes: CommuneGeo[]
}

export function getCommunesGeo(): CommunesGeo | undefined {
  return readJsonFile<CommunesGeo>('communes-geo.json')
}

/* ───────────────────────── Conseils (MDX) ───────────────────────── */

/**
 * Un article peut déclarer un `cover:` dont le fichier n'a pas encore été produit
 * (l'Autoblog écrit les textes, les visuels arrivent ensuite). On vérifie donc au
 * build que l'image existe vraiment : sinon la carte et l'en-tête d'article
 * s'affichent proprement sans visuel, au lieu d'une image cassée.
 */
function coverIfExists(cover: unknown): string | undefined {
  if (typeof cover !== 'string' || !cover.startsWith('/')) return undefined
  return fs.existsSync(path.join(process.cwd(), 'public', cover)) ? cover : undefined
}

export function getArticles(): Article[] {
  const dir = path.join(CONTENT_DIR, 'conseils')
  if (!fs.existsSync(dir)) return []
  const articles = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug: (data.slug as string) || f.replace(/\.mdx$/, ''),
        title: (data.title as string) || '',
        seoTitle: (data.seoTitle as string) || undefined,
        description: (data.description as string) || '',
        date: (data.date as string) || '1970-01-01',
        category: (data.category as string) || 'Conseils',
        cover: coverIfExists(data.cover),
        coverAlt: (data.coverAlt as string) || undefined,
        relatedServices: (data.relatedServices as string[]) || [],
        faq: (data.faq as FaqItem[]) || [],
        content,
      } satisfies Article
    })
  // Tri antéchronologique (le plus récent d'abord).
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug)
}

/** Derniers articles d'un cluster (maillage service ⇄ blog). */
export function getRelatedArticles(serviceSlug: string, limit = 2): Article[] {
  return getArticles()
    .filter((a) => a.relatedServices.includes(serviceSlug))
    .slice(0, limit)
}

/**
 * « À lire aussi » : autres articles proches du courant. Score = services liés
 * en commun (poids 2) + même catégorie (poids 1) ; complété par les plus récents
 * si le quota n'est pas atteint. Exclut l'article courant.
 */
export function getRelatedConseils(current: Article, limit = 3): Article[] {
  const others = getArticles().filter((a) => a.slug !== current.slug)
  const scored = others
    .map((a) => {
      const shared = a.relatedServices.filter((s) => current.relatedServices.includes(s)).length
      const sameCat = a.category === current.category ? 1 : 0
      return { a, score: shared * 2 + sameCat }
    })
    .sort((x, y) => y.score - x.score) // tri stable : conserve l'ordre antéchronologique à score égal

  const picked = scored.filter((s) => s.score > 0).map((s) => s.a)
  if (picked.length < limit) {
    for (const s of scored) {
      if (!picked.includes(s.a)) picked.push(s.a)
      if (picked.length >= limit) break
    }
  }
  return picked.slice(0, limit)
}

/** Temps de lecture estimé (minutes), ~200 mots/min. Minimum 1 min. */
export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
