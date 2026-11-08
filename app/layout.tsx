import type { Metadata, Viewport } from 'next'
import { Cinzel, Inter, Pinyon_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './enhancements.css'

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel'
})

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
})

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-pinyon'
})

export const metadata: Metadata = {
  title: 'VISHMITHA & BINURI Wedding',
  description: 'Join us as we celebrate the wedding of VISHMITHA and BINURI on December 30, 2026.',
  generator: 'v0.app',
  icons: {
    icon: '/vb-monogram.png',
    apple: '/vb-monogram.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${pinyonScript.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
