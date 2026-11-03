---
title: Tic Tac Toe in C#
category: personal
date: 2023-01-14
summary: A C# console Tic-Tac-Toe game with a hand-coded strategy designed to avoid defeat.
applicationTypes: ['CLI']
fields: ['Algorithms', 'Game Development']
tags: [C#, CLI]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Tic-Tac-Toe-Bot-in-CS
---

## Overview

This project is a console-based Tic-Tac-Toe game in C#. I wanted to build a computer opponent that would not lose, so I
worked through the possible opening moves and follow-up positions on a 3×3 board, then encoded the responses directly
in the program.

## A strategy written as cases

Instead of using a general-purpose game-tree search, the opponent's strategy is a set of explicit `if`/`else` branches.
The branches account for the player's opening and subsequent board positions, choosing from the available moves
accordingly. For example, when the player opens in a corner, the program responds in the center:

```csharp
if (AngkaAksiUser == 1 || AngkaAksiUser == 3 || AngkaAksiUser == 7 || AngkaAksiUser == 9)
{
    AksiKe++;
    AngkaAksiKomputer = CariAksiKomputer(SudahBerisi, 5);
    SudahBerisi.Add(AngkaAksiKomputer);
    Board = LakukanAksi(Board, AngkaAksiKomputer, 2);
}
```

Later turns use the current board to select the next move and check whether the game has ended:

```csharp
AngkaAksiKomputer = CariAksiKomputer(
    SudahBerisi,
    OtomaticNyerangBlokir(Board, SudahBerisi)
);
SudahBerisi.Add(AngkaAksiKomputer);
Board = LakukanAksi(Board, AngkaAksiKomputer, 2);

if (CekMenang(Board) > -1)
{
    break;
}
```

This approach made the full set of cases visible in code, but also meant writing and checking many branches by hand.
It was a practical way for me to explore game logic and translate the outcomes I analyzed into a working opponent.

I built the project while I was in high school, as I was learning about game development and wanted to experiment with
how logic could drive a game-playing program.
