import assert from "node:assert/strict"
import test from "node:test"
import { parseSrcsetCandidates } from "./srcset.mjs"

test("parses srcset and imagesrcset candidates without corrupting URL commas", () => {
  const cases = [
    {
      label: "pixel density 1x",
      value: "./small.png 1x",
      urls: ["./small.png"],
      descriptors: ["1x"],
    },
    {
      label: "pixel density 2x",
      value: "./large.png 2x",
      urls: ["./large.png"],
      descriptors: ["2x"],
    },
    {
      label: "width descriptor",
      value: "./wide.png 400w",
      urls: ["./wide.png"],
      descriptors: ["400w"],
    },
    {
      label: "multiple normal candidates",
      value: "./small.png 1x, ./large.png 2x",
      urls: ["./small.png", "./large.png"],
      descriptors: ["1x", "2x"],
    },
    {
      label: "data URL containing commas",
      value: "data:image/svg+xml,%3Csvg%3E,%3C/svg%3E 1x, ./fallback.png 2x",
      urls: ["data:image/svg+xml,%3Csvg%3E,%3C/svg%3E", "./fallback.png"],
      descriptors: ["1x", "2x"],
    },
    {
      label: "ordinary URL containing a query comma",
      value: "./image.png?crop=1,2 1x, ./other.png 2x",
      urls: ["./image.png?crop=1,2", "./other.png"],
      descriptors: ["1x", "2x"],
    },
    {
      label: "imagesrcset uses the same candidate grammar",
      value: "./preview.png 400w, https://cdn.example.com/full.png 800w",
      urls: ["./preview.png", "https://cdn.example.com/full.png"],
      descriptors: ["400w", "800w"],
    },
    {
      label: "absolute and data URLs remain identifiable",
      value: "https://example.com/a.png 1x, data:image/png;base64,AAAA 2x",
      urls: ["https://example.com/a.png", "data:image/png;base64,AAAA"],
      descriptors: ["1x", "2x"],
    },
  ]

  for (const entry of cases) {
    const candidates = parseSrcsetCandidates(entry.value)
    assert.deepEqual(
      candidates.map((candidate) => candidate.url),
      entry.urls,
      entry.label,
    )
    assert.deepEqual(
      candidates.map((candidate) => candidate.descriptor),
      entry.descriptors,
      `${entry.label} descriptors`,
    )
  }
})
