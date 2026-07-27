/**
 * lib/theme.ts, pont unique entre `siteConfig.palette` (hex) et Tailwind.
 *
 * La palette est convertie en variables CSS posées en style inline sur <html>,
 * que tailwind.config.ts relit. Conséquence : re-thémer entièrement le site revient
 * à éditer le bloc `palette` de la config, et rien d'autre.
 *
 * Nommage : `--teinte-<famille>-<niveau>` (ex. `--teinte-braise-500`), valeur
 * exprimée en canaux « r g b » pour rester compatible avec les modificateurs
 * d'opacité de Tailwind (bg-flamme-600/10, text-braise-500/80…).
 */
import type { CSSProperties } from 'react'
import { siteConfig } from '@/config/site.config'

const VAR_PREFIX = '--teinte'

/** `#1B76BC` → `27 118 188`. Accepte la forme courte à 3 caractères. */
export function hexToRgbChannels(hex: string): string {
  const raw = hex.replace('#', '')
  const full = raw.length === 3 ? raw.replace(/./g, (ch) => ch + ch) : raw
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
  return `${r} ${g} ${b}`
}

/** Aplatit la palette en paires [nom de variable, canaux RGB]. */
function paletteEntries(): [string, string][] {
  return Object.entries(siteConfig.palette).flatMap(([family, levels]) =>
    Object.entries(levels as Record<string, string>).map(
      ([level, hex]) => [`${VAR_PREFIX}-${family}-${level}`, hexToRgbChannels(hex)] as [string, string],
    ),
  )
}

/** Style inline à poser sur <html> : pilote tous les tokens de couleur du site. */
export function themeCssVars(): CSSProperties {
  return Object.fromEntries(paletteEntries()) as CSSProperties
}
