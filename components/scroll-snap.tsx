'use client'

import { useEffect } from 'react'

const IDLE_MS = 180
const SNAP_DISTANCE = 96
const HEADER_OFFSET = 72

// Snaps to the target only after scrolling has been idle, so continuous scrolling is never held back.
export function ScrollSnap({ targetId }: { targetId: string }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timer: ReturnType<typeof setTimeout> | undefined

    const snap = () => {
      const target = document.getElementById(targetId)
      if (!target) return
      const delta = target.getBoundingClientRect().top - HEADER_OFFSET
      if (Math.abs(delta) < 2 || Math.abs(delta) > SNAP_DISTANCE) return
      window.scrollBy({ top: delta, behavior: 'smooth' })
    }

    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(snap, IDLE_MS)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [targetId])

  return null
}
