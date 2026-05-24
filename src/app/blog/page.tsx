import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'

const POSTS = [
  {
    id: 1,
    title: 'The Art of Bridal Jewellery: Choosing Your Perfect Set',
    excerpt: 'Discover the heritage and craftsmanship behind our latest bridal collection, designed to make your special day truly unforgettable.',
    date: 'Oct 15, 2025',
    author: 'Aisha R.',
    category: 'Bridal',
    image: 'bg-gradient-to-tr from-gold-900/20 to-gold-500/10'
  },
  {
    id: 2,
    title: 'Understanding Gold Karats: 18K vs 22K vs 24K',
    excerpt: 'Confused about gold purity? Our comprehensive guide explains the differences and helps you choose the right karat for your needs.',
    date: 'Sep 28, 2025',
    author: 'Karan V.',
    category: 'Education',
    image: 'bg-gradient-to-tr from-charcoal-900/10 to-gold-500/5'
  },
  {
    id: 3,
    title: 'Festive Season Trends: What to Wear This Diwali',
    excerpt: 'From statement chokers to delicate Jhumkas, explore the must-have jewellery pieces for this year’s festive celebrations.',
    date: 'Aug 12, 2025',
    author: 'Neha S.',
    category: 'Trends',
    image: 'bg-gradient-to-br from-gold-500/20 to-transparent'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="bg-charcoal-900 text-ivory-100 py-24 px-4 text-center">
        <h1 className="font-display text-4xl md:text-6xl mb-6">Journal & Stories</h1>
        <p className="text-charcoal-400 max-w-2xl mx-auto text-lg">
          Insights, trends, and stories from the world of fine Indian jewellery.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map(post => (
            <article key={post.id} className="group cursor-pointer">
              <div className={`w-full aspect-[4/3] rounded-2xl mb-6 ${post.image} border border-[var(--border)] group-hover:border-gold-300 transition-colors`} />
              <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)] mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
                <span className="text-gold-600 font-medium px-2 py-0.5 bg-gold-50 dark:bg-gold-900/10 rounded-full">{post.category}</span>
              </div>
              <h2 className="font-display text-2xl mb-3 group-hover:text-gold-600 transition-colors">{post.title}</h2>
              <p className="text-[var(--muted-foreground)] text-sm line-clamp-3 mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-4 h-4" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
