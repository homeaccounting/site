import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Static marketing site. `site` fixes canonical URLs + sitemap to the www apex.
export default defineConfig({
  site: 'https://www.homeaccounting.com',
  output: 'static',
  // @astrojs/sitemap pinned to exact 3.6.0 in package.json — 3.6.1+ require the Astro 5 astro:routes:resolved hook and crash under Astro 4. Do not loosen.
  integrations: [tailwind(), sitemap()],
});
