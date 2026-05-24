'use client'

import { ProductCard } from './product-card'
import type { Product, ProductVariant, Review } from '@/types'
import { Package } from 'lucide-react'

type ProductWithDetails = Product & { variants: ProductVariant[]; reviews?: Review[] }

interface ProductGridProps {
  products: ProductWithDetails[]
  loading?: boolean
  onQuickView?: (product: Product) => void
}

export function ProductGrid({ products, loading = false, onQuickView }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-[var(--muted-foreground)]" />
        </div>
        <h3 className="font-display text-xl mb-2">No products found</h3>
        <p className="text-sm text-[var(--muted-foreground)] max-w-sm">
          Try adjusting your filters or browse our full collection.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-xl bg-[var(--muted)] skeleton mb-3" />
      <div className="space-y-2 px-0.5">
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-[var(--muted)]" />
          <div className="w-3 h-3 rounded-full bg-[var(--muted)]" />
        </div>
        <div className="h-4 bg-[var(--muted)] rounded w-3/4 skeleton" />
        <div className="h-4 bg-[var(--muted)] rounded w-1/2 skeleton" />
        <div className="h-5 bg-[var(--muted)] rounded w-1/3 skeleton" />
      </div>
    </div>
  )
}
