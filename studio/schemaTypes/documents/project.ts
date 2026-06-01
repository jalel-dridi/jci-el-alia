import {defineType, defineField} from 'sanity'

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
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({
      name: 'metric',
      title: 'Impact metric',
      type: 'localeString',
      description: 'Short highlight, e.g., "240+ participants", "2 editions".',
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
      options: {hotspot: true},
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
