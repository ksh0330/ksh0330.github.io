---
layout: page
title: Real-Time EO/IR Drone Object Detection
description: Real-time drone object detection using EO/IR sensors with private 5G transmission.
img: assets/img/projects/eo-ir-day-eo.jpg
importance: 1
keywords: [YOLOv9, EO/IR, Computer Vision, Private 5G]
permalink: /projects/eo-ir-drone-object-detection/
---

**Research Internship / AI R&D** · ETRI DNA+Drone Platform Research Center

## Overview

I worked on this project during a research internship at the ETRI DNA+Drone Platform Research Center. The system collected Electro-Optical (EO) and Infra-Red (IR) images from a drone, sent them to a server through a private 5G network, and performed object detection with YOLOv9.

My work focused on preparing the two image formats for detection, reducing inference time, and testing the complete process from image capture to result visualization.

## Problem

The two sensors needed different processing.

- EO images were **3840 × 2160 (4K)**. Processing the full image was expensive, but a simple resize could make small objects harder to detect.
- IR images were **640 × 512**, which did not match the 640 × 640 model input.
- The service also had to consider image transfer and preprocessing time, not only model inference time.

The preprocessing step therefore needed to keep useful image detail without adding too much delay. Input handling was part of the real-time task, not only preparation before inference.

## What I Did

- I divided each EO image into **24 overlapping 640 × 640 patches** to keep more detail from the original 4K image.
- I added padding to the IR image instead of stretching it, preserving its original aspect ratio.
- I trained and tested YOLOv9 models for the EO and IR images.
- I used TensorRT to optimize inference. My CV records a **0.2-second reduction** in inference time.
- I compared EO and IR results in daytime and nighttime tests and helped validate the full detection flow over the private 5G network.

During testing, I checked the processing time and detection result together. I also treated EO and IR as separate inputs with different strengths instead of applying exactly the same preprocessing to both.

{% include figure.liquid path="assets/img/publication_preview/drone.png" title="EO/IR image preprocessing" alt="EO image slicing and IR image padding before YOLOv9 inference" caption="EO images were sliced, while IR images were padded to match the model input." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

<div class="row">
  <div class="col-md-6">
    {% include figure.liquid path="assets/img/projects/eo-ir-day-eo.jpg" title="Daytime EO detection" alt="Object detected in daytime EO imagery" caption="Daytime detection using the EO sensor." class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-md-6">
    {% include figure.liquid path="assets/img/projects/eo-ir-night-ir.jpg" title="Nighttime IR detection" alt="Drone detected in nighttime IR imagery" caption="Nighttime detection using the IR sensor." class="img-fluid rounded z-depth-1" %}
  </div>
</div>

## Results

- **0.6-second latency** from image capture to detection and visualization in the test environment
- **8% detection-accuracy improvement** from EO/IR fusion, as recorded in my CV
- Paper published at the **2024 Fall Conference of IEMEK**
- **Best Paper Presentation Award** at IEMEK 2024

The reported latency came from the internship test environment and covered the flow from image capture to visualization. It should not be read as a result from a commercial deployment.

## What I Learned

I learned that a real-time AI service depends on image preprocessing, transmission, inference, and visualization together. I also found that EO and IR images work better with processing methods that match their different resolutions and characteristics.

## Links

- [Publication search]({{ '/publications/' | relative_url }}#Real-Time%20Object%20Detection%20Service%20of%20Drone%20with%20Electro-Optics%20%2F%20Infra-Red%20Image%20Sensors)
- [Paper (PDF)]({{ '/assets/pdf/kim2024drone.pdf' | relative_url }})
