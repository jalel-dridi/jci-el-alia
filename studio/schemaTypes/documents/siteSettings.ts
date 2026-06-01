import {defineType, defineField} from 'sanity'

/**
 * SITE SETTINGS — a single document (singleton).
 * Holds the yearly theme/slogan, hero content, contact info, and the
 * homepage stat counters. Editing this updates the whole site's framing.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'stats', title: 'Stats'},
    {name: 'contact', title: 'Contact'},
  ],
  fields: [
    defineField({
      name: 'year',
      title: 'Current year',
      type: 'number',
      group: 'hero',
      initialValue: 2026,
    }),
    defineField({
      name: 'theme',
      title: 'Yearly theme / slogan',
      type: 'localeString',
      group: 'hero',
      description: 'e.g., "Honor The Legacy" (2026).',
    }),
    defineField({name: 'heroTitle', title: 'Hero headline', type: 'localeString', group: 'hero'}),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'localeText',
      group: 'hero',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero background image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
    }),
    // Stat counters (animated on the homepage)
    defineField({
      name: 'yearsOfImpact',
      title: 'Years of impact',
      type: 'number',
      group: 'stats',
      initialValue: 36,
    }),
    defineField({
      name: 'activeMembers',
      title: 'Active members',
      type: 'number',
      group: 'stats',
      initialValue: 47,
    }),
    defineField({
      name: 'projectsDelivered',
      title: 'Projects delivered',
      type: 'number',
      group: 'stats',
      initialValue: 50,
    }),
    // Contact
    defineField({name: 'email', title: 'Email', type: 'string', group: 'contact'}),
    defineField({name: 'phone', title: 'Phone', type: 'string', group: 'contact'}),
    defineField({name: 'address', title: 'Address', type: 'string', group: 'contact'}),
    defineField({name: 'facebook', title: 'Facebook URL', type: 'url', group: 'contact'}),
    defineField({name: 'instagram', title: 'Instagram URL', type: 'url', group: 'contact'}),
    defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url', group: 'contact'}),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
