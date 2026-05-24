'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Diamond, RefreshCw, Home, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-lg flex-col items-center text-center"
      >
        {/* Illustration */}
        <div className="relative mb-8">
          {/* Background glow */}
          <div className="absolute inset-0 scale-150 rounded-full bg-error/10 blur-3xl" />
          {/* Cracked diamond */}
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-error/5 ring-1 ring-error/20">
            <Diamond className="h-12 w-12 text-error/60" strokeWidth={1.5} />
            <AlertTriangle className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-ivory-50 p-1 text-error dark:bg-charcoal-900" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl font-semibold text-charcoal-900 dark:text-ivory-100 sm:text-4xl">
          Something Went Wrong
        </h1>

        {/* Message */}
        <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-500 dark:text-charcoal-300">
          We apologise for the inconvenience. An unexpected error occurred while loading this page.
          Please try again or return to the homepage.
        </p>

        {/* Error details (collapsed) */}
        {error.message && (
          <div className="mt-4 w-full rounded-lg bg-charcoal-50 p-3 text-left dark:bg-charcoal-800">
            <p className="font-mono text-xs leading-relaxed text-charcoal-500 dark:text-charcoal-400">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-gold-600 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal-200 px-7 py-3 text-sm font-semibold text-charcoal-700 transition-all hover:border-gold-300 hover:text-gold-600 dark:border-charcoal-700 dark:text-charcoal-200 dark:hover:border-gold-500 dark:hover:text-gold-400"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
