import { promises as fs } from "fs";
import { minify } from "terser";
import { gzipSizeSync } from "gzip-size";
import chalk from "chalk";

async function compress(content, file) {
  const result = await minify(content, {
    compress: true,
    toplevel: true,
    mangle: true,
  });
  await fs.writeFile(file, result.code, "utf8");
  console.log(
    `${file}  ` +
      chalk.gray(
        `${Buffer.from(result.code).length} B | gzip: ${gzipSizeSync(
          result.code
        )} B`
      )
  );
}

const inputFilePath = "src/van-element.js";
const outputModuleFilePath = "dist/van-element.js";
const outputBrowserFilePath = "dist/van-element.browser.js";

const bundle = await fs.readFile(inputFilePath, "utf8");

const lines = bundle.split("\n");
const filteredLines = lines.filter(
  (line) =>
    !line.trim().startsWith("export") && !line.trim().startsWith("import")
);
const updatedContent = filteredLines.join("\n");
const finalContent = `${updatedContent}window.vanE={define}`;

console.log(chalk.green(`✓ transformed ${inputFilePath}`));

await compress(finalContent, outputBrowserFilePath);
await compress(bundle, outputModuleFilePath);
