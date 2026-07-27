'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Euro, Flame, MapPin, Phone, ShieldCheck, Thermometer } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GradientBlob } from '@/components/ui/GradientBlob'
import { LiveDot } from '@/components/ui/LiveDot'
import { EASE } from '@/lib/motion'
import { siteConfig } from '@/config/site.config'

const badges = [
  { icon: Euro, label: 'Prix annoncé avant' },
  { icon: Flame, label: 'Gaz, fioul, pompe à chaleur' },
  { icon: ShieldCheck, label: 'Diagnostic avant réparation' },
  { icon: MapPin, label: `${siteConfig.serviceArea.radiusKm} km autour de ${siteConfig.city}` },
]

/**
 * Colonne de droite du hero : un triage court plutôt qu'un bloc de chiffres.
 * C'est la première chose que le visiteur en panne cherche à savoir, et c'est
 * aussi ce qui distingue la composition de ce site de celle des autres sites du
 * portefeuille (où cette colonne porte un argument de prix).
 */
const triage = [
  {
    symptom: 'Plus rien ne chauffe',
    lead: "L'appareil ou sa régulation",
  },
  {
    symptom: 'Un seul radiateur froid',
    lead: 'Le circuit, pas la chaudière',
  },
  {
    symptom: "Plus d'eau chaude seule",
    lead: 'Le ballon ou la partie sanitaire',
  },
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
      className="noise-overlay relative isolate flex min-h-[92vh] items-center overflow-hidden bg-ink-950 pb-20 pt-28 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--c-ink-800)/0.75),transparent_62%),radial-gradient(ellipse_at_bottom_right,rgb(var(--c-accent-500)/0.18),transparent_55%),linear-gradient(180deg,rgb(var(--c-ink-950))_0%,rgb(var(--c-ink-900))_52%,rgb(var(--c-ink-950))_100%)]"
      />

      {/* Photo d'ambiance, très en retrait. Fondue par le bas sur mobile (le texte
          occupe le haut), fondue par la droite à partir du desktop. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-full opacity-[0.12] [mask-image:linear-gradient(180deg,transparent_35%,black)] lg:w-[54%] lg:opacity-20 lg:[mask-image:linear-gradient(90deg,transparent,black_48%)]"
      >
        <Image src="/hero.jpg" alt="" fill priority sizes="(min-width: 1024px) 54vw, 100vw" className="object-cover" />
      </div>

      <div aria-hidden="true" className="bg-grid absolute inset-0" />

      <GradientBlob className="-left-40 top-4" color="deep" size={520} intensity="strong" duration={22} />
      <GradientBlob className="-right-48 bottom-0" color="brand" size={620} intensity="strong" duration={18} />
      <GradientBlob className="left-1/3 top-1/4" color="accent" size={440} intensity="strong" duration={15} />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:px-10 xl:grid-cols-12"
      >
        <div className="xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <LiveDot>Ligne urgence ouverte, week-ends et jours fériés compris</LiveDot>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-7 text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-sand-50"
          >
            Chaudière à l&apos;arrêt
            <br />
            à {siteConfig.city},
            <br />
            <span className="text-gradient-accent">on remonte à la cause.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-sand-200 md:text-xl"
          >
            Chaudière à gaz ou au fioul en sécurité, pompe à chaleur qui ne suit plus, radiateurs
            froids, plus d&apos;eau chaude. Nous lisons le défaut avant de changer une pièce, et nous
            annonçons le prix avant de commencer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button href={`tel:${siteConfig.phone}`} variant="accent" size="lg">
              <Phone size={18} strokeWidth={2.5} />
              {siteConfig.phoneDisplay}
            </Button>
            <Button href="/contact#formulaire" variant="ghost" size="lg">
              Décrire ma panne
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {badges.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-sand-300">
                <Icon size={16} className="shrink-0 text-brand-300" strokeWidth={2.4} />
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
              className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-500/25 via-accent-500/10 to-transparent blur-3xl"
            />

            <div className="relative overflow-hidden rounded-hero border border-brand-400/25 bg-gradient-to-br from-ink-800/70 to-ink-950/85 p-8 backdrop-blur-xl">
              <span className="inline-flex rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-xs uppercase tracking-wider text-brand-300">
                Ce que dit votre symptôme
              </span>

              <p className="mt-7 font-display text-2xl font-medium leading-snug text-sand-50">
                Trois pannes qui se ressemblent, trois origines différentes.
              </p>

              <ul className="mt-7 space-y-3">
                {triage.map((t, i) => (
                  <li
                    key={t.symptom}
                    className="flex items-start gap-4 rounded-2xl bg-ink-900/70 p-4"
                  >
                    <span className="mt-0.5 font-display text-sm font-medium text-accent-400">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-sand-50">{t.symptom}</span>
                      <span className="mt-0.5 block text-xs text-sand-400">{t.lead}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-sand-400">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand-300" />
                Le code d&apos;erreur affiché sur votre appareil oriente déjà le diagnostic. Notez-le
                avant d&apos;appeler.
              </p>
            </div>

            {/* Signature du métier : la chaleur qui monte le long d'un élément de
                radiateur, l'équivalent chauffage du filet qui s'écoulait sur le
                site débouchage. Décoratif, donc aria-hidden et sans clic. */}
            <div
              aria-hidden="true"
              className="absolute -right-5 -top-7 flex h-24 w-11 items-end justify-center overflow-hidden rounded-full border border-brand-400/30 bg-ink-950/70 backdrop-blur"
            >
              <span className="absolute bottom-0 h-8 w-1.5 animate-heat-rise rounded-full bg-gradient-to-t from-transparent via-accent-400 to-transparent" />
              <Thermometer size={14} className="relative mb-2 text-brand-300" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
