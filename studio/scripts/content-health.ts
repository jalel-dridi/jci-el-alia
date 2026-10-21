/**
 * Content health report in the terminal: the same checks as the dashboard's
 * "Content health" tab (quality/rules.ts).
 *
 *   npm run health
 */
import {getCliClient} from 'sanity/cli'
import {buildReport, HEALTH_QUERY} from '../quality/rules'

const client = getCliClient({apiVersion: '2024-01-01'})
const report = buildReport(await client.fetch(HEALTH_QUERY, {}, {perspective: 'published'}))

console.log(`Content health: ${report.clean} of ${report.total} items complete\n`)
for (const section of report.sections) {
  console.log(`${section.title}: ${section.items.length ? `${section.items.length} to fix` : 'all good'}`)
  for (const {label, issues} of section.items) {
    console.log(`  - ${label}`)
    for (const issue of issues) console.log(`      ${issue}`)
  }
}
