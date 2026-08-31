# NT132 Project State

Current milestone: M3.1 — final mentor review

Current branch: feat/m3-1-core-routing

Last safe checkpoint: M3.1 remediation round 2 is committed in `2b980100da10704e029579f736a99c048aa534f9`; final mentor review is pending.

Latest production commit: af561c936e0b13929cc9bb81f73c14b13f057784

Current candidate HEAD: 0e59e619b6b17acd9bfa81417e1a009f69215b54

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
- Extracted a shared `srcset`/`imagesrcset` parser and added regression coverage for density/width descriptors, multiple candidates, data URL commas, and ordinary URL commas.
- Added audit gates for forbidden `prompt`, `placeholder`, and `TODO` terms and kept external/data references out of broken-local counters.

Current blockers:

- Mentor final re-review only.

Verification completed after Round 2:

- `npm ci`: PASS
- `npm run check`: PASS
- `npm test`: PASS (75/75)
- `npm run quartz -- build -d content -v`: PASS (77 files emitted)
- `npm run prepare-pages`: PASS (7 extensionless routes)
- `npm run test:routes`: PASS (5/5)
- `npm run test:audit`: PASS (40 routes, 374 hrefs, 90 srcs, 0 srcsets, 0 broken targets, 0 H1 violations, 0 term violations, 0 restricted PDFs)
- `git diff --check`: PASS
- Visual inspection: all 5 diagrams checked at 390px and desktop width; cross-network forwarding checked in the actual embedded image viewport without clipping or duplicate content.

Review note: Codex independent review is unavailable due to quota. Mentor final review remains the merge gate.

Exact Next Action: final QA → inspect final artifact → wait for mentor PASS.
