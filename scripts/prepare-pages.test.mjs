import assert from "node:assert/strict"
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { parse } from "parse5"
import { preparePages, rebaseRelativeUrl } from "./prepare-pages.mjs"

const testOrigin = "https://nt132.invalid"

function fixture({ css, js, contentIndex, icon, internal, srcset }) {
  return `<!doctype html>
<html><head>
  <link data-test="css" rel="stylesheet" href="${css}">
  <link data-test="icon" rel="icon" href="${icon}">
  <script data-test="js" src="${js}"></script>
  <script data-test="contentIndex">const fetchData = fetch("${contentIndex}")</script>
</head><body>
  <a data-test="internal" href="${internal}">Internal</a>
  <img data-test="static" src="${icon}" alt="static asset">
  <img data-test="srcset" srcset="${srcset}" alt="responsive asset">
  <a data-test="anchor" href="#section">Anchor</a>
  <a data-test="absolute" href="https://example.com/reference">Absolute</a>
  <a data-test="root" href="/NT132/index.css">Root-relative</a>
  <a data-test="protocol" href="//cdn.example.com/file.js">Protocol-relative</a>
  <a data-test="mailto" href="mailto:student@example.com">Mail</a>
  <a data-test="tel" href="tel:+84123456789">Phone</a>
</body></html>`
}

const pages = [
  {
    source: "index.html",
    route: "/",
    expected: {
      css: "./index.css",
      js: "./prescript.js",
      contentIndex: "./static/contentIndex.json",
      icon: "./static/icon.png",
      internal: "./ly-thuyet/",
      srcset: "./small.png 1x, ./large.png 2x",
    },
  },
  {
    source: "ly-thuyet/index.html",
    route: "/ly-thuyet/",
    expected: {
      css: "../index.css",
      js: "../prescript.js",
      contentIndex: "../static/contentIndex.json",
      icon: "../static/icon.png",
      internal: "../",
      srcset: "../small.png 1x, ./large.png 2x",
    },
  },
  {
    source: "ly-thuyet/static-routing.html",
    route: "/ly-thuyet/static-routing/",
    expected: {
      css: "../../index.css",
      js: "../../prescript.js",
      contentIndex: "../../static/contentIndex.json",
      icon: "../../static/icon.png",
      internal: "../routing/ospf",
      srcset: "data:image/png;base64,AAAA 1x, ../../small.png 2x",
    },
    original: {
      css: "../index.css",
      js: "../prescript.js",
      contentIndex: "../static/contentIndex.json",
      icon: "../static/icon.png",
      internal: "./routing/ospf",
      srcset: "data:image/png;base64,AAAA 1x, ../small.png 2x",
    },
  },
  {
    source: "ly-thuyet/routing/ospf.html",
    route: "/ly-thuyet/routing/ospf/",
    expected: {
      css: "../../../index.css",
      js: "../../../prescript.js",
      contentIndex: "../../../static/contentIndex.json",
      icon: "../../../static/icon.png",
      internal: "../../static-routing",
      srcset: "../../../small.png?crop=1,2 1x, ../large.png 2x",
    },
    original: {
      css: "../../index.css",
      js: "../../prescript.js",
      contentIndex: "../../static/contentIndex.json",
      icon: "../../static/icon.png",
      internal: "../static-routing",
      srcset: "../../small.png?crop=1,2 1x, ./large.png 2x",
    },
  },
]

function findTestAttributes(document) {
  const attributes = new Map()

  function visit(node) {
    const marker = node.attrs?.find((attribute) => attribute.name === "data-test")
    if (marker) {
      const value = node.attrs.find((attribute) =>
        ["href", "src", "srcset"].includes(attribute.name),
      )
      if (value) attributes.set(marker.value, value.value)
      if (marker.value === "contentIndex") {
        const scriptText = node.childNodes?.find((child) => child.nodeName === "#text")?.value
        const match = scriptText?.match(/fetch\("([^"]+)"\)/)
        if (match) attributes.set(marker.value, match[1])
      }
    }

    for (const child of node.childNodes ?? []) visit(child)
  }

  visit(document)
  return attributes
}

