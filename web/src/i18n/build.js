import {ui, languages} from './ui.js'
import {formatDate} from './utils.js'
import {pick} from '../lib/sanity.js'

/**
 * Build a combined translation dictionary { en:{}, fr:{}, ar:{} } that merges
 * the static UI strings with all CMS content (presidents, projects, pillars,
 * partners, settings, testimonial, events, board roles). Each piece of content gets a stable key
 * (e.g. "proj.1.title") so the client can swap languages instantly — exactly
 * like the original single-page site, but content-driven.
 */
export function buildTranslations({settings, presidents, projects, pillars, testimonial, achievements, events = [], board = []}) {
  const dict = {en: {}, fr: {}, ar: {}}

  // Seed with static UI strings
  for (const lang of languages) {
    Object.assign(dict[lang], ui[lang])
  }

  const add = (key, localeObj) => {
    if (!localeObj) return
    for (const lang of languages) {
      dict[lang][key] = pick(localeObj, lang)
    }
  }

  // Site settings (hero)
  add('site.theme', settings.theme)
  add('hero.title', settings.heroTitle)
  add('hero.subtitle', settings.heroSubtitle)

  // Presidents — slogans
  presidents.forEach((p) => add(`pres.${p.year}.slogan`, p.slogan))

  // Projects — title, category, description, metric
  projects.forEach((p, i) => {
    add(`proj.${i}.title`, p.title)
    add(`proj.${i}.cat`, p.category)
    add(`proj.${i}.desc`, p.description)
    add(`proj.${i}.metric`, p.metric)
  })

  // Pillars — title, description
  pillars.forEach((p, i) => {
    add(`pillar.${i}.title`, p.title)
    add(`pillar.${i}.desc`, p.description)
  })

  // Testimonial
  if (testimonial) {
    add('quote.text', testimonial.quote)
    add('quote.role', testimonial.role)
  }

  // Achievements
  if (achievements) {
    achievements.forEach((a, i) => add(`ach.${i}`, a.text))
  }

  // Events — card title/summary and album page text, keyed by slug
  events.forEach((ev) => {
    add(`ev.${ev.slug}.title`, ev.title)
    add(`ev.${ev.slug}.sum`, ev.summary)
    add(`ev.${ev.slug}.desc`, ev.description || ev.summary)
    if (ev.date) {
      add(`ev.${ev.slug}.date`, Object.fromEntries(languages.map((l) => [l, formatDate(ev.date, l)])))
      add(`ev.${ev.slug}.mon`, Object.fromEntries(languages.map((l) => [l, formatDate(ev.date, l, {month: 'short'})])))
    }
  })

  // Board — roles, keyed by year + name (stable regardless of sort order)
  board.forEach((m) => add(`board.${m.year}.${m.name}.role`, m.role))

  return dict
}
