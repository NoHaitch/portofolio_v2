---
title: BurBir (Blue Bird)
category: academic
date: 2023-11-24
summary: A C command-line social network built to practice implementing data structures, from fixed arrays and dynamic lists to linked lists.
applicationTypes: ['CLI']
fields: ['Algorithms', 'Computer Science', 'Software Engineering']
tags: [C, CLI]
cover: cover.jpg
links:
  - label: Repository
    url: https://github.com/NoHaitch/BurBir-Burung-Biru
---

## Overview

BurBir (Burung Biru) is a command-line social-media simulation written in C for an algorithms and data structures course.
It models common social-platform features, including user profiles, friendships and friend requests, tweets, replies, drafts, and tweet threads.

The central goal was to put fundamental data structures into practice by implementing and using them directly in C, rather than relying on built-in collection containers.
That meant managing storage, element counts, capacities, pointers, and operations as part of the application itself.

## Implementing the structures

The codebase includes fixed-capacity arrays, dynamically allocated arrays, and pointer-based linked lists, alongside stack and queue ADTs.
It also contains structures such as a max heap and disjoint-set utilities.
Each representation brings different trade-offs: arrays make indexed access straightforward, dynamic lists track a buffer and its capacity, and linked lists connect separately allocated nodes through pointers.

For example, the dynamic list tracks its allocated buffer, the number of active elements, and its capacity:

```c
typedef struct {
    ElType *buffer;
    int nEff;
    int capacity;
} ListDin;
```

A linked list instead represents each element as a node that points to the next one:

```c
typedef struct node* Address;
typedef struct node {
    ElType info;
    Address next;
} Node;
```

These are not just isolated exercises. Tweets are kept in a dynamic collection, and a thread combines a dynamic array of tweet pointers with linked nodes for the thread entries.
Friend requests are also represented as linked nodes.
This made BurBir a practical way to see how data structure choices affect the design of real application features, while learning to reason about memory and implement the operations behind them.
