import type { Product, ProductVariant, Category, Collection, Review, Banner } from '@/types'

// ============================================================
// CATEGORIES
// ============================================================
export const mockCategories: Category[] = [
  { id: '1', name: 'Rings', slug: 'rings', description: 'Exquisite rings for every occasion', image: '/images/cat-rings.jpg', parentId: null },
  { id: '2', name: 'Necklaces', slug: 'necklaces', description: 'Statement necklaces & delicate chains', image: '/images/cat-necklaces.jpg', parentId: null },
  { id: '3', name: 'Earrings', slug: 'earrings', description: 'Jhumkas, studs, hoops & drops', image: '/images/cat-earrings.jpg', parentId: null },
  { id: '4', name: 'Bracelets', slug: 'bracelets', description: 'Elegant bracelets & bangles', image: '/images/cat-bracelets.jpg', parentId: null },
  { id: '5', name: 'Bangles', slug: 'bangles', description: 'Traditional & modern bangles', image: '/images/cat-bangles.jpg', parentId: null },
  { id: '6', name: 'Pendants', slug: 'pendants', description: 'Stunning pendants for layering', image: '/images/cat-pendants.jpg', parentId: null },
  { id: '7', name: 'Chains', slug: 'chains', description: 'Gold & silver chains', image: '/images/cat-chains.jpg', parentId: null },
  { id: '8', name: 'Anklets', slug: 'anklets', description: 'Dainty anklets for everyday', image: '/images/cat-anklets.jpg', parentId: null },
]

// ============================================================
// COLLECTIONS
// ============================================================
export const mockCollections: Collection[] = [
  { id: '1', name: 'Wedding Season', slug: 'wedding-season', description: 'Bridal jewellery for your special day', image: '/images/col-wedding.jpg', isFeatured: true },
  { id: '2', name: 'Festive Glam', slug: 'festive-glam', description: 'Diwali & celebration edit', image: '/images/col-festive.jpg', isFeatured: true },
  { id: '3', name: 'Daily Essentials', slug: 'daily-essentials', description: 'Everyday elegance', image: '/images/col-daily.jpg', isFeatured: true },
]

