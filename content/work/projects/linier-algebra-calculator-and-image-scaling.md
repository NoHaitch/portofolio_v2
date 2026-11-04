---
title: Linear Algebra Calculator and Image Scaling
category: academic
date: 2023-10-23
summary: A Java command-line toolkit for linear algebra, interpolation, regression, and bicubic image scaling.
applicationTypes: ['CLI']
fields: ['Computer Science', 'Mathematics']
tags: [Java]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Algeo01-22091-Linier-Algebra-Calculator-and-Image-Scaling
---

This Java command-line application was developed for an ITB Linear Algebra and Geometry course project.
It brings together matrix methods and applications that use them, with interactive or text-file input and the option to save results.

## Linear algebra tools

The calculator solves systems of linear equations using Gaussian elimination, Gauss-Jordan elimination, the inverse-matrix method, or Cramer's rule.
It also computes determinants using cofactor expansion or row reduction and supports matrix inversion.

## Interpolation and regression

Polynomial interpolation constructs a polynomial through a set of input points.
The multivariable linear regression feature uses matrix operations to calculate a model from sample data.

The project also implements bicubic spline interpolation.
It estimates a value inside a 2D grid cell from the values and derivatives around that cell, using a 16-coefficient polynomial.

## Bicubic image scaling

The image-scaling feature applies that interpolation to images.
For each output pixel, the program maps its position back to the source image, takes a 4-by-4 neighborhood, and calculates bicubic coefficients for the alpha, red, green, and blue channels.
It then evaluates the polynomial at the pixel's fractional position and combines the channel values into the output pixel.
Repeating edge pixels provide a neighborhood at the image borders.

The core evaluation follows the bicubic polynomial: each coefficient contributes according to the pixel's local x and y position.

```java
alpha += a[0].getElmt(idx, 0) * Math.pow(x, i) * Math.pow(y, j);
red   += a[1].getElmt(idx, 0) * Math.pow(x, i) * Math.pow(y, j);
```

This project connected the underlying linear algebra to practical features: solving and fitting data, estimating values between samples, and using those estimates to resize an image.
