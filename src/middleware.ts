import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  // Admin routes — require ADMIN or MANAGER role
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login?callbackUrl=/admin', req.url))
    }
    if (userRole !== 'ADMIN' && userRole !== 'MANAGER') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Protected user routes
  const protectedRoutes = ['/account', '/checkout', '/wishlist']
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${pathname}`, req.url)
      )
    }
  }

  // Redirect logged-in users away from auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/checkout/:path*',
    '/wishlist/:path*',
    '/login',
    '/register',
  ],
}
