import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-variants'

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-primary font-mono text-sm tracking-widest uppercase">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
      <p className="text-muted-foreground mt-4 max-w-lg text-base leading-7">
        The page you are looking for may have moved or no longer exists.
      </p>
      <Link href="/" className={buttonVariants({ className: 'mt-8' })}>
        Return to home
      </Link>
    </main>
  )
}
