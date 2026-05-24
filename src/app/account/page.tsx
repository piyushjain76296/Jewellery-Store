import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AccountClientPage from './client-page'

export default async function AccountPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const userId = session.user.id

  // Fetch real user to override stale JWT token data
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true }
  })
  
  if (dbUser) {
    session.user.name = dbUser.name
  }

  // Fetch orders
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  })

  // Fetch addresses
  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  const serializedOrders = JSON.parse(JSON.stringify(orders))
  const serializedAddresses = JSON.parse(JSON.stringify(addresses))

  return <AccountClientPage session={session} orders={serializedOrders} addresses={serializedAddresses} />
}
