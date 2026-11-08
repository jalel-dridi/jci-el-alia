import {defineType, defineField} from 'sanity'

/**
 * MEMBER OF THE MONTH — one entry per month. The homepage spotlights the
 * most recent one; older entries stay as a record.
 */
export const memberOfMonth = defineType({
  name: 'memberOfMonth',
  title: 'Member of the Month',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'date',
      description: 'Any day in the month (e.g., 2026-11-01). The newest month is shown on the homepage.',
      options: {dateFormat: 'MMMM YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'A clear photo of the member (not the announcement graphic).',
      options: {hotspot: true},
      validation: (rule) => rule.required().warning('Add a photo of the member'),
    }),
    defineField({
      name: 'note',
      title: 'Why they were chosen',
      type: 'localeText',
      description: 'One or two sentences, e.g. what they led or contributed this month.',
    }),
  ],
  orderings: [{title: 'Newest first', name: 'monthDesc', by: [{field: 'month', direction: 'desc'}]}],
  preview: {
    select: {title: 'name', subtitle: 'month', media: 'photo'},
  },
})
