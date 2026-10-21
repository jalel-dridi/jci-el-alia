import {defineType, defineField} from 'sanity'
import {LIMITS} from '../../quality/rules'
import {maxChars, minChars, photoQuality} from '../../quality/validation'

/**
 * EVENT — the centerpiece content type.
 * Drives the yearly "Our Work" showcase and individual photo-album pages.
 * Editors add a title, date, category, descriptions, a cover image, and a
 * full photo gallery — no code required. Yellow warnings (quality/rules.ts)
 * point out what's missing for a complete album page; they never block
 * publishing.
 */
export const event = defineType({
  name: 'event',
  title: 'Event / News',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Auto-generated from the English title. Used in the page address.',
      options: {source: 'title.en', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event date',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Showcase year',
      type: 'number',
      description: 'Which yearly showcase this belongs to (e.g., 2026).',
      validation: (rule) => rule.required().min(1989).max(2100),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Education', value: 'education'},
          {title: 'Community', value: 'community'},
          {title: 'Entrepreneurship', value: 'entrepreneurship'},
          {title: 'Innovation', value: 'innovation'},
          {title: 'Leadership', value: 'leadership'},
          {title: 'Health', value: 'health'},
          {title: 'Environment', value: 'environment'},
          {title: 'International', value: 'international'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'localeString',
      description: `One-line teaser shown on cards and in Google results (under ${LIMITS.summaryMax} characters).`,
      validation: (rule) => [
        rule.required().warning('Add a one-line summary for the event cards'),
        rule.custom(maxChars(LIMITS.summaryMax)).warning(),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Full description',
      type: 'localeText',
      description: '2–3 short paragraphs for the album page: what happened, who took part, and one number (attendees, prizes, kids reached).',
      validation: (rule) => [
        rule.required().warning('Add a description; the album page and Google rely on it'),
        rule.custom(minChars(LIMITS.descriptionMin)).warning(),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Venue, e.g., Maison des Jeunes El Alia.',
      validation: (rule) => rule.required().warning('Add where it took place'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      description: `A landscape photo at least ${LIMITS.coverWidth}px wide, without text or logos on it.`,
      options: {hotspot: true},
      validation: (rule) => [rule.required(), rule.custom(photoQuality(LIMITS.coverWidth, {landscape: true})).warning()],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo album',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'caption', title: 'Caption', type: 'localeString'},
            {
              name: 'alt',
              title: 'Alt text (accessibility)',
              type: 'string',
              description: 'A few words on what the photo shows, read aloud to blind visitors and used by Google.',
              validation: (rule) => rule.required().warning('Describe the photo, e.g. "Students at a career workshop"'),
            },
          ],
        },
      ],
      description: `The best ${LIMITS.galleryMin}–12 photos. Click a photo to add its description (alt text).`,
      options: {layout: 'grid'},
      validation: (rule) => [
        rule.min(LIMITS.galleryMin).warning(`Add at least ${LIMITS.galleryMin} photos so the album feels complete`),
        rule.max(LIMITS.galleryMax).warning(`Keep the best ${LIMITS.galleryMax} or fewer; long albums are slow on phones`),
      ],
    }),
    defineField({
      name: 'photosApproved',
      title: 'Photo permissions checked',
      type: 'boolean',
      description: 'Tick once everyone pictured agreed to appear online, with written parental consent for anyone under 18.',
      initialValue: false,
      validation: (rule) =>
        rule.custom((v) => v === true || 'Confirm the people in these photos agreed to be online').warning(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {title: 'Date, newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'date', media: 'coverImage'},
  },
})
