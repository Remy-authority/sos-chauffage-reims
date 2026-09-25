'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Euro, MapPin, Phone, ShieldCheck, Thermometer } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { LiveDot } from '@/components/ui/LiveDot'
import { EASE } from '@/lib/motion'
import { siteConfig } from '@/config/site.config'

const badges = [
  { icon: Euro, label: 'Prix annoncé avant' },
  { icon: ShieldCheck, label: "Diagnostic d'abord" },
  { icon: MapPin, label: `${siteConfig.serviceArea.radiusKm} km autour de ${siteConfig.city}` },
]

/**
 * Colonne de droite du hero : un triage court plutôt qu'un bloc de chiffres.
 * C'est la première chose que le visiteur en panne cherche à savoir, et c'est
 * aussi ce qui distingue la composition de ce site de celle des autres sites du
 * portefeuille (où cette colonne porte un argument de prix).
 */
const triage = [
  { symptom: 'Plus rien ne chauffe', lead: "L'appareil" },
  { symptom: 'Un radiateur froid', lead: 'Le circuit' },
  { symptom: "Plus d'eau chaude", lead: 'Le ballon' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative isolate flex min-h-[92vh] items-center overflow-hidden bg-fonte-950 bg-[radial-gradient(ellipse_at_top,rgb(var(--teinte-fonte-800)/0.75),transparent_62%),radial-gradient(ellipse_at_bottom_right,rgb(var(--teinte-braise-500)/0.18),transparent_55%),linear-gradient(180deg,rgb(var(--teinte-fonte-950))_0%,rgb(var(--teinte-fonte-900))_52%,rgb(var(--teinte-fonte-950))_100%)] pb-20 pt-28 lg:pt-36"
    >
      {/* Le dégradé de fond est posé sur la section elle-même (et non sur un calque
          enfant) : il est SOUS la photo, ce n'est pas un voile. Posé en calque, il
          était compté comme un voile par-dessus la photo par audit-design.mjs.

          Photo d'ambiance, très en retrait. Fondue par le bas sur mobile (le texte
          occupe le haut), fondue par la droite à partir du desktop. Le cadre fait
          62 % de la largeur (au-delà des 60 % qu'audit-design exige pour une photo
          de fond) ; le masque démarre plus loin dans le cadre, si bien que la zone
          visible reste la même qu'avec l'ancien cadre à 54 %. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-full opacity-[0.12] [mask-image:linear-gradient(180deg,transparent_35%,black)] lg:w-[62%] lg:opacity-20 lg:[mask-image:linear-gradient(90deg,transparent_13%,black_55%)]"
      >
        <Image src="/hero.jpg" alt="" fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
      </div>

      <div aria-hidden="true" className="trame absolute inset-0" />

      <GradientBlob className="-left-40 top-4" color="profond" size={520} intensity="strong" duration={22} />
      <GradientBlob className="-right-48 bottom-0" color="flamme" size={620} intensity="strong" duration={18} />
      <GradientBlob className="left-1/3 top-1/4" color="braise" size={440} intensity="strong" duration={15} />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:px-10 xl:grid-cols-12"
      >
        <div className="text-center lg:text-left xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <LiveDot>Ligne ouverte 7j/7</LiveDot>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-7 text-[clamp(2rem,8.6vw,3.4rem)] leading-[1.05] text-craie-50 lg:text-[3.875rem]"
          >
            Chauffagiste d&apos;urgence
            <br className="hidden lg:inline" /> à {siteConfig.city},{' '}
            <br className="hidden lg:inline" />
            <span className="titre-braise">on remonte à la cause.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-craie-200 md:text-xl lg:mx-0"
          >
            Gaz, fioul, pompe à chaleur : nous lisons le défaut avant de changer la moindre
            pièce.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button href={`tel:${siteConfig.phone}`} variant="braise" size="lg">
              <Phone size={18} strokeWidth={2.5} />
              {siteConfig.phoneDisplay}
            </Button>
            <Button href="/contact#formulaire" variant="voile" size="lg">
              Décrire ma panne
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-3 lg:justify-start"
          >
            {badges.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-1.5 text-center text-sm text-craie-300 last:col-span-2 sm:flex-row sm:gap-2 sm:text-left"
              >
                <Icon size={16} className="shrink-0 text-flamme-300" strokeWidth={2.4} />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="relative hidden xl:col-span-5 xl:block"
        >
          <div className="relative mx-auto max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-flamme-500/25 via-braise-500/10 to-transparent blur-3xl"
            />

            <div className="relative overflow-hidden rounded-cadre border border-flamme-400/25 bg-gradient-to-br from-fonte-800/70 to-fonte-950/85 p-8 backdrop-blur-xl">
              <span className="inline-flex rounded-full border border-flamme-400/40 bg-flamme-500/10 px-3 py-1 text-xs uppercase tracking-wider text-flamme-300">
                Votre symptôme
              </span>

              <p className="mt-7 font-display text-2xl font-medium leading-snug text-craie-50">
                Trois pannes, trois origines.
              </p>

              <ul className="mt-7 space-y-3">
                {triage.map((t, i) => (
                  <li
                    key={t.symptom}
                    className="flex items-start gap-4 rounded-2xl bg-fonte-900/70 p-4"
                  >
                    <span className="mt-0.5 font-display text-sm font-medium text-braise-400">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-craie-50">{t.symptom}</span>
                      <span className="mt-0.5 block text-xs text-craie-400">{t.lead}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-craie-400">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-flamme-300" />
                Notez le code d&apos;erreur.
              </p>
            </div>

            {/* Signature du métier : la chaleur qui monte le long d'un élément de
                radiateur, l'équivalent chauffage du filet qui s'écoulait sur le
                site débouchage. Décoratif, donc aria-hidden et sans clic. */}
            <div
              aria-hidden="true"
              className="absolute -right-5 -top-7 flex h-24 w-11 items-end justify-center overflow-hidden rounded-full border border-flamme-400/30 bg-fonte-950/70 backdrop-blur"
            >
              <span className="absolute bottom-0 h-8 w-1.5 animate-montee-chaleur rounded-full bg-gradient-to-t from-transparent via-braise-400 to-transparent" />
              <Thermometer size={14} className="relative mb-2 text-flamme-300" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
