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
tags: [Go, React, Docker]
cover: cover.png
team: Optional team name
links:
  - label: Repository
    url: https://github.com/NoHaitch/Wikirace-Solver-FE
---
```

| Key        | Required | Notes                                                      |
| ---------- | -------- | ---------------------------------------------------------- |
| `title`    | yes      | Plain text                                                 |
| `category` | yes      | See the lists below                                        |
| `date`     | yes      | `YYYY-MM-DD`, used for sorting                             |
| `summary`  | yes      | One sentence                                               |
| `tags`     | no       | Technologies or themes, all searchable, cards show up to 4 |
| `cover`    | no       | File name inside the item's image folder                   |
| `team`     | no       | Shown on the detail page                                   |
| `links`    | no       | List of `label` and `url`                                  |

Project categories: `academic`, `personal`, `organization`, `freelance`.
Activity categories: `committee`, `sports`, `event`, `milestone`.
Category labels are translated in `lib/i18n/messages`.
Adding a new category means updating `lib/work-schema.ts`, `lib/i18n/types.ts`, and all four locale files.

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

## Featured projects

Edit `featuredProjectSlugs` in `content/work/featured.ts`.
The hub shows the newest `recentActivityCount` activities automatically.

## Validation

The loader in `lib/work.ts` fails the build with a message naming the file when it finds an unknown key, an invalid category or date, or a malformed slug.
The unit test additionally checks that slugs are unique, covers and body images exist, and featured slugs exist.

## Image size

Images are served through `next/image`, so large originals are resized and compressed on request.
Smaller source files still keep the repository light, so prefer images under 1 MB where you can.
