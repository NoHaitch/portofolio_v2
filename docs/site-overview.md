# Site overview

This document describes the portfolio as it currently exists and records implementation details that should guide future changes.

For personal identity, background, tone, and verified profile details, refer to [context.md](./context.md).

For visual styling rules and semantic color tokens, refer to [design-system.md](./design-system.md).

## Purpose and audience

The site is Francisco Trianto's personal portfolio for presenting software engineering, education, technical interests, and ways to get in touch.

The intended impression is polished, fast, accessible, and minimal, with practical engineering work and a security-minded perspective.

Use Francisco as the public name and use NoHaitch as a handle where appropriate.

## Technology

- Next.js 16 App Router.
- React 19 and TypeScript with strict type checking.
- Tailwind CSS 4 and shadcn-compatible UI primitives built on Base UI.
- `next/font` for Figtree body and heading typography and Geist Mono utility typography.
- `next/image` for the homepage portrait and education logos.
- Bun is used for project scripts and dependency management.

The package scripts currently provide development, production build, production start, formatting, formatting checks, and linting.

There is no configured automated test suite or separate type-check script at this time.

The repository's ESLint command currently encounters an ESLint 10 and React plugin compatibility error while loading `react/display-name`.

## Routes

### `/` and localized home routes

The homepage is implemented in [app/[locale]/page.tsx](../app/%5Blocale%5D/page.tsx).

It presents Francisco's name, location and role, rotating interest labels, a short introduction, a graduation portrait, calls to view projects or contact, and a scroll cue.

The hero fills the viewport below the site header.

The quote and rotating role labels stay in English across all locales to preserve their original phrasing.

The quote introduces his generalist approach, followed by cards for software engineering, AI and Data Science, cybersecurity, systems engineering, Operations & DevOps, and agentic coding with a concise description of his foundations in each area.

The projects action currently points to `/projects`, which does not yet have a route.

### `/education` and localized education routes

The education timeline is implemented in [app/[locale]/education/page.tsx](../app/%5Blocale%5D/education/page.tsx).

It currently includes Institut Teknologi Bandung and SMAN 5 Bandung.

The university entry presents the Bachelor of Science in Informatics / Computer Science, Jul 2022–Aug 2026 study period, GPA and cum laude honors, 151 completed credits against the 144-credit requirement, specialization areas, selected coursework, campus activities, and relevant skills.

The high-school entry presents the Natural Sciences (STEM) track, Jul 2019–Jul 2022 study period, Five Cyber Community membership, two city-level OSK Mathematics participations, and academic rankings.

The official university degree certificate is available through a separate link on the university entry.

### `/experience` and localized experience routes

The work history timeline is implemented in [app/[locale]/experience/page.tsx](../app/%5Blocale%5D/experience/page.tsx).

It groups software engineering, teaching and academic support, and campus and community work into selectable tabs.

Each tab presents its roles along one timeline, with cards alternating around a shared center line on larger screens.

Roles are sorted by their ISO-formatted `startDate` (`YYYY-MM`), newest first by default.

The sort button lets visitors switch between newest-first and oldest-first order without changing the localized display period.

The entries and their localized summaries are stored in the locale dictionaries.

### `/contact` and localized contact routes

The contact page is implemented in [app/[locale]/contact/page.tsx](../app/%5Blocale%5D/contact/page.tsx).

It groups email, LinkedIn, and GitHub under Professional, and Instagram, X, Medium, LeetCode, and Kaggle under Writing & community.

### Other route state

There are no project, blog, or research routes yet.

The App Router also includes [app/robots.txt](../app/robots.txt), which should be updated from its placeholder sitemap host before deployment.

## Shared application structure

[app/[locale]/layout.tsx](../app/%5Blocale%5D/layout.tsx) defines locale metadata, document language, font variables, the theme provider, and shared page shell.

The shared page shell renders [components/layout/header.tsx](../components/layout/header.tsx), route content, [components/layout/footer.tsx](../components/layout/footer.tsx), and the Sonner toaster.

The header contains primary navigation, a flag-bearing shadcn Select for language switching, and a light/dark theme control.

The [components/theme-provider.tsx](../components/theme-provider.tsx) persists the selected theme and follows the system preference when no preference has been saved.

The homepage role text is animated by the small client component [components/rotating-text.tsx](../components/rotating-text.tsx).

Reusable UI is in [components/ui/](../components/ui/), including Avatar, Card, and shadcn primitives for buttons, alerts, dialogs, dropdowns, pagination, selects, tabs, tooltips, and toasts.

Button styling variants are defined in [components/ui/button-variants.ts](../components/ui/button-variants.ts) so server-rendered pages can use the same visual classes without importing the Button component.

Shared class-name merging is provided by [lib/utils.ts](../lib/utils.ts).

Add future common UI primitives with `bunx shadcn add <component>` rather than introducing custom equivalents.

Prefer React Server Components for page content.

Keep client components limited to genuinely interactive elements such as theme controls, language selection, and rotating text.

## Styling conventions

The canonical style guide is [design-system.md](./design-system.md).

Global semantic colors and Tailwind theme mappings are defined in [app/globals.css](../app/globals.css).

Use semantic classes such as `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `bg-primary`, and `bg-accent` rather than one-off page-specific palette values.

Keep content centered with consistent responsive padding, a clear heading hierarchy, restrained borders, and shared Card and Button primitives where they fit.

The design uses a cool blue-green neutral palette with mineral teal as the accent.

The homepage portrait is the primary visual signature.

## Content and assets

[docs/context.md](./context.md) is the source of truth for personal context, tone, interests, and public social identities.

The education logos and official degree PDF are stored in `public/education/`.

The homepage portrait and header avatar are stored in `public/home/` and `public/`, respectively.

User-provided CV references are stored in `public/CV/`, and additional PDF certificates are stored in `public/certificates/`.

Files in `public/` are served as static public assets and are not protected by authentication.

Confirm that each document is intended for public access before linking it or deploying the site.

Keep content static and repository-managed unless a real editing or persistence requirement justifies a backend.

## Localization

The site supports English, Indonesian, Japanese, and Simplified Chinese.

English is the default language and retains the existing unprefixed URLs.

Indonesian, Japanese, and Simplified Chinese use `/id`, `/ja`, and `/zh` URL prefixes.

The Next.js 16 root [proxy.ts](../proxy.ts) rewrites unprefixed page requests to the internal `/en` locale route.

Explicit `/en/...` URLs are also accepted so the internal rewrite can resolve without redirecting the browser.

Localized route content lives under `app/[locale]/`.

The locale-specific root layout sets the HTML `lang` attribute and localized metadata description.

Locale dictionaries are typed by [lib/i18n/types.ts](../lib/i18n/types.ts) and live in `lib/i18n/messages/`.

[lib/i18n/index.ts](../lib/i18n/index.ts) exports the supported locales, native language labels, message lookup, locale validation, and localized path helper.

The header language selector preserves the current route when switching languages.

The homepage, education page, experience page, contact page, shared navigation, theme control labels, and metadata are translated.

All 16 combinations of the four current pages and four locales are statically generated from the locale route segment.

When adding a route, add its translations to every locale dictionary and verify its navigation and metadata for each locale.

Do not expose a locale option until all current user-facing copy on the corresponding route has a translation.

Keep the shared page structure and visual system consistent across languages.

## Future content areas

The intended long-term portfolio can add projects, professional experience, writing, research, and activities.

Prefer structured content with consistent titles, dates, categories, tags, summaries, links, and optional media.

Keep routes and content data static-first until dynamic publishing or editing is explicitly needed.
