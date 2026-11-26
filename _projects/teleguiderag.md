---
layout: page
title: TeleGuideRAG — Telecom Technology Guide
description: A RAG service that explains networking and telecom technologies with cited sources, side-by-side comparisons, and device connection checklists.
img: assets/img/projects/teleguiderag-compare.png
importance: 5
category: AI-Assisted Playground
keywords: [RAG, LangGraph, ChromaDB, Streamlit, Networking]
permalink: /projects/teleguiderag/
---

**Personal Project / Oct 2026**

## Overview

Questions about networking mix protocols, layers, and product names, so it is hard for users to know which technology to look up first. A general LLM answer also tends to blur the line between what a source says and what the model guesses.

TeleGuideRAG answers telecom and networking questions with the documents it actually used. It also compares two technologies, explores technologies by condition, prepares a Windows PC and IP camera connection checklist, and draws a simple network diagram.

The app never scans a real network or changes device settings.

{% include figure.liquid loading="eager" path="assets/img/projects/teleguiderag-compare.png" title="Technology comparison" alt="TeleGuideRAG comparing Wi-Fi 6 and Wi-Fi 7 with numbered citations" caption="Wi-Fi 6 vs. Wi-Fi 7. The relationship between the two is checked first, then each row is tied to a cited source." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## How It Works

- **Intent first:** the question is matched to technology items before retrieval, so a pinned item (e.g., IPv4) does not hijack an unrelated question (e.g., "What is TCP?")
- **Two collections:** item metadata and document chunks live in separate ChromaDB collections with stable IDs, then are merged and de-duplicated
- **Separate graph nodes:** LangGraph splits `retrieve` and `generate`; only the citation numbers that actually appear in the answer are linked as sources
- **Grounded data:** 125 technology items and 140 Wikipedia pages, each recorded with revision ID, check date, and CC BY-SA 4.0 license in a source manifest

{% include figure.liquid path="assets/img/projects/teleguiderag-citations.png" title="Cited sources" alt="TeleGuideRAG answer about TCP with three cited sources and Wikipedia revision numbers" caption="An answer about TCP. Each cited source shows its license and Wikipedia revision." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Problems I Solved

- **Pinned item vs. new question:** detected topic conflicts so a selected item is not mixed into an answer it does not support
- **Misleading comparisons:** checked whether one technology contains or succeeds the other before presenting any "better/worse" judgment
- **Guessing device settings:** when no source covers a specific camera model, the app does not invent ports or default accounts; it gives a read-only check order to run on the PC instead
- **Irrelevant documents:** added a title-relevance gate for extra Wikipedia candidates, which excluded 14 low-relevance documents in validation

{% include figure.liquid path="assets/img/projects/teleguiderag-device-guide.png" title="Device connection guide" alt="TeleGuideRAG step-by-step checklist for connecting a Windows PC and an IP camera" caption="A connection checklist for a Windows PC and an IP camera. Model-specific IPs, ports, and accounts are never guessed." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Validation

- Ran the app in Streamlit on Windows and checked it in Chrome with real model calls (TCP answer with citations, Wi-Fi 6/7 comparison)
- Checked CIDR calculation, the camera checklist, diagram/SVG export, error states, and citation mapping
- 10 unit tests passing; a fresh index of the public data produced 225 document chunks

Retrieval accuracy, latency, and real camera connection success rates were not measured, and the item and chunk counts are data size, not quality metrics.

## Tech Stack

Python 3.12, Streamlit, LangGraph, LangChain OpenAI client (any OpenAI-compatible API), ChromaDB, Sentence Transformers (`all-MiniLM-L6-v2`), MediaWiki API, Graphviz/SVG

## Links

- [GitHub Repository](https://github.com/ksh0330/TeleGuideRAG)
