import node from "@astrojs/node";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [svelte()],
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
      noExternal: ["lucide-svelte"],
    },
    css: {
      transformer: "postcss",
    },
  },
});
