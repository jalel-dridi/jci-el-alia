import {defineType, defineField} from 'sanity'

/**
 * PARTNER — logos for the partners marquee.
 */
export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'icon',
      title: 'Font Awesome icon (fallback)',
      type: 'string',
      description: 'Used if no logo image is uploaded, e.g., "fa-landmark".',
    }),
    defineField({name: 'url', title: 'Website', type: 'url'}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0}),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', media: 'logo'},
  },
})
