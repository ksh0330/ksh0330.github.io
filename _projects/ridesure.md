---
layout: page
title: RideSure — Bus Boarding Likelihood
description: A transit prototype that judges boarding likelihood from historical bus load data and compares alternative routes.
img: assets/img/projects/ridesure-alternative.jpg
importance: 4
keywords: [Neo4j, Knowledge Graph, FastAPI, Public Data]
permalink: /projects/ridesure/
---

**Team Project (Team Lead) / Public Data Challenge → Portfolio Rebuild**

## Overview

Bus apps show when the next bus arrives, but not whether you can actually get on it. RideSure started from that gap: _"Can I take this bus, how crowded will it be, and is there a better option?"_

It began at the **2025 DSC Shared University × KT Open Data Startup Challenge** (Sept–Nov 2025) as an MVP for the B1 BRT line. After the contest, I rebuilt the data model, route validation, and decision logic as a reproducible portfolio project.

RideSure uses a historical in-vehicle load snapshot (2025-11-08). It is **not** a real-time service, and boarding likelihood is a categorical judgment based on relative congestion, not a boarding probability.

{% include figure.liquid loading="eager" path="assets/img/projects/ridesure-alternative.jpg" title="Alternative route recommendation" alt="RideSure comparing a low-likelihood current route with a better alternative route" caption="The current route's boarding likelihood is low, so a route with more room is recommended." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## My Role

As team lead during the contest, I handled problem definition and service planning, public-data relationship design, the knowledge-graph structure, role division, the direction for using a local SLM, discussions with industry mentors, result validation, and the final presentation. To check the guidance against reality, I rode the target buses at specific times and compared what the service said with actual conditions on board.

The team received the **Special Award** at the challenge (November 2025).

## What It Does

- **Boarding likelihood:** converts relative congestion (spare / normal / crowded / very crowded) into a user-facing judgment (high / medium / low / very low), and reports "unknown" when data is insufficient
- **Route comparison:** compares direct routes and verified one-transfer routes, and recommends an alternative only when it is at least one level better
- **Travel time and map:** uses Kakao transit geometry and time only when the bus line, boarding and alighting stops, and coordinates all match; transfer waiting time is never invented
- **Optional explanation:** a local EXAONE model can explain the result in natural language, but it never computes routes or congestion

## Rebuilding the Knowledge Graph

The three historical CSV files contain 11,375 rows with 24 hourly load values each, which become **273,000** hourly observations.

The first version identified observations by stop name and time. Analysis showed **83,688** colliding keys, so direction, stop order, and repeated visits to the same stop could not be preserved.

I separated a physical `Stop` from a `StopOccurrence` (a specific visit within a route pattern) and linked observations to occurrences with provenance from the source file hash, row, and hour.

| Entity | Count |
| --- | ---: |
| Line | 148 |
| RoutePattern | 154 |
| Stop | 2,049 |
| StopOccurrence | 11,375 |
| LoadObservation | 273,000 |

## Verifying Official Stops

Historical stop names were not merged with current official (TAGO) stops by name alone. A link was stored only when the route ID, direction, full stop order, and neighboring stops agreed. For B1, **43 of 53** occurrences were verified (41 automatically, 2 after manual review); the remaining 10 were left unmapped rather than forced.

One-transfer routes are allowed only when two route patterns share the same verified official stop, so the service never connects routes based on name similarity or distance alone.

{% include figure.liquid path="assets/img/projects/ridesure-transfer.jpg" title="Verified one-transfer route" alt="RideSure showing a one-transfer route between two bus lines at a verified shared stop" caption="A verified one-transfer route. Only bus travel time is summed when the full itinerary cannot be verified." max-width="760px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Validation

- Clean-room rebuild from a fresh clone, new virtual environment, and empty Neo4j volume
- Graph integrity checks (orphans, provenance, sequence, coordinates) all at zero errors
- 121 automated tests plus frontend contract and JavaScript checks

## What I Learned

The hardest problems were in the data, not the model. Choosing the right identity for each observation decided whether routes, transfers, and congestion could be trusted. I also learned to show "unknown" instead of filling gaps with numbers that the data cannot support.

## Links

- [GitHub Repository](https://github.com/ksh0330/RideSure)
