import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
// Tailwind v4 is wired via PostCSS (postcss.config.mjs), which Astro picks up
// automatically. This avoids a Rolldown/Vite-plugin resolver issue in Astro 6.
export default defineConfig({
  // Update this to the final Cloudflare Pages / custom domain before launch.
  site: 'https://jcielalia.pages.dev',
  integrations: [sitemap()],
})
