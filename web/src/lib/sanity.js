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

/**
 * Build an optimized, CDN-served image URL from a Sanity image reference.
 * auto('format') lets the CDN send WebP/AVIF to browsers that take them
 * (about a quarter smaller than JPEG) and JPEG to everything else.
 */
export function urlFor(source) {
  return builder.image(source).auto('format')
}

/** `srcset` for a Sanity image at several widths, keeping one aspect ratio. */
export function srcsetFor(source, widths, ratio) {
  return widths
    .map((w) => {
      const img = urlFor(source).width(w).quality(70)
      return `${(ratio ? img.height(Math.round(w * ratio)).fit('crop') : img).url()} ${w}w`
    })
    .join(', ')
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

/** Several sizes of an event cover for `srcset` (Sanity covers only). */
export function eventCoverSrcset(ev, widths, ratio) {
  return ev.coverImage ? srcsetFor(ev.coverImage, widths, ratio) : undefined
}

/**
 * 1200x630 JPEG for link previews. Always JPEG: Facebook and WhatsApp
 * crawlers don't reliably read WebP/AVIF.
 */
export function shareCover(ev) {
  if (ev.coverImage) return builder.image(ev.coverImage).width(1200).height(630).fit('crop').format('jpg').quality(80).url()
  return ev.coverUrl || null
}

/** 600px-wide display size of a Sanity image, from the dimensions in its asset id. */
function thumbSize(img) {
  const m = img.asset?._ref?.match(/-(\d+)x(\d+)-\w+$/)
  return m ? {width: 600, height: Math.round((600 * m[2]) / m[1])} : {}
}

/**
 * Resolve an event's gallery to an array of { thumb, full, alt } objects,
 * supporting Sanity image arrays (gallery) and local seed paths (galleryUrls).
 */
export function eventGallery(ev) {
  if (Array.isArray(ev.gallery) && ev.gallery.length && ev.gallery[0]?.asset) {
    return ev.gallery.map((img) => ({
      thumb: urlFor(img).width(600).quality(70).url(),
      thumbSrcset: srcsetFor(img, [300, 450, 600]),
      ...thumbSize(img),
      full: urlFor(img).width(1600).quality(80).url(),
      alt: img.alt || '',
    }))
  }
  if (Array.isArray(ev.galleryUrls)) {
    return ev.galleryUrls.map((u) => ({thumb: u, full: u, alt: ''}))
  }
  return []
}
