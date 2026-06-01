import {defineType, defineField} from 'sanity'

/**
 * PILLAR — the four JCI "Areas of Opportunity" cards.
 */
export const pillar = defineType({
  name: 'pillar',
  title: 'Pillar (Area of Opportunity)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({
      name: 'icon',
      title: 'Font Awesome icon class',
      type: 'string',
      description: 'e.g., "fa-user-graduate".',
    }),
    defineField({
      name: 'color',
      title: 'Accent color',
      type: 'string',
      options: {
        list: [
          {title: 'JCI Blue', value: 'jci-blue'},
          {title: 'JCI Teal', value: 'jci-teal'},
          {title: 'JCI Navy', value: 'jci-navy'},
          {title: 'JCI Yellow', value: 'jci-yellow'},
        ],
      },
      initialValue: 'jci-blue',
    }),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0}),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'title.fr'},
  },
})
