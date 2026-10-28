import { ExperienceTimeline } from '@/components/experience-timeline'
import { getMessages, type Locale } from '@/lib/i18n'

export default async function ExperiencePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = getMessages(locale).experience

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-primary mb-3 font-mono text-xs font-medium tracking-[0.18em] uppercase">
          {messages.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{messages.title}</h1>
        <p className="text-muted-foreground mt-4 leading-7">{messages.introduction}</p>
      </header>

      <ExperienceTimeline
        entries={messages.entries}
        branchLabels={messages.branches}
        tabsLabel={messages.tabsLabel}
        selectionHint={messages.parallelNote}
      />
    </main>
  )
}
