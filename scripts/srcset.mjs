function isWhitespace(value) {
  return /\s/.test(value)
}

function isLikelyCandidateStart(value, start) {
  let cursor = start
  while (cursor < value.length && isWhitespace(value[cursor])) cursor += 1
  if (cursor >= value.length) return false

  const tokenStart = cursor
  while (cursor < value.length && !isWhitespace(value[cursor]) && value[cursor] !== ",") {
    cursor += 1
  }
  const token = value.slice(tokenStart, cursor)

  return (
    token.startsWith("./") ||
    token.startsWith("../") ||
    token.startsWith("/") ||
    token.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/i.test(token)
  )
}

function isCandidateSeparator(value, index) {
  if (value[index] !== ",") return false
  return isLikelyCandidateStart(value, index + 1)
}

/**
 * Parse srcset/imagesrcset candidates while preserving URL commas.
 * Each returned range points into the original value so callers can rewrite
 * only the URL and leave descriptors and formatting untouched.
 */
export function parseSrcsetCandidates(value) {
  const candidates = []
  let cursor = 0

  while (cursor < value.length) {
    while (cursor < value.length && (isWhitespace(value[cursor]) || value[cursor] === ",")) {
      cursor += 1
    }
    if (cursor >= value.length) break

    const urlStart = cursor
    let urlEnd = cursor
    let candidateFinished = false

    while (cursor < value.length) {
      if (isWhitespace(value[cursor])) {
        urlEnd = cursor
        while (cursor < value.length && isWhitespace(value[cursor])) cursor += 1

        const descriptorStart = cursor
        while (cursor < value.length && value[cursor] !== ",") cursor += 1

        candidates.push({
          url: value.slice(urlStart, urlEnd),
          descriptor: value.slice(descriptorStart, cursor).trim(),
          start: urlStart,
          end: urlEnd,
        })

        if (value[cursor] === ",") cursor += 1
        candidateFinished = true
        break
      }

      if (isCandidateSeparator(value, cursor)) {
        urlEnd = cursor
        candidates.push({
          url: value.slice(urlStart, urlEnd),
          descriptor: "",
          start: urlStart,
          end: urlEnd,
        })
        cursor += 1
        candidateFinished = true
        break
      }

      cursor += 1
    }

    if (!candidateFinished) {
      candidates.push({
        url: value.slice(urlStart),
        descriptor: "",
        start: urlStart,
        end: value.length,
      })
      cursor = value.length
    }
  }

  return candidates
}
