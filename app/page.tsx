import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <Card className="via-background to-card flex flex-1 flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/15 p-0 shadow-sm">
      <CardContent className="flex flex-col gap-6 p-8 sm:p-12">
        <p className="text-sm tracking-[0.35em] text-emerald-500 uppercase">Welcome</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          I build secure, thoughtful systems with a strong foundation in engineering and design.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-8">
          I’m Francisco Trianto, a software engineer based in Indonesia with a background in
          Informatics Engineering from ITB. I care about security, scalable systems, AI, and clear
          implementation.
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
      </CardContent>
    </Card>
  )
}
