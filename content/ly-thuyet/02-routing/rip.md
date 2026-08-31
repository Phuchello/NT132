---
title: RIP — Distance Vector Routing Protocol
tags:
  - nt132
  - routing
status: reviewed
sources:
  - "2.2 Routing protocol - RIP.pdf"
---

# RIP — Distance Vector Routing Protocol

## 1. Map — cần nắm gì?

- **Triết lý Distance Vector (Định tuyến theo vectơ khoảng cách)**: Được ví như _"Routing by rumor"_ (định tuyến theo lời đồn). Mỗi router chỉ trao đổi danh sách mạng và khoảng cách (**Vector**) với các router láng giềng kết nối trực tiếp, hoàn toàn không cần biết toàn cảnh sơ đồ mạng.
- **Thuật toán Bellman-Ford**: Là nền tảng toán học của Distance Vector, chịu trách nhiệm tính toán đường đi ngắn nhất đến các nút dựa trên thông tin nhận được từ các nút láng giềng liền kề.
- **Giao thức RIP (Routing Information Protocol)**:
  - **Metric (Thước đo)**: **Hop Count** (Số lượng Router trung gian phải đi qua). Giới hạn tối đa là **15 hops**; giá trị **16 hops** được coi là vô cực (**Infinity / Unreachable**).
  - **Chu kỳ cập nhật**: Gửi toàn bộ bảng định tuyến định kỳ mỗi **30 giây** qua giao thức tầng giao vận **UDP port 520**.
- **Sự khác biệt cốt tử giữa RIPv1 và RIPv2**:
  - **RIPv1**: Giao thức theo lớp địa chỉ (**Classful**), không gửi kèm Subnet Mask, gửi broadcast `255.255.255.255`, không hỗ trợ VLSM/CIDR hay xác thực.
  - **RIPv2**: Giao thức phi lớp (**Classless**), gửi kèm Subnet Mask, gửi multicast `224.0.0.9`, hỗ trợ đầy đủ VLSM, CIDR và xác thực (Authentication).
- **Các lệnh cấu hình thiết yếu**: `router rip`, `version 2`, `no auto-summary`, `network`, `passive-interface`, `default-information originate`.

---

## 2. Bài toán nó giải quyết

Ở chương trước, ta thấy Static Routing hoạt động tốt trong mạng nhỏ. Nhưng khi hệ thống phát triển:

- Có hàng chục Router kết nối đan xen lẫn nhau.
- Các liên kết cáp viễn thông thường xuyên thay đổi trạng thái (chập chờn, đứt cáp bảo trì, bổ sung chi nhánh mới).
- Người quản trị không thể thức trực 24/7 để gõ lại hàng trăm câu lệnh `ip route` mỗi khi có sự cố.

**Câu hỏi cốt lõi của Dynamic Routing**:

> _"Làm thế nào để một Router có thể tự động học được tất cả các mạng ở xa từ các Router khác mà không cần phải nắm rõ toàn bộ sơ đồ cấu trúc mạng?"_

**Giải pháp của Distance Vector**: Router chỉ cần trao đổi thông tin với các láng giềng kề sát mình: _"Tôi biết những mạng này và khoảng cách từ tôi đến đó là bấy nhiêu hops"_. Nhận được thông tin đó, láng giềng chỉ việc cộng thêm 1 hop và lưu vào bảng định tuyến. Thông tin cứ thế lan truyền từ từ qua từng trạm (hop) cho đến khi toàn mạng đồng nhất.

---

## 3. Bản chất / cơ chế

### 3.1. Nguyên lý Distance Vector & Thuật toán Bellman-Ford

Thuật ngữ **Distance Vector** bao gồm 2 thành phần:

- **Distance (Khoảng cách)**: Đo lường mức độ xa gần để đến được mạng đích. Trong RIP, khoảng cách được đo bằng số lượng Router (Hop Count).
- **Vector (Hướng đi)**: Cổng thoát vật lý (**Exit Interface**) hoặc địa chỉ IP của Router kế tiếp (**Next-Hop IP**) cần chuyển tiếp gói tin tới.

```text
Thông điệp định tuyến của Distance Vector:
"Gửi láng giềng: Để đến mạng Net X, hướng đi là qua tôi, khoảng cách là d hops."
```

