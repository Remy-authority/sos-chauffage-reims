import Link from 'next/link'
import { getCommunesGeo, type SchemasData } from '@/lib/content'
import { SchemaFrame } from './SchemaFrame'

type Data = NonNullable<SchemasData['carte-communes']>

/* Dimensions du dessin (unités SVG). La carte est mise à l'échelle par le navigateur. */
const W = 320
const H = 230
const PAD = 22
const KM_PAR_DEGRE_LAT = 111.2

/**
 * `carte-communes` : carte schématique des communes desservies autour de Reims.
 * Positions = centres officiels lus dans content/communes-geo.json
 * (geo.api.gouv.fr), projection équirectangulaire corrigée par cos(latitude) :
 * les distances et les directions sont justes à l'échelle de l'agglomération.
 * Aucun fond de carte externe. Chaque commune porte un numéro, la légende en
 * HTML (lisible à 390 px) donne les noms et les liens. Sur une page commune,
 * la commune de la page est mise en valeur. `nu` : le dessin seul, sans cadre, note ni source
 * (accueil, #R71 : aucun lien de source sur l'accueil).
 */
export function CarteCommunes({ data, zoneSlug, nu = false }: { data?: Data; zoneSlug?: string; nu?: boolean }) {
  const geo = getCommunesGeo()
  if (!geo?.centre || !geo.communes?.length) return null

  const lat0 = geo.centre.lat
  const k = Math.cos((lat0 * Math.PI) / 180)
  const tous = [geo.centre, ...geo.communes]
  const xs = tous.map((p) => p.lon * k)
  const ys = tous.map((p) => -p.lat)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const echelle = Math.min((W - 2 * PAD) / (maxX - minX), (H - 2 * PAD) / (maxY - minY))
  // Centrage du nuage de points dans le cadre.
  const offX = (W - (maxX - minX) * echelle) / 2
  const offY = (H - (maxY - minY) * echelle) / 2
  const pos = (lon: number, lat: number) => ({
    x: (lon * k - minX) * echelle + offX,
    y: (-lat - minY) * echelle + offY,
  })
  const unitesParKm = echelle / KM_PAR_DEGRE_LAT

  const communes = [...geo.communes].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  const centre = pos(geo.centre.lon, geo.centre.lat)
  const barre = 5 * unitesParKm

  const dessin = (
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full rounded-[3px] bg-craie-50"
          role="img"
          aria-label={`Carte schématique : Reims au centre et ${communes.length} communes desservies autour`}
        >
          {/* Cercles de distance autour du centre de Reims */}
          {/* Chaque cercle porte sa distance : sans elle, l'accueil (`nu`, sans note) montrait des
              cercles muets (relecture du 30/10/2026). */}
          {[5, 10].map((km) => (
            <g key={km}>
              <circle
                cx={centre.x}
                cy={centre.y}
                r={km * unitesParKm}
                fill="none"
                className="stroke-flamme-400/50"
                strokeWidth={1}
                strokeDasharray="3 4"
              />
              <text
                x={centre.x + km * unitesParKm * Math.SQRT1_2 + 3}
                y={centre.y - km * unitesParKm * Math.SQRT1_2 - 3}
                fontSize={9}
                className="fill-flamme-700"
              >
                {km} km
              </text>
            </g>
          ))}

          {/* Rayons Reims → commune */}
          {communes.map((c) => {
            const p = pos(c.lon, c.lat)
            const actif = c.slug === zoneSlug
            return (
              <line
                key={`l-${c.slug}`}
                x1={centre.x}
                y1={centre.y}
                x2={p.x}
                y2={p.y}
                className={actif ? 'stroke-braise-500' : 'stroke-craie-300'}
                strokeWidth={actif ? 2 : 1}
              />
            )
          })}

          {/* Reims */}
          <circle cx={centre.x} cy={centre.y} r={9} className="fill-fonte-900" />
          <circle cx={centre.x} cy={centre.y} r={3.5} className="fill-craie-50" />
          <text
            x={centre.x}
            y={centre.y - 14}
            textAnchor="middle"
            className="fill-fonte-950 font-display"
            fontSize={13}
            fontWeight={600}
          >
            Reims
          </text>

          {/* Communes numérotées */}
          {communes.map((c, i) => {
            const p = pos(c.lon, c.lat)
            const actif = c.slug === zoneSlug
            const pastille = (
              <>
                {actif && <circle cx={p.x} cy={p.y} r={16} className="fill-braise-500/20" />}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={actif ? 11 : 10}
                  className={actif ? 'fill-braise-500' : 'fill-flamme-600'}
                  stroke="white"
                  strokeWidth={2}
                />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  className="fill-white"
                >
                  {i + 1}
                </text>
              </>
            )
            // Pastille cliquable vers la page de la commune (#R60) ; au clavier et pour les
            // lecteurs d'écran, ce sont les liens de la légende qui portent la navigation.
            return actif ? (
              <g key={c.slug}>{pastille}</g>
            ) : (
              <a key={c.slug} href={`/zones/${c.slug}`} tabIndex={-1} className="cursor-pointer hover:opacity-80">
                <title>{c.nom}</title>
                {pastille}
              </a>
            )
          })}

          {/* Barre d'échelle 5 km */}
          <g transform={`translate(${W - PAD - barre}, ${H - 10})`}>
            <line x1={0} y1={0} x2={barre} y2={0} className="stroke-fonte-800" strokeWidth={2} />
            <line x1={0} y1={-4} x2={0} y2={0} className="stroke-fonte-800" strokeWidth={2} />
            <line x1={barre} y1={-4} x2={barre} y2={0} className="stroke-fonte-800" strokeWidth={2} />
            <text x={barre / 2} y={-6} textAnchor="middle" fontSize={10} className="fill-fonte-800">
              5 km
            </text>
          </g>
          {/* Nord */}
          <g transform={`translate(${PAD - 6}, ${PAD})`}>
            <path d="M6 0 L11 14 L6 11 L1 14 Z" className="fill-fonte-800" />
            <text x={6} y={26} textAnchor="middle" fontSize={10} className="fill-fonte-800">
              N
            </text>
          </g>
        </svg>

        <ol className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm lg:grid-cols-1 lg:gap-y-2.5 lg:text-[0.9375rem]">
          {communes.map((c, i) => {
            const actif = c.slug === zoneSlug
            return (
              <li key={c.slug} className="flex items-center gap-2">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-bold text-white ${
                    actif ? 'bg-braise-500' : 'bg-flamme-600'
                  }`}
                >
                  {i + 1}
                </span>
                {actif ? (
                  <span className="font-semibold text-braise-600" aria-current="page">
                    {c.nom}
                  </span>
                ) : (
                  <Link
                    href={`/zones/${c.slug}`}
                    className="!font-normal !text-fonte-900 !no-underline hover:!text-flamme-700 hover:!underline"
                  >
                    {c.nom}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
  )

  if (nu) return dessin

  return (
    <SchemaFrame
      id="carte-communes"
      titre={data?.titre}
      source={data?.source ?? geo.source}
      note="Cercles pointillés : 5 et 10 km autour du centre de Reims, à vol d'oiseau."
    >
      {dessin}
    </SchemaFrame>
  )
}

export default CarteCommunes
