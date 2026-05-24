'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ChevronRight, Home, Diamond } from 'lucide-react'
import { mockCollections } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-gold-600 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--foreground)] font-medium">Collections</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Diamond className="w-8 h-8 text-gold-500 mx-auto mb-4" strokeWidth={1.5} />
          <h1 className="font-display text-4xl sm:text-5xl mb-4">Curated Collections</h1>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
            Discover our masterfully curated collections, each telling a unique story of heritage, romance, and everyday elegance.
          </p>
        </motion.div>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="space-y-16">
          {mockCollections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className={cn(
                'flex flex-col gap-8 md:gap-16 items-center',
                i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              )}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <Link href={`/shop?collection=${col.slug}`} className="block group">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-charcoal-800 to-charcoal-900">
                    <div className={cn(
                      'absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60',
                      i === 0 ? 'bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.4),transparent)]' :
                      i === 1 ? 'bg-[radial-gradient(ellipse_at_50%_50%,rgba(183,110,121,0.4),transparent)]' :
                      'bg-[radial-gradient(ellipse_at_50%_50%,rgba(229,228,226,0.4),transparent)]'
                    )} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-30 transform group-hover:scale-110 transition-transform duration-700">
                        {i === 0 ? '💍' : i === 1 ? '🪔' : '✨'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="max-w-lg">
                  <h2 className="font-display text-4xl sm:text-5xl mb-6">{col.name}</h2>
                  <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-8">
                    {col.description}
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      'Handcrafted by master artisans',
                      'Certified pure metals and stones',
                      'Lifetime warranty on craftsmanship'
                    ].map(feature => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-[var(--foreground)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/shop?collection=${col.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-charcoal-900 text-white font-medium hover:bg-gold-600 transition-colors dark:bg-ivory-100 dark:text-charcoal-900 dark:hover:bg-gold-500 dark:hover:text-white"
                  >
                    Explore Collection <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
