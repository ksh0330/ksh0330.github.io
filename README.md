# ksh0330.github.io

Personal portfolio site of **Seunghyun Kim** — computer vision, real-time AI systems, and applied AI software.

**Live:** https://ksh0330.github.io

## Contents

| Section | What's there |
| --- | --- |
| [About](https://ksh0330.github.io/) | Background, selected projects, news |
| [Projects](https://ksh0330.github.io/projects/) | EO/IR drone object detection (ETRI), VITAS, GRIT Edu LMS/CMS |
| [Publications](https://ksh0330.github.io/publications/) | Journal and conference papers (`_bibliography/papers.bib`) |
| [CV](https://ksh0330.github.io/cv/) | Education, experience, awards, PDF download |
| Blog | Redirects to [velog.io/@ksh0330](https://velog.io/@ksh0330/posts) |

## Where to edit

- `_pages/about.md` — home page text and profile
- `_projects/*.md` — project pages (images in `assets/img/projects/`)
- `_news/*.md` — short announcements shown on the home page
- `_bibliography/papers.bib` — publications
- `_pages/cv.md` — CV page (PDF in `assets/pdf/Seunghyun_Kim_CV.pdf`)
- `_config.yml` — site-wide settings

## Run locally

With Docker:

```bash
docker compose pull
docker compose up
# http://localhost:8080
```

Or with Ruby/Bundler:

```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000
```

## Deployment

Pushing to `main` triggers the `deploy` GitHub Actions workflow, which builds the site and publishes it to the `gh-pages` branch.

## Credits

Built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme (MIT License).
Theme documentation: [INSTALL.md](INSTALL.md), [CUSTOMIZE.md](CUSTOMIZE.md), [FAQ.md](FAQ.md).
