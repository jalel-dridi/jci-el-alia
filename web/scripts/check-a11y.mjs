/**
 * Accessibility check: serves dist/ locally, opens key pages in each language
 * in headless Chromium and runs axe (WCAG 2.1 A/AA). Fails on serious or
 * critical problems such as low text contrast, missing labels or alt text.
 *
 *   npm run build && npx playwright install chromium && npm run check:a11y
 */
import {createServer} from 'node:http'
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs'
import {extname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {chromium} from 'playwright'
import {AxeBuilder} from '@axe-core/playwright'

const DIST = fileURLToPath(new URL('../dist/', import.meta.url))
const TYPES = {'.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.webmanifest': 'application/manifest+json'}

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  let file = join(DIST, path)
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  const found = existsSync(file)
  if (!found) file = join(DIST, '404.html')
  res.writeHead(found ? 200 : 404, {'content-type': TYPES[extname(file)] || 'application/octet-stream'})
  res.end(readFileSync(file))
}).listen(0)
const origin = `http://localhost:${server.address().port}`

// One album per language is enough: they share a template.
const album = readdirSync(join(DIST, 'events')).find((f) => existsSync(join(DIST, 'events', f, 'index.html')))
const pages = ['/', '/fr/', '/ar/', '/events/', '/ar/events/', `/events/${album}/`, `/ar/events/${album}/`, '/missing-page/']

const browser = await chromium.launch()
// Reduced motion: entrance animations start hidden, which would hide text from the check.
const context = await browser.newContext({reducedMotion: 'reduce'})
let failures = 0
for (const path of pages) {
  const page = await context.newPage()
  await page.goto(origin + path, {waitUntil: 'load'})
  const {violations} = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  const serious = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
  console.log(`${serious.length ? '✗' : '✓'} ${path}`)
  for (const v of serious) {
    failures++
    console.log(`    ${v.id}: ${v.help}`)
    for (const n of v.nodes.slice(0, 4)) console.log(`      ${n.target.join(' ')}  ${(n.any[0]?.message || '').slice(0, 110)}`)
    if (v.nodes.length > 4) console.log(`      …and ${v.nodes.length - 4} more`)
  }
  await page.close()
}
await browser.close()
server.close()

if (failures) {
  console.error(`\n✗ ${failures} serious accessibility problems (details above).`)
  process.exit(1)
}
console.log(`\n✓ No serious accessibility problems on ${pages.length} pages.`)
