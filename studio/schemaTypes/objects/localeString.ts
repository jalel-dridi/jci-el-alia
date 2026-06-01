import {defineType, defineField} from 'sanity'

/**
 * Trilingual single-line string: { en, fr, ar }.
 * Editors see three fields (English / Français / العربية).
 * English is required; FR/AR are optional so content can be language-native.
 */
export const localeString = defineType({
  name: 'localeString',
  title: 'Localized text',
  type: 'object',
  fieldsets: [{name: 'translations', title: 'Translations', options: {collapsible: false}}],
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      fieldset: 'translations',
      validation: (rule) => rule.required().warning('English is the fallback language'),
    }),
    defineField({name: 'fr', title: 'Français', type: 'string', fieldset: 'translations'}),
    defineField({name: 'ar', title: 'العربية', type: 'string', fieldset: 'translations'}),
  ],
})
