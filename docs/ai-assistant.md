# AI assistant and guardrails

The public support chat includes an AI assistant that answers questions about Francisco and shares the conversation with the owner inbox.
The AI playground at `/admin/ai-test` is an owner-only tool for testing the same guardrails and retrieval.
Neither assistant offers general-purpose assistance, code generation, web search, or an ungrounded comparison mode.

## Architecture

```text
Admin browser
  -> Firebase Auth ID token and question
  -> POST /api/admin/assistant
      -> verify Firebase token and owner UID/email
      -> reserve a request in the Firestore rate limit
      -> input guard: classify scope and resolve follow-up
      -> retrieve public portfolio passages
      -> context guard: check relevance
      -> Gemini generates a sourced answer
      -> output guard: check scope and grounding
  <- answer and source references, or refusal

Visitor browser
  -> persist visitor message in Firestore
  -> POST /api/chat/assistant with Firebase ID token and message ID
      -> verify anonymous identity, ownership, and persisted message
      -> atomically reserve visitor and global limits and claim the message
      -> apply the same guardrails and retrieval
      -> persist an AI reply or flag the conversation for human follow-up
  <- Firestore displays AI and owner replies in the same thread
```

The server calls the Gemini Developer API with `gemini-3.5-flash-lite`.
The browser does not receive the Gemini API key or the complete retrieval corpus.
The public assistant sends the current question, up to three prior accepted visitor questions, and retrieved public passages to Gemini.
Rejected or failed questions and direct requests for Francisco are excluded from follow-up context.
No searches, code execution, or other tools are enabled for the model.
Answers are not streamed, so the output check happens before an answer is shown.

## Guardrail layers

| Layer          | Behavior                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| Authentication | Firebase Admin verifies the ID token and matches the configured owner UID and email before model calls.    |
| Rate limit     | Firestore transactions enforce 10 requests per owner in a rolling hour across server instances.            |
| Input          | A model classifies the question and refuses off-topic, mixed, and instruction-changing requests.           |
| Context        | Keyword retrieval selects portfolio passages, then a model checks their relevance.                         |
| Generation     | The model is instructed to answer only from the provided passages and cite them.                           |
| Output         | Citation numbers are checked, then a model reviews scope and factual support before an answer is returned. |

For the public chat, Firebase Admin verifies anonymous sign-in and conversation ownership before processing a persisted guest message.
Each guest message can reserve AI work only once.
The reservation and both public rate limits are updated in one Firestore transaction.
Visitors cannot write AI messages, follow-up flags, or request state under the provided Firestore rules.
The public limits are five requests per anonymous UID and 30 requests globally in a rolling hour.
The owner playground's 10-request limit is separate from the public limits.
One assistant question may make up to four Gemini calls, and all reserved attempts count even if the request is refused or fails.
Rate-limit exhaustion, missing information, rejected output, and provider failures produce a fallback and flag the inbox for human follow-up.
Out-of-scope requests are refused without automatically requesting a human reply.
An explicit human request uses no AI quota.
The assistant does not promise a response time and continues handling later questions after a handoff.
An owner reply clears the follow-up flag.
If a request is abandoned during processing, the widget offers a response check.
A check after five minutes records a fallback without rerunning the model.
Firestore failures fail closed and the visitor is told the saved message remains available to Francisco.

Questions and retrieved passages are treated as untrusted data rather than instructions.
If there are no relevant passages, the assistant says it does not have enough information.
If an output is rejected, the assistant returns a fixed response rather than the generated text.
Invalid guard responses, provider failures, and timeouts return an error instead of an unchecked answer.
These checks use the same model family and are probabilistic, not a guarantee against prompt injection, off-topic answers, or hallucinations.
They can also reject legitimate questions or fail to find relevant content.
The guardrail result distinguishes answered, unknown, out-of-scope, and blocked outcomes.
The output guard assesses whether an approved response actually answers the question; an incomplete or malformed assessment fails closed.

The playground sends up to three prior accepted user questions to help interpret follow-ups.
These are untrusted client-provided context, not an authenticated transcript.
The history and displayed chat exist only in the current page session.
Starting a new chat or refreshing clears them.

## Knowledge and retrieval

The corpus is built on the server from the public assistant profile and approved education knowledge, project and activity Markdown, and English experience and education entries.
The education knowledge includes approved transcript details as individually retrievable sections; the original transcript is not published.
The corpus also builds a project catalog from every published project summary and a concise guide to the site's main pages.
These indexes are derived from the site's source content so project descriptions are not maintained twice.
See [assistant knowledge](../content/assistant/README.md) for authoring guidance.
Content is split into passages and ranked by BM25-style keyword scoring, without embeddings or a vector database.
The top five matching passages are used when they pass the relevance check.
Matching is based on English-oriented keywords, so synonyms, other languages, and short follow-ups may not retrieve the right information.
Source text is sent to Gemini as part of the request and must contain only approved public information.
Common greetings and basic questions about the assistant's identity or capabilities receive a short predefined response without a Gemini request.

Answers can include source icons.
Hover or focus an icon to preview the truncated source title, or open its linked portfolio page.
Select the icon to open the source in a new tab; the same control is used in the public chat and playground.
The links point to related portfolio pages and do not necessarily display every detail of the assistant profile or education knowledge.

## Setup

1. Configure Firebase Authentication and the owner UID, email, and project ID as described in [chat.md](./chat.md).
   Publish the updated Firestore rules before deploying the public assistant.
