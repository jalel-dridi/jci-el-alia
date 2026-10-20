import {ui, rtlLanguages} from './ui.js'

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

/** Direction for a language. */
export function dirFor(lang) {
  return rtlLanguages.includes(lang) ? 'rtl' : 'ltr'
}
