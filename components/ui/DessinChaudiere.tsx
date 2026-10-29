import type { CSSProperties, ReactNode, Ref } from 'react'

/**
 * DessinChaudiere, le dessin du bloc 1 « le balayage » (scénario validé par Rémy le 29/10/2026,
 * « ok go vas y ») : posé AU PIXEL sur la photo de la chaudière (même calque), il remplace le capot
 * blanc derrière la ligne jaune miel qui traverse l'écran. Le capot s'efface sur place et montre
 * l'intérieur ; le dépannage s'y joue en cinq étapes :
 *   k 0 → 1  le code de panne lu (l'écran clignote, la carte s'allume)
 *   k 1 → 2  la pression remise (l'aiguille du manomètre remonte, le vase d'expansion contrôlé)
 *   k 2 → 3  le brûleur rallumé (les flammes bleues, le ventilateur tourne)
 *   k 3 → 4  la pièce en cause remplacée (le circulateur usé sort, le neuf entre)
 *   k 4 → 5  la remise en chauffe (l'eau chaude part vers les radiateurs, l'écran dit OK)
 * Coordonnées en pixels du fichier photo (mesurées le 29/10/2026) ; l'intérieur est placé en
 * fractions de la largeur (w) et de la hauteur du capot au-dessus du panneau de commande (hu).
 */
export type GeoChaudiere = {
  /** Taille du fichier photo. */
  L: number
  H: number
  /** Capot de la chaudière : bords gauche, haut, droit, bas ; haut du panneau de commande. */
  x0: number
  y0: number
  x1: number
  y1: number
  yP: number
  /** Écran du panneau de commande. */
  ecr: { x: number; y: number; l: number; h: number }
  /** Manomètre : centre et rayon. */
  mano: { x: number; y: number; r: number }
  /** Abscisses des cinq tuyaux sous la chaudière, de gauche à droite. */
  tuyaux: number[]
  /** Unité de trait (1 px d'écran environ). */
  u: number
  /** Étiquettes des pièces (ordinateur) : taille du texte ; au téléphone, aucune (la carte nomme la pièce). */
  etqT: number
  court: boolean
}

export const MIEL = '#FCD680'
const CUIVRE = '#C9844A'
const CHAUD = '#F08A3C'
const FROID = '#5DB0E8'

/** Les pièces, en pixels du fichier. */
const pieces = (g: GeoChaudiere) => {
  const w = g.x1 - g.x0
  const hu = g.yP - g.y0
  const X = (f: number) => g.x0 + f * w
  const Y = (f: number) => g.y0 + f * hu
  const circ = { x: X(0.7), y: Y(0.75), r: w * 0.075 }
  return {
    w,
    hu,
    X,
    Y,
    ventilo: { x: X(0.5), y: Y(0.075), r: w * 0.06 },
    ech: { x: X(0.28), y: Y(0.16), l: w * 0.44, h: hu * 0.4 },
    bruleur: { x: X(0.37), y: Y(0.345), l: w * 0.26, h: hu * 0.022 },
    vase: { x: X(0.06), y: Y(0.14), l: w * 0.16, h: hu * 0.44 },
    circ,
    carte: { x: X(0.4), y: Y(0.84), l: w * 0.22, h: hu * 0.13 },
    // Départ (eau chaude vers les radiateurs) et retour (eau refroidie qui revient).
    depart: `M${X(0.36)} ${Y(0.56)}V${Y(0.9)}H${g.tuyaux[0]}V${g.y1}`,
    retour: `M${g.tuyaux[4]} ${g.y1}V${g.y1 - (g.y1 - g.y0) * 0.015}H${circ.x}V${circ.y + circ.r}M${circ.x} ${circ.y - circ.r}V${Y(0.56)}`,
    departDehors: `M${g.tuyaux[0]} ${g.y1}V${g.H}`,
    retourDehors: `M${g.tuyaux[4]} ${g.H}V${g.y1}`,
  }
}

