# Adding a project or activity

Each project or activity is one markdown file plus an optional image folder.
Nothing else needs to change, because the routes, cards, search, and tests all read from these files.

## Layout

```
content/work/
  featured.ts                 projects highlighted on /work
  projects/<slug>.md
  activities/<slug>.md
public/work/
  projects/<slug>/cover.jpg   images for that project
  activities/<slug>/...
```

The slug is the file name without `.md`.
It must be lowercase kebab-case, for example `wikirace-solver`.
It becomes the URL: `/work/projects/wikirace-solver`.

## Steps

1. Create `content/work/projects/<slug>.md` (or `activities`).
2. Fill in the front matter below, then write the body in markdown.
3. Put images in `public/work/<kind>/<slug>/`.
4. Run `bun run test`, which validates every item and checks that every image exists.

## Front matter

```yaml
---
title: Wikirace Solver
category: academic
date: 2024-04-27
summary: One sentence shown on cards and under the title.
applicationTypes: [CLI, Web interface]
fields: [Computer Science, Software Engineering]
tags: [Go, React, Docker]
cover: cover.png
team: Optional team name
links:
  - label: Repository
    url: https://github.com/NoHaitch/Wikirace-Solver-FE
---
```

| Key                | Required | Notes                                                                                |
| ------------------ | -------- | ------------------------------------------------------------------------------------ |
| `title`            | yes      | Plain text                                                                           |
| `category`         | yes      | See the lists below                                                                  |
| `date`             | yes      | `YYYY-MM-DD`, used for sorting                                                       |
| `summary`          | yes      | One sentence                                                                         |
| `applicationTypes` | projects | One or more interface or application types, such as `CLI`, `GUI`, or `Web interface` |
| `fields`           | projects | One or more subject areas, such as `Computer Science` or `Game Development`          |
| `tags`             | no       | Technologies or themes, all searchable; shown after project type and fields          |
| `cover`            | no       | File name inside the item's image folder                                             |
| `team`             | no       | Shown on the detail page                                                             |
| `links`            | no       | List of `label` and `url`                                                            |

Project categories: `academic`, `personal`, `organization`, `freelance`.
Activity categories: `committee`, `sports`, `event`, `milestone`.
Category labels are translated in `lib/i18n/messages`.
Adding a new category means updating `lib/work-schema.ts`, `lib/i18n/types.ts`, and all four locale files.
Application types and project fields are validated against the lists in `lib/work-schema.ts`.
Each project must include at least one value for both `applicationTypes` and `fields`.
Project cards and detail pages show a unified tag list ordered as application types, fields, then `tags`.
Repeated values are shown only once.
Project cards display up to four values from this ordered list, followed by a count for any remaining values.
The project archive provides compact multi-select dropdown filters for application types and fields.
Available options and their result counts update based on the other active filters.
Options with no matching projects are hidden unless they are already selected, so an active selection can still be removed.

## Body

The body is standard markdown.
Reference the item's own images with a relative path:

```md
![Class diagram](./class-diagram.png)
```

The renderer resolves it to `/work/<kind>/<slug>/class-diagram.png` and reads the real size, so there is no layout shift.
Use `##` and `###` for headings, because the page title is already the `h1`.
Write descriptive link text, not "here".
Raw HTML is ignored.

Use fenced code blocks with a language identifier when a short excerpt helps explain an implementation:

````md
```csharp
if (moveIsAvailable)
{
    MakeMove();
}
```
````

Keep excerpts focused on the concept being discussed and verify them against the project source.

See [content-structure.md](./content-structure.md) for the recommended section order, privacy rules, and writing conventions.

For project pages, explain what the project is for, what you contributed, how it was implemented, and relevant technical decisions or lessons.
Keep claims specific to the project and avoid presenting assumptions about why a technology was selected as fact.
Links such as a repository or design file are optional and should only be included when they are available.

Embed a timestamped YouTube video with image syntax, using the video's watch URL:

```md
![Graduation ceremony at 02:22:53](https://www.youtube.com/watch?v=fEb7weuHhh0&t=2h22m53s)
```

The renderer turns timestamped YouTube watch URLs into a privacy-enhanced embed that starts at that time.

## Featured projects

Edit `featuredProjectSlugs` in `content/work/featured.ts`.
The hub shows the newest `recentActivityCount` activities automatically.
The project and activity archive pages show eight items per page and can be sorted by date in either direction.
Search, category filters, project facets, sort order, and pagination are kept in the URL, so list links can be shared or bookmarked.
The project archive places search above a consistent filter row with category, application type, and field controls, plus Apply and Clear actions.
The default sort order is newest first.
Changing the sort order returns to the first page while preserving the current search and category filters.

## Validation

The loader in `lib/work.ts` fails the build with a message naming the file when it finds an unknown key, an invalid category or date, or a malformed slug.
The unit test additionally checks that slugs are unique, covers and body images exist, and featured slugs exist.

## Image size

Images are served through `next/image`, so large originals are resized and compressed on request.
Smaller source files still keep the repository light, so prefer images under 1 MB where you can.
