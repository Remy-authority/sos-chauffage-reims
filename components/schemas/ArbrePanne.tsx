import schemas from '@/content/schemas.json'
import { getServices } from '@/lib/content'
import { SchemaFrame } from '@/components/schemas/SchemaFrame'

/**
 * Schéma « arbre de panne » : AIDE À CHOISIR. Pour chaque symptôme constaté, la
 * piste la plus probable, puis un lien direct vers la prestation qui la traite.
 *
 * Données : `content/schemas.json`, clé `arbre-panne`
 *   { titre, branches: [{ symptome, cause, prestation (slug) }] }
 *
 * Dessin en SVG (reconnu comme schéma par audit-design.mjs), en deux mises en page :
 *  - ordinateur : trois colonnes reliées par des flèches, les branches partent
 *    d'un tronc commun « Votre panne » ;
 *  - téléphone : un tronc vertical, chaque branche empile symptôme, flèche,
 *    origine et lien, pour rester lisible à 390 px sans défilement horizontal.
 * Le texte est coupé en lignes au rendu serveur (SVG ne passe pas à la ligne seul).
 */

type Branche = { symptome: string; cause: string; prestation: string }
type ArbreData = { titre?: string; branches?: Branche[] }

/** Coupe un texte en lignes d'au plus `max` caractères, sans couper les mots. */
function couper(texte: string, max: number): string[] {
  const lignes: string[] = []
  let courante = ''
  for (const mot of texte.split(/\s+/).filter(Boolean)) {
    if (!courante) courante = mot
    else if ((courante + ' ' + mot).length <= max) courante += ' ' + mot
    else {
      lignes.push(courante)
      courante = mot
    }
  }
  if (courante) lignes.push(courante)
  return lignes
}

