'use client'

import { signOut } from 'next-auth/react'
import { motion } from 'motion/react'
import { User, Package, MapPin, Settings, LogOut, ChevronRight, CheckCircle2, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { updateProfile } from '@/actions/account'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils'
import type { Session } from 'next-auth'

type OrderType = {
  id: string
  orderNumber: string
  status: string
  total: any
  createdAt: Date
  items: { quantity: number; variant: { product: { name: string } } }[]
}

type AddressType = {
  id: string
  line1: string
  line2: string | null
  city: string
  state: string
  pincode: string
  phone: string
}

interface ClientPageProps {
  session: Session
  orders: OrderType[]
  addresses: AddressType[]
}

export default function AccountClientPage({ session, orders, addresses }: ClientPageProps) {
  const [activeTab, setActiveTab] = useState('orders')
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState(session.user.name || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUpdateProfile = async () => {
    if (!name) return toast.error('Name is required')
    setLoading(true)
    const res = await updateProfile(name)
    if (res.success) {
      toast.success('Profile updated successfully')
    } else {
      toast.error(res.error || 'Failed to update profile')
    }
    setLoading(false)
  }

  const TABS = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'profile', label: 'Profile Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-20 h-20 rounded-full bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center text-2xl font-display text-gold-700 dark:text-gold-400">
            {session.user.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="font-display text-3xl mb-1">Welcome back, {session.user.name?.split(' ')[0] || 'User'}</h1>
            <p className="text-[var(--muted-foreground)]">{session.user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold-50 text-gold-700 dark:bg-gold-900/20 dark:text-gold-400 font-medium'
                    : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
            <div className="my-4 border-t border-[var(--border)]" />
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 sm:p-8 min-h-[400px]"
            >
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-display text-2xl mb-6">Recent Orders</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-[var(--muted-foreground)]">
                      <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>No orders yet. Your future purchases will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="border border-[var(--border)] rounded-xl p-5 hover:border-gold-300 transition-colors">
                          <div className="flex justify-between items-start mb-4 pb-4 border-b border-[var(--border)]">
                            <div>
                              <p className="font-medium">Order {order.orderNumber}</p>
                              <p className="text-xs text-[var(--muted-foreground)]">
                                Placed on {mounted ? new Date(order.createdAt).toLocaleDateString() : ''}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gold-700 dark:text-gold-400">{formatPrice(Number(order.total))}</p>
                              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--muted)]">
                                {order.status === 'DELIVERED' ? <CheckCircle2 className="w-3 h-3 text-success" /> : <Clock className="w-3 h-3" />}
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <p key={idx} className="text-sm">
                                <span className="text-[var(--muted-foreground)]">{item.quantity}x</span> {item.variant.product.name}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'addresses' && (
                <div>
                  <h2 className="font-display text-2xl mb-6">Saved Addresses</h2>
                  {addresses.length === 0 ? (
                    <div className="text-center py-12 text-[var(--muted-foreground)]">
                      <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>You haven&apos;t saved any addresses yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map(address => (
                        <div key={address.id} className="border border-[var(--border)] rounded-xl p-5 relative">
                          <div className="absolute top-4 right-4 bg-gold-100 text-gold-700 dark:bg-gold-900/20 dark:text-gold-400 text-[10px] px-2 py-1 rounded font-medium">HOME</div>
                          <p className="font-medium text-sm mb-2">{session.user.name}</p>
                          <p className="text-sm text-[var(--muted-foreground)] mb-1">{address.line1}</p>
                          {address.line2 && <p className="text-sm text-[var(--muted-foreground)] mb-1">{address.line2}</p>}
                          <p className="text-sm text-[var(--muted-foreground)] mb-3">{address.city}, {address.state} - {address.pincode}</p>
                          <p className="text-sm font-medium">📞 {address.phone}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="font-display text-2xl mb-6">Profile Settings</h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-[var(--foreground)]">Full Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-[var(--foreground)]">Email</label>
                      <input type="email" defaultValue={session.user.email || ''} disabled className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--muted)] text-sm opacity-70 cursor-not-allowed" />
                    </div>
                    <button onClick={handleUpdateProfile} disabled={loading} className="px-6 py-3 rounded-xl bg-charcoal-900 text-white text-sm font-medium hover:bg-charcoal-800 transition-colors dark:bg-ivory-100 dark:text-charcoal-900 mt-4 disabled:opacity-50">
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
