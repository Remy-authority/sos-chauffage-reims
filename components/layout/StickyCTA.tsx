'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Phone } from 'lucide-react'
import { EASE } from '@/lib/motion'
import { siteConfig } from '@/config/site.config'

/**
 * Rappel d'action.
 * Téléphone et tablette (sous 768 px) : barre pleine largeur TOUJOURS visible, compacte (61 px),
 * l'appel occupe les deux tiers ; le bloc 1 se centre au-dessus d'elle (#R70).
 * Ordinateur : deux boutons carrés en bas à droite, après 600 px de défilement.
 * Angles presque droits partout (#R53).
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed bottom-8 right-8 z-40 hidden flex-col gap-3 lg:flex"
          >
            <a
              href="/contact#formulaire"
              aria-label="Demander un devis"
              className="group relative flex h-14 w-14 items-center justify-center rounded-[3px] bg-flamme-600 text-white shadow-halo-flamme transition-colors duration-300 hover:bg-flamme-500"
            >
              <FileText size={21} strokeWidth={2.2} />
              <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-[3px] bg-fonte-950 px-3 py-1.5 text-xs font-medium text-craie-50 group-hover:block">
                Demander un devis
              </span>
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              aria-label={`Appeler ${siteConfig.phoneDisplay}`}
              className="group relative flex h-14 w-14 items-center justify-center rounded-[3px] bg-braise-500 text-white shadow-halo-braise transition-colors duration-300 hover:bg-braise-400"
            >
              <Phone size={21} strokeWidth={2.5} />
              <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-[3px] bg-fonte-950 px-3 py-1.5 text-xs font-medium text-craie-50 group-hover:block">
                Appeler maintenant
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Téléphone : toujours là, 44 + 2 x 8 + 1 = 61 px (hors zone de sécurité de l'iPhone). */}
      <div aria-label="Actions rapides" className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-fonte-800 bg-fonte-950/95 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex min-h-[44px] flex-[2] items-center justify-center gap-2 rounded-[3px] bg-braise-500 px-4 font-semibold tabular-nums text-white"
        >
          <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
          {siteConfig.phoneDisplay}
        </a>
        <a
          href="/contact#formulaire"
          className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[3px] border border-craie-50/20 bg-white/10 px-4 text-sm font-semibold text-craie-50"
        >
          <FileText size={16} aria-hidden="true" />
          Devis
        </a>
      </div>
    </>
  )
}
