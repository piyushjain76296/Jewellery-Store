import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { StoreProvider } from '@/store/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileNav } from '@/components/layout/mobile-nav'
import { cn } from '@/lib/utils'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Lumière Jewels — Premium Indian Jewellery',
    template: '%s | Lumière Jewels',
  },
  description:
    'Discover exquisite handcrafted Indian jewellery. BIS Hallmarked gold, IGI certified diamonds, and 925 sterling silver. Shop rings, necklaces, earrings, bracelets & more with free shipping.',
  keywords: [
    'jewellery',
    'indian jewellery',
    'gold jewellery',
    'diamond rings',
    'necklaces',
    'earrings',
    'bracelets',
    'silver jewellery',
    'wedding jewellery',
    'engagement rings',
  ],
  authors: [{ name: 'Lumière Jewels' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lumierejewels.com',
    siteName: 'Lumière Jewels',
    title: 'Lumière Jewels — Premium Indian Jewellery',
    description:
      'Discover exquisite handcrafted Indian jewellery. BIS Hallmarked gold, IGI certified diamonds, and 925 sterling silver.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumière Jewels — Premium Indian Jewellery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumière Jewels — Premium Indian Jewellery',
    description:
      'Discover exquisite handcrafted Indian jewellery. BIS Hallmarked gold, IGI certified diamonds.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          cormorant.variable,
          inter.variable,
          'min-h-screen bg-ivory-50 font-body text-charcoal-900 antialiased dark:bg-charcoal-900 dark:text-ivory-100'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  fontFamily: 'var(--font-body)',
                },
                className: 'border-gold-200 dark:border-charcoal-700',
              }}
              richColors
              closeButton
            />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <MobileNav />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
