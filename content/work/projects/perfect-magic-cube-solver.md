---
title: Perfect Magic Cube Solver
category: academic
date: 2024-11-04
summary: A Python GUI for comparing local-search strategies on a five-by-five-by-five magic-cube puzzle.
applicationTypes: ['GUI']
fields: ['Artificial Intelligence', 'Mathematics', 'Optimization']
tags: [Python, GUI, AI]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Perfect-Magic-Cube-Local-Search
---

## The puzzle

This Python program searches for a perfect magic cube by rearranging values in a three-dimensional grid and checking the sums of its required lines.
The implementation defaults to a 5×5×5 cube with a target line sum of 315.
The repository README describes a 3×3×3 puzzle, but the code's default cube size and objective function implement the larger puzzle, so this page follows the source behavior.

## Scoring candidate cubes

The objective function counts rows, columns, pillars, and the implemented diagonal lines whose sums do not equal the target.
It converts that count into a score where 109 represents a cube with no failing lines.
This gives the search methods a shared way to compare candidate arrangements.

```python
return 109 - ObjectiveFunction.__check_315(magic_cube)
```

## Comparing local search methods

The program includes steepest-ascent, stochastic, sideways-move, and random-restart hill climbing, as well as simulated annealing and a genetic algorithm.
These methods explore neighboring arrangements in different ways.
For example, hill climbing favors improving moves, while simulated annealing can sometimes accept a lower-scoring neighbor based on a temperature-dependent probability.

A small GUI lets a user choose a search method and watch recorded cube states in a visualization with video-like controls.
That made it possible to connect the abstract search process to changes in the candidate solution over time.

```text
Create or choose an initial cube
             |
             v
      Score its line sums
             |
             v
Select a local-search method
             |
             v
Generate and score neighbor states
             |
             v
Show the search history in the GUI
```

The project helped me compare optimization strategies against one objective function and see how evaluation design shapes a search problem.
