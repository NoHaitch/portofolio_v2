import { ArrowUpRight } from 'lucide-react'
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaXTwitter,
} from 'react-icons/fa6'
import { SiKaggle, SiLeetcode } from 'react-icons/si'
import { Card, CardContent } from '@/components/ui/card'
import { getMessages, type Locale } from '@/lib/i18n'

const professionalLinks = [
  {
    name: 'Email',
    handle: 'franciscotrianto@gmail.com',
    href: 'mailto:franciscotrianto@gmail.com',
    icon: FaEnvelope,
  },
  {
    name: 'LinkedIn',
    handle: 'francisco-trianto',
    href: 'https://linkedin.com/in/francisco-trianto',
    icon: FaLinkedin,
  },
  {
    name: 'GitHub',
    handle: '@NoHaitch',
    href: 'https://github.com/NoHaitch',
    icon: FaGithub,
  },
]

const communityLinks = [
  {
    name: 'Instagram',
    handle: '@francisco.rftb',
    href: 'https://instagram.com/francisco.rftb',
    icon: FaInstagram,
  },
  {
    name: 'X',
    handle: '@francisco_rftb',
    href: 'https://x.com/francisco_rftb',
    icon: FaXTwitter,
  },
  {
    name: 'Medium',
    handle: '@franciscotrianto',
    href: 'https://medium.com/@franciscotrianto',
    icon: FaMedium,
  },
  {
    name: 'LeetCode',
    handle: 'franciscotrianto',
    href: 'https://leetcode.com/franciscotrianto',
    icon: SiLeetcode,
  },
  {
    name: 'Kaggle',
    handle: 'nohaitch',
    href: 'https://www.kaggle.com/nohaitch',
    icon: SiKaggle,
  },
]

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const messages = getMessages(locale).contact
  const sections = [
    { id: 'professional', title: messages.professional, links: professionalLinks },
    { id: 'community', title: messages.community, links: communityLinks },
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

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-heading`}>
            <h2
              id={`${section.id}-heading`}
              className="text-muted-foreground mb-4 font-mono text-xs font-medium tracking-[0.16em] uppercase"
            >
              {section.title}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.links.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="group focus-visible:outline-ring rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <Card className="bg-card group-hover:bg-accent/40 h-full rounded-2xl shadow-sm transition-colors">
                      <CardContent className="flex items-center gap-4 p-5">
                        <span className="bg-accent text-accent-foreground flex size-11 shrink-0 items-center justify-center rounded-full">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="text-card-foreground block font-medium">
                            {social.name}
                          </span>
                          <span className="text-muted-foreground mt-1 block truncate text-sm">
                            {social.handle}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-colors"
                          aria-hidden="true"
                        />
                      </CardContent>
                    </Card>
                  </a>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
