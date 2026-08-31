# NT132 Project State

Current milestone: M2 — Content planning and taxonomy

Last safe checkpoint: M1 is production-complete. PR #2 production polish was merged as `120930784026d596ade8e2c85874430e234dd20d`; GitHub Actions run #14 built and deployed successfully.

Current branch: feat/m2-content-taxonomy

Latest production commit: 120930784026d596ade8e2c85874430e234dd20d

M1 production verification:

- Quartz build, tests, route preparation, and route tests pass in CI.
- GitHub Pages production deployment passes from `main`.
- Generated artifact contains the expected top-level and extensionless nested routes.
- Static artifact validation found no missing internal `href`, `src`, or `srcset` targets across 160 checked local references.
- Root `404.html` remains reserved while nested `404.html` notes can receive extensionless routes.
- Footer attribution no longer mislabels the NT132 package version as the Quartz framework version.
- Open Graph MIME metadata emits valid `image/webp` or `image/png` values.

M2 work completed so far:

- Added `M2_CONTENT_PLAN.md` with the canonical course taxonomy, source map, naming rules, cross-link backbone, and M3 migration order.
- Added `CONTENT_TEMPLATE.md` for theory, practical labs, exam-prep pages, and project/case-study pages.
- Mapped the 19 primary course-source files into canonical topic groups.
- Classified `Group07_PreReport.docx` as case-study-only rather than a canonical theory source.

M2 open gates:

- Review the taxonomy/source map for omissions and duplicate concepts.
- Create the destination folder/index skeleton without migrating full theory content yet.
- Run CI and inspect the generated artifact for the completed M2 planning branch.

Exact next action: Create the M2 folder/index skeleton from `M2_CONTENT_PLAN.md`, validate navigation/build output, then open the M2 planning PR for review.
