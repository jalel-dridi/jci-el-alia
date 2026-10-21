import {defineType, defineField} from 'sanity'
import {needsTranslation} from '../../quality/validation'

/**
 * Trilingual single-line string: { en, fr, ar }.
 * Editors see three fields (English / Français / العربية).
 * English is required; an empty FR/AR field gets a yellow warning once the
 * English text is filled in (it never blocks publishing).
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
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'string',
      fieldset: 'translations',
      validation: (rule) => rule.custom(needsTranslation('French')).warning(),
    }),
    defineField({
      name: 'ar',
      title: 'العربية',
      type: 'string',
      fieldset: 'translations',
      validation: (rule) => rule.custom(needsTranslation('Arabic')).warning(),
    }),
  ],
})
