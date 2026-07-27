import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  variant?: 'light' | 'dark' | 'glass'
  interactive?: boolean
}

const variants = {
  light: 'border border-craie-200 bg-white shadow-pose',
  dark: 'border border-fonte-700/50 bg-fonte-900/50 text-craie-50 backdrop-blur-md',
  glass: 'border border-white/40 bg-white/70 shadow-pose backdrop-blur-lg',
}

export function Card({ children, className = '', variant = 'light', interactive = false }: Props) {
  const hover = interactive
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-pose-forte'
    : ''
  return <div className={`rounded-bloc p-8 ${variants[variant]} ${hover} ${className}`}>{children}</div>
}
