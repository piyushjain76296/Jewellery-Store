import Link from 'next/link'
import { Diamond, ArrowLeft, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="flex max-w-lg flex-col items-center text-center">
        {/* Gem illustration */}
        <div className="relative mb-6">
          <div className="absolute inset-0 scale-150 rounded-full bg-gold-400/10 blur-3xl" />
          <div className="relative animate-[float_6s_ease-in-out_infinite]">
            <Diamond
              className="h-20 w-20 text-gold-400 drop-shadow-[0_0_20px_rgba(201,168,76,0.35)]"
              strokeWidth={1}
            />
          </div>
        </div>

        {/* Large 404 */}
        <h1
          className="text-shimmer font-display text-[8rem] font-bold leading-none tracking-tight sm:text-[10rem]"
        >
          404
        </h1>

        {/* Message */}
        <h2 className="mt-2 font-display text-2xl font-semibold text-charcoal-900 dark:text-ivory-100 sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-charcoal-500 dark:text-charcoal-300">
          The piece you&apos;re looking for seems to have slipped away.
          It may have been moved, renamed, or is no longer available.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-gold-600 active:scale-[0.98]"
          >
            <ShoppingBag className="h-4 w-4" />
            Return to Shop
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal-200 px-7 py-3 text-sm font-semibold text-charcoal-700 transition-all hover:border-gold-300 hover:text-gold-600 dark:border-charcoal-700 dark:text-charcoal-200 dark:hover:border-gold-500 dark:hover:text-gold-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Home
          </Link>
        </div>

        {/* Decorative divider */}
        <div className="mt-12 flex items-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300" />
          <Diamond className="h-3 w-3 text-gold-300" strokeWidth={1.5} />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300" />
        </div>
      </div>
    </div>
  )
}