/** Point sur le cadran du manomètre, angle en degrés depuis midi, sens horaire. */
const polaire = (cx: number, cy: number, r: number, a: number) => {
  const t = ((a - 90) * Math.PI) / 180
  return [cx + r * Math.cos(t), cy + r * Math.sin(t)] as const
}
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const [xa, ya] = polaire(cx, cy, r, a0)
  const [xb, yb] = polaire(cx, cy, r, a1)
  return `M${xa} ${ya}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${xb} ${yb}`
}
/** Aiguille : basse (manque d'eau) au début, dans la zone verte une fois la pression remise. */
const AIGUILLE_BASSE = -118
const AIGUILLE_BONNE = -12

function Circulateur({ x, y, r, u, neuf }: { x: number; y: number; r: number; u: number; neuf: boolean }) {
  return (
    <g>
      <rect x={x - r * 1.5} y={y - r * 0.32} width={r * 3} height={r * 0.64} fill={neuf ? '#3D7FB8' : '#5E5650'} />
      <circle cx={x} cy={y} r={r} fill={neuf ? '#2F6A9E' : '#4A433E'} stroke={neuf ? MIEL : '#2B2522'} strokeWidth={u * 2} />
      <circle cx={x} cy={y} r={r * 0.42} fill={neuf ? '#9CC7EA' : '#7A706A'} />
      {!neuf && <circle cx={x + r * 0.7} cy={y - r * 0.7} r={r * 0.22} fill="#E0452F" />}
    </g>
  )
}

