import type { Metadata } from 'next'
import { Geist_Mono, Figtree } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { getMessages, isLocale, locales, type Locale } from '@/lib/i18n'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-body' })

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: value } = await params
  const locale: Locale = isLocale(value) ? value : 'en'

  return {
    title: 'Francisco Trianto | Portfolio',
    description: getMessages(locale).metadataDescription,
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale: value } = await params
  const locale: Locale = isLocale(value) ? value : 'en'

  return (
    <html
      lang={locale}
      className={cn('h-full', 'antialiased', geistMono.variable, figtree.variable)}
    >
      <body id="top" className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Header locale={locale} />

          {children}

          <Footer locale={locale} />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
