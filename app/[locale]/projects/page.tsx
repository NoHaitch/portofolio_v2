import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button-variants'
import { getLocalePath, getMessages, type Locale } from '@/lib/i18n'

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = getMessages(locale).projects

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="text-primary mb-3 font-mono text-xs font-medium tracking-[0.18em] uppercase">
            {messages.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{messages.title}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-7 sm:text-lg sm:leading-8">
            {messages.introduction}
          </p>
          <nav aria-label={messages.title} className="mt-7 flex flex-wrap gap-3">
            <a
              href="#selected-projects"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {messages.projectsHeading}
              <ArrowDownRight aria-hidden="true" />
            </a>
            <a
              href="#activity-highlights"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              {messages.activitiesHeading}
              <ArrowDownRight aria-hidden="true" />
            </a>
          </nav>
        </header>

        <section id="selected-projects" aria-labelledby="projects-heading" className="scroll-mt-28">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 id="projects-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {messages.projectsHeading}
            </h2>
            <span className="text-muted-foreground hidden font-mono text-xs sm:block">
              {String(messages.projects.length).padStart(2, '0')}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {messages.projects.map((project) => (
              <Card
                key={project.title}
                className="border-border/80 bg-card/80 hover:border-primary/40 h-full rounded-2xl py-0 shadow-none transition-colors"
              >
                <CardContent className="flex h-full flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-primary font-mono text-xs font-medium tracking-wide uppercase">
                      {project.category}
                    </span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {project.period}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-6 sm:text-base sm:leading-7">
                    {project.summary}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="activity-highlights"
          aria-labelledby="activities-heading"
          className="border-border mt-16 scroll-mt-28 border-t pt-10 sm:mt-20 sm:pt-12"
        >
          <div className="max-w-2xl">
            <h2
              id="activities-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {messages.activitiesHeading}
            </h2>
            <p className="text-muted-foreground mt-3 leading-7">
              {messages.activitiesIntroduction}
            </p>
          </div>

          <ul className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
            {messages.activityHighlights.map((activity) => {
              const destination =
                activity.relatedRoute === 'experience'
                  ? messages.viewExperience
                  : messages.viewEducation

              return (
                <li key={activity.title} className="border-border border-t pt-5">
                  <h3 className="text-lg font-semibold tracking-tight">{activity.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {activity.description}
                  </p>
                  <Link
                    href={getLocalePath(locale, `/${activity.relatedRoute}`)}
                    className="text-primary focus-visible:ring-ring/40 mt-4 inline-flex items-center gap-1 rounded-sm text-sm font-medium hover:underline focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {destination}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}
