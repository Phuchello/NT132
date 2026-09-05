# NT132 Project State

Current milestone: M3.6 — Cloud Computing / implementation complete, mentor review pending

Previous milestone: M3.5 — production complete

Current branch: feat/m3-6-cloud-computing

Last safe checkpoint: M3.5 remains production complete. M3.6 now contains source-mapped Virtualization Foundations content and original diagrams; no PR or merge is authorized.

M3.1 merge commit: 6ece18f2aad49aa1a899b68dbcf1af31834a1036

M3.1 production workflow: 33406354082

Latest production commit: b662840a3a7cbf9488ec10d23a3bbf14032a6463

Production baseline: b662840a3a7cbf9488ec10d23a3bbf14032a6463

Current PR: #10 — open against main; candidate head `662202cf57bd73afa6d967d6d5d75d142ae35672`

M3.4 release checkpoint:

- Accepted substantive head: `285a46501f12f83eb6888ca2f759dc64e39bf61d`
- Mentor score: 95/100 — ACCEPTED
- PR #8 squash merge commit: `cfb141f244fa5316e7193a6942f28d0b09ec85f1`
- Production workflow: run #65 / ID `33764849387`
- Pages artifact: `github-pages`, ID `9897047491`, digest `sha256:e4b4dab1b6211298531fcc348680daa054bc951152928aa7f086866dbe6def89`
- Production URL: https://phuchello.github.io/NT132/
- Status: M3.4 — PRODUCTION PASS / CLOSED

M3.5 source checkpoint:

- Read all 53 pages of `6. Linux Adminstration.pdf` from the canonical course-material directory before authoring.
- Built a private page/range source map covering architecture, boot, CLI/help, privilege, users/groups, account files, network state, DNS, tools, SSH, and network services.
- Preserved course terminology while classifying CentOS/SysV-era examples as legacy and current Linux mechanisms as environment-dependent.
- Source PDF remains a reference input only and is not copied into the repository.

M3.5 implementation checkpoint:

- Added the canonical Linux Administration gateway and one substantive chapter at `content/ly-thuyet/06-linux-administration/`.
- Established the state-management model, legacy/current boot framing, UID/GID identity model, runtime versus persistent network model, resolver pipeline, SSH host-key trust model, and service operational-state model.
- Added seven original mobile-first diagrams for architecture, boot comparison, identity, network troubleshooting, name resolution, SSH trust, and service state.
- Extended `scripts/audit-artifact.mjs` with both canonical routes and all seven required M3.5 diagrams.
- README carries the two Linux Administration production links for release.

M3.5 verification checkpoint:

- `npm ci`: PASS; no dependency changes; the existing 10 high-severity npm advisories remain reported by npm.
- `npm run check`: PASS.
- `npm test`: PASS (76/76).
- Quartz build: PASS (39 Markdown files, 137 files emitted).
- `npm run prepare-pages`: PASS (30 extensionless routes).
- `npm run test:routes`: PASS (6/6).
- `npm run test:audit`: PASS (167 public files, 86 HTML/route files, 1067 hrefs, 238 srcs, zero broken references, H1, term, or PDF violations).
- Seven SVGs rendered at 390px and 1200px; title/desc, bounds, readable typography, and semantic geometry checks passed. The image preview helper was unavailable because of a Windows ACL helper failure; no clipping was found by the render and bounds checks.
- Honest self-review: Linux Administration 95/100 (source fidelity 19/20, currentness 14/15, beginner clarity 14/15, mechanism reasoning 19/20, visual quality 9/10, recall 10/10, troubleshooting 5/5, navigation/provenance 5/5); gateway 94/100.
- Known limitations: no distro-specific hands-on lab, and command behavior remains intentionally environment-dependent; later administration work can add lab depth.
- Accepted head: `9c50ac079ae860e2bd9d17fca17182bb5da102aa`.
- Mentor score: 95/100 — ACCEPTED.
- PR #9 is open against `main`; release is authorized.

M3.3 release checkpoint:

- Accepted content head: `5658ede65a708494efa92a32fcd16394cc785493`
- Mentor score: 95/100 — ACCEPTED
- PR #7 squash merge commit: `be922db5c6fb8506879a5ce541eded2354d74d54`
- Production workflow: run #58 / ID `33736529578`
- Pages artifact: `github-pages`, ID `9885958812`, digest `sha256:2047cd848a3b352aaeb1e363cfd5206b64d9c2355058ce8b38bf7b26daabd3dd`
- Production URL: https://phuchello.github.io/NT132/
- Status: M3.3 — PRODUCTION PASS / CLOSED

M3.4 source checkpoint:

- Verified and read all pages of 5.1 Windows Server.pdf (9 pages), 5.2 Linux Server.pdf (10 pages), and 5.3 Cloud Server.pdf (7 pages) from the canonical course-material directory.
- Course scope is platform overview plus project objectives; detailed OS, proxy, monitoring, and Azure mechanics are labeled supplementary or author-derived.
- Source PDFs remain reference inputs only and are not copied into the repository.

M3.4 implementation checkpoint:

- Added the locked gateway plus Windows Server, Linux Server, and Cloud Server pages.
- Added six original focused diagrams: platform map, Windows service map, Linux service map, Web/DNS request path, monitoring flow, and Azure VM versus App Service responsibility.
- Preserved the service-versus-platform mental model, shared VLAN 10/VLAN 20 scenario, platform-neutral troubleshooting hierarchy, and course project objectives.
- Added source provenance on every page and kept README public material unchanged until release.
- Windows Server self-review: 96/100. Weakness: detailed AD DS, file-permission, VPN, and role administration are intentionally deferred to later administration material.
- Linux Server self-review: 96/100. Weakness: NFS/SMB/FTP and Squid remain conceptual rather than deployment labs.
- Cloud Server self-review: 97/100. Weakness: Azure networking and App Service domain setup remain conceptual rather than portal or infrastructure labs.
- All three pages meet the 90-point minimum; average self-review: 96.3/100.
- PR #8 opened to main; one Codex review requested; mentor review remains the final gate.

