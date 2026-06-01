/**
 * Seed the Sanity dataset with the real chapter data.
 *
 * SINGLE SOURCE OF TRUTH: this imports the data arrays directly from
 * web/src/data/seed.js so the CMS and the site's local fallback can never
 * drift apart. Edit the data there (or in the dashboard after launch).
 *
 * Usage (from the studio/ folder):
 *   $env:SANITY_STUDIO_PROJECT_ID="id"; $env:SANITY_WRITE_TOKEN="token"; node scripts/seed.mjs
 *
 * Create a write token at: https://sanity.io/manage -> API -> Tokens (Editor).
 * Idempotent: uses fixed _id values so re-running updates rather than dupes.
 */
import {createClient} from '@sanity/client'
import {
  siteSettings as settings,
  presidents,
  pillars,
  partners,
  projects,
  board,
} from '../../web/src/data/seed.js'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const token = process.env.SANITY_WRITE_TOKEN
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId || !token) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_WRITE_TOKEN env vars.')
  process.exit(1)
}

const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})

const siteSettings = {_id: 'siteSettings', _type: 'siteSettings', ...settings}

async function run() {
  const tx = client.transaction()
  tx.createOrReplace(siteSettings)
  presidents.forEach((p) => tx.createOrReplace({_id: `president-${p.year}`, _type: 'president', ...p}))
  pillars.forEach((p, i) => tx.createOrReplace({_id: `pillar-${i}`, _type: 'pillar', ...p}))
  partners.forEach((p, i) => tx.createOrReplace({_id: `partner-${i}`, _type: 'partner', ...p}))
  projects.forEach((p, i) => tx.createOrReplace({_id: `project-${i}`, _type: 'project', ...p}))
  board.forEach((m, i) => tx.createOrReplace({_id: `board-${m.year}-${i}`, _type: 'boardMember', ...m}))
  await tx.commit()
  console.log('✓ Seeded: 1 settings, %d presidents, %d pillars, %d partners, %d projects, %d board',
    presidents.length, pillars.length, partners.length, projects.length, board.length)
}

run().catch((err) => { console.error(err); process.exit(1) })
