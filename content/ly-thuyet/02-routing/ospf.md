---
title: OSPF — Link-State Routing Protocol và Thuật toán Dijkstra
tags:
  - nt132
  - routing
status: reviewed
sources:
  - "2.3 Routing protocol - OSPF.pdf"
---

# OSPF — Link-State Routing Protocol và Thuật toán Dijkstra

## 1. Map — cần nắm gì?

- **Triết lý Link-State (Trạng thái liên kết)**: Không trao đổi bảng định tuyến như RIP. Mỗi router thu thập thông tin về trạng thái các cổng kết nối (**Link-State**) của tất cả router trong mạng, lưu trữ vào cơ sở dữ liệu **Link-State Database (LSDB)** để tái hiện một **bản đồ toàn cảnh (Topology Graph)** giống hệt nhau trên mọi thiết bị.
- **Thuật toán Dijkstra (SPF — Shortest Path First)**: Từ bản đồ LSDB, mỗi router tự đặt mình làm gốc cây (Root) và chạy thuật toán Dijkstra để tính toán **Cây đường đi ngắn nhất (Shortest Path Tree)** đến mọi nút mạng, từ đó sinh ra bảng chuyển tiếp (**Forwarding Table / Routing Table**).
- **Metric Cost (Chi phí băng thông)**: OSPF sử dụng thước đo **Cost tỷ lệ nghịch với băng thông** của đường truyền:
  $$\text{Cost} = \frac{\text{Reference Bandwidth}}{\text{Interface Bandwidth}}$$
  giải quyết triệt để sự "ngây thơ" của Hop Count trong RIP (chọn đường cáp chậm chỉ vì ít hop hơn).
- **6 thuật ngữ nền tảng**:
  1. **Link**: Cổng giao tiếp và mạng kết nối với nó.
  2. **Link-State**: Trạng thái của link (IP, subnet mask, loại link, trạng thái hoạt động, Cost).
  3. **Neighbor**: Router láng giềng kề sát trên cùng một link, phát hiện qua gói tin **Hello**.
  4. **Cost**: Trọng số chi phí của link.
  5. **LSP / LSA (Link-State Packet / Advertisement)**: Gói tin mô tả trạng thái link gửi đi cho các router khác.
  6. **LSDB (Link-State Database)**: Cơ sở dữ liệu chứa toàn bộ LSP, tạo nên bản đồ cấu trúc mạng.

---

## 2. Bài toán nó giải quyết: Tại sao cần Link-State sau RIP?

Hãy so sánh sự khác biệt triết lý giữa hai họ giao thức định tuyến:

```text
+---------------------------------------------------------------------------------------------------+
| RIP (Distance Vector):                                                                            |
|   "Nói cho tôi biết bạn biết những mạng nào và khoảng cách từ bạn đến đó là bao nhiêu hops."      |
|   --> Router chỉ "nghe đồn" từ láng giềng, hoàn toàn mù mờ về sơ đồ mạng thực tế.                |
+---------------------------------------------------------------------------------------------------+
| OSPF (Link-State):                                                                                |
|   "Hãy mô tả chi tiết tất cả các link của bạn để tôi tự vẽ ra bản đồ toàn cảnh của cả mạng."      |
|   --> Mỗi Router sở hữu toàn bộ bản đồ mạng và tự mình tính toán đường đi tối ưu nhất.            |
+---------------------------------------------------------------------------------------------------+
```

### Bẫy "Hop Count mù quáng" của RIP

Xét sơ đồ giữa Router A và Router B:

- **Đường 1**: Đi trực tiếp qua 1 liên kết cáp đồng cổ điển tốc độ **64 kbps** ($\text{Hop} = 1$).
- **Đường 2**: Đi vòng qua Router C bằng 2 liên kết cáp quang tốc độ **10 Gbps** ($\text{Hop} = 2$).

```text
       +------------------ 64 kbps (Hop = 1) ------------------+
       |                                                       |
     [ R1 ]                                                  [ R2 ]
       |                                                       |
       +--- 10 Gbps (Hop = 1) ---> [ R3 ] --- 10 Gbps (Hop = 2)-+
```

