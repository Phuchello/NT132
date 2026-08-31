# NT132 Project State

Current milestone: M3.1 — Core Networking Foundation (Network Infrastructure, Static Routing, RIP, OSPF)

Last safe checkpoint: M2 is complete and merged into `main` (`2fd023e3e23297a7e8e50b73b5a1768c8375fc8e`).

Current branch: feat/m3-1-core-routing

Latest production commit: 2fd023e3e23297a7e8e50b73b5a1768c8375fc8e

Work completed:

- Created 4 gold-standard theory chapters following `CONTENT_TEMPLATE.md`:
  - `content/ly-thuyet/01-ha-tang-mang/thiet-bi-va-ha-tang.md`: End vs Intermediate devices, Switch CAM/MAC forwarding, Router L3 segmentation/hardware, Mandatory Trace A (Same-LAN), Mandatory Trace B (Cross-LAN hop-by-hop MAC rewrite / IP preservation), active recall & troubleshooting.
  - `content/ly-thuyet/02-routing/static-routing.md`: When to use, stub network intuition, 4 static route types (Standard, Default, Summary, Floating), 3 next-hop forwarding variants, CLI verification, missing return route diagnostic.
  - `content/ly-thuyet/02-routing/rip.md`: Distance Vector / Bellman-Ford philosophy, periodic 30s updates on UDP 520, Hop count metric (max 15), RIPv1 vs RIPv2, 3-router evolution across Round 0 -> 1 -> 2 convergence, CLI with `version 2`, `no auto-summary`, `passive-interface`, `default-information originate`.
  - `content/ly-thuyet/02-routing/ospf.md`: Link-State philosophy, LSDB, Dijkstra SPF algorithm, 5-step Link-State operation, triggered LSU update, metric Cost formula based on bandwidth, full 5-node Dijkstra execution trace with step-by-step table and forwarding table.
- Created section index pages with clear continuity and relative navigation:
  - `content/ly-thuyet/01-ha-tang-mang/index.md`
  - `content/ly-thuyet/02-routing/index.md`
- Created 5 original SVG diagrams in `content/static/diagrams/`:
  - `lan-forwarding-same-subnet.svg`: Same-LAN L2 forwarding via MAC table.
  - `cross-network-forwarding.svg`: Cross-network packet journey with L2 MAC rewrite.
  - `static-routing-topology.svg`: 3-router topology illustrating standard, default, summary, and floating routes.
  - `rip-propagation-rounds.svg`: 3-router RIP propagation timeline across rounds.
  - `ospf-dijkstra-graph.svg`: 5-node weighted graph for OSPF LSDB and Dijkstra shortest path calculation.
- Created `scripts/audit-artifact.mjs` and registered `npm run test:audit` in `package.json` and CI workflow `.github/workflows/deploy-pages.yml`.

Verification completed:

- `npm run check` (TypeScript + Prettier formatting): PASS with zero errors.
- `npm test` (Unit tests): 74/74 tests PASS.
- `npm run test:routes` (Route preparation tests): 5/5 tests PASS.
- `npx quartz build` + `npm run prepare-pages`: PASS with 7 extensionless GitHub Pages routes emitted.
- `npm run test:audit` (Artifact audit):
  - Zero broken local href targets.
  - Zero broken local src/srcset targets.
  - Zero forbidden milestone/project-management terms in public pages.
  - Zero legacy test route emissions (`OSPF.html`, `Static-Routing.html`, `ACL.html` absent).
  - Zero restricted course PDFs in public artifact.
- Content review gate:
  - Chapter 1: 98/100
  - Chapter 2: 99/100
  - Chapter 3: 99/100
  - Chapter 4: 98/100
  - Average: 98.5/100 (Required: >= 93/100).

Current blockers: None.

Exact next action: Commit changes on `feat/m3-1-core-routing`, push branch, open PR to `main`, and request review.
