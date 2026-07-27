import type { Config } from 'tailwindcss'

/**
 * tailwind.config.ts, tokens de design branchés sur les variables CSS émises par
 * lib/theme.ts depuis `siteConfig.palette`. Aucune couleur en dur ici : changer
 * les quatre échelles dans site.config.ts re-thème tout le site.
 *
 * Lexique du site (métier chauffage, volontairement pas un vocabulaire de template
 * générique) : `braise` pour l'action et l'urgence, `flamme` pour la structure,
 * `craie` pour les neutres clairs, `fonte` pour les fonds sombres.
 *
 * Système de design transposé de la référence PROTEC-DARD :
 *  - deux familles de police, Inter (UI, corps) et Fraunces (display, titres)
 *  - rayons généreux (bloc 24px, panneau 32px, cadre 40px, boutons ronds)
 *  - ombres douces à deux couches, halos animés, textures de grain et de trame
 */
const token = (name: string) => `rgb(var(--teinte-${name}) / <alpha-value>)`

const echelle = (famille: string, niveaux: number[]) =>
  Object.fromEntries(niveaux.map((n) => [n, token(`${famille}-${n}`)]))

/* ── Mouvements (durées et courbes alignées sur lib/motion.ts) ─────────────── */
const keyframes = {
  /* Filet lumineux qui MONTE le long d'un élément de radiateur : signature du
     métier chauffage, la chaleur qui s'élève. */
  'montee-chaleur': {
    '0%': { transform: 'translateY(120%)', opacity: '0' },
    '18%': { opacity: '1' },
    '82%': { opacity: '1' },
    '100%': { transform: 'translateY(-340%)', opacity: '0' },
  },
  miroitement: {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  flottement: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-12px)' },
  },
}

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
      },

      keyframes,
      animation: {
        'montee-chaleur': 'montee-chaleur 4.2s ease-in-out infinite',
        miroitement: 'miroitement 8s linear infinite',
        flottement: 'flottement 6s ease-in-out infinite',
      },

      colors: {
        braise: {
          ...echelle('braise', [300, 400, 500, 600]),
          DEFAULT: token('braise-500'),
        },
        flamme: {
          ...echelle('flamme', [300, 400, 500, 600, 700]),
          DEFAULT: token('flamme-600'),
        },
        craie: echelle('craie', [50, 100, 200, 300, 400, 500, 600, 700]),
        fonte: echelle('fonte', [600, 700, 800, 900, 950]),
      },

      boxShadow: {
        /* Teinte d'ombre lue dans la palette : une charte chaude ne doit pas
           porter une ombre froide figée en dur. */
        pose: '0 1px 2px rgb(var(--teinte-fonte-950) / 0.05), 0 8px 24px -8px rgb(var(--teinte-fonte-950) / 0.14)',
        'pose-forte':
          '0 4px 12px rgb(var(--teinte-fonte-950) / 0.09), 0 24px 48px -12px rgb(var(--teinte-fonte-950) / 0.22)',
        'halo-braise': '0 0 40px -10px rgb(var(--teinte-braise-500) / 0.55)',
        'halo-flamme': '0 0 44px -12px rgb(var(--teinte-flamme-400) / 0.5)',
      },

      borderRadius: {
        bloc: '1.5rem',
        panneau: '2rem',
        cadre: '2.5rem',
      },
    },
  },
  plugins: [],
}

export default config
