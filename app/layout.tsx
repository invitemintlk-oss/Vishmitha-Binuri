import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './enhancements.css'

// Fonts are self-hosted (downloaded from Google Fonts) so the build never
// depends on fetching from Google, which was breaking Turbopack on Vercel.
const cinzel = localFont({
  src: './fonts/cinzel-latin.woff2',
  weight: '400 900',
  display: 'swap',
  variable: '--font-cinzel'
})

const inter = localFont({
  src: './fonts/inter-latin.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-inter'
})

const pinyonScript = localFont({
  src: './fonts/pinyon-script-latin.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-pinyon'
})

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'VISHMITHA & BINURI Wedding',
  description: 'Join us as we celebrate the wedding of VISHMITHA and BINURI on December 30, 2026.',
  generator: 'v0.app',
  openGraph: {
    title: 'VISHMITHA & BINURI Wedding',
    description: 'Join us as we celebrate the wedding of VISHMITHA and BINURI on December 30, 2026.',
    type: 'website',
    images: [{ url: '/og-invitation.jpg', width: 1200, height: 1200, alt: 'Vishmitha & Binuri' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VISHMITHA & BINURI Wedding',
    description: 'Join us as we celebrate the wedding of VISHMITHA and BINURI on December 30, 2026.',
    images: ['/og-invitation.jpg'],
  },
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
