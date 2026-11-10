import 'server-only'
import type { GuardModel } from './guardrails'

export const generateAssistantContent: GuardModel = async (instruction, input, json) => {
  const key = process.env.GEMINI_API_KEY?.trim()
  if (!key) throw new Error('Missing GEMINI_API_KEY for the portfolio assistant.')

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instruction }] },
        contents: [{ role: 'user', parts: [{ text: input }] }],
        generationConfig: {
          maxOutputTokens: 1024,
          ...(json ? { responseMimeType: 'application/json' } : {}),
        },
      }),
      signal: AbortSignal.timeout(60000),
      cache: 'no-store',
    },
  )
  if (!response.ok) throw new Error(`Gemini request failed with HTTP ${response.status}.`)

  const data: unknown = await response.json()
  if (
    !data ||
    typeof data !== 'object' ||
    !('candidates' in data) ||
    !Array.isArray(data.candidates)
  ) {
    throw new Error('Gemini returned no usable candidate.')
  }
  const candidate = data.candidates[0] as
    | { finishReason?: unknown; content?: { parts?: { text?: unknown; thought?: boolean }[] } }
    | undefined
  if (candidate?.finishReason !== 'STOP' || !Array.isArray(candidate.content?.parts)) {
    throw new Error('Gemini did not complete the response.')
  }
  const text = candidate.content.parts
    .filter((part) => !part.thought && typeof part.text === 'string')
    .map((part) => part.text)
    .join('')
    .trim()
  if (!text) throw new Error('Gemini returned an empty response.')
  return text
}
