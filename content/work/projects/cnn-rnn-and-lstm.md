---
title: CNN, RNN, and LSTM Forward Propagation From Scratch
category: academic
date: 2025-05-30
summary: A Python learning project implementing CNN, RNN, and LSTM forward passes and visualizing model training.
applicationTypes: ['Script']
fields: ['Artificial Intelligence', 'Machine Learning']
tags: [Python, Machine Learning, AI, Deep Learning, TensorFlow, scikit-learn, Matplotlib]
cover: cover.jpg
links:
  - label: Repository
    url: https://github.com/NoHaitch/Convolutional-Neural-Network-and-Recurrent-Neural-Network
---

## Overview

This project compares the forward computations used by convolutional and recurrent neural networks through three Python model experiments.
The repository pairs model-training pipelines with a separate NumPy implementation of the forward passes, so intermediate operations can be studied without confusing inference code with training code.

## Convolutional network

The scratch CNN applies convolution to image tensors using same-padding, activation functions, pooling, flattening, and dense layers.
Its convolution layer reshapes each image patch and kernel into matrices, then uses matrix multiplication to produce each output position.
The pooling layer supports 2-by-2 max or average pooling.

## Recurrent networks

The simple RNN carries a hidden state from one sequence step to the next, applying the same input and recurrent weight matrices at each step:

```python
h = self._apply_tanh_activation(x_t @ self.Wx + h @ self.Wh + self.b)
```

The implementation can return either the final hidden state or the full output sequence, and it also includes a bidirectional layer that runs a second recurrent pass over the reversed sequence.
The LSTM version maintains both a hidden state and a cell state, updating them through input, forget, candidate, and output gates at each time step.

## Training and learning goals

Keras and TensorFlow model pipelines handle training and evaluation, while the scratch classes load model weights and reproduce inference operations with NumPy.
The experiments use F1-score evaluation and plotting utilities to inspect training results.
Keeping these paths separate made it easier to follow tensor shapes, convolution windows, recurrent state updates, and LSTM gate calculations.
The project strengthened my understanding of how model architecture changes the way information moves through a network.
