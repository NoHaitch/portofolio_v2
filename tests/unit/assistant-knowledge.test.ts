import { describe, expect, it } from 'vitest'
import { buildKnowledgeBase } from '@/lib/assistant/corpus'
import { retrieve } from '@/lib/assistant/retrieval'

describe('knowledge base retrieval', () => {
  const knowledge = buildKnowledgeBase()

  it('finds career goals first for role questions', () => {
    const [top] = retrieve(knowledge, 'What roles does Francisco want?')
    expect(top.text).toContain('AI and data science roles')
  })

  it('finds favorite food', () => {
    const [top] = retrieve(knowledge, 'What is his favorite food?')
    expect(top.text).toContain('carbonara')
  })

  it('finds the language chunk', () => {
    const [top] = retrieve(knowledge, 'Does he speak Japanese?')
    expect(top.text).toContain('Japanese')
  })
})
