'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CircleAlert,
  Droplets,
  Fan,
  Flame,
  Fuel,
  Heater,
  KeyRound,
  RefreshCw,
  Thermometer,
  type LucideIcon,
} from 'lucide-react'
import { EASE } from '@/lib/motion'
import { siteConfig } from '@/config/site.config'

type Step = 1 | 2 | 3

interface Fields {
  probleme: string
  occupant: string
  ville: string
  urgence: string
  nom: string
  telephone: string
  email: string
  message: string
}

/** Remplacement : à la charge du propriétaire, on lui demande s'il l'est (Rémy, 23/10/2026). */
const REMPLACEMENT = 'Chaudière à remplacer'

/**
 * Les neuf situations qui couvrent la quasi-totalité des appels chauffage.
 * URGENCE (Rémy 29/10/2026, avec Mr Gay) : seules la fuite ou le dégât des eaux et le
 * ballon qui fuit ou a éclaté sont des urgences, prises 24 h/24 ; tout le reste (radiateur,
 * panne, entretien) est du dépannage aux heures d'ouverture, de 8 h à 19 h 30. Le mot
 * « fuite » ou « éclaté » en tête de la demande la classe en urgence dans Rank OS
 * (cockpit/lib/natures-demande.ts).
 */
const TYPES: { id: string; label: string; Icon: LucideIcon; urgence?: boolean }[] = [
  { id: "Urgence, fuite d'eau ou dégât des eaux", label: 'Fuite ou dégât des eaux', Icon: Droplets, urgence: true },
  { id: "Urgence, ballon d'eau chaude qui fuit ou a éclaté", label: 'Ballon qui fuit', Icon: Thermometer, urgence: true },
  { id: 'Chaudière en panne', label: 'Chaudière en panne', Icon: Flame },
  { id: 'Pompe à chaleur en défaut', label: 'Pompe à chaleur', Icon: Fan },
  { id: 'Radiateur froid ou circuit à purger', label: 'Radiateur froid', Icon: Heater },
  { id: "Plus d'eau chaude, ballon ou cumulus", label: "Plus d'eau chaude", Icon: Fuel },
  { id: 'Entretien annuel à programmer', label: 'Entretien annuel', Icon: CalendarCheck },
  { id: REMPLACEMENT, label: 'Chaudière à remplacer', Icon: RefreshCw },
  { id: 'Autre', label: 'Autre situation', Icon: CircleAlert },
]

function estUrgence(probleme: string): boolean {
  return Boolean(TYPES.find((t) => t.id === probleme)?.urgence)
}

/** Heures d'ouverture hors urgence, à l'heure de Paris : de 8 h à 19 h 30. */
const OUVERTURE_MINUTES = 8 * 60
const FERMETURE_MINUTES = 19 * 60 + 30

/** `null` pendant les heures d'ouverture ; sinon le jour du rappel (« aujourd'hui » avant 8 h, « demain » après 19 h 30). */
function rappelHorsHoraires(maintenant = new Date()): "aujourd'hui" | 'demain' | null {
  const [h, m] = maintenant
    .toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: false })
    .split(':')
    .map(Number)
  const minutes = h * 60 + m
  if (minutes < OUVERTURE_MINUTES) return "aujourd'hui"
  if (minutes >= FERMETURE_MINUTES) return 'demain'
  return null
}

function ProgressBar({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 gap-2">
        {([1, 2, 3] as Step[]).map((s) => (
          <span
            key={s}
            className={`h-[3px] flex-1 transition-all duration-500 ${
              s < step ? 'bg-braise-500/60' : s === step ? 'bg-braise-500' : 'bg-white/15'
            }`}
          />
        ))}
      </div>
      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-craie-400">
        Étape {step} sur 3
      </span>
    </div>
  )
}

const inputClass =
  'w-full rounded-[3px] border border-white/15 bg-white/[0.06] px-4 py-3.5 text-craie-50 placeholder:text-craie-500 transition-colors focus:border-braise-400 focus:outline-none focus:ring-2 focus:ring-braise-500/25'
const labelClass = 'mb-1.5 block text-sm font-medium text-craie-200'

/** Choix d'une situation sur le formulaire du bloc 1 au téléphone : la séquence (HeroChaudiere) saute à la fin de la scène. */
export const EVENEMENT_SITUATION = 'leadform:situation'

const stepVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
}

/**
 * Mise à jour du 29/10/2026 : seul l'HABILLAGE change (carte noire opaque, angles presque droits,
 * #R53). Les règles restent celles de Rémy et Mr Gay : locataire arrêté sans envoi, urgences
 * 24 h/24 et le reste de 8 h à 19 h 30, même champ « probleme » lu par Rank OS.
 *  - `variante` : `complet` (bas d'accueil, contact) ou `compact` (bloc 1 de l'accueil) ;
 *  - `titre` : titre porté par la carte, pour le bloc 1 qui n'a pas de H2 au-dessus ;
 *  - `ecran1` : formulaire du bloc 1 au téléphone, posé sur la photo sous le titre.
 */
