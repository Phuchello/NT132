# NT132 Project State

Current milestone: M1 — Working website foundation

Last safe checkpoint: Clean Quartz build, static-host nested-route check, browser verification, Pages enablement, and PR #1 build are complete.

Current branch: feat/quartz-foundation

Latest verified commit: 68c90ed (Quartz foundation and GitHub Pages workflow)

Working features:

- Quartz v4.5.2 build pipeline with Markdown content under `content/`
- NT132 light/dark visual system and Vietnamese UI locale
- Explorer, search, local/global graph, table of contents, backlinks, breadcrumbs, popovers, and SPA navigation
- Responsive desktop/tablet/mobile layout with an accessible mobile Explorer trigger
- GitHub Pages build/deploy workflow targeting `main`
- GitHub Pages route preparation for extensionless nested refreshes
- Three temporary structural graph-test notes: Static Routing, OSPF, and ACL

Known issues:

- GitHub Pages has not been deployed from this environment yet, so the live deployment URL is not independently confirmed.
- Full course content, downloadable material, diagrams, and source migration are intentionally out of scope for M1.
- The deploy job is intentionally skipped on PR events; first live deployment requires merging PR #1 into `main`.

Exact next action: Review and merge PR #1 into `main`, confirm the first Pages deployment at `https://phuchello.github.io/NT132/`, then begin M2 content planning.
