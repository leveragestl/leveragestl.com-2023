import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4000,
    host: true
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), mdx(), vue()]
});