import Link from 'next/link'
import Image from 'next/image'
import RotatingText from '@/components/rotating-text'

export default function Home() {
  return (
    <main className="relative flex w-full flex-1 items-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/60 via-emerald-50 to-white/20 dark:from-slate-900/40 dark:via-slate-900/30" />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:items-stretch">
        <div className="flex items-center justify-center">
          <Image
            src="/home/landing.jpg"
            alt="Francisco Trianto"
            width={600}
            height={800}
            className="w-full max-w-sm rounded-lg object-cover shadow-lg"
            priority
          />
        </div>

        <div className="relative flex w-full flex-col justify-center gap-4 px-4 sm:px-0 lg:w-1/2">
          <h1 className="text-6xl leading-tight font-extrabold tracking-tight sm:text-7xl">
            Francisco Trianto
          </h1>

          <div className="mt-1 mb-2 text-2xl font-semibold text-emerald-600 sm:text-4xl">
            <RotatingText
              words={['System Software Engineer', 'AI & Data Scientist', 'Cyber Security']}
              interval={3000}
            />
          </div>

          <p className="text-muted-foreground max-w-2xl text-lg leading-8">
            Currently a software engineer based in Indonesia with a background in Informatics
            Engineering @ ITB. I care about security, scalable systems, and practical data-driven
            solutions.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="bg-primary text-primary-foreground rounded-full px-5 py-3 font-medium transition hover:opacity-90"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="border-border text-foreground hover:bg-accent rounded-full border px-5 py-3 font-medium transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