- **RIP sẽ chọn Đường 1** vì $\text{Hop} = 1 < 2$, đẩy dữ liệu vào đường cáp cực chậm và gây nghẽn mạng!
- **OSPF sẽ chọn Đường 2** vì tính toán dựa trên **Băng thông (Cost)**: đường cáp quang có Cost cực nhỏ (tổng Cost $\approx 2$) trong khi đường 64 kbps có Cost lên tới 1562.

---

## 3. Bản chất / cơ chế: Quy trình 5 bước của Link-State

Một giao thức định tuyến Link-State hoạt động theo quy trình tuần tự 5 bước chặt chẽ:

```text
[1. Phát hiện Link] ---> [2. Gửi Hello kết bạn] ---> [3. Tạo LSP] ---> [4. Flood LSP & Tạo LSDB] ---> [5. Chạy Dijkstra & Cài Route]
```

### Bước 1: Phát hiện các link kết nối trực tiếp (Directly Connected Links)

Khi router khởi động, nó quét tất cả các interface đang cấu hình. Nếu interface có trạng thái `up/up`, router ghi nhận: địa chỉ IP, subnet mask, loại kết nối mạng (Ethernet, Serial), và tính toán giá trị **Cost** tương ứng cho cổng đó.

### Bước 2: Gửi gói tin "Hello" để tìm láng giềng (Discover Neighbors)

Router định kỳ phát các gói tin **Hello** ra tất cả các interface đang bật OSPF:

- Hai router cắm chung một đoạn dây nhận được Hello của nhau sẽ trao đổi các tham số (Hello Interval, Dead Interval, Area ID, Subnet Mask).
- Nếu các tham số trùng khớp, hai router thiết lập quan hệ láng giềng (**Neighbor Adjacency**).

### Bước 3: Tạo gói tin trạng thái liên kết (Build Link-State Packet — LSP)

Mỗi router đóng gói toàn bộ thông tin về các link của chính mình thành một gói tin gọi là **LSP (Link-State Packet)** (trong Cisco OSPF gọi là **LSA — Link-State Advertisement**).
Nội dung của một LSP gồm:

- Định danh Router tạo ra LSP (Router ID).
- Danh sách các mạng kết nối trực tiếp kèm Subnet Mask.
- Loại liên kết và địa chỉ IP của các láng giềng đã kết nối.
- Chi phí (Cost) của từng liên kết.

### Bước 4: Tràn ngập LSP (Flooding) và xây dựng LSDB

- Router gửi LSP của mình cho tất cả các láng giềng.
- Khi một router nhận được LSP từ láng giềng, nó:
  1. Lưu một bản sao vào cơ sở dữ liệu **LSDB (Link-State Database)** của mình.
  2. Lập tức chuyển tiếp (**Flood**) nguyên vẹn LSP đó ra tất cả các interface khác (ngoại trừ cổng vừa nhận vào).
- Nhờ cơ chế flooding đồng bộ, **tất cả các router trong cùng một vùng mạng (Area) đều có một bảng LSDB hoàn toàn giống hệt nhau 100%**.

### Bước 5: Chạy thuật toán Dijkstra (SPF) và xây dựng Routing Table

- Khi bảng LSDB đã hoàn tất (mỗi router đều có đủ bản đồ toàn mạng), mỗi router **đặt chính mình làm nút gốc (Root)**.
- Router thực thi thuật toán **Dijkstra** trên đồ thị LSDB để tìm đường đi có tổng Cost nhỏ nhất đến từng mạng đích.
- Kết quả tạo thành **Cây đường đi ngắn nhất (Shortest Path Tree — SPT)**.
- Router trích xuất các đường đi tối ưu này để nạp vào **Bảng định tuyến (Forwarding / Routing Table)**.

