'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createOrder(data: {
  items: { variantId: string; productId: string; productName: string; quantity: number; price: number }[]
  address: { name: string; phone: string; line1: string; line2?: string; city: string; state: string; pincode: string }
  paymentMethod: 'razorpay' | 'paypal' | 'cod'
  subtotal: number
  tax: number
  shippingCharge: number
  total: number
}) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: 'You must be logged in to place an order.' }
    }

    const userId = session.user.id

    // Ensure dummy variants exist to satisfy foreign key constraints
    for (const item of data.items) {
      await prisma.productVariant.upsert({
        where: { id: item.variantId },
        update: {},
        create: {
          id: item.variantId,
          sku: `DUMMY-${item.variantId}`,
          metalType: 'GOLD',
          karat: 'K18',
          basePrice: item.price,
          markupPrice: 0,
          weight: 1.0,
          product: {
            connectOrCreate: {
              where: { id: item.productId },
              create: {
                id: item.productId,
                name: item.productName,
                slug: `dummy-${item.variantId}`,
                metalType: 'GOLD',
              }
            }
          }
        }
      })
    }

    // 1. Create or update the Address
    const address = await prisma.address.create({
      data: {
        userId,
        line1: data.address.line1,
        line2: data.address.line2 || '',
        city: data.address.city,
        state: data.address.state,
        pincode: data.address.pincode,
        phone: data.address.phone,
        label: 'Home', // default label
      },
    })

    // 2. Generate a unique order number
    const orderNumber = `JWL-${new Date().toISOString().replace(/\D/g, '').slice(0, 8)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // 3. Create the Order
    const order = await prisma.order.create({
      data: {
        userId,
        orderNumber,
        status: 'PENDING',
        subtotal: data.subtotal,
        tax: data.tax,
        shippingCharge: data.shippingCharge,
        total: data.total,
        addressSnapshot: {
          name: data.address.name,
          phone: data.address.phone,
          line1: data.address.line1,
          line2: data.address.line2,
          city: data.address.city,
          state: data.address.state,
          pincode: data.address.pincode,
        },
        items: {
          create: data.items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
          })),
        },
        payment: {
          create: {
            provider: data.paymentMethod === 'razorpay' ? 'RAZORPAY' : data.paymentMethod === 'paypal' ? 'PAYPAL' : 'COD',
            amount: data.total,
            status: data.paymentMethod === 'cod' ? 'CREATED' : 'CREATED',
          },
        },
      },
    })

    revalidatePath('/account')

    return { success: true, orderId: order.orderNumber }
  } catch (error: any) {
    console.error('Failed to create order:', error)
    return { success: false, error: error.message || 'Failed to create order' }
  }
}

export async function getSavedAddresses() {
  try {
    const session = await auth()
    if (!session?.user) return []

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    return addresses
  } catch (error) {
    console.error('Failed to fetch addresses:', error)
    return []
  }
}
