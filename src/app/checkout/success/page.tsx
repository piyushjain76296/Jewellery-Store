'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/providers'
import { useEffect } from 'react'

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  const orderNumber = `JWL-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-success" />
        </motion.div>

        <h1 className="font-display text-3xl mb-2">Order Confirmed!</h1>
        <p className="text-[var(--muted-foreground)] mb-6">
          Thank you for your purchase. Your jewellery is being prepared with care.
        </p>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] mb-6">
          <p className="text-sm text-[var(--muted-foreground)]">Order Number</p>
          <p className="font-mono font-bold text-lg text-gold-600">{orderNumber}</p>
          <div className="mt-3 flex items-center gap-2 justify-center text-sm text-[var(--muted-foreground)]">
            <Package className="w-4 h-4" />
            <span>Estimated delivery: {new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        <p className="text-sm text-[var(--muted-foreground)] mb-6">
          A confirmation email has been sent with your order details and care instructions.
        </p>

        <div className="flex gap-3">
          <Link href="/shop" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-medium text-sm hover:from-gold-700 hover:to-gold-600 transition-all btn-glow flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