> [!NOTE]
> **Phản ứng tức thời khi có sự cố (Triggered Event Update)**:
> Khác với RIP gửi định kỳ 30 giây toàn bộ bảng định tuyến, OSPF **không gửi định kỳ cả bảng LSDB**. Khi một đường link bị đứt, router phát hiện sẽ lập tức tạo một gói tin cập nhật **LSU (Link-State Update)** và flood đi ngay lập tức. Toàn bộ mạng cập nhật lại LSDB và chạy lại Dijkstra trong vài phần nghìn giây.

---

## 4. Thuật toán Dijkstra — Thực thi chi tiết từng bước (Trace)

Để hiểu chính xác cách Router tính toán đường đi, ta cùng thực hiện thuật toán Dijkstra từ nút nguồn $u$ trên một đồ thị 5 router mẫu.

![Mô hình đồ thị Link-State và Cây đường đi ngắn nhất](../../static/diagrams/ospf-dijkstra-graph.svg)

### 4.1. Ký hiệu toán học

- $u$: Nút nguồn đặt làm gốc (Router $R_1$).
- $N'$: Tập hợp các đỉnh đã xác định chắc chắn đường đi ngắn nhất.
- $D(v)$: Chi phí đường đi hiện tại từ nguồn $u$ đến đỉnh $v$.
- $p(v)$: Đỉnh đi trước liền kề của $v$ trên con đường ngắn nhất hiện tại từ $u$.
- $c(i, j)$: Trọng số (Cost) của liên kết trực tiếp giữa nút $i$ và nút $j$. Nếu không có đường nối trực tiếp thì $c(i, j) = \infty$.

---

### 4.2. Bảng diễn tiến thuật toán Dijkstra từ nút nguồn $R_1$

Đồ thị mạng gồm 5 Router với các trọng số liên kết:

- $c(R_1, R_2) = 20$, $c(R_1, R_3) = 5$, $c(R_1, R_4) = 20$
- $c(R_2, R_5) = 10$
- $c(R_3, R_4) = 10$
- $c(R_4, R_5) = 10$
- Mỗi Router có một mạng LAN kết nối nội bộ với $\text{Cost} = 2$.

| Bước  | Tập $N'$ (Đỉnh đã chốt)       | $D(R_2), p(R_2)$ | $D(R_3), p(R_3)$ | $D(R_4), p(R_4)$ | $D(R_5), p(R_5)$ | Quyết định chọn đỉnh tiếp theo                                                                                                                            |
| :---: | :---------------------------- | :--------------- | :--------------- | :--------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0** | $\{R_1\}$                     | $20, R_1$        | **$5, R_1$**     | $20, R_1$        | $\infty$         | Chọn $R_3$ có $D(R_3) = 5$ nhỏ nhất. Nạp $R_3$ vào $N'$.                                                                                                  |
| **1** | $\{R_1, R_3\}$                | $20, R_1$        | —                | **$15, R_3$**    | $\infty$         | Xét láng giềng của $R_3$: $D(R_4) = \min(20, 5 + 10) = 15$ qua $R_3$. Chọn $R_4$ vì $15 < 20$. Nạp $R_4$ vào $N'$.                                        |
| **2** | $\{R_1, R_3, R_4\}$           | **$20, R_1$**    | —                | —                | $25, R_4$        | Xét láng giềng của $R_4$: $D(R_5) = \min(\infty, 15 + 10) = 25$ qua $R_4$. So sánh $D(R_2)=20$ và $D(R_5)=25 \rightarrow$ Chọn $R_2$. Nạp $R_2$ vào $N'$. |
| **3** | $\{R_1, R_3, R_4, R_2\}$      | —                | —                | —                | **$25, R_4$**    | Xét láng giềng của $R_2$: $D(R_5) = \min(25, 20 + 10) = 25$. Chọn $R_5$ với $D(R_5) = 25$ qua $R_4$. Nạp $R_5$ vào $N'$.                                  |
| **4** | $\{R_1, R_3, R_4, R_2, R_5\}$ | —                | —                | —                | —                | **Hoàn tất!** Tất cả các đỉnh đã được chốt vào Cây đường đi ngắn nhất.                                                                                    |

---

