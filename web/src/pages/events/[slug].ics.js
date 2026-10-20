/**
 * /events/<slug>.ics — downloadable calendar entry for each event, used by the
 * "Add to calendar" button in the Upcoming section.
 */
import {getEvents} from '../../lib/queries.js'
import {events as seedEvents} from '../../data/events.js'
import {icsFor} from '../../lib/events.js'

export async function getStaticPaths() {
  const events = await getEvents(seedEvents)
  return events.filter((ev) => ev.date).map((ev) => ({params: {slug: ev.slug}, props: {event: ev}}))
}

export function GET({props, site}) {
  return new Response(icsFor(props.event, site ?? 'https://jci-el-alia.pages.dev'), {
    headers: {'Content-Type': 'text/calendar; charset=utf-8'},
  })
}
