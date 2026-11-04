---
title: Intro To Machine Learning
category: academic
date: 2025-05-08
summary: A collection of Python notebooks and scripts exploring machine-learning workflows from preprocessing through evaluation.
applicationTypes: ['Jupyter Notebook', 'Script']
fields: ['Artificial Intelligence', 'Data Science', 'Machine Learning']
tags: [Python, scikit-learn, Seaborn, TensorFlow, Keras, pandas, NumPy, AI, Machine Learning]
cover: cover.jpg
links:
  - label: Repository
    url: https://github.com/NoHaitch/Intro-to-Machine-Learning
---

## Overview

This repository is a collection of Python notebooks for studying artificial intelligence and machine learning rather than a single deployable model.
The machine-learning exercises are grouped around customer segmentation and classification, convolutional neural networks, and recurrent neural networks, alongside separate artificial-intelligence notebooks.

Each notebook focuses on a different task, so data preparation and model choice are explored in context instead of hidden behind one reusable pipeline.
This structure makes it possible to inspect intermediate work, change an experiment, and compare the resulting behavior while learning.

## Experiment workflow

The practical work follows a familiar modeling loop: understand the task and data, prepare inputs, train a model, and inspect its predictions or evaluation results.
The CNN and RNN exercises expose different model families, while the segmentation and classification exercise brings attention to how a data problem is framed before choosing a model.

```text
Task and dataset
      |
      v
Explore and prepare inputs
      |
      v
Choose a model for the task
      |
      v
Train, evaluate, and iterate
```

The main learning goal is to connect data preparation and model selection to the problem being solved, rather than treating training as a single library call.
Keeping experiments in notebooks also makes it easier to follow the reasoning from raw inputs to results.
