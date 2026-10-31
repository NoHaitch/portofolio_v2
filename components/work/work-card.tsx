import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { WorkCardData } from '@/lib/work-filter'

const maxTags = 4

export function WorkCard({
  card,
  viewDetails,
  as: Heading = 'h3',
}: {
  card: WorkCardData
  viewDetails: string
  as?: 'h2' | 'h3'
}) {
  return (
    <Link
      href={card.href}
      className="group focus-visible:outline-ring block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Card className="border-border/80 bg-card/80 group-hover:border-primary/40 h-full rounded-2xl py-0 shadow-none transition-colors">
        <CardContent className="flex h-full flex-col p-5 sm:p-6">
          {card.cover ? (
            <div className="bg-muted relative -mx-5 -mt-5 mb-5 aspect-video overflow-hidden rounded-t-2xl sm:-mx-6 sm:-mt-6">
              <Image
                src={card.cover}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-primary font-mono text-xs font-medium tracking-wide uppercase">
              {card.categoryLabel}
            </span>
            <span className="text-muted-foreground font-mono text-xs">{card.dateLabel}</span>
          </div>
          <Heading className="mt-5 text-xl leading-snug font-semibold tracking-tight">
            {card.title}
          </Heading>
          <p className="text-muted-foreground mt-3 text-sm leading-6">{card.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {card.tags.slice(0, maxTags).map((tag) => (
              <li
                key={tag}
                className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs"
              >
                {tag}
              </li>
            ))}
            {card.tags.length > maxTags ? (
              <li className="text-muted-foreground px-1 py-1 text-xs">
                +{card.tags.length - maxTags}
              </li>
            ) : null}
          </ul>
          <span className="text-primary mt-auto flex items-center gap-1 pt-6 text-sm font-medium group-hover:underline">
            {viewDetails}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
