# Deployment & Auto-Update Pipeline

The site is live and updates can be fully automated. Here's how it all fits.

## Live URLs

- **Website:** https://jci-el-alia.pages.dev
- **Admin dashboard:** https://jcielalia.sanity.studio
- **Code:** https://github.com/jalel-dridi/jci-el-alia
- **Sanity project ID:** `3fwebql8` · dataset `production`

## How updates flow

```
Edit in dashboard ──(Publish)──► Sanity webhook ──► GitHub repository_dispatch
                                                          │
Push code to GitHub ──────────────────────────────────► GitHub Actions "Deploy"
                                                          │
                                          builds with live Sanity data
                                                          │
                                                  Cloudflare Pages (live site)
```

Two triggers rebuild + redeploy the site automatically:
1. **Pushing code** to `main`.
2. **Publishing content** in the dashboard (via the Sanity webhook below).
You can also click **Run workflow** on the Deploy action in GitHub anytime.

## One-time setup of the automation

### 1. Cloudflare API token  (required for auto-deploy)
- Create at https://dash.cloudflare.com/profile/api-tokens → **Create Token**
  → use the **"Cloudflare Pages"** template (Account → Cloudflare Pages → Edit).
- Save it as a GitHub secret:
  ```
  gh secret set CLOUDFLARE_API_TOKEN --repo jalel-dridi/jci-el-alia --body "YOUR_TOKEN"
  ```
- Already-set secrets: `PUBLIC_SANITY_PROJECT_ID`, `CLOUDFLARE_ACCOUNT_ID`.

### 2. Sanity webhook  (publish → auto-rebuild)
- Create a GitHub fine-grained PAT (repo `jci-el-alia`, **Contents: read & write**
  or **Actions: read & write**) at https://github.com/settings/tokens
- In https://www.sanity.io/manage → project **JCI El Alia** → **API → Webhooks → Create**:
  - **URL:** `https://api.github.com/repos/jalel-dridi/jci-el-alia/dispatches`
  - **Dataset:** production · **Trigger on:** Create, Update, Delete
  - **HTTP method:** POST
  - **HTTP headers:**
    - `Authorization: Bearer YOUR_GITHUB_PAT`
    - `Accept: application/vnd.github+json`
  - **Body (projection):** `{ "event_type": "sanity-publish" }`
- Now hitting **Publish** rebuilds the live site in ~1–2 minutes.

## Manual deploy (always works, no tokens needed)

From `web/`:
```
npm run deploy
```
This builds with live Sanity data and uploads to Cloudflare Pages in one step.
(Requires a one-time `npx wrangler login`.)

## Data: single source of truth

All seed/fallback content lives in `web/src/data/seed.js` (and `events.js`).
`studio/scripts/seed.mjs` imports from there, so the CMS and the site's offline
fallback can never drift apart. After launch, day-to-day edits happen in the
dashboard; the seed files are just the initial/fallback data.
