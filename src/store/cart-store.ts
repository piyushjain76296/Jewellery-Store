import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

export interface CartItemData {
  variantId: string
  productId: string
  productName: string
  productSlug: string
  productImage: string
  variantSku: string
  metalType: string
  karat: string
  ringSize: string | null
  stoneType: string
  weight: number
  price: number
  quantity: number
  engraving: string | null
  giftWrap: boolean
  giftNote: string | null
  stock: number
}

export interface CartState {
  items: CartItemData[]
  couponCode: string | null
  couponDiscount: number
  
  // Actions
  addItem: (item: CartItemData) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  updateEngraving: (variantId: string, text: string | null) => void
  toggleGiftWrap: (variantId: string) => void
  setGiftNote: (variantId: string, note: string | null) => void
  applyCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
  clearCart: () => void
  
  // Computed
  getTotalItems: () => number
  getSubtotal: () => number
  getGST: () => number
  getTotal: () => number
}

export const createCartStore = () => {
  return createStore<CartState>()(
    persist(
      (set, get) => ({
        items: [],
        couponCode: null,
        couponDiscount: 0,
        
        addItem: (item) => set((state) => {
          const existing = state.items.find(i => i.variantId === item.variantId)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.variantId === item.variantId
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
                  : i
              )
            }
          }
          return { items: [...state.items, item] }
        }),
        
        removeItem: (variantId) => set((state) => ({
          items: state.items.filter(i => i.variantId !== variantId)
        })),
        
        updateQuantity: (variantId, quantity) => set((state) => ({
          items: state.items.map(i =>
            i.variantId === variantId
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
              : i
          )
        })),
        
        updateEngraving: (variantId, text) => set((state) => ({
          items: state.items.map(i =>
            i.variantId === variantId ? { ...i, engraving: text } : i
          )
        })),
        
        toggleGiftWrap: (variantId) => set((state) => ({
          items: state.items.map(i =>
            i.variantId === variantId ? { ...i, giftWrap: !i.giftWrap } : i
          )
        })),
        
        setGiftNote: (variantId, note) => set((state) => ({
          items: state.items.map(i =>
            i.variantId === variantId ? { ...i, giftNote: note } : i
          )
        })),
        
        applyCoupon: (code, discount) => set({ couponCode: code, couponDiscount: discount }),
        removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),
        clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),
        
        getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
        getSubtotal: () => get().items.reduce((sum, i) => sum + (i.price * i.quantity), 0),
        getGST: () => Math.round(get().getSubtotal() * 0.03), // 3% GST on jewellery
        getTotal: () => get().getSubtotal() + get().getGST() - get().couponDiscount,
      }),
      {
        name: 'jewellery-cart',
      }
    )
  )
}

export type CartStore = ReturnType<typeof createCartStore>
