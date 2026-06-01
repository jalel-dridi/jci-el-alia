# Project Status & Handover

_Last updated: pre-deployment. The site is fully built and verified locally;
the only remaining work is account-linked deployment._

## What this is

A trilingual (EN/FR/AR) website for JCI El Alia with a no-code admin dashboard.
Board members edit everything (events, photo albums, projects, presidents,
board, partners, settings) through a friendly UI and click Publish — the site
updates automatically.

## Current state

| Area | Status |
|------|--------|
| Astro frontend (`web/`) | ✅ Built, all sections, 3 pages, trilingual + RTL |
| Sanity dashboard (`studio/`) | ✅ Schema complete, builds clean |
| Real chapter content (seed) | ✅ 9 presidents, 6 projects, 4 pillars, 8 partners, 2025 board, 4 milestones |
| Accessibility | ✅ Skip link, ARIA labels, reduced-motion support |
| SEO | ✅ Meta, Open Graph, Twitter, JSON-LD, sitemap, robots.txt |
| Performance | ✅ Sized/lazy images, hero priority, cache headers, optimized icons |
| CI | ✅ GitHub Actions builds web + studio, i18n check |
| Deployment | ⏳ Pending login (see below) |

## Sections on the homepage

Navbar → Hero (animated counters) → About → Legacy timeline (9 presidents) →
Pillars → Impact (projects) → Achievements (milestones) → Testimonial (Arvo
quote) → Our Work (events + albums) → Team (board) → Join (form) → Partners →
Footer. Plus `/events` archive, `/events/[slug]` album pages, and a 404.

## Remaining steps (need accounts — not yet done)

1. `sanity login` (GitHub account `JalelDridi`)
2. `sanity init` → creates project, gives a **project ID**
3. Put the ID in `web/.env` and `studio/.env` (copy from `.env.example`)
4. Run `studio/scripts/seed.mjs` with a write token to load real data
5. `sanity deploy` → dashboard at `jcielalia.sanity.studio`
6. Push to GitHub → connect Cloudflare Pages (root `web`, build `npm run build`,
   output `dist`) → add the two `PUBLIC_SANITY_*` env vars
7. Add CORS origins in Sanity + a deploy-hook webhook for auto-rebuilds

Full details in `README.md`. Dashboard editing guide in `studio/README.md`.

## Key decisions (why things are the way they are)

- **Astro + Sanity, both free.** Chosen for non-technical editors, heavy photo
  albums, and annual board turnover (handover = invite the new board).
- **Static build + webhook**, not SSR — keeps hosting free and fast.
- **Seed fallback** (`web/src/data/seed.js`) — the site renders complete content
  even if the CMS is empty/offline; also the source for the seed script.
- **Tailwind v4 via PostCSS**, not the Vite plugin (Astro 6 Rolldown issue).
- **Formspree** for the Join form so applicant data stays out of public content.

## Things to revisit later

- Replace `YOUR_ID` in `web/src/components/Join.astro` with the real Formspree ID.
- Add a real hero background photo + project/event photos via the dashboard.
- Point `site` in `web/astro.config.mjs` to the final domain before launch.
- Consider a custom domain in Cloudflare Pages.