### 4.3. Kết quả Forwarding Table (Bảng chuyển tiếp) trên Router R1

Từ Cây đường đi ngắn nhất vừa dựng được, Router $R_1$ xây dựng bảng chuyển tiếp gói tin:

| Mạng đích | Đường đi ngắn nhất (Shortest Path)                    | Cổng thoát (Exit Interface) | Next-Hop Router | Tổng Cost đến mạng LAN đích |
| :-------- | :---------------------------------------------------- | :-------------------------- | :-------------- | :-------------------------: |
| **LAN 1** | Trực tiếp tại $R_1$                                   | `GigabitEthernet0/0`        | Connected       |            **2**            |
| **LAN 2** | $R_1 \rightarrow R_2$                                 | `GigabitEthernet0/1`        | $R_2$           |      **22** ($20 + 2$)      |
| **LAN 3** | $R_1 \rightarrow R_3$                                 | `GigabitEthernet0/2`        | $R_3$           |       **7** ($5 + 2$)       |
| **LAN 4** | $R_1 \rightarrow R_3 \rightarrow R_4$                 | `GigabitEthernet0/2`        | $R_3$           |    **17** ($5 + 10 + 2$)    |
| **LAN 5** | $R_1 \rightarrow R_3 \rightarrow R_4 \rightarrow R_5$ | `GigabitEthernet0/2`        | $R_3$           | **27** ($5 + 10 + 10 + 2$)  |

> [!TIP]
> **Điểm mấu chốt cần quan sát**:
>
> - Để đến được $R_4$, $R_1$ có đường nối trực tiếp với Cost = 20.
> - Tuy nhiên Dijkstra phát hiện: Đi vòng qua $R_3$ ($5 + 10 = 15$) **tiết kiệm hơn 5 đơn vị chi phí** so với đi trực tiếp!
> - Do đó, $R_1$ chuyển toàn bộ gói tin gửi tới $R_4$ qua cổng `GigabitEthernet0/2` (hướng $R_3$).

---

## 5. Mở rộng & Lệnh kiểm tra quan trọng (Supplementary CCNA Context)

> [!NOTE]
> _Nội dung chuẩn của môn học tập trung sâu vào nguyên lý Link-State và thuật toán Dijkstra. Phần lệnh cấu hình Cisco dưới đây là tài liệu tham khảo bổ trợ nhằm phục vụ tra cứu thực tế._

### 5.1. Cấu hình cơ bản OSPF đơn vùng (Single-Area OSPF)

```text
Router(config)# router ospf 1
Router(config-router)# router-id 1.1.1.1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 10.1.1.0 0.0.0.3 area 0
Router(config-router)# passive-interface GigabitEthernet0/0
```

- `router ospf 1`: Khởi tạo tiến trình OSPF với số hiệu Process ID = 1 (chỉ có ý nghĩa cục bộ trên router).
- `router-id 1.1.1.1`: Định danh duy nhất của router trong mạng OSPF.
- `network <network-ip> <wildcard-mask> area <area-id>`: So khớp interface để đưa vào vùng `area 0` (Backbone Area).

### 5.2. Các câu lệnh kiểm tra (Verification Commands)

```text
! 1. Kiểm tra danh sách láng giềng OSPF (Trạng thái FULL/BDR hoặc FULL/DR)
Router# show ip ospf neighbor

! 2. Xem cơ sở dữ liệu trạng thái liên kết (Bảng LSDB)
Router# show ip ospf database

! 3. Xem các tuyến đường học qua OSPF trong Routing Table (ký hiệu 'O')
Router# show ip route ospf
O     192.168.4.0/24 [110/17] via 192.168.13.2, 00:15:22, GigabitEthernet0/2
```

- `O`: Route được học qua **OSPF**.
- `[110/17]`: **110** là Administrative Distance của OSPF; **17** là tổng Metric Cost.

---

## 6. Bảng so sánh tổng kết: Distance Vector (RIP) vs Link-State (OSPF)

