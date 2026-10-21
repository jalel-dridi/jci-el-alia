/**
 * Content quality rules, shared by the field warnings in the schema and the
 * "Content health" report (quality/ContentHealthTool.tsx,
 * scripts/content-health.ts). Warnings never block publishing; they show as
 * yellow flags next to the field so editors know what's missing.
 */

export const LIMITS = {
  coverWidth: 1200, // event covers and the hero background fill the screen width (Facebook photos are 1280)
  photoWidth: 1200, // project photos
  headshotWidth: 400,
  summaryMax: 160, // fits on cards and in Google results
  descriptionMin: 300, // roughly two short paragraphs
  galleryMin: 6,
  galleryMax: 30,
}

type Locale = {en?: string; fr?: string; ar?: string} | undefined
type Image = {asset?: {_ref?: string}} | undefined

const LANGS = {en: 'English', fr: 'French', ar: 'Arabic'} as const

/** Languages with no text, among those that should have it. */
export function missingLangs(value: Locale, langs: (keyof typeof LANGS)[] = ['en', 'fr', 'ar']) {
  return langs.filter((l) => !value?.[l]?.trim()).map((l) => LANGS[l])
}

/** Width/height are encoded in Sanity image asset ids: image-<hash>-1600x900-jpg */
export function imageSize(image: Image) {
  const m = image?.asset?._ref?.match(/-(\d+)x(\d+)-\w+$/)
  return m ? {width: Number(m[1]), height: Number(m[2])} : undefined
}

/** A problem with an uploaded photo, or undefined when it's fine (or absent). */
export function imageProblem(image: Image, minWidth: number, {landscape = false} = {}) {
  const size = imageSize(image)
  if (!size) return undefined
  if (size.width < minWidth) return `Photo is only ${size.width}px wide; use one at least ${minWidth}px wide so it stays sharp`
  if (landscape && size.height > size.width) return 'Use a landscape (horizontal) photo; portrait ones get cropped heavily'
  return undefined
}

export function tooLong(value: Locale, max: number) {
  const long = (Object.keys(LANGS) as (keyof typeof LANGS)[]).filter((l) => (value?.[l]?.length ?? 0) > max)
  return long.length ? `Keep it under ${max} characters (${long.map((l) => LANGS[l]).join(', ')} is longer)` : undefined
}

export function tooShort(value: Locale, min: number) {
  const len = value?.en?.trim().length ?? 0
  return len > 0 && len < min ? `Only ${len} characters; aim for 2–3 short paragraphs (what happened, who took part, one number)` : undefined
}

/* ------------------------------------------------------------------ */
/* Report: every issue for one published document                      */
/* ------------------------------------------------------------------ */

type Doc = Record<string, any> & {_id: string; _type: string}

function translations(issues: string[], label: string, value: Locale) {
  if (!value?.en?.trim()) return
  const missing = missingLangs(value, ['fr', 'ar'])
  if (missing.length) issues.push(`${label}: ${missing.join(' and ')} translation missing`)
}

