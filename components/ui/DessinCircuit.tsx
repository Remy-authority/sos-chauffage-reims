import type { Ref } from 'react'

/**
 * DessinCircuit, dessin du bloc 3 « le circuit » (mise à jour du 29/10/2026, scénario validé par
 * Rémy) : une maison de deux niveaux en coupe, en couleur, CADRE FIXE. La chaudière tourne mais
 * les radiateurs restent froids ; l'air est purgé en haut, la boue chassée en bas par la pompe de
 * désembouage, la pression refaite, puis l'eau chaude repart et les radiateurs chauffent UN À UN,
 * chaque pièce passant du bleu froid au chaud.
 *
 * Autre mécanique que le bloc 1 (photo balayée) : rien ne se dévoile, les objets changent d'état
 * dans un décor fixe, et un médaillon grossit le détail de l'étape (purgeur, boue, manomètre),
 * relié à sa pièce par un filet jaune miel cerné d'encre. Un seul médaillon à la fois (leçon du
 * Val de Loire : jamais une forêt d'étiquettes).
 */
export type FormatCircuit = 'ordi' | 'mobile'

const MIEL = '#FCD680'
const ENCRE = '#1E1714'
const FROID = '#A9BCCB'
const CHAUD = '#E8692C'
const RETOUR = '#5DA2D6'
const CUIVRE = '#B98761'
const BOUE = '#6E4A2C'
const PIECE_FROIDE = '#E2EAF0'
const PIECE_CHAUDE = '#F7DDBC'

type Rad = { x: number; y: number; w: number; h: number; seche?: boolean; defaut?: 'air' | 'boue' }
type Rect = { x: number; y: number; w: number; h: number }
type Geo = {
  W: number; H: number; sol: number
  maison: { x0: number; x1: number; toit: number; faite: [number, number]; ep: number; dalle: [number, number] }
  murs: { x: number; y0: number; y1: number }[]
  pieces: (Rect & { rads: number[] })[]
  fenetres: Rect[]
  rads: Rad[]
  chaudiere: Rect & { dep: number; ret: number }
  tuyaux: { sol: [number, number]; etage: [number, number]; montee: [number, number] }
  machine: Rect
  medaillon: { cx: number; cy: number; r: number; fs: number }
  /** Index du radiateur visé par le filet du médaillon, à chaque étape (-1 : la machine, -2 : le manomètre). */
  cibles: number[]
}

const ORDI: Geo = {
  W: 1280, H: 800, sol: 740,
  maison: { x0: 340, x1: 1230, toit: 200, faite: [785, 60], ep: 16, dalle: [462, 478] },
  murs: [
    { x: 610, y0: 478, y1: 724 },
    { x: 640, y0: 216, y1: 462 },
    { x: 930, y0: 216, y1: 462 },
  ],
  pieces: [
    { x: 356, y: 216, w: 284, h: 246, rads: [2] },
    { x: 654, y: 216, w: 276, h: 246, rads: [3] },
    { x: 944, y: 216, w: 270, h: 246, rads: [4] },
    { x: 356, y: 478, w: 254, h: 246, rads: [0] },
    { x: 624, y: 478, w: 590, h: 246, rads: [0, 1] },
  ],
  fenetres: [
    { x: 725, y: 524, w: 100, h: 74 },
    { x: 1035, y: 524, w: 100, h: 74 },
    { x: 440, y: 248, w: 100, h: 74 },
    { x: 1030, y: 248, w: 100, h: 74 },
  ],
  rads: [
    { x: 700, y: 630, w: 150, h: 70 },
    { x: 1010, y: 630, w: 150, h: 70, defaut: 'boue' },
    { x: 420, y: 360, w: 140, h: 70, defaut: 'air' },
    { x: 745, y: 300, w: 56, h: 130, seche: true, defaut: 'air' },
    { x: 1010, y: 360, w: 140, h: 70, defaut: 'boue' },
  ],
  chaudiere: { x: 376, y: 510, w: 100, h: 140, dep: 402, ret: 450 },
  tuyaux: { sol: [710, 718], etage: [440, 448], montee: [588, 598] },
  machine: { x: 500, y: 628, w: 66, h: 78 },
  medaillon: { cx: 170, cy: 330, r: 125, fs: 20 },
  cibles: [2, 2, -1, -2, 2],
}