export function DessinChaudiere({
  g,
  id,
  svgRef,
  className,
  viewBox,
  style,
}: {
  g: GeoChaudiere
  id: string
  svgRef?: Ref<SVGSVGElement>
  className?: string
  viewBox?: string
  style?: CSSProperties
}) {
  const { x0, y0, x1, y1, u, L, H } = g
  const p = pieces(g)
  const { ech, bruleur: b, vase, circ, carte, ventilo: v } = p
  const ecr = g.ecr
  const m = g.mano
  const capot = `M${x0} ${y0}H${x1}V${y1}H${x0}Z`
  // Spires de l'échangeur (cuivre), derrière la chambre de combustion.
  const spires = Array.from({ length: 8 }, (_, i) => ech.y + ech.h * (0.1 + i * 0.115))
  const flammes = Array.from({ length: 6 }, (_, i) => b.x + b.l * (0.09 + i * 0.164))
  const fh = p.hu * 0.075
  const etq = (xa: number, ya: number, t: string, cle: string, gauche = false) => {
    const xl = gauche ? x0 - u * 46 : x1 + u * 46
    return (
      <g data-c={cle} fill={MIEL} stroke={MIEL} opacity={0}>
        <path d={`M${xa} ${ya}H${xl}`} strokeOpacity={0.8} strokeWidth={u * 1.2} fill="none" />
        <circle cx={xa} cy={ya} r={u * 3} stroke="none" />
        <text
          x={gauche ? xl - u * 8 : xl + u * 8}
          y={ya + g.etqT * 0.36}
          stroke="none"
          fontSize={g.etqT}
          fontWeight={700}
          letterSpacing={g.etqT * 0.1}
          textAnchor={gauche ? 'end' : 'start'}
          style={{ fontFamily: 'var(--font-inter)', textTransform: 'uppercase' }}
        >
          {t}
        </text>
      </g>
    )
  }
  const halo = (cle: string, forme: ReactNode) => (
    <g data-c={cle} opacity={0} fill="none" stroke={MIEL}>
      {forme}
    </g>
  )
  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={className}
      viewBox={viewBox ?? `0 0 ${L} ${H}`}
      style={{ overflow: 'visible', ...style }}
      fill="none"
    >
      <defs>
        <clipPath id={`${id}-balai`}>
          <rect data-c="balai" x={L * 2} y={-H} width={L * 3} height={H * 3} />
        </clipPath>
        <radialGradient id={`${id}-flamme`} cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor="#E9F6FF" />
          <stop offset="45%" stopColor="#7CC0EC" />
          <stop offset="100%" stopColor="#1B76BC" stopOpacity={0.15} />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${id}-balai)`}>
        {/* Derrière la ligne : la pièce s'assombrit autour de la chaudière, l'œil va dedans. */}
        <path d={`M${-L} ${-H}H${2 * L}V${2 * H}H${-L}Z${capot}`} fillRule="evenodd" fill="#120C0A" fillOpacity={0.5} />

        {/* Le capot s'efface : l'intérieur, sombre, contour miel. */}
        <path d={capot} fill="#1C1513" />
        <path d={`M${x0} ${g.yP}H${x1}`} stroke="#fff" strokeOpacity={0.18} strokeWidth={u * 1.2} strokeDasharray={`${u * 6} ${u * 5}`} />

        {/* Ventilateur et conduit de fumée. */}
        <path d={`M${v.x - v.r * 0.55} ${y0}V${v.y}M${v.x + v.r * 0.55} ${y0}V${v.y}`} stroke="#6D615A" strokeWidth={u * 2} />
        <circle cx={v.x} cy={v.y} r={v.r} fill="#2E2522" stroke="#8C7B70" strokeWidth={u * 1.6} />
        <g data-c="ventilo">
          {[0, 120, 240].map((a) => (
            <path
              key={a}
              d={`M${v.x} ${v.y}Q${v.x + v.r * 0.55} ${v.y - v.r * 0.35} ${v.x + v.r * 0.82} ${v.y}Q${v.x + v.r * 0.4} ${v.y + v.r * 0.12} ${v.x} ${v.y}Z`}
              fill="#A89A90"
              transform={`rotate(${a} ${v.x} ${v.y})`}
            />
          ))}
          <circle cx={v.x} cy={v.y} r={v.r * 0.14} fill="#E5DDD6" />
        </g>
        <path d={`M${v.x} ${v.y + v.r}V${ech.y}`} stroke="#6D615A" strokeWidth={u * 3} />

        {/* Échangeur : corps, spires de cuivre, chambre de combustion au milieu. */}
        <rect x={ech.x} y={ech.y} width={ech.l} height={ech.h} rx={u * 4} fill="#3A2B24" stroke={CUIVRE} strokeWidth={u * 1.8} />
        {spires.map((y) => (
          <ellipse key={y} cx={ech.x + ech.l / 2} cy={y} rx={ech.l * 0.42} ry={ech.h * 0.035} stroke={CUIVRE} strokeWidth={u * 2.2} />
        ))}
        <rect x={b.x - b.l * 0.08} y={b.y - p.hu * 0.11} width={b.l * 1.16} height={p.hu * 0.15} fill="#120C0A" />

        {/* Brûleur et ses flammes (allumées à l'étape 3). */}
        <g data-c="flammes" opacity={0}>
          {flammes.map((x) => (
            <path
              key={x}
              d={`M${x - b.l * 0.055} ${b.y}Q${x - b.l * 0.05} ${b.y - fh * 0.55} ${x} ${b.y - fh}Q${x + b.l * 0.05} ${b.y - fh * 0.55} ${x + b.l * 0.055} ${b.y}Z`}
              fill={`url(#${id}-flamme)`}
            />
          ))}
        </g>
        <rect x={b.x} y={b.y} width={b.l} height={b.h} fill="#9A938D" stroke="#C8C1BA" strokeWidth={u} />

        {/* Vase d'expansion. */}
        <rect x={vase.x} y={vase.y} width={vase.l} height={vase.h} rx={vase.l * 0.3} fill="#B23A2C" />
        <rect x={vase.x + vase.l * 0.18} y={vase.y + vase.h * 0.06} width={vase.l * 0.14} height={vase.h * 0.86} rx={vase.l * 0.07} fill="#fff" fillOpacity={0.18} />
        <path d={`M${vase.x + vase.l} ${vase.y + vase.h * 0.8}H${ech.x}`} stroke="#8C7B70" strokeWidth={u * 2} />

        {/* Tuyaux intérieurs : départ (chaud) et retour, tracés en couleur à la remise en chauffe. */}
        <path d={p.depart} stroke="#6D615A" strokeWidth={u * 4} strokeLinejoin="round" />
        <path d={p.retour} stroke="#6D615A" strokeWidth={u * 4} strokeLinejoin="round" />
        <path data-c="depart" d={p.depart} stroke={CHAUD} strokeWidth={u * 4} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} />
        <path data-c="retour" d={p.retour} stroke={FROID} strokeWidth={u * 4} strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} />

        {/* Circulateur : l'usé (point rouge), remplacé à l'étape 4 par le neuf. */}
        <g data-c="circ-vieux">
          <Circulateur x={circ.x} y={circ.y} r={circ.r} u={u} neuf={false} />
        </g>
        <g data-c="circ-neuf" opacity={0}>
          <Circulateur x={circ.x} y={circ.y} r={circ.r} u={u} neuf />
        </g>

        {/* Carte électronique, reliée à l'écran. */}
        <path d={`M${carte.x + carte.l / 2} ${carte.y + carte.h}V${ecr.y}`} stroke="#8C7B70" strokeWidth={u * 1.6} strokeDasharray={`${u * 3} ${u * 2}`} />
        <rect x={carte.x} y={carte.y} width={carte.l} height={carte.h} rx={u * 2} fill="#1E5A3C" stroke="#3E8A62" strokeWidth={u * 1.4} />
        {[0.25, 0.5, 0.75].map((f) => (
          <path key={f} d={`M${carte.x + carte.l * 0.1} ${carte.y + carte.h * f}H${carte.x + carte.l * 0.9}`} stroke="#9FD8B5" strokeOpacity={0.5} strokeWidth={u} />
        ))}
        <rect x={carte.x + carte.l * 0.36} y={carte.y + carte.h * 0.3} width={carte.l * 0.28} height={carte.h * 0.4} fill="#111" />

        {/* Écran : « ERR » qui clignote, puis « OK » à la remise en chauffe. */}
        <rect x={ecr.x} y={ecr.y} width={ecr.l} height={ecr.h} rx={u * 3} fill="#0C1712" stroke="#4A4440" strokeWidth={u * 1.6} />
        {[
          ['code-err', 'ERR', '#FF8A3D'],
          ['code-ok', 'OK', '#7CE0A0'],
        ].map(([c, t, f]) => (
          <text
            key={c}
            data-c={c}
            x={ecr.x + ecr.l / 2}
            y={ecr.y + ecr.h * 0.66}
            textAnchor="middle"
            fill={f}
            fontSize={ecr.h * 0.46}
            fontWeight={700}
            letterSpacing={ecr.h * 0.05}
            opacity={c === 'code-err' ? 1 : 0}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {t}
          </text>
        ))}

        {/* Manomètre : zone rouge (manque d'eau), zone verte, aiguille animée. */}
        <circle cx={m.x} cy={m.y} r={m.r} fill="#F4F1EC" stroke="#9A9590" strokeWidth={u * 1.4} />
        <path d={arc(m.x, m.y, m.r * 0.74, -135, -95)} stroke="#D6452F" strokeWidth={m.r * 0.16} />
        <path d={arc(m.x, m.y, m.r * 0.74, -40, 20)} stroke="#3BAA62" strokeWidth={m.r * 0.16} />
        <g data-c="aiguille" transform={`rotate(${AIGUILLE_BASSE} ${m.x} ${m.y})`}>
          <path d={`M${m.x - m.r * 0.06} ${m.y}L${m.x} ${m.y - m.r * 0.78}L${m.x + m.r * 0.06} ${m.y}Z`} fill="#1B1B1B" />
        </g>
        <circle cx={m.x} cy={m.y} r={m.r * 0.1} fill="#1B1B1B" />

        {/* La pièce de l'étape, cerclée de miel. */}
        {halo('h1', <>
          <rect x={ecr.x - u * 6} y={ecr.y - u * 6} width={ecr.l + u * 12} height={ecr.h + u * 12} rx={u * 4} strokeWidth={u * 3} />
          <rect x={carte.x - u * 6} y={carte.y - u * 6} width={carte.l + u * 12} height={carte.h + u * 12} rx={u * 4} strokeWidth={u * 3} />
        </>)}
        {halo('h2', <>
          <circle cx={m.x} cy={m.y} r={m.r + u * 7} strokeWidth={u * 3} />
          <rect x={vase.x - u * 6} y={vase.y - u * 6} width={vase.l + u * 12} height={vase.h + u * 12} rx={vase.l * 0.34} strokeWidth={u * 3} />
        </>)}
        {halo('h3', <rect x={ech.x - u * 7} y={ech.y - u * 7} width={ech.l + u * 14} height={ech.h + u * 14} rx={u * 6} strokeWidth={u * 3} />)}
        {halo('h4', <circle cx={circ.x} cy={circ.y} r={circ.r * 1.75} strokeWidth={u * 3} />)}

        {/* Contour miel du capot effacé. */}
        <path d={capot} stroke={MIEL} strokeWidth={u * 2.6} strokeLinejoin="round" />

        {/* L'eau qui circule de nouveau, dedans et dans les tuyaux sous la chaudière. */}
        <g data-c="flux" opacity={0} strokeWidth={u * 1.8} strokeLinecap="round" strokeDasharray={`${u * 6} ${u * 16}`}>
          <path d={p.depart} stroke="#FFE2C4" className="dch-flux" />
          <path d={p.retour} stroke="#DDF0FF" className="dch-flux" />
          <path d={p.departDehors} stroke={CHAUD} strokeWidth={u * 3.2} className="dch-flux" />
          <path d={p.retourDehors} stroke={FROID} strokeWidth={u * 3.2} className="dch-flux" />
        </g>

        {/* Les pièces de l'étape, nommées en miel (ordinateur ; au téléphone et à la tablette, la carte
            les nomme). Le vase d'expansion n'a pas d'étiquette : à gauche, elle passerait sous la carte. */}
        {!g.court && (
          <>
            {etq(ech.x + ech.l, ech.y + ech.h * 0.2, 'Échangeur', 'e3')}
            {etq(b.x + b.l, b.y, 'Brûleur', 'e3b')}
            {etq(circ.x + circ.r, circ.y, 'Circulateur', 'e4')}
            {etq(m.x + m.r, m.y, 'Manomètre', 'e2')}
            {etq(ecr.x, ecr.y + ecr.h / 2, 'Carte et écran', 'e1', true)}
          </>
        )}
      </g>

      {/* La ligne qui balaie l'écran : un trait miel et son halo, sur toute la hauteur. */}
      <g data-c="ligne" visibility="hidden">
        <rect x={-u * 9} y={-H} width={u * 18} height={H * 3} fill={MIEL} fillOpacity={0.22} />
        <rect x={-u * 1.5} y={-H} width={u * 3} height={H * 3} fill={MIEL} />
      </g>
    </svg>
  )
}

