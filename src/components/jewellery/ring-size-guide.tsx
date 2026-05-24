'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Ruler, X, Info } from 'lucide-react'

const SIZE_CHART = [
  { indian: '5', us: '5', uk: 'J½', eu: '49', dia: '15.7' },
  { indian: '6', us: '6', uk: 'L½', eu: '51.5', dia: '16.5' },
  { indian: '7', us: '7', uk: 'N½', eu: '54', dia: '17.3' },
  { indian: '8', us: '8', uk: 'P½', eu: '57', dia: '18.1' },
  { indian: '9', us: '9', uk: 'R½', eu: '59', dia: '18.9' },
  { indian: '10', us: '10', uk: 'T½', eu: '62', dia: '19.8' },
  { indian: '11', us: '11', uk: 'V½', eu: '64', dia: '20.6' },
  { indian: '12', us: '12', uk: 'X½', eu: '66.5', dia: '21.4' },
  { indian: '13', us: '13', uk: 'Z½', eu: '69', dia: '22.2' },
  { indian: '14', us: '14', uk: 'Z+2', eu: '72', dia: '23.0' },
]

interface RingSizeGuideProps {
  selectedSize: string | null
  onSelect: (size: string) => void
  availableSizes?: string[]
}

export function RingSizeGuide({ selectedSize, onSelect, availableSizes }: RingSizeGuideProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sizes = availableSizes || SIZE_CHART.map(s => s.indian)

  return (
    <div>
      <label className="text-sm font-medium mb-3 block text-[var(--foreground)]">Ring Size</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size
          return (
            <motion.button
              key={size}
              onClick={() => onSelect(size)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'w-10 h-10 rounded-full border-2 text-sm font-medium transition-all flex items-center justify-center',
                isSelected
                  ? 'border-gold-500 bg-gold-500 text-white shadow-gold'
                  : 'border-[var(--border)] hover:border-gold-300 bg-[var(--card)] text-[var(--foreground)]'
              )}
            >
              {size}
            </motion.button>
          )
        })}
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-gold-600 hover:text-gold-700 hover:underline flex items-center gap-1 mt-1"
      >
        <Ruler className="w-3 h-3" /> Ring Size Guide
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[var(--card)] rounded-2xl shadow-elevated max-w-lg w-full max-h-[80vh] overflow-auto p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl">Ring Size Guide</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gold-50 dark:bg-gold-900/10 rounded-xl p-4 mb-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div className="text-sm text-gold-800 dark:text-gold-300">
                  <p className="font-medium mb-1">How to measure your ring size</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-gold-700 dark:text-gold-400">
                    <li>Wrap a thin strip of paper around your finger</li>
                    <li>Mark where the paper overlaps</li>
                    <li>Measure the length in mm — that&apos;s your circumference</li>
                    <li>Divide by π (3.14) to get the diameter</li>
                    <li>Match the diameter in the chart below</li>
                  </ol>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-2.5 px-3 text-[var(--muted-foreground)] font-medium">Indian</th>
                      <th className="text-left py-2.5 px-3 text-[var(--muted-foreground)] font-medium">US</th>
                      <th className="text-left py-2.5 px-3 text-[var(--muted-foreground)] font-medium">UK</th>
                      <th className="text-left py-2.5 px-3 text-[var(--muted-foreground)] font-medium">EU</th>
                      <th className="text-left py-2.5 px-3 text-[var(--muted-foreground)] font-medium">Dia (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row) => (
                      <tr
                        key={row.indian}
                        onClick={() => { onSelect(row.indian); setIsOpen(false) }}
                        className={cn(
                          'border-b border-[var(--border)] cursor-pointer transition-colors hover:bg-gold-50 dark:hover:bg-gold-900/10',
                          selectedSize === row.indian && 'bg-gold-100 dark:bg-gold-900/20'
                        )}
                      >
                        <td className="py-2.5 px-3 font-medium">{row.indian}</td>
                        <td className="py-2.5 px-3">{row.us}</td>
                        <td className="py-2.5 px-3">{row.uk}</td>
                        <td className="py-2.5 px-3">{row.eu}</td>
                        <td className="py-2.5 px-3">{row.dia}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-[var(--muted-foreground)] mt-4 text-center">
                Tap a row to select that size • For best results, measure at end of day
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
