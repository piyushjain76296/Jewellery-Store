'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/providers'
import Link from 'next/link'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const getSubtotal = useCartStore((s) => s.getSubtotal)
  const getGST = useCartStore((s) => s.getGST)
  const getTotal = useCartStore((s) => s.getTotal)
  const getTotalItems = useCartStore((s) => s.getTotalItems)
  const couponCode = useCartStore((s) => s.couponCode)
  const couponDiscount = useCartStore((s) => s.couponDiscount)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--background)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold-500" />
                <h2 className="font-display text-xl">Shopping Bag</h2>
                <span className="px-2 py-0.5 rounded-full bg-gold-100 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 text-xs font-bold">
                  {getTotalItems()}
                </span>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-[var(--muted-foreground)]" />
                  </div>
                  <p className="font-display text-lg mb-2">Your bag is empty</p>
                  <p className="text-sm text-[var(--muted-foreground)] mb-6">Discover our exquisite collection</p>
                  <Link href="/shop" onClick={onClose} className="px-6 py-2.5 rounded-lg bg-gold-500 text-white text-sm font-medium hover:bg-gold-600 transition-colors">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.variantId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="flex gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blush-100 to-ivory-200 dark:from-charcoal-800 dark:to-charcoal-700 flex items-center justify-center shrink-0">
                      <span className="text-2xl opacity-30">💎</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/rings/${item.productSlug}`} onClick={onClose} className="font-medium text-sm line-clamp-1 hover:text-gold-600 transition-colors">
                        {item.productName}
                      </Link>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {item.metalType.replace('_', ' ')} · {item.karat} · {item.weight}g
                      </p>
                      {item.engraving && (
                        <p className="text-xs text-gold-600 mt-0.5">✨ Engraved: &quot;{item.engraving}&quot;</p>
                      )}
                      {item.giftWrap && (
                        <p className="text-xs text-gold-600 mt-0.5">🎁 Gift wrapped</p>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 border border-[var(--border)] rounded-lg">
                          <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-1.5 hover:bg-[var(--muted)] rounded-l-lg transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-sm font-medium min-w-[24px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-1.5 hover:bg-[var(--muted)] rounded-r-lg transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button onClick={() => removeItem(item.variantId)} className="p-1.5 self-start hover:text-error transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[var(--border)] p-4 space-y-3 bg-[var(--card)]">
                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Subtotal</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">GST (3%)</span>
                    <span>{formatPrice(getGST())}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-success">
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{couponCode}</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-[var(--border)]">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-gold-700 hover:to-gold-600 transition-all btn-glow text-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <Link href="/cart" onClick={onClose} className="w-full py-2.5 text-center text-sm text-gold-600 hover:underline block">
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
