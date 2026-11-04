---
title: Fingerprint Biometric Detection
category: academic
date: 2024-06-09
summary: An experimental C# fingerprint-matching application that compares image-derived patterns with string-search algorithms.
applicationTypes: ['GUI']
fields: ['Algorithms', 'Computer Vision']
tags: [C#, Docker, MySQL]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Fingerprint-Biometric-Detection
---

## Overview

This C# project explores fingerprint matching by representing fingerprint images as binary and ASCII strings.
The image-processing code separates ridge and valley pixels using a threshold and prepares image-derived patterns for string matching.
The Windows Forms application loads a collection of fingerprint images from a MySQL-backed database and converts those images concurrently before presenting the data to the interface.

## Pattern matching

The matching code searches an image's ASCII representation for patterns from the stored images.
Knuth-Morris-Pratt preprocesses a pattern with a border-function table so it can reuse prefix matches after a mismatch.
Boyer-Moore compares from the end of the pattern and uses a last-occurrence table to skip ahead.
Matches contribute weighted points, and the implementation uses Levenshtein distance to find a closest candidate when none of the patterns match exactly.

```csharp
if (KMP.KMPStringMatching(imageAscii, patterns[i]))
{
    matches += CalculateWeight(i + 1);
}
```

This is an exploration of adapting text-search algorithms to image-derived data, not a claim of production-grade biometric verification.
The key learning goal was to connect preprocessing, string representation, exact pattern matching, and approximate comparison in one application.
