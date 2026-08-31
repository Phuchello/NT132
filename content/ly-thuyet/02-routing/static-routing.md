---
title: Static Routing — Định tuyến tĩnh
tags:
  - nt132
  - routing
status: reviewed
sources:
  - "2.1 Static Routing.pdf"
---

## 1. Map — cần nắm gì?

- **Định tuyến tĩnh (Static Routing)** là phương pháp người quản trị cấu hình thủ công từng dòng đường đi vào bảng định tuyến (**Routing Table**) của Router.
- **4 loại Static Route bắt buộc phải phân biệt**:
  1. **Standard Static Route**: Trỏ đến một mạng đích cụ thể với prefix/subnet mask xác định.
  2. **Default Static Route (`0.0.0.0/0`)**: Tuyến đường mặc định ("Gateway of Last Resort") khớp với mọi địa chỉ không có trong bảng định tuyến.
  3. **Summary Static Route**: Gộp nhiều dải mạng liên tiếp có chung tiền tố thành một route duy nhất để thu gọn bảng định tuyến.
  4. **Floating Static Route**: Tuyến đường dự phòng có **Administrative Distance (AD)** cao hơn route chính cần dự phòng; route phụ trở nên eligible khi route ưu tiên bị gỡ hoặc không còn resolve/được cài vào bảng định tuyến.
- **3 cách chỉ định lối ra trong câu lệnh `ip route`**: Next-hop IP (gây ra _Recursive Lookup_), Exit Interface (Directly attached), hoặc Fully Specified (kết hợp cả hai).
- **Quy tắc hai chiều (Two-way Rule)**: Mọi kết nối mạng TCP/IP đều là tương tác hai chiều; có đường đi nhưng **thiếu đường về** là nguyên nhân kinh điển khiến mạng không thông suốt.

---

## 2. Bài toán nó giải quyết

Ở chương trước, ta thấy Router dựa vào bảng định tuyến (**Routing Table**) để chuyển tiếp gói tin. Tuy nhiên:

- Mặc định sau khi bật nguồn và đặt IP cho các interface, Router **chỉ biết các mạng kết nối trực tiếp (Directly Connected Networks)**.
- Khi một máy tính trong mạng nội bộ gửi gói tin đến một mạng ở xa (**Remote Network**), Router tra bảng định tuyến không thấy $\rightarrow$ **Router lập tức hủy gói tin (Drop)** và gửi thông báo lỗi `Destination Host Unreachable` về máy gửi.

Để Router biết cách đưa gói tin đến các mạng ở xa, người quản trị có 2 cách tiếp cận:

1. **Định tuyến tĩnh (Static Routing)**: Tự tay nhập từng đường đi cho Router.
2. **Định tuyến động (Dynamic Routing)**: Cài đặt giao thức (như RIP, OSPF) để các Router tự nói chuyện và trao đổi thông tin định tuyến với nhau.

```text
So sánh tổng quan đặc tính:
+-------------------+---------------------------------------------------+----------------------------------------------------+
| Tiêu chí          | Định tuyến tĩnh (Static Routing)                 | Định tuyến động (Dynamic Routing: RIP, OSPF)       |
+-------------------+---------------------------------------------------+----------------------------------------------------+
| Cơ chế            | Người quản trị cấu hình thủ công từng dòng.       | Các Router tự động trao đổi và cập nhật đường đi.  |
| Tiêu hao tài nguyên| Tiết kiệm băng thông & CPU control plane (không   | Tiêu tốn CPU/RAM tính toán và băng thông gửi bản tin|
|                   | gửi định kỳ routing updates qua mạng). Vẫn chiếm  | định tuyến định kỳ/khi có thay đổi.                |
|                   | bộ nhớ RAM lưu trữ bảng định tuyến.               |                                                    |
| Tính bảo mật      | Thông tin đường đi không bị phát tán ra ngoài qua | Có thể bị lộ cấu trúc mạng nếu không cấu hình bảo |
|                   | giao thức định tuyến (giảm nguy cơ do thám).      | mật/xác thực cho giao thức định tuyến.             |
| Khả năng mở rộng  | Kém (phù hợp mạng nhỏ; mạng lớn cấu hình phức tạp)| Rất tốt (tự thích ứng mạng quy mô lớn).            |
| Khi có sự cố đứt  | Đường đi cố định; không tự đổi đường (trừ khi dùng| Tự động phát hiện đứt link và chuyển hướng dữ liệu.|
|                   | Floating Route khi route chính bị gỡ hoặc không  |                                                    |
|                   | còn resolve/được cài). Static thuần túy không tự  |                                                    |
|                   | phát hiện mọi sự cố ở xa.                        |                                                    |
+-------------------+---------------------------------------------------+----------------------------------------------------+
```