export function ArbrePanne() {
  const data = (schemas as Record<string, unknown>)['arbre-panne'] as ArbreData | undefined
  const services = new Map(getServices().map((s) => [s.slug, s.navTitle]))
  const branches = (data?.branches ?? []).filter(
    (b) => b.symptome && b.cause && services.has(b.prestation),
  )
  if (!branches.length) return null

  /* ── Ordinateur : 3 colonnes ─────────────────────────────────────────── */
  const W = 1120
  const ROOT = { x: 0, w: 140 }
  const SYM = { x: 190, w: 340, max: 34, lh: 21 }
  const CAU = { x: 590, w: 300, max: 34, lh: 20 }
  const PRE = { x: 950, w: 170, max: 19, lh: 18 }
  const HEAD = 44
  const GAP = 14
  const PAD = 17

  let y = HEAD
  const rangs = branches.map((b) => {
    const s = couper(b.symptome, SYM.max)
    const c = couper(b.cause, CAU.max)
    const p = couper(services.get(b.prestation) || '', PRE.max)
    const h = Math.max(
      62,
      s.length * SYM.lh + PAD * 2,
      c.length * CAU.lh + PAD * 2,
      p.length * PRE.lh + PAD * 2,
    )
    const rang = { b, s, c, p, y, h, cy: y + h / 2 }
    y += h + GAP
    return rang
  })
  const H = y - GAP
  const rootCy = (rangs[0].cy + rangs[rangs.length - 1].cy) / 2

  /* ── Téléphone : pile verticale ──────────────────────────────────────── */
  // viewBox proche de la largeur réelle (≈ 300 px à 390 px d'écran) : le texte
  // s'affiche à sa taille nominale, sans réduction.
  const MW = 300
  const MX = 24 // début des cartes, à droite du tronc
  const MCW = MW - MX
  let my = 0
  const piles = branches.map((b) => {
    const s = couper(b.symptome, 28)
    const c = couper(b.cause, 33)
    const p = couper(`${services.get(b.prestation) || ''} →`, 33)
    const hs = s.length * 20 + 26
    const hc = c.length * 19 + 18 + p.length * 19 + 22
    const pile = { b, s, c, p, y: my, hs, hc, fleche: 22 }
    my += hs + 22 + hc + 22
    return pile
  })
  const MH = my - 22

  const titre = data?.titre && data.titre !== 'SQUELETTE' ? data.titre : undefined

  return (
    <SchemaFrame id="arbre-panne" titre={titre}>
      {/* Ordinateur */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="hidden h-auto w-full lg:block"
        role="group"
        aria-label={titre || 'Du symptôme à la prestation'}
      >
        <defs>
          <marker id="arbre-fleche" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" className="fill-braise-500" />
          </marker>
        </defs>

        {/* En-têtes de colonnes */}
        <text x={SYM.x} y={18} className="fill-braise-600 text-[12px] font-semibold uppercase tracking-[0.16em]">
          Ce que vous constatez
        </text>
        <text x={CAU.x} y={18} className="fill-braise-600 text-[12px] font-semibold uppercase tracking-[0.16em]">
          D&apos;où ça vient, le plus souvent
        </text>
        <text x={PRE.x} y={18} className="fill-braise-600 text-[12px] font-semibold uppercase tracking-[0.16em]">
          Notre prestation
        </text>

        {/* Tronc commun */}
        <rect x={ROOT.x} y={rootCy - 34} width={ROOT.w} height={68} rx={34} className="fill-fonte-950" />
        <text x={ROOT.x + ROOT.w / 2} y={rootCy + 5} textAnchor="middle" className="fill-craie-50 font-display text-[16px] font-medium">
          Votre panne
        </text>

        {rangs.map((r) => (
          <g key={r.b.symptome}>
            {/* Branche depuis le tronc */}
            <path
              d={`M${ROOT.x + ROOT.w} ${rootCy} C ${ROOT.x + ROOT.w + 30} ${rootCy}, ${SYM.x - 30} ${r.cy}, ${SYM.x} ${r.cy}`}
              className="fill-none stroke-craie-300"
              strokeWidth={1.5}
            />

            {/* Symptôme */}
            <rect x={SYM.x} y={r.y} width={SYM.w} height={r.h} rx={16} className="fill-craie-100 stroke-craie-200" />
            <text className="fill-fonte-950 text-[16px] font-semibold">
              {r.s.map((l, i) => (
                <tspan key={i} x={SYM.x + 18} y={r.cy - ((r.s.length - 1) * SYM.lh) / 2 + 5.5 + i * SYM.lh}>
                  {l}
                </tspan>
              ))}
            </text>

            <line x1={SYM.x + SYM.w + 6} y1={r.cy} x2={CAU.x - 8} y2={r.cy} className="stroke-braise-500" strokeWidth={1.8} markerEnd="url(#arbre-fleche)" />

            {/* Origine probable */}
            <rect x={CAU.x} y={r.y} width={CAU.w} height={r.h} rx={16} className="fill-white stroke-craie-200" />
            <text className="fill-craie-700 text-[14.5px]">
              {r.c.map((l, i) => (
                <tspan key={i} x={CAU.x + 18} y={r.cy - ((r.c.length - 1) * CAU.lh) / 2 + 5 + i * CAU.lh}>
                  {l}
                </tspan>
              ))}
            </text>

            <line x1={CAU.x + CAU.w + 6} y1={r.cy} x2={PRE.x - 8} y2={r.cy} className="stroke-braise-500" strokeWidth={1.8} markerEnd="url(#arbre-fleche)" />

            {/* Prestation, cliquable */}
            <a href={`/services/${r.b.prestation}`} className="group">
              <rect x={PRE.x} y={r.y} width={PRE.w} height={r.h} rx={16} className="fill-flamme-600/10 stroke-flamme-600/30 transition-colors group-hover:fill-flamme-600/20" />
              <text className="fill-flamme-700 text-[14px] font-semibold">
                {r.p.map((l, i) => (
                  <tspan key={i} x={PRE.x + 16} y={r.cy - ((r.p.length - 1) * PRE.lh) / 2 + 5 + i * PRE.lh}>
                    {l}
                  </tspan>
                ))}
              </text>
            </a>
          </g>
        ))}
      </svg>

      {/* Téléphone et tablette */}
      <svg
        viewBox={`0 0 ${MW} ${MH}`}
        className="mx-auto block h-auto w-full max-w-sm lg:hidden"
        role="group"
        aria-label={titre || 'Du symptôme à la prestation'}
      >
        <defs>
          <marker id="arbre-fleche-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" className="fill-braise-500" />
          </marker>
        </defs>

        {/* Tronc vertical */}
        <line x1={8} y1={piles[0].y + piles[0].hs / 2} x2={8} y2={piles[piles.length - 1].y + piles[piles.length - 1].hs / 2} className="stroke-craie-300" strokeWidth={2} />

        {piles.map((p) => {
          const ys = p.y
          const yc = p.y + p.hs + p.fleche
          return (
            <g key={p.b.symptome}>
              <circle cx={8} cy={ys + p.hs / 2} r={5} className="fill-braise-500" />
              <line x1={13} y1={ys + p.hs / 2} x2={MX} y2={ys + p.hs / 2} className="stroke-craie-300" strokeWidth={2} />

              <rect x={MX} y={ys} width={MCW} height={p.hs} rx={14} className="fill-craie-100 stroke-craie-200" />
              <text textAnchor="middle" className="fill-fonte-950 text-[15px] font-semibold">
                {p.s.map((l, i) => (
                  <tspan key={i} x={MX + MCW / 2} y={ys + 18 + 5 + i * 20}>
                    {l}
                  </tspan>
                ))}
              </text>

              <line x1={MX + MCW / 2} y1={ys + p.hs + 3} x2={MX + MCW / 2} y2={yc - 5} className="stroke-braise-500" strokeWidth={1.8} markerEnd="url(#arbre-fleche-m)" />

              <rect x={MX} y={yc} width={MCW} height={p.hc} rx={14} className="fill-white stroke-craie-200" />
              <text textAnchor="middle" className="fill-craie-700 text-[14px]">
                {p.c.map((l, i) => (
                  <tspan key={i} x={MX + MCW / 2} y={yc + 22 + i * 19}>
                    {l}
                  </tspan>
                ))}
              </text>
              <a href={`/services/${p.b.prestation}`}>
                <text textAnchor="middle" className="fill-flamme-700 text-[14px] font-semibold">
                  {p.p.map((l, i) => (
                    <tspan key={i} x={MX + MCW / 2} y={yc + 22 + p.c.length * 19 + 8 + i * 19}>
                      {l}
                    </tspan>
                  ))}
                </text>
              </a>
            </g>
          )
        })}
      </svg>
    </SchemaFrame>
  )
}
