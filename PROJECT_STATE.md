# NT132 Project State

Current milestone: M2 — Content planning and taxonomy review

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
- Previous generated-artifact audit after the relative-link fix found zero missing local references across 312 checked `href`/`src`/`srcset` targets.
- Public artifact text audit found no `M1`, `M2`, `placeholder`, `scaffold`, `migration`, `agent workflow`, `AI-generated`, or `TODO` leakage.

M2 open gates:

- Run CI on the current remediation HEAD after the source-classification and lab-index updates.
- Re-inspect the generated artifact for broken internal routes and public scaffolding leakage.
- Reply to the four Codex findings with implementation evidence and request a current-HEAD re-review.
- Merge PR #3 only after current-head CI is green and Codex has no remaining P1/P2 findings.

Exact next action: validate the current M2 HEAD in CI and the generated artifact, then request Codex re-review. Do not merge PR #3 until both gates are clean.
