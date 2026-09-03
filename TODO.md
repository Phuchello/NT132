# NT132 Roadmap

## M0 — Repository audit and architecture

- [x] Audit the initial repository, branch, files, history, and remotes.
- [x] Record the project state and known blockers.
- [x] Define the content information architecture.
- [x] Define the source and redistribution policy.

## M1 — Working website foundation

- [x] Pin the Quartz v4 foundation and deterministic npm lockfile.
- [x] Add the NT132 content skeleton and temporary graph-test notes.
- [x] Configure Explorer, search, graph view, TOC, backlinks, breadcrumbs, and responsive layout.
- [x] Add the GitHub Pages build and deployment workflow.
- [x] Verify a clean build and browser behavior at desktop and mobile widths.
- [x] Confirm the first GitHub Pages deployment after the pull request is merged.
- [x] Complete final production-polish verification for footer attribution and Open Graph metadata.

## M2 — Content planning and taxonomy

- [x] Define the course taxonomy and naming conventions.
- [x] Create reviewed content templates for theory, labs, exams, and projects.
- [x] Map the 19 primary course-source files to canonical topic groups.
- [x] Record A/B/C policy class and redistribution status for every mapped source.
- [x] Classify the student report as Class C, case-study/reference only.
- [x] Review the taxonomy/source map for omissions or duplicate concepts.
- [x] Create the destination theory/practical folder and index skeleton without migrating full chapter content.
- [x] Replace public future-work lab placeholders with durable student-facing section guidance.
- [x] Define explicit relative internal-link semantics and verify zero missing local references.
- [x] Remove legacy M1 graph-test notes from the public M2 artifact.
- [x] Reproduce and remediate all P1/P2 findings returned by available Codex reviews.
- [x] Run final remediation CI and artifact checks; record the final Codex quota limitation and independent-review contingency.
- [x] Merge PR #3 and verify the production deployment from `main`.

## M3 — Theory and practical labs

### M3.1 — Core networking foundation (Gold standard theory)

- [x] Author Chapter 1: Network Infrastructure & Packet Flow (`thiet-bi-va-ha-tang.md`).
- [x] Author Chapter 2: Static Routing (`static-routing.md`).
- [x] Author Chapter 3: RIP Distance Vector (`rip.md`).
- [x] Author Chapter 4: OSPF Link State & Dijkstra (`ospf.md`).
- [x] Create original SVG diagrams for local forwarding, cross-LAN forwarding, static routing, RIP rounds, and OSPF Dijkstra SPF.
- [x] Remediate Round 1 review findings (provenance tiers, technical claim qualifiers, single H1, mobile 390px diagrams, expanded artifact audit).
- [x] Integrate comprehensive artifact audit checks into CI (`npm run test:audit`).

### M3.2 — Switching, VLAN & Inter-VLAN

