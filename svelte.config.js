import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter({ out: "build", precompress: true }),
    prerender: {
      handleHttpError: "warn",
    },
  },
  preprocess: vitePreprocess(),
  runes: true,
  compilerOptions: {
    runes: true,
  },
  vitePlugin: { emitCss: true, inspector: true },
};
