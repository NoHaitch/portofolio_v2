import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { WorkCard } from '@/components/work/work-card'
import { buttonVariants } from '@/components/ui/button-variants'
import { getLocalePath, getMessages, type Locale } from '@/lib/i18n'
import { getRecentActivities, getRecentProjects, toCardData } from '@/lib/work'
import { pageMetadata } from '@/lib/i18n/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return pageMetadata(locale, getMessages(locale).work.title)
}

export default async function WorkPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = getMessages(locale)
  const work = messages.work
  const recentProjects = getRecentProjects(4).map((item) => toCardData(item, locale, messages))
  const recent = getRecentActivities().map((item) => toCardData(item, locale, messages))

  const sections = [
    {
      id: 'recent-projects',
      heading: work.recentProjectsHeading,
      introduction: work.recentProjectsIntroduction,
      cards: recentProjects,
      href: getLocalePath(locale, '/work/projects'),
      cta: work.viewAllProjects,
    },
    {
      id: 'recent',
      heading: work.recentHeading,
      introduction: work.recentIntroduction,
      cards: recent,
      href: getLocalePath(locale, '/work/activities'),
      cta: work.viewAllActivities,
    },
  ]

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-12 max-w-3xl sm:mb-16">
        <p className="text-primary mb-3 font-mono text-xs font-medium tracking-[0.18em] uppercase">
          {work.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{work.title}</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl leading-7 sm:text-lg sm:leading-8">
          {work.introduction}
        </p>
      </header>

      <div className="space-y-16 sm:space-y-20">
        {sections.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-heading`}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2
                  id={`${section.id}-heading`}
                  className="text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  {section.heading}
                </h2>
                <p className="text-muted-foreground mt-2 leading-7">{section.introduction}</p>
              </div>
              <Link href={section.href} className={buttonVariants({ variant: 'outline' })}>
                {section.cta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {section.cards.map((card) => (
                <li key={card.slug}>
                  <WorkCard card={card} viewDetails={work.viewDetails} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
