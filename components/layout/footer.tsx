'use client'

export default function Footer() {
  return (
    <footer className="border-border/80 bg-background/95 border-t backdrop-blur">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>© 2026 Francisco Trianto.</p>
        <div className="flex flex-wrap gap-4">
          <a href="https://github.com/NoHaitch" className="hover:text-foreground transition">
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/francisco-trianto"
            className="hover:text-foreground transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
