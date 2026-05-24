'use client'

import { SessionProvider } from 'next-auth/react'
import { createContext, useContext, useRef, type ReactNode } from 'react'
import { useStore } from 'zustand'
import { createCartStore, type CartState, type CartStore } from './cart-store'
import { createWishlistStore, type WishlistState, type WishlistStore } from './wishlist-store'

// Cart Store Provider
const CartStoreContext = createContext<CartStore | null>(null)

export function CartStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<CartStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = createCartStore()
  }
  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  )
}

export function useCartStore<T>(selector: (state: CartState) => T): T {
  const store = useContext(CartStoreContext)
  if (!store) throw new Error('useCartStore must be used within CartStoreProvider')
  return useStore(store, selector)
}

// Wishlist Store Provider
const WishlistStoreContext = createContext<WishlistStore | null>(null)

export function WishlistStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<WishlistStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = createWishlistStore()
  }
  return (
    <WishlistStoreContext.Provider value={storeRef.current}>
      {children}
    </WishlistStoreContext.Provider>
  )
}

export function useWishlistStore<T>(selector: (state: WishlistState) => T): T {
  const store = useContext(WishlistStoreContext)
  if (!store) throw new Error('useWishlistStore must be used within WishlistStoreProvider')
  return useStore(store, selector)
}

// Combined provider — includes SessionProvider for next-auth
export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartStoreProvider>
        <WishlistStoreProvider>
          {children}
        </WishlistStoreProvider>
      </CartStoreProvider>
    </SessionProvider>
  )
}
