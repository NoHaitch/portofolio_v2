import Link from 'next/link'
import { getLocalePath, getMessages, type Locale } from '@/lib/i18n'

const socialLinks = [
  { label: 'Email', href: 'mailto:franciscotrianto@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/NoHaitch' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/francisco-trianto' },
  { label: 'Medium', href: 'https://medium.com/@franciscotrianto' },
]

const linkClass =
  'text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none'

export default function Footer({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)
  const quickLinks = [
    { href: '/', label: messages.navigation.home },
    { href: '/about', label: messages.navigation.about },
    { href: '/projects', label: messages.navigation.projects },
    { href: '/experience', label: messages.navigation.experience },
    { href: '/education', label: messages.navigation.education },
    { href: '/contact', label: messages.navigation.contact },
    { href: '/about-site', label: messages.footer.aboutSite },
  ]

  return (
    <footer className="border-border border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 text-sm sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-base font-semibold tracking-tight">Francisco Trianto</p>
          <p className="text-muted-foreground mt-3 max-w-sm leading-6">{messages.footer.tagline}</p>
        </div>

        <nav aria-label={messages.footer.quickLinks}>
          <h2 className="text-primary font-mono text-xs font-medium tracking-[0.16em] uppercase">
            {messages.footer.quickLinks}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={getLocalePath(locale, item.href)} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-primary font-mono text-xs font-medium tracking-[0.16em] uppercase">
            {messages.footer.connect}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={linkClass}
                  {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>{messages.footer.copyright}</p>
          <a href="#top" className={linkClass}>
            {messages.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
