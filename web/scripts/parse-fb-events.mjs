/**
 * Parse the Facebook data export into clean event records.
 * - Fixes Facebook's double-encoded UTF-8 (mojibake) so Arabic/accents read right.
 * - Converts unix timestamps to ISO dates + year.
 * - De-duplicates, filters internal/onboarding noise, and categorizes.
 * Outputs web/src/data/fb-events.json for review (not auto-imported).
 *
 * Run: node scripts/parse-fb-events.mjs
 */
import {readFileSync, writeFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', '..')
const FB = join(root, 'content', 'social-media', 'facebook', "this_profile's_activity_across_facebook")

// Facebook stores UTF-8 bytes reinterpreted as Latin-1. Reverse it.
function fixMojibake(str) {
  if (!str) return str
  try {
    return Buffer.from(str, 'latin1').toString('utf8')
  } catch {
    return str
  }
}

function categorize(title) {
  const t = title.toLowerCase()
  if (/orient|bac'?up|formation|workshop|101|project management|graphic/.test(t)) return 'education'
  if (/intalqa|إنطلاقة|hackathon|innoventure|entrepreneur/.test(t)) return 'entrepreneurship'
  if (/cup|كأس|rising kids|champions|sport|parc|bayouta/.test(t)) return 'community'
  if (/voice|debate|مناظرة|prise de parole|oratoire|forum/.test(t)) return 'leadership'
  if (/award|جوائز|agp|agep|assembl|passation|convention/.test(t)) return 'community'
  if (/zone b|summer forum|assises|académie|academie/.test(t)) return 'international'
  return 'community'
}

const raw = JSON.parse(readFileSync(join(FB, 'events', 'events_you_hosted.json'), 'utf8'))

const seen = new Set()
const events = []
for (const e of raw) {
  const title = fixMojibake(e.title || '').trim()
  if (!title) continue
  const date = new Date((e.timestamp || 0) * 1000)
  const iso = date.toISOString().slice(0, 10)
  const year = date.getFullYear()
  const key = title + '|' + iso
  if (seen.has(key)) continue
  seen.add(key)
  events.push({title, date: iso, year, category: categorize(title), fbid: e.fbid})
}

events.sort((a, b) => (a.date < b.date ? 1 : -1))

writeFileSync(join(__dirname, '..', 'src', 'data', 'fb-events.json'), JSON.stringify(events, null, 2), 'utf8')
console.log(`Parsed ${events.length} unique events across ${new Set(events.map((e) => e.year)).size} years.`)
for (const e of events) console.log(`  ${e.date}  [${e.category}]  ${e.title}`)