### Khi nào nên dùng Static Routing? _(Nguồn bài giảng)_

1. **Mạng quy mô nhỏ**: Hệ thống chỉ gồm 2–3 Router, sơ đồ mạng cố định ít khi thay đổi.
2. **Mạng Stub (Stub Network)**: Mạng chi nhánh chỉ có **duy nhất một đường ra** kết nối về trụ sở chính hoặc nối ra nhà cung cấp dịch vụ Internet (ISP). Router của mạng này gọi là **Stub Router**.
3. **Định tuyến mặc định ra Internet (Default Route)**: Dùng 1 dòng lệnh duy nhất để chuyển toàn bộ lưu lượng truy cập ra ngoài cho Router biên của ISP.

---

## 3. Bản chất / cơ chế — 4 loại Static Route

![4 loại Static Route trong thực tế](../../static/diagrams/static-routing-topology.svg)

### 3.1. Standard Static Route (Route tiêu chuẩn) _(Nguồn bài giảng)_

- **Bài toán**: Router $R_1$ cần gửi dữ liệu đến một mạng con cụ thể ở xa (ví dụ mạng LAN $192.168.3.0/24$ nằm sau Router $R_3$).
- **Mục trong Routing Table**: Trỏ chính xác địa chỉ mạng đích và Subnet Mask của mạng đó.
- **Cú pháp**:
  ```text
  Router(config)# ip route <destination-network> <subnet-mask> <next-hop-ip | exit-interface>
  ```
- **Tại sao Router chọn nó?** _(Bổ trợ RFC 1812)_: Router luôn áp dụng nguyên tắc **Longest Prefix Match** (ưu tiên khớp tiền tố dài nhất). Một route chi tiết $/24$ luôn được ưu tiên hơn một route chung $/16$ hoặc route mặc định $/0$.

### 3.2. Default Static Route (Route mặc định — Gateway of Last Resort) _(Nguồn bài giảng)_

- **Bài toán**: Trên Internet có hàng trăm ngàn dải mạng khác nhau. Một Router chi nhánh không thể chứa hết từng dòng định tuyến cho mọi trang web trên thế giới.
- **Mục trong Routing Table**: Sử dụng địa chỉ mạng `0.0.0.0` và Subnet Mask `0.0.0.0` (viết tắt là `0.0.0.0/0`).
- **Cú pháp**:
  ```text
  Router(config)# ip route 0.0.0.0 0.0.0.0 <next-hop-ip | exit-interface>
  ```
- **Cách thức hoạt động**: Khi gói tin đến, Router so sánh IP đích với tất cả các dòng trong bảng định tuyến. Nếu **không tìm thấy bất kỳ dòng nào khớp**, Router sẽ dùng Default Route để đẩy gói tin ra ngoài. Vì vậy Default Route còn được gọi là **Gateway of Last Resort** (Lối thoát cuối cùng).

### 3.3. Summary Static Route (Route tóm tắt / Siêu mạng - Supernetting) _(Nguồn bài giảng)_

