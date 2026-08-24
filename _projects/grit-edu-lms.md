---
layout: page
title: GRIT Edu LMS/CMS
description: An academy website and management system for online courses, offline classes, users, and public content.
img: assets/img/projects/LMSmain.png
importance: 3
keywords: [JavaScript, Firebase, Firestore, Cloudflare]
permalink: /projects/grit-edu-lms/
---

**Client Web Project / LMS & CMS**

## Overview

An academy requested a website that could support more than public information pages. The service also needed online courses, offline-class management, student and member accounts, instructor features, and administrator tools.

I organized the requirements and built the public website and management features as one service. The site is currently in use, so I continued to review and improve it after the first release.

Because academy staff needed to update information without editing source code, content management was included alongside the course, class, and account features.

{% include figure.liquid loading="eager" path="assets/img/projects/LMSmain.png" title="GRIT Edu administrator dashboard" alt="Administrator dashboard showing user, instructor, online course, and offline class counts" caption="Administrator dashboard for checking the current service status." max-width="860px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## What I Did

- Built public pages for academy information, instructors, schedules, courses, and contact information
- Implemented online-course and offline-class management
- Added workflows for students, members and parents, instructors, and administrators
- Built an administrator CMS for users, courses, classes, popups, and public website content
- Used Firebase Authentication, Firestore, Cloud Functions, and Security Rules for login, data, and server-side tasks
- Deployed static pages through Cloudflare Pages and used Cloudflare R2 for replaceable public images

The layout and static assets are served by Cloudflare Pages. Firestore stores frequently updated service data, Cloud Functions handles selected server-side work, and R2 stores public images that administrators may replace.

{% include figure.liquid path="assets/img/projects/LMSmenu.png" title="GRIT Edu administrator menu" alt="Administrator menu for students, instructors, courses, classes, site content, and cleanup" caption="Administrator menu for user, course, class, and site management." max-width="820px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

### Use of Generative AI

I used ChatGPT, Cursor, and Codex during development for organizing requirements, implementation assistance, code review, debugging, refactoring ideas, and test planning. I reviewed the suggested changes against the actual requirements, tested them in the service, and decided what should be revised or deployed.

I also used the tools to prepare deployment checklists, but I made the final release decision after reviewing the changes and giving feedback based on actual service behavior.

## Operation & Improvements

After the site went into use, I noticed that Firestore reads and writes were increasing more than expected. Many values had initially been stored as dynamic data so that administrators could edit them easily, but public pages also had to read those values as traffic increased.

I reviewed the code and database usage and separated frequently changed operational data from content that rarely changes. I removed unnecessary reads, writes, and real-time listeners, simplified several administrator queries, and moved cleanup work toward backend tasks. Queries and cleanup operations were also given clear limits.

{% include figure.liquid path="assets/img/projects/sitemanagements.png" title="GRIT Edu site management CMS" alt="CMS interface for editing academy information and other public website content" caption="CMS interface for managing public website content." max-width="820px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Results

- Public academy website and role-based management pages are available in the live service
- Online courses, offline classes, users, and public content can be managed through the administrator screens
- Build checks and Firestore rules are used before deployment to catch missing assets and access problems

Feedback from operation was used to revise both administrator workflows and the way public pages accessed data.

## What I Learned

I learned that a live web service requires attention to database usage and operating cost as well as feature development. Making every value dynamic is not always the best choice. Generative AI can speed up coding and review, but checking the requirements and testing the final behavior still require human decisions.

## Links

- [Live Website](https://gritedu.kr)
