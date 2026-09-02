---
title: Switching, VLAN & Inter-VLAN Routing
description: Từ chuyển tiếp frame ở Layer 2 đến phân đoạn VLAN và định tuyến giữa các VLAN.
tags:
  - nt132
  - switching-vlan
status: reviewed
sources:
  - "3.1 Switch and VLAN.pdf"
  - "3. InterVLAN routing.pdf"
---

## Học theo thứ tự

1. [Switch và VLAN](./switch-va-vlan/): hiểu switch giải quyết bài toán Layer 2 như thế nào, VLAN tạo ranh giới broadcast ra sao, và access/trunk vận chuyển frame thế nào.
2. [Inter-VLAN Routing](./inter-vlan-routing/): hiểu vì sao traffic giữa các VLAN cần Layer 3, rồi so sánh Legacy, Router-on-a-stick và Multilayer Switch/SVI.

## Kiến thức cần trước

- [Thiết bị mạng và Hạ tầng mạng](../01-ha-tang-mang/): frame, MAC, IP, broadcast domain và khác biệt giữa switch với router.
- [Routing - Định tuyến](../02-routing/): router chọn mạng đích và đóng gói lại frame ở mỗi chặng Layer 3.

## Kết quả học tập

Sau hai bài, bạn có thể nhìn một đường đi và trả lời được:

- Frame đang ở VLAN nào và cổng đang là access hay trunk?
- Hai host có còn ở cùng broadcast domain Layer 2 không?
- Nếu khác VLAN, thiết bị Layer 3 nào đang làm default gateway và frame sẽ đổi ở đâu?

## Một câu hỏi dẫn đường

Routing trả lời câu hỏi **các mạng Layer 3 kết nối với nhau thế nào**. Phần này lùi lại một bước để xem host được phân đoạn và frame được vận chuyển trong Layer 2 ra sao trước khi traffic chạm đến router.

## Tự kiểm tra nhanh

1. Vì sao hai host VLAN 10 trên hai switch vẫn có thể giao tiếp qua trunk mà không cần router?
2. Vì sao trunk mang được nhiều VLAN nhưng không tự biến VLAN 10 thành VLAN 20?
3. Trong một frame đi qua switch Layer 2, trường địa chỉ nào dùng để quyết định cổng ra?
4. Khi hai host khác VLAN giao tiếp, điều gì quyết định rằng cần đi qua default gateway?
5. Hãy nêu khác biệt cốt lõi giữa Router-on-a-stick và SVI.

## Nguồn & phạm vi

Hai bài được viết độc lập từ các khái niệm trong hai tài liệu môn học Class B (reference only). Các topology và SVG là nội dung do tác giả biên soạn; các lệnh IOS và chi tiết 802.1Q được ghi riêng là tài liệu bổ trợ Cisco khi cần.

[Tiếp theo: Network Services](../04-network-services/)
