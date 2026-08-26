import React from 'react'
import Image from 'next/image'

export default function EducationPage() {
  const items = [
    {
      id: 'itb',
      title: 'Institut Teknologi Bandung',
      degree: 'B.Eng — Informatics Engineering',
      period: '2022 — 2026',
      meta: 'Cum laude · GPA 3.57',
      bullets: [
        'Major: Informatics Engineering',
        'Specializations: Cyber Security, System Software Engineering',
      ],
      logo: '/education/Logo%20ITB_COLOR_2026@2x.png',
    },
    {
      id: 'sman5',
      title: 'SMAN 5 Bandung',
      degree: 'High School',
      period: '2019 — 2022',
      meta: 'Honor student · OSN participant (mathematics, city level)',
      bullets: ['Honor student', 'Represented school twice at OSN (Mathematics — city level)'],
      logo: '/education/SMAN_5_Bandung.png',
    },
  ]

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h2 className="mb-8 text-4xl font-extrabold">Education</h2>

      <div className="relative">
        <div className="bg-border/50 absolute top-0 bottom-0 left-6 w-0.5" />

        <ol className="space-y-12">
          {items.map((item) => (
            <li key={item.id} className="relative flex gap-6">
              <div className="flex w-40 flex-col items-center text-sm">
                <div className="text-muted-foreground mb-2">{item.period}</div>
                <div className="ring-border relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white/60 ring-1">
                  <Image
                    src={item.logo}
                    alt={`${item.title} logo`}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="border-border/60 bg-card/40 flex-1 rounded-md border p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <div className="text-muted-foreground mt-1 text-sm">
                  {item.degree} · {item.meta}
                </div>
                <p className="text-muted-foreground mt-3">
                  {item.bullets.map((b, i) => (
                    <span key={i} className="block">
                      • {b}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
