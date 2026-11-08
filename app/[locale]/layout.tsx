import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Geist_Mono, Figtree } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { ThemeProvider } from '@/components/theme-provider'
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
    title: {
      default: 'Francisco Trianto | Portfolio',
      template: '%s',
    },
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
  const { navigation, languageLabel, switchToLight, switchToDark } = getMessages(locale)
  const savedTheme = (await cookies()).get('theme')?.value
  const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null
  const themeClass = initialTheme === 'dark' ? 'dark' : initialTheme === 'light' ? 'light' : ''

  return (
    <html
      lang={locale}
      className={cn('h-full', 'antialiased', geistMono.variable, figtree.variable, themeClass)}
      suppressHydrationWarning
    >
      <body id="top" className="flex min-h-screen flex-col">
        <ThemeProvider initialTheme={initialTheme}>
          <Header
            locale={locale}
            messages={{ navigation, languageLabel, switchToLight, switchToDark }}
          />

          {children}
          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  )
}
