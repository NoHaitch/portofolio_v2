import { Card, CardContent } from '@/components/ui/card'
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaXTwitter,
  FaEnvelope,
} from 'react-icons/fa6'
import { SiKaggle, SiLeetcode } from 'react-icons/si'

const professionalLinks = [
  {
    name: 'Email',
    handle: 'franciscotrianto@gmail.com',
    href: 'mailto:franciscotrianto@gmail.com',
    icon: FaEnvelope,
    accent: 'from-emerald-500/20 to-emerald-500/5',
    featured: true,
  },
  {
    name: 'LinkedIn',
    handle: 'francisco-trianto',
    href: 'https://linkedin.com/in/francisco-trianto',
    icon: FaLinkedin,
    accent: 'from-sky-600/20 to-sky-500/5',
    featured: true,
  },
  {
    name: 'GitHub',
    handle: '@NoHaitch',
    href: 'https://github.com/NoHaitch',
    icon: FaGithub,
    accent: 'from-violet-600/20 to-violet-500/10',
    featured: false,
  },
]

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@francisco.rftb',
    href: 'https://instagram.com/francisco.rftb',
    icon: FaInstagram,
    accent: 'from-zinc-500/10 to-zinc-400/5',
  },
  {
    name: 'X',
    handle: '@francisco_rftb',
    href: 'https://x.com/francisco_rftb',
    icon: FaXTwitter,
    accent: 'from-zinc-500/10 to-zinc-400/5',
  },
  {
    name: 'Medium',
    handle: '@franciscotrianto',
    href: 'https://medium.com/@franciscotrianto',
    icon: FaMedium,
    accent: 'from-zinc-500/10 to-zinc-400/5',
  },
  {
    name: 'LeetCode',
    handle: 'franciscotrianto',
    href: 'https://leetcode.com/franciscotrianto',
    icon: SiLeetcode,
    accent: 'from-zinc-500/10 to-zinc-400/5',
  },
  {
    name: 'Kaggle',
    handle: 'nohaitch',
    href: 'https://www.kaggle.com/nohaitch',
    icon: SiKaggle,
    accent: 'from-zinc-500/10 to-zinc-400/5',
  },
]

export default function ContactPage() {
  return (
    <Card className="bg-card/80 flex flex-1 flex-col rounded-2xl shadow-sm backdrop-blur">
      <CardContent className="flex flex-col gap-6 p-8">
        <p className="text-base font-semibold tracking-[0.35em] text-emerald-500 uppercase">
          Contact
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Let's connect.</h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-8">
          Reach out across the platforms where I share work, writing, and ideas.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-base font-semibold tracking-[0.3em] text-emerald-500 uppercase">
              Core Channels
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {professionalLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group border-border rounded-2xl border bg-gradient-to-br ${social.accent} hover:bg-accent p-5 transition hover:-translate-y-0.5 ${social.featured ? 'md:col-span-2 xl:col-span-1' : 'md:col-span-2 xl:col-span-1'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="border-border/80 bg-background/70 text-foreground rounded-full border p-3 shadow-sm">
                        <Icon className={`h-5 w-5 ${social.featured ? 'h-6 w-6' : ''}`} />
                      </div>
                      <div>
                        <h3
                          className={`text-foreground font-semibold ${social.featured ? 'text-lg' : ''}`}
                        >
                          {social.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{social.handle}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold tracking-[0.3em] text-emerald-500 uppercase">
              Community & Writing
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group border-border rounded-2xl border bg-gradient-to-br ${social.accent} hover:bg-accent p-4 transition hover:-translate-y-0.5`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="border-border/80 bg-background/70 text-foreground rounded-full border p-2.5 shadow-sm">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-foreground font-medium">{social.name}</h3>
                        <p className="text-muted-foreground text-sm">{social.handle}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
