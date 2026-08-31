# Content Inventory

This inventory is intentionally small for M0–M1. The pages currently in
`content/` are navigation placeholders plus three temporary graph-test notes;
they are not the course textbook.

## Classification

| Class                               | Meaning                                                                                         | Repository rule                                                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| A — authored/redistributable        | NT132 notes written by the project, or material whose license explicitly permits redistribution | May be committed after review and attribution metadata is recorded.                                                    |
| B — official course material        | UIT or instructor-provided slides, handouts, labs, or exams                                     | Rights and redistribution scope must be reviewed before committing. Prefer a link or an approved excerpt when unclear. |
| C — external/third-party references | Books, vendor documentation, articles, videos, and other external sources                       | Link to the canonical source; do not mirror the file or reproduce substantial text.                                    |

## Current inventory

| Path or item                                        | Class | Status                    | Notes                                                                                                      |
| --------------------------------------------------- | ----- | ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `content/index.md` and section indexes              | A     | Structural placeholder    | Navigation validation only.                                                                                |
| `content/Static-Routing.md`                         | A     | Temporary structural note | Graph/search/backlink validation only.                                                                     |
| `content/OSPF.md`                                   | A     | Temporary structural note | Graph/search/backlink validation only.                                                                     |
| `content/ACL.md`                                    | A     | Temporary structural note | Graph/search/backlink validation only.                                                                     |
| `content/static/images/`, `diagrams/`, `downloads/` | A     | Canonical asset scaffold  | Authored or redistributable non-Markdown assets; Quartz emits these under matching `public/static/` paths. |
| Future UIT-provided course files                    | B     | Rights review required    | Do not add until the instructor/course distribution terms are clear.                                       |
| Future external references                          | C     | Link only                 | Store citation/provenance metadata, not mirrored PDFs.                                                     |

No Studocu or Scribd document is copied into this repository. Third-party PDFs
and other restricted downloads remain out of scope until a redistribution right
is documented.
