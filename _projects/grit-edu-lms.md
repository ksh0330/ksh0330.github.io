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

I built the service under a paid contract in June–July 2026 and have continued to operate and improve it since. As of November 2026, **202 students** and **21 instructors** are registered.

{% include figure.liquid loading="eager" path="assets/img/projects/LMSmain.png" title="GRIT Edu administrator dashboard" alt="Administrator dashboard showing user, instructor, online course, and offline class counts" caption="Administrator dashboard for checking the current service status." max-width="860px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## What I Did

- Built public pages for academy information, instructors, schedules, courses, and contact information
- Implemented online-course and offline-class management
- Added workflows for students, members and parents, instructors, and administrators
- Built an administrator CMS for users, courses, classes, popups, and public website content
- Used Firebase Authentication, Firestore, Cloud Functions, and Security Rules for login, data, and server-side tasks
- Deployed static pages through Cloudflare Pages and used Cloudflare R2 for replaceable public images

The layout and static assets are served by Cloudflare Pages. Firestore stores frequently updated service data, Cloud Functions handles selected server-side work, and R2 stores public images that administrators may replace.

{% include figure.liquid path="assets/img/projects/gritedu-schedule.png" title="GRIT Edu public timetable" alt="Public timetable page with tabs for middle school and each high-school grade and a list of school-specific classes" caption="Public timetable page on the live site (November 2026)." max-width="820px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

{% include figure.liquid path="assets/img/projects/LMSmenu.png" title="GRIT Edu administrator menu" alt="Administrator menu for students, instructors, courses, classes, site content, and cleanup" caption="Administrator menu for user, course, class, and site management." max-width="820px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

### Balancing Requests and Cost

The academy staff wanted a video library, member management, text messaging, and payment features, because delivering videos and checking student status were spread across several tools. The director considered building everything from scratch an over-investment and preferred to improve existing work first.

Instead of building every feature or rejecting the requests, I made a test page that walked through the administrator and user flows, and we decided together which tasks the site should handle. Staff can enter student information and deliver course videos with a click, and they edit the promotional pages and popups themselves. For the bulletin board and photo albums, I proposed linking the academy's existing blog and social media rather than building separate systems, and this was adopted.

### Use of Generative AI

I used ChatGPT, Cursor, and Codex during development for organizing requirements, implementation assistance, code review, debugging, refactoring ideas, and test planning. I reviewed the suggested changes against the actual requirements, tested them in the service, and decided what should be revised or deployed.

I also used the tools to prepare deployment checklists, but I made the final release decision after reviewing the changes and giving feedback based on actual service behavior.

## Operation & Improvements

After the site went into use, I noticed that Firestore reads and writes were increasing more than expected. Many values had initially been stored as dynamic data so that administrators could edit them easily, but public pages also had to read those values as traffic increased.

I reviewed the code and database usage and separated frequently changed operational data from content that rarely changes. I removed unnecessary reads, writes, and real-time listeners, simplified several administrator queries, and moved cleanup work toward backend tasks. Queries and cleanup operations were also given clear limits.

### Sign-up blocked on shared Wi-Fi

After a user inquiry, I found that students on the same Wi-Fi network were hitting the sign-up rate limit on their first attempt. Verification requests were counted mainly by public IP address, so different people behind one network looked like the same requester. Removing the limit would have made abuse possible, so I changed the rule to consider both the IP address and the email address, then confirmed that sign-up and verification worked on a shared network.

### Roles, access, and mobile use

- Reworked screens that were hard to use on mobile
- Checked parent–child account linking and per-student course access
- When a course did not appear, separated display bugs from publish/archive state and permission problems
- Hiding a menu does not block access, so I verified role-based read and write permissions in the Firestore Security Rules
- Wrote an operations guide so administrators can update information without code changes

{% include figure.liquid path="assets/img/projects/sitemanagements.png" title="GRIT Edu site management CMS" alt="CMS interface for editing academy information and other public website content" caption="CMS interface for managing public website content." max-width="820px" class="img-fluid rounded z-depth-1 d-block mx-auto" %}

## Results

- Live service with 202 students and 21 instructors registered (November 2026)
- Public academy website and role-based management pages are available in the live service
- Online courses, offline classes, users, and public content can be managed through the administrator screens
- Build checks and Firestore rules are used before deployment to catch missing assets and access problems

Feedback from operation was used to revise both administrator workflows and the way public pages accessed data.

## What I Learned

I learned that a live web service requires attention to database usage and operating cost as well as feature development. Making every value dynamic is not always the best choice. Generative AI can speed up coding and review, but checking the requirements and testing the final behavior still require human decisions.

## Links

- [Live Website](https://gritedu.kr)
