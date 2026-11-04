---
title: Cinemanager
category: personal
date: 2024-05-19
summary: A Python desktop app for managing a watchlist, recording ratings and reviews, tracking viewing progress, and getting recommendations.
applicationTypes: ['Desktop application']
fields: ['Recommendation Systems', 'Software Engineering']
tags: [Python, Desktop, Flet]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/cinemanager
---

## Overview

Cinemanager is a Python desktop application for organizing films and series in a personal watchlist.
It lets users save reviews and ratings, update viewing status and progress, filter by genre, and sort entries by rating.
The project also describes recommendations based on the watchlist and review history without specifying a ranking formula.

## Data model and persistence

The interface is built with Flet, and SQLite stores the collection and its related records.
A shared `WatchItem` model contains common details such as title and synopsis, while `Film` and `Series` hold their own progress fields.
A series can contain separate `Episode` records with per-episode viewing progress.
The relational schema also separates genres and reviews from the common watch-item details.

```text
WatchItem
??? Film
??? Series
    ??? Episode

SQLite: WatchItem + Film/Series/Episode + Genre/Categorize + Review
```

This split lets the app present one collection while still representing film duration and series episode progress differently.
The UI screens call database helpers to add, select, update, and remove those records.

## What I learned

Cinemanager helped me practice turning a feature list into a relational schema and a small set of domain classes.
It also connected desktop UI workflows with persistent data, including the different progress models required for films and episodic series.
