import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const outputDirectory = path.resolve("public")

async function collectHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectHtml(entryPath)))
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath)
    }
  }

  return files
}

const htmlFiles = await collectHtml(outputDirectory)
let preparedPages = 0

for (const htmlFile of htmlFiles) {
  const relativeFile = path.relative(outputDirectory, htmlFile)
  const basename = path.basename(relativeFile, ".html")

  // Folder indexes already work on GitHub Pages. The 404 document must remain
  // at the Pages-reserved root name, and the home page is already index.html.
  if (basename === "index" || basename === "404") continue

  const targetDirectory = path.join(path.dirname(htmlFile), basename)
  const targetFile = path.join(targetDirectory, "index.html")
  const depthFromRoot = path.relative(outputDirectory, targetDirectory).split(path.sep).length
  const rootPrefix = "../".repeat(depthFromRoot)
  const original = await readFile(htmlFile, "utf8")
  const rewritten = original
    .replaceAll('href="./', `href="${rootPrefix}`)
    .replaceAll('src="./', `src="${rootPrefix}`)
    .replaceAll('fetch("./', `fetch("${rootPrefix}`)

  await mkdir(targetDirectory, { recursive: true })
  await writeFile(targetFile, rewritten)
  preparedPages += 1
}

console.log(`Prepared ${preparedPages} extensionless GitHub Pages route(s).`)
