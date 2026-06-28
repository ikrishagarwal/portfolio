// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = process.env.SITE || "https://ikrish.dev";
const ignoredURLs = ["/fonts/"];
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    server: {
      watch: {
        ignored: [
          "**/.obsidian/**", //
          "**/_bases/**",
          "**/_home/**",
          "**/_base/**",
        ],
        // usePolling: true,
      },
    },
    assetsInclude: ["**/*.base", "**/.obsidian/**", "**/_bases/**"],
    plugins: [
      tailwindcss({
        optimize: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },

  integrations: [
    sitemap({
      filter: (page) => {
        for (const url of ignoredURLs) {
          if (page.startsWith(`${SITE_URL}${url}`)) return false;
        }

        return true;
      },
    }),
  ],
});
