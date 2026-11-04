---
title: Word Ladder Solver
category: academic
date: 2024-05-06
summary: A Java Swing application that compares Uniform Cost Search, Greedy Best-First Search, and A* on word ladders.
applicationTypes: ['Desktop application', 'GUI']
fields: ['Algorithms', 'Computer Science', 'Game Development']
tags: [Java, GUI]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Word-Ladder-Solver
---

## The puzzle and graph

The [Word Ladder game](https://en.wikipedia.org/wiki/Word_ladder) asks the player to transform one word into another by changing one letter at a time, with every intermediate word appearing in a dictionary.
The Java Swing application loads a local word list, filters it to words of the selected length, and builds a graph where words are vertices and one-letter differences are edges.

## Comparing search strategies

The interface lets a user compare Uniform Cost Search (UCS), Greedy Best-First Search (GBFS), and A* on the same start and target words.
UCS prioritizes the least accumulated path cost, while GBFS prioritizes the heuristic estimate of closeness to the target.
A* combines both values, using the number of mismatched character positions as its heuristic.

```java
int tentativeGScore = currentCost + 1;
int fScore = tentativeGScore + heuristic(neighbor, target);
```

Each edge represents one letter change, so the heuristic estimates a lower bound on the number of moves still needed.
The application reports search information such as elapsed time and visited nodes, and its README labels the memory estimate as inaccurate.

## Learning goals

This project helped me compare uninformed and heuristic-guided search on a graph generated from real dictionary entries.
It also made the effect of a heuristic visible through the path search and the number of explored nodes.
