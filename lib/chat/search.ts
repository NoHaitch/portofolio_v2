import type { ChatMessage } from './types'

export function matchesConversationSearch({
  code,
  lastMessage,
  messages,
  term,
}: {
  code: string
  lastMessage: string
  messages?: ChatMessage[]
  term: string
}) {
  const search = term.trim().toLocaleLowerCase()
  if (!search) return false
  return (
    code.toLocaleLowerCase().includes(search) ||
    lastMessage.toLocaleLowerCase().includes(search) ||
    messages?.some((message) => message.text.toLocaleLowerCase().includes(search)) === true
  )
}
