'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ExperienceBranch, ExperienceEntry } from '@/lib/i18n/types'

const branches: ExperienceBranch[] = ['engineering', 'academic', 'leadership']

const entryOrder: Record<ExperienceBranch, string[]> = {
  engineering: ['hima-ilkom-election', 'hmif-election', 'sinerdigi', 'akhdani'],
  academic: ['character-trainer', 'if1220', 'cse-lab', 'if2211', 'if2224'],
  leadership: [
    'fcc-programming',
    'gathering-stei',
    'tpb-cup',
    'regeneration-ubv',
    'pab-ubv',
    'wisokto',
    'sparta-hmif',
    'hmif-academic',
    'arka-vidia',
  ],
}

type ExperienceTimelineProps = {
  entries: ExperienceEntry[]
  branchLabels: Record<ExperienceBranch, string>
  tabsLabel: string
  selectionHint: string
}

export function ExperienceTimeline({
  entries,
  branchLabels,
  tabsLabel,
  selectionHint,
}: ExperienceTimelineProps) {
  return (
    <Tabs defaultValue={branches[0]} className="experience-timeline gap-4">
      <TabsList aria-label={tabsLabel} className="bg-muted grid w-full grid-cols-3 rounded-xl p-1">
        {branches.map((branch) => {
          return (
            <TabsTrigger
              key={branch}
              value={branch}
              data-branch={branch}
              className="h-auto min-h-10 min-w-0 px-2 py-2 text-center text-xs leading-4 whitespace-normal sm:px-3 sm:text-sm"
            >
              <span className="flex min-w-0 items-center justify-center gap-2">
                <span className="size-2 shrink-0 rounded-full bg-current" aria-hidden="true" />
                <span className="min-w-0">{branchLabels[branch]}</span>
              </span>
            </TabsTrigger>
          )
        })}
      </TabsList>

      <p className="text-muted-foreground -mt-1 text-sm">{selectionHint}</p>

      {branches.map((branch) => {
        const order = entryOrder[branch]
        const branchEntries = entries
          .filter((entry) => entry.branch === branch)
          .sort((left, right) => order.indexOf(left.id) - order.indexOf(right.id))

        return (
          <TabsContent key={branch} value={branch} data-branch={branch} className="mt-0">
            <ol className="before:bg-border relative space-y-2 before:absolute before:inset-y-2 before:left-3 before:w-px md:before:left-1/2 md:before:-translate-x-1/2">
              {branchEntries.map((entry, index) => (
                <li
                  key={entry.id}
                  className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] items-stretch md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)]"
                >
                  <span
                    className="ring-background absolute top-4 left-[7px] size-3 rounded-full [background-color:var(--experience-track-color)] ring-4 md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  />
                  <Card
                    className={`bg-card col-start-2 row-start-1 rounded-xl border-l-2 border-l-[var(--experience-track-color)] shadow-sm ${
                      index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-3'
                    }`}
                  >
                    <CardContent className="px-4 py-3">
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <p className="text-muted-foreground font-mono text-[0.68rem] tracking-wide">
                          {entry.period}
                        </p>
                        <span className="text-muted-foreground text-xs">{entry.arrangement}</span>
                      </div>
                      <h3 className="mt-2 text-sm leading-5 font-semibold tracking-tight">
                        {entry.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-[var(--experience-track-color)]">
                        {entry.organization}
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm leading-5">
                        {entry.summary}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
