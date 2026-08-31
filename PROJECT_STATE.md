# NT132 Project State

Current milestone: M1 — Final Codex re-review pending

Last safe checkpoint: Local verification passes on 09881c; root-only 404 handling and regression verification passed; PR #1 remains unpushed for review.

Current branch: feat/quartz-foundation

Latest verified commit: 09881c943e39964fae80fa82271669390264be7a (root-only 404 handling and regression tests)

Working features:

- Quartz v4.5.2 build pipeline with Markdown content under `content/`
- NT132 light/dark visual system and Vietnamese UI locale
- Explorer, search, local/global graph, table of contents, backlinks, breadcrumbs, popovers, and SPA navigation
- Responsive desktop/tablet/mobile layout with an accessible mobile Explorer trigger
- GitHub Pages build/deploy workflow targeting `main`
- GitHub Pages route preparation for extensionless nested refreshes
- Three temporary structural graph-test notes: Static Routing, OSPF, and ACL

Known unresolved findings and gates:

- Open gate: Codex re-review of root-404 handling.
- PR #1 remains intentionally unmerged until that re-review confirms the blockers are closed.
- GitHub Pages has not been deployed from this environment; the first live deployment remains merge-gated.
- M2 content work has not started.

Recorded M1 review sequence: Resolve review findings -> run CI -> verify direct nested routes and assets -> request re-review -> fix alias meta-refresh rebasing -> run full validation -> request re-review -> fix root-only 404 handling -> run full validation.
Exact next action: Wait for clean Codex re-review.
Do not merge until current HEAD has no P1/P2 findings.
