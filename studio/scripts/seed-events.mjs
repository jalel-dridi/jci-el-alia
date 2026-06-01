/**
 * Seed real events into Sanity, uploading the curated album photos from
 * web/public/albums as Sanity image assets. Run AFTER `sanity login` and after
 * the main seed.mjs. Idempotent via fixed _id values.
 *
 * Usage (from studio/):
 *   $env:SANITY_STUDIO_PROJECT_ID="id"; $env:SANITY_WRITE_TOKEN="token"; node scripts/seed-events.mjs
 */
import {createClient} from '@sanity/client'
import {readFileSync, existsSync, readdirSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, join, basename} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..', '..')
const albumsDir = join(repoRoot, 'web', 'public', 'albums')

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const token = process.env.SANITY_WRITE_TOKEN
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
if (!projectId || !token) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_WRITE_TOKEN.')
  process.exit(1)
}
const client = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})
const L = (en, fr, ar) => ({en, fr, ar})

// Upload every image in an album folder; return Sanity image refs.
async function uploadAlbum(slug) {
  const dir = join(albumsDir, slug)
  if (!existsSync(dir)) return []
  const files = readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()
  const refs = []
  for (const f of files) {
    const asset = await client.assets.upload('image', readFileSync(join(dir, f)), {filename: basename(f)})
    refs.push({_type: 'image', _key: f.replace(/\W/g, ''), asset: {_type: 'reference', _ref: asset._id}})
  }
  console.log(`  uploaded ${refs.length} photos for ${slug}`)
  return refs
}

