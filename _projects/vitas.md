---
layout: page
title: VITAS — Vision AI Traffic Accident Prevention
description: A vision-based intersection system for vehicle detection, speed estimation, and accident-risk classification.
img: assets/img/projects/vitas-monitoring-ui.png
importance: 2
keywords: [YOLOv8, BEV, Speed Estimation, MLP]
permalink: /projects/vitas/
---

**Undergraduate Research / Academic Project**

## Overview

VITAS is a Vision AI project that uses intersection CCTV video to detect vehicles, estimate their speed, and classify accident-risk situations. It began as undergraduate research and was later extended into capstone and competition prototypes.

The final system connected vehicle detection and tracking, lane-specific coordinate transformation, speed estimation, and three risk classes: **safe**, **caution**, and **danger**.

{% include figure.liquid loading="eager" path="assets/img/projects/vitas-system-architecture.png" title="VITAS system overview" alt="VITAS system connecting CCTV analysis, risk classification, monitoring, and alerts" caption="VITAS connects CCTV analysis with monitoring and a prototype alert system." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Problem

The first speed-estimation version used pixel movement inside a fixed region and required manual distance calibration. Because objects appear at different sizes depending on their position in the camera view, the same pixel movement does not always represent the same real-world distance.

The project also needed a risk model that used information directly related to an accident. Instead of classifying the complete video alone, the research used each vehicle's estimated position and speed.

Separate coordinate transformations were used because the lanes appeared with different directions and perspectives in the CCTV view.

## What I Did

- I implemented vehicle detection and tracking with YOLOv8.
- I applied separate Bird's-Eye View coordinate transformations to the lanes because each lane had a different perspective in the CCTV image.
- I calculated vehicle positions and speeds from the transformed tracking coordinates.
- I developed and evaluated an MLP classifier for safe, caution, and danger situations.
- I integrated the research code into a PyQt monitoring interface. The team later connected the risk result to a TCP and Arduino alert prototype.

I tested the stages together so that changes in tracking or coordinate conversion could be checked against the final speed and risk results.

{% include figure.liquid path="assets/img/projects/vitas-lane-bev.png" title="Lane-specific coordinate transformation" alt="Separate BEV transformations and speed estimation for two intersection lanes" caption="Each lane uses its own coordinate transformation before speed estimation." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Prototype

The PyQt interface displayed tracked vehicles, estimated speed, and risk information in one screen. The competition prototype also sent the risk state to an Arduino that controlled LEDs and a buzzer.

This work was tested in a simulated intersection and road-test environment. It was not a deployed traffic-control system.

{% include figure.liquid path="assets/img/projects/vitas-monitoring-ui.png" title="VITAS monitoring prototype" alt="PyQt interface showing tracked vehicles and risk information in the test environment" caption="PyQt monitoring interface used in the test environment." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Results

- **89% accident-risk classification accuracy** with the YOLOv8 and MLP method
- **5 ms inference time** for the MLP classifier
- First-author journal publication
- **Hanium ICT Contest Finalist**, **Capstone Design Grand Prize**, and **AIoT Service Design Grand Prize** as team results

The paper also compared the method with GRU and InceptionV3 baselines. The selected MLP approach provided the best balance of accuracy and inference time in the experiment.

## What I Learned

I learned that camera perspective and coordinate calibration can affect speed estimation as much as the detection model itself. Connecting detection, speed estimation, and classification also showed me how errors from one step can affect the following steps.

## Links

- [GitHub — Project VITAS](https://github.com/ksh0330/Project-VITAS)
- [Publication search]({{ '/publications/' | relative_url }}#Classification%20of%20Accident%20Risk%20Situations%20based%20on%20Vehicle%20Speed%20Estimation%20through%20Lane-Specific%20Coordinate%20Transformation)
- [Paper (PDF)]({{ '/assets/pdf/kim2025risk.pdf' | relative_url }})
- [Demo Video — Hanium DreamUp](https://www.youtube.com/watch?v=Ftj3xZvBPxM)
- Supporting repositories: [Speed Estimation](https://github.com/ksh0330/Speed-Estimation-YOLOv8) · [Research Experiments](https://github.com/ksh0330/24SummerResearch) · [Hanium Prototype](https://github.com/ksh0330/2024_Hanium_ICT_Contest)
