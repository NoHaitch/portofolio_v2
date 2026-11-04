---
title: Cyberpunk 2077 Breach Protocol Solver
category: academic
date: 2024-02-22
summary: A C++ command-line and Flask web solver that searches possible sequences for Cyberpunk 2077's Breach Protocol puzzle.
applicationTypes: ['CLI', 'Web interface']
fields: ['Algorithms', 'Game Development', 'Software Engineering']
tags: [Flask, Tailwind CSS, Web, Python, C++, Make, CLI]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Cyberpunk-2077-Breach-Protocol-Solver
---

## The puzzle

Breach Protocol is a grid-based puzzle where each move selects a token from the current row or column.
The legal selection alternates between rows and columns, and the buffer size limits how many tokens can be entered into the sequence.
Target sequences award points when matched by the selected token path.

## Brute-force search

The C++ solver represents the board, buffer capacity, target sequences, and their rewards, then explores legal token paths to find a high-scoring solution.
Its objective is to maximize the total reward and, among solutions with the same reward, use as little buffer as possible.
The brute-force search makes the constrained state space explicit instead of relying on a hand-picked sequence.

```text
Board + buffer limit + target sequences/rewards
                     |
                     v
       Enumerate legal alternating paths
                     |
                     v
        Score matched target sequences
                     |
                     v
       Choose maximum reward, then shortest path
```

## Interfaces and learning goals

The C++ program provides a command-line workflow that can read puzzle data from a text file, generate randomized boards, and save results.
A separate Flask interface presents the solver through a browser, with Tailwind CSS used for its page styling.
The project helped me practice brute-force search, constraint handling, and comparing candidate paths with a multi-part objective.
It also showed how the same puzzle-solving task can be made available through both terminal and web interfaces.
