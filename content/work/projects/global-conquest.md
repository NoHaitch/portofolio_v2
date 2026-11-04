---
title: 'Global Conquest: Battle for Supremacy'
category: academic
date: 2023-12-03
summary: A turn-based strategy game built in GNU Prolog to practice logic programming and model game rules declaratively.
applicationTypes: ['CLI']
fields: ['Computer Science', 'Game Development']
tags: [Prolog, CLI]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Global-Conquest-Battle-for-Supremacy
---

## Overview

Global Conquest: Battle for Supremacy is a command-line, turn-based strategy game inspired by Risk, implemented in GNU Prolog.
The project was created to train logical reasoning and explore a programming paradigm different from the imperative languages I had used before: logic programming, a declarative paradigm.

## Thinking in rules and relationships

Instead of describing every operation as a sequence of instructions, logic programming represents information as facts and relationships, then defines rules that Prolog can use to determine whether a query succeeds.
This changed how I approached the game: the map, territory ownership, troop counts, players, and turn state were represented through predicates, while actions such as drafting troops, moving, and attacking were expressed as rules with conditions.

For example, the attack module stores which territories are neighbors as facts and uses them to list territories that can be considered for attack:

```prolog
neighbors(na1, [na2, na3], ['na2', 'na3']).

checkAttackableTerritory(X) :-
    neighbors(X, List, ListString),
    printList(ListString, 1).
```

The rule succeeds by matching `X` against a known `neighbors` fact, binding the neighboring-territory lists, and then displaying them.
This small example illustrates the central shift in thinking: define relationships and rules, then let Prolog match facts to answer a query.

## The game

The game supports two to four players and includes game setup, troop placement, turn management, troop movement, territory attacks, and risk cards.
Building these mechanics in GNU Prolog gave me hands-on experience expressing changing game state and rule constraints with predicates, rather than relying on a conventional step-by-step control flow.

The project remained unfinished because of time constraints, but it gave me a practical introduction to logic programming and a different way to structure program behavior.
