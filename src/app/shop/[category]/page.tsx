'use client'

import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductFilters } from '@/components/products/product-filters'
import { mockProducts, mockCategories } from '@/lib/mock-data'
import { notFound } from 'next/navigation'
import { use } from 'react'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = use(params)
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState('newest')

  const category = mockCategories.find(c => c.slug === categorySlug)
  if (!category) notFound()

  const products = useMemo(() => {
    let prods = mockProducts.filter(p => p.categoryId === category.id)
    
    if (filters.metalType?.length) {
      prods = prods.filter(p => p.variants.some(v => filters.metalType.includes(v.metalType)))
    }
    if (filters.karat?.length) {
      prods = prods.filter(p => p.variants.some(v => filters.karat.includes(v.karat)))
    }

    switch (sortBy) {
      case 'price-asc': prods.sort((a, b) => (a.variants[0]?.basePrice || 0) - (b.variants[0]?.basePrice || 0)); break
      case 'price-desc': prods.sort((a, b) => (b.variants[0]?.basePrice || 0) - (a.variants[0]?.basePrice || 0)); break
      case 'newest': prods.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
    }

    return prods
  }, [category.id, filters, sortBy])

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-gold-600 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-gold-600 transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--foreground)] font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl sm:text-4xl mb-2">{category.name}</h1>
          <p className="text-[var(--muted-foreground)]">{category.description}</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <ProductFilters activeFilters={filters} onFilterChange={setFilters} />
            </div>
          </aside>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
              <span className="text-sm text-[var(--muted-foreground)]">{products.length} products</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 cursor-pointer">
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}
