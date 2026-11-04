---
title: Greedy Diamonds Bot
category: academic
date: 2024-03-09
summary: A Python game-playing agent that applies greedy decision rules to collect gems in the Diamonds challenge.
applicationTypes: ['Script']
fields: ['Algorithms', 'Artificial Intelligence', 'Game Development']
tags: [Python, Docker]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Greedy-Diamonds-Bot
---

## Overview

Greedy Diamonds Bot is a Python agent for the Diamonds challenge, where competing bots navigate a shared board and collect gems for points.
The project adapts the provided game framework and adds a custom decision strategy alongside simpler bots for comparison.

The command-line entry point connects the game API, board handler, bot handler, and selected logic.
At each turn the agent receives the current game state and returns an action, rather than controlling the game engine directly.

## Greedy decision-making

The main bot applies a greedy strategy and moves directly toward an objective based on the current board state.
It tracks inventory capacity, distance to base, nearby portals, and enemy positions, with state switches for varying a step, ignoring a portal, or chasing a nearby opponent.
This keeps movement decisions responsive to the current turn instead of relying on an exhaustive multi-turn search.

The repository includes comparison strategies based on gem points, chasing another bot, random moves, or staying at the base.
Those alternatives make it possible to observe how different local rules change play in the same game environment.

```text
Game observation
       |
       v
Check board, inventory, portal, and opponent context
       |
       v
Choose a greedy action
       |
       v
Return action to game API
```

## What I learned

This project made the difference between a local heuristic and exhaustive search concrete.
It also provided practice integrating a strategy with an existing game API and handling the effects of portals and opponents on movement.

The approach is intentionally heuristic, so a locally attractive route is not guaranteed to maximize the bot's eventual score.
