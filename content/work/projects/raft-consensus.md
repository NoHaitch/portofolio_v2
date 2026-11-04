---
title: Raft Consensus Algorithm in Typescript using Express.js
category: academic
date: 2025-06-05
summary: A TypeScript and Express implementation that demonstrates Raft elections, heartbeats, and replicated key-value commands.
applicationTypes: ['API']
fields: ['Computer Science', 'Distributed Systems', 'Software Architecture']
tags: [Express, TypeScript]
cover: cover.webp
links:
  - label: Repository
    url: https://github.com/NoHaitch/raft-consensus
---

## Overview

This project is a small multi-node implementation of Raft, a consensus protocol for keeping replicated state machines in agreement.
It runs each node as a TypeScript and Express service, with Docker Compose configuration for starting a cluster.
The implementation follows the core Raft ideas of leader election and log replication, based on the [Raft paper by Diego Ongaro and John Ousterhout](https://raft.github.io/raft.pdf).

## Elections, requests, and replication

Each node begins as a follower and uses a randomized election timeout to decide when to start an election.
A candidate requests votes from its configured peers, and a majority is required before the node becomes leader.
The Express API exposes health and cluster status routes, client command submission, log inspection, and the Raft request-vote and append-entries RPCs.

A command sent to a leader is replicated as a log entry.
The `LogManager` checks previous log position and term, reconciles conflicting entries, persists the log to a per-node JSON file, and applies committed entries to a key-value state machine.

```text
Client command -> leader log -> peer replication -> commit index
                                                   |
                                                   v
                                      key-value state machine
```

The code also includes add and remove operations for cluster members, but broadcasting membership changes is still marked as a TODO.
This is a learning implementation of protocol concepts, not a claim of production-grade consensus behavior.

## What I learned

Implementing the protocol made terms, elections, majority votes, and log matching concrete parts of a service rather than only paper concepts.
It also highlighted how the HTTP API, node state, persistent log, and state machine need to work together for replicated commands.
