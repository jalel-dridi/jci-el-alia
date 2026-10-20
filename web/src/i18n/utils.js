import {ui, rtlLanguages, languages} from './ui.js'

/** Translate a UI key for a given language, falling back to English. */
export function t(key, lang = 'en') {
  return (ui[lang] && ui[lang][key]) || ui.en[key] || key
}

const dateLocales = {en: 'en-GB', fr: 'fr-FR', ar: 'ar-TN'}

/**
 * Format a YYYY-MM-DD date for a language ("12 July 2025", "12 juillet 2025",
 * "12 جويلية 2025"). UTC so the day never shifts with the build machine's zone.
 */
export function formatDate(date, lang = 'en', opts = {year: 'numeric', month: 'long', day: 'numeric'}) {
  if (!date) return ''
  return new Date(date).toLocaleDateString(dateLocales[lang] || 'en-GB', {...opts, timeZone: 'UTC'})
}

/**
 * URL of a page in a language. English lives at the root ("/events/"), the
 * others under a prefix ("/fr/events/", "/ar/events/").
 */
export function localePath(lang, path = '/') {
  return lang === 'en' ? path : `/${lang}${path}`
}

/** getStaticPaths entries for a [...lang] route: en -> /, fr -> /fr/, ar -> /ar/. */
export const langPaths = () =>
  languages.map((l) => ({params: {lang: l === 'en' ? undefined : l}, props: {lang: l}}))

/** Direction for a language. */
export function dirFor(lang) {
  return rtlLanguages.includes(lang) ? 'rtl' : 'ltr'
}
