/**
 * i18n completeness check — fails if any UI string key is missing or empty in
 * French or Arabic (English is the source of truth). Run with `npm run check:i18n`.
 * Keeps the trilingual site honest as new strings get added.
 */
import {ui} from '../src/i18n/ui.js'

const base = Object.keys(ui.en)
let problems = 0

for (const lang of ['fr', 'ar']) {
  const dict = ui[lang] || {}
  const missing = base.filter((k) => !dict[k] || String(dict[k]).trim() === '')
  const extra = Object.keys(dict).filter((k) => !(k in ui.en))
  if (missing.length) {
    problems += missing.length
    console.error(`\n[${lang}] missing/empty (${missing.length}):`)
    missing.forEach((k) => console.error('  - ' + k))
  }
  if (extra.length) {
    console.warn(`\n[${lang}] keys not in English (${extra.length}):`)
    extra.forEach((k) => console.warn('  - ' + k))
  }
}

if (problems > 0) {
  console.error(`\n✗ i18n check failed: ${problems} missing translation(s).`)
  process.exit(1)
} else {
  console.log(`✓ i18n complete: ${base.length} keys present in EN, FR, and AR.`)
}
