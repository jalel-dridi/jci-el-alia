/**
 * Report how many photos each candidate event has across matching posts,
 * so we feature only events with genuine photo coverage.
 */
import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const posts = JSON.parse(readFileSync(join(__dirname, '..', 'src', 'data', 'fb-posts.json'), 'utf8'))
const withPhotos = posts.filter((p) => p.photos.length)

const candidates = {
  'Champions Cup': /كأس العالية|Champions Cup/i,
  "Orient'Up": /Orient'?Up|التوجيه الجامعي/i,
  'Intalqa': /انطلاقة|إنطلاقة|Intalqa/i,
  'InnoVenture': /InnoVenture|هاكاثون|Hackathon/i,
  'Rising Kids': /Rising Kids|رايزينغ/i,
  'Success Stories 619': /Success Stories|قصص النجاح|619/i,
  'Awards 2025': /حفل توزيع الجوائز|Awards Ceremony 2025|جوائز لسنة 2025/i,
  'Awards 2023': /Awards 2023|جوائز 2023/i,
  "Bac'Up": /Bac'?Up|باك أب/i,
  'Voice Masters': /Voice Masters|فويس/i,
  'Champions Cup Chess': /الشطرنج|دورة العالية للشطرنج/i,
  'Summer Forum': /Summer Forum|المنتدى الصيفي/i,
  'Reading Championship': /البطولة المحلية للمطالعة|المطالعة/i,
  '35 Years': /35 ans|35 Years|35 سنة|الذكرى/i,
  'Cap Hmem': /Cap Hmem|كاب حمام|رحلة/i,
}

for (const [name, re] of Object.entries(candidates)) {
  const matched = withPhotos.filter((p) => re.test(p.caption))
  const total = matched.reduce((n, p) => n + p.photos.length, 0)
  if (matched.length) {
    const dates = matched.map((p) => p.date).sort()
    console.log(`${name}: ${matched.length} posts, ${total} photos  [${dates[0]} … ${dates[dates.length - 1]}]`)
  } else {
    console.log(`${name}: (no photo posts)`)
  }
}
