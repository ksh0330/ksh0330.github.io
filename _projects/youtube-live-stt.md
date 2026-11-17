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

{% include figure.liquid loading="eager" path="assets/img/projects/youtube-live-stt-overlay.jpg" title="Video overlay" alt="Transcript overlay shown at the bottom of a video player" caption="Roll-up captions on the video: the end of the previous sentence, then the sentence being spoken, in two short lines like YouTube CC. (Visual QA fixture)" max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Pipeline

```text
YouTube tab audio → chrome.tabCapture → offscreen document (16 kHz mono PCM16)
→ WebSocket (127.0.0.1) → faster-whisper → commit → sentence assembly → side panel / overlay
```

- **Two streaming modes, chosen by device:** on a GPU, *sentence mode* re-transcribes all audio since the last finished sentence every 2 s and commits only words that two consecutive passes agree on (LocalAgreement); on a CPU, *rolling mode* sends 4 s of new audio with the previous 2 s as context and commits text older than 2 s
- **Sentence-level subtitles:** committed text is grouped into sentences at punctuation, a 0.8 s pause, or 60 characters. The sentence being spoken stays on one line with its still-changing tail faded. The overlay rolls up two short (about 26-character) lines like YouTube CC, with line lengths balanced so no one-word orphan is left, and SRT/VTT files use the same rule
- **De-duplication:** text is merged only when it matches and its timestamps fall within about 1 s of the earlier recognition, so real repeated speech is kept
- **Exports:** TXT, SRT, VTT, and JSON with timestamps mapped from Whisper segments to the video timeline

## Problems I Solved

- **Chrome capture permission:** a start button inside the side panel does not reliably grant `activeTab`, so capture starts from the toolbar popup in the same synchronous call as the user's click, with server checks and model warm-up done beforehand
- **Falling behind in real time:** receiving audio and running inference were split, and the audio queue is capped at 16 s with an oldest-drop policy, so a slow CPU never leaves the transcript minutes behind the stream
- **Missing CUDA libraries on Windows:** the model runs a short real inference at load time and falls back to CPU `int8` if CUDA libraries fail
- **UI slowing down over long sessions:** the panel renders only the latest 500 lines and saves state every 8 s instead of on every segment
- **The same sentence printed twice (v0.3.1):** when the next window re-recognized the provisional tail, Whisper shifted its timestamps by a few hundred milliseconds or dropped the last word, so de-duplication missed it. I reproduced both cases in tests, matched re-recognitions with a 1 s tolerance and containment checks, and confirmed with a real-model streaming run that the duplicate disappeared while an intentionally repeated sentence was kept. Whisper repetition loops on music or silence are now collapsed as well.
- **Fragments at window boundaries (v0.4.0):** even without duplicates, fixed windows cut sentences into pieces such as "3." or "할 수 있습니다.", which read worse than YouTube captions. I measured that the GPU made a larger model affordable (0.29 s per window with large-v3-turbo vs. 1.85 s for small on the CPU), and used that headroom for the sentence mode above, so each sentence is recognized with its full context.

{% include figure.liquid path="assets/img/projects/youtube-live-stt-sidepanel.jpg" title="Side panel" alt="Chrome side panel showing server status, live delay, search, and the transcript list" caption="The side panel with server status, live delay, search, and the full transcript. (Visual QA fixture with mock data)" max-width="420px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Results

**Sentence mode (v0.4.0).** I streamed a 48-second Korean lecture clip with 8 reference sentences through the real server code in real-time order (RTX 5060 Ti, i7-11700):

| Setting | Committed sentences | Avg. inference | Time to commit after a sentence ends (avg / max) |
| --- | ---: | ---: | ---: |
| small · CPU · rolling | 10 | 2,044 ms | 3.2 s / 4.8 s |
| large-v3-turbo · GPU · rolling | 10 | 278 ms | 4.0 s / 5.9 s |
| **large-v3-turbo · GPU · sentence** | **8** | 293 ms | **3.0 s** / 6.1 s |

Rolling mode left boundary fragments; sentence mode returned the same 8 sentences as the reference, e.g. "C 언어의 인트와 롱 자료형, C89와 C99 표준도 비교하겠습니다."

**Window setting (v0.3.0).** On a 48-second Korean TTS lecture clip (`small` model, CPU `int8`), I compared four window settings and chose 4 s + 2 s overlap:

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
- [Latest Release](https://github.com/ksh0330/youtube-live-transcript-stt/releases/latest)
