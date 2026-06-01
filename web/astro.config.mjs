import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
// Tailwind v4 is wired via PostCSS (postcss.config.mjs), which Astro picks up
// automatically. This avoids a Rolldown/Vite-plugin resolver issue in Astro 6.
export default defineConfig({
  // Production URL (Cloudflare Pages). Update if a custom domain is added.
  site: 'https://jci-el-alia.pages.dev',
  integrations: [sitemap()],
})
