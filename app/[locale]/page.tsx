import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import RotatingText from '@/components/rotating-text'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getMessages, type Locale } from '@/lib/i18n'

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = getMessages(locale).home

  return (
    <main className="flex-1">
      <section className="mx-auto flex min-h-[calc(100svh-4.25rem)] w-full max-w-6xl flex-col px-5 sm:min-h-[calc(100svh-4.5rem)] sm:px-8">
        <div className="grid flex-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
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
        </div>

        <a
          href="#expertise"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 mx-auto mb-5 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none sm:mb-7"
        >
          <span>{messages.scrollHint}</span>
          <ArrowDown aria-hidden="true" className="size-4" />
        </a>
      </section>

      <section
        aria-label={messages.expertiseLabel}
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-24"
      >
        <div className="border-primary/30 border-t pt-12 sm:pt-16">
          <h2
            id="expertise"
            className="mx-auto max-w-5xl text-center text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-primary" aria-hidden="true">
              “
            </span>
            {messages.philosophyQuote}
            <span className="text-primary" aria-hidden="true">
              ”
            </span>
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">
            {messages.expertiseAreas.map((area) => (
              <Card
                key={area.title}
                className="border-border/80 bg-card/70 h-full rounded-2xl py-0 shadow-none"
              >
                <CardContent className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{area.title}</h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-6 sm:text-base sm:leading-7">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