- Previous milestone: M3.1 — production complete.
- M3.1 merge commit: `6ece18f2aad49aa1a899b68dbcf1af31834a1036`.
- M3.1 production workflow: `33406354082`.
- Current branch: `feat/m3-3-network-services`.
- Previous source-access blocker resolved: the required Class-B PDFs are attached to the Windows workspace and were read in full.
- [x] Production hotfix: normalize all Cisco IOS configuration-mode transitions in M3.2 examples.
- [x] Merge PR #6 and verify the M3.2 hotfix production workflow.
- [x] Author Switching and VLAN theory page.
- [x] Author Inter-VLAN Routing theory page.
- [x] Create original mobile-first diagrams for VLAN physical/logical membership, access/trunk, Legacy, Router-on-a-stick, and Multilayer/SVI routing.
- [x] Mark course-derived scope and supplementary Cisco CLI material in the authored pages.
- [x] Add M3.2 diagram files to the generated-artifact audit.
- [x] Remediation Round 1: correct the physical VLAN, access/trunk, and Router-on-a-stick topology semantics; correct provenance and trace wording.
- [x] Final micro-remediation: complete the VLAN 20 endpoint configuration, state IPv4 TTL decrement precisely, and correct access/trunk teaching captions.
- [x] Run full local QA, artifact audit, and mobile/desktop visual verification.
- [x] Push branch and open one PR to `main` (PR #5).
- M3.2 content merge: `6e8343606d8007c8773d9f0417471b701909a03a`.
- M3.2 hotfix merge: `1bc52ef6dedb946e64c0920d2b71ee0908b2966f`.
- M3.2 hotfix production workflow: `33630246332` (Build and Deploy PASS).
- [x] M3.2 — PRODUCTION PASS / CLOSED.

### M3.3 — Network Services, DHCP, NAT & ACL

- Current milestone: M3.3 — mentor PASS / release pending.
- Production baseline: `1bc52ef6dedb946e64c0920d2b71ee0908b2966f`.
- Current PR: #7.
- Accepted content head: `5658ede65a708494efa92a32fcd16394cc785493`.
- Mentor score: 95/100 — ACCEPTED.
- Previous milestone: M3.2 — production complete.
- M3.2 content merge: `6e8343606d8007c8773d9f0417471b701909a03a`.
- M3.2 hotfix merge: `1bc52ef6dedb946e64c0920d2b71ee0908b2966f`.
- M3.2 hotfix production workflow: `33630246332`.
- Current branch: `feat/m3-3-network-services`.
- Canonical source directory: `C:\Users\lyle3\OneDrive\Documents\Môn học\Quản trị mạng và hệ thống`.
- Expected source files: `4.1 Network Services.pdf`, `4.2 DHCP Overview.pdf`, `4.3 NAT overview.pdf`, `4.4 ACL Overview.pdf`, `4.5 ACL Wildcard mask.pdf`.
- [x] Read and source-map all five Class-B PDFs in full.
- [x] Author the canonical Network Services index and five substantive theory pages.
- [x] Restore canonical page filenames and route links.
- [x] Create eight focused original mobile-first diagrams and add them to the artifact audit.
- [x] Add the shared M3.3 topology, DHCP single-XID/RFC 2131 trace, relay trace, and integrative packet trace.
- [x] Add explicit troubleshooting/application prompts to each core page.
- [x] Fix numbered IPv4 ACL ranges and the malformed overview command table.
- [x] Refresh the public README in one isolated documentation commit.
- [x] Label supplementary Cisco semantics and preserve the course-derived framing.
- [x] Run full local QA, generated-artifact audit, and CLI-mode audit.
- [x] Push the remediation commits to the existing PR #7.
- [x] Complete mentor review: 95/100 — ACCEPTED.
- [ ] Run release-only CI, squash merge PR #7, verify production deployment, and create M3.4 branch.
- Exact Next Action: run release-only CI -> squash merge PR #7 -> verify production deployment -> create M3.4 branch from production main.

### M3.2+ — Remaining theory chapters and practical lab curriculum

- [ ] Author remaining theory chapters (Network Services, DHCP, NAT, ACL, Server Platforms, Administration, Cloud Computing, Management/NMS).
- [ ] Add practical lab guides and Packet Tracer topologies.

## M4 — Exam preparation and exam intelligence

- [ ] Build the final-exam topic map.
- [ ] Add reviewed flashcards and common-error notes.
- [ ] Record previous-exam patterns without redistributing restricted papers.

## M5 — Glossary and connected navigation

- [ ] Expand the glossary with canonical terms and aliases.
- [ ] Add backlinks and cross-links for high-value concepts.
- [ ] Review orphan pages and broken links.

## M6 — Projects, reports, and downloads

- [ ] Add project ideas and report guidance.
- [ ] Publish only authored or redistributable downloads.
- [ ] Add diagrams and images with license metadata.
- [ ] Store approved project assets under `content/static/images/`,
      `content/static/diagrams/`, or `content/static/downloads/`.

## M7 — Quality, accessibility, and release

- [ ] Add link, spelling, and accessibility checks to CI.
- [ ] Review mobile and keyboard navigation.
- [ ] Document release and contribution workflow.
