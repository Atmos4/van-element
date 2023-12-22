import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/van-element.js",
      name: "vanE",
    },
    rollupOptions: {
      external: ["vanjs-core"],
      output: {
        globals: {
          "vanjs-core": "van",
        },
      },
    },
  },
});
