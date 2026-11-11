---
title: Portfolio Website v2
category: personal
date: 2026-10-28
summary: A multilingual, content-driven portfolio with searchable project archives, a Firebase chat inbox, and a guarded AI assistant grounded in published portfolio content.
applicationTypes: ['Web interface']
fields: ['Software Engineering', 'Web Development', 'Artificial Intelligence']
tags:
  [
    Next.js,
    React,
    TypeScript,
    Tailwind CSS,
    shadcn/ui,
    Firebase,
    Firestore,
    Gemini,
    MDX,
    Bun,
    Vercel,
  ]
cover: cover.png
links:
  - label: GitHub repository
    url: https://github.com/NoHaitch/portofolio_v2
  - label: Live website
    url: https://francisco-trianto.vercel.app
---

## Overview

This is the second version of my personal portfolio, built to present my background, education, experience, projects, and activities in one place.
It is available in English, Indonesian, Japanese, and Simplified Chinese.
The public website is mostly static, with Firebase used for visitor conversations and the owner inbox.

## Content-driven site architecture

The site uses the Next.js App Router, React, and TypeScript.
Route layouts provide the shared navigation, footer, theme, and locale-aware interface, while project and activity content lives in individual Markdown files under `content/work/`.
Typed front matter supplies each entry's title, summary, category, date, fields, technologies, and links.
Shared loaders validate the content and use it to build project and activity archives and detail pages.

```text
Markdown work entries -> validated content loader -> archive and detail routes
Locale dictionaries  -> typed interface copy   -> localized page layouts
URL query parameters -> archive filters        -> shareable search results
```

The project and activity archives support search, filters, date sorting, and pagination.
Their state is represented in the URL, and the static content model avoids requiring a database for portfolio pages.
Reusable components handle the shared cards, filters, navigation, and article layouts.

## Screenshots

The homepage introduces the portfolio and highlights recent projects and activities.

![Portfolio homepage](./homepage.png)

The Work page brings recent projects and activities together.

![Portfolio Work page](./work.png)

The experience page presents professional, academic, community, and AI and data science roles.

![Portfolio experience page](./experience.png)

## Visitor chat and owner inbox

The support widget uses Firebase anonymous authentication for visitors and Firestore to persist conversations.
Firestore listeners keep the visitor's thread and the owner's inbox up to date, including replies, read receipts, and human follow-up status.
The owner signs in through Firebase Authentication, and Firestore Security Rules restrict access to conversation data.

```text
Visitor widget -> anonymous Firebase Auth -> Firestore conversation
                                             |-> realtime visitor thread
                                             |-> owner inbox and replies
```

Visitors can ask the assistant or explicitly request a response from me.
They can start a fresh chat after confirming that the current conversation should be closed; the prior conversation remains available in the owner inbox.

## Portfolio-grounded AI assistant

The public assistant and owner-only AI playground call server-side routes rather than exposing the Gemini API key to the browser.
The server builds its knowledge corpus from approved profile and education information, published project and activity Markdown, and English experience content.
It retrieves relevant passages using BM25-style keyword scoring, without embeddings or a vector database.

```text
Persisted visitor question -> authenticated server route -> verify chat ownership
                           -> reserve Firestore request limits
                           -> input scope check -> retrieve portfolio passages
                           -> context relevance check -> Gemini answer
                           -> output and citation checks -> save answer to chat
```

The assistant is intended to answer questions about my portfolio, not general-purpose requests.
Input, context, and output checks constrain responses to the retrieved information, and answer citations link to related portfolio pages.
Visitor requests are limited per anonymous identity and globally in a rolling hour.
If the assistant cannot answer safely or a service fails, the conversation is flagged for human follow-up.
The owner playground uses the same retrieval and guardrail pipeline with its own owner-only rate limit.

These model-based checks are probabilistic and can make mistakes.
The rate limits do not replace provider quotas, budget alerts, or Firebase Security Rules.

## What I learned

This project brought together static content modeling, localized routes, URL-driven interfaces, and real-time application features.
Building the assistant also made the boundary between approved portfolio knowledge, model output, and human support an important part of the application design.
