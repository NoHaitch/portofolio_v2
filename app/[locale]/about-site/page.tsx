import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button-variants'
import { getMessages, type Locale } from '@/lib/i18n'

const repositoryUrl = 'https://github.com/NoHaitch/portofolio_v2'

export default async function AboutSitePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = getMessages(locale).aboutSite

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
        </header>

        <section aria-labelledby="purpose-heading">
          <h2 id="purpose-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.purposeHeading}
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {messages.purposeItems.map((item, index) => (
              <li key={item} className="border-border border-t pt-5">
                <span className="text-primary font-mono text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-muted-foreground mt-3 leading-7">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="workflow-heading"
          className="border-border mt-16 border-t pt-10 sm:mt-20 sm:pt-12"
        >
          <h2 id="workflow-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.workflowHeading}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl leading-7">
            {messages.workflowIntroduction}
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {messages.workflowSteps.map((step, index) => (
              <li key={step.title}>
                <Card className="border-border/80 bg-card/80 h-full rounded-2xl py-0 shadow-none">
                  <CardContent className="p-5 sm:p-6">
                    <span
                      aria-hidden="true"
                      className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-full font-mono text-sm font-medium"
                    >
                      {index + 1}
                    </span>
                    <h3 className="mt-4 text-lg leading-snug font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="stack-heading"
          className="border-border mt-16 border-t pt-10 sm:mt-20 sm:pt-12"
        >
          <h2 id="stack-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.stackHeading}
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {messages.stack.map((group) => (
              <div key={group.label}>
                <h3 className="text-muted-foreground font-mono text-xs tracking-[0.16em] uppercase">
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="source-heading"
          className="border-border mt-16 border-t pt-10 sm:mt-20 sm:pt-12"
        >
          <h2 id="source-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.sourceHeading}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl leading-7">
            {messages.sourceDescription}
          </p>
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className={`${buttonVariants({ variant: 'outline' })} mt-6`}
          >
            {messages.sourceLink}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>
      </div>
    </main>
  )
}
