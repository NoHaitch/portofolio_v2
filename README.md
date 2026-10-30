# Francisco Trianto portfolio

Personal portfolio for Francisco Trianto (NoHaitch), presenting software engineering work, projects, experience, education, and ways to get in touch.

The site is static-first, accessible, and available in English, Indonesian, Japanese, and Simplified Chinese.

## Pages

| Route         | Purpose                                                         |
| ------------- | --------------------------------------------------------------- |
| `/`           | Hero, generalist quote, and areas of expertise                  |
| `/about`      | Personal story, names, interests, hobbies, and photos           |
| `/projects`   | Selected projects and activity highlights                       |
| `/experience` | Sortable timeline of engineering, teaching, and campus roles    |
| `/education`  | Education timeline with coursework, honors, and certificates    |
| `/contact`    | Professional and community links                                |
| `/about-site` | What the site is for, how it is built, and the source code link |

English uses unprefixed URLs.
Other languages use the `/id`, `/ja`, and `/zh` prefixes.

## Stack

- Next.js 16 App Router, React 19, and TypeScript.
- Tailwind CSS 4 with shadcn-compatible components built on Base UI.
- `next/font` (Figtree and Geist Mono) and `next/image`.
- Bun for scripts and dependencies, Prettier for formatting, and ESLint for linting.

## Getting started

Install dependencies and start the development server:

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `bun run dev`          | Start the development server        |
| `bun run build`        | Build for production and type check |
| `bun run start`        | Serve the production build          |
| `bun run format`       | Format the project with Prettier    |
| `bun run format:check` | Check formatting                    |
| `bun run lint`         | Run ESLint                          |

There is no automated test suite yet.
The ESLint command currently fails to load because of an ESLint 10 and React plugin incompatibility.

## Project structure

- `app/[locale]/` holds the localized routes and shared layout.
- `components/layout/` holds the header and footer, and `components/ui/` holds shadcn primitives.
- `lib/i18n/` holds locale helpers, message types, and the dictionaries in `messages/`.
- `proxy.ts` rewrites unprefixed URLs to the internal English routes.
- `public/` holds static assets such as the portrait, education logos, and documents.

## Documentation

- [docs/site-overview.md](./docs/site-overview.md) describes the current routes, structure, localization, and content.
- [docs/design-system.md](./docs/design-system.md) is the visual style guide.
- [docs/context.md](./docs/context.md) holds personal context, tone, and public profiles.

## Adding a route

1. Create the page under `app/[locale]/`.
2. Add its copy to `lib/i18n/types.ts` and all four dictionaries.
3. Link it from the header or footer, and update the docs.
