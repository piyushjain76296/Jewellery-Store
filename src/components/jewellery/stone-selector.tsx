'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const STONES = [
  { value: 'DIAMOND', label: 'Diamond', color: '#B9F2FF', emoji: '💎' },
  { value: 'RUBY', label: 'Ruby', color: '#E0115F', emoji: '🔴' },
  { value: 'EMERALD', label: 'Emerald', color: '#50C878', emoji: '🟢' },
  { value: 'SAPPHIRE', label: 'Sapphire', color: '#0F52BA', emoji: '🔵' },
  { value: 'PEARL', label: 'Pearl', color: '#FDEEF4', emoji: '⚪' },
  { value: 'POLKI', label: 'Polki', color: '#F5F5DC', emoji: '✨' },
  { value: 'KUNDAN', label: 'Kundan', color: '#FFD700', emoji: '🌟' },
  { value: 'CUBIC_ZIRCONIA', label: 'CZ', color: '#E8E8E8', emoji: '💠' },
  { value: 'NONE', label: 'No Stone', color: 'transparent', emoji: '—' },
] as const

interface StoneSelectorProps {
  selectedStone: string
  onSelect: (stone: string) => void
  availableStones?: string[]
}

export function StoneSelector({ selectedStone, onSelect, availableStones }: StoneSelectorProps) {
  const stones = availableStones
    ? STONES.filter(s => availableStones.includes(s.value))
    : STONES

  return (
    <div>
      <label className="text-sm font-medium mb-3 block text-[var(--foreground)]">Stone Type</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {stones.map((stone) => {
          const isSelected = selectedStone === stone.value
          return (
            <motion.button
              key={stone.value}
              onClick={() => onSelect(stone.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200',
                isSelected
                  ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20'
                  : 'border-[var(--border)] hover:border-gold-300 bg-[var(--card)]'
              )}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
              <span
                className="w-6 h-6 rounded-full border shadow-sm flex items-center justify-center text-xs"
                style={{
                  backgroundColor: stone.value === 'NONE' ? 'transparent' : stone.color,
                  borderColor: stone.value === 'NONE' ? 'var(--border)' : 'transparent',
                }}
              >
                {stone.value === 'NONE' && '—'}
              </span>
              <span className={cn('text-xs font-medium', isSelected ? 'text-gold-700 dark:text-gold-400' : 'text-[var(--foreground)]')}>
                {stone.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
