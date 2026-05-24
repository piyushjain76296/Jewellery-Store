'use client'

import { useWishlistStore } from '@/store/providers'

export function useWishlist() {
  const items = useWishlistStore((s) => s.items)
  const addItem = useWishlistStore((s) => s.addItem)
  const removeItem = useWishlistStore((s) => s.removeItem)
  const toggleItem = useWishlistStore((s) => s.toggleItem)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist)
  const clearWishlist = useWishlistStore((s) => s.clearWishlist)
  const getTotalItems = useWishlistStore((s) => s.getTotalItems)

  return {
    items,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    clearWishlist,
    totalItems: getTotalItems(),
    isEmpty: items.length === 0,
  }
}
