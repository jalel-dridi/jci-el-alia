import {defineType, defineField} from 'sanity'

/**
 * BOARD MEMBER — optional "Our Team" entries, grouped by year.
 */
export const boardMember = defineType({
  name: 'boardMember',
  title: 'Board Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'localeString',
      description: 'e.g., President, Secretary General, VPPRE.',
    }),
    defineField({
      name: 'year',
      title: 'Board year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Headshot',
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
    {
      title: 'Year (newest), then order',
      name: 'yearOrder',
      by: [
        {field: 'year', direction: 'desc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'year', media: 'photo'},
  },
})
