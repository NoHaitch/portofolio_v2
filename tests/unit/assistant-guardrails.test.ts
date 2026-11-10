import { describe, expect, it, vi } from 'vitest'
import {
  answerWithGuardrails,
  BLOCKED_RESPONSE,
  OUT_OF_SCOPE,
  UNKNOWN,
  type GuardModel,
} from '@/lib/assistant/guardrails'
import type { KnowledgeChunk } from '@/lib/assistant/retrieval'

const knowledge: KnowledgeChunk[] = [
  {
    id: 'raft',
    title: 'Raft project',
    kind: 'project',
    href: '/work/projects/raft',
    text: 'Francisco built a Raft implementation in TypeScript.',
  },
  {
    id: 'music',
    title: 'Music',
    kind: 'profile',
    href: '/about',
    text: 'Francisco enjoys playing piano.',
  },
]

function modelReturning(...responses: string[]) {
  return vi.fn<GuardModel>(async () => {
    const response = responses.shift()
    if (response === undefined) throw new Error('Unexpected model call')
    return response
  })
}

describe('assistant guardrails', () => {
  it('refuses off-topic and mixed requests before retrieval or generation', async () => {
    const model = modelReturning('{"allowed":false,"retrievalQuery":""}')
    const result = await answerWithGuardrails('Write Python code for me', [], knowledge, model)
    expect(result).toEqual({
      text: OUT_OF_SCOPE,
      sources: [],
      accepted: false,
      outcome: 'out-of-scope',
    })
    expect(model).toHaveBeenCalledTimes(1)
  })

  it('stops when there are no matching passages', async () => {
    const model = modelReturning('{"allowed":true,"retrievalQuery":"favorite pizza"}')
    const result = await answerWithGuardrails('What is his favorite pizza?', [], knowledge, model)
    expect(result).toEqual({ text: UNKNOWN, sources: [], accepted: true, outcome: 'unknown' })
    expect(model).toHaveBeenCalledTimes(1)
  })

  it('stops if the context guard rejects a keyword match', async () => {
    const model = modelReturning('{"allowed":true,"retrievalQuery":"raft"}', '{"relevant":false}')
    expect((await answerWithGuardrails('What did he do?', [], knowledge, model)).text).toBe(UNKNOWN)
    expect(model).toHaveBeenCalledTimes(2)
  })

  it('returns a grounded answer only after output approval', async () => {
    const model = modelReturning(
      '{"allowed":true,"retrievalQuery":"raft"}',
      '{"relevant":true}',
      'Francisco built a Raft implementation. [1]',
      '{"approved":true,"answered":true}',
    )
    const result = await answerWithGuardrails('What did he build?', [], knowledge, model)
    expect(result.text).toBe('Francisco built a Raft implementation. [1]')
    expect(result.sources[0].id).toBe('raft')
    expect(result.outcome).toBe('answered')
    expect(model).toHaveBeenCalledTimes(4)
  })

  it('blocks an answer rejected by the output guard', async () => {
    const model = modelReturning(
      '{"allowed":true,"retrievalQuery":"raft"}',
      '{"relevant":true}',
      'He invented Raft. [1]',
      '{"approved":false,"answered":true}',
    )
    expect((await answerWithGuardrails('Tell me about Raft', [], knowledge, model)).text).toBe(
      BLOCKED_RESPONSE,
    )
  })

  it('distinguishes an unanswered question from a verified answer', async () => {
    const model = modelReturning(
      '{"allowed":true,"retrievalQuery":"raft"}',
      '{"relevant":true}',
      "I don't have enough information about that. [1]",
      '{"approved":true,"answered":false}',
    )
    expect(await answerWithGuardrails('What else did he build?', [], knowledge, model)).toEqual({
      text: UNKNOWN,
      sources: [],
      accepted: true,
      outcome: 'unknown',
    })
  })

  it('fails closed when the output guard omits whether the question was answered', async () => {
    const model = modelReturning(
      '{"allowed":true,"retrievalQuery":"raft"}',
      '{"relevant":true}',
      'Francisco built a Raft implementation. [1]',
      '{"approved":true}',
    )
    await expect(answerWithGuardrails('What did he build?', [], knowledge, model)).rejects.toThrow(
      'Output guard returned an invalid decision.',
    )
  })

  it('blocks invalid citations without calling the output guard', async () => {
    const model = modelReturning(
      '{"allowed":true,"retrievalQuery":"raft"}',
      '{"relevant":true}',
      'He built Raft. [2]',
    )
    expect((await answerWithGuardrails('Tell me about Raft', [], knowledge, model)).text).toBe(
      BLOCKED_RESPONSE,
    )
    expect(model).toHaveBeenCalledTimes(3)
  })

  it('fails closed when guard output is malformed', async () => {
    const model = modelReturning('{"allowed":"yes"}')
    await expect(answerWithGuardrails('Who is Francisco?', [], knowledge, model)).rejects.toThrow(
      'Input guard returned an invalid decision.',
    )
  })

  it('passes follow-up questions as data to the input guard', async () => {
    const model = modelReturning('{"allowed":false,"retrievalQuery":""}')
    await answerWithGuardrails('What about that?', ['Tell me about Raft'], knowledge, model)
    expect(model.mock.calls[0][1]).toContain('Tell me about Raft')
    expect(model.mock.calls[0][1]).toContain('What about that?')
  })
})