#### Quy tắc cộng dồn Hop Count (Hop Increment Rule):

1. Router quảng bá mạng kết nối trực tiếp của mình với khoảng cách `Hop = 0`.
2. Router láng giềng nhận bản tin, tự động cộng thêm `1` vào Metric:
   $$\text{Hop}_{\text{new}} = \text{Hop}_{\text{received}} + 1$$
3. Nếu nhận được thông tin về cùng một mạng đích từ nhiều láng giềng khác nhau, Router sẽ so sánh và **chọn đường đi có Hop Count nhỏ nhất** để cài vào bảng định tuyến.
4. Nếu Hop Count đạt giá trị **16**, mạng đó lập tức bị coi là không thể chạm tới (**Unreachable / Infinite Metric**) và bị loại bỏ sau khi hết thời gian chờ.

---

### 3.2. So sánh toàn diện: RIPv1 vs RIPv2

Bảng đối chiếu kỹ thuật chi tiết giữa hai thế hệ của giao thức RIP:

| Đặc tính kỹ thuật                  | RIP Version 1 (RIPv1)             | RIP Version 2 (RIPv2)                     | Ý nghĩa thực tế                                                                                   |
| :--------------------------------- | :-------------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------------ |
| **Loại giao thức**                 | **Classful** (Theo lớp A, B, C)   | **Classless** (Phi lớp)                   | RIPv1 ép các mạng về lớp chuẩn (/8, /16, /24), RIPv2 hỗ trợ chia mạng con tùy ý.                  |
| **Gửi kèm Subnet Mask**            | **Không**                         | **Có**                                    | Không có Subnet Mask thì không thể chạy các mạng chia nhỏ theo VLSM.                              |
| **Địa chỉ gửi cập nhật**           | **Broadcast** (`255.255.255.255`) | **Multicast** (`224.0.0.9`)               | Broadcast làm phiền tất cả máy tính trong LAN; Multicast chỉ các router chạy RIPv2 mới lắng nghe. |
| **Hỗ trợ VLSM & CIDR**             | **Không**                         | **Có**                                    | Tiết kiệm không gian địa chỉ IPv4 hiện đại.                                                       |
| **Xác thực (Authentication)**      | **Không**                         | **Có** (Plain text / MD5)                 | Ngăn chặn kẻ gian cắm router giả mạo để đầu độc bảng định tuyến.                                  |
| **Tự động tóm tắt (Auto-Summary)** | Bắt buộc                          | Mặc định bật (tắt bằng `no auto-summary`) | Cần tắt trên RIPv2 để tránh lỗi định tuyến khi mạng con bị phân mảnh.                             |

---

## 4. Luồng hoạt động: Sự tiến hóa của Routing Table qua từng vòng

Để thấy rõ cách thức Router học hỏi và hội tụ mà không cần biết toàn cảnh sơ đồ mạng, ta theo dõi tiến trình qua từng vòng cập nhật trên sơ đồ 3 Router `R1 - R2 - R3`.

![Tiến trình học định tuyến của RIP theo từng vòng](../../static/diagrams/rip-propagation-rounds.svg)

### Sơ đồ Topology:

- **LAN 1 (`192.168.1.0/24`)** cắm cổng `Fa0/0` của `R1`.
- **Link WAN 1 (`192.168.12.0/30`)** nối `R1 (S0/0/0)` với `R2 (S0/0/0)`.
- **Link WAN 2 (`192.168.23.0/30`)** nối `R2 (S0/0/1)` với `R3 (S0/0/0)`.
- **LAN 3 (`192.168.3.0/24`)** cắm cổng `Fa0/0` của `R3`.

---

### Giai đoạn 0: Trạng thái khởi đầu ($T = 0\text{s}$)

Khi vừa kích hoạt RIP trên các cổng, các Router chỉ mới biết các mạng kết nối trực tiếp (**Connected**):

```text
Bảng định tuyến ban đầu (T = 0s):
+------------------------------------+------------------------------------+------------------------------------+
| Router R1                          | Router R2                          | Router R3                          |
+------------------------------------+------------------------------------+------------------------------------+
| C 192.168.1.0/24  Fa0/0  (Hop 0)   | C 192.168.12.0/30 S0/0/0 (Hop 0)   | C 192.168.23.0/30 S0/0/0 (Hop 0)   |
| C 192.168.12.0/30 S0/0/0 (Hop 0)   | C 192.168.23.0/30 S0/0/1 (Hop 0)   | C 192.168.3.0/24  Fa0/0  (Hop 0)   |
+------------------------------------+------------------------------------+------------------------------------+
```

