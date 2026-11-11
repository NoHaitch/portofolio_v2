---
title: Smart Posture Corrector
category: academic
date: 2026-06-25
summary: An ESP32 wearable that classifies six posture states on-device, gives slouch alerts through vibration, and sends optional telemetry to a web dashboard.
applicationTypes: [Jupyter Notebook, Web interface]
fields: [Artificial Intelligence, Machine Learning, Software Engineering]
tags:
  [Edge AI, Embedded Systems, ESP32, MPU-6050, LightGBM, Python, C, MQTT, InfluxDB, Go, Chart.js]
cover: device-demo.jpeg
team: ITB IF4051 IoT project with Tazkia Nizami and Bagas Sambega Rosyada
links:
  - label: GitHub repository
    url: https://github.com/NoHaitch/SmartPostureCorrector
  - label: Download research paper (PDF)
    url: /work/projects/smart-posture-corrector/smart-posture-corrector-paper.pdf
---

## Overview

The Smart Posture Corrector is an upper-back wearable that recognizes whether someone is sitting, standing, or walking with an upright or slouched posture.
An ESP32 reads an MPU-6050 motion sensor, runs a compact classifier locally, and activates a vibration motor when it detects a slouched class.
Wi-Fi and MQTT provide an optional path to save sensor telemetry and view posture history in a dashboard; the core classification and feedback loop run on the device.

