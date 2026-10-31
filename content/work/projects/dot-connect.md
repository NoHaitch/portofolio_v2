---
title: Dot Connect Game
category: personal
date: 2024-08-21
summary: Dot Connect Game Web Application with additional features like solver, random board generator, and global leaderboard.
tags: [Node.js, React, Tailwind CSS, Go, JavaScript]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Dot-Connect-Game
---

Dot-Connect is a simple game with the objective is to use connect all the usable dots given. You must connect all the dots in the board
starting from the starting point. You can only connect the dots that are adjacent to each other (left, right, top, bottom). To win you must
connect all the dots in the board without any dots left unconnected.

This web app is made to play the game using the browser. This project also include a backend server to handle the game logic as well as data
storage using sql database. The backend server is made using Golang Gin and the frontend is made using React with tailwind.
