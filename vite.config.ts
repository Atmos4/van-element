import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/van-element.js",
      name: "vanE",
      fileName: (format, entryName) =>
        `${entryName}-${process.env.npm_package_version}${
          format == "umd" ? ".nomodule" : ""
        }.min.js`,
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