export function LeadForm({
  variante = 'complet',
  titre,
  ecran1 = false,
}: {
  variante?: 'complet' | 'compact'
  titre?: string
  ecran1?: boolean
} = {}) {
  const compact = variante === 'compact'
  const Q = compact ? 'p' : 'h2'
  const [step, setStep] = useState<Step>(1)
  /**
   * Étape 1 en deux temps : la situation, puis propriétaire ou locataire. Un locataire est arrêté
   * là, quelle que soit la demande (Rémy 29/10/2026, avec Franck Gay : « on ne veut pas que le
   * locataire nous contacte »), comme au répondeur du 09.
   */
  const [occupantVisible, setOccupantVisible] = useState(false)
  const [fields, setFields] = useState<Fields>({
    probleme: '',
    occupant: '',
    ville: '',
    urgence: '',
    nom: '',
    telephone: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  /** Lu au navigateur seulement (l'heure du serveur au rendu ne vaut rien) et relu à chaque étape. */
  const [horsHoraires, setHorsHoraires] = useState<"aujourd'hui" | 'demain' | null>(null)
  const urgent = estUrgence(fields.probleme)
  const etape2Complete = Boolean(fields.ville && fields.occupant && (urgent || fields.urgence))
  const cadre = useRef<HTMLDivElement>(null)
  const premierRendu = useRef(true)

  // L'étape suivante est plus courte : sur téléphone, le haut du formulaire
  // remonterait hors de l'écran. On le ramène s'il n'est plus visible.
  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false
      return
    }
    const el = cadre.current
    if (el && el.getBoundingClientRect().top < 72) {
      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 88, behavior: reduit ? 'auto' : 'smooth' })
    }
  }, [step, occupantVisible])

  useEffect(() => {
    setHorsHoraires(rappelHorsHoraires())
  }, [step])

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  async function submit() {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          // Tout voyage dans la demande (le partenaire lit cette ligne) : situation, propriétaire
          // ou locataire, délai, et le rappel à 8 h quand la demande non urgente arrive de nuit.
          probleme: [
            fields.probleme,
            fields.occupant,
            urgent ? 'urgence 24 h/24' : fields.urgence,
            !urgent && horsHoraires ? `envoyée hors horaires, rappel ${horsHoraires} à partir de 8 h` : '',
          ]
            .filter(Boolean)
            .join(' · '),
          company: '',
        }),
      })
      if (!res.ok) throw new Error()
      window.location.href = '/merci'
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      ref={cadre}
      className={`relative w-full rounded-[3px] border border-white/10 bg-fonte-950 text-left ${
        compact ? 'p-4 sm:p-5 lg:p-6' : 'p-6 md:p-9'
      } ${ecran1 ? 'shadow-[0_14px_32px_-10px_rgb(0_0_0_/_0.6)]' : 'shadow-[0_30px_80px_-20px_rgb(0_0_0_/_0.7)]'}`}
      role="region"
      aria-label="Formulaire de demande"
      data-etape={occupantVisible ? '1b' : step}
    >
      <div className="relative">
        {titre && <p className="mb-4 font-display text-xl text-craie-50 lg:text-2xl">{titre}</p>}
        {/* Piège à robots, invisible pour les humains. */}
        <div className="hidden" aria-hidden="true">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" readOnly />
        </div>

        <ProgressBar step={step} />

        <AnimatePresence mode="wait">
          {step === 1 && !occupantVisible && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Q className={`${compact ? 'mt-4 text-lg lg:text-xl' : 'mt-6 text-2xl md:text-3xl'} font-display text-craie-50`}>
                Qu&apos;est-ce qui ne chauffe plus ?
              </Q>
              <p className={`${compact ? 'mt-1 text-[13px] leading-snug' : 'mt-2 text-sm'} text-craie-400`}>
                Urgences (fuite, dégât des eaux, ballon qui fuit) 24&nbsp;h/24. Autres demandes de
                8&nbsp;h à 19&nbsp;h&nbsp;30.
              </p>

              {/* Neuf situations en 3 x 3, sans case orpheline ; compact : trois colonnes dès le téléphone,
                  pour que le formulaire tienne entier dans le premier écran (#R70). */}
              <div className={`${compact ? 'mt-3 grid-cols-3 gap-1.5 sm:gap-2' : 'mt-6 grid-cols-2 gap-3 sm:grid-cols-3'} grid`}>
                {TYPES.map(({ id, label, Icon, urgence }) => {
                  const selected = fields.probleme === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        set('probleme', id)
                        set('occupant', '')
                        setOccupantVisible(true)
                        if (ecran1) window.dispatchEvent(new CustomEvent<string>(EVENEMENT_SITUATION, { detail: id }))
                      }}
                      aria-pressed={selected}
                      className={`${id === 'Autre' && !compact ? 'col-span-2 sm:col-span-1 ' : ''}flex flex-col items-center justify-center rounded-[3px] border text-center font-medium leading-tight transition-all duration-200 ${
                        compact ? 'min-h-[58px] gap-1 px-1 py-1.5 text-[11.5px] sm:min-h-[62px] sm:gap-1.5 sm:p-2 sm:text-[12.5px]' : 'min-h-[96px] gap-2.5 p-3 text-xs'
                      } ${
                        selected
                          ? 'border-braise-400 bg-braise-500/20 text-craie-50'
                          : 'border-white/10 bg-white/[0.04] text-craie-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-craie-50'
                      }`}
                    >
                      <Icon
                        className={`${compact ? 'h-5 w-5' : 'h-6 w-6'} ${selected ? 'text-braise-400' : 'text-flamme-300'}`}
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                      {label}
                      {urgence && (
                        <span className={`${compact ? 'text-[9.5px]' : 'text-[10px]'} font-semibold uppercase tracking-[0.14em] text-braise-300`}>
                          24 h/24
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && occupantVisible && (
            <motion.div
              key="step1-occupant"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Q className={`${compact ? 'mt-4 text-lg lg:text-xl' : 'mt-6 text-2xl md:text-3xl'} font-display text-craie-50`}>Vous êtes propriétaire ou locataire ?</Q>
              <p className={`${compact ? 'mt-1 text-[13px] leading-snug' : 'mt-2 text-sm'} text-craie-400`}>
                Nous intervenons à la demande du propriétaire du logement.
              </p>

              <div className={`${compact ? 'mt-3 gap-2' : 'mt-6 gap-3'} grid grid-cols-2`}>
                {[
                  { value: 'Propriétaire', label: 'Je suis propriétaire', Icon: KeyRound },
                  { value: 'Locataire', label: 'Je suis locataire', Icon: Heater },
                ].map(({ value, label, Icon }) => {
                  const selected = fields.occupant === value
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        set('occupant', value)
                        if (value === 'Propriétaire') {
                          setOccupantVisible(false)
                          setStep(2)
                        }
                      }}
                      aria-pressed={selected}
                      className={`flex ${compact ? 'min-h-[72px]' : 'min-h-[96px]'} flex-col items-center justify-center gap-2.5 rounded-[3px] border p-3 text-center text-sm font-medium leading-tight transition-all duration-200 ${
                        selected
                          ? 'border-braise-400 bg-braise-500/20 text-craie-50'
                          : 'border-white/10 bg-white/[0.04] text-craie-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-craie-50'
                      }`}
                    >
                      <Icon
                        className={`${compact ? 'h-5 w-5' : 'h-6 w-6'} ${selected ? 'text-braise-400' : 'text-flamme-300'}`}
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                      {label}
                    </button>
                  )
                })}
              </div>

              {fields.occupant === 'Locataire' && (
                <p role="status" className="mt-4 rounded-[3px] border border-flamme-400/30 bg-flamme-400/10 p-4 text-sm leading-relaxed text-craie-100">
                  Merci de contacter directement votre propriétaire avant toute chose et de lui
                  transmettre notre site : il pourra nous faire sa demande. Rien n&apos;a été envoyé.
                </p>
              )}

              <div className={`${compact ? 'mt-3' : 'mt-7'} flex items-center`}>
                <button
                  type="button"
                  onClick={() => {
                    setOccupantVisible(false)
                    set('occupant', '')
                  }}
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-craie-400 transition-colors hover:text-craie-50"
                >
                  <ArrowLeft size={16} strokeWidth={2.5} />
                  Retour
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Q className={`${compact ? 'mt-4 text-lg lg:text-xl' : 'mt-6 text-2xl md:text-3xl'} font-display text-craie-50`}>
                {urgent ? 'Où êtes-vous ?' : 'Où, et à quel point c\'est pressé ?'}
              </Q>
              <p className={`${compact ? 'mt-1 text-[13px] leading-snug' : 'mt-2 text-sm'} text-craie-400`}>
                {urgent
                  ? 'Urgence prise 24\u00a0h/24. Pour aller plus vite, appelez-nous directement.'
                  : 'Avec ces réponses, nous savons à quel moment prévoir votre passage.'}
              </p>

              <div className={`${compact ? 'mt-4 space-y-4' : 'mt-6 space-y-5'}`}>
                <div>
                  <label htmlFor="ville" className={labelClass}>
                    Commune ou code postal
                  </label>
                  <input
                    id="ville"
                    name="ville"
                    type="text"
                    autoComplete="postal-code"
                    placeholder="Reims, Tinqueux, Cormontreuil, 51100…"
                    value={fields.ville}
                    onChange={(e) => set('ville', e.target.value)}
                    className={inputClass}
                  />
                </div>


                {!urgent && (
                <fieldset>
                  <legend className={labelClass}>Degré d&apos;urgence</legend>
                  <div className="flex flex-wrap gap-3">
                    {['Au plus vite', 'Cette semaine', 'Pas pressé'].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => set('urgence', value)}
                        aria-pressed={fields.urgence === value}
                        className={`min-h-[44px] rounded-[3px] border px-5 text-sm font-semibold transition-all ${
                          fields.urgence === value
                            ? 'border-braise-400 bg-braise-500 text-white'
                            : 'border-white/20 text-craie-300 hover:border-white/40 hover:text-craie-50'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </fieldset>
                )}
              </div>

              <div className={`${compact ? 'mt-4' : 'mt-7'} flex items-center justify-between`}>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1)
                    setOccupantVisible(true)
                  }}
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-craie-400 transition-colors hover:text-craie-50"
                >
                  <ArrowLeft size={16} strokeWidth={2.5} />
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!etape2Complete}
                  className={`inline-flex min-h-[48px] items-center gap-2 rounded-[3px] px-7 text-sm font-semibold transition-all ${
                    etape2Complete
                      ? 'bg-braise-500 text-white hover:bg-braise-400'
                      : 'cursor-not-allowed bg-white/10 text-craie-500'
                  }`}
                >
                  Continuer
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Q className={`${compact ? 'mt-4 text-lg lg:text-xl' : 'mt-6 text-2xl md:text-3xl'} font-display text-craie-50`}>Comment vous joindre ?</Q>
              <p className={`${compact ? 'mt-1 text-[13px] leading-snug' : 'mt-2 text-sm'} text-craie-400`}>
                Nous vous rappelons dès que possible. Pour une urgence, l&apos;appel reste le plus
                rapide.
              </p>
              {!urgent && horsHoraires && (
                <p role="status" className="mt-4 rounded-[3px] border border-flamme-400/30 bg-flamme-400/10 p-4 text-sm leading-relaxed text-craie-100">
                  Nos techniciens ne sont pas disponibles pour le moment. Ils reprennent {horsHoraires}{' '}
                  à partir de 8&nbsp;h : votre demande sera bien enregistrée et nous vous rappelons dès 8&nbsp;h.
                </p>
              )}

              <div className={`${compact ? 'mt-4 space-y-3' : 'mt-6 space-y-4'}`}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nom" className={labelClass}>
                      Nom <span className="text-braise-400">*</span>
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Votre nom"
                      value={fields.nom}
                      onChange={(e) => set('nom', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className={labelClass}>
                      Téléphone <span className="text-braise-400">*</span>
                    </label>
                    <input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="06 00 00 00 00"
                      value={fields.telephone}
                      onChange={(e) => set('telephone', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-xs font-normal text-craie-500">(optionnel)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="vous@exemple.fr"
                    value={fields.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Précisions <span className="text-xs font-normal text-craie-500">(optionnel)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={compact ? 2 : 3}
                    placeholder="Chaudière ou PAC, son âge, le message à l'écran, depuis combien de temps…"
                    value={fields.message}
                    onChange={(e) => set('message', e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-craie-500">
                En envoyant ce formulaire, vous acceptez d&apos;être recontacté au sujet de votre
                demande. Vos données ne sont pas revendues, voir notre{' '}
                <a
                  href="/politique-confidentialite"
                  className="underline transition-colors hover:text-craie-300"
                >
                  politique de confidentialité
                </a>
                .
              </p>

              {status === 'error' && (
                <p role="alert" className="mt-4 text-sm font-medium text-braise-300">
                  L&apos;envoi a échoué. Appelez-nous directement au {siteConfig.phoneDisplay}.
                </p>
              )}

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-sm text-craie-400 transition-colors hover:text-craie-50 sm:justify-start"
                >
                  <ArrowLeft size={16} strokeWidth={2.5} />
                  Retour
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={!fields.nom || !fields.telephone || status === 'sending'}
                  className={`inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[3px] px-8 font-semibold transition-all sm:w-auto ${
                    !fields.nom || !fields.telephone || status === 'sending'
                      ? 'cursor-not-allowed bg-white/10 text-craie-500'
                      : 'bg-braise-500 text-white hover:bg-braise-400 hover:shadow-halo-braise'
                  }`}
                >
                  {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LeadForm
