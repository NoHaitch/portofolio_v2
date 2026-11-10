# AI assistant and guardrails

The AI playground at `/admin/ai-test` is an owner-only tool for testing answers about Francisco.
It is separate from the public support chat described in [chat.md](./chat.md).
The playground does not offer general-purpose assistance, code generation, web search, or an ungrounded comparison mode.

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
```

The server calls the Gemini Developer API with `gemini-3.5-flash-lite`.
The browser does not receive the Gemini API key or the complete retrieval corpus.
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

Questions and retrieved passages are treated as untrusted data rather than instructions.
If there are no relevant passages, the assistant says it does not have enough information.
If an output is rejected, the assistant returns a fixed response rather than the generated text.
Invalid guard responses, provider failures, and timeouts return an error instead of an unchecked answer.
These checks use the same model family and are probabilistic, not a guarantee against prompt injection, off-topic answers, or hallucinations.
They can also reject legitimate questions or fail to find relevant content.

The playground sends up to three prior accepted user questions to help interpret follow-ups.
These are untrusted client-provided context, not an authenticated transcript.
The history and displayed chat exist only in the current page session.
Starting a new chat or refreshing clears them.

## Knowledge and retrieval

The corpus is built on the server from the public assistant profile, project and activity Markdown, and English experience and education entries.
See [assistant knowledge](../content/assistant/README.md) for authoring guidance.
Content is split into passages and ranked by BM25-style keyword scoring, without embeddings or a vector database.
The top five matching passages are used when they pass the relevance check.
Matching is based on English-oriented keywords, so synonyms, other languages, and short follow-ups may not retrieve the right information.
Source text is sent to Gemini as part of the request and must contain only approved public information.

Answers can include source icons.
Hover or focus an icon to preview the truncated source title, or open its linked portfolio page.
The links point to related portfolio pages and do not necessarily display every detail of the assistant profile.

## Setup

1. Configure Firebase Authentication and the owner UID, email, and project ID as described in [chat.md](./chat.md).
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
A live Firestore test accepted ten requests in the rolling window and returned HTTP 429 with `Retry-After` on the next request.
These checks do not establish that the guards cannot be bypassed or that all legitimate questions will work.

## Security and operational limits

- The route is owner-only and is not ready for public visitors.
- The Firestore rate limit applies to this route only and is not a complete spending or abuse control.
- Firebase and Gemini quotas and hosting costs still apply, and a Gemini free tier depends on the project's billing setup and model availability.
- Direct Firebase AI Logic access is a separate bypass until it is restricted in the cloud project.
- Each answered question may require four sequential model calls, increasing latency and cost.
- Model output and guard decisions can be wrong, so monitor usage and evaluate adversarial cases before expanding access.
- Do not add a public endpoint until authentication, rate limiting, abuse controls, privacy, and budget limits have been designed for that use.
