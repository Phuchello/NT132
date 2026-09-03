---
title: Network Services
description: Từ lease DHCP đến NAT/PAT và ACL, theo dõi state, translation và policy trên đường đi của packet.
tags:
  - nt132
  - network-services
status: reviewed
sources:
  - "4.1 Network Services.pdf"
  - "4.2 DHCP Overview.pdf"
  - "4.3 NAT overview.pdf"
  - "4.4 ACL Overview.pdf"
  - "4.5 ACL Wildcard mask.pdf"
---

## Học theo thứ tự

1. [Network Services](./tong-quan-network-services/): lập bản đồ câu hỏi state - client nhận gì, packet đổi gì và policy nào quyết định.
2. [DHCP](./dhcp/): theo dõi DORA, lease, DHCP server và relay.
3. [NAT và PAT](./nat/): đọc inside/outside, translation table, overload và port forwarding.
4. [ACL](./acl/): đọc rule order, inbound/outbound, standard/extended và apply vào interface.
5. [Wildcard mask](./acl-wildcard-mask/): tính bit match/ignore để biết địa chỉ nào nằm trong rule.

## Kết quả học tập

- Mô tả được DORA và chỉ ra vì sao relay cần thiết khi server ở mạng khác.
- Nối một packet trước/sau NAT với entry tương ứng trong translation table.
- Xác định ACL nào, hướng nào và rule đầu tiên nào có thể match.
- Tính wildcard mask cho host, network và một dải địa chỉ nhỏ.
- Troubleshoot theo state và observable result thay vì chỉ ghi nhớ tên lệnh.

## Một câu hỏi dẫn đường

Khi nhìn một flow, hãy ghi lại: **client đã có cấu hình chưa**, **packet có bị đổi địa chỉ/cổng không**, và **rule nào quyết định được đi tiếp**? Bốn bài phía trên lần lượt trả lời các phần khác nhau của cùng câu hỏi đó.

## Nguồn & phạm vi

Các trang được viết độc lập từ năm tài liệu môn học Class B (reference only). Những cú pháp IOS, cách đọc output và semantics chi tiết được đánh dấu **SUPPLEMENTARY CISCO** và dẫn tới tài liệu vendor tương ứng. PDF nguồn không được sao chép vào repository hoặc public output.

[Tiếp theo: Server Platforms](../05-server-platforms/).