---

### Giai đoạn 1: Vòng cập nhật đầu tiên ($T = 30\text{s}$)

Sau 30 giây, các Router gửi toàn bộ bảng định tuyến của mình ra các interface đang bật RIP:

- `R1` gửi cho `R2`: `192.168.1.0/24 (Hop 0)` $\rightarrow$ `R2` nhận, cộng 1 hop thành **Hop = 1**.
- `R3` gửi cho `R2`: `192.168.3.0/24 (Hop 0)` $\rightarrow$ `R2` nhận, cộng 1 hop thành **Hop = 1**.
- `R2` gửi cho `R1`: `192.168.23.0/30 (Hop 0)` $\rightarrow$ `R1` nhận, cộng 1 hop thành **Hop = 1**.
- `R2` gửi cho `R3`: `192.168.12.0/30 (Hop 0)` $\rightarrow$ `R3` nhận, cộng 1 hop thành **Hop = 1**.

```text
Bảng định tuyến sau Vòng 1 (T = 30s):
+------------------------------------+------------------------------------+------------------------------------+
| Router R1                          | Router R2                          | Router R3                          |
+------------------------------------+------------------------------------+------------------------------------+
| C 192.168.1.0/24  Fa0/0  (Hop 0)   | C 192.168.12.0/30 S0/0/0 (Hop 0)   | C 192.168.23.0/30 S0/0/0 (Hop 0)   |
| C 192.168.12.0/30 S0/0/0 (Hop 0)   | C 192.168.23.0/30 S0/0/1 (Hop 0)   | C 192.168.3.0/24  Fa0/0  (Hop 0)   |
| R 192.168.23.0/30 via R2 (Hop 1)   | R 192.168.1.0/24  via R1 (Hop 1)   | R 192.168.12.0/30 via R2 (Hop 1)   |
|                                    | R 192.168.3.0/24  via R3 (Hop 1)   |                                    |
+------------------------------------+------------------------------------+------------------------------------+
* Lưu ý: Lúc này R1 vẫn CHƯA BIẾT LAN 3, và R3 vẫn CHƯA BIẾT LAN 1!
```

---

### Giai đoạn 2: Vòng cập nhật thứ hai — Mạng hội tụ ($T = 60\text{s}$)

Sau 60 giây, một chu kỳ gửi bản tin mới diễn ra:

- `R2` gửi cho `R1` bảng định tuyến đã cập nhật của nó, bao gồm cả tuyến đường `192.168.3.0/24 (Hop 1)`.
- `R1` nhận bản tin, cộng thêm 1 hop $\rightarrow$ `R1` cài đặt tuyến đường `192.168.3.0/24 via R2` với **Hop = 2**.
- Tương tự, `R2` gửi cho `R3` tuyến đường `192.168.1.0/24 (Hop 1)` $\rightarrow$ `R3` cài đặt tuyến đường `192.168.1.0/24 via R2` với **Hop = 2**.

```text
Bảng định tuyến sau Vòng 2 — TRẠNG THÁI HỘI TỤ (CONVERGED):
+------------------------------------+------------------------------------+------------------------------------+
| Router R1                          | Router R2                          | Router R3                          |
+------------------------------------+------------------------------------+------------------------------------+
| C 192.168.1.0/24  (Hop 0)          | C 192.168.12.0/30 (Hop 0)          | C 192.168.3.0/24  (Hop 0)          |
| C 192.168.12.0/30 (Hop 0)          | C 192.168.23.0/30 (Hop 0)          | C 192.168.23.0/30 (Hop 0)          |
| R 192.168.23.0/30 via R2 (Hop 1)   | R 192.168.1.0/24  via R1 (Hop 1)   | R 192.168.12.0/30 via R2 (Hop 1)   |
| R 192.168.3.0/24  via R2 [Hop 2]   | R 192.168.3.0/24  via R3 (Hop 1)   | R 192.168.1.0/24  via R2 [Hop 2]   |
+------------------------------------+------------------------------------+------------------------------------+
```