- **Bài toán**: Chi nhánh B có 4 mạng LAN liên tiếp: `172.16.0.0/24`, `172.16.1.0/24`, `172.16.2.0/24`, `172.16.3.0/24`. Nếu cấu hình 4 dòng `ip route` riêng biệt trên Router trung tâm HQ, bảng định tuyến sẽ tốn thêm mục lưu trữ.
- **Mục trong Routing Table**: Tìm tiền tố nhị phân chung (**Common Prefix Bits**) của cả 4 dải mạng để gộp thành một dải mạng lớn hơn:
  ```text
  172.16.0.0/24:  10101100 . 00010000 . 000000 00 . 00000000
  172.16.1.0/24:  10101100 . 00010000 . 000000 01 . 00000000
  172.16.2.0/24:  10101100 . 00010000 . 000000 10 . 00000000
  172.16.3.0/24:  10101100 . 00010000 . 000000 11 . 00000000
                  ----------------------------
  Chung 22 bits:  10101100 . 00010000 . 000000 00 . 00000000
  Network gộp:    172.16.0.0
  Subnet Mask:    255.255.252.0 (/22)
  ```
- **Cú pháp**:
  ```text
  HQ(config)# ip route 172.16.0.0 255.255.252.0 10.3.3.2
  ```
- **Lợi ích**: Thu gọn nhiều route liền kề thành 1 dòng duy nhất trong bảng định tuyến, tiết kiệm bộ nhớ RAM trên thiết bị.

### 3.4. Floating Static Route (Route dự phòng nổi) _(Nguồn bài giảng)_

- **Bài toán**: Doanh nghiệp có một đường truyền chính và một đường dự phòng phụ. Làm sao để bình thường Router luôn chạy đường chính, nhưng khi đường chính gặp sự cố thì Router tự động chuyển sang đường phụ?
- **Mô hình tư duy chuẩn về Administrative Distance (AD)** _(Tài liệu bổ trợ Cisco)_:
  - Để một route đóng vai trò là **Floating Static Route** (dự phòng), giá trị AD của nó **bắt buộc phải lớn hơn AD của tuyến đường chính đang ưu tiên**:
    $$\text{AD}_{\text{Backup Static}} > \text{AD}_{\text{Preferred Route}}$$
  - _Ví dụ 1_: Nếu tuyến đường chính là **Static Route chuẩn** (mặc định $\text{AD} = 1$), route dự phòng cần có $\text{AD} > 1$ (ví dụ $\text{AD} = 10$).
  - _Ví dụ 2_: Nếu tuyến đường chính học qua **OSPF** (mặc định $\text{AD} = 110$), route dự phòng tĩnh cần có $\text{AD} > 110$ (ví dụ $\text{AD} = 200$).
- **Cơ chế hoạt động**:
  - _Bình thường_: Router chỉ cài tuyến đường có AD nhỏ hơn vào Routing Table. Route dự phòng nằm "chìm" trong cấu hình (`running-config`).
  - _Khi route chính bị gỡ_: Nếu route chính bị xóa, không còn resolve được next-hop, hoặc không còn được cài vào Routing Table, route dự phòng có thể trở nên đủ điều kiện và được cài vào bảng định tuyến.
- **Giới hạn quan trọng**: Static Route thuần túy không tự phát hiện mọi sự cố downstream/remote khi interface cục bộ vẫn `up`. Muốn theo dõi các trường hợp đó cần cơ chế nâng cao như IP SLA Tracking, nằm ngoài phạm vi cốt lõi của môn học.

---

## 4. Phân loại cấu hình: 3 cách chỉ định Next-Hop và Exit-Interface _(Bổ trợ Cisco IOS)_

Khi viết lệnh `ip route`, ta có 3 tùy chọn chỉ định lối ra:

### 4.1. Next-Hop Static Route (Chỉ định IP Router kế tiếp)

```text
Router(config)# ip route 192.168.2.0 255.255.255.0 172.16.2.2
```

