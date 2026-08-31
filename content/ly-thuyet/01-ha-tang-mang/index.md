---
title: Hạ tầng mạng
description: Thiết bị mạng, vai trò các thành phần và nền tảng chuyển tiếp packet trong mô hình mạng doanh nghiệp.
---

# Hạ tầng mạng

Chương này xây dựng mô hình tư duy (Mental Model) nền tảng nhất cho toàn bộ chương trình NT132: hiểu rõ các thiết bị mạng, cấu trúc interface, địa chỉ MAC, địa chỉ IP, và cách thức dữ liệu chuyển tiếp xuyên suốt từ máy gửi tới máy nhận.

## Chủ đề trong chương

- [Thiết bị mạng và Hạ tầng mạng](./thiet-bi-va-ha-tang/): Phân biệt End Device và Network Device, nguyên lý hoạt động của Switch (Layer 2 MAC) và Router (Layer 3 IP), cùng hai luồng chuyển tiếp mẫu (cùng mạng LAN và liên mạng qua Router).

## Bản đồ học tập

```text
Hạ tầng mạng (Switch L2, Router L3, MAC/IP, Default Gateway)
   └── Cần bảng định tuyến để forward packet
         └── [Tiếp theo: Routing](../02-routing/)
               ├── [Static Routing](../02-routing/static-routing/) (Người quản trị cấu hình tay)
               ├── [RIP](../02-routing/rip/) (Học tự động theo Distance Vector)
               └── [OSPF](../02-routing/ospf/) (Xây dựng bản đồ toàn cảnh Link-State)
```

Nguồn tham khảo chính: `1.1 Chương 1 Thiết bị mạng và hạ tầng mạng.pdf`.

[Bắt đầu học: Thiết bị mạng và Hạ tầng mạng](./thiet-bi-va-ha-tang/) | [Tiếp theo: Routing](../02-routing/)
