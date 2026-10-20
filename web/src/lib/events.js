import {pick} from './sanity.js'

/**
 * Event date helpers. The site is static, so "today" is the build date — the
 * nightly rebuild (deploy.yml) moves events from "upcoming" to "past" daily.
 * Event dates are plain YYYY-MM-DD strings, so string comparison is enough.
 */
export const today = () => new Date().toISOString().slice(0, 10)

/** Events on or after today, soonest first. */
export function upcomingEvents(events, now = today()) {
  return events.filter((ev) => ev.date && ev.date >= now).sort((a, b) => a.date.localeCompare(b.date))
}

/** Events before today (or undated), newest first. */
export function pastEvents(events, now = today()) {
  return events
    .filter((ev) => !ev.date || ev.date < now)
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
}

// All-day events: calendar end dates are exclusive, so end = next day.
const compact = (d) => d.replaceAll('-', '')
function nextDay(d) {
  const n = new Date(d + 'T00:00:00Z')
  n.setUTCDate(n.getUTCDate() + 1)
  return n.toISOString().slice(0, 10)
}

/** "Add to Google Calendar" link for an all-day event. */
export function googleCalendarUrl(ev, lang = 'en') {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${pick(ev.title, lang)} · JCI El Alia`,
    dates: `${compact(ev.date)}/${compact(nextDay(ev.date))}`,
    details: pick(ev.summary, lang),
    location: ev.location || 'El Alia, Bizerte, Tunisia',
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

/** iCalendar (.ics) file body for an all-day event — works with Apple, Outlook, etc. */
export function icsFor(ev, siteUrl) {
  const esc = (s = '') => String(s).replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\r?\n/g, '\\n')
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')
  const url = new URL(`/events/${ev.slug}/`, siteUrl).href
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JCI El Alia//Website//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${ev.slug}@jci-el-alia`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compact(ev.date)}`,
    `DTEND;VALUE=DATE:${compact(nextDay(ev.date))}`,
    `SUMMARY:${esc(pick(ev.title, 'en'))} · JCI El Alia`,
    `DESCRIPTION:${esc(pick(ev.summary, 'en'))}\\n${url}`,
    `LOCATION:${esc(ev.location || 'El Alia, Bizerte, Tunisia')}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n')
}
