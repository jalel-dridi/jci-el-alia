import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
// Tailwind v4 is wired via PostCSS (postcss.config.mjs), which Astro picks up
// automatically. This avoids a Rolldown/Vite-plugin resolver issue in Astro 6.
export default defineConfig({
  // Production URL (Cloudflare Pages). Update if a custom domain is added.
  site: 'https://jci-el-alia.pages.dev',
  // Fetch internal pages on hover/tap so navigation (and its page transition)
  // starts instantly.
  prefetch: {prefetchAll: true, defaultStrategy: 'hover'},
  integrations: [
    // hreflang links between the EN (/), FR (/fr/) and AR (/ar/) versions
    sitemap({i18n: {defaultLocale: 'en', locales: {en: 'en', fr: 'fr', ar: 'ar'}}}),
  ],
})
