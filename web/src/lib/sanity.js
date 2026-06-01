import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

/**
 * Sanity client (read-only, build-time).
 * Project ID + dataset come from env vars (set in .env and in Cloudflare).
 * `useCdn: true` serves cached content fast and keeps us within free limits.
 */
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

/** Build an optimized, CDN-served image URL from a Sanity image reference. */
export function urlFor(source) {
  return builder.image(source)
}

/**
 * Pick a localized value from a { en, fr, ar } object, falling back to
 * English, then to whatever exists. Safe against missing fields.
 */
export function pick(localeObj, lang = 'en') {
  if (!localeObj) return ''
  return localeObj[lang] || localeObj.en || localeObj.fr || localeObj.ar || ''
}

/**
 * Resolve an event cover image to a URL, supporting both Sanity image refs
 * (coverImage) and local seed paths (coverUrl). Returns null if neither.
 */
export function eventCover(ev, width = 800, height = 500) {
  if (ev.coverImage) return urlFor(ev.coverImage).width(width).height(height).fit('crop').quality(70).url()
  if (ev.coverUrl) return ev.coverUrl
  return null
}

/**
 * Resolve an event's gallery to an array of { thumb, full, alt } objects,
 * supporting Sanity image arrays (gallery) and local seed paths (galleryUrls).
 */
export function eventGallery(ev) {
  if (Array.isArray(ev.gallery) && ev.gallery.length && ev.gallery[0]?.asset) {
    return ev.gallery.map((img) => ({
      thumb: urlFor(img).width(600).quality(70).url(),
      full: urlFor(img).width(1600).quality(80).url(),
      alt: img.alt || '',
    }))
  }
  if (Array.isArray(ev.galleryUrls)) {
    return ev.galleryUrls.map((u) => ({thumb: u, full: u, alt: ''}))
  }
  return []
}
