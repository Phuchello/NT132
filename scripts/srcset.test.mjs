import assert from "node:assert/strict"
import test from "node:test"
import { parseSrcsetCandidates } from "./srcset.mjs"

test("parses srcset and imagesrcset candidates without corrupting URL commas", () => {
  const cases = [
    {
      label: "bare relative candidates without descriptors",
      value: "small.png, large.png",
      urls: ["small.png", "large.png"],
      descriptors: ["", ""],
    },
    {
      label: "bare relative candidate followed by a width candidate",
      value: "images/small.png, images/large.png 2x",
      urls: ["images/small.png", "images/large.png"],
      descriptors: ["", "2x"],
    },
    {
      label: "bare relative candidate followed by dot-relative candidate",
      value: "small.png, ./large.png",
      urls: ["small.png", "./large.png"],
      descriptors: ["", ""],
    },
    {
      label: "pixel density candidates",
      value: "./small.png 1x, ./large.png 2x",
      urls: ["./small.png", "./large.png"],
      descriptors: ["1x", "2x"],
    },
    {
      label: "width descriptor",
      value: "./wide.png 400w",
      urls: ["./wide.png"],
      descriptors: ["400w"],
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
      label: "absolute URL",
      value: "https://example.com/a.png 1x",
      urls: ["https://example.com/a.png"],
      descriptors: ["1x"],
    },
    {
      label: "protocol-relative URL",
      value: "//cdn.example.com/a.png 2x",
      urls: ["//cdn.example.com/a.png"],
      descriptors: ["2x"],
    },
    {
      label: "imagesrcset candidate grammar",
      value: "./preview.png 400w, https://cdn.example.com/full.png 800w",
      urls: ["./preview.png", "https://cdn.example.com/full.png"],
      descriptors: ["400w", "800w"],
    },
    {
      label: "first candidate without descriptor",
      value: "small.png, ./large.png 2x",
      urls: ["small.png", "./large.png"],
      descriptors: ["", "2x"],
    },
    {
      label: "mixed bare-relative and parent-relative candidates",
      value: "images/small.png, ../large.png 400w",
      urls: ["images/small.png", "../large.png"],
      descriptors: ["", "400w"],
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
