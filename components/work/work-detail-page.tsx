import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getLocalePath, getMessages, type Locale } from '@/lib/i18n'
import { WorkMarkdown } from '@/components/work/work-markdown'
import { formatWorkDate, getAssetBase, getItem, type WorkKind } from '@/lib/work'
import { getPublicImageSize } from '@/lib/work-images'

export async function WorkDetailPage({
  locale,
  kind,
  slug,
}: {
  locale: Locale
  kind: WorkKind
  slug: string
}) {
  const item = getItem(kind, slug)
  if (!item) notFound()

  const cover = item.cover ? await getPublicImageSize(item.cover) : null
  const messages = getMessages(locale)
  const page = kind === 'projects' ? messages.work.projectsPage : messages.work.activitiesPage

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href={getLocalePath(locale, `/work/${kind}`)}
        className="text-primary focus-visible:ring-ring/40 inline-flex items-center gap-1 rounded-sm text-sm font-medium hover:underline focus-visible:ring-2 focus-visible:outline-none"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        {page.backLabel}
      </Link>

      <article className="mt-8">
        <header>
          <p className="text-primary flex flex-wrap items-center gap-x-3 font-mono text-xs font-medium tracking-[0.18em] uppercase">
            <span>{messages.work.categories[item.category]}</span>
            <span className="text-muted-foreground">{formatWorkDate(item.date, locale, true)}</span>
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{item.title}</h1>
          <p className="text-muted-foreground mt-4 leading-7 sm:text-lg sm:leading-8">
            {item.summary}
          </p>
          {item.team ? (
            <p className="text-muted-foreground mt-4 text-sm">
              <span className="font-medium">{messages.work.teamLabel}:</span> {item.team}
            </p>
          ) : null}
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        {item.cover && cover ? (
          <Image
            src={item.cover}
            alt=""
            width={cover.width}
            height={cover.height}
            sizes={
              cover.height > cover.width
                ? '(min-width: 640px) 384px, 100vw'
                : '(min-width: 768px) 768px, 100vw'
            }
            priority
            className={`border-border mt-8 h-auto w-full rounded-2xl border ${
              cover.height > cover.width ? 'mx-auto max-w-sm' : ''
            }`}
          />
        ) : null}

        <div className="mt-8">
          <WorkMarkdown source={item.body} assetBase={getAssetBase(kind, slug)} />
        </div>

        {item.links && item.links.length > 0 ? (
          <section aria-labelledby="links-heading" className="mt-10">
            <h2 id="links-heading" className="text-2xl font-semibold tracking-tight">
              {messages.work.linksHeading}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {item.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center gap-1 font-medium hover:underline"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  )
}
