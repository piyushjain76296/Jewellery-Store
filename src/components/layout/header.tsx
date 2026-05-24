'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  Diamond,
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronRight,
  Gem,
  Phone,
} from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/store/providers'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Gifts', href: '/gifts' },
  { label: 'About', href: '/about' },
] as const

const mobileMenuLinks = [
  { label: 'Shop All', href: '/shop', icon: Gem },
  { label: 'Collections', href: '/collections', icon: Diamond },
  { label: 'Gifts', href: '/gifts', icon: Heart },
  { label: 'About Us', href: '/about', icon: ChevronRight },
  { label: 'Contact', href: '/contact', icon: Phone },
] as const

/* ──────────────────────────────────────── Gold Price Ticker ── */
function GoldPriceTicker() {
  return (
    <div className="overflow-hidden bg-charcoal-900 py-1 dark:bg-charcoal-900">
      <div className="ticker-track flex whitespace-nowrap">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block animate-[marquee_28s_linear_infinite] px-8 text-xs tracking-wide text-gold-400"
            style={{ animationDelay: `${i * -9.33}s` }}
          >
            Gold 22K: ₹6,850/g ▲&nbsp;&nbsp;|&nbsp;&nbsp;Gold 24K: ₹7,200/g
            ▲&nbsp;&nbsp;|&nbsp;&nbsp;Silver: ₹85/g ▼&nbsp;&nbsp;|&nbsp;&nbsp;Platinum:
            ₹3,120/g ▲&nbsp;&nbsp;|&nbsp;&nbsp;Diamond (1ct IF): ₹4,25,000
            ▲&nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
        ))}
      </div>
      {/* inline keyframe for marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}

/* ──────────────────────────────────────────── Nav Link ── */
function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link href={href} className="group relative px-1 py-2">
      <span
        className={cn(
          'text-sm font-medium tracking-wide transition-colors',
          isActive
            ? 'text-gold-600 dark:text-gold-400'
            : 'text-charcoal-700 group-hover:text-gold-600 dark:text-ivory-200 dark:group-hover:text-gold-400'
        )}
      >
        {label}
      </span>
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gold-500"
        initial={false}
        animate={{ width: isActive ? '100%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />
      {/* Hover underline for non-active */}
      {!isActive && (
        <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-gold-300 transition-all duration-300 group-hover:w-full" />
      )}
    </Link>
  )
}

/* ─────────────────────────────────────── Icon Badge ── */
function IconBadge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold leading-none text-white"
        >
          {count > 9 ? '9+' : count}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

/* ──────────────────────────────────── Search Modal ── */
function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-[61] mx-auto max-w-2xl p-4 pt-24"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-elevated dark:bg-charcoal-800">
              <div className="flex items-center gap-3 border-b border-charcoal-100 px-5 dark:border-charcoal-700">
                <Search className="h-5 w-5 shrink-0 text-charcoal-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for rings, necklaces, earrings..."
                  className="h-14 w-full bg-transparent text-base text-charcoal-900 outline-none placeholder:text-charcoal-400 dark:text-ivory-100 dark:placeholder:text-charcoal-500"
                />
                <button
                  onClick={onClose}
                  className="shrink-0 rounded-lg p-1.5 text-charcoal-400 transition-colors hover:bg-charcoal-100 hover:text-charcoal-600 dark:hover:bg-charcoal-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500">
                  Popular searches
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Diamond Rings', 'Gold Necklaces', 'Earrings', 'Mangalsutra', 'Bracelets'].map(
                    (term) => (
                      <Link
                        key={term}
                        href={`/shop?search=${encodeURIComponent(term)}`}
                        onClick={onClose}
                        className="rounded-full border border-charcoal-200 px-3.5 py-1.5 text-xs font-medium text-charcoal-600 transition-all hover:border-gold-400 hover:bg-gold-50 hover:text-gold-700 dark:border-charcoal-600 dark:text-charcoal-300 dark:hover:border-gold-500 dark:hover:bg-gold-900/20 dark:hover:text-gold-400"
                      >
                        {term}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ────────────────────────────── Mobile Drawer ── */
function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  // Close drawer on route change
  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-sm flex-col bg-white shadow-elevated dark:bg-charcoal-900"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-charcoal-100 px-6 py-4 dark:border-charcoal-800">
              <div className="flex items-center gap-2">
                <Diamond className="h-5 w-5 text-gold-500" strokeWidth={1.5} />
                <span className="font-display text-xl font-semibold text-charcoal-900 dark:text-ivory-100">
                  Lumière
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-charcoal-500 transition-colors hover:bg-charcoal-100 hover:text-charcoal-700 dark:hover:bg-charcoal-800 dark:hover:text-ivory-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {mobileMenuLinks.map((link) => {
                  const Icon = link.icon
                  const isActive =
                    pathname === link.href || pathname.startsWith(link.href + '/')
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all',
                          isActive
                            ? 'bg-gold-50 text-gold-700 dark:bg-gold-900/20 dark:text-gold-400'
                            : 'text-charcoal-700 hover:bg-charcoal-50 dark:text-charcoal-200 dark:hover:bg-charcoal-800'
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                        {link.label}
                        <ChevronRight className="ml-auto h-4 w-4 text-charcoal-300 dark:text-charcoal-600" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <div className="border-t border-charcoal-100 p-6 dark:border-charcoal-800">
              <Link
                href="/account"
                className="btn-glow flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 py-3 text-sm font-semibold text-white transition-all hover:bg-gold-600"
              >
                <User className="h-4 w-4" />
                My Account
              </Link>
              <p className="mt-3 text-center text-xs text-charcoal-400 dark:text-charcoal-500">
                Free shipping on orders above ₹999
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ══════════════════════════════════ HEADER ══════════════════════════════════ */
export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const cartCount = useCartStore((s) => s.getTotalItems())
  const wishlistCount = useWishlistStore((s) => s.getTotalItems())

  // Listen to scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when drawer/search open
  useEffect(() => {
    document.body.style.overflow = drawerOpen || searchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen, searchOpen])

  return (
    <>
      {/* Gold price ticker */}
      <GoldPriceTicker />

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass shadow-soft'
            : 'bg-white/90 backdrop-blur-md dark:bg-charcoal-900/90'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
          {/* ─── Left: Logo ─── */}
          <Link href="/" className="group flex items-center gap-2.5">
            <Diamond
              className="h-7 w-7 text-gold-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              strokeWidth={1.5}
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold tracking-wide text-charcoal-900 dark:text-ivory-100 sm:text-2xl">
                Lumière
              </span>
              <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-gold-500 sm:text-[9px]">
                Jewels
              </span>
            </div>
          </Link>

          {/* ─── Center: Desktop nav ─── */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* ─── Right: Icons ─── */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="relative rounded-full p-2.5 text-charcoal-700 transition-colors hover:bg-charcoal-100 hover:text-gold-600 dark:text-ivory-200 dark:hover:bg-charcoal-800 dark:hover:text-gold-400"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative rounded-full p-2.5 text-charcoal-700 transition-colors hover:bg-charcoal-100 hover:text-gold-600 dark:text-ivory-200 dark:hover:bg-charcoal-800 dark:hover:text-gold-400"
              aria-label="Wishlist"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.8} />
              <IconBadge count={wishlistCount} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-full p-2.5 text-charcoal-700 transition-colors hover:bg-charcoal-100 hover:text-gold-600 dark:text-ivory-200 dark:hover:bg-charcoal-800 dark:hover:text-gold-400"
              aria-label="Cart"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />
              <IconBadge count={cartCount} />
            </Link>

            {/* Account (desktop) */}
            <Link
              href="/account"
              className="relative hidden rounded-full p-2.5 text-charcoal-700 transition-colors hover:bg-charcoal-100 hover:text-gold-600 dark:text-ivory-200 dark:hover:bg-charcoal-800 dark:hover:text-gold-400 sm:flex"
              aria-label="Account"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative rounded-full p-2.5 text-charcoal-700 transition-colors hover:bg-charcoal-100 hover:text-gold-600 dark:text-ivory-200 dark:hover:bg-charcoal-800 dark:hover:text-gold-400 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
