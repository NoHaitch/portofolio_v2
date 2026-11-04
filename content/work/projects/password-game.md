---
title: Password Game
category: personal
date: 2024-09-03
summary: Password Game Web Application using react tailwind and golang with firebase authentication.
applicationTypes: ['API', 'Web interface']
fields: ['Game Development', 'Software Engineering', 'Web Development']
tags: [Node.js, React, Tailwind CSS, Go, Firebase, SQLite, JavaScript]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Password-Game
---

## Overview

Inspired by The Password Game, this web application challenges players to create a password that satisfies a growing set of rules.
The game includes 20 rules, selectable difficulty, a timer, and features for saving and loading games, reviewing history, and viewing a leaderboard.
A cheat command can also ask the backend to find a solution for the current rule state.

## Rule engine and algorithms

The React and Tailwind frontend sends a candidate password and rule-specific state to a Go API built with Gin.
The backend evaluates the rules and returns an individual pass or fail result for each one, along with an overall accepted flag and progress values for some rules.
Firebase handles authentication, while SQLite stores game-related data such as saves, history, and leaderboard records.

```go
allRulesMet := true
for _, result := range results {
    if !result {
        allRulesMet = false
        break
    }
}
```

The rule checks use different techniques where they fit the input: regular expressions extract numbers and Roman numerals, Boyer-Moore searches for individual patterns, and Aho-Corasick checks multiple patterns in one scan.
Keeping the rule checks on the API side gives the browser a consistent response shape as the rule set changes.

## Learning goals

The project combined a stateful interactive game with account-based features and persistence.
It provided practice designing an API for frequent validation requests, splitting frontend and backend responsibilities, and selecting text-search techniques for different rule checks.
