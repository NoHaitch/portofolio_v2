---
title: Phoenix Image
category: academic
date: 2023-11-19
summary: A content-based image retrieval project that taught me to represent images with color and texture features and compare them using cosine similarity.
applicationTypes: ['API', 'Web interface']
fields: ['Artificial Intelligence', 'Computer Vision', 'Software Engineering', 'Web Development']
tags: [Node.js, Next.js, Tailwind CSS, TypeScript, Framer Motion, C++, Express, Web, Figma]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Phoenix-Image
---

## Overview

Phoenix Image is a content-based image retrieval (CBIR) system built as a learning project for applying linear algebra concepts, especially vector representations and cosine similarity.
Instead of relying on filenames or manually assigned labels, it describes images through visual properties and searches for items with similar descriptors.

The project helped me understand how image retrieval can be reduced to a practical sequence: extract useful features from each image, represent those features as vectors, then compare the query vector with the dataset.

## Color-based retrieval

The color search converts images from RGB to HSV, then divides them into small spatial regions.
For each region, it counts values in quantized hue, saturation, and brightness ranges, producing a histogram descriptor that preserves some information about where colors appear in the image.

The query image and dataset images are represented the same way.
The program compares corresponding regional histograms using cosine similarity, averages the scores, and returns sufficiently similar results.
Dataset descriptors are cached so they do not need to be recalculated for every query.

```cpp
float cosine = cosImage(data[i], histogramOri);
if (cosine > 60) {
    result->push_back(resultTemp);
}
```

The threshold is a retrieval cutoff in this implementation, not a guarantee that a result is perceptually correct.

## Texture-based retrieval

The texture search first converts images to grayscale.
It then builds a gray-level co-occurrence matrix (GLCM) by counting neighboring pixel-value pairs horizontally, symmetrizes and normalizes that matrix, and computes six texture descriptors: contrast, homogeneity, entropy, dissimilarity, energy, and correlation.

These six values form a feature vector for each image.
Cosine similarity compares the query vector against each dataset image, and results meeting the implementation's cutoff are sorted by score.
This represents texture through patterns of neighboring intensities rather than color distribution.

## From query to results

```text
Choose or capture an image
          |
          v
   Select color or texture
          |
          v
Extract the matching feature descriptor
          |
          v
Compare with dataset descriptors
          |
          v
Rank and display similar images
```

The browser interface is built with Next.js, and an Express server handles uploads and coordinates the search.
Separate C++ programs perform the color and texture calculations.
The project gave me a concrete introduction to feature engineering, vector similarity, and how mathematical representations can support a usable image-search experience.

See the [Phoenix Image Figma design](https://www.figma.com/design/MJY3VVW3GHJgpds7RC9MFg/Phoenix-Image?node-id=7618-482&t=sRB9Ku6yHMf6flbl-1).
