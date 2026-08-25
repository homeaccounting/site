import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Static marketing site. `site` fixes canonical URLs + sitemap to the www apex.
export default defineConfig({
  site: 'https://www.homeaccounting.com',
  output: 'static',
  integrations: [tailwind(), sitemap()],
});