export function issuesFor(doc: Doc): string[] {
  const issues: string[] = []
  const add = (problem: string | undefined) => problem && issues.push(problem)

  switch (doc._type) {
    case 'event': {
      translations(issues, 'Title', doc.title)
      if (!doc.summary?.en) issues.push('No short summary')
      else translations(issues, 'Summary', doc.summary)
      add(tooLong(doc.summary, LIMITS.summaryMax))
      if (!doc.description?.en) issues.push('No full description')
      else translations(issues, 'Description', doc.description)
      add(tooShort(doc.description, LIMITS.descriptionMin))
      if (!doc.location) issues.push('No location')
      add(imageProblem(doc.coverImage, LIMITS.coverWidth, {landscape: true}))
      const photos: {alt?: string}[] = doc.gallery ?? []
      if (photos.length < LIMITS.galleryMin) issues.push(`Only ${photos.length} album photos (aim for ${LIMITS.galleryMin}–12)`)
      if (photos.length > LIMITS.galleryMax) issues.push(`${photos.length} album photos; keep the best ${LIMITS.galleryMax} or fewer`)
      const noAlt = photos.filter((p) => !p.alt?.trim()).length
      if (noAlt) issues.push(`${noAlt} of ${photos.length} photos have no description (alt text)`)
      if (!doc.photosApproved) issues.push('Photo permissions not confirmed')
      break
    }
    case 'project':
      translations(issues, 'Title', doc.title)
      if (!doc.description?.en) issues.push('No description')
      else translations(issues, 'Description', doc.description)
      if (!doc.metric?.en) issues.push('No impact number')
      else translations(issues, 'Impact number', doc.metric)
      if (!doc.image) issues.push('No photo of its own (the site borrows the latest event cover)')
      add(imageProblem(doc.image, LIMITS.photoWidth))
      break
    case 'boardMember':
      if (!doc.role?.en) issues.push('No role')
      else translations(issues, 'Role', doc.role)
      if (!doc.photo) issues.push('No headshot (the site shows initials)')
      add(imageProblem(doc.photo, LIMITS.headshotWidth))
      break
    case 'president':
      translations(issues, 'Slogan', doc.slogan)
      if (!doc.photo) issues.push('No photo')
      add(imageProblem(doc.photo, LIMITS.headshotWidth))
      break
    case 'partner':
      if (!doc.logo) issues.push('No logo (the site shows a generic icon)')
      if (!doc.url) issues.push('No website or Facebook link')
      break
    case 'siteSettings':
      translations(issues, 'Theme', doc.theme)
      translations(issues, 'Hero title', doc.heroTitle)
      translations(issues, 'Hero subtitle', doc.heroSubtitle)
      add(imageProblem(doc.heroBackground, LIMITS.coverWidth, {landscape: true}))
      break
  }
  return issues
}

const published = '!(_id in path("drafts.**"))'

/** One query for everything the report checks, grouped in display order. */
export const HEALTH_QUERY = `{
  "event": *[_type == "event" && ${published}] | order(date desc) {_id, _type, title, summary, description, location, coverImage, gallery[]{alt}, photosApproved},
  "boardMember": *[_type == "boardMember" && ${published}] | order(year desc, order asc) {_id, _type, name, role, photo},
  "project": *[_type == "project" && ${published}] | order(order asc) {_id, _type, title, description, metric, image},
  "partner": *[_type == "partner" && ${published}] | order(order asc) {_id, _type, name, logo, url},
  "president": *[_type == "president" && ${published}] | order(year desc) {_id, _type, name, year, slogan, photo},
  "siteSettings": *[_id == "siteSettings"] {_id, _type, theme, heroTitle, heroSubtitle, heroBackground}
}`

export const SECTIONS: {type: string; title: string}[] = [
  {type: 'event', title: 'Events / News'},
  {type: 'boardMember', title: 'Board Members'},
  {type: 'project', title: 'Projects'},
  {type: 'partner', title: 'Partners'},
  {type: 'president', title: 'Legacy Timeline'},
  {type: 'siteSettings', title: 'Site Settings'},
]

export function docLabel(doc: Doc) {
  return doc.title?.en || doc.name || (doc._type === 'siteSettings' ? 'Site Settings' : 'Untitled')
}

export type HealthItem = {doc: Doc; label: string; issues: string[]}
export type HealthReport = {sections: {type: string; title: string; items: HealthItem[]}[]; total: number; clean: number}

export function buildReport(data: Record<string, Doc[]>): HealthReport {
  let total = 0
  let clean = 0
  const sections = SECTIONS.map(({type, title}) => {
    const items = (data[type] ?? []).map((doc) => ({doc, label: docLabel(doc), issues: issuesFor(doc)}))
    total += items.length
    clean += items.filter((i) => !i.issues.length).length
    return {type, title, items: items.filter((i) => i.issues.length)}
  })
  return {sections, total, clean}
}
