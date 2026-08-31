import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { parse, serialize } from "parse5"

const outputDirectory = path.resolve("public")
const urlBase = "https://nt132.invalid"

const relativeUrlAttributes = new Set([
  "action",
  "cite",
  "data",
  "formaction",
  "href",
  "icon",
  "longdesc",
  "manifest",
  "poster",
  "profile",
  "src",
  "usemap",
  "xlink:href",
])

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

function isRelativeUrl(value) {
  return (
    value.length > 0 &&
    !value.startsWith("#") &&
    !value.startsWith("?") &&
    !value.startsWith("/") &&
    !value.startsWith("//") &&
    !/^[a-z][a-z\d+.-]*:/i.test(value)
  )
}

function replaceTrimmedValue(value, replace) {
  const trimmed = value.trim()
  if (!trimmed) return value

  const start = value.indexOf(trimmed)
  return `${value.slice(0, start)}${replace(trimmed)}${value.slice(start + trimmed.length)}`
}

function relativePathFrom(destinationPath, targetPath) {
  const destinationDirectory = destinationPath.endsWith("/")
    ? destinationPath
    : `${path.posix.dirname(destinationPath)}/`
  let relativePath = path.posix.relative(destinationDirectory, targetPath)

  if (!relativePath) relativePath = "."
  if (targetPath.endsWith("/") && !relativePath.endsWith("/")) {
    relativePath += "/"
  }

  return relativePath
}

export function rebaseRelativeUrl(value, originalDocumentUrl, destinationDocumentUrl) {
  return replaceTrimmedValue(value, (trimmed) => {
    if (!isRelativeUrl(trimmed)) return trimmed

    try {
      const originalUrl = new URL(originalDocumentUrl, urlBase)
      const destinationUrl = new URL(destinationDocumentUrl, urlBase)
      const targetUrl = new URL(trimmed, originalUrl)

      if (targetUrl.origin !== destinationUrl.origin) return trimmed

      const relativePath = relativePathFrom(destinationUrl.pathname, targetUrl.pathname)
      return `${relativePath}${targetUrl.search}${targetUrl.hash}`
    } catch {
      return trimmed
    }
  })
}

function rebaseSrcset(value, originalDocumentUrl, destinationDocumentUrl) {
  let cursor = 0
  let rewritten = ""

  while (cursor < value.length) {
    const leadingStart = cursor
    while (/\s/.test(value[cursor] ?? "")) cursor += 1

    const urlStart = cursor
    while (cursor < value.length) {
      const character = value[cursor]
      const nextCharacter = value[cursor + 1]
      if (/\s/.test(character)) break
      if (character === "," && /\s/.test(nextCharacter ?? "")) break
      cursor += 1
    }

    if (urlStart === cursor) {
      rewritten += value[cursor]
      cursor += 1
      continue
    }

    const descriptorStart = cursor
    while (/\s/.test(value[cursor] ?? "")) cursor += 1
    if (descriptorStart !== cursor) {
      while (cursor < value.length && value[cursor] !== ",") cursor += 1
    }

    rewritten += value.slice(leadingStart, urlStart)
    rewritten += rebaseRelativeUrl(
      value.slice(urlStart, descriptorStart),
      originalDocumentUrl,
      destinationDocumentUrl,
    )
    rewritten += value.slice(descriptorStart, cursor)

    if (value[cursor] === ",") {
      rewritten += ","
      cursor += 1
    }
  }

  return rewritten
}

function rebaseSpaceSeparatedUrls(value, originalDocumentUrl, destinationDocumentUrl) {
  return value.replace(/\S+/g, (candidate) =>
    rebaseRelativeUrl(candidate, originalDocumentUrl, destinationDocumentUrl),
  )
}

function rebaseFetchCalls(value, originalDocumentUrl, destinationDocumentUrl) {
  return value.replace(
    /(\bfetch\s*\(\s*)(["'`])([^"'`]*?)\2/g,
    (match, prefix, quote, fetchUrl) =>
      `${prefix}${quote}${rebaseRelativeUrl(fetchUrl, originalDocumentUrl, destinationDocumentUrl)}${quote}`,
  )
}

function rewriteHtml(html, originalDocumentUrl, destinationDocumentUrl) {
  const document = parse(html)

  function visit(node) {
    for (const attribute of node.attrs ?? []) {
      const attributeName = attribute.name.toLowerCase()
      if (relativeUrlAttributes.has(attributeName)) {
        attribute.value = rebaseRelativeUrl(
          attribute.value,
          originalDocumentUrl,
          destinationDocumentUrl,
        )
      } else if (attributeName === "srcset" || attributeName === "imagesrcset") {
        attribute.value = rebaseSrcset(attribute.value, originalDocumentUrl, destinationDocumentUrl)
      } else if (attributeName === "ping") {
        attribute.value = rebaseSpaceSeparatedUrls(
          attribute.value,
          originalDocumentUrl,
          destinationDocumentUrl,
        )
      }
    }

    if (node.nodeName === "script") {
      for (const child of node.childNodes ?? []) {
        if (child.nodeName === "#text") {
          child.value = rebaseFetchCalls(child.value, originalDocumentUrl, destinationDocumentUrl)
        }
      }
    }

    for (const child of node.childNodes ?? []) visit(child)
    if (node.content) visit(node.content)
  }

  visit(document)
  return serialize(document)
}

function routeUrl(relativeFile) {
  const routePath = relativeFile.replace(/\.html$/, "")
  return new URL(`/${routePath}`, urlBase)
}

function destinationUrl(outputRoot, targetDirectory) {
  const relativeDirectory = path.relative(outputRoot, targetDirectory).split(path.sep).join("/")
  return new URL(`/${relativeDirectory}/`, urlBase)
}

export async function preparePages(directory = outputDirectory) {
  const outputRoot = path.resolve(directory)
  const htmlFiles = await collectHtml(outputRoot)
  let preparedPages = 0

  for (const htmlFile of htmlFiles) {
    const relativeFile = path.relative(outputRoot, htmlFile).split(path.sep).join("/")
    const basename = path.posix.basename(relativeFile, ".html")

    // Folder indexes already work on GitHub Pages. The 404 document must remain
    // at the Pages-reserved root name, and the home page is already index.html.
    if (basename === "index" || basename === "404") continue

    const targetDirectory = path.join(path.dirname(htmlFile), basename)
    const targetFile = path.join(targetDirectory, "index.html")

    // Quartz can emit both a standalone page and a FolderPage for the same
    // slug. Preserve the generated FolderPage instead of overwriting it.
    try {
      await access(targetFile)
      continue
    } catch (error) {
      if (error.code !== "ENOENT") throw error
    }

    const original = await readFile(htmlFile, "utf8")
    const rewritten = rewriteHtml(
      original,
      routeUrl(relativeFile),
      destinationUrl(outputRoot, targetDirectory),
    )

    await mkdir(targetDirectory, { recursive: true })
    await writeFile(targetFile, rewritten)
    preparedPages += 1
  }

  return preparedPages
}

const invokedScript =
  process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url

if (invokedScript) {
  const preparedPages = await preparePages()
  console.log(`Prepared ${preparedPages} extensionless GitHub Pages route(s).`)
}
