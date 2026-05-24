'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MapPin, CreditCard, Truck, ChevronRight, Home, Shield, Check, Loader2 } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/providers'
import { createOrder, getSavedAddresses } from '@/actions/checkout'

type Step = 'address' | 'review' | 'payment'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const getSubtotal = useCartStore((s) => s.getSubtotal)
  const getGST = useCartStore((s) => s.getGST)
  const getTotal = useCartStore((s) => s.getTotal)
  const couponDiscount = useCartStore((s) => s.couponDiscount)
  const clearCart = useCartStore((s) => s.clearCart)

  const [step, setStep] = useState<Step>('address')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [savedAddresses, setSavedAddresses] = useState<any[]>([])

  useEffect(() => {
    getSavedAddresses().then(setSavedAddresses)
  }, [])

  const [address, setAddress] = useState({
    name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: ''
  })

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'paypal' | 'cod'>('razorpay')

  const steps: { key: Step; label: string; icon: typeof MapPin }[] = [
    { key: 'address', label: 'Address', icon: MapPin },
    { key: 'review', label: 'Review', icon: Truck },
    { key: 'payment', label: 'Payment', icon: CreditCard },
  ]

  const handlePlaceOrder = async () => {
    setError(null)
    setLoading(true)
    
    const res = await createOrder({
      items: items.map(i => ({ variantId: i.variantId, productId: i.productId, productName: i.productName, quantity: i.quantity, price: i.price })),
      address,
      paymentMethod,
      subtotal: getSubtotal(),
      tax: getGST(),
      shippingCharge: 0,
      total: getTotal() + (paymentMethod === 'cod' ? 50 : 0)
    })

    if (res.success) {
      clearCart()
      router.push(`/checkout/success?orderId=${res.orderId}`)
    } else {
      setError(res.error || 'Failed to place order')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <h2 className="font-display text-2xl mb-4">Your cart is empty</h2>
          <Link href="/shop" className="px-6 py-3 rounded-xl bg-gold-500 text-white font-medium hover:bg-gold-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-gold-600 flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--foreground)] font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-center gap-0 mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <button
                onClick={() => setStep(s.key)}
                className={cn('flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                  step === s.key ? 'bg-gold-500 text-white shadow-gold' :
                  steps.indexOf(steps.find(st => st.key === step)!) > i ? 'bg-gold-100 text-gold-700 dark:bg-gold-900/20 dark:text-gold-400' :
                  'bg-[var(--muted)] text-[var(--muted-foreground)]'
                )}
              >
                <s.icon className="w-4 h-4" /> {s.label}
              </button>
              {i < steps.length - 1 && <div className="w-8 h-px bg-[var(--border)] mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {step === 'address' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <h2 className="font-display text-2xl mb-4">Delivery Address</h2>

                {savedAddresses.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-3">Saved Addresses</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {savedAddresses.map((addr) => (
                        <button
                          key={addr.id}
                          onClick={() => setAddress({
                            name: address.name, // keep current typed name or let them type
                            phone: addr.phone,
                            line1: addr.line1,
                            line2: addr.line2 || '',
                            city: addr.city,
                            state: addr.state,
                            pincode: addr.pincode
                          })}
                          className="text-left p-3 rounded-lg border border-[var(--border)] hover:border-gold-300 transition-colors bg-[var(--card)] relative"
                        >
                          <p className="text-sm font-medium">{addr.label || 'Home'}</p>
                          <p className="text-xs text-[var(--muted-foreground)] mt-1 truncate">{addr.line1}</p>
                          <p className="text-xs text-[var(--muted-foreground)] truncate">{addr.city}, {addr.pincode}</p>
                        </button>
                      ))}
                    </div>
                    <div className="my-6 border-t border-[var(--border)] relative">
                      <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-[var(--card)] px-3 text-xs text-[var(--muted-foreground)]">or enter new</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                    <input type="text" value={address.name} onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500" placeholder="Priya Sharma" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                    <input type="tel" value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Address Line 1</label>
                  <input type="text" value={address.line1} onChange={e => setAddress(a => ({ ...a, line1: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500" placeholder="Flat/House No., Building" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Address Line 2</label>
                  <input type="text" value={address.line2} onChange={e => setAddress(a => ({ ...a, line2: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500" placeholder="Street, Area, Landmark" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">City</label>
                    <input type="text" value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500" placeholder="Mumbai" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">State</label>
                    <input type="text" value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500" placeholder="Maharashtra" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Pincode</label>
                    <input type="text" value={address.pincode} onChange={e => setAddress(a => ({ ...a, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))} maxLength={6} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500" placeholder="400001" />
                  </div>
                </div>
                <button onClick={() => setStep('review')} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold hover:from-gold-700 hover:to-gold-600 transition-all btn-glow mt-4">
                  Continue to Review
                </button>
              </motion.div>
            )}

            {step === 'review' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-display text-2xl mb-4">Review Order</h2>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.variantId} className="flex gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blush-100 to-ivory-200 dark:from-charcoal-800 dark:to-charcoal-700 flex items-center justify-center shrink-0">
                        <span className="text-xl opacity-30">💎</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.productName}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{item.metalType.replace('_', ' ')} · {item.karat} · Qty: {item.quantity}</p>
                        {item.engraving && <p className="text-xs text-gold-600">✨ &quot;{item.engraving}&quot;</p>}
                      </div>
                      <p className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                {address.name && (
                  <div className="mt-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <p className="text-sm font-medium mb-1">Delivering to:</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{address.name}, {address.line1}, {address.city}, {address.state} - {address.pincode}</p>
                  </div>
                )}
                <button onClick={() => setStep('payment')} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold hover:from-gold-700 hover:to-gold-600 transition-all btn-glow mt-4">
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-display text-2xl mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { key: 'razorpay' as const, label: 'Razorpay', desc: 'UPI, Cards, Net Banking, Wallets, EMI', icon: '💳' },
                    { key: 'paypal' as const, label: 'PayPal', desc: 'International payments', icon: '🌍' },
                    { key: 'cod' as const, label: 'Cash on Delivery', desc: '+₹50 handling fee · OTP verification', icon: '💵' },
                  ].map(method => (
                    <button
                      key={method.key}
                      onClick={() => setPaymentMethod(method.key)}
                      className={cn(
                        'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                        paymentMethod === method.key ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/10' : 'border-[var(--border)] hover:border-gold-300'
                      )}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{method.label}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{method.desc}</p>
                      </div>
                      {paymentMethod === method.key && (
                        <div className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-xl bg-gold-50 dark:bg-gold-900/10 flex items-center gap-2 text-sm text-gold-700 dark:text-gold-400">
                  <Shield className="w-4 h-4 shrink-0" />
                  Your payment is secured with 256-bit SSL encryption
                </div>
                {error && (
                  <div className="mt-4 p-3 rounded-lg bg-error/10 text-error text-sm font-medium border border-error/20">
                    {error}
                  </div>
                )}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold hover:from-gold-700 hover:to-gold-600 transition-all btn-glow mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Place Order · {formatPrice(getTotal())}</>}
                </button>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-4">
              <h3 className="font-display text-lg">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Items ({items.length})</span><span>{formatPrice(getSubtotal())}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">GST (3%)</span><span>{formatPrice(getGST())}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Shipping</span><span className="text-success font-medium">Free</span></div>
                {couponDiscount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(couponDiscount)}</span></div>}
                {paymentMethod === 'cod' && <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">COD Fee</span><span>₹50</span></div>}
              </div>
              <div className="border-t border-[var(--border)] pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-lg">{formatPrice(getTotal() + (paymentMethod === 'cod' ? 50 : 0))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
