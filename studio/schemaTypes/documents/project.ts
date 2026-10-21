import {defineType, defineField} from 'sanity'
import {LIMITS} from '../../quality/rules'
import {photoQuality} from '../../quality/validation'

/**
 * PROJECT — the "Our Impact" flagship cards.
 * Title, category badge, description, an impact metric, and a photo.
 */
export const project = defineType({
  name: 'project',
  title: 'Project (Impact Card)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category badge',
      type: 'localeString',
      description: 'e.g., Education, Entrepreneurship, Innovation.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: (rule) => rule.required().warning('Add a short description of the project'),
    }),
    defineField({
      name: 'metric',
      title: 'Impact metric',
      type: 'localeString',
      description: 'Short highlight with a real number, e.g., "240+ participants", "2 editions".',
      validation: (rule) => rule.required().warning('Add one real number that shows the impact'),
    }),
    defineField({
      name: 'icon',
      title: 'Font Awesome icon class',
      type: 'string',
      description: 'Optional fallback icon, e.g., "fa-compass" (used if no photo).',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: `Without one, the site borrows the cover of the latest matching event. At least ${LIMITS.photoWidth}px wide.`,
      options: {hotspot: true},
      validation: (rule) => [
        rule.required().warning('Add a photo of this project'),
        rule.custom(photoQuality(LIMITS.photoWidth)).warning(),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'category.en', media: 'image'},
  },
})
