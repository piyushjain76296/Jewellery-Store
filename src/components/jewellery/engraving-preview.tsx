'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Type, Sparkles } from 'lucide-react'

const FONTS = [
  { value: 'Classic Serif', label: 'Classic Serif', style: 'font-serif' },
  { value: 'Modern Sans', label: 'Modern Sans', style: 'font-sans' },
  { value: 'Script Elegant', label: 'Script', style: 'italic font-serif' },
]

interface EngravingPreviewProps {
  text: string
  font: string
  onTextChange: (text: string) => void
  onFontChange: (font: string) => void
  isEnabled: boolean
  onToggle: () => void
  price?: number
}

export function EngravingPreview({
  text,
  font,
  onTextChange,
  onFontChange,
  isEnabled,
  onToggle,
  price = 299,
}: EngravingPreviewProps) {
  const maxChars = 12

  return (
    <div className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-500" />
          <span className="text-sm font-medium">Custom Engraving</span>
          <span className="text-xs text-gold-600 font-medium">+₹{price}</span>
        </div>
        <button
          onClick={onToggle}
          className={cn(
            'relative w-11 h-6 rounded-full transition-colors duration-200',
            isEnabled ? 'bg-gold-500' : 'bg-charcoal-200 dark:bg-charcoal-700'
          )}
        >
          <motion.div
            animate={{ x: isEnabled ? 20 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
          />
        </button>
      </div>

      {isEnabled && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={text}
              onChange={(e) => onTextChange(e.target.value.slice(0, maxChars))}
              placeholder="Your text here..."
              maxLength={maxChars}
              className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
            />
            <span className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 text-xs',
              text.length >= maxChars ? 'text-error' : 'text-[var(--muted-foreground)]'
            )}>
              {text.length}/{maxChars}
            </span>
          </div>

          <div className="flex gap-2">
            {FONTS.map((f) => (
              <button
                key={f.value}
                onClick={() => onFontChange(f.value)}
                className={cn(
                  'flex-1 py-2 px-3 rounded-lg border text-xs transition-all',
                  font === f.value
                    ? 'border-gold-500 bg-gold-50 text-gold-700 dark:bg-gold-900/20 dark:text-gold-400'
                    : 'border-[var(--border)] hover:border-gold-300 text-[var(--muted-foreground)]'
                )}
              >
                <span className={f.style}>{f.label}</span>
              </button>
            ))}
          </div>

          {text && (
            <div className="bg-charcoal-900 rounded-xl p-4 text-center">
              <p className="text-xs text-charcoal-500 mb-2">Preview</p>
              <p className={cn(
                'text-gold-400 text-lg tracking-wider',
                font === 'Classic Serif' && 'font-serif',
                font === 'Modern Sans' && 'font-sans',
                font === 'Script Elegant' && 'italic font-serif text-xl',
              )}>
                {text}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
