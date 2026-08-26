import { Card, CardContent } from '@/components/ui/card'

export default function ProjectsPage() {
  return (
    <Card className="bg-card/80 flex flex-1 flex-col rounded-2xl shadow-sm backdrop-blur">
      <CardContent className="flex flex-col gap-6 p-8">
        <p className="text-sm tracking-[0.3em] text-emerald-500 uppercase">Projects</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Selected work focused on reliability, clarity, and depth.
        </h1>
        <div className="text-muted-foreground grid gap-4 text-lg leading-8 md:grid-cols-3">
          <div className="border-border rounded-2xl border p-5">
            <h2 className="text-foreground mb-2 font-semibold">Web products</h2>
            <p>Building polished interfaces with Next.js, React, and TypeScript.</p>
          </div>
          <div className="border-border rounded-2xl border p-5">
            <h2 className="text-foreground mb-2 font-semibold">Systems & backend</h2>
            <p>Designing maintainable services with a strong focus on structure and performance.</p>
          </div>
          <div className="border-border rounded-2xl border p-5">
            <h2 className="text-foreground mb-2 font-semibold">AI & security</h2>
            <p>Exploring practical AI workflows and security-minded engineering practices.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
