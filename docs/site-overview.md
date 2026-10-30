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

It presents Francisco's name, location and role, rotating interest labels, a short introduction, a portrait photo, calls to view projects or contact, and a scroll cue.

The hero shows the nickname "a.k.a. NoHaitch" in a small mono line under the name, kept in English in all locales like the quote and roles.

The hero fills the viewport below the site header.

The whole scroll cue (text and arrow) bobs gently, and a small client component, [components/scroll-snap.tsx](../components/scroll-snap.tsx), snaps to the divider line above the quote.
It waits until scrolling has been idle for 180ms and only moves when the line is within 96px, so continuous scrolling is never held back.
The effects use no animation library, and both the bobbing and the snap are disabled when the visitor prefers reduced motion.

The quote and rotating role labels stay in English across all locales to preserve their original phrasing.

The quote introduces his generalist approach, followed by nine cards ordered so related areas sit together: software engineering, cybersecurity, systems engineering, embedded systems, Operations & DevOps, agentic coding, AI & Data Science (framed around business decisions), Machine Learning (the model side, including Deep Learning, RAG, MCP, and model evaluation), and computer science & research, each with a concise description of his foundations.

The projects action links to the localized `/projects` route.

### `/about` and localized about me routes

The page is implemented in [app/[locale]/about/page.tsx](../app/%5Blocale%5D/about/page.tsx), with copy under the `about` key of the locale dictionaries.

It opens with a short story beside a portrait, then covers what to call him (Francisco, Ciko, and NoHaitch), hobbies beside a second photo, interests as tags, and a link to the contact page.
The photos are stored in `public/self/`.

The header shows About from the `md` breakpoint up.
On smaller screens it is hidden because six items do not fit one row in every language, so it stays reachable from the footer.

### `/projects` and localized project routes

The projects page is implemented in [app/[locale]/projects/page.tsx](../app/%5Blocale%5D/projects/page.tsx).

It presents a curated set of selected software projects followed by a concise Activities & Highlights section.

Project and activity copy is stored in the locale dictionaries.

Keep the page selective and more visual than the formal Experience route, while grounding claims in verified portfolio content.

Do not add project detail pages, external links, or separate activity routes until there is enough content to support them.

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

### `/about-site` and localized about routes

The page is implemented in [app/[locale]/about-site/page.tsx](../app/%5Blocale%5D/about-site/page.tsx).

It explains what the site is for, the agentic coding workflow used to build it (manual setup, agent preparation, a baseline design idea, agent coding in small steps, verification and review, then fine tuning and documenting) shown as a three-column grid of six steps on large screens, the stack and tools, and links to the GitHub repository.

It is linked from the footer rather than the header navigation.

### Other route state

There are no blog or research routes yet.

The App Router also includes [app/robots.txt](../app/robots.txt), which should be updated from its placeholder sitemap host before deployment.

## Shared application structure

[app/[locale]/layout.tsx](../app/%5Blocale%5D/layout.tsx) defines locale metadata, document language, font variables, the theme provider, and shared page shell.

The shared page shell renders [components/layout/header.tsx](../components/layout/header.tsx), route content, [components/layout/footer.tsx](../components/layout/footer.tsx), and the Sonner toaster.

The header contains primary navigation, a flag-bearing shadcn Select for language switching, and a light/dark theme control.
Navigation links (Home, Projects, Experience, Education, Contact) are always visible for accessibility.
On small screens they move to a second full-width row below the logo and controls.
The footer holds a brand tagline, quick links to every route including About this site, social links, the copyright, and a back-to-top link that targets the `top` id on the body.

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

The homepage portrait is stored in `public/self/`, alongside other personal photos, and the header avatar is stored in `public/`.

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

The homepage, projects, education, experience, contact, and about pages, shared navigation, footer, theme control labels, and metadata are translated.

All 24 combinations of the six pages and four locales are statically generated from the locale route segment.

When adding a route, add its translations to every locale dictionary and verify its navigation and metadata for each locale.

Do not expose a locale option until all current user-facing copy on the corresponding route has a translation.

Keep the shared page structure and visual system consistent across languages.

## Future content areas

The intended long-term portfolio can add writing, research, and a fuller about section on the homepage.
Projects and activities already have a curated route.

Prefer structured content with consistent titles, dates, categories, tags, summaries, links, and optional media.

Keep routes and content data static-first until dynamic publishing or editing is explicitly needed.
