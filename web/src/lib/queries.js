import {sanityClient} from './sanity.js'

/**
 * Centralized GROQ queries. Each fetch is wrapped so that if Sanity isn't
 * configured yet (no project ID) or returns nothing, we fall back to local
 * seed data — the site still builds and looks complete during development.
 */

const isConfigured =
  (import.meta.env.PUBLIC_SANITY_PROJECT_ID || '') !== '' &&
  import.meta.env.PUBLIC_SANITY_PROJECT_ID !== 'placeholder'

async function safeFetch(query, fallback) {
  if (!isConfigured) return fallback
  try {
    const data = await sanityClient.fetch(query)
    if (!data || (Array.isArray(data) && data.length === 0)) return fallback
    return data
  } catch (err) {
    console.warn('[sanity] fetch failed, using fallback:', err.message)
    return fallback
  }
}

export const getSiteSettings = (fallback) =>
  safeFetch(`*[_type == "siteSettings"][0]`, fallback)

export const getPresidents = (fallback) =>
  safeFetch(`*[_type == "president"] | order(year asc)`, fallback)

export const getProjects = (fallback) =>
  safeFetch(`*[_type == "project"] | order(order asc)`, fallback)

export const getPillars = (fallback) =>
  safeFetch(`*[_type == "pillar"] | order(order asc)`, fallback)

export const getPartners = (fallback) =>
  safeFetch(`*[_type == "partner"] | order(order asc)`, fallback)

export const getBoardMembers = (fallback) =>
  safeFetch(`*[_type == "boardMember"] | order(year desc, order asc)`, fallback)

export const getEvents = (fallback) =>
  safeFetch(
    `*[_type == "event"] | order(date desc){
      ..., "slug": slug.current
    }`,
    fallback,
  )

export const getFeaturedEvents = (fallback) =>
  safeFetch(
    `*[_type == "event" && featured == true] | order(date desc){
      ..., "slug": slug.current
    }`,
    fallback,
  )

export const getEventBySlug = (slug, fallback) =>
  safeFetch(`*[_type == "event" && slug.current == "${slug}"][0]`, fallback)