// ============================================================
// PRODUCTS — realistic Indian jewellery
// ============================================================
export const mockProducts: (Product & { variants: ProductVariant[]; reviews: Review[] })[] = [
  {
    id: 'p1', name: 'Celestial Diamond Solitaire Ring', slug: 'celestial-diamond-solitaire-ring',
    description: 'A mesmerizing solitaire ring featuring a brilliant-cut diamond set in 18K gold. The celestial-inspired design catches light from every angle, making it perfect for engagements and milestone celebrations.',
    categoryId: '1', collectionId: '1', metalType: 'GOLD', gender: 'WOMEN',
    occasion: ['Wedding', 'Anniversary', 'Engagement'],
    isFeatured: true, isNew: true, isActive: true,
    careGuide: 'Clean with mild soap and warm water. Store in the provided box.', arModelUrl: null,
    images: ['/images/products/ring-solitaire-1.jpg', '/images/products/ring-solitaire-2.jpg', '/images/products/ring-solitaire-3.jpg'],
    certificates: ['/certificates/igi-cert-p1.pdf'],
    createdAt: new Date('2025-01-15'), updatedAt: new Date('2025-05-20'),
    category: mockCategories[0], collection: mockCollections[0],
    variants: [
      { id: 'v1', productId: 'p1', sku: 'CSR-G18-D-6', metalType: 'GOLD', karat: 'K18', ringSize: '6', stoneType: 'DIAMOND', weight: 3.2, basePrice: 42000, markupPrice: 38000, stock: 5, images: [] },
      { id: 'v2', productId: 'p1', sku: 'CSR-G18-D-7', metalType: 'GOLD', karat: 'K18', ringSize: '7', stoneType: 'DIAMOND', weight: 3.4, basePrice: 44000, markupPrice: 38000, stock: 3, images: [] },
      { id: 'v3', productId: 'p1', sku: 'CSR-G22-D-7', metalType: 'GOLD', karat: 'K22', ringSize: '7', stoneType: 'DIAMOND', weight: 3.4, basePrice: 52000, markupPrice: 38000, stock: 2, images: [] },
    ],
    reviews: [
      { id: 'r1', productId: 'p1', userId: 'u1', rating: 5, title: 'Absolutely stunning!', body: 'My fiancée loved it. The diamond sparkles beautifully and the gold quality is premium.', isVerified: true, createdAt: new Date('2025-03-10'), user: { name: 'Rahul M.', image: null }, media: [] },
      { id: 'r2', productId: 'p1', userId: 'u2', rating: 4, title: 'Beautiful ring', body: 'Great quality, slightly smaller diamond than expected but still gorgeous.', isVerified: true, createdAt: new Date('2025-04-05'), user: { name: 'Sneha K.', image: null }, media: [] },
    ],
  },
  {
    id: 'p2', name: 'Maharani Gold Jhumka Earrings', slug: 'maharani-gold-jhumka-earrings',
    description: 'Traditional jhumka earrings handcrafted in 22K gold with intricate filigree work and small ruby accents. A timeless piece that pairs beautifully with both sarees and contemporary outfits.',
    categoryId: '3', collectionId: '2', metalType: 'GOLD', gender: 'WOMEN',
    occasion: ['Wedding', 'Festive', 'Party'],
    isFeatured: true, isNew: false, isActive: true,
    careGuide: 'Avoid contact with perfumes and chemicals. Wipe with soft cloth after use.', arModelUrl: null,
    images: ['/images/products/jhumka-1.jpg', '/images/products/jhumka-2.jpg'],
    certificates: [],
    createdAt: new Date('2024-11-20'), updatedAt: new Date('2025-05-18'),
    category: mockCategories[2], collection: mockCollections[1],
    variants: [
      { id: 'v4', productId: 'p2', sku: 'MJE-G22-R', metalType: 'GOLD', karat: 'K22', ringSize: null, stoneType: 'RUBY', weight: 8.5, basePrice: 58000, markupPrice: 12000, stock: 8, images: [] },
      { id: 'v5', productId: 'p2', sku: 'MJE-G18-R', metalType: 'GOLD', karat: 'K18', ringSize: null, stoneType: 'RUBY', weight: 8.5, basePrice: 48000, markupPrice: 12000, stock: 12, images: [] },
    ],
    reviews: [
      { id: 'r3', productId: 'p2', userId: 'u3', rating: 5, title: 'Showstopper!', body: 'Wore these for my best friend\'s wedding. Got so many compliments! Worth every penny.', isVerified: true, createdAt: new Date('2025-02-14'), user: { name: 'Ananya G.', image: null }, media: [] },
    ],
  },
  {
    id: 'p3', name: 'Radiance Pearl Pendant Necklace', slug: 'radiance-pearl-pendant-necklace',
    description: 'An elegant freshwater pearl pendant suspended from a delicate 18K gold chain. The pearl\'s natural lustre is complemented by a diamond-studded bail, creating a piece that transitions effortlessly from day to night.',
    categoryId: '6', collectionId: '3', metalType: 'GOLD', gender: 'WOMEN',
    occasion: ['Daily Wear', 'Office', 'Birthday'],
    isFeatured: true, isNew: true, isActive: true,
    careGuide: 'Pearls are delicate. Avoid water, perfumes, and chemicals. Store separately.', arModelUrl: null,
    images: ['/images/products/pendant-pearl-1.jpg', '/images/products/pendant-pearl-2.jpg', '/images/products/pendant-pearl-3.jpg'],
    certificates: [],
    createdAt: new Date('2025-04-01'), updatedAt: new Date('2025-05-19'),
    category: mockCategories[5], collection: mockCollections[2],
    variants: [
      { id: 'v6', productId: 'p3', sku: 'RPN-G18-P', metalType: 'GOLD', karat: 'K18', ringSize: null, stoneType: 'PEARL', weight: 4.2, basePrice: 28000, markupPrice: 8500, stock: 15, images: [] },
      { id: 'v7', productId: 'p3', sku: 'RPN-RG18-P', metalType: 'ROSE_GOLD', karat: 'K18', ringSize: null, stoneType: 'PEARL', weight: 4.2, basePrice: 29000, markupPrice: 8500, stock: 10, images: [] },
    ],
    reviews: [
      { id: 'r4', productId: 'p3', userId: 'u4', rating: 5, title: 'Everyday luxury', body: 'Perfect for daily wear. Light, elegant, and gets compliments constantly.', isVerified: true, createdAt: new Date('2025-04-22'), user: { name: 'Priya S.', image: null }, media: [] },
    ],
  },
  {
    id: 'p4', name: 'Eternal Love Diamond Tennis Bracelet', slug: 'eternal-love-diamond-tennis-bracelet',
    description: 'A classic diamond tennis bracelet featuring 42 round brilliant diamonds set in 18K white gold. Each diamond is carefully matched for colour and clarity, creating an unbroken line of fire.',
    categoryId: '4', collectionId: '1', metalType: 'WHITE_GOLD', gender: 'WOMEN',
    occasion: ['Wedding', 'Anniversary', 'Gifting'],
    isFeatured: true, isNew: false, isActive: true,
    careGuide: 'Professional cleaning recommended every 6 months.', arModelUrl: null,
    images: ['/images/products/bracelet-tennis-1.jpg', '/images/products/bracelet-tennis-2.jpg'],
    certificates: ['/certificates/igi-cert-p4.pdf'],
    createdAt: new Date('2024-09-10'), updatedAt: new Date('2025-05-15'),
    category: mockCategories[3], collection: mockCollections[0],
    variants: [
      { id: 'v8', productId: 'p4', sku: 'ELB-WG18-D', metalType: 'WHITE_GOLD', karat: 'K18', ringSize: null, stoneType: 'DIAMOND', weight: 12.5, basePrice: 180000, markupPrice: 95000, stock: 2, images: [] },
    ],
    reviews: [],
  },
  {
    id: 'p5', name: 'Lotus Bloom Silver Studs', slug: 'lotus-bloom-silver-studs',
    description: 'Delicate lotus-shaped stud earrings crafted in 925 sterling silver with a gold vermeil finish. Adorned with cubic zirconia centres, these studs are perfect for everyday elegance.',
    categoryId: '3', collectionId: '3', metalType: 'SILVER', gender: 'WOMEN',
    occasion: ['Daily Wear', 'Office', 'Gifting'],
    isFeatured: false, isNew: true, isActive: true,
    careGuide: 'Store in anti-tarnish pouch. Clean with silver polish cloth.', arModelUrl: null,
    images: ['/images/products/studs-lotus-1.jpg', '/images/products/studs-lotus-2.jpg'],
    certificates: [],
    createdAt: new Date('2025-05-01'), updatedAt: new Date('2025-05-20'),
    category: mockCategories[2], collection: mockCollections[2],
    variants: [
      { id: 'v9', productId: 'p5', sku: 'LBS-S-CZ', metalType: 'SILVER', karat: 'K24', ringSize: null, stoneType: 'CUBIC_ZIRCONIA', weight: 2.1, basePrice: 2200, markupPrice: 1300, stock: 25, images: [] },
    ],
    reviews: [
      { id: 'r5', productId: 'p5', userId: 'u5', rating: 4, title: 'Cute and affordable', body: 'Great quality for the price. The lotus design is really unique.', isVerified: true, createdAt: new Date('2025-05-10'), user: { name: 'Meera R.', image: null }, media: [] },
    ],
  },
  {
    id: 'p6', name: 'Navratna Heritage Necklace', slug: 'navratna-heritage-necklace',
    description: 'A regal Navratna necklace featuring nine precious gemstones set in 22K gold. Each stone represents a celestial body in Vedic astrology, making this piece as meaningful as it is beautiful.',
    categoryId: '2', collectionId: '2', metalType: 'GOLD', gender: 'WOMEN',
    occasion: ['Wedding', 'Festive', 'Puja'],
    isFeatured: true, isNew: false, isActive: true,
    careGuide: 'Store in velvet box. Avoid exposure to chemicals and extreme temperatures.', arModelUrl: null,
    images: ['/images/products/necklace-navratna-1.jpg', '/images/products/necklace-navratna-2.jpg'],
    certificates: ['/certificates/hallmark-p6.pdf'],
    createdAt: new Date('2024-08-15'), updatedAt: new Date('2025-05-18'),
    category: mockCategories[1], collection: mockCollections[1],
    variants: [
      { id: 'v10', productId: 'p6', sku: 'NHN-G22-NR', metalType: 'GOLD', karat: 'K22', ringSize: null, stoneType: 'RUBY', weight: 25.0, basePrice: 175000, markupPrice: 85000, stock: 1, images: [] },
    ],
    reviews: [
      { id: 'r6', productId: 'p6', userId: 'u6', rating: 5, title: 'A masterpiece!', body: 'Bought for my mother\'s 60th birthday. The craftsmanship is impeccable.', isVerified: true, createdAt: new Date('2025-01-20'), user: { name: 'Vikram P.', image: null }, media: [] },
    ],
  },
  {
    id: 'p7', name: 'Infinity Rose Gold Band', slug: 'infinity-rose-gold-band',
    description: 'A modern infinity-inspired band in 18K rose gold with micro-pavé diamonds. The warm blush tone of rose gold combined with the endless loop design symbolises eternal love.',
    categoryId: '1', collectionId: '1', metalType: 'ROSE_GOLD', gender: 'UNISEX',
    occasion: ['Wedding', 'Engagement', 'Anniversary'],
    isFeatured: false, isNew: true, isActive: true,
    careGuide: 'Remove before swimming or using cleaning products.', arModelUrl: null,
    images: ['/images/products/ring-infinity-1.jpg', '/images/products/ring-infinity-2.jpg'],
    certificates: [],
    createdAt: new Date('2025-03-20'), updatedAt: new Date('2025-05-19'),
    category: mockCategories[0], collection: mockCollections[0],
    variants: [
      { id: 'v11', productId: 'p7', sku: 'IRB-RG18-D-6', metalType: 'ROSE_GOLD', karat: 'K18', ringSize: '6', stoneType: 'DIAMOND', weight: 2.8, basePrice: 32000, markupPrice: 18000, stock: 7, images: [] },
      { id: 'v12', productId: 'p7', sku: 'IRB-RG18-D-7', metalType: 'ROSE_GOLD', karat: 'K18', ringSize: '7', stoneType: 'DIAMOND', weight: 3.0, basePrice: 34000, markupPrice: 18000, stock: 5, images: [] },
      { id: 'v13', productId: 'p7', sku: 'IRB-RG18-D-8', metalType: 'ROSE_GOLD', karat: 'K18', ringSize: '8', stoneType: 'DIAMOND', weight: 3.2, basePrice: 36000, markupPrice: 18000, stock: 4, images: [] },
    ],
    reviews: [],
  },
  {
    id: 'p8', name: 'Kundan Polki Chandbali Earrings', slug: 'kundan-polki-chandbali-earrings',
    description: 'Show-stopping chandbali earrings featuring traditional Kundan setting with uncut Polki diamonds. Handcrafted by Rajasthani artisans in 22K gold with enamel (Meenakari) work on the reverse.',
    categoryId: '3', collectionId: '2', metalType: 'GOLD', gender: 'WOMEN',
    occasion: ['Wedding', 'Sangeet', 'Festive'],
    isFeatured: true, isNew: false, isActive: true,
    careGuide: 'Handle with care. Avoid water. Store in provided velvet pouch.', arModelUrl: null,
    images: ['/images/products/chandbali-1.jpg', '/images/products/chandbali-2.jpg', '/images/products/chandbali-3.jpg'],
    certificates: ['/certificates/hallmark-p8.pdf'],
    createdAt: new Date('2024-10-01'), updatedAt: new Date('2025-05-17'),
    category: mockCategories[2], collection: mockCollections[1],
    variants: [
      { id: 'v14', productId: 'p8', sku: 'KPC-G22-PK', metalType: 'GOLD', karat: 'K22', ringSize: null, stoneType: 'POLKI', weight: 18.0, basePrice: 126000, markupPrice: 65000, stock: 3, images: [] },
    ],
    reviews: [
      { id: 'r7', productId: 'p8', userId: 'u7', rating: 5, title: 'Bride\'s dream!', body: 'Wore these on my wedding day. The Meenakari on the back is a beautiful surprise. Museum-quality craftsmanship.', isVerified: true, createdAt: new Date('2025-02-28'), user: { name: 'Isha M.', image: null }, media: [] },
    ],
  },
  {
    id: 'p9', name: 'Minimalist Gold Chain Necklace', slug: 'minimalist-gold-chain-necklace',
    description: 'An ultra-fine 18K gold cable chain necklace designed for everyday wear and layering. At just 1.2mm thick, it drapes beautifully and can be worn alone or paired with your favourite pendant.',
    categoryId: '7', collectionId: '3', metalType: 'GOLD', gender: 'WOMEN',
    occasion: ['Daily Wear', 'Office', 'Layering'],
    isFeatured: false, isNew: false, isActive: true,
    careGuide: 'Store flat to avoid tangling.', arModelUrl: null,
    images: ['/images/products/chain-minimal-1.jpg', '/images/products/chain-minimal-2.jpg'],
    certificates: [],
    createdAt: new Date('2024-12-15'), updatedAt: new Date('2025-05-16'),
    category: mockCategories[6], collection: mockCollections[2],
    variants: [
      { id: 'v15', productId: 'p9', sku: 'MGC-G18-16', metalType: 'GOLD', karat: 'K18', ringSize: null, stoneType: 'NONE', weight: 3.0, basePrice: 21000, markupPrice: 4500, stock: 20, images: [] },
      { id: 'v16', productId: 'p9', sku: 'MGC-G18-18', metalType: 'GOLD', karat: 'K18', ringSize: null, stoneType: 'NONE', weight: 3.5, basePrice: 24500, markupPrice: 4500, stock: 18, images: [] },
      { id: 'v17', productId: 'p9', sku: 'MGC-RG18-16', metalType: 'ROSE_GOLD', karat: 'K18', ringSize: null, stoneType: 'NONE', weight: 3.0, basePrice: 22000, markupPrice: 4500, stock: 14, images: [] },
    ],
    reviews: [],
  },
  {
    id: 'p10', name: 'Sapphire Halo Cocktail Ring', slug: 'sapphire-halo-cocktail-ring',
    description: 'A breathtaking cocktail ring featuring a 2-carat oval sapphire surrounded by a double halo of brilliant-cut diamonds. Set in platinum, this ring is a true statement piece.',
    categoryId: '1', collectionId: null, metalType: 'PLATINUM', gender: 'WOMEN',
    occasion: ['Party', 'Cocktail', 'Anniversary'],
    isFeatured: false, isNew: true, isActive: true,
    careGuide: 'Professional cleaning every 3 months recommended.', arModelUrl: null,
    images: ['/images/products/ring-sapphire-1.jpg', '/images/products/ring-sapphire-2.jpg'],
    certificates: ['/certificates/igi-cert-p10.pdf'],
    createdAt: new Date('2025-04-15'), updatedAt: new Date('2025-05-20'),
    category: mockCategories[0], collection: null,
    variants: [
      { id: 'v18', productId: 'p10', sku: 'SHR-PT-S-6', metalType: 'PLATINUM', karat: 'K24', ringSize: '6', stoneType: 'SAPPHIRE', weight: 6.5, basePrice: 95000, markupPrice: 155000, stock: 2, images: [] },
      { id: 'v19', productId: 'p10', sku: 'SHR-PT-S-7', metalType: 'PLATINUM', karat: 'K24', ringSize: '7', stoneType: 'SAPPHIRE', weight: 6.8, basePrice: 98000, markupPrice: 155000, stock: 1, images: [] },
    ],
    reviews: [],
  },
  {
    id: 'p11', name: 'Temple Gold Bangle Set', slug: 'temple-gold-bangle-set',
    description: 'A set of 4 traditional temple-design bangles in 22K gold featuring intricate goddess motifs inspired by South Indian temple architecture. Each bangle is individually handcrafted.',
    categoryId: '5', collectionId: '2', metalType: 'GOLD', gender: 'WOMEN',
    occasion: ['Wedding', 'Festive', 'Puja', 'Gifting'],
    isFeatured: true, isNew: false, isActive: true,
    careGuide: 'Polish with soft cotton cloth. Avoid bending.', arModelUrl: null,
    images: ['/images/products/bangle-temple-1.jpg', '/images/products/bangle-temple-2.jpg'],
    certificates: ['/certificates/hallmark-p11.pdf'],
    createdAt: new Date('2024-07-20'), updatedAt: new Date('2025-05-14'),
    category: mockCategories[4], collection: mockCollections[1],
    variants: [
      { id: 'v20', productId: 'p11', sku: 'TGB-G22-2.4', metalType: 'GOLD', karat: 'K22', ringSize: '2.4', stoneType: 'NONE', weight: 40.0, basePrice: 280000, markupPrice: 45000, stock: 2, images: [] },
      { id: 'v21', productId: 'p11', sku: 'TGB-G22-2.6', metalType: 'GOLD', karat: 'K22', ringSize: '2.6', stoneType: 'NONE', weight: 42.0, basePrice: 294000, markupPrice: 45000, stock: 3, images: [] },
    ],
    reviews: [
      { id: 'r8', productId: 'p11', userId: 'u8', rating: 5, title: 'Heirloom quality', body: 'These bangles are absolutely gorgeous. The temple motifs are so detailed. Bought for my daughter\'s wedding.', isVerified: true, createdAt: new Date('2025-03-05'), user: { name: 'Lakshmi N.', image: null }, media: [] },
    ],
  },
  {
    id: 'p12', name: 'Dainty Silver Anklet', slug: 'dainty-silver-anklet',
    description: 'A delicate 925 sterling silver anklet with tiny jingling bells and leaf charms. Adjustable chain length makes it suitable for all ankle sizes. Perfect for beach days and summer outfits.',
    categoryId: '8', collectionId: '3', metalType: 'SILVER', gender: 'WOMEN',
    occasion: ['Daily Wear', 'Beach', 'Summer', 'Gifting'],
    isFeatured: false, isNew: true, isActive: true,
    careGuide: 'Pat dry after contact with water. Store in anti-tarnish pouch.', arModelUrl: null,
    images: ['/images/products/anklet-silver-1.jpg', '/images/products/anklet-silver-2.jpg'],
    certificates: [],
    createdAt: new Date('2025-05-10'), updatedAt: new Date('2025-05-20'),
    category: mockCategories[7], collection: mockCollections[2],
    variants: [
      { id: 'v22', productId: 'p12', sku: 'DSA-S-ADJ', metalType: 'SILVER', karat: 'K24', ringSize: null, stoneType: 'NONE', weight: 5.5, basePrice: 2800, markupPrice: 1200, stock: 30, images: [] },
    ],
    reviews: [
      { id: 'r9', productId: 'p12', userId: 'u9', rating: 4, title: 'Love the jingling!', body: 'Super cute anklet. The bells make a soft sound when walking. Very Bollywood!', isVerified: true, createdAt: new Date('2025-05-15'), user: { name: 'Riya D.', image: null }, media: [] },
    ],
  },
]

