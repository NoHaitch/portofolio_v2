import Image from 'next/image'
import { ArrowUpRight, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button-variants'
import { getMessages, type Locale } from '@/lib/i18n'

export default async function EducationPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = getMessages(locale).education

  const items = [
    {
      id: 'itb',
      title: 'Institut Teknologi Bandung',
      degree: messages.universityDegree,
      period: messages.universityPeriod,
      grade: messages.universityGrade,
      detailGroups: [
        {
          label: messages.universityDetailsLabel,
          items: messages.universityDetails,
        },
        {
          label: messages.universityActivitiesLabel,
          items: messages.universityActivities,
        },
      ],
      skillsLabel: messages.skillsLabel,
      skills: messages.universitySkills,
      logo: '/education/Logo%20ITB_COLOR_2026@2x.png',
      certificate: '/education/Ijazah%20ITB.pdf',
    },
    {
      id: 'sman5',
      title: 'SMA Negeri 5 Bandung',
      degree: messages.highSchoolDegree,
      period: messages.highSchoolPeriod,
      grade: null,
      detailGroups: [
        {
          label: messages.highSchoolActivitiesLabel,
          items: messages.highSchoolActivities,
        },
        {
          label: messages.highSchoolHonorsLabel,
          items: messages.highSchoolHonors,
        },
      ],
      skillsLabel: null,
      skills: [],
      logo: '/education/SMAN_5_Bandung.png',
      certificate: undefined,
    },
  ]

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-primary mb-3 font-mono text-xs font-medium tracking-[0.18em] uppercase">
          {messages.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{messages.title}</h1>
        <p className="text-muted-foreground mt-4 leading-7">{messages.introduction}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
        <div className="mx-auto w-full max-w-xs lg:max-w-none">
          <Image
            src="/self/graduation.jpg"
            alt={messages.photoAlt}
            width={1200}
            height={1800}
            sizes="(min-width: 1024px) 320px, 320px"
            className="border-border aspect-[2/3] w-full rounded-2xl border object-cover shadow-sm"
          />
        </div>

        <ol className="space-y-5">
          {items.map((item) => (
            <li key={item.id}>
              <Card className="bg-card flex-row items-start gap-0 rounded-2xl shadow-sm">
                <CardContent className="flex w-full items-start gap-4 p-5 sm:gap-6 sm:p-6">
                  <div className="border-border bg-background flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-2 sm:size-16">
                    <Image
                      src={item.logo}
                      alt={`${item.title} logo`}
                      width={56}
                      height={56}
                      className="size-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground mt-1 text-sm">{item.degree}</p>
                      </div>
                      <span className="text-muted-foreground shrink-0 font-mono text-xs">
                        {item.period}
                      </span>
                    </div>
                    {item.grade && (
                      <p className="text-accent-foreground mt-3 text-sm font-medium">
                        {item.grade}
                      </p>
                    )}
                    <div className="text-muted-foreground mt-4 space-y-3 text-sm leading-6">
                      {item.detailGroups.map((group) => (
                        <div key={group.label}>
                          <p className="text-foreground font-medium">{group.label}</p>
                          <ul className="mt-1 list-inside list-disc space-y-1">
                            {group.items.map((entry) => (
                              <li key={entry}>{entry}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {item.skills.length > 0 && item.skillsLabel && (
                      <div className="mt-4">
                        <p className="text-foreground mb-2 text-sm font-medium">
                          {item.skillsLabel}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <li
                              key={skill}
                              className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-medium"
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {item.certificate && (
                      <a
                        className={`${buttonVariants({ variant: 'outline', size: 'sm' })} mt-4`}
                        href={item.certificate}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={messages.certificateLabel}
                      >
                        <FileText className="size-4" aria-hidden="true" />
                        {messages.certificate}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