const lisse = (t: number) => t * t * (3 - 2 * t)
const c01 = (v: number) => Math.min(1, Math.max(0, v))
const caches = new WeakMap<SVGSVGElement, Record<string, SVGElement | null>>()
const NOMS = ['balai', 'ligne', 'ventilo', 'flammes', 'depart', 'retour', 'circ-vieux', 'circ-neuf', 'code-err', 'code-ok', 'aiguille', 'h1', 'h2', 'h3', 'h4', 'flux', 'e1', 'e2', 'e3', 'e3b', 'e4']
/** Étape de chaque cercle miel et de chaque étiquette. */
const ETAPE: Record<string, number> = { h1: 0, e1: 0, h2: 1, e2: 1, h3: 2, e3: 2, e3b: 2, h4: 3, e4: 3 }

/**
 * x : abscisse de la ligne en pixels du fichier, le dessin se voit à sa droite (−L : tout le dessin,
 * 2L : aucun) ; trait : la ligne miel est dessinée ; k : avancée du dépannage, de 0 à 5.
 */
export function animerChaudiere(svg: SVGSVGElement, x: number, trait: boolean, k: number, g: GeoChaudiere) {
  let c = caches.get(svg)
  if (!c) {
    c = {}
    for (const n of NOMS) c[n] = svg.querySelector(`[data-c="${n}"]`)
    caches.set(svg, c)
  }
  const p = pieces(g)
  c.balai?.setAttribute('x', x.toFixed(1))
  if (c.ligne) {
    c.ligne.setAttribute('visibility', trait ? 'visible' : 'hidden')
    c.ligne.setAttribute('transform', `translate(${x.toFixed(1)} 0)`)
  }
  const e = (i: number) => lisse(c01(k - i))

  // La pièce de l'étape : cercle miel qui s'allume au début de l'étape et s'éteint à la suivante.
  const actif = (i: number) => c01((k - i) * 6) * c01((i + 1 - k) * 6)
  for (const [n, i] of Object.entries(ETAPE)) {
    const el = c[n]
    if (!el) continue
    const a = actif(i)
    el.setAttribute('opacity', a.toFixed(3))
  }

  // Étape 1 : le code clignote (trois fois) ; étape 5 : il laisse place à « OK ».
  const ok = lisse(c01((k - 4.4) / 0.3))
  const clignote = k < 1 ? 0.35 + 0.65 * Math.abs(Math.cos(k * Math.PI * 3)) : 1
  c['code-err']?.setAttribute('opacity', ((1 - ok) * clignote).toFixed(3))
  c['code-ok']?.setAttribute('opacity', ok.toFixed(3))

  // Étape 2 : l'aiguille remonte dans la zone verte.
  const a = AIGUILLE_BASSE + (AIGUILLE_BONNE - AIGUILLE_BASSE) * e(1)
  c.aiguille?.setAttribute('transform', `rotate(${a.toFixed(2)} ${g.mano.x} ${g.mano.y})`)

  // Étape 3 : les flammes montent, le ventilateur tourne avec le défilement.
  const f = e(2)
  if (c.flammes) {
    c.flammes.setAttribute('opacity', f.toFixed(3))
    const by = p.Y(0.345)
    c.flammes.setAttribute('transform', `translate(0 ${by.toFixed(1)}) scale(1 ${Math.max(0.001, f).toFixed(3)}) translate(0 ${(-by).toFixed(1)})`)
  }
  const v = p.ventilo
  c.ventilo?.setAttribute('transform', `rotate(${(Math.max(0, k - 2) * 300).toFixed(1)} ${v.x} ${v.y})`)

  // Étape 4 : le circulateur usé descend et s'efface, le neuf arrive d'en haut.
  const sort = lisse(c01((k - 3) / 0.5))
  const entre = lisse(c01((k - 3.5) / 0.5))
  const d = p.hu * 0.12
  if (c['circ-vieux']) {
    c['circ-vieux'].setAttribute('opacity', (1 - sort).toFixed(3))
    c['circ-vieux'].setAttribute('transform', `translate(0 ${(sort * d).toFixed(1)})`)
  }
  if (c['circ-neuf']) {
    c['circ-neuf'].setAttribute('opacity', entre.toFixed(3))
    c['circ-neuf'].setAttribute('transform', `translate(0 ${(-(1 - entre) * d).toFixed(1)})`)
  }

  // Étape 5 : l'eau chaude part, l'eau refroidie revient, puis elle circule.
  const t = e(4)
  c.depart?.setAttribute('stroke-dashoffset', (1 - t).toFixed(4))
  c.retour?.setAttribute('stroke-dashoffset', (1 - t).toFixed(4))
  c.flux?.setAttribute('opacity', k >= 4.95 ? '0.9' : '0')
}
