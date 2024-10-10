import { build } from "vite";
import chalk from "chalk";
import { gzipSizeSync } from "gzip-size";
import { minify } from "terser";

async function compress(content: string, file: string) {
  const result = await minify(content, {
    compress: true,
    toplevel: true,
    mangle: true,
  });
  await Bun.write(file, result.code!);
  console.log(
    `${file}  ` +
      chalk.gray(
        `${Buffer.from(result.code!).length} B | gzip: ${gzipSizeSync(
          result.code!
        )} B`
      )
  );
}

const inputFilePath = "src/van-element.js";
const outputModuleFilePath = "dist/van-element.js";
const outputBrowserFilePath = "dist/van-element.browser.js";

// vite build
await build();

// custom build - optimize output size
const timer = Date.now();
console.log(chalk.grey(`\nbuilding esm and iife version...`));

const bundle = await Bun.file(inputFilePath).text();
const lines = bundle.split("\n");
const filteredLines = lines.filter(
  (line) =>
    !line.trim().startsWith("export") && !line.trim().startsWith("import")
);
const updatedContent = filteredLines.join("\n");
const finalContent = `${updatedContent}window.vanE={define}`;

console.log(`${chalk.green("✓")} transformed iife`);

await compress(finalContent, outputBrowserFilePath);
await compress(bundle, outputModuleFilePath);
console.log(chalk.green(`✓ build in ${Date.now() - timer}ms`));
