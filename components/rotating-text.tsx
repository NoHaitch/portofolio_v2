'use client'

import { useEffect, useState } from 'react'

export default function RotatingText({
  words = [],
  interval = 3000,
}: {
  words: string[]
  interval?: number
}) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const tick = () => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setVisible(true)
      }, 400)
    }

    const id = setInterval(tick, interval)
    return () => clearInterval(id)
  }, [interval, words.length])

  return (
    <div className="h-12 overflow-hidden">
      <span
        role="text"
        aria-live="polite"
        className={`block transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {words[index]}
      </span>
    </div>
  )
}
