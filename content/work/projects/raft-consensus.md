---
title: Raft Consensus Algorithm in Typescript using Express.js
category: academic
date: 2025-06-05
summary: Implementation of Raft Consensus Algorithm for single cluster in Typescript using Express.js.
applicationTypes: ['API']
fields: ['Computer Science', 'Distributed Systems', 'Software Architecture']
tags: [Express, TypeScript]
cover: cover.webp
links:
  - label: Repository
    url: https://github.com/NoHaitch/raft-consensus
---

The Raft Consensus Algorithm is a distributed consensus algorithm designed to ensure that multiple nodes in a distributed system
agree on the same state. This implementation focuses on a single cluster of nodes, providing a foundation for understanding how Raft works.

Includes:

- Heartbeat
- Leader Election
- Log Replication
- Membership Change

Based around the original paper by Diego Ongaro and John Ousterhout: [https://raft.github.io/raft.pdf](https://raft.github.io/raft.pdf)
