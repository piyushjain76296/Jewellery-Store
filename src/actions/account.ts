'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function updateProfile(name: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!name || name.trim() === '') {
    return { success: false, error: 'Name is required' }
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: name.trim() }
    })

    revalidatePath('/account')
    return { success: true }
  } catch (error) {
    console.error('Failed to update profile:', error)
    return { success: false, error: 'Failed to update profile' }
  }
}