Mọi Router đều đã có đầy đủ đường đi đến tất cả các mạng trong hệ thống. Mạng đạt trạng thái **Hội tụ hoàn toàn (Fully Converged)**.

---

## 5. Cấu hình / command quan trọng

### 5.1. Quy trình cấu hình chuẩn RIPv2 trên Cisco IOS

```text
R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# no auto-summary
R1(config-router)# network 192.168.1.0
R1(config-router)# network 192.168.12.0
R1(config-router)# passive-interface GigabitEthernet0/0
R1(config-router)# default-information originate
```

### 5.2. Giải thích cơ chế từng câu lệnh:

1. `router rip`: Kích hoạt tiến trình định tuyến RIP trên thiết bị.
2. `version 2`: Bắt buộc chuyển sang RIPv2 để hỗ trợ Subnet Mask (VLSM) và gửi gói tin Multicast `224.0.0.9`.
3. `no auto-summary`: **Cực kỳ quan trọng!** Tắt tính năng tự động gộp dải mạng về lớp chuẩn (Classful boundary). Nếu không có lệnh này, các mạng con như `10.1.1.0/24` và `10.2.2.0/24` sẽ bị gộp thành `10.0.0.0/8`, gây lỗi định tuyến nghiêm trọng.
4. `network <classful-network-address>`:
   - **Lưu ý bản chất**: Lệnh `network` trong RIP không phải là _"quảng bá dải mạng này"_, mà là: _"Tìm xem interface nào trên router đang có địa chỉ IP thuộc mạng này để: (1) Bật gửi/nhận RIP trên interface đó; (2) Quảng bá mạng của interface đó cho các router láng giềng"_.
5. `passive-interface <interface>`:
   - **Vấn đề**: Cổng nối xuống Switch người dùng (LAN) không có router nào khác, nhưng mặc định Router vẫn phát bản tin RIP định kỳ mỗi 30s vào LAN.
   - **Tác dụng**: Lệnh `passive-interface` ngăn Router phát bản tin cập nhật ra cổng LAN (tiết kiệm băng thông, giảm tải CPU máy trạm, tăng tính bảo mật), nhưng **vẫn tiếp tục quảng bá mạng LAN đó** cho các router khác biết.
6. `default-information originate`:
   - Nếu Router biên có cấu hình Default Route (`ip route 0.0.0.0 0.0.0.0 ...`) ra Internet, lệnh này sẽ tự động nhân bản và phát tán Default Route đó vào toàn bộ miền RIP để các router nhánh tự động nhận làm Gateway mặc định.

---

### 5.3. Các lệnh kiểm tra và chẩn đoán (Verification)

```text
! 1. Xem các route học qua RIP trong bảng định tuyến
Router# show ip route rip
R     192.168.3.0/24 [120/2] via 192.168.12.2, 00:00:18, Serial0/0/0

! 2. Xem thông tin tiến trình và các interface đang chạy RIP
Router# show ip protocols
Routing Protocol is "rip"
  Sending updates every 30 seconds, next due in 12 seconds
  Invalid after 180 seconds, hold down 180, flushed after 240
  Outgoing update filter list for all interfaces is not set
  Incoming update filter list for all interfaces is not set
  Redistributing: rip
  Default version control: send version 2, receive 2
    Interface             Send  Recv  Triggered RIP  Key-chain
    Serial0/0/0           2     2
  Automatic network summarization is not in effect
  Routing for Networks:
    192.168.1.0
    192.168.12.0
  Passive Interface(s):
    GigabitEthernet0/0
  Routing Information Sources:
    Gateway         Distance      Last Update
    192.168.12.2         120      00:00:18
  Distance: (default is 120)
```

**Cách đọc dòng định tuyến RIP**:

- `R`: Ký hiệu tuyến đường học qua **RIP**.
- `192.168.3.0/24`: Mạng đích.
- `[120/2]`:
  - `120`: **Administrative Distance (AD)** của giao thức RIP.
  - `2`: **Metric** (tương ứng với **2 hops** — qua 2 router).
- `via 192.168.12.2`: Địa chỉ IP của Next-hop láng giềng đã gửi thông tin định tuyến này.
- `00:00:18`: Thời gian kể từ lần cuối nhận được gói tin cập nhật (Timer đếm ngược từ 30s).

