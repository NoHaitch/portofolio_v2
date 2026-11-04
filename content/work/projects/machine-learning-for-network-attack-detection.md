---
title: Machine Learning Algorithms for Network Attack Detection
category: academic
date: 2024-12-15
summary: An experiment comparing KNN, Naive Bayes, and ID3 classifiers for network-attack detection with the UNSW-NB15 dataset.
applicationTypes: ['Jupyter Notebook']
fields: ['Cybersecurity', 'Data Science', 'Machine Learning']
tags: [Python, NumPy, pandas, scikit-learn, Machine Learning, AI]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Machine-Learning-Algorithm-Implementation-on-UNSW-NB15-dataset
---

## Overview

This notebook project uses the UNSW-NB15 network-traffic dataset to study supervised classification of attack and normal traffic.
Its workflow includes exploratory data analysis, data validation and preprocessing, followed by model training and prediction.
The repository includes implementations of K-nearest neighbors (KNN), Naive Bayes, and ID3, with notebook work for examining the experiment.

## Comparing classifiers

KNN classifies a sample by measuring its distance from training examples and taking a majority vote among the nearest `k` labels.
The implementation can calculate Euclidean, Manhattan, or Minkowski distance, so the distance metric is an explicit modeling choice.

```python
index_of_k_element = distance_sorted[:self.k]
k_element_labels = [self.y_train[i] for i in index_of_k_element]
most_common = Counter(k_element_labels).most_common(1)
return most_common[0][0]
```

The ID3 implementation builds a decision tree by choosing attributes with information gain.
For continuous attributes, it sorts examples and considers midpoints where neighboring labels change, then uses the best split threshold to form branches.
Naive Bayes provides a probabilistic classifier to compare against the distance-based KNN and rule-based tree approaches.

The experiment is useful for seeing how different assumptions shape a classifier: KNN depends on a distance metric, Naive Bayes models class-conditional probabilities, and ID3 produces a sequence of feature-based decisions.
This is a comparative learning exercise, not a claim that one model alone is a production intrusion-detection system.

## Learning goals

Working with a real network-traffic dataset provides practice in data validation, preprocessing, supervised model implementation, and comparing predictions across algorithms.
It also helps connect model behavior to the representation and quality of the input data.
