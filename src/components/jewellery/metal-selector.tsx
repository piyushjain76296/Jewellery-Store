'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const METALS = [
  { value: 'GOLD', label: 'Gold', color: '#FFD700', ring: 'ring-yellow-400' },
  { value: 'ROSE_GOLD', label: 'Rose Gold', color: '#B76E79', ring: 'ring-pink-400' },
  { value: 'SILVER', label: 'Silver', color: '#C0C0C0', ring: 'ring-gray-400' },
  { value: 'PLATINUM', label: 'Platinum', color: '#E5E4E2', ring: 'ring-gray-300' },
  { value: 'WHITE_GOLD', label: 'White Gold', color: '#FFFFF0', ring: 'ring-amber-200' },
] as const

interface MetalSelectorProps {
  selectedMetal: string
  onSelect: (metal: string) => void
  availableMetals?: string[]
}

export function MetalSelector({ selectedMetal, onSelect, availableMetals }: MetalSelectorProps) {
  const metals = availableMetals
    ? METALS.filter(m => availableMetals.includes(m.value))
    : METALS

  return (
    <div>
      <label className="text-sm font-medium mb-3 block text-[var(--foreground)]">Metal Type</label>
      <div className="flex flex-wrap gap-3">
        {metals.map((metal) => {
          const isSelected = selectedMetal === metal.value
          return (
            <motion.button
              key={metal.value}
              onClick={() => onSelect(metal.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex items-center gap-2.5 px-4 py-2.5 rounded-full border-2 transition-all duration-200 text-sm',
                isSelected
                  ? 'border-gold-500 bg-gold-50 shadow-gold dark:bg-gold-900/20'
                  : 'border-[var(--border)] hover:border-gold-300 bg-[var(--card)]'
              )}
            >
              <span
                className={cn('w-5 h-5 rounded-full border-2 shadow-sm', isSelected ? 'ring-2 ring-offset-2 ring-gold-400' : '')}
                style={{ backgroundColor: metal.color, borderColor: metal.color === '#FFFFF0' ? '#ddd' : 'transparent' }}
              />
              <span className={cn('font-medium', isSelected ? 'text-gold-700 dark:text-gold-400' : 'text-[var(--foreground)]')}>
                {metal.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