This was a team project for Institut Teknologi Bandung's IF4051 Internet of Things course.
My main responsibility was the machine-learning work, from deciding what sensor features the model needed through dataset preparation, model comparisons, and the embedded export.
The [full research paper is available as a PDF](/work/projects/smart-posture-corrector/smart-posture-corrector-paper.pdf).
The [training notebook](https://github.com/NoHaitch/SmartPostureCorrector/blob/main/model/EdgeAI_IOT.ipynb) contains the data analysis, experiments, evaluation, and model-export workflow.

## Hardware: sensing posture and giving feedback

The prototype places an ESP32 DevKit V1 and MPU-6050 in an enclosure worn against the upper back.
The strap keeps the sensor aligned with the wearer's body, while a small vibration motor provides a private, immediate cue instead of requiring the wearer to watch a screen.

| Component                                      | Role                                                                                      |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ESP32 DevKit V1                                | Reads the sensor, runs inference, drives the motor, and handles optional Wi-Fi telemetry. |
| MPU-6050                                       | Measures three-axis acceleration and three-axis angular velocity over I2C.                |
| Vibration motor and transistor driver          | Converts a slouch prediction into a tactile alert.                                        |
| Calibration button and strap-mounted enclosure | Establish a personal sensor baseline and keep the IMU positioned on the upper back.       |

The sensor uses GPIO 21 for SDA and GPIO 22 for SCL.
The motor is driven from GPIO 15 through a transistor, and the physical calibration button is connected to GPIO 14.
At startup or calibration, the firmware measures the sensor's resting orientation and gyroscope offsets so the model can use posture relative to that baseline.

![Wiring diagram for the ESP32, MPU-6050, calibration button, and vibration motor](./hardware-wiring.png)
_Hardware wiring diagram reproduced from the project paper._

## Dataset: turning movement into labeled examples

I helped define the data representation before model selection: the sensor needed to capture both body orientation and movement, not just a single tilt threshold.
The collection process records sessions for one posture label at a time, with calibration before a session.
The original recordings are stored in per-label CSV files, then consolidated into `dataset_all.csv` with standardized English labels.

The consolidated dataset contains 45,774 samples and 20 columns, about 5.7 MiB in the repository.
Those columns include timestamps; raw accelerometer and gyroscope readings; raw and calibrated tilt angles; calibration offsets; derived rotation speeds; and the ground-truth label.
The six classes cover sitting, standing, and walking, each labeled as either upright or slouched.

![Distribution of the six labeled posture classes](./class-distribution.png)
_Class distribution reported for the consolidated dataset in the paper._

The notebook checks data shape, missing values, duplicates, feature distributions, correlations, and how sensor signals vary by label.
For the modeling table, it removes the session-specific timestamp and calibration offsets, along with redundant intermediate tilt and raw gyroscope columns.
The eight features documented for training are the three raw accelerometer axes, two calibrated tilt angles, and three gyroscope rotation-speed values.
Labels are encoded into six classes, and a stratified 80/20 split preserves their proportions across 36,619 training and 9,155 test samples.

## Machine learning: compare models for both fit and footprint

The notebook compares nine conventional models: Logistic Regression, RBF SVM, AdaBoost, Gradient Boosting, Random Forest, Extra Trees, XGBoost, LightGBM, and CatBoost.
It also tests three compact neural models: two feed-forward networks and a simple recurrent network.
The deep-learning candidates use standardized inputs; the models are compared using stratified five-fold macro F1, held-out test macro F1, and serialized model size.

The initial comparison favored LightGBM and XGBoost on test macro F1, while smaller models such as Logistic Regression traded away more predictive performance.
The paper reports these representative results for that comparison:

| Candidate           | Test macro F1 | Serialized size |
| ------------------- | ------------: | --------------: |
| LightGBM            |        0.9917 |      2,028.9 kB |
| XGBoost             |        0.9913 |      1,232.0 kB |
| Simple RNN          |        0.9822 |         50.9 kB |
| Logistic Regression |        0.8574 |          2.3 kB |

I selected a regularized LightGBM model for deployment rather than choosing a model on score alone.
The final configuration uses 50 estimators, a maximum depth of four, and a learning rate of 0.1.
On the paper's held-out test split, it reaches a macro F1 of 0.9813 and an accuracy of about 98 percent.
This is an offline result on this dataset, not a claim that the system has been validated across different people.

The feature-importance analysis showed the strongest contributions from vertical acceleration and the two tilt angles.
Rotation speed adds useful movement information, particularly for distinguishing walking from more static postures.

![LightGBM feature importance from the regularized model](./feature-importance.png)
_Split-based feature importance reported in the paper._

## Edge deployment: run the classifier on the ESP32

The ESP32 has limited memory and compute compared with a laptop, so deploying a Python model directly was not an option.
I compared Python-to-C export options and used `m2cgen` to generate a standalone C implementation of the regularized LightGBM model.
The generated header is about 585 kB and does not require the LightGBM runtime on the microcontroller.

The firmware compiles the generated header as C99 in a small C shim, then calls the inference function from the C++ sensor loop.
Each inference produces scores for the six posture classes; the firmware selects the highest-scoring class and turns the motor on for a slouched prediction.
Because inference and vibration control stay on the ESP32, this feedback path does not depend on the MQTT broker or an internet connection.

The paper and notebook define the training vector as raw acceleration, calibrated tilt, and rotation speed.
In the current repository firmware, the model-input mapping instead uses raw gyroscope X at one position and omits rotation speed Z.
The page describes the paper's trained feature set, and this training-to-firmware mapping should be reconciled before treating the reported offline score as on-device validation.

## System architecture: local feedback with optional cloud analytics

The local path runs from the MPU-6050 to ESP32 preprocessing, LightGBM inference, and the vibration motor.
Separately, the ESP32 can publish timestamped sensor readings and predicted classes over Wi-Fi and MQTT.
The repository's Go analytics service consumes MQTT messages, writes time-series data to InfluxDB, and serves an HTML and Chart.js dashboard through its API.
The dashboard presents current posture and historical summaries and charts.

![System architecture diagram reproduced from the project paper](./system-architecture.png)
_The paper diagram labels the model as TensorFlow Lite Micro and the dashboard as Grafana, but those labels do not match the final repository implementation: the model is exported with `m2cgen`, and the repository uses its own Go-served dashboard._

The paper reports a single-participant dataset and a random stratified sample split, rather than a held-out-person evaluation.
It also identifies cross-person testing, on-device latency measurement, and further model compression as future work.
Those constraints matter when interpreting the accuracy result: the project demonstrates an end-to-end Edge AI prototype, while broader real-world generalization remains to be established.