// Curated events with real galleries (photos in web/public/albums/<album>).
const events = [
  {_id: 'event-champions-cup-2024', album: 'champions-cup', slug: 'el-alia-champions-cup-2024', year: 2024, date: '2024-06-14', category: 'community', featured: true,
    title: L('El Alia Champions Cup', 'El Alia Champions Cup', 'كأس العالية للأندية'),
    summary: L('A multi-day football tournament bringing local clubs and the whole community together.', 'Un tournoi de football sur plusieurs jours réunissant les clubs locaux et toute la communauté.', 'دورة كرة قدم على عدة أيام تجمع الأندية المحلية والمجتمع بأكمله.'),
    location: 'El Alia'},
  {_id: 'event-awards-2023', album: 'awards-2023', slug: 'awards-ceremony-2023', year: 2023, date: '2023-12-23', category: 'community', featured: true,
    title: L('JCI El Alia Awards Ceremony 2023', 'Cérémonie des Récompenses JCI El Alia 2023', 'حفل توزيع جوائز الغرفة الفتية بالعالية 2023'),
    summary: L('An evening celebrating the members, projects, and partners who made the year exceptional.', 'Une soirée célébrant les membres, projets et partenaires qui ont rendu l\'année exceptionnelle.', 'أمسية احتفاء بالأعضاء والمشاريع والشركاء الذين جعلوا العام استثنائياً.'),
    location: 'El Alia'},
  {_id: 'event-intalqa-2', album: 'intalqa-2-2026', slug: 'intalqa-2-2026', year: 2026, date: '2026-02-08', category: 'entrepreneurship', featured: true,
    title: L('Intalqa 2.0', 'Intalqa 2.0', 'إنطلاقة 2.0'),
    summary: L('Second edition supporting local artisans and small businesses with training and a marketplace.', 'Deuxième édition soutenant les artisans et petites entreprises avec formations et marché.', 'النسخة الثانية لدعم الحرفيين والمشاريع الصغيرة بالتكوين ومعرض للبيع.'),
    location: 'Maison des Associations El Alia'},
  {_id: 'event-orient-up-4', album: 'orient-up-4', slug: 'orient-up-4', year: 2025, date: '2025-07-12', category: 'education',
    title: L("Orient'Up 4.0", "Orient'Up 4.0", "Orient'Up 4.0"),
    summary: L('The fourth edition of our flagship university orientation forum for baccalaureate students.', 'La quatrième édition de notre forum phare d\'orientation universitaire pour les bacheliers.', 'النسخة الرابعة من منتدانا الرائد للتوجيه الجامعي لتلاميذ البكالوريا.'),
    location: 'El Alia'},
  {_id: 'event-innoventure', album: 'innoventure-hackathon-2025', slug: 'innoventure-hackathon-2025', year: 2025, date: '2025-01-05', category: 'entrepreneurship',
    title: L('InnoVenture Hackathon', 'InnoVenture Hackathon', 'هاكاثون إينوفنتشر'),
    summary: L('A hackathon fostering innovation through coding challenges and entrepreneurship.', 'Un hackathon favorisant l\'innovation par des défis de programmation et l\'entrepreneuriat.', 'هاكاثون لتعزيز الابتكار عبر تحديات برمجية وريادة الأعمال.'),
    location: 'El Alia'},
  {_id: 'event-rising-kids-2', album: 'rising-kids-2', slug: 'rising-kids-2', year: 2025, date: '2025-09-19', category: 'community',
    title: L('Rising Kids 2', 'Rising Kids 2', 'Rising Kids 2'),
    summary: L('Second edition of our children\'s educational and developmental program.', 'Deuxième édition de notre programme éducatif et de développement pour enfants.', 'النسخة الثانية من برنامجنا التربوي والتنموي للأطفال.'),
    location: 'Maison des Jeunes El Alia'},
  {_id: 'event-success-stories-619', album: 'success-stories-619', slug: 'success-stories-619', year: 2023, date: '2023-07-08', category: 'community',
    title: L('Success Stories 619', 'Success Stories 619', 'قصص النجاح 619'),
    summary: L('Inspiring Tunisian achievers share their journeys with local youth.', 'Des Tunisiens inspirants partagent leur parcours avec la jeunesse locale.', 'شخصيات تونسية ملهمة تشارك مسيرتها مع شباب المنطقة.'),
    location: 'El Alia'},
  {_id: 'event-bac-up-2025', album: 'bac-up-2025', slug: 'bac-up-2025', year: 2025, date: '2025-04-13', category: 'education',
    title: L("Bac'Up", "Bac'Up", "Bac'Up"),
    summary: L('Hands-on practical workshops helping baccalaureate students ace their applied exams.', 'Ateliers pratiques aidant les bacheliers à réussir leurs épreuves pratiques.', 'ورشات تطبيقية عملية تساعد تلاميذ البكالوريا على النجاح في امتحاناتهم التطبيقية.'),
    location: 'El Alia'},
  {_id: 'event-reading-championship', album: 'reading-championship-2026', slug: 'reading-championship-2026', year: 2026, date: '2026-04-11', category: 'education',
    title: L('Local Reading Championship', 'Championnat Local de Lecture', 'البطولة المحلية للمطالعة'),
    summary: L('A friendly reading competition for primary school children, with the public library.', 'Un concours de lecture amical pour les écoliers, avec la bibliothèque publique.', 'مسابقة مطالعة ودّية لتلاميذ المرحلة الابتدائية، بالشراكة مع المكتبة العمومية.'),
    location: 'El Alia Public Library'},
  {_id: 'event-chess-2025', album: 'chess-tournament-2025', slug: 'chess-tournament-2025', year: 2025, date: '2025-03-08', category: 'community',
    title: L('El Alia Chess Tournament', "Tournoi d'Échecs El Alia", 'دورة العالية للشطرنج'),
    summary: L('A community chess tournament sharpening strategy and bringing players together.', 'Un tournoi d\'échecs communautaire alliant stratégie et convivialité.', 'دورة شطرنج مجتمعية تصقل التفكير الاستراتيجي وتجمع اللاعبين.'),
    location: 'El Alia'},
]

async function run() {
  for (const ev of events) {
    const gallery = await uploadAlbum(ev.album)
    const cover = gallery[0]
    const doc = {
      _id: ev._id, _type: 'event',
      title: ev.title, summary: ev.summary,
      slug: {_type: 'slug', current: ev.slug},
      year: ev.year, date: ev.date, category: ev.category, featured: ev.featured,
      location: ev.location,
      ...(cover ? {coverImage: {_type: 'image', asset: cover.asset}} : {}),
      gallery,
    }
    await client.createOrReplace(doc)
    console.log(`✓ ${ev.slug} (${gallery.length} photos)`)
  }
  console.log('Done. Add remaining text-only events in the dashboard.')
}

run().catch((err) => { console.error(err); process.exit(1) })
