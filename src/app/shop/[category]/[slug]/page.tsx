'use client'

import { useState, useMemo } from 'react'
import { use } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  ChevronRight, Home, Star, Shield, Award, Download,
  ShoppingBag, Zap, MapPin, Truck, Heart, Share2, Package
} from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { getProductBySlug, getAverageRating, mockProducts } from '@/lib/mock-data'
import { MetalSelector } from '@/components/jewellery/metal-selector'
import { KaratSelector } from '@/components/jewellery/karat-selector'
import { StoneSelector } from '@/components/jewellery/stone-selector'
import { RingSizeGuide } from '@/components/jewellery/ring-size-guide'
import { EngravingPreview } from '@/components/jewellery/engraving-preview'
import { PriceTag } from '@/components/jewellery/price-tag'
import { ProductCard } from '@/components/products/product-card'
import { useCartStore, useWishlistStore } from '@/store/providers'
import { notFound } from 'next/navigation'

interface PDPProps {
  params: Promise<{ category: string; slug: string }>
}

export default function ProductDetailPage({ params }: PDPProps) {
  const { slug, category: categorySlug } = use(params)
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const addToCart = useCartStore((s) => s.addItem)
  const toggleWishlist = useWishlistStore((s) => s.toggleItem)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist)
  const wishlisted = isInWishlist(product.id)

  // Variant selection state
  const availableMetals = [...new Set(product.variants.map(v => v.metalType))]
  const [selectedMetal, setSelectedMetal] = useState(availableMetals[0] || 'GOLD')
  const availableKarats = [...new Set(product.variants.filter(v => v.metalType === selectedMetal).map(v => v.karat))]
  const [selectedKarat, setSelectedKarat] = useState(availableKarats[0] || 'K18')
  const availableStones = [...new Set(product.variants.filter(v => v.metalType === selectedMetal && v.karat === selectedKarat).map(v => v.stoneType))]
  const [selectedStone, setSelectedStone] = useState(availableStones[0] || 'NONE')
  const availableSizes = [...new Set(product.variants.filter(v => v.metalType === selectedMetal && v.karat === selectedKarat && v.stoneType === selectedStone && v.ringSize).map(v => v.ringSize!))]
  const [selectedSize, setSelectedSize] = useState<string | null>(availableSizes[0] || null)
  const isRing = categorySlug === 'rings' || availableSizes.length > 0

  // Engraving
  const [engravingEnabled, setEngravingEnabled] = useState(false)
  const [engravingText, setEngravingText] = useState('')
  const [engravingFont, setEngravingFont] = useState('Classic Serif')

  // Pincode
  const [pincode, setPincode] = useState('')
  const [pincodeResult, setPincodeResult] = useState<string | null>(null)

  // Current variant
  const currentVariant = useMemo(() => {
    return product.variants.find(v =>
      v.metalType === selectedMetal &&
      v.karat === selectedKarat &&
      v.stoneType === selectedStone &&
      (!isRing || v.ringSize === selectedSize)
    ) || product.variants[0]
  }, [product.variants, selectedMetal, selectedKarat, selectedStone, selectedSize, isRing])

  const rating = getAverageRating(product.reviews)
  const reviewCount = product.reviews.length

  // Tab state
  const [activeTab, setActiveTab] = useState('description')

  // Related products
  const relatedProducts = mockProducts.filter(p => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 4)

  const handleAddToCart = () => {
    if (!currentVariant) return
    addToCart({
      variantId: currentVariant.id,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.images[0] || '',
      variantSku: currentVariant.sku,
      metalType: currentVariant.metalType,
      karat: currentVariant.karat,
      ringSize: currentVariant.ringSize,
      stoneType: currentVariant.stoneType,
      weight: Number(currentVariant.weight),
      price: Number(currentVariant.basePrice) + Number(currentVariant.markupPrice),
      quantity: 1,
      engraving: engravingEnabled ? engravingText : null,
      giftWrap: false,
      giftNote: null,
      stock: currentVariant.stock,
    })
  }

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      setPincodeResult('Delivery by ' + new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' }))
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] flex-wrap">
            <Link href="/" className="hover:text-gold-600 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-gold-600 transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/shop/${categorySlug}`} className="hover:text-gold-600 transition-colors capitalize">{categorySlug}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--foreground)] font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blush-100 to-ivory-200 dark:from-charcoal-800 dark:to-charcoal-700 flex items-center justify-center relative group">
              <span className="text-9xl opacity-20">💎</span>
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button onClick={() => toggleWishlist({ productId: product.id, productName: product.name, productSlug: product.slug, productImage: product.images[0] || '', metalType: product.metalType, price: Number(currentVariant.basePrice) + Number(currentVariant.markupPrice) })}
                  className={cn('w-10 h-10 rounded-full bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-colors', wishlisted && 'bg-red-50')}>
                  <Heart className={cn('w-5 h-5', wishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal-600')} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <Share2 className="w-5 h-5 text-charcoal-600" />
                </button>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-20 h-20 rounded-xl bg-gradient-to-br from-blush-50 to-ivory-100 dark:from-charcoal-800 dark:to-charcoal-700 border-2 border-transparent hover:border-gold-400 cursor-pointer transition-all flex items-center justify-center">
                  <span className="text-2xl opacity-20">💎</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl mb-2">{product.name}</h1>
              {reviewCount > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={cn('w-4 h-4', s <= rating ? 'fill-gold-400 text-gold-400' : 'text-charcoal-200')} />)}</div>
                  <span className="text-sm text-[var(--muted-foreground)]">{rating} ({reviewCount} reviews)</span>
                </div>
              )}
            </div>

            {/* Price */}
            <PriceTag
              basePrice={Number(currentVariant.basePrice)}
              markupPrice={Number(currentVariant.markupPrice)}
              showBreakdown={true}
              weight={Number(currentVariant.weight)}
              metalType={currentVariant.metalType}
              karat={currentVariant.karat}
            />

            {/* Variant Selectors */}
            <div className="space-y-5 pt-2">
              <MetalSelector selectedMetal={selectedMetal} onSelect={setSelectedMetal} availableMetals={availableMetals} />
              <KaratSelector selectedKarat={selectedKarat} onSelect={setSelectedKarat} availableKarats={availableKarats} />
              {availableStones.length > 1 && (
                <StoneSelector selectedStone={selectedStone} onSelect={setSelectedStone} availableStones={availableStones} />
              )}
              {isRing && availableSizes.length > 0 && (
                <RingSizeGuide selectedSize={selectedSize} onSelect={setSelectedSize} availableSizes={availableSizes} />
              )}
            </div>

            {/* Weight & SKU */}
            <div className="flex items-center gap-6 text-sm text-[var(--muted-foreground)] py-2 border-t border-b border-[var(--border)]">
              <span>Weight: <strong className="text-[var(--foreground)]">{Number(currentVariant.weight).toFixed(2)}g</strong></span>
              <span>SKU: <strong className="text-[var(--foreground)]">{currentVariant.sku}</strong></span>
              <span>Stock: <strong className={cn(currentVariant.stock > 5 ? 'text-success' : 'text-error')}>{currentVariant.stock > 0 ? `${currentVariant.stock} available` : 'Out of Stock'}</strong></span>
            </div>

            {/* Engraving */}
            <EngravingPreview
              text={engravingText}
              font={engravingFont}
              onTextChange={setEngravingText}
              onFontChange={setEngravingFont}
              isEnabled={engravingEnabled}
              onToggle={() => setEngravingEnabled(!engravingEnabled)}
            />

            {/* Pincode Check */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                type="text"
                value={pincode}
                onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '').slice(0, 6)); setPincodeResult(null) }}
                placeholder="Enter pincode"
                maxLength={6}
                className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm w-32 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
              />
              <button onClick={handleCheckPincode} disabled={pincode.length !== 6} className="px-4 py-2 rounded-lg bg-charcoal-900 text-white text-sm font-medium hover:bg-charcoal-800 disabled:opacity-50 transition-colors dark:bg-charcoal-100 dark:text-charcoal-900">Check</button>
              {pincodeResult && (
                <span className="text-sm text-success flex items-center gap-1"><Truck className="w-4 h-4" />{pincodeResult}</span>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={currentVariant.stock === 0}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-gold-700 hover:to-gold-600 transition-all disabled:opacity-50 btn-glow text-sm sm:text-base"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
              <button
                disabled={currentVariant.stock === 0}
                className="flex-1 py-3.5 rounded-xl border-2 border-gold-500 text-gold-600 font-semibold flex items-center justify-center gap-2 hover:bg-gold-50 dark:hover:bg-gold-900/10 transition-all disabled:opacity-50 text-sm sm:text-base"
              >
                <Zap className="w-5 h-5" /> Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 py-4 border-t border-[var(--border)]">
              {[
                { icon: Shield, label: 'BIS Hallmarked' },
                { icon: Award, label: 'IGI Certified' },
                { icon: Package, label: 'Free Shipping' },
                { icon: Truck, label: '30-Day Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                  <Icon className="w-4 h-4 text-gold-500" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Certificate Download */}
            {product.certificates.length > 0 && (
              <button className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700 hover:underline">
                <Download className="w-4 h-4" /> Download Certificate (IGI/GIA)
              </button>
            )}
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-[var(--border)] gap-8">
            {['description', 'reviews', 'care'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'pb-3 text-sm font-medium capitalize transition-colors relative',
                  activeTab === tab ? 'text-gold-600' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                )}
              >
                {tab === 'reviews' ? `Reviews (${reviewCount})` : tab === 'care' ? 'Care Guide' : tab}
                {activeTab === tab && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500" />}
              </button>
            ))}
          </div>
          <div className="py-8">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-sm max-w-none text-[var(--muted-foreground)]">
                <p className="text-base leading-relaxed">{product.description}</p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-xs text-[var(--muted-foreground)] mb-1">Metal</p>
                    <p className="font-medium text-[var(--foreground)]">{product.metalType.replace('_', ' ')}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-xs text-[var(--muted-foreground)] mb-1">Gender</p>
                    <p className="font-medium text-[var(--foreground)]">{product.gender}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-xs text-[var(--muted-foreground)] mb-1">Occasion</p>
                    <p className="font-medium text-[var(--foreground)]">{product.occasion.join(', ')}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--muted)]">
                    <p className="text-xs text-[var(--muted-foreground)] mb-1">Variants</p>
                    <p className="font-medium text-[var(--foreground)]">{product.variants.length} options</p>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {product.reviews.length > 0 ? product.reviews.map(review => (
                  <div key={review.id} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center text-gold-700 font-semibold text-sm">{review.user?.name?.charAt(0) || 'U'}</div>
                      <div>
                        <p className="font-medium text-sm">{review.user?.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={cn('w-3 h-3', s <= review.rating ? 'fill-gold-400 text-gold-400' : 'text-charcoal-200')} />)}</div>
                          {review.isVerified && <span className="text-[10px] px-1.5 py-0.5 bg-success/10 text-success rounded-full font-medium">Verified</span>}
                        </div>
                      </div>
                    </div>
                    {review.title && <p className="font-medium text-sm mb-1">{review.title}</p>}
                    <p className="text-sm text-[var(--muted-foreground)]">{review.body}</p>
                  </div>
                )) : (
                  <p className="text-center text-[var(--muted-foreground)] py-8">No reviews yet. Be the first to review this product!</p>
                )}
              </motion.div>
            )}
            {activeTab === 'care' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-2xl">
                <p>{product.careGuide || 'Store your jewellery in a cool, dry place. Clean with mild soap and warm water. Avoid contact with perfumes, chemicals, and extreme temperatures. Remove before swimming or exercising.'}</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 pt-8 border-t border-[var(--border)]">
            <h2 className="font-display text-2xl mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
