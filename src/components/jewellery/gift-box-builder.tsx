'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Gift, Ribbon, MessageSquare, Check } from 'lucide-react'

const BOX_OPTIONS = [
  { type: 'Standard', price: 0, features: ['Branded box', 'Tissue paper', 'Care card'], color: 'from-charcoal-100 to-charcoal-50 dark:from-charcoal-800 dark:to-charcoal-700' },
  { type: 'Premium', price: 199, features: ['Velvet box', 'Satin ribbon', 'Care card', 'Gift bag'], color: 'from-gold-100 to-gold-50 dark:from-gold-900/30 dark:to-gold-900/10' },
  { type: 'Luxury', price: 499, features: ['Leather box', 'Gold ribbon', 'Handwritten card', 'Perfumed bag', 'Wax seal'], color: 'from-blush-200 to-blush-100 dark:from-blush-400/10 dark:to-blush-400/5' },
]

const RIBBON_COLORS = [
  { name: 'Gold', color: '#C9A84C' },
  { name: 'Silver', color: '#C0C0C0' },
  { name: 'Red', color: '#DC2626' },
  { name: 'Pink', color: '#EC4899' },
  { name: 'White', color: '#FFFFFF' },
]

interface GiftBoxBuilderProps {
  boxType: string
  ribbon: string
  message: string
  onBoxTypeChange: (type: string) => void
  onRibbonChange: (ribbon: string) => void
  onMessageChange: (message: string) => void
}

export function GiftBoxBuilder({
  boxType, ribbon, message,
  onBoxTypeChange, onRibbonChange, onMessageChange,
}: GiftBoxBuilderProps) {
  return (
    <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card)] space-y-5">
      <div className="flex items-center gap-2">
        <Gift className="w-5 h-5 text-gold-500" />
        <h3 className="text-sm font-semibold">Gift Packaging</h3>
      </div>

      {/* Box Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {BOX_OPTIONS.map((box) => {
          const isSelected = boxType === box.type
          return (
            <motion.button
              key={box.type}
              onClick={() => onBoxTypeChange(box.type)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative p-4 rounded-xl border-2 text-left transition-all',
                isSelected ? 'border-gold-500 shadow-gold' : 'border-[var(--border)] hover:border-gold-300'
              )}
            >
              <div className={cn('absolute inset-0 rounded-xl bg-gradient-to-b opacity-50', box.color)} />
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{box.type}</span>
                  {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
                <span className="text-xs text-gold-600 font-medium">
                  {box.price === 0 ? 'Free' : `+₹${box.price}`}
                </span>
                <ul className="mt-2 space-y-1">
                  {box.features.map(f => (
                    <li key={f} className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-gold-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Ribbon Color */}
      <div>
        <label className="text-xs font-medium text-[var(--muted-foreground)] mb-2 block flex items-center gap-1.5">
          <Ribbon className="w-3.5 h-3.5" /> Ribbon Color
        </label>
        <div className="flex gap-2">
          {RIBBON_COLORS.map((r) => (
            <button
              key={r.name}
              onClick={() => onRibbonChange(r.name)}
              title={r.name}
              className={cn(
                'w-8 h-8 rounded-full border-2 transition-all shadow-sm',
                ribbon === r.name ? 'ring-2 ring-offset-2 ring-gold-400 border-gold-400' : 'border-transparent hover:scale-110'
              )}
              style={{ backgroundColor: r.color }}
            />
          ))}
        </div>
      </div>

      {/* Gift Message */}
      <div>
        <label className="text-xs font-medium text-[var(--muted-foreground)] mb-2 block flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" /> Gift Message
        </label>
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value.slice(0, 200))}
          placeholder="Write a personal message for the recipient..."
          maxLength={200}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all resize-none"
        />
        <span className="text-xs text-[var(--muted-foreground)] mt-1 block text-right">
          {message.length}/200
        </span>
      </div>
    </div>
  )
}
