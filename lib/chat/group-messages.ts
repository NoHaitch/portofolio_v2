import type { ChatMessage } from './types'

const GROUP_INTERVAL_MS = 5 * 60 * 1000

export function groupMessages(messages: ChatMessage[]) {
  const groups: ChatMessage[][] = []
  for (const message of messages) {
    const group = groups[groups.length - 1]
    const previous = group?.[group.length - 1]
    const time = message.createdAt?.toDate()
    const previousTime = previous?.createdAt?.toDate()
    if (
      previous &&
      previous.sender === message.sender &&
      time &&
      previousTime &&
      time.toDateString() === previousTime.toDateString() &&
      time.getTime() >= previousTime.getTime() &&
      time.getTime() - previousTime.getTime() <= GROUP_INTERVAL_MS
    ) {
      group.push(message)
    } else {
      groups.push([message])
    }
  }
  return groups
}
