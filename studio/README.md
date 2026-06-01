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
5. Click **Publish**. The website updates automatically within ~1 minute.

## Tips

- **Images:** upload the original full-size photo. The site automatically
  resizes, compresses, and serves the right version — you don't need to edit
  photos first.
- **Mistakes:** Sanity keeps document history, so changes can be rolled back.
- **New president each year:** add a Legacy Timeline entry and update the
  current flag; update Site Settings theme/slogan and the Board Members list.

## For developers

```powershell
npm install
npm run dev      # local studio at http://localhost:3333
npm run deploy   # publish to https://jcielalia.sanity.studio
```

Schema lives in `schemaTypes/`. Reusable trilingual field types are
`objects/localeString` and `objects/localeText`. Seed data lives in
`scripts/seed.mjs`.
