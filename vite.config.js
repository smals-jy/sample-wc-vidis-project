// https://vite.dev/guide/static-deploy.html#github-pages

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
   base: process.env.GITHUB_URL || "/"
})
