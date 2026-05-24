'use client'

import { useCartStore } from '@/store/providers'
import type { CartItemData } from '@/store/cart-store'

export function useCart() {
  const items = useCartStore((s) => s.items)
  const couponCode = useCartStore((s) => s.couponCode)
  const couponDiscount = useCartStore((s) => s.couponDiscount)
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const updateEngraving = useCartStore((s) => s.updateEngraving)
  const toggleGiftWrap = useCartStore((s) => s.toggleGiftWrap)
  const setGiftNote = useCartStore((s) => s.setGiftNote)
  const applyCoupon = useCartStore((s) => s.applyCoupon)
  const removeCoupon = useCartStore((s) => s.removeCoupon)
  const clearCart = useCartStore((s) => s.clearCart)
  const getTotalItems = useCartStore((s) => s.getTotalItems)
  const getSubtotal = useCartStore((s) => s.getSubtotal)
  const getGST = useCartStore((s) => s.getGST)
  const getTotal = useCartStore((s) => s.getTotal)

  return {
    items,
    couponCode,
    couponDiscount,
    addItem,
    removeItem,
    updateQuantity,
    updateEngraving,
    toggleGiftWrap,
    setGiftNote,
    applyCoupon,
    removeCoupon,
    clearCart,
    totalItems: getTotalItems(),
    subtotal: getSubtotal(),
    gst: getGST(),
    total: getTotal(),
    isEmpty: items.length === 0,
  }
}
