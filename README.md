# JCI El Alia — Website + Admin Dashboard

A trilingual (EN/FR/AR, RTL-aware) website for JCI El Alia with a no-code admin
dashboard. Board members add events, photo albums, projects, presidents, and
partners through a friendly UI — no coding required.

## Architecture

```
JCI El Alia Site/
├─ web/        Astro frontend (public site)  → Cloudflare Pages
├─ studio/     Sanity Studio (admin dashboard) → sanity.studio hosting
├─ content/    Research/raw source material (not deployed)
└─ index.html  Original single-file prototype (kept for reference)
```

- **Frontend:** Astro 6 + Tailwind CSS v4 (via PostCSS). Fully static — content
  is fetched from Sanity at build time. Free, fast, no server.
- **CMS / Dashboard:** Sanity (free plan: 20 editors, 100 GB assets + bandwidth).
- **Content model:** every text field is trilingual `{ en, fr, ar }`.
- **Publishing:** a Sanity webhook triggers a Cloudflare rebuild on publish, so
  edits go live in ~1 minute.

If the CMS is empty or unreachable, the site falls back to real seed data in
`web/src/data/seed.js`, so it always renders a complete page.

## Local development

```powershell
# Frontend
cd web
npm install
npm run dev        # http://localhost:4321

# Admin dashboard
cd studio
npm install
npm run dev        # http://localhost:3333
```

## One-time setup (account-linked steps)

1. **Sanity project**
   ```powershell
   cd studio
   npx sanity login
   npx sanity init --project-name "JCI El Alia" --dataset production
   ```
   Copy the printed **project ID**.

2. **Wire the project ID**
   - `studio/.env`  → `SANITY_STUDIO_PROJECT_ID=<id>`
   - `web/.env`     → `PUBLIC_SANITY_PROJECT_ID=<id>` and `PUBLIC_SANITY_DATASET=production`
   (Copy each `.env.example` to `.env`.)

3. **Seed the real data**
   Create an Editor token at https://sanity.io/manage → API → Tokens, then:
   ```powershell
   cd studio
   $env:SANITY_STUDIO_PROJECT_ID="<id>"; $env:SANITY_WRITE_TOKEN="<token>"; node scripts/seed.mjs
   ```

4. **Deploy the dashboard**
   ```powershell
   cd studio
   npx sanity deploy        # → https://jcielalia.sanity.studio
   ```

5. **Deploy the site (Cloudflare Pages)**
   - Push this repo to GitHub (account: `JalelDridi`).
   - In Cloudflare Pages: create a project from the repo.
   - Build settings: **root directory** `web`, **build command** `npm run build`,
     **output** `dist`.
   - Add env vars `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET`.
   - (Optional) add a Sanity webhook to the Cloudflare deploy hook URL so the
     site rebuilds automatically on publish.

6. **Allow the site to read Sanity (CORS)**
   At https://sanity.io/manage → API → CORS origins, add your site origins
   (no credentials needed for public read):
   - `http://localhost:4321`
   - `https://jcielalia.pages.dev` (and your custom domain later)

7. **Auto-rebuild on publish (webhook)**
   - In Cloudflare Pages → Settings → Builds & deployments, create a
     **Deploy hook** and copy its URL.
   - In https://sanity.io/manage → API → Webhooks, add a webhook pointing at
     that URL (trigger on create/update/delete). Now hitting **Publish** in the
     dashboard rebuilds the live site in ~1 minute.

## Editing content

Open the dashboard (`https://jcielalia.sanity.studio`), sign in, and edit:

- **Site Settings** — yearly theme/slogan, hero text + background, stats, contact
- **Events / News** — title, date, year, category, descriptions, cover + photo album
- **Projects** — impact cards
- **Legacy Timeline** — presidents (year, name, slogan, photo)
- **Board Members**, **Partners**, **Pillars**

Hit **Publish** and the site updates automatically.

## Membership form

The Join form posts to Formspree. Replace `YOUR_ID` in
`web/src/components/Join.astro` with your Formspree form ID.