// ============================================================
// BANNERS
// ============================================================
export const mockBanners: Banner[] = [
  { id: 'b1', title: 'Wear Your Story', subtitle: 'New Wedding Collection 2025', image: '/images/banners/hero-1.jpg', link: '/shop?collection=wedding-season', position: 'hero', isActive: true, order: 1 },
  { id: 'b2', title: 'Festive Edit', subtitle: 'Celebrate in Gold', image: '/images/banners/hero-2.jpg', link: '/shop?collection=festive-glam', position: 'hero', isActive: true, order: 2 },
  { id: 'b3', title: 'Daily Essentials', subtitle: 'Starting from ₹3,500', image: '/images/banners/hero-3.jpg', link: '/shop?collection=daily-essentials', position: 'hero', isActive: true, order: 3 },
]

// ============================================================
// HELPERS
// ============================================================
export function getProductBySlug(slug: string) {
  return mockProducts.find(p => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string) {
  const cat = mockCategories.find(c => c.slug === categorySlug)
  if (!cat) return []
  return mockProducts.filter(p => p.categoryId === cat.id)
}

export function getFeaturedProducts() {
  return mockProducts.filter(p => p.isFeatured)
}

export function getNewArrivals() {
  return mockProducts.filter(p => p.isNew)
}

export function getLowestPrice(product: Product & { variants: ProductVariant[] }) {
  if (!product.variants.length) return 0
  return Math.min(...product.variants.map(v => v.basePrice + v.markupPrice))
}

export function getAverageRating(reviews: Review[]) {
  if (!reviews.length) return 0
  return Number((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1))
}
