export type KnowledgeChunk = {
  id: string
  title: string
  kind: 'profile' | 'project' | 'activity' | 'experience' | 'education'
  href: string
  text: string
}

export type RetrievedChunk = KnowledgeChunk & { score: number }

const stopWords = new Set(
  'a an and are as at be by can did do does for from has have how i in is it me of on or tell that the this to was what when where which who why with you your about his he him'.split(
    ' ',
  ),
)

const maxChunkLength = 900

export function tokenize(text: string) {
  return (text.toLowerCase().match(/[a-z0-9#+.]+/g) ?? [])
    .map((word) => word.replace(/^\.+|\.+$/g, ''))
    .filter((word) => word.length > 1 && !stopWords.has(word))
    .map((word) =>
      word.length > 3 && word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word,
    )
}

export function chunkMarkdown(body: string, limit = maxChunkLength) {
  const chunks: string[] = []
  let current = ''
  for (const block of body.split(/\n{2,}/)) {
    const trimmed = block.trim()
    if (!trimmed) continue
    if (current && current.length + trimmed.length + 2 > limit) {
      chunks.push(current)
      current = ''
    }
    current = current ? `${current}\n\n${trimmed}` : trimmed
  }
  if (current) chunks.push(current)
  return chunks
}

// BM25-style keyword scoring; the title is repeated so title matches outrank body matches.
export function retrieve(
  chunks: KnowledgeChunk[],
  query: string,
  { limit = 5, minScore = 0.5 }: { limit?: number; minScore?: number } = {},
): RetrievedChunk[] {
  const terms = [...new Set(tokenize(query))]
  if (terms.length === 0 || chunks.length === 0) return []

  const documents = chunks.map((chunk) => tokenize(`${chunk.title} ${chunk.title} ${chunk.text}`))
  const averageLength = documents.reduce((sum, doc) => sum + doc.length, 0) / documents.length
  const documentFrequency = new Map<string, number>()
  for (const term of terms) {
    documentFrequency.set(term, documents.filter((doc) => doc.includes(term)).length)
  }

  const k1 = 1.4
  const b = 0.75
  return chunks
    .map((chunk, index) => {
      const doc = documents[index]
      let score = 0
      for (const term of terms) {
        const frequency = doc.filter((word) => word === term).length
        if (frequency === 0) continue
        const df = documentFrequency.get(term) ?? 0
        const idf = Math.log(1 + (chunks.length - df + 0.5) / (df + 0.5))
        score +=
          (idf * frequency * (k1 + 1)) /
          (frequency + k1 * (1 - b + b * (doc.length / (averageLength || 1))))
      }
      return { ...chunk, score }
    })
    .filter((chunk) => chunk.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function buildGroundedPrompt(question: string, sources: RetrievedChunk[]) {
  if (sources.length === 0) {
    return `Sources:\n(none found)\n\nQuestion: ${question}`
  }
  const formatted = sources
    .map((source, index) => `[${index + 1}] ${source.title} (${source.kind})\n${source.text}`)
    .join('\n\n')
  return `Sources:\n${formatted}\n\nQuestion: ${question}`
}
