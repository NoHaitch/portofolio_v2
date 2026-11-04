---
title: Web Pemilu HMIF 2025
category: organization
date: 2025-03-12
summary: An election website prototype for candidate information, voter eligibility, election rules, and a gated online voting flow.
applicationTypes: ['Web interface']
fields: ['Software Engineering', 'Web Development']
tags: [Node.js, Next.js, Tailwind CSS, Prisma, TypeScript, React, tRPC, Drizzle]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/Pemilu-HMIF-2025/Web-Pemilu-HMIF-2025
---

## Overview

Web Pemilu HMIF 2025 is an election website for the Informatics Student Association at ITB.
It brings candidate information, election rules, voting instructions, profile pages, and an online voting flow into one Next.js application.

The candidate and election-information pages use data checked into the repository, while voting is gated by a signed-in session and an eligibility check.
The project gave me practice shaping a multi-route website around a time-sensitive organization workflow rather than a single landing page.

## Candidate information and voting flow

The site presents candidates for chair and senator roles, along with election rules and step-by-step voting guidance.
The `/coblos` page checks the user's authentication status, requests eligibility from `/api/vote/eligible`, and only renders the voting wizard after those checks and the configured voting-period check pass.

The eligibility endpoint looks up the current account and checks whether both role-specific vote fields are still empty.
The voting endpoint accepts a choice for each role, hashes those values, and stores them on the user's record, which the eligibility endpoint then uses to identify a prior vote.

```typescript
const isEligible = user.email && user.kahim_email === null && user.senat_email === null
```

This describes the repository's implemented workflow, not an independently audited election system.

## Application structure

The app uses Next.js routes and reusable React components for candidate cards, tabs, dialogs, and the multi-step voting interface.
NextAuth provides session handling, and Prisma connects user and vote-related fields to a PostgreSQL database.
The source also includes the T3 stack's tRPC scaffolding, alongside the route handlers used by this workflow.

```text
Candidate and rules pages -> checked-in content data
                                   |
Signed-in voter -> eligibility API -> time-window check -> voting wizard
                                   |
                         stored vote markers
```

A key implementation choice is to separate public election information from the authenticated voting path.
Working on the project helped me learn how page state, session state, and API responses combine to guide a user through a multi-step flow.
