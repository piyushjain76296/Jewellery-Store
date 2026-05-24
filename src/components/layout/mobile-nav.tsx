'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { House, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/store/providers'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Shop', href: '/shop', icon: LayoutGrid },
  { label: 'Wishlist', href: '/wishlist', icon: Heart, badge: 'wishlist' as const },
  { label: 'Cart', href: '/cart', icon: ShoppingBag, badge: 'cart' as const },
  { label: 'Profile', href: '/account', icon: User },
] as const

export function MobileNav() {
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.getTotalItems())
  const wishlistCount = useWishlistStore((s) => s.getTotalItems())
  
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  const getBadge = (type?: 'cart' | 'wishlist') => {
    if (type === 'cart') return cartCount
    if (type === 'wishlist') return wishlistCount
    return 0
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      {/* Glassmorphism background */}
      <div className="glass border-t border-white/10 dark:border-charcoal-800">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            const badgeCount = getBadge((item as any).badge)

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5 transition-colors duration-200',
                        isActive
                          ? 'text-gold-500'
                          : 'text-charcoal-500 dark:text-charcoal-400'
                      )}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </motion.div>

                  {/* Badge */}
                  {isMounted && badgeCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-2 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold-500 text-[8px] font-bold leading-none text-white"
                    >
                      {badgeCount > 9 ? '9+' : badgeCount}
                    </motion.span>
                  )}
                </div>

                <span
                  className={cn(
                    'text-[10px] font-medium transition-colors duration-200',
                    isActive
                      ? 'text-gold-500'
                      : 'text-charcoal-500 dark:text-charcoal-400'
                  )}
                >
                  {item.label}
                </span>

                {/* Active dot indicator */}
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className="absolute -bottom-1 h-1 w-1 rounded-full bg-gold-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
