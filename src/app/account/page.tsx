'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { User, Package, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading' || status === 'unauthenticated') {
    return <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">Loading...</div>
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
            {session?.user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="font-display text-3xl mb-1">Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}</h1>
            <p className="text-[var(--muted-foreground)]">{session?.user?.email}</p>
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
                  <div className="text-center py-12 text-[var(--muted-foreground)]">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No orders yet. Your future purchases will appear here.</p>
                  </div>
                </div>
              )}
              {activeTab === 'addresses' && (
                <div>
                  <h2 className="font-display text-2xl mb-6">Saved Addresses</h2>
                  <div className="text-center py-12 text-[var(--muted-foreground)]">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>You haven&apos;t saved any addresses yet.</p>
                  </div>
                </div>
              )}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="font-display text-2xl mb-6">Profile Settings</h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-[var(--foreground)]">Full Name</label>
                      <input type="text" defaultValue={session?.user?.name || ''} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-[var(--foreground)]">Email</label>
                      <input type="email" defaultValue={session?.user?.email || ''} disabled className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--muted)] text-sm opacity-70 cursor-not-allowed" />
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-charcoal-900 text-white text-sm font-medium hover:bg-charcoal-800 transition-colors dark:bg-ivory-100 dark:text-charcoal-900 mt-4">
                      Save Changes
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
