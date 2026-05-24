'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import {
  Mail,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Gem,
} from 'lucide-react'
import { toast } from 'sonner'

// ── Zod Schemas ────────────────────────────────
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
})

type EmailFormData = z.infer<typeof emailSchema>
type OtpFormData = z.infer<typeof otpSchema>

// ── Decorative Diamond SVG ─────────────────────
function DiamondIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1}
    >
      <path d="M12 2L2 9l10 13L22 9l-10-7z" />
      <path d="M2 9h20" />
      <path d="M12 2l3.5 7L12 22 8.5 9 12 2z" />
    </svg>
  )
}

// ── Floating Particles ─────────────────────────
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold-400/30"
          initial={{
            x: `${15 + i * 15}%`,
            y: `${20 + (i % 3) * 25}%`,
            opacity: 0,
          }}
          animate={{
            y: [`${20 + (i % 3) * 25}%`, `${10 + (i % 3) * 25}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ── OTP Input Component ────────────────────────
function OtpInput({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (val: string) => void
  disabled?: boolean
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const digits = value.padEnd(6, '').split('').slice(0, 6)

  const handleChange = useCallback(
    (index: number, char: string) => {
      if (!/^\d?$/.test(char)) return
      const newDigits = [...digits]
      newDigits[index] = char
      const newValue = newDigits.join('').replace(/\s/g, '')
      onChange(newValue)
      if (char && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [digits, onChange]
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    },
    [digits]
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault()
      const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
      if (paste) {
        onChange(paste)
        const focusIndex = Math.min(paste.length, 5)
        inputRefs.current[focusIndex]?.focus()
      }
    },
    [onChange]
  )

  return (
    <div className="flex gap-2.5 sm:gap-3 justify-center" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={digits[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            'w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-semibold rounded-xl',
            'bg-white border-2 border-ivory-300 text-charcoal',
            'focus:border-gold-500 focus:ring-2 focus:ring-gold-200 focus:outline-none',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            digits[i] && 'border-gold-400 bg-gold-50/50'
          )}
        />
      ))}
    </div>
  )
}

// ── Main Login Page ────────────────────────────
export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
  const [isLoadingOtp, setIsLoadingOtp] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({
    defaultValues: { email: '' },
  })

  // ── Handlers ─────────────────────────────────
  const handleGoogleSignIn = async () => {
    try {
      setIsLoadingGoogle(true)
      await signIn('google', { callbackUrl })
    } catch {
      toast.error('Failed to sign in with Google. Please try again.')
      setIsLoadingGoogle(false)
    }
  }

  const handleSendOtp = async (data: EmailFormData) => {
    try {
      setIsLoadingOtp(true)
      setEmail(data.email)
      // In production, call API to send OTP
      // await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ email: data.email }) })
      await new Promise((r) => setTimeout(r, 1000)) // Simulate API call
      setStep('otp')
      toast.success('OTP sent to your email!')
    } catch {
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setIsLoadingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    const result = otpSchema.safeParse({ otp: otpValue })
    if (!result.success) {
      toast.error(result.error.issues[0].message)
      return
    }

    try {
      setIsVerifying(true)
      const res = await signIn('credentials', {
        email,
        otp: otpValue,
        redirect: false,
      })

      if (res?.error) {
        toast.error('Invalid OTP. Please try again.')
        setOtpValue('')
      } else {
        toast.success('Welcome back!')
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  // Auto-submit when all 6 digits entered
  useEffect(() => {
    if (otpValue.length === 6 && step === 'otp') {
      handleVerifyOtp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValue])

  // ── Stagger animation variants ───────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left Panel: Luxurious Background ─── */}
      <div className="relative lg:w-[45%] xl:w-[50%] min-h-[200px] sm:min-h-[280px] lg:min-h-screen overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal" />

        {/* Gold Accent Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(201,168,76,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_80%,rgba(176,143,58,0.08),transparent_50%)]" />

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <FloatingParticles />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-10 lg:py-0">
          {/* Brand Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-4">
              <DiamondIcon className="w-10 h-10 lg:w-14 lg:h-14 text-gold-400" />
              <motion.div
                className="absolute -inset-2 rounded-full"
                animate={{ boxShadow: ['0 0 20px rgba(201,168,76,0.2)', '0 0 40px rgba(201,168,76,0.1)', '0 0 20px rgba(201,168,76,0.2)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <h1 className="font-display text-2xl lg:text-4xl font-semibold text-white tracking-wide">
              JEWELLERY
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-8 h-px bg-gold-500/50" />
              <span className="text-gold-400 text-[10px] lg:text-xs tracking-[0.3em] uppercase font-body">
                Exquisite Craftsmanship
              </span>
              <div className="w-8 h-px bg-gold-500/50" />
            </div>
          </motion.div>

          {/* Tagline — hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden lg:block mt-12 text-center max-w-sm"
          >
            <p className="text-ivory-300/80 text-sm leading-relaxed font-body">
              Discover timeless elegance crafted with precision. Each piece tells
              a story of artistry, heritage, and unmatched brilliance.
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              {[
                { icon: Gem, label: 'Certified' },
                { icon: ShieldCheck, label: 'Secure' },
                { icon: Sparkles, label: 'Premium' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <item.icon className="w-4 h-4 text-gold-400/70" />
                  <span className="text-[10px] text-ivory-300/50 tracking-wider uppercase font-body">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorative gold line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        </div>
      </div>

      {/* ── Right Panel: Login Form ──────────── */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-10 lg:py-0 bg-ivory-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[420px]"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2.5 text-charcoal-500 text-sm font-body leading-relaxed">
              Sign in to access your account, wishlist, and orders
            </p>
          </motion.div>

          {/* Google OAuth */}
          <motion.div variants={itemVariants}>
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoadingGoogle}
              className={cn(
                'w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl',
                'bg-white border border-ivory-300 shadow-sm',
                'text-charcoal font-medium text-sm font-body',
                'hover:shadow-md hover:border-ivory-200 hover:bg-white/80',
                'active:scale-[0.98]',
                'transition-all duration-200',
                'disabled:opacity-60 disabled:cursor-not-allowed'
              )}
            >
              {isLoadingGoogle ? (
                <Loader2 className="w-5 h-5 animate-spin text-charcoal-400" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 my-7"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ivory-300 to-transparent" />
            <span className="text-xs text-charcoal-400 font-body tracking-wide uppercase">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ivory-300 to-transparent" />
          </motion.div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            {step === 'email' ? (
              <motion.form
                key="email-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleEmailSubmit(handleSendOtp)}
                className="space-y-5"
              >
                {/* Email Input */}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal-700 font-body mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-charcoal-400" />
                    <input
                      {...registerEmail('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email',
                        },
                      })}
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className={cn(
                        'w-full pl-11 pr-4 py-3.5 rounded-xl',
                        'bg-white border text-charcoal text-sm font-body',
                        'placeholder:text-charcoal-300',
                        'focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-400',
                        'transition-all duration-200',
                        emailErrors.email
                          ? 'border-error/50 focus:ring-error/20'
                          : 'border-ivory-300'
                      )}
                    />
                  </div>
                  {emailErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-xs text-error font-body"
                    >
                      {emailErrors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Send OTP Button */}
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isLoadingOtp}
                    className={cn(
                      'w-full py-3.5 px-6 rounded-xl font-medium text-sm font-body',
                      'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400',
                      'text-white shadow-gold',
                      'hover:shadow-[0_6px_20px_rgba(201,168,76,0.4)]',
                      'active:scale-[0.98]',
                      'transition-all duration-300',
                      'disabled:opacity-60 disabled:cursor-not-allowed',
                      'btn-glow'
                    )}
                  >
                    {isLoadingOtp ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending OTP...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send OTP
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* OTP sent notice */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-50 border border-gold-200/50">
                    <Mail className="w-3.5 h-3.5 text-gold-600" />
                    <span className="text-xs text-gold-700 font-body">
                      OTP sent to{' '}
                      <span className="font-semibold">{email}</span>
                    </span>
                  </div>
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 font-body mb-3 text-center">
                    Enter Verification Code
                  </label>
                  <OtpInput
                    value={otpValue}
                    onChange={setOtpValue}
                    disabled={isVerifying}
                  />
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerifyOtp}
                  disabled={isVerifying || otpValue.length < 6}
                  className={cn(
                    'w-full py-3.5 px-6 rounded-xl font-medium text-sm font-body',
                    'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400',
                    'text-white shadow-gold',
                    'hover:shadow-[0_6px_20px_rgba(201,168,76,0.4)]',
                    'active:scale-[0.98]',
                    'transition-all duration-300',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                    'btn-glow'
                  )}
                >
                  {isVerifying ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Verify & Sign In
                    </span>
                  )}
                </button>

                {/* Resend / Back */}
                <div className="flex items-center justify-between text-xs font-body">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email')
                      setOtpValue('')
                    }}
                    className="text-charcoal-500 hover:text-charcoal-700 transition-colors"
                  >
                    ← Change email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toast.success('OTP resent!')
                    }}
                    className="text-gold-600 hover:text-gold-700 font-medium transition-colors"
                  >
                    Resend OTP
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Register Link */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-sm text-charcoal-500 font-body">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-gold-600 font-semibold hover:text-gold-700 transition-colors relative group"
              >
                Create Account
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
              </Link>
            </p>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-charcoal-300" />
            <span className="text-[11px] text-charcoal-300 font-body tracking-wide">
              256-bit SSL encrypted · Your data is safe with us
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
