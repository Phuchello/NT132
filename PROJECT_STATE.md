# NT132 Project State

Current milestone: M3.2 — final mentor review

Previous milestone: M3.1 — production complete

Current branch: feat/m3-2-switching-vlan

Last safe checkpoint: M3.1 received final mentor PASS, was squash-merged into main, and passed the production GitHub Pages build, deployment, and smoke test.

M3.1 merge commit: 6ece18f2aad49aa1a899b68dbcf1af31834a1036

M3.1 production workflow: 33406354082

Latest production commit: 6ece18f2aad49aa1a899b68dbcf1af31834a1036

Latest reviewed implementation commit: 1662e5a516440cc57393930a6c4e45c91cbea2a9

Subsequent documentation-only checkpoint commits do not change the reviewed implementation.

Work completed in Remediation Round 1:

- **Source Fidelity & Supplementary Provenance**:
  - Partitioned every chapter's sources into three distinct tiers: Course Sources (Class B), Authoritative Standards / Vendor Documentation (Class C), and Author-Derived Original Topologies/Diagrams.
  - Explicitly marked supplementary networking concepts (CAM aging timer, RFC 826 ARP context, Cisco CLI output interpretations, RFC 1812 Longest Prefix Match, RFC 2453 / RFC 2328 specifications).
- **Technical Overstatement Corrections**:
  - _Static Routing_: Replaced absolute claims of "no CPU/RAM" with precise descriptions of low control-plane overhead and absence of dynamic protocol updates. Clarified security scope: lack of routing advertisements reduces exposure but does not encrypt or secure payload data.
  - _Floating Static_: Clarified that backup AD must exceed the preferred competing route's AD (not merely `> 1`), and explained failover limitations under silent remote link failures without tracking.
  - _RIP_: Renamed propagation intervals to Conceptual Rounds (0, 1, 2) rather than deterministic wall-clock timestamps. Clarified that Cisco route age timer is elapsed time since last update, not a countdown.
  - _OSPF_: Qualified area LSDB synchronization, Cost calculation derivation, transient convergence states, and distinguished generic LSP concepts from OSPF LSA/LSU terminology.
- **Duplicate H1 Elimination**:
  - Removed redundant manual `# Title` lines across all Markdown pages.
  - Verified generated HTML contains strictly ONE `<h1>` on all 40 public routes.
- **Mobile-First SVG Diagram Redesign**:
  - Redesigned all 5 SVGs (`lan-forwarding-same-subnet.svg`, `cross-network-forwarding.svg`, `static-routing-topology.svg`, `rip-propagation-rounds.svg`, `ospf-dijkstra-graph.svg`) for 390px viewport readability with large typography and simplified stacked components.
- **Comprehensive Artifact Audit**:
  - Upgraded `scripts/audit-artifact.mjs` to check `href`, `src`, `srcset`, single `<h1>` tag integrity, required diagrams, forbidden terms, and PDF leaks.

Work completed in Remediation Round 2:

- Redesigned the cross-network forwarding diagram for 390px and desktop rendering, explicitly teaching PC-A → R1 → R2 → PC-B, end-to-end IP addresses, and hop-by-hop MAC addresses.
- Corrected OSPF terminology around LSA contents and LSU transport while preserving the course-slide “LSU update” framing with an RFC 2328 clarification.
- Removed unattributed ECMP implementation detail from RIP and made Floating Static failover wording precise about route removal, resolution, installation, and downstream failure limits.
- Extracted a shared `srcset`/`imagesrcset` parser and added regression coverage for bare-relative candidates, density/width descriptors, multiple candidates, data URL commas, and ordinary URL commas.
- Added a nested-route integration regression proving bare-relative `srcset` and `src` URLs rebase correctly while descriptors, query commas, and data URLs remain intact.
- Added audit gates for forbidden `prompt`, `placeholder`, and `TODO` terms and kept external/data references out of broken-local counters.

Current M3.2 source checkpoint:

