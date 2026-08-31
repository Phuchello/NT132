# NT132 Project State

Current milestone: M2 — Final acceptance

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
- Removed the three legacy public graph-test notes (`Static-Routing.md`, `OSPF.md`, `ACL.md`) because they were M1-only structural fixtures and leaked temporary project prose into the M2 artifact.

M2 verification:

- All five Codex findings discovered during M2 were independently reproduced and remediated: one P1 for navigation semantics and four P2 findings covering lab scaffolding, source classification, stale state, and legacy graph-test publication.
- GitHub Actions run #34 on remediation commit `524013fc24278004d10dc38c0e492560b143f8ad` passed type/format checks, 74/74 tests, Quartz build, Pages route preparation, route tests, and artifact upload.
- Independent inspection of that Pages artifact checked 244 local `href`/`src`/`srcset` references with zero missing targets.
- The legacy `Static-Routing`, `OSPF`, and `ACL` HTML/extensionless routes are absent.
- Visible-page text has zero hits for M1/M2 milestone language, placeholder/scaffold/migration/TODO wording, `Temporary structural note`, `graph-test`, or `M1 foundation`.
- A final `@codex review` was requested on the remediated HEAD, but GitHub's Codex bot returned a code-review usage-limit message before performing another review. This is recorded as an external review-availability limitation, not an unresolved code finding.

M2 acceptance contingency:

- Because the final Codex re-review is unavailable due to quota, the merge gate falls back to current-head CI plus independent generated-artifact inspection and direct verification of every known P1/P2 remediation.
- PR #3 may be merged only if CI on this checkpoint remains green and no new non-outdated P1/P2 thread appears.

Exact next action: run CI on this checkpoint, merge PR #3 if green, verify the `main` production deployment, then start M3 on a fresh branch.
