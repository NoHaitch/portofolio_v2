# AI assistant

This page explains how the portfolio AI assistant works, what each layer does, and how to set it up.
Today the assistant exists only as a private playground at `/admin/ai-test`.
It is not connected to visitors or to the support chat described in [chat.md](./chat.md).

## At a glance

| Question                          | Answer                                                                    |
| --------------------------------- | ------------------------------------------------------------------------- |
| Which model?                      | `gemini-3.5-flash-lite` (Google Gemini)                                   |
| How is it called?                 | From the browser through Firebase AI Logic (Gemini Developer API)         |
| How does it know about me?        | RAG: keyword retrieval over public site content, injected into the prompt |
| Is the model trained on my data?  | No. There is no fine-tuning and no embeddings                             |
| Who can use it?                   | Only the owner, in the admin playground                                   |
| What protects the model calls?    | Firebase App Check (reCAPTCHA Enterprise)                                 |
| Is chat history saved?            | No. It lives in memory until the page is refreshed                        |
| Are source passages shown inline? | No. A small superscript reference opens a short source-title tooltip      |

## Architecture

```text
                        BUILD / SERVER (Next.js server component)
  +------------------------------------------------------------------+
  |  content/assistant/profile.md                                    |
  |  content/work/projects/*.md        --> lib/assistant/corpus.ts   |
  |  content/work/activities/*.md          (load + split into chunks)|
  |  lib/i18n/messages/en.ts (experience, education)                 |
  +-----------------------------------+------------------------------+
                                      | KnowledgeChunk[] (props)
                                      v
                        BROWSER (client component)
  +------------------------------------------------------------------+
  |  components/admin/firebase-ai-playground.tsx                     |
  |                                                                  |
  |  1. Owner check (UID and email)                                  |
  |  2. retrieve(question)        lib/assistant/retrieval.ts         |
  |  3. buildGroundedPrompt()     sources + question                 |
  |  4. App Check token           lib/firebase/ai.ts                 |
  |  5. chat.sendMessage()  ------------------+                      |
  |  6. Render Markdown + sources             |                      |
  +-------------------------------------------|----------------------+
                                              v
                      Firebase AI Logic  -->  Gemini model
                      (App Check enforced)    (system instruction +
                                               grounded prompt)
```

## Layers

Each layer has one job, so you can change one without touching the others.

| Layer             | Responsibility                                                                  | Files                                                                              |
| ----------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 1. Content        | The approved facts the assistant may use                                        | `content/assistant/`, `content/work/`, `lib/i18n/messages/en.ts`                   |
| 2. Corpus         | Load content on the server and split it into chunks                             | `lib/assistant/corpus.ts`                                                          |
| 3. Retrieval      | Rank chunks against the question and pick the top few                           | `lib/assistant/retrieval.ts`                                                       |
| 4. Prompt         | Combine the sources and question, add the grounding rules                       | `buildGroundedPrompt`, `groundedSystemInstruction` in `lib/assistant/retrieval.ts` |
| 5. Model client   | Initialize Firebase, App Check, and the Gemini model                            | `lib/firebase/ai.ts`                                                               |
| 6. Chat UI        | Multi-turn chat, compact source references, timestamps, Markdown, theme, toggle | `components/admin/firebase-ai-playground.tsx`, `components/admin/ai-markdown.tsx`  |
| 7. Access control | Keep the page owner-only and the model calls attested                           | Owner check in the playground, Firebase App Check                                  |

## What happens when you ask a question

1. The server page builds the knowledge base once per request and passes it to the client.
2. You type a question.
   The client checks App Check, then runs `retrieve` on the knowledge base.
3. `retrieve` scores every chunk and keeps the top 5 above a minimum score.
4. `buildGroundedPrompt` formats them as numbered sources followed by your question.
   If nothing matched, it sends `(none found)`.
5. The message is sent through a Gemini chat session, so earlier turns stay in context.
6. Gemini replies using the system instruction as its rules.
7. The reply is rendered as Markdown.
   A small superscript link icon marks each citation.
   Hovering or keyboard-focusing it shows the source title, limited to 64 characters, and its content type; selecting the title opens the referenced page.
   The full passage is not shown in the tooltip.
8. Each user prompt shows its local send time beneath the message.

## Knowledge base

| Source            | Content used                                                 | Link target               |
| ----------------- | ------------------------------------------------------------ | ------------------------- |
| Assistant profile | `content/assistant/profile.md`                               | `/about`                  |
| Projects          | Summary, tags, fields, date, links, and body                 | `/work/projects/[slug]`   |
| Activities        | Summary, tags, date, links, and body                         | `/work/activities/[slug]` |
| Experience        | Title, organization, period, and summary (English)           | `/experience`             |
| Education         | Degree, grades, highlights, activities, and skills (English) | `/education`              |

