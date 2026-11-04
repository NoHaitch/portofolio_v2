---
title: Aho-Corasick Text Finder
category: academic
date: 2024-08-12
summary: A Python text-search tool that finds multiple patterns in one scan and makes the matching trie visible.
applicationTypes: ['CLI', 'GUI']
fields: ['Algorithms', 'Computer Science']
tags: [Python]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Aho-Corasick-Text-Finder
---

## Overview

Aho-Corasick Text Finder is a Python application for finding a set of patterns in a larger text.
It builds one trie for the pattern set, then scans the text while reusing trie state instead of launching an independent search for every pattern.
The Tkinter interface accepts patterns from JSON, highlights matches, and includes a graph view of trie transitions and links.

## Building the matcher

Pattern insertion marks terminal trie nodes and stores the patterns that end at each node.
A breadth-first traversal then builds failure links, which move from a partial match to the longest available suffix that is also a trie prefix.
The implementation follows those links until the next character can be consumed or the root is reached:

```python
while fail_node is not None and char not in fail_node.children:
    fail_node = fail_node.fail
```

When a failure link reaches another terminal node, its output patterns are carried forward so that suffix matches can be reported along with the longer match.

## Scanning text

The search loop advances through the text once, follows failure links on a mismatch, and records a count and position for each reported pattern.
The interface uses those results to highlight matches, while the graph view helps inspect the trie and its failure and output links.

```text
Pattern list -> trie plus failure/output links -> text scan -> match positions -> highlights
                                             \-> graph view
```

The project helped me make a multi-pattern matching algorithm concrete by separating trie construction, search, result reporting, and visualization.
It also illustrates why fallback and suffix links are useful when patterns overlap or share prefixes.
