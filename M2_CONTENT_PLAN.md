# M2 Content Plan — NT132

## Goal

Turn the current Quartz shell into a coherent NT132 course knowledge base without mirroring
restricted course PDFs. M2 defines the taxonomy, naming rules, source authority, and reusable
page templates. Actual large-scale theory/lab migration starts in M3 after this plan is reviewed.

## Source authority

Use the uploaded course materials as reference inputs, but keep the repository source policy
intact.

The 19 uploaded course PDFs are treated **conservatively as Class B** under `SOURCE_POLICY.md`:
course/instructor material whose redistribution rights have not been cleared. They may be used as
reference inputs for independently authored notes, but the original PDFs are not mirrored into the
public repository unless permission is documented.

`Group07_PreReport.docx` is a student-produced report rather than canonical course theory, so it is
treated as **Class C** for this project: case-study/reference only, with no public mirroring unless
redistribution permission is documented.

### Source map and policy class

All Class B entries below have the same status: **rights review required; reference only**.

1. `1.1 Chương 1 Thiết bị mạng và hạ tầng mạng.pdf`
   - Class: B
   - Destination: `ly-thuyet/01-ha-tang-mang/`
2. `2.1 Static Routing.pdf`
   - Class: B
   - Destination: `ly-thuyet/02-routing/`
3. `2.2 Routing protocol - RIP.pdf`
   - Class: B
   - Destination: `ly-thuyet/02-routing/`
4. `2.3 Routing protocol - OSPF.pdf`
   - Class: B
   - Destination: `ly-thuyet/02-routing/`
5. `3.1 Switch and VLAN.pdf`
   - Class: B
   - Destination: `ly-thuyet/03-switching-vlan/`
6. `3. InterVLAN routing.pdf`
   - Class: B
   - Destination: `ly-thuyet/03-switching-vlan/`
7. `4.1 Network Services.pdf`
   - Class: B
   - Destination: `ly-thuyet/04-network-services/`
8. `4.2 DHCP Overview.pdf`
   - Class: B
   - Destination: `ly-thuyet/04-network-services/`
9. `4.3 NAT overview.pdf`
   - Class: B
   - Destination: `ly-thuyet/04-network-services/`
10. `4.4 ACL Overview.pdf`
    - Class: B
    - Destination: `ly-thuyet/04-network-services/`
11. `4.5 ACL Wildcard mask.pdf`
    - Class: B
    - Destination: `ly-thuyet/04-network-services/`
12. `5.1 Windows Server.pdf`
    - Class: B
    - Destination: `ly-thuyet/05-server-platforms/`
13. `5.2 Linux Server.pdf`
    - Class: B
    - Destination: `ly-thuyet/05-server-platforms/`
14. `5.3 Cloud Server.pdf`
    - Class: B
    - Destination: `ly-thuyet/05-server-platforms/`
15. `6. Linux Adminstration.pdf`
    - Class: B
    - Destination: `ly-thuyet/06-linux-administration/`
16. `8.1 Intro to Cloud computing.pdf`
    - Class: B
    - Destination: `ly-thuyet/07-cloud-computing/`
17. `9.1 Windows administration.pdf`
    - Class: B
    - Destination: `ly-thuyet/08-windows-administration/`
18. `9.1 Manage task.pdf`
    - Class: B
    - Destination: `ly-thuyet/09-management/`
19. `9.2 Network management system.pdf`
    - Class: B
    - Destination: `ly-thuyet/09-management/`
20. `Group07_PreReport.docx`
    - Class: C
    - Status: case-study/reference only; permission required before mirroring
    - Destination: `do-an/case-studies/`

## Course taxonomy

The public structure should follow how a student learns the subject, not the source-file numbering
mechanically.

```text
content/
  ly-thuyet/
    index.md
    01-ha-tang-mang/
      index.md
      thiet-bi-va-ha-tang.md
    02-routing/
      index.md
      static-routing.md
      rip.md
      ospf.md
    03-switching-vlan/
      index.md
      switch-va-vlan.md
      inter-vlan-routing.md
    04-network-services/
      index.md
      tong-quan-network-services.md
      dhcp.md
      nat.md
      acl.md
      acl-wildcard-mask.md
    05-server-platforms/
      index.md
      windows-server.md
      linux-server.md
      cloud-server.md
    06-linux-administration/
      index.md
      linux-administration.md
    07-cloud-computing/
      index.md
      intro-cloud-computing.md
    08-windows-administration/
      index.md
      windows-administration.md
    09-management/
      index.md
      manage-task.md
      network-management-system.md

  thuc-hanh/
    index.md
    routing/
    switching-vlan/
    network-services/
    server/
    administration/
    management/

  on-thi/
    index.md
    concept-map.md
    packet-traces.md
    common-mistakes.md

  de-thi/
    index.md

  do-an/
    index.md
    case-studies/

  glossary/
    index.md

  flashcards/
    index.md
```

