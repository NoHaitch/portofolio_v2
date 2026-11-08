'use client'

import { useEffect, useRef } from 'react'

export function useThreadScroll(
  conversationId: string | null,
  lastMessageId: string | undefined,
  active: boolean,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentConversation = useRef<string | null>(null)
  const atBottom = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    if (!active || !container) return
    if (currentConversation.current !== conversationId || atBottom.current) {
      container.scrollTop = container.scrollHeight
      atBottom.current = true
    }
    currentConversation.current = conversationId
  }, [conversationId, lastMessageId, active])

  function onScroll() {
    const container = containerRef.current
    if (container) {
      atBottom.current = container.scrollHeight - container.scrollTop - container.clientHeight < 60
    }
  }

  return { containerRef, onScroll }
}
