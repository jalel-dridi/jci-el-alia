# JCI El Alia — Admin Dashboard (Sanity Studio)

This is the content dashboard where board members add and edit everything on
the website: events with photo albums, projects, the legacy timeline, board
members, partners, and the homepage settings. No coding required.

## Day-to-day editing

1. Open the dashboard: **https://jcielalia.sanity.studio**
2. Sign in (Google / GitHub / email).
3. Edit content in the sidebar:
   - **Site Settings** — yearly theme/slogan, hero text + background image,
     the stat counters, and contact details.
   - **Events / News** — the main one. Add a title, date, year, category,
     a short summary + full description, a cover image, and a **photo album**.
   - **Projects** — the "Our Impact" cards.
   - **Legacy Timeline** — one entry per president (year, name, slogan, photo).
   - **Board Members** — the "Our Team" section, grouped by year.
   - **Partners** — logos for the partners strip.
   - **Pillars** — the four areas of opportunity.
4. Every text field has **English / Français / العربية** — fill what you can;
   English is the fallback if a translation is missing.
5. Click **Publish**. The website updates automatically within ~1 minute
   (and in any case overnight).

## Quality checks

- **Yellow warnings** appear next to fields that are missing or could be
  better: a missing French/Arabic translation, no description, a summary over
  160 characters, a photo that's too small, album photos without a
  description (alt text), fewer than 6 album photos, no headshot or logo.
  They are suggestions only; you can always publish.
- **Photo permissions checked** (on each event): tick it once everyone
  pictured agreed to appear online, with written parental consent for anyone
  under 18.
- **Content health** (tab at the top of the dashboard) lists everything
  published that still needs work, most important sections first, with an
  **Open** button for each item. Fix, publish, then press **Refresh**.
  Developers can print the same report with `npm run health`.
- **Before publishing an event**, check: title and summary in EN/FR/AR, a 2–3
  paragraph description (what happened, who took part, one number), date,
  location, category, a landscape cover photo with no text on it, the best
  6–12 photos each with a short description, and photo permissions.

## Tips

- **Images:** upload the original full-size photo. The site automatically
  resizes, compresses, and serves the right version — you don't need to edit
  photos first.
- **Upcoming events:** give an event a future date and it appears in the
  "Coming Up" section under the homepage hero, with "Add to calendar" buttons.
  After the date passes it moves to "Our Work" automatically — add the photo
  album then.
- **Project photos:** if a project has no photo, the site borrows the cover of
  its latest event with a matching name (e.g. "Orient'Up" → "Orient'Up 4.0").
  Upload a photo on the project to override it.
- **Icons:** the "icon" fields take Font Awesome names such as `fa-compass`
  (browse https://fontawesome.com/search?ic=free).
- **Mistakes:** Sanity keeps document history, so changes can be rolled back.
- **New president each year:** add a Legacy Timeline entry and update the
  current flag; update Site Settings theme/slogan and the Board Members list.

## For developers

```powershell
npm install
npm run dev      # local studio at http://localhost:3333
npm run deploy   # publish to https://jcielalia.sanity.studio
npm run health   # content health report in the terminal
```

Copy `.env.example` to `.env` and set `SANITY_STUDIO_PROJECT_ID=3fwebql8`
first. Quality thresholds and wording live in `quality/rules.ts`, shared by
the field warnings and the Content health tab.

Schema lives in `schemaTypes/`. Reusable trilingual field types are
`objects/localeString` and `objects/localeText`. Seed data lives in
`scripts/seed.mjs`.
