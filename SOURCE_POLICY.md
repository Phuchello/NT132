# Source Policy

NT132 is a connected course knowledge base, not a document mirror. Every
future page or downloadable asset must have a traceable origin and a clear
redistribution decision.

The repository vendors the Quartz framework under its MIT license. That
license applies to the Quartz framework source and permitted derivatives only;
it does not relicense NT132 course content. See [NOTICE.md](NOTICE.md) and
[LICENSES/Quartz-LICENSE.txt](LICENSES/Quartz-LICENSE.txt) for the attribution
boundary.

Project-owned non-Markdown assets belong under
`content/static/images/`, `content/static/diagrams/`, or
`content/static/downloads/`. Quartz's `Plugin.Assets()` emits them under the
corresponding `public/static/` paths. Do not place NT132 assets in the
repository root `static/` directory or in vendored `quartz/static/`.

## Rules

1. Prefer notes authored for this repository and label them as Class A.
2. Treat official UIT or instructor material as Class B until its rights and
   intended distribution are reviewed.
3. Treat books, vendor documentation, websites, videos, exam banks, and other
   third-party material as Class C: link to the canonical source and cite it;
   do not upload or mirror the original file.
4. Do not copy or redistribute Studocu, Scribd, or similar hosted documents.
5. For any asset that is allowed into the repository, record the author or
   publisher, canonical URL, license or permission basis, access date, and any
   required attribution.
6. Quote only what is necessary for commentary or teaching, and keep the
   source link next to the quotation or paraphrase.

## Review record template

Use this record before adding a non-authored source:

```text
Item:
Class: A / B / C
Author or publisher:
Canonical URL:
License or permission basis:
Accessed:
Redistribution decision:
Attribution required:
Reviewer:
```
