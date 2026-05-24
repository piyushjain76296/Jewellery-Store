'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ShoppingBag, ArrowRight, Home, ChevronRight, Minus, Plus, Trash2, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/providers'
import { useState } from 'react'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const getSubtotal = useCartStore((s) => s.getSubtotal)
  const getGST = useCartStore((s) => s.getGST)
  const getTotal = useCartStore((s) => s.getTotal)
  
  const [couponCode, setCouponCodeInput] = useState('')

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="border-b border-[var(--border)] bg-[var(--card)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
              <Link href="/" className="hover:text-gold-600 transition-colors flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[var(--foreground)] font-medium">Shopping Bag</span>
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <div className="w-24 h-24 rounded-full bg-[var(--muted)] flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-[var(--muted-foreground)]" />
          </div>
          <h2 className="font-display text-3xl mb-4">Your bag is empty</h2>
          <p className="text-[var(--muted-foreground)] mb-8 max-w-sm mx-auto">
            Looks like you haven&apos;t added any items to your bag yet. Let&apos;s discover something beautiful.
          </p>
          <Link href="/shop" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-medium hover:from-gold-700 hover:to-gold-600 transition-all btn-glow inline-flex items-center gap-2">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-gold-600 transition-colors flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--foreground)] font-medium">Shopping Bag</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="font-display text-3xl sm:text-4xl mb-8">Shopping Bag ({items.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-[var(--border)] text-sm font-medium text-[var(--muted-foreground)]">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            {items.map((item, i) => (
              <motion.div
                key={item.variantId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-4 sm:py-6 border-b border-[var(--border)]"
              >
                {/* Product Info */}
                <div className="col-span-1 sm:col-span-6 flex gap-4">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gradient-to-br from-blush-100 to-ivory-200 dark:from-charcoal-800 dark:to-charcoal-700 flex items-center justify-center shrink-0 overflow-hidden">
                    <span className="text-4xl opacity-30">💎</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link href={`/shop/rings/${item.productSlug}`} className="font-medium text-base hover:text-gold-600 transition-colors mb-1 line-clamp-2">
                      {item.productName}
                    </Link>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">
                      {item.metalType.replace('_', ' ')} · {item.karat} · {item.weight}g
                    </p>
                    {item.engraving && <p className="text-xs text-gold-600 mb-1">✨ Engraved: &quot;{item.engraving}&quot;</p>}
                    <button onClick={() => removeItem(item.variantId)} className="text-xs text-error hover:underline flex items-center gap-1 mt-auto">
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                {/* Mobile Price & Quantity Group */}
                <div className="col-span-1 sm:hidden flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 border border-[var(--border)] rounded-lg">
                    <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-2 hover:bg-[var(--muted)] rounded-l-lg transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-2 hover:bg-[var(--muted)] rounded-r-lg transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <span className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</span>
                </div>

                {/* Desktop Quantity */}
                <div className="col-span-3 hidden sm:flex items-center justify-center">
                  <div className="flex items-center gap-1 border border-[var(--border)] rounded-lg">
                    <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-2 hover:bg-[var(--muted)] rounded-l-lg transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-2 hover:bg-[var(--muted)] rounded-r-lg transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Desktop Total */}
                <div className="col-span-3 hidden sm:flex flex-col items-end justify-center">
                  <span className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</span>
                  <span className="text-xs text-[var(--muted-foreground)] mt-1">{formatPrice(item.price)} each</span>
                </div>
              </motion.div>
            ))}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <ShieldCheck className="w-6 h-6 text-gold-500" />
                <span className="text-xs font-medium">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <Truck className="w-6 h-6 text-gold-500" />
                <span className="text-xs font-medium">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <RotateCcw className="w-6 h-6 text-gold-500" />
                <span className="text-xs font-medium">30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-6 shadow-sm">
              <h3 className="font-display text-xl">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Subtotal</span><span>{formatPrice(getSubtotal())}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">GST (3%)</span><span>{formatPrice(getGST())}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Shipping</span><span className="text-success font-medium">Free</span></div>
              </div>

              {/* Promo Code */}
              <div className="pt-4 border-t border-[var(--border)]">
                <p className="text-xs font-medium text-[var(--muted-foreground)] mb-2 uppercase tracking-wider">Promo Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                  />
                  <button className="px-4 py-2.5 rounded-lg border border-charcoal-800 text-sm font-medium hover:bg-[var(--muted)] transition-colors dark:border-charcoal-200">
                    Apply
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex justify-between items-end">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">Total Due</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">(Inclusive of all taxes)</p>
                </div>
                <span className="font-bold text-2xl">{formatPrice(getTotal())}</span>
              </div>

              <Link href="/checkout" className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-gold-700 hover:to-gold-600 transition-all btn-glow shadow-md">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Payment Methods */}
              <div className="flex justify-center gap-2 pt-2">
                {['VISA', 'MC', 'UPI', 'PayPal'].map(p => (
                  <span key={p} className="px-2 py-1 rounded border border-[var(--border)] text-[10px] font-semibold text-[var(--muted-foreground)]">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
