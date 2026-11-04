---
title: License Plate Detector
category: academic
date: 2023-09-24
summary: A Python and OpenCV project that finds likely license plates in vehicle images and reads their characters with Tesseract OCR.
applicationTypes: ['Script']
fields: ['Artificial Intelligence', 'Computer Vision', 'Machine Learning']
tags: [Python, OpenCV, Tesseract, imutils]
cover: cover.webp
links:
  - label: Repository
    url: https://github.com/NoHaitch/license_plate_detector
---

## Overview

I built this project as the final project for the Machine Learning and Data Science course at Google Developer Student Club ITB.
It takes a directory of vehicle images, looks for a region that could contain a license plate, then passes that cropped region to Tesseract OCR to read the characters.

The project uses image processing to locate and prepare the plate; Tesseract handles text recognition.
Rather than training a plate-recognition model, I used the open-source Tesseract OCR engine.

## Image-processing pipeline

The driver resizes each image, applies a bilateral filter to reduce noise while preserving edges, and converts it to grayscale.
The default detection path then uses a black-hat morphological operation with a rectangular kernel to emphasize dark details, such as characters on a light plate.

```python
blackhat = cv2.morphologyEx(gray, cv2.MORPH_BLACKHAT, rectKern)
```

From there, the default path calculates the horizontal image gradient with the Sobel operator.
It blurs and closes the gradient, applies Otsu thresholding, and uses erosion and dilation to clean up the resulting regions.
A second thresholded mask helps keep regions with the expected plate contrast.
The program finds external contours in that mask, keeps a small set of large candidates, and checks their width-to-height ratios before cropping a likely plate.

The detector also includes Canny and edge-less candidate-detection paths, selectable when running the script.
For the morphology step, it supports black-hat processing for dark details on a light background and a top-hat alternative for the opposite contrast.

## Reading the plate

After cropping a candidate, the program applies another binary threshold to make the characters easier to read.
It then sends the result to Tesseract with a character whitelist for uppercase letters and digits, using page segmentation mode 7 by default.
The recognized text is printed, and the detected plate region and text can be drawn on the output image.

This pipeline let me explore how multiple small image-processing steps can narrow a full vehicle image down to a text-recognition task.
It also showed me that OCR quality depends on the earlier stages: if the plate is not isolated cleanly, recognition can fail or return no useful text.

The implementation was based on [Adrian Rosebrock's OpenCV automatic license-plate recognition tutorial](https://pyimagesearch.com/2020/09/21/opencv-automatic-license-number-plate-recognition-anpr-with-python/).
The cover image is from the same tutorial.
