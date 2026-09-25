import { getZones } from '@/lib/content'
import { HeaderClient, type NavService } from '@/components/layout/HeaderClient'

export type { NavService }

/**
 * En-tête du site. Composant SERVEUR : il lit la liste des communes au build
 * (lib/content lit le disque, ce qu'un composant client ne peut pas faire) et la
 * passe, avec les prestations reçues du layout, à la partie interactive
 * (HeaderClient : sous-menus Prestations et Zones, menu mobile).
 */
export function Header({ services }: { services: NavService[] }) {
  const zones = getZones().map((z) => ({ slug: z.slug, name: z.name }))
  return <HeaderClient services={services} zones={zones} />
}