- **Cơ chế tra cứu đệ quy (Recursive Lookup)**:
  1. Khi nhận gói tin tới `192.168.2.10`, Router tra bảng định tuyến lần 1 thấy route chỉ định Next-hop IP là `172.16.2.2`.
  2. Router chưa biết cổng vật lý nào nối tới `172.16.2.2`, nên phải tra bảng định tuyến lần 2 (đệ quy) tìm dải mạng `172.16.2.0/24` để xác định cổng thoát (ví dụ `Serial0/0/0`).
  3. Sau 2 lần tra bảng, gói tin mới được đẩy ra ngoài.

### 4.2. Directly Attached Static Route (Chỉ định cổng thoát — Exit Interface)

```text
Router(config)# ip route 192.168.2.0 255.255.255.0 Serial0/0/0
```

- **Ưu điểm**: Router chỉ cần tra bảng 1 lần duy nhất, biết ngay cổng ra `Serial0/0/0`.
- **Cảnh báo trên cổng Ethernet**: Trên môi trường Ethernet (đa truy cập), nếu chỉ chỉ định Exit Interface (`GigabitEthernet0/1`), Router có thể phải gửi bản tin ARP Request hỏi MAC cho từng IP đích, dễ làm đầy bảng ARP cache nếu Proxy ARP được bật.

### 4.3. Fully Specified Static Route (Chỉ định cả Cổng thoát và IP kế tiếp)

```text
Router(config)# ip route 192.168.2.0 255.255.255.0 GigabitEthernet0/1 172.16.2.2
```

- **Đặc điểm**: Triệt tiêu hiện tượng tra cứu đệ quy, đồng thời xác định chính xác địa chỉ IP của thiết bị nhận để phân giải địa chỉ MAC qua ARP. Đây là phương pháp tối ưu trên môi trường mạng Ethernet.

---

## 5. Luồng hoạt động & Kịch bản bắt lỗi kinh điển

### Sơ đồ mạng ví dụ (Topology):

- **Router R1 (Chi nhánh 1)**: LAN 1 (`192.168.1.0/24`) nối cổng `Gi0/0` (`.1.1`). Cổng `S0/0/0` (`10.0.0.1/30`) nối sang R2.
- **Router R2 (Chi nhánh 2)**: Cổng `S0/0/0` (`10.0.0.2/30`) nối sang R1. Cổng `Gi0/0` (`192.168.2.1/24`) nối LAN 2 (`192.168.2.0/24`).

### Kịch bản lỗi: "Sự cố thiếu đường về" (Missing Return Route Trap)

```text
[PC-1: 192.168.1.10] ---> [R1] ===================> [R2] ---> [PC-2: 192.168.2.10]
   (LAN 1: .1.0/24)        (Cấu hình: ip route        (R2 CHƯA cấu hình route về LAN 1)
                            192.168.2.0 qua R2)

   Chiều đi (ICMP Request):  PC-1 ---> R1 ---> R2 ---> PC-2  (THÀNH CÔNG!)
   Chiều về (ICMP Reply):    PC-2 ---> R2 ---> X (DROP vì R2 không biết đường về 192.168.1.0/24)
```

1. **Hiện tượng**:
   - Máy PC-1 ping tới PC-2 (`192.168.2.10`) nhận kết quả `Request timed out`.
   - Kiểm tra R1 thấy đã cấu hình: `ip route 192.168.2.0 255.255.255.0 10.0.0.2`.
2. **Nguyên nhân**:
   - Gói tin `ICMP Echo Request` đã đi từ PC-1 đến tận PC-2 thành công.
   - Khi PC-2 tạo gói tin trả lời `ICMP Echo Reply` với Destination IP = `192.168.1.10`, nó gửi cho Default Gateway là **R2**.
   - Router **R2** tra bảng định tuyến: Không có dòng nào cho mạng `192.168.1.0/24` $\rightarrow$ **R2 lập tức Drop gói tin trả lời**.
