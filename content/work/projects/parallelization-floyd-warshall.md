---
title: Parallelization of Floyd-Warshall Algorithm
category: academic
date: 2025-04-21
summary: A C++ Pathfinder Network experiment that accelerates Floyd-Warshall-style path computation with OpenMP, MPI, AVX2, and CUDA.
applicationTypes: ['Script']
fields: ['Algorithms', 'Computer Science', 'Parallel Computing']
tags: [C++]
cover: cover.webp
links:
  - label: Repository
    url: https://github.com/NoHaitch/Parallelization-of-Floyd-Warshall
---

## Overview

This C++ project computes a Pathfinder Network from text and compares several parallel implementations of the path-relaxation stage.
The program tokenizes its input, builds a word co-occurrence graph from nearby words, and compares word-neighborhood vectors with cosine similarity to initialize a distance matrix.
The code uses a window of up to five following tokens when adding co-occurrence edges.

## From text to Pathfinder Network

After creating the graph, the implementation converts cosine similarity to a distance and repeatedly considers whether routing through an intermediate vertex gives a smaller connection value.
This is a Floyd-Warshall-style dynamic-programming loop, with a parameter selecting how two path segments are combined.
The repository includes sum, Euclidean-style, and maximum-distance cases, rather than using the classical sum-only recurrence for every run.

```text
Text tokens
    -> word co-occurrence graph
    -> cosine-similarity distances
    -> iterative path relaxation
    -> Pathfinder Network values
```

## Parallel strategies

The OpenMP version parallelizes independent matrix rows for each intermediate vertex while keeping the outer vertex loop sequential.
The MPI version distributes rows among processes and broadcasts the current pivot row so each process can update its assigned portion of the matrix.

The AVX2 implementation processes groups of four distance values with SIMD instructions and also uses OpenMP row-level parallelism.
The CUDA version flattens the matrix for device memory and launches a two-dimensional grid of GPU threads for each intermediate vertex.

The project keeps these execution models side by side with serial code and records timing for test inputs, which makes the communication and synchronization costs part of the comparison rather than focusing only on arithmetic throughput.
It offered practice in translating one iterative algorithm across shared-memory, distributed-memory, vectorized CPU, and GPU execution.