const MOBILE: Geo = {
  W: 760, H: 1000, sol: 960,
  maison: { x0: 40, x1: 720, toit: 340, faite: [380, 200], ep: 16, dalle: [640, 656] },
  murs: [
    { x: 300, y0: 656, y1: 944 },
    { x: 270, y0: 356, y1: 640 },
    { x: 490, y0: 356, y1: 640 },
  ],
  pieces: [
    { x: 56, y: 356, w: 214, h: 284, rads: [2] },
    { x: 284, y: 356, w: 206, h: 284, rads: [3] },
    { x: 504, y: 356, w: 200, h: 284, rads: [4] },
    { x: 56, y: 656, w: 244, h: 288, rads: [0] },
    { x: 314, y: 656, w: 390, h: 288, rads: [0, 1] },
  ],
  fenetres: [
    { x: 365, y: 724, w: 100, h: 84 },
    { x: 575, y: 724, w: 100, h: 84 },
    { x: 105, y: 404, w: 100, h: 84 },
    { x: 555, y: 404, w: 100, h: 84 },
  ],
  rads: [
    { x: 350, y: 860, w: 130, h: 60 },
    { x: 560, y: 860, w: 130, h: 60, defaut: 'boue' },
    { x: 90, y: 556, w: 130, h: 60, defaut: 'air' },
    { x: 362, y: 470, w: 52, h: 146, seche: true, defaut: 'air' },
    { x: 540, y: 556, w: 130, h: 60, defaut: 'boue' },
  ],
  chaudiere: { x: 80, y: 700, w: 96, h: 130, dep: 104, ret: 150 },
  tuyaux: { sol: [928, 936], etage: [624, 632], montee: [280, 290] },
  machine: { x: 194, y: 838, w: 60, h: 72 },
  medaillon: { cx: 140, cy: 140, r: 100, fs: 22 },
  cibles: [2, 2, -1, -2, 2],
}

const GEO: Record<FormatCircuit, Geo> = { ordi: ORDI, mobile: MOBILE }
const LEGENDES = ['Radiateur froid', 'Purgeur', 'Boue', 'Manomètre', 'Chaleur']

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const doux = (t: number) => t * t * (3 - 2 * t)
const r1 = (n: number) => Math.round(n * 10) / 10
const POLICE = { fontFamily: 'var(--font-inter), system-ui, sans-serif' }

/** Points de raccord d'un radiateur : départ à gauche, retour à droite. */
const raccords = (r: Rad) => ({ dep: r.x + (r.seche ? 6 : 10), ret: r.x + r.w - (r.seche ? 6 : 10) })
/** Le radiateur est-il à l'étage ? */
const etage = (g: Geo, r: Rad) => r.y < g.maison.dalle[0]

/** Tracés des tuyaux, dérivés de la géométrie. */
function traces(g: Geo) {
  const { sol, etage: et, montee } = g.tuyaux
  const c = g.chaudiere
  const bas = g.rads.filter((r) => !etage(g, r))
  const haut = g.rads.filter((r) => etage(g, r))
  const depBas = Math.max(...bas.map((r) => raccords(r).dep), montee[0])
  const retBas = Math.max(...bas.map((r) => raccords(r).ret), montee[1])
  const depHaut = haut.map((r) => raccords(r).dep)
  const retHaut = haut.map((r) => raccords(r).ret)
  const yC = c.y + c.h
  return {
    /** Départ chaud, en trois tronçons révélés l'un après l'autre. */
    a: `M${c.dep} ${yC}V${sol[0]}H${depBas}`,
    b: `M${montee[0]} ${sol[0]}V${et[0]}H${Math.max(...depHaut)}`,
    c: `M${montee[0]} ${et[0]}H${Math.min(...depHaut)}`,
    retour: `M${c.ret} ${yC}V${sol[1]}H${retBas}M${montee[1]} ${sol[1]}V${et[1]}M${Math.min(...retHaut, montee[1])} ${et[1]}H${Math.max(...retHaut, montee[1])}`,
    /** Les petites descentes de chaque radiateur vers ses deux tuyaux. */
    descentes: g.rads.map((r) => {
      const k = raccords(r)
      const [d, rt] = etage(g, r) ? et : sol
      return { dep: `M${k.dep} ${r.y + r.h}V${d}`, ret: `M${k.ret} ${r.y + r.h}V${rt}` }
    }),
  }
}

/** Point visé par le filet du médaillon à l'étape k (1 à 5). */
function cible(g: Geo, k: number): [number, number] {
  const i = g.cibles[k - 1]
  if (i === -1) return [g.machine.x + g.machine.w / 2, g.machine.y + g.machine.h * 0.4]
  if (i === -2) return mano(g)
  const r = g.rads[i]
  if (k === 2) return [r.x + r.w - 8, r.y + 7]
  return [r.x + r.w / 2, r.y + r.h / 2]
}
const mano = (g: Geo): [number, number] => [g.chaudiere.x + g.chaudiere.w - 24, g.chaudiere.y + g.chaudiere.h - 28]

