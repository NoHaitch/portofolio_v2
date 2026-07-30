<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data.
Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.
Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## General Guidelines

- Never use the em dash `—`.
- When writing commit messages, never auto-add your agent name as co-author.
- Never manually modify `CHANGELOG.md` files or any files that are marked as auto-generated.
- When writing or substantially editing long Markdown files, put each full sentence on its own line.
  Preserve normal Markdown structure, but avoid wrapping multiple sentences onto one physical line.
- When making technical decisions, do not give much weight to development cost.
  Instead, prefer quality, simplicity, robustness, scalability, and long term maintainability.
- When doing bug fixes, always start with reproducing the bug in an E2E setting as closely aligned with how an end user experiences it as possible.
  This makes sure you find the real problem so your fix will actually solve it.
- When end-to-end testing a product, be picky about the UI you see and be obsessed with pixel perfection.
  If something clearly looks off, even if it is not directly related to what you are doing, try to get it fixed along with the main issue.
- Apply that same high standard to engineering excellence.
  If you see lint failures, test failures, or flaky tests, fix them even if they are not directly caused by the current task.

## 1) What the project is about

This is a personal portfolio website for showcasing professional work, writing, and projects.

It should feel fast, clean, accessible, and polished.

The site will eventually include:

- a homepage,
- project pages,
- a blog,
- a contact or social links section,
- and optional future features like views, newsletter, and analytics.

The blog should be a first-class part of the site, not an afterthought.

## 2) Stack and layout

Use the following stack:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- MDX
- Prettier

Use this layout approach:

- `app/` for routes and pages.
- `components/` for reusable UI.
- `components/ui/` for shadcn/ui primitives.
- `content/` for MDX blog posts and content sources.
- `lib/` for utilities and shared helpers.
- `public/` for static assets.
- `src/config/` or `config/` for site metadata and navigation.
- `tests/` or colocated tests for test files.

Prefer server components by default.
Keep client components small and isolated.
Minimize client-side JavaScript.
Prefer static generation where possible.

## 3) Content and architecture

Blog content should start as MDX files stored in the repository.

For now, static files in the repo are acceptable for blog posts and images if they keep the implementation simple and fast.

Use AWS for CDN or media delivery later if needed, but do not add that complexity until the site actually needs it.

If the requirement is to edit blogs from inside the site, do not assume that means a full CMS is required immediately.
Prefer the simplest maintainable editing workflow first.

Possible evolution path:

- Phase 1: MDX in Git with static content.
- Phase 2: add an admin editing flow if needed.
- Phase 3: move only the parts that truly need a backend into a database or CMS.

If blog editing becomes necessary inside the site, use Firebase only for the parts that genuinely need persistence and authenticated access, such as:

- blog metadata,
- draft state,
- user accounts,
- admin-only records,
- or publishing workflow data.

Do not use Firebase just to replace static content if the content does not need to be dynamic.
Keep the default architecture static-first.

## 4) Core Web Vitals

Treat Core Web Vitals as a design constraint, not a later cleanup task.

Optimize for:

- fast loading,
- responsive interaction,
- stable layout,
- low bundle size,
- and good mobile performance.

Important rules:

- Use `next/image` for images.
- Use `next/font` for fonts.
- Avoid unnecessary client-side components.
- Avoid heavy animation libraries unless they clearly improve the design.
- Avoid layout shift.
- Avoid large third-party scripts unless they are necessary.

When adding features, consider their impact on:

- LCP,
- INP,
- CLS,
- and overall Lighthouse performance.

If a change harms performance noticeably, prefer the simpler implementation.

## 5) Testing rules

Use a lightweight but meaningful testing setup.

Recommended testing stack:

- Vitest for unit and component tests.
- React Testing Library for component behavior tests.
- Playwright for critical E2E flows.

Test priorities:

- utility functions,
- content parsing and helpers,
- reusable UI components,
- route behavior for important pages,
- blog rendering,
- navigation and contact flow,
- and any admin workflow if one is added later.

Testing rules:

- Add tests for logic that can regress easily.
- Do not test everything just because it is possible.
- Keep tests readable and easy to maintain.
- Prefer user-facing behavior over implementation details.
- Fix flaky tests quickly.
- Run relevant tests before finishing work.
- For bug fixes, reproduce the issue in an E2E or close-to-real test first when practical.

Minimum checks before merging:

- typecheck,
- lint,
- format check,
- relevant unit tests,
- relevant E2E tests for changed flows.

## 6) Tooling and workflow

Use Prettier as the formatter.
Use ESLint for code quality and correctness checks.
Do not fight the formatter.

Keep dependency additions minimal.
Before adding a new library, ask whether the same result can be achieved with the existing stack.

When making changes:

- make minimal, targeted edits,
- preserve existing patterns,
- inspect the relevant code before changing it,
- and update docs if the workflow changes.

## 7) Notes for agents

Read this file before making changes.

If a task is ambiguous, inspect the codebase before changing anything.

Prefer maintainable solutions over clever ones.
Prefer explicit code over hidden magic.
Prefer stable public APIs over experimental ones unless there is a clear reason not to.

## 8) Future features

Planned future features may include:

- blog editing from inside the site,
- a view counter,
- newsletter signup,
- analytics,
- and additional observability.

Add these only when the site is ready for them.
Do not overbuild early.
