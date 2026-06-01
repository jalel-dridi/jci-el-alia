import {defineType, defineField} from 'sanity'

/**
 * EVENT — the centerpiece content type.
 * Drives the yearly "Our Work" showcase and individual photo-album pages.
 * Editors add a title, date, category, descriptions, a cover image, and a
 * full photo gallery — no code required.
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
      description: 'One-line teaser shown on cards.',
    }),
    defineField({
      name: 'description',
      title: 'Full description',
      type: 'localeText',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Optional venue, e.g., Maison des Jeunes El Alia.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
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
            {name: 'alt', title: 'Alt text (accessibility)', type: 'string'},
          ],
        },
      ],
      options: {layout: 'grid'},
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