M3.4 verification checkpoint:

- Full local QA, 390px SVG bounds/semantic review, canonical route generation, and generated-artifact audit pass.
- Artifact audit: 155 public files, 82 HTML/route files, 1004 hrefs, 215 srcs, zero broken references, zero H1 violations, zero internal/scaffold terms, and zero public PDFs.
- M3.1-M3.3 canonical routes remain covered by the audit.

Latest reviewed implementation commit: 1662e5a516440cc57393930a6c4e45c91cbea2a9

Subsequent documentation-only checkpoint commits do not change the reviewed implementation.

M3.2 production closeout:

- M3.2 content merge: `6e8343606d8007c8773d9f0417471b701909a03a`
- M3.2 hotfix merge: `1bc52ef6dedb946e64c0920d2b71ee0908b2966f`
- M3.2 hotfix production workflow: `33630246332`
- Status: M3.2 — PRODUCTION PASS / CLOSED

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

M3.2 production hotfix history:

- M3.2 content commit: `6e8343606d8007c8773d9f0417471b701909a03a`
- Production workflow: `33626870986`
- Reason reopened: late Codex P2 on current M3.2 candidate was returned before merge but was not honored by the release gate.
- Hotfix branch: `fix/m3-2-cli-mode-transitions`
- Scope: normalize Cisco IOS configuration-mode transitions in the M3.2 examples; passed content and diagrams remain unchanged.

M3.3 implementation checkpoint:

- Read and source-mapped all five Class-B PDFs in full: Network Services (28 pages), DHCP (12 pages), NAT (11 pages), ACL Overview (19 pages), and ACL Wildcard mask (10 pages).
- Authored the Network Services index plus five substantive pages covering overview, DHCP, NAT/PAT, ACL, and wildcard masks.
- Added five original mobile-first SVG diagrams; source PDFs remain reference inputs only and are not in the repository.
- Supplementary Cisco semantics are explicitly labeled and linked to vendor documentation.

M3.3 remediation checkpoint:

- Fixed the numbered IPv4 ACL ranges and malformed overview command table.
- Restored canonical filenames and route audit checks.
- Replaced five combined diagrams with eight focused original diagrams.
- Added one shared RFC-addressed teaching topology, a single-XID DHCP trace with RFC 2131 clarification, a separate relay trace, and an integrative packet trace.
- Added explicit troubleshooting/application prompts to DHCP, NAT, ACL, and ACL wildcard pages.
- Refreshed README as a separate documentation commit after content remediation.

M3.4 production closeout: PR #8 was squash-merged, workflow run #65 / ID `33764849387` passed Build site and Deploy site, and the deployed canonical routes passed the read-only HTTPS smoke audit.

M3.5 production closeout: PRODUCTION PASS / CLOSED; accepted release head `e9769a0a5a148d32f98e9f5ca4492e5f0dd8423f`; PR #9 squash merge `b662840a3a7cbf9488ec10d23a3bbf14032a6463`; workflow run #74 / ID `33951676398`; Pages artifact ID `9965026034`, digest `sha256:fcce6113a3914f39d503fdf107c42a4d6054acc7273e989c8fb3c0f6a2d5cfe7`; production URL https://phuchello.github.io/NT132/; build/deploy and smoke PASS.
M3.6 source and implementation checkpoint:

- Primary Class-B source: `8.1 Intro to Cloud computing.pdf` (17 slides), independently visually reviewed and mapped before authoring; the deck is Virtualization Overview despite its filename.
- Course-derived scope: definition/abstraction levels, emulation versus virtualization, VM host/guest/VMM, process/system VM, Type 1/Type 2, full/para approaches, Xen/KVM/QEMU course examples, and server/storage/network virtualization.
- Cloud delivery characteristics are explicitly supplementary NIST context; no SaaS/PaaS/IaaS or deployment-model teaching is attributed to the course deck.
- Added the canonical Cloud Computing gateway, one substantive Virtualization Foundations chapter, five original mobile-first SVGs, and required-route/asset artifact gates.
- Source PDF remains outside the repository. The local Windows image-preview helper had an ACL limitation; the full visual source map supplied for this branch is the authoring basis.

M3.6 verification checkpoint:

- `npm ci`, `npm run check`, `npm test` (76/76), Quartz build (40 Markdown inputs, 146 emitted files), route preparation (33 routes), route tests (6/6), artifact audit, and `git diff --check`: PASS.
- Artifact audit: 179 public files, 92 HTML/routes, 1171 hrefs, 261 srcs, zero broken href/src/srcset targets, H1 violations, public process terms, or restricted PDFs.
- Five original SVGs rendered successfully at 390px. Windows image-preview tooling remains ACL-limited, so mobile semantic review uses the 390px render dimensions, explicit viewBox bounds, and source-level text/geometry inspection.
- Honest self-review: Virtualization Foundations 94/100; gateway 93/100. Limitation: the course deck is conceptual and does not include an executable hypervisor lab or current vendor configuration guide.
  Exact Next Action: wait for mentor M3.6 review on PR #10; do not merge or start the next milestone

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

Historical Exact Next Action (superseded): wait for mentor final M3.2 review on PR #5; do not merge and do not start Network Services.
