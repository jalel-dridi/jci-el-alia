import {defineType, defineField} from 'sanity'

/**
 * Trilingual multi-line text: { en, fr, ar }.
 * Same shape as localeString but rendered as larger text areas, for
 * descriptions and paragraphs.
 */
export const localeText = defineType({
  name: 'localeText',
  title: 'Localized paragraph',
  type: 'object',
  fieldsets: [{name: 'translations', title: 'Translations', options: {collapsible: false}}],
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
      fieldset: 'translations',
      validation: (rule) => rule.required().warning('English is the fallback language'),
    }),
    defineField({name: 'fr', title: 'Français', type: 'text', rows: 3, fieldset: 'translations'}),
    defineField({name: 'ar', title: 'العربية', type: 'text', rows: 3, fieldset: 'translations'}),
  ],
})
