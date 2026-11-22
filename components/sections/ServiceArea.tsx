import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Vivant from '@/components/ui/Vivant'
import CarteAgrandir from '@/components/ui/CarteAgrandir'
import { atelier, texteAdresse } from '@/components/ui/Atelier'
import { siteConfig } from '@/config/site.config'
import { CARTE, NOMS, PAGES } from './carte-reims-data'

/**
 * Zone d'intervention, avant-dernier bloc de l'accueil (#R46, #R60 ; refaite le 22/11/2026, Rémy :
 * « la zone est catastrophique, faut refaire »). La VRAIE carte : toutes les communes à 40 km de
 * Reims ou moins, en vert, sans aucune zone grise dans le cercle ; contours officiels
 * (geo.api.gouv.fr) dans deux images statiques (scripts/carte-reims.py) ; par-dessus, en code :
 * le rayon de 40 km, les noms (en gras les communes qui ont leur page, cliquables), le repère de
 * Reims et le point lumineux de l'atelier. Le vert s'étend depuis Reims à l'apparition ;
 * « réduire les animations » : carte entière, immobile.
 */
export function ServiceArea() {
  const { city } = siteConfig
  const liste = [...PAGES].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  const { w, h, cx, cy, rayon, cadre, reims, atelier: at } = CARTE
  const angle = -Math.PI / 4
  const noms = [
    ...NOMS.map((n) => ({ ...n, gras: false })),
    ...PAGES.filter((p) => p.etiquette).map((p) => ({ nom: p.nom, etiquette: p.etiquette!, gras: true })),
  ]

  return (
    <section id="zone" className="relative bg-craie-100 py-12 md:py-20 lg:py-28" aria-labelledby="zone-title">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          id="zone-title"
          eyebrow="Zone d'intervention"
          title={
            <>
              Toutes les communes à {CARTE.km}&nbsp;km{' '}
              <span className="titre-fonte italic">autour de {city}</span>
            </>
          }
        />

        <Vivant
          seuil={0.25}
          className="carte-secteur mx-auto mt-10 grid items-start gap-8 rounded-bloc border border-craie-200 bg-white p-4 shadow-pose sm:p-8 md:mt-12 lg:grid-cols-[1.45fr_1fr] lg:gap-12"
        >
          <figure className="m-0">
            <CarteAgrandir cx={cx / w} cy={cy / h}>
              <div
                className="relative aspect-square"
                style={{ ['--cx' as string]: `${(cx / w) * 100}%`, ['--cy' as string]: `${(cy / h) * 100}%` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/carte/secteur-gris.svg" alt="" width={w} height={h} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/carte/secteur-vert.svg" alt="" width={w} height={h} loading="lazy" decoding="async" className="carte-vert absolute inset-0 h-full w-full" />
                <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 h-full w-full" role="group" aria-labelledby="carte-legende">
                  <title id="carte-legende">
                    {`Carte de ${city} et des ${CARTE.servies} communes où nous intervenons, en vert, dans un rayon de ${CARTE.km} km`}
                  </title>
                  {PAGES.map((p) => (
                    <Link key={p.slug} href={`/zones/${p.slug}`} aria-label={`Chauffagiste à ${p.nom}`} className="group">
                      <path
                        d={p.d}
                        className="fill-transparent stroke-flamme-700/50 transition-[fill] duration-200 group-hover:fill-flamme-500/30 group-focus-visible:fill-flamme-500/30"
                        strokeWidth="1.6"
                      />
                    </Link>
                  ))}
                  <g aria-hidden="true" pointerEvents="none">
                    <circle cx={cx} cy={cy} r={rayon} fill="none" className="carte-rayon stroke-flamme-700" strokeWidth="2.6" strokeDasharray="11 9" />
                    <circle cx={cx} cy={cy} r={cadre - 1.5} fill="none" stroke="#D9D4CC" strokeWidth="3" />
                    <text
                      x={cx + rayon * Math.cos(angle)}
                      y={cy + rayon * Math.sin(angle)}
                      className="carte-rayon fill-flamme-700"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="28"
                      fontWeight="700"
                      stroke="#fff"
                      strokeWidth="8"
                      strokeLinejoin="round"
                      paintOrder="stroke"
                    >
                      {CARTE.km} km
                    </text>
                  </g>
                  <g aria-hidden="true" pointerEvents="none" stroke="rgb(255 255 255 / .9)" strokeLinejoin="round" paintOrder="stroke">
                    {noms.map(({ nom, etiquette: e, gras }) => (
                      <text
                        key={nom}
                        x={e.x}
                        y={e.y}
                        fontSize={e.taille}
                        strokeWidth={e.taille * 0.26}
                        fontWeight={gras ? 700 : 500}
                        fill={gras ? '#0F1A12' : '#3A423D'}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {e.lignes.length === 2 ? (
                          <>
                            <tspan x={e.x} dy="-0.56em">{e.lignes[0]}</tspan>
                            <tspan x={e.x} dy="1.12em">{e.lignes[1]}</tspan>
                          </>
                        ) : (
                          e.lignes[0]
                        )}
                      </text>
                    ))}
                    {/* Reims : le repère du centre et son nom. */}
                    <circle cx={reims.x} cy={reims.y} r="9" fill="#fff" className="stroke-flamme-700" strokeWidth="5" />
                    <circle cx={reims.x} cy={reims.y} r="9" fill="none" className="carte-onde stroke-flamme-700" strokeWidth="3" />
                    <text x={reims.x} y={reims.y - 30} fontSize="42" fontWeight="800" strokeWidth="9" fill="#0F1A12" textAnchor="middle" dominantBaseline="middle">
                      {city}
                    </text>
                    {/* L'atelier : un point lumineux braise, sans nom (la légende le dit). */}
                    {atelier && at && (
                      <>
                        <circle cx={at.x} cy={at.y} r="15" className="atelier-halo fill-braise-400" stroke="none" />
                        <circle cx={at.x} cy={at.y} r="7.5" className="fill-braise-500" stroke="#fff" strokeWidth="3" />
                      </>
                    )}
                  </g>
                </svg>
              </div>
            </CarteAgrandir>
            <figcaption className="mt-3 flex flex-col items-center gap-1.5 text-balance text-center text-[13px] text-craie-600 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-[2px] border border-flamme-700/40 bg-[#C4DFB9]" aria-hidden="true" />
                En vert, les communes où nous venons
              </span>
              {atelier && (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full border-2 border-white bg-braise-500 shadow-[0_0_0_3px_rgb(var(--teinte-braise-400)/0.4)]" aria-hidden="true" />
                  {atelier.libelle}, {texteAdresse()}
                </span>
              )}
            </figcaption>
          </figure>

          <div className="flex flex-col justify-center self-stretch text-center lg:text-left">
            <p className="mx-auto max-w-md text-balance text-[15px] leading-relaxed text-craie-600 lg:mx-0 lg:text-base">
              Nous venons chez vous dans toutes les communes à moins de {CARTE.km}&nbsp;km de {city}, de la
              Montagne de Reims aux portes&nbsp;de&nbsp;l&apos;Aisne.
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15px] font-semibold text-fonte-950 lg:mx-0 lg:text-base">
              Les communes voisines de {city}
            </p>
            <ul className="mx-auto mt-4 grid w-full max-w-md grid-cols-2 gap-x-4 gap-y-1 text-center text-[15px] lg:mx-0 lg:text-left">
              {liste.map((c) => (
                <li key={c.slug}>
                  <Link href={`/zones/${c.slug}`} className="group flex items-center justify-center gap-2 rounded-[2px] py-1.5 font-medium lg:justify-start text-fonte-900 hover:text-flamme-600">
                    <span className="hidden h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[#9CCB8C] group-hover:bg-flamme-600 lg:block" aria-hidden="true" />
                    {c.nom}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/zones"
              className="mx-auto mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-flamme-600 hover:text-flamme-700 lg:mx-0"
            >
              Toutes les zones
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Vivant>
      </div>
    </section>
  )
}
