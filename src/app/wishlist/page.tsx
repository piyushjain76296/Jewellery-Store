'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Heart, ShoppingBag, Trash2, Home, ChevronRight } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { useWishlistStore } from '@/store/providers'

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items)
  const removeItem = useWishlistStore((s) => s.removeItem)

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-gold-600 transition-colors flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--foreground)] font-medium">Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl sm:text-4xl mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-gold-500" /> My Wishlist
          </h1>
          <p className="text-[var(--muted-foreground)]">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
        </motion.div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-[var(--muted-foreground)]" />
            </div>
            <h3 className="font-display text-xl mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">Save items you love for later</p>
            <Link href="/shop" className="px-8 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-medium hover:from-gold-700 hover:to-gold-600 transition-all btn-glow">
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {items.map((item, i) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--card)]"
              >
                <Link href={`/shop/rings/${item.productSlug}`}>
                  <div className="aspect-square bg-gradient-to-br from-blush-100 to-ivory-200 dark:from-charcoal-800 dark:to-charcoal-700 flex items-center justify-center">
                    <span className="text-6xl opacity-20">💎</span>
                  </div>
                </Link>
                <div className="p-3 space-y-2">
                  <p className="font-medium text-sm line-clamp-1">{item.productName}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{item.metalType.replace('_', ' ')}</p>
                  <p className="font-bold text-sm">{formatPrice(item.price)}</p>
                  <div className="flex gap-2 pt-1">
                    <Link href={`/shop/rings/${item.productSlug}`} className="flex-1 py-2 rounded-lg bg-gold-500 text-white text-xs font-medium text-center hover:bg-gold-600 transition-colors flex items-center justify-center gap-1">
                      <ShoppingBag className="w-3 h-3" /> Shop Now
                    </Link>
                    <button onClick={() => removeItem(item.productId)} className="p-2 rounded-lg border border-[var(--border)] hover:border-error hover:text-error transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
