import {ui, rtlLanguages} from './ui.js'

/** Translate a UI key for a given language, falling back to English. */
export function t(key, lang = 'en') {
  return (ui[lang] && ui[lang][key]) || ui.en[key] || key
}

/** Direction for a language. */
export function dirFor(lang) {
  return rtlLanguages.includes(lang) ? 'rtl' : 'ltr'
}