/** Un radiateur à panneaux ou un sèche-serviettes, froid dessous, chaud par-dessus (opacité). */
function Radiateur({ r, i }: { r: Rad; i: number }) {
  const ailettes = r.seche
    ? Array.from({ length: Math.floor((r.h - 14) / 14) }, (_, j) => r.y + 10 + j * 14)
    : Array.from({ length: Math.floor((r.w - 12) / 13) }, (_, j) => r.x + 10 + j * 13)
  const corps = (fill: string) =>
    r.seche ? (
      <g fill={fill}>
        <rect x={r.x} y={r.y} width="7" height={r.h} rx="3" />
        <rect x={r.x + r.w - 7} y={r.y} width="7" height={r.h} rx="3" />
        {ailettes.map((y) => (
          <rect key={y} x={r.x + 4} y={y} width={r.w - 8} height="7" rx="2" />
        ))}
      </g>
    ) : (
      <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="4" fill={fill} />
    )
  return (
    <g>
      {corps(FROID)}
      <g data-rad={i} style={{ opacity: 0 }}>
        {corps(CHAUD)}
      </g>
      {!r.seche &&
        ailettes.map((x) => <line key={x} x1={x} x2={x} y1={r.y + 6} y2={r.y + r.h - 6} stroke={ENCRE} strokeOpacity="0.22" strokeWidth="2.4" />)}
      {r.seche ? (
        <g stroke={ENCRE} strokeWidth="2" fill="none">
          <rect x={r.x} y={r.y} width="7" height={r.h} rx="3" />
          <rect x={r.x + r.w - 7} y={r.y} width="7" height={r.h} rx="3" />
        </g>
      ) : (
        <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="4" stroke={ENCRE} strokeWidth="2.2" fill="none" />
      )}
      {/* L'air logé en haut : une poche claire et ses bulles. */}
      {r.defaut === 'air' && (
        <g data-air={i}>
          <rect x={r.x + 3} y={r.y + 3} width={r.w - 6} height={r.seche ? 26 : 16} rx="3" fill="#EEF5FA" opacity="0.92" />
          {[0.25, 0.5, 0.75].map((f) => (
            <circle key={f} cx={r.x + r.w * f} cy={r.y + (r.seche ? 14 : 11)} r="3.6" fill="none" stroke="#7FA6C2" strokeWidth="1.6" />
          ))}
        </g>
      )}
      {/* La boue tassée en bas. */}
      {r.defaut === 'boue' && (
        <rect
          data-boue={i}
          x={r.x + 3}
          y={r.y + r.h - 22}
          width={r.w - 6}
          height="19"
          rx="3"
          fill={BOUE}
          style={{ transformOrigin: `0 ${r.y + r.h - 3}px`, transformBox: 'view-box' }}
        />
      )}
      {/* Le purgeur, en haut à droite. */}
      <rect x={r.x + r.w - (r.seche ? 4 : 2)} y={r.y + 3} width="8" height="7" rx="1.5" fill="#8C8279" stroke={ENCRE} strokeWidth="1.4" />
      {/* Les ondes de chaleur, au-dessus. */}
      <g data-ondes={i} style={{ opacity: 0 }} stroke={CHAUD} strokeWidth="3" strokeLinecap="round" fill="none">
        {[0.25, 0.5, 0.75].map((f, j) => {
          const x = r.seche ? r.x + r.w / 2 + (j - 1) * 14 : r.x + r.w * f
          return <path key={f} className="dc-onde" style={{ animationDelay: `${j * 0.4}s` }} d={`M${x} ${r.y - 8}q7 -9 0 -18q-7 -9 0 -18`} />
        })}
      </g>
    </g>
  )
}