---

## 6. So sánh: Static Routing vs RIP

| Tiêu chí so sánh           | Static Routing (Định tuyến tĩnh)                    | RIPv2 (Distance Vector)                                  |
| :------------------------- | :-------------------------------------------------- | :------------------------------------------------------- |
| **Cách học đường đi**      | Người quản trị gõ lệnh thủ công từng dòng.          | Tự động học và trao đổi qua bản tin định kỳ mỗi 30s.     |
| **Công sức quản trị**      | Tăng theo cấp số nhân khi mạng mở rộng.             | Thấp, chỉ cần khai báo lệnh `network` lúc khởi tạo.      |
| **Phản ứng khi đổi sơ đồ** | Không tự đổi đường; cần quản trị viên sửa thủ công. | Tự động phát hiện đứt link và cập nhật lại bảng routing. |
| **Khả năng mở rộng**       | Giới hạn ở mạng nhỏ hoặc mạng Stub.                 | Giới hạn tối đa **15 hops**.                             |
| **Tiêu tốn tài nguyên**    | Không tốn CPU/RAM và băng thông mạng.               | Tốn băng thông gửi định kỳ 30s và CPU xử lý bản tin.     |
| **Tính bảo mật**           | Rất cao, không phát tán thông tin ra ngoài.         | Cần cấu hình `passive-interface` và Authentication.      |

---

## 7. Sai lầm thường gặp

| Lỗi phổ biến                                 | Hậu quả                                                                                                                                                                                                     | Cách phòng tránh & Khắc phục                                                                                                           |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Quên gõ lệnh `version 2`**                 | Router chạy mặc định RIPv1, không hiểu Subnet Mask $\rightarrow$ các mạng chia theo VLSM bị mất kết nối hoàn toàn.                                                                                          | Luôn gõ `version 2` ngay sau khi vào chế độ `router rip`.                                                                              |
| **Quên gõ `no auto-summary`**                | Khi có 2 dải mạng con cùng thuộc mạng chính (ví dụ `10.1.0.0/16` và `10.2.0.0/16`) nằm ở 2 đầu xa nhau (Discontiguous Networks), router tự động tóm tắt thành `10.0.0.0/8`, gây xung đột và định tuyến sai. | Luôn kiểm tra `show ip protocols` đảm bảo `Automatic network summarization is not in effect`.                                          |
| **Nhầm lẫn vai trò của `passive-interface`** | Tưởng rằng `passive-interface` là không cho mạng đó tham gia định tuyến nữa.                                                                                                                                | `passive-interface` chỉ chặn việc phát bản tin update ra cổng, nhưng router **vẫn tiếp tục quảng bá dải mạng đó** cho các router khác. |
| **Thiết kế mạng vượt quá 15 hops**           | Các router cách nguồn từ 16 hops trở lên coi mạng đích là Unreachable và không cài vào bảng định tuyến.                                                                                                     | Không dùng RIP cho các mạng doanh nghiệp quy mô lớn có đường kính vượt quá 15 routers.                                                 |

---

## 8. Recall — đóng tài liệu lại

1. **Một Router chạy RIP nhận được thông tin về mạng `10.0.0.0/24` từ Router A với metric là 2 hops, và từ Router B với metric là 4 hops. Router sẽ chọn đường nào? Điều này phản ánh triết lý ra quyết định gì của RIP?**
2. **Tại sao lệnh `no auto-summary` lại là bắt buộc trong hầu hết các mô hình mạng hiện đại sử dụng RIPv2?**
3. **Nếu một kỹ sư gõ lệnh `passive-interface GigabitEthernet0/0` trên cổng nối mạng LAN của R1, các máy tính trong LAN có còn gửi được dữ liệu ra các router ở xa không? Tại sao?**

---

## 9. Apply — vận dụng thực tế

### Bài tập 1: Phân tích đường đi và Metric của RIP

Cho mạng dạng vòng (Ring Topology) gồm 4 Router: `R1 - R2 - R3 - R4 - R1`.
Mỗi liên kết giữa các router liền kề là 1 hop. Mạng `LAN A` nối trực tiếp vào `R1`.

