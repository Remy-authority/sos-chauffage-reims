import {
  BadgeCheck,
  CalendarCheck,
  Clock,
  Droplets,
  Euro,
  Fan,
  Flame,
  Fuel,
  Gauge,
  Heater,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Thermometer,
  TriangleAlert,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/**
 * Table de correspondance entre les clés `icon` du contenu JSON / de la config et
 * les pictogrammes. Le contenu ne connaît jamais lucide-react : un site N+1 change
 * de métier en changeant cette table, pas les fichiers de contenu.
 */
const ICONS: Record<string, LucideIcon> = {
  // Prestations chauffage
  alert: TriangleAlert,
  flame: Flame,
  fuel: Fuel,
  heatpump: Fan,
  radiator: Heater,
  leak: Droplets,
  tank: Thermometer,
  maintenance: CalendarCheck,
  // Étapes et arguments
  phone: Phone,
  search: Search,
  tool: Wrench,
  check: BadgeCheck,
  shield: ShieldCheck,
  clock: Clock,
  euro: Euro,
  star: Star,
}

export function resolveIcon(icon: string): LucideIcon {
  return ICONS[icon] ?? Gauge
}

export function ServiceIcon({
  icon,
  className = 'h-6 w-6',
  strokeWidth = 1.9,
}: {
  icon: string
  className?: string
  strokeWidth?: number
}) {
  const Icon = resolveIcon(icon)
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