- Long content is split on paragraph boundaries into chunks of about 900 characters.
- Each chunk keeps its title, type, and link so answers can cite it.
- Only English content is used.
- The knowledge base is sent to the browser, so it must contain public information only.

To change what the assistant knows, edit those files.
Do not duplicate project facts into the profile, because the Markdown files stay the single source of truth.
See [content/assistant/README.md](../content/assistant/README.md) for authoring guidance.

## Retrieval

Retrieval is a BM25-style keyword search with no embeddings and no vector database.

- Questions and chunks are lowercased and split into words, and common words such as "the" and "what" are ignored.
- The chunk title counts double, so title matches outrank body matches.
- Rare words weigh more than common ones, and very long chunks are slightly penalized.
- Results below the minimum score are dropped, which makes unrelated questions return no sources.

This is simple, fast, and easy to debug, which suits a corpus of about 50 documents.
Its weakness is vocabulary: asking about "school" will not match a chunk that only says "university".
If that becomes a problem, add embeddings later behind the same `retrieve` function.

## Prompt and system instruction

The system instruction sets the assistant's rules.
It tells Gemini to:

- speak about Francisco in the third person,
- answer only from the numbered sources,
- never invent facts, dates, employers, or links,
- say it does not have the information when the sources are silent,
- cite sources such as `[1]` in the model response, and stay concise.

The numeric source labels are internal to the model prompt.
The chat UI renders them as small superscript reference icons rather than visible numbers.

The user message has this shape:

```text
Sources:
[1] Raft Consensus Algorithm (project)
<passage text>

[2] Education (education)
<passage text>

Question: <what the visitor asked>
```

With "Use portfolio knowledge" off, the playground uses a generic instruction and sends the plain question.
Use this to compare grounded and ungrounded answers.

## Model configuration

| Setting           | Value                                                                    |
| ----------------- | ------------------------------------------------------------------------ |
| Model             | `gemini-3.5-flash-lite`                                                  |
| Backend           | Gemini Developer API through Firebase AI Logic                           |
| Max output tokens | 1,024                                                                    |
| Request timeout   | 60 seconds                                                               |
| Sampling settings | Not set, because Gemini 3 models deprecate temperature, top-p, and top-k |

## Setup

1. In the Firebase console, enable Firebase AI Logic with the Gemini Developer API.
2. Register the web app with the reCAPTCHA Enterprise App Check provider and enforce App Check for Firebase AI Logic.
3. Set `NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY` to the public site key.
   It is an identifier, not a secret, and is required even when using a local debug token.
4. For local development, register an App Check debug token for the web app and put it in `.env.local` as `FIREBASE_APPCHECK_DEBUG_TOKEN`.
   The server page passes it to the browser only when `NODE_ENV` is `development`.
5. Restart the development server, sign in as the configured admin, and open `/admin/ai-test`.

Keep the debug token private and never commit it or add it to production environment variables.
If it has been shared, delete it in the Firebase console and create a new one.

## Testing the assistant

Ask questions that you know the answer to and questions that the content cannot answer.

| Try                                           | Expected behavior                                     |
| --------------------------------------------- | ----------------------------------------------------- |
| "Who is Francisco?"                           | Summary from the profile, with a source               |
| "What projects has he built with TypeScript?" | Several projects, each cited                          |
| "Where did he study and what was his GPA?"    | Education details, cited                              |
| "What is his favorite food?"                  | Says his current favorite is carbonara, with a source |

Hover or focus each superscript source icon to confirm the referenced title.
If an answer is wrong, check retrieval first (missing or low-ranked source), then the content, then the instruction.
Unit tests for ranking, chunking, and prompt formatting live in `tests/unit/assistant-retrieval.test.ts`.
The corpus-specific role, language, and profile retrieval checks live in `tests/unit/assistant-knowledge.test.ts`.

## Limits and security

- Calls go from the browser to Firebase AI Logic, so there is no server endpoint to rate limit.
- App Check proves the request comes from this app, but it is not a rate limiter or a per-user quota.
- The owner check in the page is a UI control, not a security boundary.
- Do not expose this chat to visitors until you add server-side limits, abuse controls, and budget alerts.
- Model availability, free quotas, and billing can change, so monitor usage in Firebase and Google Cloud.
- The model can still make mistakes, so keep answers cited and the content accurate.

## Possible next steps

- Show the assistant to visitors behind a server route with rate limiting.
- Add embeddings for meaning-based retrieval when keyword matching misses too often.
- Support the other site languages in the knowledge base.
- Add a small set of evaluation questions that run automatically.