/** Les cinq médaillons : le détail de chaque étape, grossi. */
function Medaillons({ g }: { g: Geo }) {
  const { cx, cy, r } = g.medaillon
  const s = r / 125
  const T = (x: number, y: number) => `translate(${r1(cx + x * s)} ${r1(cy + y * s)}) scale(${r1(s * 100) / 100})`
  return (
    <>
      {/* 1. Un radiateur froid : thermomètre au plus bas, flocon. */}
      <g data-medaillon={1} style={{ opacity: 0 }}>
        <g transform={T(-78, -40)}>
          <rect x="0" y="0" width="112" height="84" rx="6" fill={FROID} stroke={ENCRE} strokeWidth="3" />
          {[18, 36, 54, 72, 90].map((x) => (
            <line key={x} x1={x} x2={x} y1="9" y2="75" stroke={ENCRE} strokeOpacity="0.25" strokeWidth="3.5" />
          ))}
        </g>
        <g transform={T(50, -62)}>
          <rect x="0" y="0" width="20" height="96" rx="10" fill="#F4F1EC" stroke={ENCRE} strokeWidth="3" />
          <circle cx="10" cy="104" r="16" fill={RETOUR} stroke={ENCRE} strokeWidth="3" />
          <rect x="6" y="76" width="8" height="20" fill={RETOUR} />
        </g>
        <g transform={T(-30, 70)} stroke={RETOUR} strokeWidth="4" strokeLinecap="round">
          <path d="M0 -18V18M-15.6 -9L15.6 9M-15.6 9L15.6 -9" />
        </g>
      </g>
      {/* 2. Le purgeur ouvert à la clé, l'air qui sort. */}
      <g data-medaillon={2} style={{ opacity: 0 }}>
        <g transform={T(-96, -10)}>
          <rect x="0" y="0" width="150" height="90" rx="6" fill={FROID} stroke={ENCRE} strokeWidth="3" />
          <rect x="4" y="4" width="142" height="26" rx="4" fill="#EEF5FA" />
          <rect x="148" y="8" width="22" height="18" rx="3" fill="#8C8279" stroke={ENCRE} strokeWidth="3" />
          <path d="M170 17h24" stroke={ENCRE} strokeWidth="8" strokeLinecap="round" />
          <path d="M194 6v22" stroke={ENCRE} strokeWidth="8" strokeLinecap="round" />
        </g>
        <g fill="none" stroke="#7FA6C2" strokeWidth="3">
          {[0, 1, 2, 3].map((j) => (
            <circle key={j} className="dc-bulle" style={{ animationDelay: `${j * 0.5}s` }} cx={r1(cx + (66 + (j % 2) * 12) * s)} cy={r1(cy - 18 * s)} r={r1((5 + (j % 3) * 2) * s)} />
          ))}
        </g>
      </g>
      {/* 3. Le bas d'un radiateur en coupe : la boue aspirée. */}
      <g data-medaillon={3} style={{ opacity: 0 }}>
        <g transform={T(-100, -56)}>
          <rect x="0" y="0" width="200" height="112" rx="6" fill="#C6D6E2" stroke={ENCRE} strokeWidth="3" />
          <rect data-c="boue-zoom" x="4" y="58" width="192" height="50" rx="4" fill={BOUE} style={{ transformOrigin: '0 108px', transformBox: 'view-box' }} />
          <path d="M200 92h40" stroke={ENCRE} strokeWidth="14" strokeLinecap="round" />
          <path d="M200 92h40" stroke="#4A5156" strokeWidth="9" strokeLinecap="round" />
        </g>
        <g fill="none" stroke={ENCRE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          {[0, 1].map((j) => (
            <path key={j} d={`M${r1(cx + (20 + j * 40) * s)} ${r1(cy + 20 * s)}l${r1(16 * s)} ${r1(14 * s)}l${r1(-16 * s)} ${r1(14 * s)}`} />
          ))}
        </g>
        <g fill="none" stroke={MIEL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {[0, 1].map((j) => (
            <path key={j} d={`M${r1(cx + (20 + j * 40) * s)} ${r1(cy + 20 * s)}l${r1(16 * s)} ${r1(14 * s)}l${r1(-16 * s)} ${r1(14 * s)}`} />
          ))}
        </g>
      </g>
      {/* 4. Le manomètre : l'aiguille remonte dans la zone miel. */}
      <g data-medaillon={4} style={{ opacity: 0 }}>
        <circle cx={cx} cy={cy} r={r1(78 * s)} fill="#F6F3EE" stroke={ENCRE} strokeWidth="4" />
        <path d={arc(cx, cy, 62 * s, -40, 25)} stroke={MIEL} strokeWidth={r1(12 * s)} fill="none" />
        <path d={arc(cx, cy, 62 * s, -120, -60)} stroke="#D2513A" strokeWidth={r1(12 * s)} fill="none" />
        {Array.from({ length: 9 }, (_, j) => -120 + j * 30).map((a) => {
          const [x1, y1] = polaire(cx, cy, 70 * s, a)
          const [x2, y2] = polaire(cx, cy, 52 * s, a)
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ENCRE} strokeWidth="2.4" />
        })}
        <line data-c="aiguille-zoom" x1={cx} y1={cy} x2={cx} y2={r1(cy - 58 * s)} stroke="#B3261E" strokeWidth={r1(5 * s)} strokeLinecap="round" style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'view-box' }} />
        <circle cx={cx} cy={cy} r={r1(9 * s)} fill={ENCRE} />
      </g>
      {/* 5. Le thermomètre qui monte, les ondes de chaleur. */}
      <g data-medaillon={5} style={{ opacity: 0 }}>
        <g transform={T(-70, -40)}>
          <rect x="0" y="0" width="112" height="84" rx="6" fill={CHAUD} stroke={ENCRE} strokeWidth="3" />
          {[18, 36, 54, 72, 90].map((x) => (
            <line key={x} x1={x} x2={x} y1="9" y2="75" stroke={ENCRE} strokeOpacity="0.25" strokeWidth="3.5" />
          ))}
          <g stroke={CHAUD} strokeWidth="5" strokeLinecap="round" fill="none">
            {[28, 56, 84].map((x, j) => (
              <path key={x} className="dc-onde" style={{ animationDelay: `${j * 0.4}s` }} d={`M${x} -10q9 -11 0 -22q-9 -11 0 -22`} />
            ))}
          </g>
        </g>
        <g transform={T(58, -62)}>
          <rect x="0" y="0" width="20" height="96" rx="10" fill="#F4F1EC" stroke={ENCRE} strokeWidth="3" />
          <circle cx="10" cy="104" r="16" fill={CHAUD} stroke={ENCRE} strokeWidth="3" />
          <rect data-c="thermo" x="6" y="12" width="8" height="84" fill={CHAUD} style={{ transformOrigin: '0 96px', transformBox: 'fill-box' }} />
        </g>
      </g>
    </>
  )
}

