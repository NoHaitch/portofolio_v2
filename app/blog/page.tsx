import { Card, CardContent } from '@/components/ui/card'

export default function BlogPage() {
  return (
    <Card className="bg-card/80 flex flex-1 flex-col rounded-2xl shadow-sm backdrop-blur">
      <CardContent className="flex flex-col gap-6 p-8">
        <p className="text-sm tracking-[0.3em] text-emerald-500 uppercase">Blog</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Writing about engineering, security, and thoughtful systems.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-8">
          This section will hold essays, notes, and reflections on software, product thinking, and
          the details that matter in real-world engineering.
        </p>
      </CardContent>
    </Card>
  )
}
