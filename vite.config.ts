import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/van-element.js",
      name: "vanE",
      formats: ["umd"],
      fileName: "van-element",
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
