'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: 'USER' | 'ADMIN' | 'MANAGER'
  fallback?: React.ReactNode
}

export function AuthGuard({ children, requiredRole, fallback }: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      )
    )
  }

  if (!session) return null

  if (
    requiredRole &&
    session.user.role !== requiredRole &&
    session.user.role !== 'ADMIN'
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-gold-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-charcoal mb-2">
          Access Denied
        </h2>
        <p className="text-charcoal-500 max-w-md">
          You don&apos;t have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </p>
      </div>
    )
  }

  return <>{children}</>
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-gold-200" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-500 animate-spin" />
      </div>
      <p className="text-sm text-charcoal-400 font-body tracking-wide">
        Loading...
      </p>
    </div>
  )
}
