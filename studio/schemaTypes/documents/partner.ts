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
      description: 'Ideally a PNG or SVG with a transparent background.',
      options: {hotspot: true},
      validation: (rule) => rule.required().warning('Upload the logo; otherwise a generic icon is shown'),
    }),
    defineField({
      name: 'icon',
      title: 'Font Awesome icon (fallback)',
      type: 'string',
      description: 'Used if no logo image is uploaded, e.g., "fa-landmark".',
    }),
    defineField({
      name: 'url',
      title: 'Website',
      type: 'url',
      description: 'Their website or Facebook page.',
      validation: (rule) => rule.required().warning('Add a link so visitors can find them'),
    }),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0}),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', media: 'logo'},
  },
})
