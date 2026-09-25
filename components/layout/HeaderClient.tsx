'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { EASE } from '@/lib/motion'
import { siteConfig } from '@/config/site.config'

export type NavService = { slug: string; navTitle: string }
export type NavZone = { slug: string; name: string }
type NavItem = { href: string; label: string }

type MenuId = 'services' | 'zones'

/**
 * Sous-menu d'en-tête (ordinateur). Vrai menu déroulant : il s'ouvre au survol ET
 * au clic, se pilote au clavier (Entrée / Espace ouvrent, Échap referme et rend
 * le focus au bouton, la sortie du focus referme), et expose `aria-haspopup`,
 * `aria-expanded` et `aria-controls`.
 */
function Dropdown({
  id,
  label,
  items,
  all,
  open,
  setOpen,
  tone,
  columns = 1,
}: {
  id: MenuId
  label: string
  items: NavItem[]
  all: NavItem
  open: boolean
  setOpen: (id: MenuId | null) => void
  tone: string
  columns?: 1 | 2
}) {
  const panelId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(id)}
      onMouseLeave={() => setOpen(null)}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(null)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(null)
          buttonRef.current?.focus()
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(open ? null : id)}
        className={`group relative flex items-center gap-1.5 py-2 text-sm font-medium transition-colors ${tone}`}
      >
        {label}
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-braise-500 transition-all duration-300 group-hover:w-[calc(100%-1.4rem)]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${columns === 2 ? 'w-[28rem]' : 'w-[22rem]'}`}
          >
            <div className="overflow-hidden rounded-panneau border border-craie-200 bg-craie-50/95 p-2 shadow-pose-forte backdrop-blur-xl">
              <ul className={columns === 2 ? 'grid grid-cols-2' : ''}>
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-fonte-900 transition-colors hover:bg-flamme-600/10 hover:text-flamme-700 focus-visible:bg-flamme-600/10"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={all.href}
                className="mt-1 flex items-center justify-between gap-3 rounded-2xl border-t border-craie-200 px-4 py-3 text-sm font-semibold text-braise-600 transition-colors hover:bg-braise-500/10"
              >
                {all.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Volet dépliant du menu mobile (Prestations, Zones). */
function MobileVolet({
  label,
  items,
  all,
  open,
  toggle,
}: {
  label: string
  items: NavItem[]
  all: NavItem
  open: boolean
  toggle: () => void
}) {
  const panelId = useId()
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-fonte-900 transition-colors hover:bg-flamme-600/10"
      >
        {label}
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="ml-3 border-l border-craie-200 pl-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-2.5 text-sm text-craie-700 transition-colors hover:bg-flamme-600/10 hover:text-flamme-700"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={all.href}
                className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-braise-600 transition-colors hover:bg-braise-500/10"
              >
                {all.label} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * En-tête fixe. Deux états visuels : posé sur le hero sombre (translucide, texte
 * crème) et décollé au scroll (crème dépoli, texte encre), avec une transition de
 * 500 ms. Deux sous-menus, Prestations et Zones d'intervention : panneau animé au
 * survol ou au clic sur ordinateur, volets dépliants sur mobile. Jamais d'entrée
 * « Tarifs » ici : la page Tarifs est reliée depuis le pied de page (règle du
 * portefeuille du 18/09/2026).
 */
export function HeaderClient({ services, zones }: { services: NavService[]; zones: NavZone[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  // Volets mobiles indépendants : on peut déplier Prestations ET Zones à la fois.
  const [mobileVolets, setMobileVolets] = useState<Record<MenuId, boolean>>({ services: false, zones: false })
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermer les panneaux à chaque changement de page.
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
    setMobileVolets({ services: false, zones: false })
  }, [pathname])

  // Menu mobile ouvert : la page ne défile plus derrière le voile. On restaure
  // toujours la valeur d'origine au démontage, pour ne pas laisser le body bloqué.
  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  const serviceItems: NavItem[] = services.map((s) => ({ href: `/services/${s.slug}`, label: s.navTitle }))
  const zoneItems: NavItem[] = zones.map((z) => ({ href: `/zones/${z.slug}`, label: z.name }))
  const allServices: NavItem = { href: '/#prestations', label: 'Toutes nos prestations' }
  const allZones: NavItem = { href: '/zones', label: 'Toutes les zones' }

  const links = [
    { href: '/conseils', label: 'Conseils' },
    { href: '/contact', label: 'Contact' },
  ]

  // Les pages détail zone/prestation/conseil n'ont pas de hero sombre : elles
  // démarrent directement sur le bandeau clair du fil d'Ariane (Breadcrumbs),
  // contrairement aux autres pages qui posent un PageHeader sombre en haut.
  const hasLightTop = /^\/(zones|services|conseils)\/[^/]+\/?$/.test(pathname)

  // Le menu mobile ouvert force l'en-tête clair : sinon la barre sombre flotte
  // au-dessus d'un panneau crème, sans cohérence.
  const solid = scrolled || mobileOpen || hasLightTop

  const linkTone = solid
    ? 'text-fonte-900 hover:text-flamme-600'
    : 'text-craie-100 hover:text-braise-300'

  return (
    <>
      {/* Voile plein écran du menu mobile. Posé SOUS l'en-tête (z-45 contre z-50)
          pour que la barre et le panneau restent nets, et au-dessus de tout le
          reste, barre d'appel collante comprise (z-40), pour assombrir vraiment
          toute la page. C'est un vrai <button> de fermeture,
          donc surtout PAS aria-hidden : la règle globale du projet coupe les
          clics des calques décoratifs aria-hidden, elle rendrait ce voile inerte
          (cf. tasks/lessons.md, calques qui volent ou perdent le clic). */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="fixed inset-0 z-[45] w-full cursor-default bg-fonte-950/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-craie-50/90 shadow-[0_1px_0_rgb(var(--teinte-fonte-950)/0.08)] backdrop-blur-xl'
            : 'bg-fonte-950/35 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5 lg:px-10">
          <Link href="/" aria-label={`${siteConfig.businessName}, accueil`} className="transition-opacity hover:opacity-80">
            <Logo tone={solid ? 'dark' : 'light'} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            <Dropdown
              id="services"
              label="Prestations"
              items={serviceItems}
              all={allServices}
              open={openMenu === 'services'}
              setOpen={setOpenMenu}
              tone={linkTone}
            />
            <Dropdown
              id="zones"
              label="Zones d'intervention"
              items={zoneItems}
              all={allZones}
              open={openMenu === 'zones'}
              setOpen={setOpenMenu}
              tone={linkTone}
              columns={2}
            />

            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative py-2 text-sm font-medium transition-colors ${linkTone}`}
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-braise-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <Button href={`tel:${siteConfig.phone}`} variant="braise" size="sm">
              <Phone size={16} strokeWidth={2.5} />
              {siteConfig.phoneDisplay}
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-fonte-900 text-craie-50 lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-craie-200 bg-craie-50 shadow-pose-forte lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Navigation mobile">
                <MobileVolet
                  label="Prestations"
                  items={serviceItems}
                  all={allServices}
                  open={mobileVolets.services}
                  toggle={() => setMobileVolets((v) => ({ ...v, services: !v.services }))}
                />
                <MobileVolet
                  label="Zones d'intervention"
                  items={zoneItems}
                  all={allZones}
                  open={mobileVolets.zones}
                  toggle={() => setMobileVolets((v) => ({ ...v, zones: !v.zones }))}
                />

                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-fonte-900 transition-colors hover:bg-flamme-600/10"
                  >
                    {item.label}
                  </Link>
                ))}

                <Button href={`tel:${siteConfig.phone}`} variant="braise" size="md" className="mt-4">
                  <Phone size={18} strokeWidth={2.5} />
                  {siteConfig.phoneDisplay}
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
