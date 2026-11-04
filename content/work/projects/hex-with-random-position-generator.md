---
title: Hex Game With Random Position Generator
category: academic
date: 2023-12-11
summary: A Python Hex simulator that generated random games to provide empirical evidence for a graph-theoretic investigation of the first-player advantage.
applicationTypes: ['CLI', 'Script']
fields: ['Computer Science', 'Game Development', 'Statistics']
tags: [Python, CLI]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Hex-With-Random-Position-Generator
---

## Overview

I built this Python program while working on an unpublished paper about the first-player advantage in Hex.
The paper developed a graph-theoretic argument, and the program provided an additional, empirical way to examine the question by simulating large numbers of randomly played games.
It also includes a playable command-line version of the game.

## Random-play experiment

For each simulated game, the program starts with an empty board, randomly selects an unoccupied position for the current player, alternates turns, and continues until a player connects their two opposing sides.
It counts the wins for each player and reports the first player's win percentage over the requested number of games.

```python
while not is_won(board):
    code = generate_location_code(board)
    board = set_hex(code, board, current_player)
    current_player = 2 if current_player == 1 else 1
```

In a run of about 1,000,000 randomly generated games, I recall the first player winning a little over half of them.
That percentage is an approximate recollection, not a result recorded in the repository.
The experiment was useful as supporting evidence and a way to explore outcomes, but random play alone does not prove a strategic theorem: it samples one move-selection process rather than all possible strategies.

## How it relates to the paper

The paper's main argument used graph theory to reason about Hex and the advantage of moving first.
The simulator complemented that reasoning by making the game mechanics concrete and showing how a large batch of random games played out.
The paper was not published.

Further reading: [Application of Graph Theory on the Advantage of Going First in Hex](<https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2023-2024/Makalah2023/Makalah-Matdis-2023%20(91).pdf>).
