---
title: Feed Forward Neural Network
category: academic
date: 2025-04-11
summary: A from-scratch Python neural network that implements feed-forward computation, automatic gradients, training, and visualization.
applicationTypes: ['Script']
fields: ['Artificial Intelligence', 'Machine Learning']
tags: [Python, Machine Learning, AI]
cover: cover.jpg
links:
  - label: Repository
    url: https://github.com/NoHaitch/Feed-Forward-Neural-Network
---

## Overview

This project builds a feed-forward neural network in Python without using a high-level neural-network framework for the core model.
Alongside the network, it implements automatic gradient calculation and visualization tools, with notebooks for model use, testing, and experiments.

## Forward and backward computation

The model is divided into reusable components for values, matrices, network modules, activation functions, loss functions, and regularization.
During a forward pass, inputs flow through the network to produce predictions and a loss value.
The automatic-gradient implementation records how values depend on earlier operations, then applies the chain rule to calculate gradients for training.

```text
Input batch -> Feed-forward layers -> Prediction -> Loss
       ^                                      |
       |                                      v
       +--------- Parameter updates <- Gradients
```

The repository's notebooks explore choices such as activation functions, learning rates, regularization, and network width or depth.
A separate comparison notebook provides a reference point against a library implementation.

## What I learned

Implementing the pieces directly made the relationship between the forward calculation, the chain rule, and parameter updates easier to inspect.
It also helped me understand that a working network depends on more than its layer structure: initialization, loss, activation, and training settings all affect the result.
