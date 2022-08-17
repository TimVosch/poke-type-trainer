import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  resolve: {
    alias: {
      react: "preact/compat",
    },
  },
});
