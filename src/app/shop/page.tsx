'use client'

import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { SlidersHorizontal, ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductFilters } from '@/components/products/product-filters'
import { mockProducts } from '@/lib/mock-data'

export default function ShopPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts]

    // Apply filters
    if (filters.metalType?.length) {
      products = products.filter(p => 
        p.variants.some(v => filters.metalType.includes(v.metalType))
      )
    }
    if (filters.karat?.length) {
      products = products.filter(p =>
        p.variants.some(v => filters.karat.includes(v.karat))
      )
    }
    if (filters.stoneType?.length) {
      products = products.filter(p =>
        p.variants.some(v => filters.stoneType.includes(v.stoneType))
      )
    }
    if (filters.occasion?.length) {
      products = products.filter(p =>
        p.occasion.some(o => filters.occasion.includes(o))
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => (a.variants[0]?.basePrice || 0) - (b.variants[0]?.basePrice || 0))
        break
      case 'price-desc':
        products.sort((a, b) => (b.variants[0]?.basePrice || 0) - (a.variants[0]?.basePrice || 0))
        break
      case 'newest':
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'rating':
        products.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0))
        break
    }

    return products
  }, [filters, sortBy])

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-gold-600 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--foreground)] font-medium">Shop All</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl sm:text-4xl mb-2">Shop All Jewellery</h1>
          <p className="text-[var(--muted-foreground)]">
            Discover our curated collection of {filteredProducts.length} handcrafted pieces
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <ProductFilters activeFilters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-sm hover:border-gold-300 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {filteredProducts.length} products
                </span>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>

            {/* Mobile Filters (collapsible) */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="lg:hidden mb-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]"
              >
                <ProductFilters activeFilters={filters} onFilterChange={setFilters} />
              </motion.div>
            )}

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}
