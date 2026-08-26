import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <Card className="bg-card/80 flex flex-1 flex-col rounded-2xl shadow-sm backdrop-blur">
      <CardContent className="flex flex-col gap-6 p-8">
        <p className="text-sm tracking-[0.3em] text-emerald-500 uppercase">About</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          I’m a security-minded engineer who values clarity, discipline, and practical delivery.
        </h1>
        <div className="text-muted-foreground grid gap-6 text-lg leading-8 md:grid-cols-2">
          <p>
            I’m Francisco Trianto, currently based in Indonesia. I graduated from Institut Teknologi
            Bandung with a degree in Informatics Engineering and have a strong interest in system
            software, cyber security, AI, data, web development, and distributed systems.
          </p>
          <p>
            My approach is usually calm and structured. I like building things that are
            maintainable, well reasoned, and useful in the real world, whether that means a web
            platform, a backend service, or a security-focused solution.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="border-border rounded-full border px-3 py-1 text-sm">
            Security-minded
          </span>
          <span className="border-border rounded-full border px-3 py-1 text-sm">
            Systems thinking
          </span>
          <span className="border-border rounded-full border px-3 py-1 text-sm">AI & data</span>
          <span className="border-border rounded-full border px-3 py-1 text-sm">
            Web engineering
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
