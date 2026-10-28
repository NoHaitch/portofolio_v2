import { NextResponse, type NextRequest } from 'next/server'
import { isLocale } from '@/lib/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, firstSegment] = pathname.split('/')

  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