1. Hỏi `R3` sẽ nhận được thông tin về `LAN A` qua những đường nào và với metric bao nhiêu?
2. Bảng định tuyến của `R3` sẽ cài đặt tuyến đường nào? (Gợi ý: xem xét trường hợp Equal-Cost Multi-Path — ECMP).

> **Hướng dẫn giải**:
>
> 1. `R3` nhận thông tin về `LAN A`:
>    - Qua hướng `R2`: `LAN A (Hop 0)` $\rightarrow$ `R1` quảng bá $\rightarrow$ `R2` (Hop 1) $\rightarrow$ `R3` nhận được với **Hop = 2**.
>    - Qua hướng `R4`: `LAN A (Hop 0)` $\rightarrow$ `R1` quảng bá $\rightarrow$ `R4` (Hop 1) $\rightarrow$ `R3` nhận được với **Hop = 2**.
> 2. Vì cả hai đường đều có Metric bằng nhau (Hop = 2), RIP sẽ cài đặt **cả hai đường** vào bảng định tuyến và thực hiện cơ chế cân bằng tải (**Load Balancing**) trên cả 2 cổng.

---

### Bài tập 2: Chẩn đoán sự cố mạng chạy RIPv2 (Troubleshooting)

Một hệ thống gồm 2 router `R1` và `R2` kết nối với nhau. `R1` quản lý mạng `172.16.10.0/24`, `R2` quản lý mạng `172.16.20.0/24`.
Sau khi cấu hình RIP trên cả 2 router, PC tại `R1` không thể ping tới PC tại `R2`.
Kiểm tra `show ip route` trên `R2` thấy xuất hiện dòng:

```text
R   172.16.0.0/16 [120/1] via 192.168.12.1
```

**Hãy xác định nguyên nhân và câu lệnh sửa lỗi trên R1**.

> **Hướng dẫn giải**:
>
> - **Nguyên nhân**: Dòng định tuyến hiển thị `172.16.0.0/16` thay vì `/24` chứng tỏ `R1` đã tự động tóm tắt mạng về lớp B chuẩn (Classful Auto-summary) do chưa tắt tính năng auto-summary.
> - **Cách sửa trên R1**:
>   ```text
>   R1(config)# router rip
>   R1(config-router)# version 2
>   R1(config-router)# no auto-summary
>   ```

---

## 10. Ôn nhanh (60-Second Recap)

- **Distance Vector**: Router trao đổi danh sách mạng và khoảng cách với láng giềng kề sát ("routing by rumor").
- **RIP Metric**: **Hop count** (tối đa 15 hops; 16 = Unreachable).
- **RIP Updates**: Định kỳ **30 giây / lần** qua **UDP port 520**.
- **RIPv1 vs RIPv2**: RIPv1 (Classful, Broadcast); RIPv2 (Classless, Multicast `224.0.0.9`, hỗ trợ VLSM và bảo mật).
- **Lệnh cốt lõi**: `version 2`, `no auto-summary`, `passive-interface`.
- **Hạn chế lớn nhất**: Chỉ đếm số hop, hoàn toàn không phân biệt được cáp quang 10 Gbps và cáp đồng 100 kbps $\rightarrow$ Mở đường cho Link-State (OSPF).

---

## 11. Liên kết

- **Bài học trước**: [Static Routing — Định tuyến tĩnh](./static-routing/) (So sánh giữa cấu hình tay và giao thức động).
- **Bài học tiếp theo**: [OSPF — Link-State Routing Protocol](./ospf/) (Khắc phục triệt để điểm yếu của Hop Count bằng Băng thông và Thuật toán Dijkstra).
- **Chủ đề liên quan**: [Thiết bị mạng và Hạ tầng mạng](../01-ha-tang-mang/thiet-bi-va-ha-tang/).

---

## Nguồn

- Nguồn tài liệu chính: `2.2 Routing protocol - RIP.pdf` (Khoa Mạng máy tính & Truyền thông — ĐH Công nghệ Thông tin ĐHQG-HCM).
- Phân loại bản quyền: Nguồn tham khảo học liệu (Class B). Toàn bộ nội dung, ví dụ tiến trình 3 router và phân tích gói tin được tác giả biên soạn độc lập.
- Sơ đồ trực quan: Bản vẽ SVG nguyên gốc `rip-propagation-rounds.svg` được thiết kế riêng cho NT132.
