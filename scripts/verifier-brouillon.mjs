/**
 * verifier-brouillon.mjs — refuse un brouillon qui ne respecte pas les règles du blog
 * (Articles à 7 par semaine, Rémy 05/11/2026, repris de sos-electricien-dijon.fr).
 *
 * Règles : title servi (seoTitle, sinon title) de 30 à 60 caractères, description de 120 à 160,
 * FAQ de 3 questions au moins, 600 mots au moins dans le corps, aucun tiret long, jamais
 * « met en relation », et aucune image déjà posée pour ce brouillon (les visuels naissent le
 * jour de la publication, règle du 04/11/2026).
 *
 * Utilisé par publish-next-draft.mjs avant chaque publication, et en ligne de commande :
 *   node scripts/verifier-brouillon.mjs content/drafts/*.mdx
 * CODE 0 + « OK : N brouillon(s) conformes » si tout passe, CODE 1 sinon.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const PUBLIC_CONSEILS = path.join(process.cwd(), 'public', 'conseils')

/** Images déjà présentes pour ce brouillon (couverture, visuel de corps, dossier d'assets). */
function imagesDejaPresentes(fichier) {
  const base = path.basename(fichier, '.mdx')
  const slug = base.replace(/^\d+[-_]/, '')
  const trouvees = []
  if (fs.existsSync(PUBLIC_CONSEILS)) {
    for (const f of fs.readdirSync(PUBLIC_CONSEILS)) {
      if (f === slug || new RegExp(`^${slug}(-\\d+)?\\.(jpe?g|png|webp|avif)$`).test(f)) trouvees.push(`public/conseils/${f}`)
    }
  }
  const assets = path.join(path.dirname(fichier), `${base}.assets`)
  if (fs.existsSync(assets)) trouvees.push(path.relative(process.cwd(), assets))
  return trouvees
}

/** Renvoie la liste des défauts du brouillon (vide = conforme). */
export function verifierBrouillon(raw, fichier) {
  const defauts = []
  let parsed
  try {
    parsed = matter(raw)
  } catch (e) {
    return [`frontmatter illisible (${e.message})`]
  }
  const data = parsed.data
  const servi = String(data.seoTitle || data.title || '').trim()
  if (servi.length < 30 || servi.length > 60) defauts.push(`title servi de ${servi.length} caractères (30 à 60) : « ${servi} »`)
  const desc = String(data.description || '').trim()
  if (desc.length < 120 || desc.length > 160) defauts.push(`description de ${desc.length} caractères (120 à 160)`)
  const faq = Array.isArray(data.faq) ? data.faq.filter((f) => f && f.q && f.a) : []
  if (faq.length < 3) defauts.push(`FAQ de ${faq.length} question(s) (3 au moins)`)
  const mots = parsed.content.replace(/[#*|>_`\-\[\]()]/g, ' ').split(/\s+/).filter((m) => /[\p{L}\d]/u.test(m)).length
  if (mots < 600) defauts.push(`corps de ${mots} mots (600 au moins)`)
  if (raw.includes('—')) defauts.push('tiret long « — » présent')
  if (/met(tons|tent)? en relation/i.test(raw)) defauts.push('« met en relation » présent')
  if (fichier) {
    const images = imagesDejaPresentes(fichier)
    if (images.length) defauts.push(`image déjà présente avant publication (${images.join(', ')})`)
  }
  return defauts
}

// Ligne de commande.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const fichiers = process.argv.slice(2).filter((f) => f.endsWith('.mdx'))
  let ko = 0
  for (const f of fichiers) {
    const defauts = verifierBrouillon(fs.readFileSync(f, 'utf8'), f)
    if (defauts.length) {
      ko++
      console.log(`REFUSÉ ${path.basename(f)} : ${defauts.join(' ; ')}`)
    }
  }
  if (ko) {
    console.log(`ECHEC : ${ko} brouillon(s) sur ${fichiers.length} hors règles`)
    process.exit(1)
  }
  console.log(`OK : ${fichiers.length} brouillon(s) conformes`)
}
