# NT132 Content Templates

Use these templates for authored pages. They are intentionally student-facing and should not expose project-management or agent workflow language.

## Theory page

```markdown
---
title: <Visible Vietnamese/English title>
aliases:
  - <optional aliases>
tags:
  - nt132
  - <domain tag>
status: reviewed
sources:
  - <source filename or canonical URL>
---

# <Title>

## 1. Map — cần nắm gì?

- Core idea 1
- Core idea 2
- Core idea 3

## 2. Bài toán nó giải quyết

Explain the problem first. Avoid starting with definitions only.

## 3. Bản chất / cơ chế

Explain why the mechanism works and what state changes.

## 4. Luồng hoạt động

Use a concrete packet/configuration trace.

| Step | Device / component | Input state | Action | Output state |
| --- | --- | --- | --- | --- |
| 1 | ... | ... | ... | ... |

For networking flows, show SIP, DIP, SMAC, DMAC and the relevant routing/VLAN/NAT/ACL decision when applicable.

## 5. Cấu hình / command quan trọng

Only when the topic requires configuration. Explain what each command changes; do not dump commands without mechanism.

## 6. Sai lầm thường gặp

- Misconception → why it is wrong
- Symptom → likely cause → how to verify

## 7. Recall — đóng tài liệu lại

1. Question that requires explanation, not recognition.
2. Question that requires a packet/state trace.
3. Question comparing this topic with a neighboring concept.

## 8. Apply

2–4 reasoning/configuration exercises, from easy to diagnostic.

## 9. Ôn nhanh

A compact summary of the minimum ideas worth remembering.

## 10. Liên kết

- Prerequisite: [[...]]
- Next: [[...]]
- Related: [[...]]

## Nguồn

List the source record and attribution notes. Do not embed restricted originals.
```

## Practical lab page

```markdown
---
title: Lab — <name>
tags:
  - nt132
  - lab
sources:
  - <source/reference>
---

# Lab — <name>

## Mục tiêu

What the student must be able to verify at the end.

## Kiến thức cần trước

Link only the necessary theory pages.

## Topology

Provide an original/recreated diagram plus addressing/VLAN table.

## Trạng thái ban đầu

Describe devices, interfaces, IPs, VLANs, routes, users/services, etc.

## Thực hiện

### Step 1 — ...

Command/configuration + explanation of the expected state change.

## Verify

Use concrete verification commands and expected observations.

## Fault injection

Break one thing deliberately and ask the learner to diagnose it from symptoms.

## Checklist hoàn thành

- [ ] Functional condition 1
- [ ] Functional condition 2
- [ ] Direct verification passed

## Recall sau lab

3–5 questions the learner should answer without looking at commands.
```

## Exam-prep page

```markdown
# <Topic> — Ôn thi

## Must know

Only high-yield concepts.

## Trace pattern

The typical packet/state/configuration sequence the learner must reproduce.

## Bẫy hay nhầm

Short diagnostic notes.

## Câu hỏi tự kiểm tra

Mix explanation, comparison, trace, and troubleshooting questions.

## 60-second recap

The smallest useful memory scaffold.
```

## Project / case-study page

```markdown
# <Project or case study>

## Problem
## Architecture
## Components
## Data / traffic flow
## Security and failure modes
## Implementation milestones
## Verification criteria
## What this demonstrates
## Sources and licensing
```

## Review gate for every page

Before a page is considered reviewed:

- terminology is consistent with neighboring pages
- mechanism is explained, not only defined
- at least one concrete trace/example exists when appropriate
- commands have purpose + verification, not copy-paste only
- public prose contains no agent/milestone/scaffolding language
- cross-links are present
- source/provenance is recorded
- copyrighted figures are recreated or have clear permission
- direct route and build checks pass
