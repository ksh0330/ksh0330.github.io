---
layout: page
title: JeJuOneEyes - Jeju Data Analysis Agent
description: A natural-language data exploration agent for Jeju public data, built as a one-day team contest MVP.
img: assets/img/projects/jejuoneyes-result.png
importance: 7
category: AI-Assisted Playground
keywords: [Streamlit, Python, Open Data, Natural-Language Interface]
permalink: /projects/jejuoneyes/
---

**Team Contest Submission / Rapid MVP**

## Overview

JeJuOneEyes (제주한눈) is a natural-language data exploration and analysis agent for visitors of the Jeju Big Data Center. A merchant, resident, or public-sector worker types a business question or picks a guided option, and the app finds the registered data, aggregates it locally, and shows the result together with how it was calculated.

It was built in about a day as a fast MVP, with AI-assisted coding, so I treat it as a prototype rather than a production system.

{% include figure.liquid loading="eager" path="assets/img/projects/jejuoneyes-result.png" title="Analysis result" alt="JeJuOneEyes showing a market comparison result with its calculation basis" caption="A one-sentence answer, followed by figures and the calculation basis." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## What It Does

- **Market comparison and re-analysis:** compares card spending between neighborhoods and industries for 2019, and recalculates after follow-ups such as excluding certain months
- **Year-over-year arrivals:** compares Jeju visitor arrivals with the same month of the previous year
- **Join review:** explains the differences in region units and observation periods before two datasets are combined
- **Transparent results:** each answer shows the source, the months actually observed, and the calculation method, and can be viewed as text or as figures and charts

## Technical Notes

- Streamlit app with a rule-based planner and a local analysis engine
- No language model calls and no API keys; nothing is sent out while the app runs
- Public source files are downloaded by the user and kept out of the repository

## Links

The source is on [GitHub](https://github.com/ksh0330/JeJuOneEyes). It is a team contest submission, so the repository is kept as submitted.