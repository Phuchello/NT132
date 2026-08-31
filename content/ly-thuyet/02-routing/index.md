---
title: Routing — Định tuyến
description: Cơ chế hoạt động của Static Routing, RIP (Distance Vector) và OSPF (Link-State) trong mạng máy tính.
---

# Routing — Định tuyến

Định tuyến (**Routing**) là tiến trình Router tìm kiếm và lựa chọn con đường tối ưu để chuyển tiếp gói tin (**Packet**) từ mạng nguồn đến mạng đích thông qua bảng định tuyến (**Routing Table**).

Trong chương này, chúng ta sẽ đi qua 3 phương pháp định tuyến quan trọng nhất: từ cấu hình thủ công (**Static Routing**), đến giao thức trao đổi theo khoảng cách (**RIP**), và giao thức xây dựng bản đồ toàn cảnh bằng thuật toán Dijkstra (**OSPF**).

---

## Các chủ đề trong chương

```text
Chương 02: Routing
├── 1. Static Routing (Định tuyến tĩnh)
│     └── Cấu hình thủ công, 4 loại route (Standard, Default, Summary, Floating)
│
├── 2. RIP — Distance Vector Routing Protocol
│     └── Trao đổi danh sách mạng với láng giềng, thuật toán Bellman-Ford, metric Hop Count
│
└── 3. OSPF — Link-State Routing Protocol & Dijkstra
      └── Thu thập trạng thái liên kết (LSDB), thuật toán Dijkstra (SPF), metric Băng thông (Cost)
```

1. [Static Routing — Định tuyến tĩnh](./static-routing/): Khi nào nên dùng định tuyến tĩnh, 4 loại route cốt lõi, cách xử lý hiện tượng tra cứu đệ quy và bẫy thiếu đường về.
2. [RIP — Distance Vector Routing Protocol](./rip/): Triết lý "routing by rumor", cơ chế tăng số hop, chu kỳ cập nhật 30s, so sánh RIPv1 vs RIPv2, và tiến trình hội tụ từng vòng.
3. [OSPF — Link-State Routing Protocol và Thuật toán Dijkstra](./ospf/): Cơ sở dữ liệu trạng thái liên kết (LSDB), thực thi thuật toán Dijkstra tìm cây đường đi ngắn nhất, và metric Cost dựa trên băng thông.

---

## Dòng chảy kiến thức (Continuity)

```text
[Hạ tầng mạng]
       │  (Router cần Bảng định tuyến để chuyển tiếp gói tin)
       ▼
[Static Routing]
       │  (Người quản trị tự tay gõ từng đường đi; khó mở rộng khi mạng lớn)
       ▼
[RIP — Distance Vector]
       │  (Router tự học từ láng giềng kề sát; nhược điểm chỉ đếm số hop)
       ▼
[OSPF — Link-State]
       │  (Router có bản đồ toàn mạng và tính toán dựa trên băng thông)
       ▼
[Tiếp theo: Switching & VLAN](../03-switching-vlan/)
```

Nguồn tham khảo chính: `2.1 Static Routing.pdf`, `2.2 Routing protocol - RIP.pdf`, `2.3 Routing protocol - OSPF.pdf`.

[Bắt đầu học: Static Routing](./static-routing/) | [Quay lại: Hạ tầng mạng](../01-ha-tang-mang/) | [Tiếp theo: Switching & VLAN](../03-switching-vlan/)
