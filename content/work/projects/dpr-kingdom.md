---
title: DPR Kingdom
category: academic
date: 2024-04-16
summary: A turn-based C++ kingdom simulation that models player roles, production, trade, and taxation in a command-line game.
applicationTypes: ['CLI']
fields: ['Game Development', 'Software Engineering']
tags: [C++, Make, CLI, OOP]
cover: cover.jpg
links:
  - label: Repository
    url: https://github.com/NoHaitch/DPR-Kingdom
---

## Overview

DPR Kingdom is a turn-based command-line simulation organized around a small economy.
The game models a Mayor, Farmers, and Cattlemen, with plants, animals, products, shops, storage, and buildings representing the resources and places those roles interact with.
The Mayor can collect taxes from the farmer and cattleman groups, add players, and construct buildings.

## Game loop and object model

The entry point reads configuration, loads or initializes the game state, advances turns, and accepts player commands until an exit or win condition is reached.
Game state is kept by a `Game` object, while domain classes separate shared player behavior from role-specific operations.
For example, `Mayor` derives from `Player` and supplies its own buying, selling, and score-calculation methods.

```text
Read configuration -> Load or initialize state -> Advance turn
                              ^                         |
                              |                         v
                         Check outcome <- Process player commands
```

The simulation also uses C++ features such as inheritance, virtual methods, operator overloading, and domain-specific exceptions.
Organizing the rules into related classes made it easier to reason about how player actions affect resources and the wider game state.

## What I learned

This was an exercise in turning a set of game rules into a maintainable object model rather than placing all behavior in the command loop.
It strengthened my understanding of class responsibilities, polymorphism, and the coordination required by a stateful turn-based program.

![Class diagram](./class-diagram.png)
_Class diagram for DPR Kingdom._

_Cover image source: [Kingdom background photos by Vecteezy](https://www.vecteezy.com/free-photos/kingdom-background)_
