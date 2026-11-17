---
layout: page
title: YouTube Live Transcript STT
description: A Chrome extension that transcribes YouTube live audio in real time with a local Whisper server, even when no captions are available.
img: assets/img/projects/youtube-live-stt-overlay.jpg
importance: 6
keywords: [Chrome Extension, faster-whisper, WebSocket, Streaming STT]
permalink: /projects/youtube-live-stt/
---

**Personal Project / Aug 2026**

## Overview

Many YouTube live streams have no captions. This Chrome extension captures the audio of the current tab, sends it to a local `faster-whisper` server, and shows a running transcript in the Chrome side panel and on top of the video.

Audio never leaves the PC; transcription runs entirely on the local machine.

{% include figure.liquid loading="eager" path="assets/img/projects/youtube-live-stt-overlay.jpg" title="Video overlay" alt="Transcript overlay shown at the bottom of a video player" caption="The latest sentence shown on the video. Position, size, and opacity are adjustable. (Visual QA fixture)" max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Pipeline

```text
YouTube tab audio → chrome.tabCapture → offscreen document (16 kHz mono PCM16)
→ WebSocket (127.0.0.1) → faster-whisper → rolling stabilizer → side panel / overlay
```

- **Rolling window:** each 4 s of new audio is sent with the previous 2 s as context, so the transcript updates about every 4 s
- **Final vs. provisional:** the last ~2 s are shown as provisional and can be corrected by the next window; earlier text is committed
- **De-duplication:** overlapping text is merged only when the timestamps actually overlap, so real repeated speech is kept
- **Exports:** TXT, SRT, VTT, and JSON with timestamps mapped from Whisper segments to the video timeline

## Problems I Solved

- **Chrome capture permission:** a start button inside the side panel does not reliably grant `activeTab`, so capture starts from the toolbar popup in the same synchronous call as the user's click, with server checks and model warm-up done beforehand
- **Falling behind in real time:** receiving audio and running inference were split, and the audio queue is capped at 16 s with an oldest-drop policy, so a slow CPU never leaves the transcript minutes behind the stream
- **Missing CUDA libraries on Windows:** the model runs a short real inference at load time and falls back to CPU `int8` if CUDA libraries fail
- **UI slowing down over long sessions:** the panel renders only the latest 500 lines and saves state every 8 s instead of on every segment

{% include figure.liquid path="assets/img/projects/youtube-live-stt-sidepanel.jpg" title="Side panel" alt="Chrome side panel showing server status, live delay, search, and the transcript list" caption="The side panel with server status, live delay, search, and the full transcript. (Visual QA fixture with mock data)" max-width="420px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Results

On a 48-second Korean TTS lecture clip (`small` model, CPU `int8`), I compared four window settings and chose 4 s + 2 s overlap:

| New audio + overlap | Avg. inference | p95 | Duplicate rate | CER |
| --- | ---: | ---: | ---: | ---: |
| 5 + 1 s | 2.147 s | 2.641 s | 0% | 0.1749 |
| 3 + 1.5 s | 1.925 s | 2.061 s | 2.62% | 0.2915 |
| **4 + 2 s** | **1.976 s** | **2.190 s** | **0%** | **0.2466** |
| 5 + 2 s | 1.933 s | 2.094 s | 8.61% | 0.2780 |

5 + 1 s had the lowest CER on this short clip but updates about a second later; 4 + 2 s gave no duplicates with the lowest CER among the rolling options. In 30-minute to 3-hour overload simulations, the queue stayed at 16 s and the panel at 500 lines. Peak memory was about 440 MB including the model.

CER here is only for comparing settings on the same synthetic clip; it does not represent real broadcast audio.

## Tech Stack

Chrome Extension (Manifest V3, tabCapture, offscreen, side panel), JavaScript, Python, FastAPI, WebSocket, faster-whisper (CTranslate2)

## Links

- [GitHub Repository](https://github.com/ksh0330/youtube-live-transcript-stt)
