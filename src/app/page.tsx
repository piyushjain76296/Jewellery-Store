'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Star, Shield, Award, Truck, RotateCcw, Diamond, Sparkles, ChevronRight, Mail } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { ProductCard } from '@/components/products/product-card'
import { mockProducts, mockCategories, mockCollections, getFeaturedProducts, getNewArrivals } from '@/lib/mock-data'
import { useState } from 'react'

const OCCASIONS = [
  { name: 'Wedding', emoji: '💍', gradient: 'from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20' },
  { name: 'Birthday', emoji: '🎂', gradient: 'from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20' },
  { name: 'Anniversary', emoji: '❤️', gradient: 'from-red-100 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20' },
  { name: 'Daily Wear', emoji: '✨', gradient: 'from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20' },
  { name: 'Festive', emoji: '🪔', gradient: 'from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20' },
  { name: 'Gifting', emoji: '🎁', gradient: 'from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20' },
]

const TRUST_BADGES = [
  { icon: Shield, label: 'BIS Hallmarked', desc: '100% certified purity' },
  { icon: Award, label: 'IGI Certified', desc: 'International grading' },
  { icon: Truck, label: 'Free Shipping', desc: 'On orders above ₹999' },
  { icon: RotateCcw, label: '30-Day Returns', desc: 'Hassle-free returns' },
]

export default function HomePage() {
  const featured = getFeaturedProducts()
  const newArrivals = getNewArrivals()
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(201,168,76,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(183,110,121,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(201,168,76,0.08),transparent_50%)]" />

        {/* Floating diamond decorations */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[20%] right-[15%] text-gold-400/20 text-6xl hidden lg:block">
          💎
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-[30%] left-[10%] text-gold-400/10 text-4xl hidden lg:block">
          ✦
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-2 mb-6">
                <Diamond className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                <span className="text-gold-400 text-sm tracking-[0.2em] uppercase font-medium">Lumière Jewels</span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-ivory-100 leading-[1.1] mb-6">
                Wear Your<br />
                <span className="text-shimmer">Story</span>
              </h1>
              <p className="text-charcoal-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
                Handcrafted Indian jewellery for the modern woman. From daily elegance to bridal dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold hover:from-gold-700 hover:to-gold-600 transition-all btn-glow text-sm sm:text-base">
                  Shop Collection <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/shop?collection=wedding-season" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-gold-400/30 text-gold-300 font-semibold hover:border-gold-400 hover:bg-gold-400/5 transition-all text-sm sm:text-base">
                  Wedding Edit
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-[var(--border)] bg-[var(--card)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_BADGES.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Drops */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl mb-3">Shop by Collection</h2>
            <p className="text-[var(--muted-foreground)]">Curated for every occasion and mood</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockCollections.map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link href={`/shop?collection=${col.slug}`} className="block group relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 to-charcoal-900" />
                  <div className={cn(
                    'absolute inset-0 opacity-30',
                    i === 0 ? 'bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.3),transparent)]' :
                    i === 1 ? 'bg-[radial-gradient(ellipse_at_50%_50%,rgba(183,110,121,0.3),transparent)]' :
                    'bg-[radial-gradient(ellipse_at_50%_50%,rgba(229,228,226,0.3),transparent)]'
                  )} />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <span className="text-6xl mb-3 opacity-60">
                      {i === 0 ? '💍' : i === 1 ? '🪔' : '✨'}
                    </span>
                    <h3 className="font-display text-2xl text-white mb-1">{col.name}</h3>
                    <p className="text-sm text-white/70 mb-3">{col.description}</p>
                    <span className="text-gold-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl mb-3">Shop by Category</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mockCategories.slice(0, 8).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/shop/${cat.slug}`} className="block group text-center">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-blush-100 to-ivory-200 dark:from-charcoal-800 dark:to-charcoal-700 flex items-center justify-center mb-3 group-hover:shadow-gold transition-shadow duration-300 overflow-hidden">
                    <span className="text-5xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300">
                      {['💍', '📿', '👂', '⌚', '🔮', '📿', '⛓️', '🦶'][i] || '💎'}
                    </span>
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-gold-600 transition-colors">{cat.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl mb-1">Bestsellers</h2>
              <p className="text-[var(--muted-foreground)] text-sm">Most loved by our customers</p>
            </div>
            <Link href="/shop" className="text-sm text-gold-600 hover:text-gold-700 flex items-center gap-1 font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Occasion Shop */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl mb-3">Shop by Occasion</h2>
            <p className="text-[var(--muted-foreground)]">Find the perfect piece for every moment</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {OCCASIONS.map((occ, i) => (
              <motion.div
                key={occ.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/shop?occasion=${occ.name}`} className="block group">
                  <div className={cn('aspect-square rounded-2xl bg-gradient-to-br flex flex-col items-center justify-center gap-2 group-hover:shadow-lg transition-all duration-300', occ.gradient)}>
                    <span className="text-4xl group-hover:scale-110 transition-transform">{occ.emoji}</span>
                    <span className="font-medium text-sm">{occ.name}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-gold-500" />
                <span className="text-sm text-gold-600 font-medium uppercase tracking-wider">Just Dropped</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl">New Arrivals</h2>
            </div>
            <Link href="/shop?sort=newest" className="text-sm text-gold-600 hover:text-gold-700 flex items-center gap-1 font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Gifting Banner */}
      <section className="py-16 bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-5xl mb-4 block">🎁</span>
              <h2 className="font-display text-3xl sm:text-4xl text-ivory-100 mb-4">Gift Something Special</h2>
              <p className="text-charcoal-400 mb-8">Premium gift wrapping, personal engraving, and handwritten cards. Make every gift unforgettable.</p>
              <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold hover:from-gold-700 hover:to-gold-600 transition-all btn-glow">
                Explore Gift Guide <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-lg mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Mail className="w-8 h-8 text-gold-500 mx-auto mb-4" />
              <h2 className="font-display text-3xl mb-3">Stay in the Glow</h2>
              <p className="text-[var(--muted-foreground)] text-sm mb-6">Subscribe for exclusive drops, early access to sales, and get <span className="text-gold-600 font-semibold">₹500 off</span> your first order.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                />
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-medium text-sm hover:from-gold-700 hover:to-gold-600 transition-all btn-glow shrink-0">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] mt-3">No spam, unsubscribe anytime.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