2. Create a Gemini Developer API key for server-side use using [Google's API key instructions](https://ai.google.dev/gemini-api/docs/api-key).
3. Set `GEMINI_API_KEY` in `.env.local` for local development and in the server deployment environment for production.
   Never use a `NEXT_PUBLIC_` prefix, commit this key, or share it in chat.
4. Restart the server after changing environment variables, sign in as the configured owner, and open `/admin/ai-test`.
5. Before relying on these guardrails, disable or otherwise restrict the previously enabled direct Firebase AI Logic access in the Firebase/Google Cloud project, after checking whether other applications depend on it.
   Changing this repository alone does not disable that external API.
6. Configure appropriate Gemini API quotas and budget alerts.
7. Give the server Firestore access using Application Default Credentials or set `FIREBASE_SERVICE_ACCOUNT_JSON` to the complete service account JSON in the server environment.
   The service account must belong to the configured Firebase project and have access to Firestore.
   Store credentials only in `.env.local` or your hosting provider's secret environment configuration, never in source control or chat.
   Without working server credentials and Firestore access, the assistant returns an error rather than bypassing the limit.

For local development without Application Default Credentials, create a service account key in Firebase project settings under **Service accounts**.
Keep the downloaded JSON file outside the repository and set `GOOGLE_APPLICATION_CREDENTIALS` in `.env.local` to its absolute path.
Alternatively, store the complete JSON object on one line as `FIREBASE_SERVICE_ACCOUNT_JSON='{"...":"..."}'` in `.env.local`, keeping escaped newline characters intact.
Do not share the key file.
Use a service account with only the permissions needed for Firestore, and restart the server after changing credentials.
For production, configure the same value as a server-only secret or use the hosting platform's supported Application Default Credentials.

### Vercel deployment

Set `GEMINI_API_KEY` and `FIREBASE_SERVICE_ACCOUNT_JSON` as server-only environment variables in the Vercel project settings.
For `FIREBASE_SERVICE_ACCOUNT_JSON`, paste the complete service account JSON as the value, including its escaped private-key newlines.
Do not use a `NEXT_PUBLIC_` prefix for either secret or upload the JSON file into the repository.
The local `GOOGLE_APPLICATION_CREDENTIALS` file path will not exist in Vercel and should not be used there.

The existing Firebase web configuration variables and `NEXT_PUBLIC_FIREBASE_ADMIN_UID` and `NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL` must also be set for each Vercel environment where the playground is used.
The UID, email, project ID, Firestore database, and service account must refer to the intended Firebase project.
Redeploy after updating environment variables so the new deployment picks them up.
Keep preview and production configuration scoped to the deployments that need it.

The rate limit stores only timestamps under `_assistant_rate_limits` in Firestore.
Every valid authenticated request consumes one slot, including refusals and requests that later fail.
The eleventh request in a rolling hour receives HTTP 429 and a `Retry-After` header.
The server SDK bypasses Firestore Security Rules, so its credentials must be protected and appropriately scoped.
The provided rules deny client access to the rate-limit collection; preserve that denial when merging rules.
The limit does not cover requests sent directly to Gemini or Firebase AI Logic outside this route.
The public visitor and shared limit timestamps are stored in the same restricted collection under separate document IDs.
Anonymous Firebase UIDs can be recreated, so the shared cap can be deliberately exhausted and is not a per-person guarantee.
Use provider-side quotas, budget alerts, and additional edge or App Check controls as appropriate.
Firebase Authentication, Firestore, and Gemini may incur usage or charges independently of these application limits.
The notice describes the intended free-tier usage; verify model eligibility and billing settings in the provider console.

The earlier browser-side App Check debug token and reCAPTCHA key are not used by this server route.
Revoke any debug token that was previously shared.
The server route verifies Firebase ID tokens; the browser's UI check alone is not an authorization boundary.
Firebase token verification here does not check token revocation.

## Testing

Try a known question such as "What roles is Francisco looking for?", a follow-up such as "What about his education?", an unknown fact, a general coding request, and a mixed request that combines a profile question with a coding task.
The first two should be answered when relevant sources are found; the other requests should be refused or identified as unknown as appropriate.
Also try instruction overrides and unsupported claims.
Review answers and source titles manually because unit tests with mocked model responses cannot establish real-model guardrail accuracy.

`tests/unit/assistant-guardrails.test.ts` exercises the stages and fail-closed paths with mocked model responses.
`tests/unit/assistant-route.test.ts` checks authentication, input validation, refusal, and failure handling.
`tests/unit/assistant-rate-limit.test.ts` exercises the ten-request boundary with a mocked transaction.
`tests/e2e/assistant-auth.spec.ts` verifies unauthenticated access over HTTP.
Live model evaluation requires a configured server API key and a signed-in owner.
On November 10, 2026, a local signed-in test returned a sourced profile answer and refused several instruction overrides, mixed requests, and off-topic tasks.
A later local playground test answered a question about Francisco's degree and specializations, while a separate short education question returned a 502 during the guardrail or model request.
A live Firestore test accepted ten requests in the rolling window and returned HTTP 429 with `Retry-After` on the next request.
These checks do not establish that the guards cannot be bypassed or that all legitimate questions will work.

## Security and operational limits

- The admin route is owner-only; the public route requires an anonymous Firebase identity and ownership of the conversation.
- The Firestore rate limits apply to these routes only and are not a complete spending or abuse control.
- Firebase and Gemini quotas and hosting costs still apply, and a Gemini free tier depends on the project's billing setup and model availability.
- Direct Firebase AI Logic access is a separate bypass until it is restricted in the cloud project.
- Each answered question may require four sequential model calls, increasing latency and cost.
- Model output and guard decisions can be wrong, so monitor usage and evaluate adversarial cases and legitimate questions regularly.
- The public endpoint's limits and human handoff do not replace provider quotas, privacy review, or additional abuse controls.
