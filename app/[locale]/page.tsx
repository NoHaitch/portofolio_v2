import Link from 'next/link'
import Image from 'next/image'
import RotatingText from '@/components/rotating-text'
import { Button } from '@/components/ui/button'
import { getMessages, type Locale } from '@/lib/i18n'

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = getMessages(locale).home

  return (
    <main className="flex flex-1 items-center">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="bg-accent absolute -inset-3 -z-10 rounded-[2rem]" />
          <div className="border-border bg-card shadow-foreground/5 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl">
            <Image
              src="/home/landing.jpg"
              alt={messages.portraitAlt}
              width={600}
              height={800}
              className="aspect-[4/5] w-full rounded-[1.1rem] object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-5">
          <p className="text-primary font-mono text-xs font-medium tracking-[0.18em] uppercase">
            {messages.eyebrow}
          </p>
          <h1 className="max-w-2xl text-5xl leading-[1.04] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Francisco
            <span className="text-muted-foreground block">Trianto</span>
          </h1>

          <div className="text-primary text-xl font-medium sm:text-2xl">
            <RotatingText words={messages.roles} interval={3000} />
          </div>

          <p className="text-muted-foreground max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
            {messages.introduction}
          </p>

          <div className="mt-1 flex flex-wrap gap-3">
            <Button
              render={<Link href={locale === 'en' ? '/projects' : `/${locale}/projects`} />}
              nativeButton={false}
            >
              {messages.projects}
            </Button>
            <Button
              render={<Link href={locale === 'en' ? '/contact' : `/${locale}/contact`} />}
              nativeButton={false}
              variant="outline"
            >
              {messages.contact}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