function findMetaRefreshContents(document) {
  const contents = []

  function visit(node) {
    if (node.nodeName === "meta") {
      const httpEquiv = node.attrs?.find((attribute) => attribute.name === "http-equiv")
      const content = node.attrs?.find((attribute) => attribute.name === "content")
      if (httpEquiv?.value.trim().toLowerCase() === "refresh" && content) {
        contents.push(content.value)
      }
    }

    for (const child of node.childNodes ?? []) visit(child)
  }

  visit(document)
  return contents
}

function refreshUrl(content) {
  const match = content.match(/(?:^|;)\s*url\s*=\s*(?:(['"])(.*?)\1|([^;\s>"']+))/i)
  assert.ok(match, `expected a meta refresh URL in ${content}`)
  return match[2] ?? match[3]
}

function expectedPath(key, page) {
  if (key === "internal") {
    return page.route.includes("static-routing")
      ? "/ly-thuyet/routing/ospf"
      : "/ly-thuyet/static-routing"
  }

  return {
    css: "/index.css",
    js: "/prescript.js",
    contentIndex: "/static/contentIndex.json",
    icon: "/static/icon.png",
  }[key]
}

test("rebases generated URLs for root, folder, and nested routes", async () => {
  const outputRoot = await mkdtemp(path.join(os.tmpdir(), "nt132-pages-"))

  try {
    for (const page of pages) {
      const sourcePath = path.join(outputRoot, page.source)
      await mkdir(path.dirname(sourcePath), { recursive: true })
      await writeFile(sourcePath, fixture(page.original ?? page.expected))
    }

    assert.equal(await preparePages(outputRoot), 2)

    for (const page of pages) {
      const relativeRoute = page.source.endsWith("index.html")
        ? page.source
        : page.source.replace(/\.html$/, "/index.html")
      const html = await readFile(path.join(outputRoot, relativeRoute), "utf8")
      const actual = findTestAttributes(parse(html))

      for (const key of ["css", "js", "contentIndex", "icon", "internal"]) {
        assert.equal(actual.get(key), page.expected[key], `${page.route} ${key}`)

        if (page.route.includes("static-routing") || page.route.includes("routing/ospf")) {
          assert.equal(
            new URL(actual.get(key), `${testOrigin}${page.route}`).pathname,
            expectedPath(key, page),
            `${page.route} ${key} target`,
          )
        }
      }

      assert.equal(actual.get("srcset"), page.expected.srcset, `${page.route} srcset`)

      assert.equal(actual.get("anchor"), "#section")
      assert.equal(actual.get("absolute"), "https://example.com/reference")
      assert.equal(actual.get("root"), "/NT132/index.css")
      assert.equal(actual.get("protocol"), "//cdn.example.com/file.js")
      assert.equal(actual.get("mailto"), "mailto:student@example.com")
      assert.equal(actual.get("tel"), "tel:+84123456789")
    }
  } finally {
    await rm(outputRoot, { recursive: true, force: true })
  }
})

test("keeps anchors, root-relative URLs, and protocol URLs unchanged", () => {
  const original = "/ly-thuyet/routing/ospf"
  const destination = "/ly-thuyet/routing/ospf/"

  assert.equal(rebaseRelativeUrl("#section", original, destination), "#section")
  assert.equal(rebaseRelativeUrl("/NT132/index.css", original, destination), "/NT132/index.css")
  assert.equal(
    rebaseRelativeUrl("https://example.com/file.js", original, destination),
    "https://example.com/file.js",
  )
  assert.equal(
    rebaseRelativeUrl("mailto:test@example.com", original, destination),
    "mailto:test@example.com",
  )
  assert.equal(rebaseRelativeUrl("tel:+84123456789", original, destination), "tel:+84123456789")
})

