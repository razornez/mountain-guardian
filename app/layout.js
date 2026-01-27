import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export const metadata = {
  title: 'MonitorGunung.com - Environmental Surveillance Platform',
  description: 'Satellite monitoring dashboard for tracking deforestation in West Java, Indonesia. Real-time forest coverage analysis using Sentinel-2 data.',
  keywords: ['environmental monitoring', 'deforestation', 'satellite imagery', 'West Java', 'Indonesia', 'forest conservation'],
  authors: [{ name: 'MonitorGunung Team' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.png',
  },
  openGraph: {
    title: 'MonitorGunung.com - Environmental Surveillance',
    description: 'Real-time deforestation monitoring in West Java mountains',
    type: 'website',
    locale: 'en_US',
    siteName: 'MonitorGunung',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MonitorGunung.com',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}