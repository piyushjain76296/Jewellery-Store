'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export function useAuth() {
  const { data: session, status, update } = useSession()

  return {
    user: session?.user ?? null,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    isAdmin: session?.user?.role === 'ADMIN',
    isManager: session?.user?.role === 'MANAGER',
    isAdminOrManager:
      session?.user?.role === 'ADMIN' || session?.user?.role === 'MANAGER',
    signIn,
    signOut: () => signOut({ callbackUrl: '/' }),
    updateSession: update,
  }
}
