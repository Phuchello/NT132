# NT132 Project State

Current milestone: M2 — Final remediation and review

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

M2 work completed:

- Added `M2_CONTENT_PLAN.md` with the canonical course taxonomy, naming/link rules, source map, cross-link backbone, and M3 migration order.
- Added `CONTENT_TEMPLATE.md` for theory, practical labs, exam-prep pages, and project/case-study pages.
- Mapped all 19 primary course PDFs to canonical topic groups and conservatively classified them as Class B with redistribution review required.
- Classified `Group07_PreReport.docx` as Class C, case-study/reference only.
- Created the theory and practical folder/index skeleton without migrating full chapter content.
- Replaced future-work lab placeholder prose with durable student-facing learning goals and prerequisite links.
- Switched Quartz internal Markdown resolution to explicit relative-path semantics so section navigation preserves directory intent.
- Generated-artifact validation after the relative-link fix found zero missing local references.
- Removed the three legacy public graph-test notes (`Static-Routing.md`, `OSPF.md`, `ACL.md`) after current-head Codex review correctly identified their M1/scaffolding metadata and prose as an M2 publication leak.

M2 review history:

- First Codex review found one P1 and three P2 findings covering link semantics, public lab scaffolding, source classification, and stale project state; all four were remediated and their threads are outdated.
- Current-head Codex re-review found one additional valid P2: remove or exclude the three legacy M1 graph-test notes. They have now been deleted from the M2 branch.

M2 open gates:

- Run CI on the current HEAD after deletion of the legacy graph-test notes.
- Re-inspect the generated artifact for broken local references and verify the legacy routes/prose are absent.
- Reply to the current Codex P2 with implementation evidence and request another current-head re-review.
- Merge PR #3 only after current-head CI, artifact audit, and Codex review are all clean.

Exact next action: validate the current HEAD, close the legacy graph-test-note P2, request Codex re-review, and merge PR #3 only if no current P1/P2 remains.
