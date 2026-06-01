/**
 * Deep parser for the Facebook posts export. Decodes mojibake, then:
 *  1) Writes all posts (date, caption, attached photo URIs) to fb-posts.json
 *  2) Flags likely board/election posts (passation, bureau, élu, président, مكتب…)
 *     to fb-board-posts.txt for accurate board reconstruction.
 *
 * Run: node scripts/parse-fb-posts.mjs
 */
import {readFileSync, writeFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', '..')
const FB = join(root, 'content', 'social-media', 'facebook', "this_profile's_activity_across_facebook")

// Facebook stores UTF-8 bytes reinterpreted as Latin-1; reverse it everywhere.
function fix(s) {
  if (typeof s !== 'string') return s
  try { return Buffer.from(s, 'latin1').toString('utf8') } catch { return s }
}

const raw = JSON.parse(readFileSync(join(FB, 'posts', 'profile_posts_1.json'), 'utf8'))

const posts = []
for (const p of raw) {
  const ts = p.timestamp || 0
  const date = ts ? new Date(ts * 1000).toISOString().slice(0, 10) : ''
  let caption = ''
  const photos = []

  // captions can live in data[].post or attachments[].data[].{event,media,external_context}
  for (const d of p.data || []) {
    if (d.post) caption ||= fix(d.post)
  }
  for (const att of p.attachments || []) {
    for (const d of att.data || []) {
      if (d.event?.description) caption ||= fix(d.event.description)
      if (d.event?.name) caption ||= fix(d.event.name)
      if (d.media) {
        if (d.media.uri && /\.(jpe?g|png)$/i.test(d.media.uri)) photos.push(d.media.uri)
        if (d.media.description && !caption) caption = fix(d.media.description)
      }
      if (d.external_context?.url && !caption) caption = fix(d.external_context.url)
    }
  }
  posts.push({date, ts, title: fix(p.title || ''), caption, photos})
}

posts.sort((a, b) => b.ts - a.ts)
writeFileSync(join(__dirname, '..', 'src', 'data', 'fb-posts.json'), JSON.stringify(posts, null, 2), 'utf8')

// Board / election detection
const KW = /passation|bureau|élu|elu|élection|election|président|presidente|president|AGEP|AGEEP|نتخاب|مكتب|رئيس|بيرو|ترشح|تنصيب|VPPRE|VPFD|secrétaire général|trésor/i
const boardPosts = posts.filter((p) => KW.test(p.caption) || KW.test(p.title))
const out = boardPosts.map((p) => `===== ${p.date} =====\n${p.caption}\n`).join('\n')
writeFileSync(join(__dirname, '..', 'src', 'data', 'fb-board-posts.txt'), out, 'utf8')

console.log(`Parsed ${posts.length} posts.`)
console.log(`Posts with photos: ${posts.filter((p) => p.photos.length).length}`)
console.log(`Likely board/election posts: ${boardPosts.length} -> fb-board-posts.txt`)
