---
title: Portofolio Website
category: personal
date: 2024-09-08
summary: An earlier version of my portfolio, with a project archive, MDX content, and a validated email contact form.
applicationTypes: ['Web interface']
fields: ['Software Engineering', 'Web Development']
tags: [Node.js, Next.js, Tailwind CSS, TypeScript, Resend, shadcn/ui, MDX, Vercel, Web]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/portofolio
---

## Overview

This is an earlier version of my personal portfolio, built with Next.js, TypeScript, and Tailwind CSS.
It combines an introduction and recent work on the homepage with a project archive, individual project pages, activities, and a contact form.

## Content-driven project pages

Project descriptions live in MDX files with front matter for fields such as title, date, image, repository, and technologies.
The site reads those files with `gray-matter`, derives the project archive from the directory contents, and creates a route for each project slug.
That keeps the project records in content files instead of hard-coding every project page into a React component.

```text
MDX project files -> front matter and body -> project archive
                                      |
                                      +-> generated detail routes
```

The homepage also highlights recent projects and activities and gathers the technologies listed across project metadata.
This structure let me add portfolio entries through content while reusing the same archive and detail-page components.

## Contact form and implementation

The contact action validates submitted values with a Zod schema before sending a message through Resend.
The site uses Next.js components for its pages, Tailwind CSS and shadcn/ui for interface styling, and `next/image` for the homepage image.

The project helped me practice combining a content-based site with a small server action, while keeping the main project archive driven by files in the repository.
The current portfolio continues that work with an expanded content model and a static-first approach.