| Tiêu chí               | RIP (Distance Vector)                                | OSPF (Link-State)                                            |
| :--------------------- | :--------------------------------------------------- | :----------------------------------------------------------- |
| **Mô hình tri thức**   | Nghe đồn từ láng giềng kề sát.                       | Bản đồ topo toàn cảnh (LSDB) giống nhau trên mọi router.     |
| **Thuật toán cốt lõi** | **Bellman-Ford**.                                    | **Dijkstra (SPF — Shortest Path First)**.                    |
| **Thước đo (Metric)**  | **Hop Count** (tối đa 15 hops).                      | **Cost** (tỷ lệ nghịch với Băng thông đường truyền).         |
| **Cơ chế cập nhật**    | Định kỳ mỗi **30 giây** gửi toàn bộ bảng định tuyến. | Gửi tức thì khi có biến động (**Triggered / Event-driven**). |
| **Tốc độ hội tụ**      | Chậm (mất vài chục giây đến vài phút).               | Rất nhanh (vài mili-giây đến vài giây).                      |
| **Sử dụng CPU & RAM**  | Rất thấp.                                            | Cao hơn (cần RAM chứa LSDB và CPU tính toán đồ thị).         |
| **Khả năng phân vùng** | Mạng phẳng, không chia vùng.                         | Phân cấp phân vùng linh hoạt (**Multi-Area OSPF**).          |

---

## 7. Sai lầm thường gặp

| Sai lầm phổ biến                                                      | Bản chất hiểu sai                                                   | Cách hiểu đúng                                                                                                                                                       |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nghĩ rằng OSPF gửi bảng định tuyến cho nhau như RIP**               | Nhầm lẫn giữa _Routing Table_ và _Link-State Advertisements (LSA)_. | OSPF chỉ gửi LSA mô tả tình trạng cổng. Bảng định tuyến do từng router **tự mình tính toán độc lập** bằng Dijkstra.                                                  |
| **Nghĩ rằng Cost càng lớn thì đường càng nhanh**                      | Nhầm lẫn giữa Băng thông và Chi phí.                                | Băng thông càng lớn thì Cost càng nhỏ. Router **luôn luôn chọn đường có tổng Cost thấp nhất**.                                                                       |
| **Thắc mắc vì sao LSDB giống nhau nhưng Routing Table lại khác nhau** | Chưa hiểu vai trò vị trí nút gốc trong cây SPF.                     | Mọi router nhìn chung một bản đồ LSDB, nhưng mỗi router đứng ở một vị trí khác nhau để làm gốc cây $\rightarrow$ Cây đường đi ngắn nhất của mỗi router là khác nhau. |

---

## 8. Recall — đóng tài liệu lại

1. **Trình bày 5 bước trong quy trình hoạt động cơ bản của một giao thức định tuyến Link-State.**
2. **Tại sao hai router chạy OSPF trong cùng một Area có cơ sở dữ liệu LSDB hoàn toàn giống nhau nhưng bảng định tuyến (Routing Table) của chúng lại khác nhau?**
3. **Trong đồ thị có trọng số, nếu Router A nối trực tiếp Router B với Cost = 50, và nối qua Router C với Cost(A-C) = 10, Cost(C-B) = 20. Thuật toán Dijkstra trên Router A sẽ chọn chuyển tiếp gói tin đến B theo hướng nào?**

---

## 9. Apply — vận dụng thực tế

### Bài tập 1: Tính toán Dijkstra từ nút nguồn khác

Sử dụng lại đồ thị 5 router trong bài học (Mục 4.2):

- $c(R_1, R_2) = 20, c(R_1, R_3) = 5, c(R_1, R_4) = 20$
- $c(R_2, R_5) = 10$
- $c(R_3, R_4) = 10$
- $c(R_4, R_5) = 10$

Hãy đặt **Router $R_2$ làm nút gốc** và tìm đường đi ngắn nhất từ $R_2$ đến Router $R_4$.

