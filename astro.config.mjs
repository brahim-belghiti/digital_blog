import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
export default defineConfig({
  site: "https://astro-nano-demo.vercel.app",
  integrations: [mdx(), react(), sitemap(), tailwind()],
  adapter: vercel(),
});