test("preserves an existing FolderPage during a same-slug collision", async () => {
  const outputRoot = await mkdtemp(path.join(os.tmpdir(), "nt132-pages-collision-"))
  const topicDirectory = path.join(outputRoot, "topic")
  const folderPage = `<!doctype html><html><body><main data-page="FolderPage">Child listing</main></body></html>`
  const standalonePage = `<!doctype html><html><body><main data-page="StandalonePage">Standalone note</main></body></html>`
  const childPage = `<!doctype html><html><body><main data-page="ChildPage"><a data-test="parent" href="./">Parent</a></main></body></html>`

  try {
    await mkdir(topicDirectory, { recursive: true })
    await writeFile(path.join(outputRoot, "topic.html"), standalonePage)
    await writeFile(path.join(topicDirectory, "index.html"), folderPage)
    await writeFile(path.join(topicDirectory, "child.html"), childPage)

    assert.equal(await preparePages(outputRoot), 1)
    assert.equal(await readFile(path.join(topicDirectory, "index.html"), "utf8"), folderPage)

    const childOutput = await readFile(path.join(topicDirectory, "child", "index.html"), "utf8")
    assert.match(childOutput, /data-page="ChildPage"/)
    assert.match(childOutput, /href="\.\.\/"/)
  } finally {
    await rm(outputRoot, { recursive: true, force: true })
  }
})

test("rebases alias meta refresh targets without changing their canonical destination", async () => {
  const outputRoot = await mkdtemp(path.join(os.tmpdir(), "nt132-pages-alias-"))
  const pages = [
    {
      source: "alias.html",
      route: "/alias",
      content: '<meta http-equiv="refresh" content="0; url=./target">',
      expected: "0; url=../target",
    },
    {
      source: "folder/old.html",
      route: "/folder/old",
      content: '<meta http-equiv="refresh" content="5;url=../target">',
      expected: "5;url=../../target",
    },
    {
      source: "case.html",
      route: "/case",
      content: '<meta HTTP-EQUIV="Refresh" content="0; URL=./target">',
      expected: "0; URL=../target",
    },
    {
      source: "quoted.html",
      route: "/quoted",
      content: `<meta http-equiv="refresh" content="7;  url='./target'">
<meta http-equiv="refresh" content='8;url="./target"'>`,
      expected: ["7;  url='../target'", '8;url="../target"'],
    },
    {
      source: "preserved.html",
      route: "/preserved",
      content: `<meta http-equiv="refresh" content="0; url=https://example.com/x">
<meta http-equiv="refresh" content="0; url=/root/path">
<meta http-equiv="refresh" content="0; url=#fragment">`,
      expected: ["0; url=https://example.com/x", "0; url=/root/path", "0; url=#fragment"],
    },
  ]

  try {
    for (const page of pages) {
      const sourcePath = path.join(outputRoot, page.source)
      await mkdir(path.dirname(sourcePath), { recursive: true })
      await writeFile(sourcePath, `<!doctype html><html><head>${page.content}</head></html>`)
    }

    assert.equal(await preparePages(outputRoot), pages.length)

    for (const page of pages) {
      const outputPath = page.source.replace(/\.html$/, "/index.html")
      const output = parse(await readFile(path.join(outputRoot, outputPath), "utf8"))
      const actual = findMetaRefreshContents(output)
      const expected = Array.isArray(page.expected) ? page.expected : [page.expected]
      assert.deepEqual(actual, expected, `${page.route} meta refresh content`)

      if (!Array.isArray(page.expected)) {
        const beforePath = new URL(refreshUrl(page.content), `${testOrigin}${page.route}`).pathname
        const afterPath = new URL(refreshUrl(actual[0]), `${testOrigin}${page.route}/`).pathname
        assert.equal(afterPath, beforePath, `${page.route} canonical target`)
      }
    }
  } finally {
    await rm(outputRoot, { recursive: true, force: true })
  }
})
