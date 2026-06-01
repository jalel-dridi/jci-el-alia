import {defineType, defineField} from 'sanity'

/**
 * PRESIDENT — one entry per year for the "Honor The Legacy" timeline.
 * Each new president just adds a row: year, name, slogan, photo.
 */
export const president = defineType({
  name: 'president',
  title: 'President (Legacy Timeline)',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().min(1989).max(2100),
    }),
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan / theme',
      type: 'localeString',
      description: 'The mandate slogan, e.g., "Honor The Legacy".',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'current',
      title: 'Current president?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {title: 'Year, oldest first', name: 'yearAsc', by: [{field: 'year', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'year', media: 'photo'},
  },
})
