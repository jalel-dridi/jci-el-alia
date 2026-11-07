/**
 * Broken-link check on the built site (dist/): every internal link, image and
 * script must point at a file that exists, and every #anchor at an element
 * with that id on the target page. External links aren't fetched.
 *
 *   npm run build && npm run check:links
 */
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {join, relative, sep} from 'node:path'

const DIST = fileURLToPath(new URL('../dist/', import.meta.url))

const pages = []
;(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (f.endsWith('.html')) pages.push(p)
  }
})(DIST)

const html = new Map(pages.map((p) => [p, readFileSync(p, 'utf8')]))
const idsCache = new Map()
const ids = (file) => {
  if (!idsCache.has(file)) idsCache.set(file, new Set([...html.get(file).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])))
  return idsCache.get(file)
}

/** The dist file a site path resolves to, or null. */
function fileFor(path) {
  const clean = decodeURIComponent(path.split(/[?#]/)[0])
  const base = join(DIST, clean)
  for (const candidate of [base, join(base, 'index.html'), `${base}.html`]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }
  return null
}

const problems = []
for (const [page, source] of html) {
  const from = '/' + relative(DIST, page).split(sep).join('/')
  const refs = [
    ...[...source.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...source.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ]
  for (const ref of new Set(refs)) {
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(ref) || ref.startsWith('//')) continue
    const [path, hash] = ref.split('#')
    if (path === '' && hash) {
      if (!ids(page).has(hash)) problems.push(`${from}: #${hash} has no matching id on the page`)
      continue
    }
    if (!path.startsWith('/')) continue
    const target = fileFor(path)
    if (!target) problems.push(`${from}: ${ref} not found`)
    else if (hash && target.endsWith('.html') && !ids(target).has(hash)) problems.push(`${from}: ${ref} (no #${hash} there)`)
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} broken links:\n  ` + [...new Set(problems)].join('\n  '))
  process.exit(1)
}
console.log(`✓ Links OK across ${pages.length} pages.`)
