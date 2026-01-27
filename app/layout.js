import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const metadata = {
  title: 'Mountain Guardian - Environmental Surveillance Platform',
  description: 'Satellite monitoring dashboard for tracking deforestation in West Java, Indonesia. Real-time forest coverage analysis using Sentinel-2 data.',
  keywords: ['environmental monitoring', 'deforestation', 'satellite imagery', 'West Java', 'Indonesia', 'forest conservation'],
  authors: [{ name: 'Mountain Guardian Team' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Mountain Guardian - Environmental Surveillance',
    description: 'Real-time deforestation monitoring in West Java mountains',
    type: 'website',
    locale: 'en_US',
    siteName: 'Mountain Guardian',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mountain Guardian',
    description: 'Environmental Surveillance Platform for West Java',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/**
 * Root Layout Component
 * 
 * Wraps the entire application with ThemeProvider.
 * Defaults to Light Mode with system preference opt-in.
 * Prevents FOUC with suppressHydrationWarning.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="mountain-guardian-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}