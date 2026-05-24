'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Diamond, Heart, Shield, Award, Gem, MapPin, Users, Leaf } from 'lucide-react'

const VALUES = [
  { icon: Gem, title: 'Master Craftsmanship', desc: 'Every piece is handcrafted by artisans with decades of experience in traditional Indian jewellery-making techniques.' },
  { icon: Shield, title: 'Certified Purity', desc: 'All our gold jewellery is BIS Hallmarked and diamonds come with IGI/GIA certification for guaranteed authenticity.' },
  { icon: Heart, title: 'Ethical Sourcing', desc: 'We source our gemstones and metals responsibly, ensuring fair wages and sustainable practices across our supply chain.' },
  { icon: Leaf, title: 'Sustainable Luxury', desc: 'Our packaging is 100% recyclable, and we offset our carbon footprint through verified environmental programmes.' },
]

const STATS = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '500+', label: 'Unique Designs' },
  { value: '50+', label: 'Master Artisans' },
  { value: '4.8★', label: 'Average Rating' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Diamond className="w-10 h-10 text-gold-400 mx-auto mb-6" strokeWidth={1} />
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory-100 mb-6">
              Our <span className="text-shimmer">Story</span>
            </h1>
            <p className="text-charcoal-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Born from a passion for timeless Indian craftsmanship and a vision to make luxury accessible, Lumière Jewels bridges heritage artistry with modern aesthetics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl mb-4">Elegance for Every Day</h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                We believe every woman deserves jewellery that tells her story. Whether it&apos;s a pair of lightweight gold studs for the office or a statement Kundan necklace for a wedding, every Lumière piece is designed to be worn, loved, and passed down.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Our collections are curated for the modern Indian woman — someone who values quality over quantity, meaning over trends, and authenticity over mass production.
              </p>
            </div>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blush-100 to-gold-100 dark:from-charcoal-800 dark:to-charcoal-700 flex items-center justify-center">
              <span className="text-8xl opacity-30">💎</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-display text-lg mb-2">{title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-charcoal-900 to-charcoal-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-3xl sm:text-4xl text-gold-400 mb-1">{stat.value}</p>
                <p className="text-sm text-charcoal-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Users className="w-8 h-8 text-gold-500 mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl mb-4">Meet Our Artisans</h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8">
            Behind every Lumière piece is a team of 50+ master artisans from Jaipur, Kolkata, and Kerala — custodians of techniques passed down through generations.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold hover:from-gold-700 hover:to-gold-600 transition-all btn-glow">
            Explore Our Collection
          </Link>
        </div>
      </section>
    </div>
  )
}
