---
title: Wikirace Solver
category: academic
date: 2024-04-27
summary: A web interface and Go service that search Wikipedia links with breadth-first or iterative-deepening search.
applicationTypes: ['API', 'Web interface']
fields: ['Algorithms', 'Computer Science', 'Web Development']
tags: [JavaScript, Web, React, Tailwind CSS, Docker, Go]
cover: cover.png
links:
  - label: Frontend repository
    url: https://github.com/NoHaitch/Wikirace-Solver-FE
  - label: Backend repository
    url: https://github.com/NoHaitch/Wikirace-Solver-BE
---

## The search problem

Wikirace asks a player to reach a target Wikipedia article from a starting article by following links.
This project models each article as a node and each article link as an edge, then searches for a route between the selected pages.

## Breadth-first and iterative deepening

The Go backend provides breadth-first search (BFS) and iterative deepening search (IDS).
BFS processes a frontier one depth at a time and tracks visited pages, while IDS repeats depth-limited searches with gradually increasing limits.
Both approaches scrape article links rather than relying on a Wikipedia API for graph traversal, so network latency, request limits, and the number of outgoing links all affect the search.

```text
Choose start and target pages
            |
            v
     Select BFS or IDS
            |
            v
Scrape article links and search
            |
            v
Return a route and search metrics
            |
            v
Display the path in the React interface
```

## Frontend and backend

The React frontend accepts the two page titles, lets the user choose BFS or IDS, and draws the returned route as a graph.
The Go backend uses Gin for its HTTP API and Colly for scraping pages, with separate search packages for the algorithms.
The repositories are split between the [frontend](https://github.com/NoHaitch/Wikirace-Solver-FE) and [backend](https://github.com/NoHaitch/Wikirace-Solver-BE).

The project helped me see how a graph-search algorithm behaves when the graph must be discovered through live requests.
That made the cost of obtaining neighbors as important as the search strategy itself.
