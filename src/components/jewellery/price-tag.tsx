'use client'

import { cn, formatPrice } from '@/lib/utils'
import { TrendingDown, BadgePercent, IndianRupee } from 'lucide-react'

interface PriceTagProps {
  basePrice: number
  markupPrice: number
  discount?: number
  showBreakdown?: boolean
  weight?: number
  metalType?: string
  karat?: string
  className?: string
}

export function PriceTag({
  basePrice,
  markupPrice,
  discount = 0,
  showBreakdown = false,
  weight,
  metalType,
  karat,
  className,
}: PriceTagProps) {
  const totalBeforeDiscount = basePrice + markupPrice
  const discountAmount = discount > 0 ? Math.round(totalBeforeDiscount * discount / 100) : 0
  const finalPrice = totalBeforeDiscount - discountAmount
  const gst = Math.round(finalPrice * 0.03)
  const emi = Math.round(finalPrice / 6)

  return (
    <div className={cn('space-y-2', className)}>
      {/* Main Price */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
          {formatPrice(finalPrice)}
        </span>
        {discount > 0 && (
          <>
            <span className="text-lg text-[var(--muted-foreground)] line-through">
              {formatPrice(totalBeforeDiscount)}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-semibold">
              <BadgePercent className="w-3 h-3" />
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Tax note */}
      <p className="text-xs text-[var(--muted-foreground)]">
        Inclusive of all taxes • GST {formatPrice(gst)}
      </p>

      {/* EMI */}
      <p className="text-xs text-gold-600 font-medium">
        EMI from {formatPrice(emi)}/month
      </p>

      {/* Price Breakdown */}
      {showBreakdown && (
        <div className="mt-3 p-3 rounded-lg bg-[var(--muted)] space-y-2">
          <p className="text-xs font-semibold text-[var(--foreground)] mb-2">Price Breakdown</p>
          <div className="flex justify-between text-xs">
            <span className="text-[var(--muted-foreground)]">
              Metal value {weight && `(${weight}g)`} {metalType && karat && `• ${metalType} ${karat}`}
            </span>
            <span>{formatPrice(basePrice)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[var(--muted-foreground)]">Making charges + Stone</span>
            <span>{formatPrice(markupPrice)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-xs text-success">
              <span>Discount ({discount}%)</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-xs">
            <span className="text-[var(--muted-foreground)]">GST (3%)</span>
            <span>{formatPrice(gst)}</span>
          </div>
          <div className="border-t border-[var(--border)] pt-2 flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>{formatPrice(finalPrice + gst)}</span>
          </div>
          <p className="text-[10px] text-[var(--muted-foreground)] flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3" /> Based on today&apos;s gold rate
          </p>
        </div>
      )}
    </div>
  )
}
