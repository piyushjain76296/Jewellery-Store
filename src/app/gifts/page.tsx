'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Gift, Heart, ArrowRight, Home, ChevronRight, Check } from 'lucide-react'
import { getFeaturedProducts } from '@/lib/mock-data'
import { ProductCard } from '@/components/products/product-card'

const GIFT_GUIDES = [
  { id: 'anniversary', title: 'For Anniversaries', desc: 'Celebrate milestones with diamond rings and platinum bands.', emoji: '🥂' },
  { id: 'birthday', title: 'Birthday Surprises', desc: 'Personalized pendants and birthstone rings they&apos;ll cherish.', emoji: '🎂' },
  { id: 'wedding', title: 'Bridal Trousseau', desc: 'Heavy Kundan sets and heritage Polki necklaces for the big day.', emoji: '👰' },
  { id: 'daily', title: 'Just Because', desc: 'Lightweight, elegant pieces perfect for daily office wear.', emoji: '✨' },
]

export default function GiftsPage() {
  const featuredGifts = getFeaturedProducts().slice(0, 8)

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
            <span className="text-[var(--foreground)] font-medium">Gifting</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(183,110,121,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-full bg-gold-900/40 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory-100 mb-6">
              The Art of <span className="text-shimmer">Gifting</span>
            </h1>
            <p className="text-charcoal-400 text-lg max-w-2xl mx-auto mb-8">
              Find the perfect expression of your love. Every Lumière gift comes beautifully packaged with a personalized message and our signature premium unboxing experience.
            </p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold hover:from-gold-700 hover:to-gold-600 transition-all btn-glow">
              Shop All Gifts <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Curated Guides */}
      <section className="py-16 sm:py-20 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl mb-4">Shop by Occasion</h2>
            <p className="text-[var(--muted-foreground)]">Curated selections to help you find the perfect piece.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GIFT_GUIDES.map((guide, i) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-gold-500/50 transition-colors cursor-pointer"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{guide.emoji}</div>
                <h3 className="font-display text-xl mb-2">{guide.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">{guide.desc}</p>
                <span className="text-sm font-medium text-gold-600 group-hover:text-gold-700 flex items-center gap-1">
                  Explore <ChevronRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gifts */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl mb-2">Most Loved Gifts</h2>
              <p className="text-[var(--muted-foreground)]">Pieces that never fail to impress.</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredGifts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* The Unboxing Experience */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-ivory-100 to-ivory-200 dark:from-charcoal-800 dark:to-charcoal-900 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.3),transparent_70%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heart className="w-10 h-10 text-gold-500 mb-6" />
              <h2 className="font-display text-4xl sm:text-5xl mb-6">The Lumière Unboxing Experience</h2>
              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
                Every gift order includes our signature packaging designed to create a moment of pure magic.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Premium velvet jewelry box',
                  'Handwritten personalized message card',
                  'Authenticity certificates & care guide',
                  'Satin ribbon wrapping'
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 font-medium text-[var(--foreground)]"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-gold-600" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <button className="px-8 py-3.5 rounded-xl border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-semibold hover:bg-gold-50 dark:hover:bg-gold-900/10 transition-colors">
                Learn More
              </button>
            </div>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-blush-100 to-ivory-300 dark:from-charcoal-700 dark:to-charcoal-800 flex items-center justify-center shadow-elevated">
              <span className="text-8xl opacity-30">🎁</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
