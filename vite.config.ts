import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ entryRoot: "src", exclude: ["src/showcase.ts"] })],
  build: {
    lib: {
      entry: "src/van-element.js",
      name: "vanE",
      fileName: (format) =>
        `van-element${format == "umd" ? ".umd" : ""}.min.js`,
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
