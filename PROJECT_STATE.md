# NT132 Project State

Current milestone: M1 — Production polish verification

Last safe checkpoint: PR #1 was merged to `main` as `cc07d72d5d41a250f07b889f3e62dcc324c17306`; GitHub Actions run #11 built and deployed successfully to GitHub Pages.

Current branch: fix/m1-production-polish

Latest production commit: cc07d72d5d41a250f07b889f3e62dcc324c17306

Working features:

- Quartz v4.5.2 build pipeline with Markdown content under `content/`
- NT132 light/dark visual system and Vietnamese UI locale
- Explorer, search, local/global graph, table of contents, backlinks, breadcrumbs, popovers, and SPA navigation
- Responsive desktop/tablet/mobile layout with an accessible mobile Explorer trigger
- GitHub Pages build/deploy workflow targeting `main`
- GitHub Pages route preparation for extensionless nested refreshes
- Root-only GitHub Pages 404 preservation with nested `404.html` route support
- Three temporary structural graph-test notes: Static Routing, OSPF, and ACL

Production verification completed:

- Main build and deploy jobs passed.
- The Pages deployment reported success for commit `cc07d72d5d41a250f07b889f3e62dcc324c17306`.
- The deployed artifact contains all expected top-level and nested extensionless routes.
- Static artifact validation found no missing internal `href`, `src`, or `srcset` targets across 160 checked local references.
- Viewport metadata and mobile Explorer controls are present in generated HTML.

Final production-polish findings being remediated:

- Footer displayed the project package version as if it were the Quartz framework version; attribution should show `Quartz` without the misleading `v0.1.0` label.
- Default Open Graph image metadata emitted `image/.png`; it should emit the valid MIME type `image/png`.

M2 content work has not started yet.

Exact next action: Validate the production-polish branch with CI and generated-artifact inspection, merge it if clean, then immediately start M2 content planning and taxonomy on a fresh branch.
