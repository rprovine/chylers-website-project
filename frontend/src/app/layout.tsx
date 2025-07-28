import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: "Chyler's Hawaiian Beef Chips - Premium Hawaiian Snacks",
    template: "%s | Chyler's Hawaiian Beef Chips"
  },
  description: 'Premium Hawaiian beef chips made with Aloha since 2004. High protein, keto-friendly snacks in Original, Cracked Pepper, Spicy, and Award-winning Roasted Garlic flavors.',
  keywords: ['beef chips', 'hawaiian snacks', 'keto snacks', 'high protein', 'made in hawaii', 'beef jerky alternative'],
  authors: [{ name: "Chyler's Hawaiian Beef Chips" }],
  creator: "Chyler's Hawaiian Beef Chips",
  publisher: "Chyler's Hawaiian Beef Chips",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://chylers.com'),
  openGraph: {
    title: "Chyler's Hawaiian Beef Chips - Premium Hawaiian Snacks",
    description: 'Premium Hawaiian beef chips made with Aloha since 2004. High protein, keto-friendly snacks.',
    url: 'https://chylers.com',
    siteName: "Chyler's Hawaiian Beef Chips",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Chyler's Hawaiian Beef Chips"
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chyler's Hawaiian Beef Chips",
    description: 'Premium Hawaiian beef chips made with Aloha since 2004.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: '',
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}