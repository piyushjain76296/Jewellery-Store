'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'

const KARATS = [
  { value: 'K14', label: '14K', purity: '58.3%' },
  { value: 'K18', label: '18K', purity: '75%' },
  { value: 'K22', label: '22K', purity: '91.6%' },
  { value: 'K24', label: '24K', purity: '99.9%' },
] as const

interface KaratSelectorProps {
  selectedKarat: string
  onSelect: (karat: string) => void
  availableKarats?: string[]
  priceImpact?: Record<string, number>
}

export function KaratSelector({ selectedKarat, onSelect, availableKarats, priceImpact }: KaratSelectorProps) {
  const karats = availableKarats
    ? KARATS.filter(k => availableKarats.includes(k.value))
    : KARATS

  return (
    <div>
      <label className="text-sm font-medium mb-3 block text-[var(--foreground)]">Purity (Karat)</label>
      <div className="flex flex-wrap gap-2">
        {karats.map((karat) => {
          const isSelected = selectedKarat === karat.value
          const price = priceImpact?.[karat.value]
          return (
            <motion.button
              key={karat.value}
              onClick={() => onSelect(karat.value)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'relative px-5 py-3 rounded-xl border-2 transition-all duration-200 text-center min-w-[80px]',
                isSelected
                  ? 'border-gold-500 bg-gradient-to-b from-gold-50 to-gold-100/50 shadow-gold dark:from-gold-900/30 dark:to-gold-900/10'
                  : 'border-[var(--border)] hover:border-gold-300 bg-[var(--card)]'
              )}
            >
              <span className={cn('text-base font-bold block', isSelected ? 'text-gold-700 dark:text-gold-400' : 'text-[var(--foreground)]')}>
                {karat.label}
              </span>
              <span className="text-[10px] text-[var(--muted-foreground)] block mt-0.5">
                {karat.purity} pure
              </span>
              {price !== undefined && price !== 0 && (
                <span className={cn('text-[10px] font-medium block mt-1', price > 0 ? 'text-gold-600' : 'text-success')}>
                  {price > 0 ? '+' : ''}{formatPrice(price)}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