function polaire(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180
  return [r1(cx + r * Math.cos(a)), r1(cy + r * Math.sin(a))]
}
function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const [x0, y0] = polaire(cx, cy, r, a0)
  const [x1, y1] = polaire(cx, cy, r, a1)
  return `M${x0} ${y0}A${r1(r)} ${r1(r)} 0 0 1 ${x1} ${y1}`
}

/** Flocons fixes (positions tirées une fois), seulement dehors : ciel, hors maison et hors médaillon. */
function flocons(g: Geo) {
  const { x0, x1, toit, faite } = g.maison
  const { cx, cy, r } = g.medaillon
  const out: [number, number, number][] = []
  let s = 7
  const alea = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  for (let n = 0; out.length < 34 && n < 600; n++) {
    const x = alea() * g.W
    const y = alea() * (g.sol - 20)
    const pente = y < toit && x > x0 - 30 && x < x1 + 30 && y > faite[1] + (Math.abs(x - faite[0]) / ((x1 - x0) / 2 + 30)) * (toit - faite[1]) - 14
    const dedans = x > x0 - 30 && x < x1 + 30 && y >= toit - 14
    const medaillon = Math.hypot(x - cx, y - cy) < r + 24
    if (!pente && !dedans && !medaillon) out.push([r1(x), r1(y), 2 + Math.round(alea() * 2)])
  }
  return out
}

