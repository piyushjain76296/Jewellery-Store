import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

export interface WishlistItemData {
  productId: string
  productName: string
  productSlug: string
  productImage: string
  metalType: string
  price: number // starting price
}

export interface WishlistState {
  items: WishlistItemData[]
  addItem: (item: WishlistItemData) => void
  removeItem: (productId: string) => void
  toggleItem: (item: WishlistItemData) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  getTotalItems: () => number
}

export const createWishlistStore = () => {
  return createStore<WishlistState>()(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) => set((state) => {
          if (state.items.some(i => i.productId === item.productId)) return state
          return { items: [...state.items, item] }
        }),
        removeItem: (productId) => set((state) => ({
          items: state.items.filter(i => i.productId !== productId)
        })),
        toggleItem: (item) => {
          const exists = get().items.some(i => i.productId === item.productId)
          if (exists) {
            get().removeItem(item.productId)
          } else {
            get().addItem(item)
          }
        },
        isInWishlist: (productId) => get().items.some(i => i.productId === productId),
        clearWishlist: () => set({ items: [] }),
        getTotalItems: () => get().items.length,
      }),
      {
        name: 'jewellery-wishlist',
      }
    )
  )
}

export type WishlistStore = ReturnType<typeof createWishlistStore>
