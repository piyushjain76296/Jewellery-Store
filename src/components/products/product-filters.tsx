'use client'

import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'

const FILTER_SECTIONS = [
  {
    key: 'metalType',
    label: 'Metal Type',
    options: [
      { value: 'GOLD', label: 'Gold', color: '#FFD700' },
      { value: 'ROSE_GOLD', label: 'Rose Gold', color: '#B76E79' },
      { value: 'SILVER', label: 'Silver', color: '#C0C0C0' },
      { value: 'PLATINUM', label: 'Platinum', color: '#E5E4E2' },
      { value: 'WHITE_GOLD', label: 'White Gold', color: '#FFFFF0' },
    ],
  },
  {
    key: 'karat',
    label: 'Purity',
    options: [
      { value: 'K14', label: '14K' },
      { value: 'K18', label: '18K' },
      { value: 'K22', label: '22K' },
      { value: 'K24', label: '24K' },
    ],
  },
  {
    key: 'stoneType',
    label: 'Stone',
    options: [
      { value: 'DIAMOND', label: 'Diamond' },
      { value: 'RUBY', label: 'Ruby' },
      { value: 'EMERALD', label: 'Emerald' },
      { value: 'SAPPHIRE', label: 'Sapphire' },
      { value: 'PEARL', label: 'Pearl' },
      { value: 'NONE', label: 'No Stone' },
    ],
  },
  {
    key: 'occasion',
    label: 'Occasion',
    options: [
      { value: 'Daily Wear', label: 'Daily Wear' },
      { value: 'Wedding', label: 'Wedding' },
      { value: 'Anniversary', label: 'Anniversary' },
      { value: 'Birthday', label: 'Birthday' },
      { value: 'Festive', label: 'Festive' },
      { value: 'Gifting', label: 'Gifting' },
      { value: 'Party', label: 'Party' },
    ],
  },
]

interface ActiveFilters {
  [key: string]: string[]
}

interface ProductFiltersProps {
  activeFilters: ActiveFilters
  onFilterChange: (filters: ActiveFilters) => void
  className?: string
}

export function ProductFilters({ activeFilters, onFilterChange, className }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['metalType', 'karat'])

  const toggleSection = (key: string) => {
    setExpandedSections(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  const toggleFilter = (section: string, value: string) => {
    const current = activeFilters[section] || []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onFilterChange({ ...activeFilters, [section]: updated })
  }

  const clearAll = () => onFilterChange({})

  const activeCount = Object.values(activeFilters).reduce((s, arr) => s + arr.length, 0)

  return (
    <div className={cn('space-y-1', className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-semibold text-sm">Filters</span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-gold-500 text-white text-xs font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-gold-600 hover:underline">
            Clear all
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2 py-3">
          {Object.entries(activeFilters).map(([section, values]) =>
            values.map(value => (
              <button
                key={`${section}-${value}`}
                onClick={() => toggleFilter(section, value)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 text-xs font-medium hover:bg-gold-200 transition-colors"
              >
                {value.replace('_', ' ')}
                <X className="w-3 h-3" />
              </button>
            ))
          )}
        </div>
      )}

      {/* Filter Sections */}
      {FILTER_SECTIONS.map((section) => {
        const isExpanded = expandedSections.includes(section.key)
        return (
          <div key={section.key} className="border-b border-[var(--border)]">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full flex items-center justify-between py-3 text-sm font-medium hover:text-gold-600 transition-colors"
            >
              {section.label}
              <ChevronDown className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} />
            </button>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="pb-3 space-y-2"
              >
                {section.options.map(option => {
                  const isActive = (activeFilters[section.key] || []).includes(option.value)
                  return (
                    <label key={option.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => toggleFilter(section.key, option.value)}
                        className="w-4 h-4 rounded border-[var(--border)] accent-gold-500"
                      />
                      {'color' in option && (
                        <span className="w-4 h-4 rounded-full border shadow-sm" style={{ backgroundColor: (option as any).color }} />
                      )}
                      <span className={cn('text-sm group-hover:text-gold-600 transition-colors', isActive ? 'font-medium' : 'text-[var(--muted-foreground)]')}>
                        {option.label}
                      </span>
                    </label>
                  )
                })}
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}
