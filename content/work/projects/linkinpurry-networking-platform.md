---
title: LinkinPurry Networking Platform
category: academic
date: 2024-12-09
summary: A full-stack LinkinPurry networking platform with a React single-page app, Express API, and PostgreSQL database.
applicationTypes: ['API', 'Web interface']
fields: ['Software Architecture', 'Software Engineering', 'Web Development']
tags: [React, Vite, Tailwind CSS, TypeScript, PostgreSQL, Express, Prisma]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/LinkenPurry-Networking-Platform
---

## Overview

LinkInPurry is a professional networking web application built around profiles, a feed, and connections between users.
Its pages cover account registration and login, profiles, a people directory with connection invitations, a network view, and messaging.
The project also includes connection recommendations and notifications.

## Full-stack architecture

The frontend is a React single-page application built with Vite, TypeScript, and Tailwind CSS.
An Express API serves the application, and Prisma models the relational data in PostgreSQL.
The database schema represents users, feed posts, connection requests, accepted connections, chat messages, and push-notification subscriptions.

```text
React single-page app
          |
          v
Express routes -> controllers and services
          |
          v
Prisma client -> PostgreSQL
          |
          +---- Socket.IO for live chat events
```

Chat uses Socket.IO over WebSockets in addition to the API routes.
The server authenticates socket connections, checks that two users are connected before relaying chat events, and stores messages through its chat service.

```ts
router.get('/chat/:to_id', AuthMiddleware.isAuthenticated, (req, res) => {
  log(req)
  chatController.getChatHistory(req, res)
})
```

## Learning goals

Separating the browser application from the API made the boundary between interface state and persisted application data explicit.
The project provided experience with typed frontend development, relational modeling, authenticated API routes, and real-time interaction through a persistent connection.
