import { describe, expect, it } from 'vitest'
import {
  buildGroundedPrompt,
  chunkMarkdown,
  retrieve,
  type KnowledgeChunk,
} from '@/lib/assistant/retrieval'

const chunks: KnowledgeChunk[] = [
  {
    id: 'a',
    title: 'Raft Consensus',
    kind: 'project',
    href: '/work/projects/raft',
    text: 'Distributed systems project with leader election and log replication in TypeScript.',
  },
  {
    id: 'b',
    title: 'Volleyball Club',
    kind: 'activity',
    href: '/work/activities/volleyball',
    text: 'Member of the ITB volleyball club.',
  },
]

describe('retrieve', () => {
  it('matches singular and plural forms', () => {
    const results = retrieve(chunks, 'which projects use raft')
    expect(results[0].id).toBe('a')
    expect(retrieve(chunks, 'volleyballs')[0]?.id).toBe('b')
  })

  it('ranks the matching chunk first', () => {
    const results = retrieve(chunks, 'Tell me about the distributed raft project')
    expect(results[0].id).toBe('a')
  })

  it('returns nothing when no term matches', () => {
    expect(retrieve(chunks, 'favorite pizza topping')).toEqual([])
  })

  it('returns nothing for stop-word-only queries', () => {
    expect(retrieve(chunks, 'what is the')).toEqual([])
  })

  it('respects the limit', () => {
    expect(retrieve(chunks, 'project volleyball', { limit: 1 })).toHaveLength(1)
  })
})

describe('chunkMarkdown', () => {
  it('splits long text on paragraph boundaries', () => {
    const result = chunkMarkdown('aaa\n\nbbb\n\nccc', 8)
    expect(result).toEqual(['aaa\n\nbbb', 'ccc'])
  })
})

describe('buildGroundedPrompt', () => {
  it('numbers sources and includes the question', () => {
    const prompt = buildGroundedPrompt('Q?', retrieve(chunks, 'raft'))
    expect(prompt).toContain('[1] Raft Consensus (project)')
    expect(prompt).toContain('Question: Q?')
  })

  it('marks missing sources explicitly', () => {
    expect(buildGroundedPrompt('Q?', [])).toContain('(none found)')
  })
})