export function DessinCircuit({ format, svgRef, className }: { format: FormatCircuit; svgRef?: Ref<SVGSVGElement>; className?: string }) {
  const g = GEO[format]
  const p = `dc-${format}`
  const m = g.maison
  const t = traces(g)
  const c = g.chaudiere
  const [mx, my] = mano(g)
  const { cx, cy, r, fs } = g.medaillon
  const toit = `M${m.x0 - 22} ${m.toit}L${m.faite[0]} ${m.faite[1]}L${m.x1 + 22} ${m.toit}Z`

  return (
    <svg ref={svgRef} data-format={format} aria-hidden="true" className={className} viewBox={`0 0 ${g.W} ${g.H}`} fill="none">
      <defs>
        <linearGradient id={`${p}-ciel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9D6E0" />
          <stop offset="1" stopColor="#EDF1F4" />
        </linearGradient>
        <pattern id={`${p}-tuiles`} width="34" height="20" patternUnits="userSpaceOnUse">
          <rect width="34" height="20" fill="#3B4047" />
          <path d="M0 19.5H34M17 0V10M0 10V20M34 10V20" stroke="#2C3035" strokeWidth="2" />
        </pattern>
        {(['a', 'b', 'c'] as const).map((k) => (
          <mask key={k} id={`${p}-m${k}`} maskUnits="userSpaceOnUse" x="0" y="0" width={g.W} height={g.H}>
            <path data-masque={k} d={t[k]} stroke="#fff" strokeWidth="16" pathLength={1} strokeDasharray="1 1" strokeDashoffset="1" fill="none" />
          </mask>
        ))}
        <style>{`.dc-flux{animation:dc-flux 1.1s linear infinite}.dc-boue{animation:dc-flux 1.4s linear infinite reverse}@keyframes dc-flux{to{stroke-dashoffset:-56}}.dc-onde{animation:dc-onde 2.2s ease-in-out infinite}@keyframes dc-onde{0%,100%{transform:translateY(0);opacity:.35}50%{transform:translateY(-6px);opacity:1}}.dc-bulle{animation:dc-bulle 2s ease-in infinite;transform-box:fill-box}@keyframes dc-bulle{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-70px);opacity:0}}.dc-neige{animation:dc-neige 6s linear infinite}@keyframes dc-neige{0%{transform:translateY(-10px);opacity:0}15%{opacity:.9}100%{transform:translateY(40px);opacity:0}}.dc-voyant{animation:dc-voyant 1s steps(2) infinite}@keyframes dc-voyant{50%{opacity:.15}}@media (prefers-reduced-motion:reduce){.dc-flux,.dc-boue,.dc-onde,.dc-bulle,.dc-neige,.dc-voyant{animation:none}}`}</style>
      </defs>

      {/* ── Dehors : ciel d'hiver, neige, sol enneigé ── */}
      <rect width={g.W} height={g.sol} fill={`url(#${p}-ciel)`} />
      <g fill="#fff">
        {flocons(g).map(([x, y, rr], j) => (
          <circle key={j} className="dc-neige" style={{ animationDelay: `${(j % 7) * 0.8}s` }} cx={x} cy={y} r={rr} />
        ))}
      </g>
      <rect y={g.sol} width={g.W} height={g.H - g.sol} fill="#BDB3A5" />
      <rect y={g.sol - 4} width={g.W} height="9" rx="4" fill="#F8FAFB" />

      {/* ── La maison en coupe ── */}
      <path d={toit} fill={`url(#${p}-tuiles)`} stroke={ENCRE} strokeWidth="3" strokeLinejoin="round" />
      <rect x={m.x0} y={m.toit} width={m.x1 - m.x0} height={g.sol - m.toit} fill="#CDBB9F" />
      {g.pieces.map((pc, j) => (
        <g key={j}>
          <rect x={pc.x} y={pc.y} width={pc.w} height={pc.h} fill={PIECE_FROIDE} />
          <rect data-piece={j} x={pc.x} y={pc.y} width={pc.w} height={pc.h} fill={PIECE_CHAUDE} style={{ opacity: 0 }} />
        </g>
      ))}
      {g.fenetres.map((f, j) => (
        <g key={j}>
          <rect x={f.x} y={f.y} width={f.w} height={f.h} fill="#BFD3E2" stroke="#F7F4EF" strokeWidth="6" />
          <path d={`M${f.x + f.w / 2} ${f.y}V${f.y + f.h}M${f.x} ${f.y + f.h * 0.45}H${f.x + f.w}`} stroke="#F7F4EF" strokeWidth="4" />
          <path d={`M${f.x + 3} ${f.y + f.h - 6}H${f.x + f.w - 3}`} stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </g>
      ))}
      <rect x={m.x0} y={m.dalle[0]} width={m.x1 - m.x0} height={m.dalle[1] - m.dalle[0]} fill="#9B8D7B" />
      {g.murs.map((w, j) => (
        <rect key={j} x={w.x} y={w.y0} width="14" height={w.y1 - w.y0} fill="#B8A68A" />
      ))}
      <rect x={m.x0} y={m.toit} width={m.x1 - m.x0} height={g.sol - m.toit} stroke={ENCRE} strokeWidth="3" fill="none" />
      <rect x={m.x0} y={g.sol - m.ep} width={m.x1 - m.x0} height={m.ep} fill="#9B8D7B" />

      {/* ── Les tuyaux : retour bleu, départ cuivre puis chaud ── */}
      <path d={t.retour} stroke={RETOUR} strokeWidth="6" strokeLinejoin="round" />
      {t.descentes.map((d, j) => (
        <path key={j} d={d.ret} stroke={RETOUR} strokeWidth="5" />
      ))}
      {(['a', 'b', 'c'] as const).map((k) => (
        <path key={k} d={t[k]} stroke={CUIVRE} strokeWidth="6" strokeLinejoin="round" />
      ))}
      {t.descentes.map((d, j) => (
        <path key={j} d={d.dep} stroke={CUIVRE} strokeWidth="5" />
      ))}
      {(['a', 'b', 'c'] as const).map((k) => (
        <g key={k} mask={`url(#${p}-m${k})`}>
          <path d={t[k]} stroke={CHAUD} strokeWidth="6" strokeLinejoin="round" />
          <path className="dc-flux" d={t[k]} stroke={MIEL} strokeWidth="2.6" strokeDasharray="12 16" strokeLinejoin="round" />
        </g>
      ))}
      {t.descentes.map((d, j) => (
        <path key={j} data-descente={j} d={d.dep} stroke={CHAUD} strokeWidth="5" style={{ opacity: 0 }} />
      ))}
      {/* La boue qui repart vers la machine pendant le désembouage. */}
      <path data-c="flux-boue" className="dc-boue" d={t.retour} stroke={BOUE} strokeWidth="3" strokeDasharray="10 18" style={{ opacity: 0 }} />

      {/* ── Les radiateurs ── */}
      {g.rads.map((rr, i) => (
        <Radiateur key={i} r={rr} i={i} />
      ))}

      {/* ── La chaudière murale ── */}
      <g>
        <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="5" fill="#F6F4F0" stroke={ENCRE} strokeWidth="2.6" />
        <rect x={c.x + c.w * 0.22} y={c.y + c.h * 0.3} width={c.w * 0.56} height={c.h * 0.2} rx="3" fill="#20303A" />
        <path
          d={`M${c.x + c.w / 2} ${c.y + c.h * 0.33}c-7 9 -9 13 -9 17a9 9 0 0 0 18 0c0 -4 -2 -8 -9 -17z`}
          fill={CHAUD}
          transform={`translate(0 ${-c.h * 0.012}) scale(1)`}
        />
        <circle className="dc-voyant" data-c="voyant" cx={c.x + 18} cy={c.y + c.h - 28} r="5" fill="#D2513A" />
        <circle cx={mx} cy={my} r="13" fill="#fff" stroke={ENCRE} strokeWidth="2" />
        <line data-c="aiguille" x1={mx} y1={my} x2={mx} y2={my - 10} stroke="#B3261E" strokeWidth="2.4" strokeLinecap="round" style={{ transformOrigin: `${mx}px ${my}px`, transformBox: 'view-box' }} />
      </g>

      {/* ── La pompe de désembouage, branchée le temps du rinçage ── */}
      <g data-c="machine" style={{ opacity: 0 }}>
        <path
          d={`M${g.machine.x} ${g.machine.y + g.machine.h * 0.55}C${g.machine.x - 30} ${g.machine.y + g.machine.h * 0.55} ${c.ret + 10} ${g.tuyaux.sol[1] - 30} ${c.ret} ${g.tuyaux.sol[1] - 8}`}
          stroke={ENCRE}
          strokeWidth="5"
        />
        <rect x={g.machine.x} y={g.machine.y} width={g.machine.w} height={g.machine.h} rx="4" fill="#2F6A9E" stroke={ENCRE} strokeWidth="2.4" />
        <rect x={g.machine.x + 8} y={g.machine.y + 10} width={g.machine.w - 16} height={g.machine.h * 0.5} rx="2" fill="#D7E6F0" />
        <rect data-c="cuve" x={g.machine.x + 8} y={g.machine.y + 10 + g.machine.h * 0.18} width={g.machine.w - 16} height={g.machine.h * 0.32} fill={BOUE} />
        <circle cx={g.machine.x + 12} cy={g.machine.y + g.machine.h + 5} r="6" fill={ENCRE} />
        <circle cx={g.machine.x + g.machine.w - 12} cy={g.machine.y + g.machine.h + 5} r="6" fill={ENCRE} />
      </g>

      {/* ── Le médaillon : le détail de l'étape, relié à sa pièce ── */}
      {[1, 2, 3, 4, 5].map((k) => {
        const [tx, ty] = cible(g, k)
        const a = Math.atan2(ty - cy, tx - cx)
        const x0 = r1(cx + (r + 4) * Math.cos(a))
        const y0 = r1(cy + (r + 4) * Math.sin(a))
        return (
          <g key={k} data-fil={k} style={{ opacity: 0 }}>
            <line x1={x0} y1={y0} x2={tx} y2={ty} stroke={ENCRE} strokeWidth="6" strokeLinecap="round" />
            <line x1={x0} y1={y0} x2={tx} y2={ty} stroke={MIEL} strokeWidth="2.8" strokeLinecap="round" />
            <circle cx={tx} cy={ty} r="7" fill={MIEL} stroke={ENCRE} strokeWidth="2" />
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={r} fill="#FBF7EF" />
      <Medaillons g={g} />
      <circle cx={cx} cy={cy} r={r} stroke={ENCRE} strokeWidth="6" />
      <circle cx={cx} cy={cy} r={r - 1} stroke={MIEL} strokeWidth="3" />
      {LEGENDES.map((l, j) => (
        <text
          key={l}
          data-legende={j + 1}
          x={cx}
          y={cy + r + fs * 1.7}
          textAnchor="middle"
          fontSize={fs}
          fontWeight="700"
          letterSpacing="1.6"
          fill={ENCRE}
          stroke="#EDF1F4"
          strokeWidth="5"
          paintOrder="stroke"
          style={{ ...POLICE, opacity: 0 }}
        >
          {l.toUpperCase()}
        </text>
      ))}
    </svg>
  )
}

const posee = new WeakMap<SVGSVGElement, number>()
const N = 5

/** Pose l'état du dessin pour une avancée q de 0 à 5 (une unité par étape). */
export function animerCircuit(svg: SVGSVGElement, q: number) {
  if (posee.get(svg) === q) return
  posee.set(svg, q)
  const g = GEO[(svg.dataset.format as FormatCircuit) || 'ordi']
  const t = (k: number) => clamp(q - (k - 1))
  const t2 = t(2), t3 = t(3), t4 = t(4), t5 = t(5)
  const fen = (v: number, a: number, b: number) => doux(clamp((v - a) / (b - a)))
  const un = (sel: string) => svg.querySelector<SVGElement>(sel)
  const op = (el: SVGElement | null, v: number) => el && (el.style.opacity = String(Math.round(v * 100) / 100))

  /* Chaleur de chaque radiateur : tiède au départ, l'air purgé réchauffe l'étage, puis un à un. */
  const fenetres: [number, number][] = [[0.12, 0.32], [0.28, 0.48], [0.42, 0.62], [0.52, 0.72], [0.62, 0.84]]
  const chaleur = g.rads.map((rr, i) => {
    const base = rr.defaut === 'air' ? 0.12 + 0.3 * doux(t2) : i === 0 ? 0.3 : 0.12
    return base + (1 - base) * fen(t5, fenetres[i][0], fenetres[i][1])
  })
  chaleur.forEach((h, i) => {
    op(un(`[data-rad="${i}"]`), h)
    op(un(`[data-ondes="${i}"]`), clamp((h - 0.55) / 0.35))
    op(un(`[data-descente="${i}"]`), h)
  })
  g.pieces.forEach((pc, j) => {
    const h = Math.max(...pc.rads.map((i) => chaleur[i]))
    op(un(`[data-piece="${j}"]`), clamp((h - 0.12) / 0.88) * 0.95)
  })

  /* Le départ chaud qui avance dans les trois tronçons. */
  const reveal = { a: 0.28 + 0.72 * fen(t5, 0, 0.32), b: fen(t5, 0.18, 0.55), c: fen(t5, 0.36, 0.6) }
  ;(['a', 'b', 'c'] as const).forEach((k) => {
    un(`[data-masque="${k}"]`)?.setAttribute('stroke-dashoffset', String(Math.round((1 - reveal[k]) * 1000) / 1000))
  })

  /* 2. L'air purgé ; 3. la boue chassée par la machine. */
  svg.querySelectorAll<SVGElement>('[data-air]').forEach((el) => op(el, 1 - fen(t2, 0.2, 0.8)))
  svg.querySelectorAll<SVGElement>('[data-boue]').forEach((el) => {
    el.style.transform = `scaleY(${Math.round((1 - fen(t3, 0.2, 0.85)) * 1000) / 1000})`
  })
  const zoom = un('[data-c="boue-zoom"]')
  if (zoom) zoom.style.transform = `scaleY(${Math.round((1 - fen(t3, 0.2, 0.85)) * 1000) / 1000})`
  op(un('[data-c="machine"]'), fen(t3, 0, 0.15) * (1 - fen(t4, 0.55, 0.85)))
  op(un('[data-c="flux-boue"]'), Math.sin(Math.PI * clamp((t3 - 0.1) / 0.8)))
  const cuve = un('[data-c="cuve"]')
  if (cuve) cuve.style.opacity = String(Math.round((0.25 + 0.75 * fen(t3, 0.1, 0.9)) * 100) / 100)

  /* 4. La pression : l'aiguille remonte de la zone rouge à la zone miel. */
  const angle = -95 + 105 * fen(t4, 0.1, 0.7)
  const aig = un('[data-c="aiguille"]')
  if (aig) aig.style.transform = `rotate(${Math.round(angle)}deg)`
  const aigZ = un('[data-c="aiguille-zoom"]')
  if (aigZ) aigZ.style.transform = `rotate(${Math.round(angle)}deg)`
  const voyant = un('[data-c="voyant"]')
  if (voyant) voyant.style.display = t4 > 0.7 ? 'none' : ''

  /* 5. Le thermomètre du médaillon. */
  const thermo = un('[data-c="thermo"]')
  if (thermo) thermo.style.transform = `scaleY(${Math.round((0.15 + 0.85 * fen(t5, 0.1, 0.85)) * 1000) / 1000})`

  /* Un seul médaillon à la fois, avec son filet et sa légende. */
  const actif = Math.min(N, Math.floor(q) + 1)
  for (let k = 1; k <= N; k++) {
    const v = k === actif ? 1 : 0
    op(un(`[data-medaillon="${k}"]`), v)
    op(un(`[data-fil="${k}"]`), v)
    op(un(`[data-legende="${k}"]`), v)
  }
}
