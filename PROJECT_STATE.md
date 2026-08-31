# NT132 Project State

Current milestone: M1 — Review remediation round 4

Last safe checkpoint: Latest Codex review on 5e74c875 identified a root-404 route-preparation blocker; remediation is in progress.

Current branch: feat/quartz-foundation

Latest reviewed commit: 5e74c875

Working features:

- Quartz v4.5.2 build pipeline with Markdown content under `content/`
- NT132 light/dark visual system and Vietnamese UI locale
- Explorer, search, local/global graph, table of contents, backlinks, breadcrumbs, popovers, and SPA navigation
- Responsive desktop/tablet/mobile layout with an accessible mobile Explorer trigger
- GitHub Pages build/deploy workflow targeting `main`
- GitHub Pages route preparation for extensionless nested refreshes
- Three temporary structural graph-test notes: Static Routing, OSPF, and ACL

Known unresolved findings and gates:

- Only root public/404.html should be reserved; nested 404.html notes must receive extensionless route preparation.
- PR #1 remains intentionally unmerged until that re-review confirms the blockers are closed.
- GitHub Pages has not been deployed from this environment; the first live deployment remains merge-gated.
- M2 content work has not started.

Recorded M1 review sequence: Resolve review findings -> run CI -> verify direct nested routes and assets -> request re-review -> fix alias meta-refresh rebasing -> run full validation -> request re-review -> fix root-only 404 handling.
Exact next action: Fix root-only 404 handling -> add regression tests -> run full validation -> request Codex re-review.
