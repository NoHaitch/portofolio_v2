---
title: Shape Side Matching for Rectangular Shape Origin
category: academic
date: 2024-06-12
summary: A Python image-matching experiment that represents shape edges as sequences and combines exact search with edit-distance similarity.
applicationTypes: ['Script']
fields: ['Algorithms', 'Computer Science', 'Mathematics']
tags: [Python, NumPy]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Shape-Side-Matching-for-rectangular-shape-origin
---

## Representing a shape side

This program tests a method for matching the sides of shapes in images.
It scans each image from a selected edge, records the distance to the first non-black pixel along each row or column, and normalizes those distances by subtracting the minimum.
The resulting sequence describes the outline relative to that side and can be converted into a string for matching.

## Exact and approximate matching

The matcher divides the encoded outline into short subpatterns and searches candidate dataset sides with Knuth-Morris-Pratt (KMP) or Boyer-Moore (BM).
It counts how many subpatterns match each candidate.
If one candidate has a unique count above the implementation's threshold, it returns that side; otherwise it falls back to a normalized Levenshtein similarity score.

```python
if max_count > 6:
    if len(best_matches) == 1:
        return best_matches[0]

return ShapeMatching.shape_match_ld(img_path, side, dataset_pattern)
```

The image-processing code, pattern construction, string-matching algorithms, and simple results GUI are separate parts of the Python program.
That separation made it easier to compare exact substring matching with edit distance on image-derived data.

## Learning goals

The project gave me a way to apply string-search algorithms to a representation extracted from pixels instead of hand-written text.
It also showed why an approximate similarity measure can help when exact pattern matches are ambiguous or incomplete.

Further reading: [Application of String Matching and String Similarity for Shape Side Matching](<https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2023-2024/Makalah/Makalah-IF2211-Stima-2024%20(87).pdf>).
