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
- [ ] Merge PR #3 and verify the production deployment from `main`.

## M3 — Theory and practical labs

### M3.1 — Core networking foundation (Gold standard theory)

- [x] Author Chapter 1: Network Infrastructure & Packet Flow (`thiet-bi-va-ha-tang.md`).
- [x] Author Chapter 2: Static Routing (`static-routing.md`).
- [x] Author Chapter 3: RIP Distance Vector (`rip.md`).
- [x] Author Chapter 4: OSPF Link State & Dijkstra (`ospf.md`).
- [x] Create original SVG diagrams for local forwarding, cross-LAN forwarding, static routing, RIP rounds, and OSPF Dijkstra SPF.
- [x] Integrate artifact audit checks into CI (`npm run test:audit`).

### M3.2+ — Remaining theory chapters and practical lab curriculum

- [ ] Author remaining theory chapters (Switching/VLAN, Inter-VLAN, Network Services, etc.).
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
