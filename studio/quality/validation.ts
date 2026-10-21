/**
 * Field-level checks for the schema, used as `rule.custom(check).warning()`.
 * The thresholds and wording live in ./rules so the Content health report
 * flags exactly the same things.
 */
import type {ValidationContext} from 'sanity'
import {imageProblem, tooLong, tooShort} from './rules'

type Locale = {en?: string; fr?: string; ar?: string}

/** Flag an empty French/Arabic field once the English one is filled in. */
export const needsTranslation = (lang: 'French' | 'Arabic') => (value: unknown, ctx: ValidationContext) => {
  const en = (ctx.parent as Locale | undefined)?.en?.trim()
  return en && !(value as string | undefined)?.trim() ? `${lang} translation missing; ${lang}-speaking visitors will see the English text` : true
}

export const photoQuality = (minWidth: number, opts?: {landscape?: boolean}) => (value: unknown) =>
  imageProblem(value as {asset?: {_ref?: string}}, minWidth, opts) ?? true

export const maxChars = (max: number) => (value: unknown) => tooLong(value as Locale, max) ?? true

export const minChars = (min: number) => (value: unknown) => tooShort(value as Locale, min) ?? true
