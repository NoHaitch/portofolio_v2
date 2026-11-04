---
title: Card Game - Knee Grow
category: academic
date: 2024-05-25
summary: A JavaFX desktop card game that uses object-oriented models for turns, players, cards, and the playing field.
applicationTypes: ['Desktop application', 'GUI']
fields: ['Game Development', 'Software Engineering']
tags: [Java, Maven, JavaFX, OOP, GUI]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Card-Game
---

## Overview

Knee Grow is a turn-based card game implemented in Java with a JavaFX interface and a Maven build.
Players draw and play cards, manage a field and shop, and compete by their accumulated Gulden score.
The game logic keeps track of the current player, turn progression, and the score comparison at the end of a game.

## Game model

The model separates card data and behavior from players and the interface.
A `Player` owns a deck, six active-card slots, and a field, while the `GameMaster` coordinates the players and turn state.
The card package distinguishes card types and uses a `Harvestable` interface for cards that can be placed on a field.
A shared `Shop` holds product quantities and prices, and configuration data is accessed separately from the screen controllers.

```text
JavaFX views and controllers
             |
             v
          GameMaster
          /        \
      Players     Shop/config
       /   \
    Deck   Field and cards
             ^
             |
       Data and save loaders
```

The repository also separates loading and saving from the game model, with data-loader and plugin classes for external card configuration formats.
The `Shop` uses a shared singleton instance, while controllers handle the JavaFX screens and actions.

## What I learned

This project was a practical exercise in modeling game state with collaborating classes rather than keeping all rules in the UI.
It helped me understand how interfaces, class hierarchies, persistent game data, and turn-based state fit together in a desktop application.
The [class diagram](./class-diagram.png) shows the main model relationships.
