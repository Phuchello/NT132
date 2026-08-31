# NT132 Project State

Current milestone: M1 — Review remediation round 2

Last safe checkpoint: Latest Codex review on d46aac8 found two P2 blockers; fixes are under verification.

Current branch: feat/quartz-foundation

Latest verified commit: d46aac8 (preserve commas in srcset URLs, route tests, and CI)

Working features:

- Quartz v4.5.2 build pipeline with Markdown content under `content/`
- NT132 light/dark visual system and Vietnamese UI locale
- Explorer, search, local/global graph, table of contents, backlinks, breadcrumbs, popovers, and SPA navigation
- Responsive desktop/tablet/mobile layout with an accessible mobile Explorer trigger
- GitHub Pages build/deploy workflow targeting `main`
- GitHub Pages route preparation for extensionless nested refreshes
- Three temporary structural graph-test notes: Static Routing, OSPF, and ACL

Known unresolved findings and gates:

- FolderPage collision handling in `scripts/prepare-pages.mjs` must preserve an existing `index.html`.
- Project-owned assets must use the Quartz-native `content/static/` locations and be verified in `public/`.
- PR #1 remains intentionally unmerged until that re-review confirms the blockers are closed.
- GitHub Pages has not been deployed from this environment; the first live deployment remains merge-gated.
- M2 content work has not started.

Recorded M1 review sequence: Resolve review findings -> run CI -> verify direct nested routes and assets -> request re-review.
Exact next action: Fix both findings -> run full CI -> verify routes/assets -> request Codex re-review.
