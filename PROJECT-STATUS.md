# Project Status & Handover

_Last updated: October 2026. The site and dashboard are live._

## What this is

A trilingual (EN/FR/AR) website for JCI El Alia with a no-code admin dashboard.
Board members edit everything (events, photo albums, projects, presidents,
board, partners, settings) through a friendly UI and click Publish — the site
updates automatically.

## Live

| What | Where |
|------|-------|
| Website | https://jci-el-alia.pages.dev (Cloudflare Pages) |
| Dashboard | https://jcielalia.sanity.studio |
| Sanity project | `3fwebql8`, dataset `production` |
| Deploys | GitHub Actions `Deploy`: on push, on publish (webhook), nightly |

## Current state

| Area | Status |
|------|--------|
| Frontend (`web/`) | ✅ Live — homepage, `/events`, album pages, 404 |
| Dashboard (`studio/`) | ✅ Live, real content (10 events, 9 presidents, 14 board members) |
| Languages | ✅ Separate pages per language: `/` (EN), `/fr/`, `/ar/` (RTL), with hreflang + sitemap; switcher remembers the choice |
| Upcoming events | ✅ "Coming Up" section + `.ics` / Google Calendar links |
| SEO | ✅ Meta, Open Graph (event covers on album pages), JSON-LD Organization + Event, sitemap |
| Performance | ✅ Inline SVG icons (no icon font), sized/lazy images, cache headers |
| Motion & UI | ✅ GSAP (hero intro, scroll reveals, timeline draw), see-through navbar with brand white logo, native page transitions; all off for reduced-motion users |
| CI | ✅ Builds web + studio, i18n completeness check |

## Open items

- **Custom domain** — then update `site` in `web/astro.config.mjs`, add the
  domain in Cloudflare Pages → Custom domains, and add it to Sanity CORS origins.
- **Formspree ID** — set `FORMSPREE_ID` in `web/src/components/Join.astro`
  (until then the form falls back to email).
- **Sanity webhook** — verify it fires (sanity.io/manage → API → Webhooks →
  attempts log); the nightly rebuild covers it meanwhile.
- **Photos** — board members (0/14) and presidents (1/9) have no photos yet;
  plain (logo-free) event covers would look cleaner.

## Key decisions (why things are the way they are)

- **Astro + Sanity, both free.** Chosen for non-technical editors, heavy photo
  albums, and annual board turnover (handover = invite the new board).
- **Static build + webhook + nightly rebuild**, not SSR — keeps hosting free
  and fast; "upcoming vs past" is decided at build time.
- **Seed fallback** (`web/src/data/seed.js`) — the site renders complete content
  even if the CMS is empty/offline; also the source for the seed script.
- **Tailwind v4 via PostCSS**, not the Vite plugin (Astro 6 Rolldown issue).
- **Formspree** for the Join form so applicant data stays out of public content.