3. **Cách khắc phục**:
   Bổ sung dòng định tuyến chiều về trên Router R2:
   ```text
   R2(config)# ip route 192.168.1.0 255.255.255.0 10.0.0.1
   ```

---

## 6. Cấu hình / command quan trọng _(Tài liệu bổ trợ Cisco IOS)_

### 6.1. Cấu hình các dạng Route

```text
! 1. Standard Static Route
Router(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2

! 2. Default Static Route
Router(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2

! 3. Floating Static Route (Dự phòng cho route tĩnh chính AD 1)
Router(config)# ip route 0.0.0.0 0.0.0.0 Serial0/0/1 10
```

### 6.2. Kiểm tra và xác minh (Verification)

```text
Router# show ip route static
Codes: L - local, C - connected, S - static, R - RIP, O - OSPF
       * - candidate default

Gateway of last resort is 10.0.0.2 to network 0.0.0.0

S*    0.0.0.0/0 [1/0] via 10.0.0.2
S     192.168.2.0/24 [1/0] via 10.0.0.2
```

**Cách đọc dòng định tuyến tĩnh**:

- `S`: Mã giao thức (**Static Route**).
- `*`: Tuyến đường ứng viên mặc định (**Candidate Default**).
- `192.168.2.0/24`: Mạng đích kèm Subnet Mask.
- `[1/0]`: `1` là **Administrative Distance (AD)** mặc định của Static Route; `0` là **Metric**.
- `via 10.0.0.2`: Địa chỉ Next-Hop.

---

## 7. Sai lầm thường gặp

| Lỗi thường gặp                                              | Hậu quả                                                                            | Cách xử lý                                                                           |
| :---------------------------------------------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| **Gõ nhầm Next-Hop IP là IP của chính router mình**         | Gói tin không thể forward đúng hướng.                                              | Next-hop IP **phải luôn là địa chỉ IP của Router đối diện** trên đoạn link kết nối.  |
| **Chỉ cấu hình chiều đi, quên chiều về**                    | Ping báo `Request timed out`, dịch vụ TCP không thể bắt tay 3 bước.                | Luôn kiểm tra bảng định tuyến trên tất cả các Router nằm giữa 2 đầu kết nối.         |
| **Tính sai Subnet Mask khi Summary Route**                  | Tuyến đường tóm tắt quá rộng bao trùm cả các dải IP ngoài ý muốn.                  | Đổi địa chỉ các mạng con ra nhị phân, chỉ lấy các bit chung giống nhau để tính mask. |
| **Đặt AD cho Floating Route nhỏ hơn hoặc bằng route chính** | Route phụ sẽ chạy song song hoặc đè mất route chính thay vì ở trạng thái dự phòng. | Luôn gán AD cho Floating Route lớn hơn AD của tuyến đường chính cần dự phòng.        |

---

## 8. Recall — đóng tài liệu lại

1. **Giải thích sự khác biệt giữa Standard Static Route và Default Static Route. Khi nào một router phù hợp nhất để dùng Default Route?**
2. **Một router nhận gói tin có IP đích `192.168.1.50`. Trong bảng định tuyến có 2 dòng: `192.168.1.0/24 [1/0]` và `0.0.0.0/0 [1/0]`. Router sẽ chọn dòng nào để chuyển tiếp? Giải thích nguyên lý.**
3. **Nếu tuyến đường chính được học qua OSPF ($\text{AD} = 110$), ta cần cấu hình Floating Static Route dự phòng với giá trị Administrative Distance như thế nào?**

---

## 9. Apply — vận dụng thực tế

### Bài tập 1: Tính toán Route Summarization

Một doanh nghiệp quản lý 4 mạng con tại chi nhánh:

- `10.10.16.0/24`
- `10.10.17.0/24`
- `10.10.18.0/24`
- `10.10.19.0/24`

Hãy tìm câu lệnh `ip route` tóm tắt duy nhất trên Router trung tâm (Next-Hop IP là `192.168.50.2`).

