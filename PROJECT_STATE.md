# NT132 Project State

Current milestone: M1 — Review remediation complete; re-review pending

Last safe checkpoint: PR build succeeds, but P2 route/concurrency issues are under remediation.

Current branch: feat/quartz-foundation

Latest verified commit: 105e7bb (M1 review remediation and visual verification)

Working features:

- Quartz v4.5.2 build pipeline with Markdown content under `content/`
- NT132 light/dark visual system and Vietnamese UI locale
- Explorer, search, local/global graph, table of contents, backlinks, breadcrumbs, popovers, and SPA navigation
- Responsive desktop/tablet/mobile layout with an accessible mobile Explorer trigger
- GitHub Pages build/deploy workflow targeting `main`
- GitHub Pages route preparation for extensionless nested refreshes
- Three temporary structural graph-test notes: Static Routing, OSPF, and ACL

Known unresolved findings and gates:

- The two Codex review threads have actual-fix replies; the fresh Codex re-review has not returned yet.
- PR #1 remains intentionally unmerged until that re-review confirms the blockers are closed.
- GitHub Pages has not been deployed from this environment; the first live deployment remains merge-gated.
- M2 content work has not started.

Recorded M1 review sequence: Resolve review findings -> run CI -> verify direct nested routes -> request re-review.
Exact next action: Wait for fresh Codex re-review; merge only if it accepts the remediation.