- Previous blocker: resolved — the two required Class-B PDFs were attached directly to the Windows workspace and read in full (21 + 15 pages).
- Course scope confirmed: Layer-2 switching/MAC forwarding, port-based VLAN, access/trunk, native/allowed VLAN, VLAN verification, Legacy Inter-VLAN, Router-on-a-stick, Multilayer Switch/SVI, and SIP/DIP/SMAC/DMAC traces.
- Concepts not fully shown as CLI in the course slides are labeled supplementary Cisco material in the authored chapter.

Current blocker: final re-review after Codex P2 remediation

M3.2 final micro-remediation completed locally:

- Authored the Switching/VLAN chapter and its two original mobile-first diagrams.
- Authored the Inter-VLAN Routing chapter and its three original mobile-first diagrams.
- Added M3.2 diagrams to the generated-artifact required-assets audit.
- Rebuilt the physical VLAN, access/trunk, and Router-on-a-stick diagrams so their device links, endpoint placement, and Layer-2/Layer-3 boundaries are canonical at mobile width.
- Rechecked the untouched Legacy Inter-VLAN and Multilayer/SVI diagrams for the same semantic and rendering gates.
- Corrected the trunk provenance tiers and the Router-on-a-stick egress wording without changing the course-derived framing.
- Completed the Router-on-a-stick switch sequence with VLAN creation and both illustrative endpoint access ports, including PC-B on VLAN 20.
- Corrected IPv4 TTL wording for the forwarded Legacy Inter-VLAN packet and removed the ambiguous access/trunk Case A caption.

M3.2 self-review:

- Switching/VLAN: 94/100. Weakness: IOS command output and SVI state details remain platform/version-dependent, and the chapter does not yet include a hands-on simulator lab.
- Inter-VLAN Routing: 94/100. Weakness: the supplementary CLI is Cisco-oriented and the pages do not yet include a hands-on simulator lab.
- Both pages meet the source-fidelity, learning-flow, trace, visual, recall, troubleshooting, navigation, and provenance gates for this theory milestone.

M3.2 verification completed locally:

- `npm ci`: PASS (machine reports 10 high-severity npm audit advisories; no dependency changes made).
- `npm run check`: PASS
- `npm test`: PASS (76/76)
- `npm run quartz -- build -d content -v`: PASS (88 files emitted)
- `npm run prepare-pages`: PASS (11 extensionless routes)
- `npm run test:routes`: PASS (6/6)
- `npm run test:audit`: PASS (48 HTML/route files, 511 hrefs, 116 srcs, 0 broken targets, 0 H1 violations, 0 term violations, 0 restricted PDFs)
- `git diff --check`: PASS
- Direct refresh checks: PASS for the M3.2 index, Switch/VLAN, and Inter-VLAN routes.
- Search initialization/query, Explorer visibility, TOC, provenance, and diagram loading: PASS.

M3.2 review handoff:

- PR: https://github.com/Phuchello/NT132/pull/5
- Latest verified content commit: `fa3bc4d` (the remediation changes are carried by the next pushed PR head).
- GitHub Actions PR workflow: the latest pushed PR head is green across all required build, test, route, artifact-audit, and upload steps; Deploy site is intentionally deferred until a merge to `main`.
- Network Services work has not started.

Verification completed after Round 2:

- `npm ci`: PASS
- `npm run check`: PASS
- `npm test`: PASS (76/76)
- `npm run quartz -- build -d content -v`: PASS (77 files emitted)
- `npm run prepare-pages`: PASS (7 extensionless routes)
- `npm run test:routes`: PASS (6/6)
- `npm run test:audit`: PASS (40 routes, 374 hrefs, 90 srcs, 0 srcsets, 0 broken targets, 0 H1 violations, 0 term violations, 0 restricted PDFs)
- `git diff --check`: PASS
- Visual inspection: all 5 diagrams checked at 390px and desktop width; cross-network forwarding checked in the actual embedded image viewport without clipping or duplicate content.

Review note: M3.1 final mentor review was PASS and Codex independent review remained unavailable due to quota.

Exact Next Action: wait for mentor final M3.2 review on PR #5; do not merge and do not start Network Services.
