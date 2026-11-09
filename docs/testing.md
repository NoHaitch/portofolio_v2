# Testing

This project uses two layers of automated tests.
Unit tests cover pure logic, and end-to-end tests cover what a visitor actually sees in a browser.

## Commands

| Command                | What it does                                                          |
| ---------------------- | --------------------------------------------------------------------- |
| `bun run test`         | Run the Vitest unit tests once                                        |
| `bun run test:watch`   | Run Vitest in watch mode while developing                             |
| `bun run test:e2e`     | Build the site, serve it, and run the Playwright tests in Chromium    |
| `bun run test:audit`   | Run Lighthouse (accessibility, SEO, best practices, performance)      |
| `bun run typecheck`    | Run `tsc --noEmit`                                                    |
| `bun run format:check` | Check formatting with Prettier                                        |
| `bun run test:all`     | Typecheck, format check, unit tests, then e2e tests, stopping on fail |

Run `bun run test:all` before committing.

## First-time setup

Install the Playwright browser once per machine:

```bash
bunx playwright install chromium
```

## Unit tests

Location: `tests/unit/*.test.ts`.
Config: `vitest.config.mts`, which maps the `@/` alias to the repository root.

Current coverage:

- `i18n.test.ts` checks `isLocale` and `getLocalePath`, including swapping an existing locale prefix and not stripping paths such as `/identity`.
- `i18n.test.ts` also checks that every locale has exactly the same message structure as English, contains no empty strings, and never uses the em dash.
- `utils.test.ts` checks the `cn` class merging helper.
- `ai-markdown.test.ts` checks that assistant Markdown renders headings, emphasis, code, and lists.
- `work.test.ts` validates project and activity content, unique slugs, image references, and featured project slugs.
- `chat.test.ts`, `chat-thread.test.ts`, and `chat-receipts.test.ts` cover message validation, grouping, replies, inbox search, and read receipts.

The message structure check is the main guard for translations.
Adding a key to `lib/i18n/types.ts` and one locale but forgetting another will fail the suite.
Adding invalid project or activity Markdown also fails the content tests.

## End-to-end tests

Location: `tests/e2e/*.spec.ts`.
Config: `playwright.config.ts`.

The config builds the site and serves the production build on `http://127.0.0.1:3100`, so the tests run against what users get.
The build goes to `.next-e2e` through the `NEXT_DIST_DIR` variable read in `next.config.ts`.
This means you can keep `bun run dev` running without the tests overwriting its `.next` folder.
Locally, an already running server on port 3100 is reused, which makes reruns faster.

Current coverage:

- `navigation.spec.ts` checks that each page returns 200 with its heading, unknown routes return 404, and no image on any page is broken.
- `navigation.spec.ts` also covers header navigation, the footer email and archive quick links, language switching keeping the current route, the theme toggle, and the experience tabs.
- `light-theme.spec.ts` explicitly selects the light theme, checks theme switching, and verifies the footer's colors on ten routes at mobile width and on the homepage at desktop width.
- The light-theme test checks the specific palette values rather than calculating contrast ratios.
  Update its expectations when the palette changes, and verify that the new colors still meet WCAG contrast requirements.
- `localized-pages.spec.ts` checks every static route and every project and activity detail route in English, Indonesian, Japanese, and Simplified Chinese.
- `responsive.spec.ts` checks that no page has horizontal overflow at 320, 375, 768, and 1024 px.
- `responsive.spec.ts` also covers the burger menu (open, Escape to close, navigate, language select inside the menu) and that the desktop nav shows no burger.
- `work.spec.ts` checks that the homepage shows five recent projects and activities, eight-item archive pagination, search, category and multi-select project filters, unavailable filter options, the filtered empty state, unified project tag order and deduplication, date sorting in both directions, and the selected activity detail pages and timestamped graduation video embed.
- Retrieval ranking, chunking, and grounded prompt formatting are unit tested in `tests/unit/assistant-retrieval.test.ts`.
- `assistant-knowledge.test.ts` checks that career-role, favorite-food, and language questions retrieve the matching profile passage.
- `ai-markdown.test.ts` covers formatted AI output; live tooltip behavior and chat timestamps still require browser testing with an authenticated admin session.
- The Firebase AI playground and Firebase-backed guest/admin chat are not covered by automated end-to-end tests because they require Firebase project configuration and live authentication.

Reports and traces are written to `playwright-report/` and `test-results/`.
Both are git-ignored.
Open the last report with `bunx playwright show-report`.

## Lighthouse audit

Command: `bun run test:audit`.
Script: `scripts/lighthouse.mjs`.

The script builds the site into `.next-e2e`, serves it on `http://127.0.0.1:3101`, and runs Lighthouse against it using Playwright's Chromium.
Set `LIGHTHOUSE_URL` to audit an already running or deployed site instead, in which case no build or server is started.
It exits with a non-zero code if any score is below its threshold.

Pages audited: `/`, `/about`, `/experience`, `/education`, `/contact`, `/work`, `/work/projects`, `/work/activities`, and one project detail page, in all four languages (English plus the `/id`, `/ja`, and `/zh` prefixes), which is 36 runs.
Translated pages can fail checks that English passes, such as contrast, overflow, or heading problems in longer copy.
The detail route uses a hardcoded slug (`dbms`) in the `routes` array at the top of the script, so update it if that project is renamed.

| Category       | Minimum |
| -------------- | ------- |
| Accessibility  | 100     |
| SEO            | 100     |
| Best practices | 90      |
| Performance    | 70      |

Notes:

- Performance uses Lighthouse's simulated mobile throttling, so it varies between runs and machines.
  Individual pages swing by about 10 points, so the 70 threshold only catches real regressions.
- The audit runs with reduced motion forced, so the rotating hero text is not sampled mid-fade by the contrast check.
- The audit does not explicitly select a theme.
  Check both light and dark themes separately when investigating theme-specific accessibility issues.
- HTML and JSON reports are written to `reports/lighthouse/`, which is git-ignored.
- The audit is not part of `test:all` because it adds a build and several slow runs.
  Run it before releases and after large UI changes.

Issues it has already caught: a skipped heading level on the experience timeline, an oversized hero image download (fixed with a `sizes` prop), and card headings on the work list pages that skipped from h1 to h3.

## Writing new tests

- Prefer user-facing queries such as `getByRole` over CSS selectors.
- Add a unit test for any helper with branching logic that can regress quietly.
- Add an e2e test for any flow a visitor depends on, and a regression test first when fixing a bug.
- Keep tests independent so they can run in parallel.
- Do not hard-code English copy in tests that run on other locales.
- Keep the locale page smoke test's content routes derived from `content/work/`, so new articles are checked in every locale automatically.

## Known gaps

- ESLint is not part of `test:all` because it currently fails to load (see the README).
- Only Chromium is tested.
- There are no component tests yet, since the interactive components are covered through e2e.
