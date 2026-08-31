# NT132 Project State

Current milestone: M3.1 — review remediation

Current branch: feat/m3-1-core-routing

Last safe checkpoint: M2 is production-complete and merged into `main` (`2fd023e3e23297a7e8e50b73b5a1768c8375fc8e`). PR #4 is open on `feat/m3-1-core-routing`.

Latest production commit: 2fd023e3e23297a7e8e50b73b5a1768c8375fc8e

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

Current blockers:

- source/provenance normalization (remediated; pending mentor review)
- accuracy/overstatement corrections (remediated; pending mentor review)
- duplicate H1 (remediated; 0 violations across 40 routes)
- mobile diagram readability (remediated; redesigned for 390px)
- artifact audit parity (remediated; 374 hrefs, 90 srcs, 0 broken)

Verification completed:

- `npm run check`: PASS (0 errors)
- `npm test`: PASS (74/74 unit tests)
- `npm run test:routes`: PASS (5/5 tests)
- `npx quartz build` + `npm run prepare-pages`: PASS (77 files emitted, 7 extensionless routes)
- `npm run test:audit`: PASS (0 H1 violations, 0 broken links, 0 broken srcs, 0 term violations)

Exact Next Action: fix current M3.1 blockers -> run full QA -> artifact inspect -> request re-review if quota available.
