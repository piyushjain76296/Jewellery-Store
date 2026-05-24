import { Diamond } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory-50 dark:bg-charcoal-900">
      <div className="flex flex-col items-center gap-6">
        {/* Spinning diamond with gold glow */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 animate-[sparkle_1.5s_ease-in-out_infinite] rounded-full bg-gold-400/20 blur-xl" />
          {/* Diamond icon */}
          <div className="relative animate-[float_2s_ease-in-out_infinite]">
            <Diamond
              className="h-14 w-14 text-gold-500 drop-shadow-[0_0_15px_rgba(201,168,76,0.5)]"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Brand name with shimmer */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-shimmer font-display text-3xl font-semibold tracking-wide">
            Lumière
          </h1>
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-charcoal-400 dark:text-charcoal-300">
            Jewels
          </span>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block h-1.5 w-1.5 animate-[sparkle_1.2s_ease-in-out_infinite] rounded-full bg-gold-400"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="inline-block h-1.5 w-1.5 animate-[sparkle_1.2s_ease-in-out_infinite] rounded-full bg-gold-400"
            style={{ animationDelay: '200ms' }}
          />
          <span
            className="inline-block h-1.5 w-1.5 animate-[sparkle_1.2s_ease-in-out_infinite] rounded-full bg-gold-400"
            style={{ animationDelay: '400ms' }}
          />
        </div>
      </div>
    </div>
  )
}