> **Hướng dẫn giải**:
>
> - Các đường đi khả dĩ từ $R_2$ đến $R_4$:
>   1. Đường qua $R_5$: $R_2 \rightarrow R_5 \rightarrow R_4 \implies \text{Cost} = 10 + 10 = \mathbf{20}$.
>   2. Đường qua $R_1$: $R_2 \rightarrow R_1 \rightarrow R_3 \rightarrow R_4 \implies \text{Cost} = 20 + 5 + 10 = 35$.
>   3. Đường qua $R_1$ trực tiếp: $R_2 \rightarrow R_1 \rightarrow R_4 \implies \text{Cost} = 20 + 20 = 40$.
> - **Kết luận**: Dijkstra trên $R_2$ sẽ chọn đường $R_2 \rightarrow R_5 \rightarrow R_4$ với tổng Cost tối ưu nhất là **20**.

---

### Bài tập 2: So sánh phản ứng OSPF vs RIP khi liên kết thay đổi

Giả sử liên kết giữa $R_1$ và $R_3$ (Cost = 5) bị đứt:

1. Mô tả quá trình OSPF cập nhật lại mạng.
2. So sánh tốc độ xử lý sự cố này giữa OSPF và RIP.

> **Hướng dẫn giải**:
>
> 1. $R_1$ và $R_3$ phát hiện cổng `down` $\rightarrow$ Lập tức tạo gói tin **LSU** báo tin link $R_1-R_3$ đã mất $\rightarrow$ Flood LSU cho các router còn lại $\rightarrow$ Tất cả router cập nhật LSDB và chạy lại thuật toán Dijkstra $\rightarrow$ $R_1$ chuyển hướng đi sang $R_4$ (qua link trực tiếp Cost 20) hoặc $R_2$.
> 2. **So sánh**: OSPF hội tụ gần như tức thì (vài mili-giây) nhờ cơ chế Triggered Update. Trong khi đó RIP phải đợi hết thời gian timeout (thường 180s) và đợi nhiều vòng gửi định kỳ 30s mới có thể lan truyền thông tin đứt mạng.

---

## 10. Ôn nhanh (60-Second Recap)

- **Link-State**: Mỗi router có bản đồ toàn cảnh mạng (**LSDB**) bằng cách thu thập **LSA/LSP**.
- **Dijkstra (SPF)**: Thuật toán tìm cây đường đi có tổng Cost nhỏ nhất từ gốc tới mọi đích.
- **Metric**: **Cost tỷ lệ nghịch với băng thông** ($\frac{\text{Reference Bandwidth}}{\text{Interface Bandwidth}}$).
- **Quy trình 5 bước**: Detect Link $\rightarrow$ Hello neighbor $\rightarrow$ Build LSP $\rightarrow$ Flood LSDB $\rightarrow$ Run Dijkstra.
- **Ưu điểm vượt trội**: Hội tụ tức thì, không bị loop, chọn đường dựa trên tốc độ thực tế.

---

## 11. Liên kết

- **Bài học trước**: [RIP — Distance Vector Routing Protocol](./rip/) (Tìm hiểu hạn chế của Hop Count và cơ chế định tuyến theo lời đồn).
- **Bài học tiếp theo**: [Switching và VLAN](../../ly-thuyet/03-switching-vlan/) (Đi sâu vào kiến trúc chuyển mạch Layer 2 và phân đoạn mạng ảo VLAN).
- **Chủ đề liên quan**: [Thiết bị mạng và Hạ tầng mạng](../01-ha-tang-mang/thiet-bi-va-ha-tang/).

---

## Nguồn

- Nguồn tài liệu chính: `2.3 Routing protocol - OSPF.pdf` (Khoa Mạng máy tính & Truyền thông — ĐH Công nghệ Thông tin ĐHQG-HCM).
- Phân loại bản quyền: Nguồn tham khảo học liệu (Class B). Toàn bộ ví dụ đồ thị 5 nút, bảng tính toán Dijkstra và phân tích thuật toán được biên soạn độc lập.
- Sơ đồ trực quan: Bản vẽ SVG nguyên gốc `ospf-dijkstra-graph.svg` được thiết kế riêng cho NT132.
