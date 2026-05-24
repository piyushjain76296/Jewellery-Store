'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { motion } from 'motion/react'
import { Diamond, Mail, Phone, User, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<'details' | 'otp'>('details')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [otp, setOtp] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/' })
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !agreed) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setStep('otp')
    setLoading(false)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await signIn('credentials', {
      email: form.email,
      otp,
      callbackUrl: '/',
    })
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(183,110,121,0.1),transparent_60%)]" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Diamond className="w-12 h-12 text-gold-400 mb-8" strokeWidth={1} />
            <h1 className="font-display text-5xl text-ivory-100 mb-4 leading-tight">
              Begin Your<br />
              <span className="text-shimmer">Jewellery Journey</span>
            </h1>
            <p className="text-charcoal-400 text-lg max-w-md leading-relaxed">
              Join thousands of women who trust Lumière for their everyday elegance and special moments.
            </p>
            <div className="mt-12 space-y-4">
              {['Exclusive member-only drops', 'Early access to sales', '₹500 off your first order'].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15 }} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span className="text-charcoal-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[var(--background)]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <Diamond className="w-7 h-7 text-gold-500" strokeWidth={1.5} />
            <span className="font-display text-2xl tracking-tight">Lumière</span>
          </Link>

          <h2 className="font-display text-3xl sm:text-4xl mb-2">Create Account</h2>
          <p className="text-[var(--muted-foreground)] mb-8">Join Lumière and discover timeless elegance</p>

          <button onClick={handleGoogleSignUp} className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors text-sm font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {step === 'details' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Priya Sharma" required className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="priya@example.com" required className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all" />
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-[var(--border)] accent-gold-500" />
                <span className="text-xs text-[var(--muted-foreground)]">
                  I agree to the <Link href="/terms" className="text-gold-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-gold-600 hover:underline">Privacy Policy</Link>
                </span>
              </label>
              <button type="submit" disabled={loading || !agreed || !form.name || !form.email} className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-600 to-gold-500 text-white font-medium text-sm hover:from-gold-700 hover:to-gold-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-glow flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">We sent a 6-digit code to <span className="font-medium text-[var(--foreground)]">{form.email}</span></p>
                <label className="text-sm font-medium mb-1.5 block">Enter OTP</label>
                <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" maxLength={6} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all" />
                <button type="button" onClick={() => setStep('details')} className="text-xs text-gold-600 hover:underline mt-2">Change email</button>
              </motion.div>
              <button type="submit" disabled={loading || otp.length !== 6} className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-600 to-gold-500 text-white font-medium text-sm hover:from-gold-700 hover:to-gold-600 transition-all disabled:opacity-50 btn-glow flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-[var(--muted-foreground)] mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-gold-600 hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
