---
title: 'B?zier Curves using brute force and DnC'
category: academic
date: 2024-03-19
summary: A Python GUI that draws B?zier curves using both direct evaluation and recursive midpoint subdivision.
applicationTypes: ['GUI']
fields: ['Algorithms', 'Computer Graphics', 'Mathematics']
tags: [Python, GUI]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Bezier-Curves-using-brute-force-and-dnc
---

## Overview

B?zier curves provide a way to define smooth, editable curves from a set of control points.
This Python application plots curves and compares direct parameter sampling with a divide-and-conquer approach based on midpoint subdivision.
The Tkinter interface embeds Matplotlib charts so the generated points and curve can be explored visually.

## Direct evaluation

The brute-force routine takes a start point, a single control point, and an end point, then evaluates the quadratic B?zier equation at evenly spaced parameter values.
Each value of `t` produces an `(x, y)` coordinate using the corresponding Bernstein polynomial weights:

```python
for t in tVals:
    newX = ((1 - t) ** 2 * start_point.x) + (2 * (1 - t) * t * mid_point.x) + (t**2 * end_point.x)
    newY = ((1 - t) ** 2 * start_point.y) + (2 * (1 - t) * t * mid_point.y) + (t**2 * end_point.y)
```

The selected iteration level determines the number of sample points, so the direct method approximates the curve by evaluating more parameter values.

## Midpoint subdivision

The divide-and-conquer implementation repeatedly takes midpoints between adjacent control points, producing the intermediate control polygons used by De Casteljau subdivision.
It recursively builds the left and right halves in curve order, with the subdivision depth controlling how many points are generated.

```text
Control points -> direct equation at sampled t values -> plotted coordinates
Control polygon -> midpoint levels -> recursive left/right halves -> plotted coordinates
```

Both routines return their generated points along with an elapsed-time measurement, making the GUI useful for comparing their behavior at a chosen iteration depth.
The project helped connect polynomial evaluation, geometric subdivision, recursion, and practical rendering in one small experiment.
