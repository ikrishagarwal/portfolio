// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import rehypeExternalLinks from "rehype-external-links";

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
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["noopener", "noreferrer"],
          },
        ],
      ],
    }),
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
