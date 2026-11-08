export const MAX_REPLY_PREVIEW_LENGTH = 100

export function getReplyPreview(text: string) {
  const characters = Array.from(text.replace(/\s+/gu, ' ').trim())
  if (characters.length <= MAX_REPLY_PREVIEW_LENGTH) return characters.join('')
  return `${characters
    .slice(0, MAX_REPLY_PREVIEW_LENGTH - 1)
    .join('')
    .trimEnd()}…`
}
