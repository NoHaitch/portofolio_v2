import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'
import { getLocalePath, getMessages, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/i18n/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return pageMetadata(locale, getMessages(locale).about.title)
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = getMessages(locale).about

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <header>
            <p className="text-primary mb-3 font-mono text-xs font-medium tracking-[0.18em] uppercase">
              {messages.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{messages.title}</h1>
            <p className="text-foreground mt-5 max-w-2xl leading-7 sm:text-lg sm:leading-8">
              {messages.introduction}
            </p>
            <div className="text-muted-foreground mt-6 max-w-2xl space-y-4 leading-7">
              {messages.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </header>

          <Image
            src="/self/japan.jpeg"
            alt={messages.shibuyaPhotoAlt}
            width={960}
            height={1280}
            sizes="(min-width: 1024px) 400px, 320px"
            priority
            className="border-border mx-auto aspect-[4/5] w-full max-w-xs rounded-2xl border object-cover object-top shadow-sm lg:ml-auto lg:max-w-sm"
          />
        </div>

        <section
          aria-labelledby="names-heading"
          className="border-border mt-16 border-t pt-10 sm:mt-20 sm:pt-12"
        >
          <h2 id="names-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.nameHeading}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {messages.names.map((item) => (
              <li key={item.name} className="border-border bg-card rounded-2xl border p-5">
                <p className="text-primary text-lg font-semibold tracking-tight">{item.name}</p>
                <p className="text-muted-foreground mt-2 leading-7">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="hobbies-heading"
          className="border-border mt-16 border-t pt-10 sm:mt-20 sm:pt-12"
        >
          <h2 id="hobbies-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.hobbiesHeading}
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
            <Image
              src="/self/singapore.jpg"
              alt={messages.singaporePhotoAlt}
              width={1280}
              height={1280}
              sizes="(min-width: 1024px) 400px, 320px"
              className="border-border mx-auto aspect-square w-full max-w-xs rounded-2xl border object-cover shadow-sm lg:aspect-auto lg:h-full lg:max-w-none"
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {messages.hobbies.map((hobby) => (
                <li key={hobby.title} className="border-border bg-card rounded-2xl border p-5">
                  <p className="text-primary text-lg font-semibold tracking-tight">{hobby.title}</p>
                  <p className="text-muted-foreground mt-2 leading-7">{hobby.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="interests-heading"
          className="border-border mt-16 border-t pt-10 sm:mt-20 sm:pt-12"
        >
          <h2 id="interests-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.interestsHeading}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {messages.interests.map((interest) => (
              <li
                key={interest}
                className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm"
              >
                {interest}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="contact-heading"
          className="bg-muted mt-16 flex flex-col gap-5 rounded-2xl p-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {messages.contactHeading}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-7">
              {messages.contactDescription}
            </p>
          </div>
          <Link
            href={getLocalePath(locale, '/contact')}
            className={`${buttonVariants({ variant: 'outline' })} shrink-0 self-start sm:self-auto`}
          >
            {messages.contactLink}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </section>
      </div>
    </main>
  )
}
