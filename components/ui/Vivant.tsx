'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Vivant, un bloc qui s’anime quand il entre à l’écran (Rémy, 11/10/2026 : pictos de la
 * réassurance, puis « des icônes animées » sur les trois questions et le bloc « En bref »).
 *
 * Pose `data-anim="pret"` dès que le JavaScript a la main, puis `data-anim="vu"` à
 * l’apparition. Les effets sont dans app/globals.css (`.vivant`) : `.trait` se trace,
 * `.apparait` glisse et se fond, `.sonde`, `.reecrit`, `.flotte`, `.goutte`
 * gardent ensuite un geste discret. Sans JavaScript ou avec « réduire les animations » :
 * tout reste dessiné et immobile.
 */
export default function Vivant({
  as: Balise = 'div',
  className = '',
  seuil = 0.3,
  children,
}: {
  as?: 'div' | 'ul' | 'ol'
  className?: string
  seuil?: number
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.dataset.anim = 'pret'
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        el.dataset.anim = 'vu'
        obs.disconnect()
      },
      { threshold: seuil },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [seuil])

  const props = { className: `vivant ${className}`, ...(Balise === 'div' ? {} : { role: 'list' }) }
  if (Balise === 'ul') return <ul ref={ref as React.RefObject<HTMLUListElement>} {...props}>{children}</ul>
  if (Balise === 'ol') return <ol ref={ref as React.RefObject<HTMLOListElement>} {...props}>{children}</ol>
  return <div ref={ref as React.RefObject<HTMLDivElement>} className={props.className}>{children}</div>
}
