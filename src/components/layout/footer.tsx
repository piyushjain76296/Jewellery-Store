'use client'

import Link from 'next/link'
import {
  Diamond,
  Send,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Gem,
  CreditCard,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* ─── Data ─── */
const quickLinks = [
  { label: 'Shop All', href: '/shop' },
  { label: 'New Arrivals', href: '/shop?sort=newest' },
  { label: 'Bestsellers', href: '/shop?sort=bestsellers' },
  { label: 'Gift Cards', href: '/gift-cards' },
  { label: 'Blog', href: '/blog' },
]

const helpLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping & Returns', href: '/shipping-returns' },
  { label: 'Ring Size Guide', href: '/ring-size-guide' },
  { label: 'Care Instructions', href: '/care-instructions' },
  { label: 'FAQ', href: '/faq' },
]

const trustBadges = [
  { icon: ShieldCheck, label: 'BIS Hallmark' },
  { icon: Award, label: 'IGI Certified' },
  { icon: Gem, label: '925 Sterling' },
  { icon: Truck, label: 'Free Ship ₹999+' },
  { icon: RotateCcw, label: '30-Day Returns' },
]

const socialLinks = [
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    label: 'Instagram',
    href: '#',
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    label: 'Facebook',
    href: '#',
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    label: 'X (Twitter)',
    href: '#',
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 4.99 3.657 9.128 8.438 9.878-.117-.942-.222-2.392.047-3.42.242-.925 1.563-6.03 1.563-6.03s-.399-.797-.399-1.974c0-1.85 1.073-3.231 2.407-3.231 1.135 0 1.684.852 1.684 1.873 0 1.14-.727 2.844-1.102 4.425-.313 1.324.665 2.403 1.973 2.403 2.368 0 4.189-2.497 4.189-6.098 0-3.19-2.292-5.418-5.566-5.418-3.792 0-6.017 2.844-6.017 5.782 0 1.145.441 2.373.992 3.04a.398.398 0 01.092.381c-.101.422-.327 1.324-.371 1.509-.058.242-.192.293-.443.177-1.654-.77-2.689-3.19-2.689-5.136 0-4.184 3.04-8.025 8.769-8.025 4.603 0 8.182 3.28 8.182 7.665 0 4.573-2.883 8.252-6.884 8.252-1.344 0-2.608-.698-3.04-1.524 0 0-.665 2.531-.826 3.152-.299 1.152-1.107 2.595-1.649 3.475A12.003 12.003 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
    label: 'Pinterest',
    href: '#',
  },
]

/* ─── Newsletter Form ─── */
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <div className="flex overflow-hidden rounded-full border border-charcoal-700 transition-colors focus-within:border-gold-500">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-ivory-100 outline-none placeholder:text-charcoal-500"
        />
        <button
          type="submit"
          className="group flex items-center gap-1.5 bg-gold-500 px-5 text-sm font-semibold text-white transition-all hover:bg-gold-600"
        >
          <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      <AnimatePresence>
        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-success"
          >
            ✓ You&apos;re subscribed! Check your inbox for ₹500 off.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

/* ═══════════════════════════════════ FOOTER ═══════════════════════════════ */
export function Footer() {
  return (
    <>
      <footer className="bg-charcoal-900 text-ivory-200 pb-24 lg:pb-0">
        {/* ─── Trust badges ─── */}
        <div className="border-b border-charcoal-800">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-6 sm:gap-10 sm:px-6 lg:justify-between lg:px-8">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-charcoal-300">
                <badge.icon className="h-5 w-5 text-gold-500" strokeWidth={1.5} />
                <span className="text-xs font-medium tracking-wide">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Main footer grid ─── */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Column 1: Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="group inline-flex items-center gap-2.5">
                <Diamond
                  className="h-7 w-7 text-gold-500 transition-transform duration-300 group-hover:rotate-12"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col leading-none">
                  <span className="font-display text-xl font-semibold tracking-wide text-ivory-100">
                    Lumière
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-gold-500">
                    Jewels
                  </span>
                </div>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal-400">
                Crafting timeless elegance since 1987. Every piece tells a story of artistry,
                heritage, and uncompromising quality.
              </p>
              {/* Social icons */}
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-700 text-charcoal-400 transition-all hover:border-gold-500 hover:bg-gold-500/10 hover:text-gold-400"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal-400 transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Help & Info */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                Help & Info
              </h3>
              <ul className="mt-4 space-y-2.5">
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal-400 transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                Stay in Touch
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-400">
                Subscribe and get{' '}
                <span className="font-semibold text-gold-400">₹500 off</span> your first order.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="border-t border-charcoal-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
            <p className="text-xs text-charcoal-500">
              © {new Date().getFullYear()} Lumière Jewels. All rights reserved.
            </p>
            {/* Payment icons */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Visa', text: 'VISA' },
                { label: 'Mastercard', text: 'MC' },
                { label: 'UPI', text: 'UPI' },
                { label: 'Razorpay', text: 'R·pay' },
                { label: 'PayPal', text: 'PayPal' },
              ].map((method) => (
                <span
                  key={method.label}
                  className="flex h-7 items-center rounded border border-charcoal-700 bg-charcoal-800/50 px-2 text-[10px] font-semibold tracking-wide text-charcoal-400"
                  title={method.label}
                >
                  {method.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── WhatsApp floating button ─── */}
      <a
        href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20my%20jewellery%20order"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={cn(
          'fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 lg:bottom-6',
          'bg-[#25D366] text-white'
        )}
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2} />
      </a>
    </>
  )
}
