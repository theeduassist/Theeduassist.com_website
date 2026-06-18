
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://theeduassist.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        page !== 'https://theeduassist.com/thank-you/' &&
        !page.includes('/studio/') &&
        !page.includes('/preview/') &&
        !page.includes('/admin/') &&
        !page.includes('/drafts/') &&
        !page.includes('/internal/')
    })
  ],
});
