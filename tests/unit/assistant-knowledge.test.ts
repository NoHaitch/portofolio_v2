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

  it('retrieves the actual university, faculty and major for education questions', () => {
    const sources = retrieve(knowledge, 'Francisco studied ITB education major')
    expect(sources.some((source) => source.text.includes('Sekolah Teknik Elektro'))).toBe(true)
    expect(sources.some((source) => source.text.includes('Informatics/Computer Science'))).toBe(
      true,
    )
  })

  it('retrieves the degree for a natural education question', () => {
    const sources = retrieve(knowledge, 'What did Francisco study?')
    expect(sources.some((source) => source.text.includes('Informatics Engineering'))).toBe(true)
  })

  it('retrieves individual course grades and specialization details', () => {
    const course = retrieve(knowledge, 'IF4031-24 distributed application architecture grade')
    expect(course[0].text).toContain('3 credits, grade A')
    const specializations = retrieve(knowledge, 'Francisco ITB two specializations')
    expect(
      specializations.some(
        (source) =>
          source.text.includes('System Software Engineering') &&
          source.text.includes('Cyber Security'),
      ),
    ).toBe(true)
  })

  it('retrieves the GCI World training as separate from the ITB degree', () => {
    const sources = retrieve(knowledge, 'GCI World April 2026 Matsuo Tokyo AI data science')
    expect(sources.some((source) => source.text.includes('separate from'))).toBe(true)
  })

  it('loads the approved transcript courses without the excluded English grade', () => {
    const courses = knowledge.filter((chunk) => /^[A-Z]{2}\d{4}-\d{2}/.test(chunk.title))
    expect(courses).toHaveLength(52)
    const english = courses.find((chunk) => chunk.title.includes('KU1024-19'))
    expect(english?.text).toContain('2 credits')
    expect(english?.text).not.toMatch(/grade/i)
    expect(courses.some((chunk) => chunk.title.includes('KU2063-19'))).toBe(false)
  })
})