## Naming and link rules

- Folder/file slugs: lowercase ASCII kebab-case.
- Vietnamese diacritics stay in visible titles, not in slugs.
- One canonical concept page per topic; use aliases instead of duplicate pages.
- Do not encode semester, teacher, milestone, or source-file number into public URLs unless needed
  for disambiguation.
- Preserve standard English technical terms in titles/body when that is the normal networking term:
  `Static Routing`, `RIP`, `OSPF`, `VLAN`, `DHCP`, `NAT`, `ACL`, `SNMP`, etc.
- Internal links are authored as explicit paths relative to the current Markdown page, for example
  `./01-ha-tang-mang/`, `../02-routing/`, or `../../`. Quartz uses
  `markdownLinkResolution: "relative"` so these paths keep their intended directory semantics after
  build and GitHub Pages route preparation.
- Do not rely on ambiguous same-name `index` resolution or shortest-name inference for navigation.
- Public pages must not mention agent workflow, migration rounds, M1/M2 status, or implementation
  scaffolding.

## Learning architecture

Every important theory page should optimize for active understanding:

1. **Map** — 3–5 core ideas.
2. **Bản chất / intuition** — what problem the mechanism solves.
3. **Cơ chế** — packet/state/config flow step by step.
4. **Trace** — concrete topology or execution path.
5. **Recall** — closed-book questions.
6. **Apply** — 2–4 reasoning/configuration exercises.
7. **Sai ở đâu?** — common misconceptions and troubleshooting clues.
8. **Ôn nhanh** — compact recap and cross-links.

For packet-oriented topics, explicitly track source/destination IP, source/destination MAC,
routing/VLAN/NAT/ACL state changes where relevant.

## Cross-link backbone

High-value connections that should be explicit:

- Infrastructure → Static Routing → RIP / OSPF
- Switch/VLAN → Inter-VLAN Routing
- Inter-VLAN → DHCP Relay
- Routing → NAT → Internet access
- ACL → Wildcard mask → inbound/outbound placement
- Linux/Windows Server → network services
- Cloud Server → Cloud Computing
- Linux/Windows Administration → managed services/users/policies
- Management tasks → NMS / FCAPS / SNMP concepts

## Source-handling rule

The PDFs are reference material, not repository downloads by default.

For each authored page record:

- source filename(s)
- source class (A/B/C from `SOURCE_POLICY.md`)
- concepts used
- whether figures/commands were recreated or directly reproduced
- attribution/permission decision for any reused visual

Prefer original explanations, original diagrams, and independently written lab steps. Do not mirror
the original PDFs into public downloads unless redistribution permission is clear.

## M2 deliverables

M2 is complete when all of the following are true:

- [ ] Taxonomy and naming conventions are accepted.
- [ ] Theory/lab/exam/project templates are committed.
- [ ] All 19 primary course files are mapped to canonical destination topics with A/B/C policy class
      and redistribution status.
- [ ] `Group07_PreReport.docx` is classified as Class C, case-study-only.
- [ ] No public page contains milestone/agent/scaffolding language.
- [ ] Internal navigation resolves to emitted routes with zero missing local references.
- [ ] A migration order for M3 is fixed.
- [ ] CI passes on the M2 branch.

## Proposed M3 migration order

Migrate by dependency, not filename order:

1. Network infrastructure/devices
2. Static Routing
3. RIP
4. OSPF
5. Switch & VLAN
6. Inter-VLAN Routing
7. Network Services overview
8. DHCP
9. NAT
10. ACL + wildcard mask
11. Windows/Linux/Cloud Server
12. Linux Administration
13. Cloud Computing
14. Windows Administration
15. Management tasks + NMS

This order supports a continuous end-to-end mental trace:
host → switch/VLAN → router → services/security → server/cloud → administration/management.
