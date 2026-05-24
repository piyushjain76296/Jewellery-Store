'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { useWishlistStore } from '@/store/providers'
import type { Product, ProductVariant, Review } from '@/types'
import { getLowestPrice, getAverageRating } from '@/lib/mock-data'

interface ProductCardProps {
  product: Product & { variants: ProductVariant[]; reviews?: Review[] }
  onQuickView?: (product: Product) => void
  index?: number
}

const METAL_COLORS: Record<string, string> = {
  GOLD: '#FFD700',
  ROSE_GOLD: '#B76E79',
  SILVER: '#C0C0C0',
  PLATINUM: '#E5E4E2',
  WHITE_GOLD: '#FFFFF0',
}

export function ProductCard({ product, onQuickView, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const toggleItem = useWishlistStore((s) => s.toggleItem)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist)
  const wishlisted = isInWishlist(product.id)

  const price = getLowestPrice(product as any)
  const rating = product.reviews ? getAverageRating(product.reviews) : 0
  const reviewCount = product.reviews?.length || 0
  const minStock = Math.min(...product.variants.map(v => v.stock))
  const metalTypes = [...new Set(product.variants.map(v => v.metalType))]
  const categorySlug = product.category?.slug || 'shop'

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.images[0] || '',
      metalType: product.metalType,
      price,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/shop/${categorySlug}/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--muted)] mb-3">
          {/* Product Image */}
          <div className={cn(
            'w-full h-full bg-gradient-to-br from-blush-100 to-ivory-200 dark:from-charcoal-800 dark:to-charcoal-700 flex items-center justify-center transition-transform duration-500',
            isHovered && 'scale-105'
          )}>
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <span className="text-6xl opacity-30">💎</span>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2.5 py-1 rounded-full bg-success text-white text-[10px] font-bold uppercase tracking-wider">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 text-white text-[10px] font-bold uppercase tracking-wider">
                Bestseller
              </span>
            )}
            {minStock > 0 && minStock <= 3 && (
              <span className="px-2.5 py-1 rounded-full bg-error/90 text-white text-[10px] font-bold">
                Only {minStock} left
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlist}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-colors hover:bg-white"
          >
            <Heart
              className={cn('w-4 h-4 transition-colors', wishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal-600')}
            />
          </motion.button>

          {/* Quick View (hover) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView?.(product) }}
              className="w-full py-2.5 rounded-lg bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-sm text-sm font-medium flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-charcoal-800 transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4" /> Quick View
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5 px-0.5">
          {/* Metal indicators */}
          <div className="flex items-center gap-1.5">
            {metalTypes.map(metal => (
              <span
                key={metal}
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: METAL_COLORS[metal] || '#ccc' }}
                title={metal.replace('_', ' ')}
              />
            ))}
          </div>

          {/* Name */}
          <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-gold-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={cn('w-3 h-3', star <= rating ? 'fill-gold-400 text-gold-400' : 'text-charcoal-200')}
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">({reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold">{formatPrice(price)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
