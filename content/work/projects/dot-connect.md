---
title: Dot Connect Game
category: personal
date: 2024-08-21
summary: A browser puzzle game with random boards, graph-search solvers, and a persistent leaderboard.
applicationTypes: ['Web interface', 'API']
fields: ['Game Development', 'Software Engineering']
tags: [Node.js, React, Tailwind CSS, Go, JavaScript]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Dot-Connect-Game
---

## The puzzle

Dot Connect asks the player to start at a marked cell and visit every usable dot exactly once by moving horizontally or vertically.
Blocked cells are excluded, so a board can be modeled as a graph whose vertices are usable cells and whose edges represent adjacent moves.

## Solvers and board model

The Go backend converts a board into that graph and runs a pre-check for isolated cells and excessive endpoints before attempting a solution.
The brute-force solver recursively explores legal neighbors and backtracks when a partial route cannot visit every dot.
A second solver orders candidate neighbors by how many onward connections remain, trying the more connected options first.

```go
if len(currPath) == usableDotCount {
    return currPath, true
}
```

This is the recursive search's completion condition: a route succeeds once it contains every usable cell.
The same graph representation lets the project compare exhaustive exploration with a heuristic ordering rule.

## Web application

The React and Tailwind CSS frontend presents the puzzle and communicates with a Go API built on Gin.
The app also includes random board generation and a leaderboard backed by SQLite.

```text
Board cells -> Graph nodes and edges -> Solver -> Route shown in the game
                                      |
                                      +-> SQLite leaderboard
```

Building the project connected graph theory and backtracking to an interactive interface, API boundaries, and persisted game results.
It also highlighted a useful distinction: ordering the search can help find a route sooner, but a heuristic is not itself proof that a board has a solution.
