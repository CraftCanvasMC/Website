import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import remarkCallouts from "./src/lib/remark-callouts";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [svelte()],
  markdown: {
    remarkPlugins: [remarkDirective, remarkCallouts],
  },
  image: {
    domains: ["raw.githubusercontent.com"],
  },
  server: {
    port: 3000,
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: /^lucide-svelte$/, replacement: "/src/lib/lucide-compat.ts" },
      ],
      noExternal: ["@lucide/svelte", "lucide-svelte"],
    },
    css: {
      transformer: "postcss",
    },
  },
});
