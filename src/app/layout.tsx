import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

import MobileMotionProvider from '@/components/MobileMotionProvider'
import ScrollProgress from '@/components/ScrollProgress'
import { brand } from '@/lib/brand'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description: brand.taglineSubtitle,
  keywords: 'wedding photography, wedding videography, Roma Film Production, wedding film, photography studio, wedding photographer, cinematic wedding film, couples photoshoot',
  authors: [{ name: brand.name }],
  robots: 'index, follow',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.taglineSubtitle,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: brand.heroPath,
        width: 1200,
        height: 630,
        alt: brand.name,
      }
    ]
  },
  icons: {
    icon: brand.logoPath,
    shortcut: brand.logoPath,
    apple: brand.logoPath,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <MobileMotionProvider>
          <ScrollProgress />
          {children}
        </MobileMotionProvider>
      </body>
    </html>
  )
}
