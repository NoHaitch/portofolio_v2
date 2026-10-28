import { getMessages, type Locale } from '@/lib/i18n'

export default function Footer({ locale }: { locale: Locale }) {
  const messages = getMessages(locale)

  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>{messages.footer.copyright}</p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/NoHaitch"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/francisco-trianto"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