> **Hướng dẫn giải**:
>
> - Octet thứ 3: $16 = 00010000_2$, $17 = 00010001_2$, $18 = 00010010_2$, $19 = 00010011_2$.
> - 6 bit đầu giống nhau: `000100` $\rightarrow$ Độ dài Prefix = $8 + 8 + 6 = 22$ bits (Subnet mask: `255.255.252.0`).
> - Câu lệnh cấu hình:
>   ```text
>   Router(config)# ip route 10.10.16.0 255.255.252.0 192.168.50.2
>   ```

---

### Bài tập 2: Thiết kế Floating Static Route cho đường dự phòng

Router chi nhánh có đường chính kết nối qua `192.168.1.2` và đường phụ qua `192.168.2.2`.
Hãy viết bộ lệnh cấu hình trên Router chi nhánh để mọi lưu lượng ra ngoài đều qua đường chính, và tự động chuyển qua đường phụ khi đường chính gặp sự cố cổng.

> **Hướng dẫn giải**:
>
> ```text
> Branch(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.2
> Branch(config)# ip route 0.0.0.0 0.0.0.0 192.168.2.2 10
> ```

---

## 10. Ôn nhanh (60-Second Recap)

- **Static Route**: Người quản trị cấu hình tay; tiết kiệm băng thông/CPU trao đổi update; kiểm soát đường đi chặt chẽ.
- **4 dạng route**: Standard (mạng cụ thể), Default (`0.0.0.0/0` — mọi mạng), Summary (gộp dải mạng), Floating (dự phòng với AD lớn hơn route chính).
- **Floating Route**: Route phụ đủ điều kiện khi route ưu tiên bị gỡ hoặc không còn resolve/được cài; static thuần túy không phát hiện mọi lỗi downstream.
- **Longest Prefix Match**: Router luôn ưu tiên route có subnet mask dài nhất (cụ thể nhất).
- **Nguyên lý 2 chiều**: Cấu hình mạng luôn phải bảo đảm cả đường đi (Request) và đường về (Reply).

---

## 11. Liên kết

- **Bài học trước**: [Thiết bị mạng và Hạ tầng mạng](../01-ha-tang-mang/thiet-bi-va-ha-tang/) (Hiểu về Router, Switch và bảng định tuyến cơ bản).
- **Bài học tiếp theo**: [RIP — Distance Vector Routing Protocol](./rip/) (Tìm hiểu cách router tự động trao đổi thông tin định tuyến theo khoảng cách).
- **Chủ đề liên quan**: [OSPF — Link State Routing Protocol](./ospf/).

---

## 12. Nguồn & Xuất xứ kiến thức

### A. Nguồn bài giảng chính (Class B — Reference Only)

- `2.1 Static Routing.pdf` (Khoa Mạng máy tính & Truyền thông — Trường Đại học Công nghệ Thông tin, ĐHQG-HCM): Khái niệm định tuyến tĩnh, ưu điểm/nhược điểm, ứng dụng cho Stub network, 4 loại static route (Standard, Default, Summary, Floating), cú pháp lệnh `ip route`, mô hình topo 3 router mẫu.

### B. Tài liệu chuẩn & tham khảo bổ trợ (Class C — Standards / Vendor Docs)

- **RFC 1812** — _Requirements for IP Version 4 Routers_: Quy tắc tra cứu Longest Prefix Match và xử lý bảng định tuyến.
- **Cisco IP Routing: Protocol-Independent Configuration Guide**: Khái niệm Administrative Distance (AD), cơ chế Recursive Lookup và Fully Specified Static Route.

### C. Nội dung & sơ đồ do tác giả biên soạn độc lập

- Sơ đồ trực quan định dạng SVG (`static-routing-topology.svg`), bảng so sánh tổng quan, phân tích lỗi thiếu đường về và bài tập tính toán summary nhị phân.
