export type MetalType = 'GOLD' | 'SILVER' | 'PLATINUM' | 'ROSE_GOLD' | 'WHITE_GOLD'
export type Karat = 'K14' | 'K18' | 'K22' | 'K24'
export type StoneType = 'DIAMOND' | 'RUBY' | 'EMERALD' | 'SAPPHIRE' | 'PEARL' | 'POLKI' | 'KUNDAN' | 'CUBIC_ZIRCONIA' | 'NONE'
export type Gender = 'MEN' | 'WOMEN' | 'UNISEX' | 'KIDS'
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED'
export type PaymentProvider = 'RAZORPAY' | 'PAYPAL' | 'COD'

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  categoryId: string | null
  collectionId: string | null
  metalType: MetalType
  gender: Gender
  occasion: string[]
  isFeatured: boolean
  isNew: boolean
  isActive: boolean
  careGuide: string | null
  arModelUrl: string | null
  images: string[]
  certificates: string[]
  createdAt: Date
  updatedAt: Date
  category?: Category | null
  collection?: Collection | null
  variants?: ProductVariant[]
  reviews?: Review[]
}

export interface ProductVariant {
  id: string
  productId: string
  sku: string
  metalType: MetalType
  karat: Karat
  ringSize: string | null
  stoneType: StoneType
  weight: number
  basePrice: number
  markupPrice: number
  stock: number
  images: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  parentId: string | null
  children?: Category[]
  products?: Product[]
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  isFeatured: boolean
}

export interface CartItem {
  id: string
  variantId: string
  quantity: number
  engraving: string | null
  giftWrap: boolean
  variant?: ProductVariant & { product?: Product }
}

export interface WishlistItem {
  id: string
  productId: string
  product?: Product
}

export interface Address {
  id: string
  userId: string
  label: string | null
  line1: string
  line2: string | null
  city: string
  state: string
  pincode: string
  country: string
  isDefault: boolean
  phone: string
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  subtotal: number
  tax: number
  shippingCharge: number
  discount: number
  total: number
  notes: string | null
  createdAt: Date
  items?: OrderItem[]
  payment?: Payment
  shipment?: Shipment
}

export interface OrderItem {
  id: string
  orderId: string
  variantId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  engraving: string | null
  giftWrap: boolean
  variant?: ProductVariant & { product?: Product }
}

export interface Payment {
  id: string
  orderId: string
  provider: PaymentProvider
  providerOrderId: string | null
  providerPaymentId: string | null
  amount: number
  currency: string
  status: string
}

export interface Shipment {
  id: string
  orderId: string
  awbNumber: string | null
  courier: string | null
  status: string
  trackingUrl: string | null
  edd: Date | null
}

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  title: string | null
  body: string | null
  isVerified: boolean
  createdAt: Date
  user?: { name: string | null; image: string | null }
  media?: { id: string; url: string }[]
}

export interface Banner {
  id: string
  title: string | null
  subtitle: string | null
  image: string
  link: string | null
  position: string
  isActive: boolean
  order: number
}

export interface Coupon {
  id: string
  code: string
  type: 'FLAT' | 'PERCENT' | 'BOGO'
  value: number
  minCartValue: number | null
  maxDiscount: number | null
  isActive: boolean
  startDate: Date
  endDate: Date
}

export interface GoldPrice {
  id: string
  metalType: MetalType
  karat: Karat
  pricePerGram: number
  source: string
  createdAt: Date
}

export interface Notification {
  id: string
  type: string
  title: string
  body: string
  link: string | null
  isRead: boolean
  createdAt: Date
}

// Filter types
export interface ProductFilters {
  category?: string
  metalType?: MetalType[]
  karat?: Karat[]
  stoneType?: StoneType[]
  gender?: Gender[]
  occasion?: string[]
  priceMin?: number
  priceMax?: number
  rating?: number
  isNew?: boolean
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'popularity'
  page?: number
  limit?: number
}

// Gold price display
export interface GoldPriceTicker {
  metal: string
  karat: string
  price: number
  change: number
}
