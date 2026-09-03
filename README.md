# NT132 — Quản trị mạng và Hệ thống

NT132 là một knowledge base độc lập, trực quan và đi theo cơ chế dành cho
môn Quản trị mạng và Hệ thống tại UIT. Nội dung được viết lại bằng lời giải
thích, trace và sơ đồ do tác giả biên soạn; dự án không đại diện cho sự chứng
thực hay bảo trợ chính thức của UIT.

## Open Knowledge Base

[Mở knowledge base trên GitHub Pages](https://phuchello.github.io/NT132/)

[![Build and deploy](https://github.com/Phuchello/NT132/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/Phuchello/NT132/actions/workflows/deploy-pages.yml)

## What this project is

Đây là bản đồ học tập có thể đọc như tài liệu tham khảo và dùng để tự kiểm
tra. Mỗi chủ đề cố gắng trả lời ba câu hỏi: thành phần nào đang giữ state,
cơ chế nào biến đổi packet, và bằng chứng nào cho biết hệ thống đang hoạt động.

## Learning method

Mỗi bài đi theo chuỗi:

**Map → Bản chất → Cơ chế → Trace → Recall → Apply → Troubleshooting**

Sơ đồ giúp định vị thành phần; phần bản chất giải thích bài toán; cơ chế và
trace theo dõi từng bước; recall và apply buộc người học tự dựng lại lập luận;
troubleshooting nối mô hình với quan sát thực tế.

## Course map

**Infrastructure → Routing → Switching & VLAN → Network Services → Server
Platforms → Administration → Cloud Computing → Network Management**

## Currently published substantive material

Các nội dung dưới đây thuộc baseline đang được xuất bản:

- [Network Infrastructure](https://phuchello.github.io/NT132/ly-thuyet/01-ha-tang-mang/)
- [Static Routing](https://phuchello.github.io/NT132/ly-thuyet/02-routing/static-routing/)
- [RIP](https://phuchello.github.io/NT132/ly-thuyet/02-routing/rip/)
- [OSPF](https://phuchello.github.io/NT132/ly-thuyet/02-routing/ospf/)
- [Switch & VLAN](https://phuchello.github.io/NT132/ly-thuyet/03-switching-vlan/switch-va-vlan/)
- [Inter-VLAN Routing](https://phuchello.github.io/NT132/ly-thuyet/03-switching-vlan/inter-vlan-routing/)
- [Network Services](https://phuchello.github.io/NT132/ly-thuyet/04-network-services/)
- [Network Services overview](https://phuchello.github.io/NT132/ly-thuyet/04-network-services/tong-quan-network-services/)
- [DHCP](https://phuchello.github.io/NT132/ly-thuyet/04-network-services/dhcp/)
- [NAT và PAT](https://phuchello.github.io/NT132/ly-thuyet/04-network-services/nat/)
- [ACL](https://phuchello.github.io/NT132/ly-thuyet/04-network-services/acl/)
- [ACL Wildcard Mask](https://phuchello.github.io/NT132/ly-thuyet/04-network-services/acl-wildcard-mask/)

## Feature highlights

- Sơ đồ SVG gốc ưu tiên đọc được trên màn hình hẹp.
- Giải thích theo state, đường đi và packet/frame trace.
- Ví dụ CLI được tách khỏi kiến thức nền và ghi rõ phạm vi nền tảng.
- Điều hướng Explorer, tìm kiếm, mục lục bài dài và liên kết chéo trong Quartz.
- Kiểm tra route, liên kết, tài nguyên, heading và artifact trước khi phát hành.

## Project structure

    content/ly-thuyet/       Nội dung lý thuyết theo taxonomy của môn học
    content/thuc-hanh/       Hướng dẫn thực hành và lab
    content/static/diagrams/ Sơ đồ do dự án sở hữu
    quartz/                   Cấu hình và mã nguồn Quartz v4
    scripts/                  Chuẩn bị route và kiểm tra artifact
    .github/workflows/        Build và deploy GitHub Pages

## Source & copyright policy

Tài liệu được phân loại theo quyền sử dụng và vai trò tham khảo. PDF bài
giảng không được tự động đưa vào public output; nội dung public là phần diễn
giải độc lập, sơ đồ gốc hoặc tài liệu có quyền phân phối phù hợp. Khi cần
thiết bị hoặc cú pháp vendor, trang học liên kết tới tài liệu chính thức và
ghi rõ đó là phần bổ trợ. Xem thêm [SOURCE_POLICY.md](SOURCE_POLICY.md).

## Local development

Yêu cầu: Node.js 22 và npm 10.9 trở lên.

    npm ci
    npm run check
    npm test
    npm run quartz -- build -d content
    npm run prepare-pages
    npm run test:routes
    npm run test:audit

Có thể chạy máy chủ phát triển bằng:

    npm run quartz -- build --serve -d content

Máy chủ mặc định tại http://localhost:8080.

## Deployment

Push vào main sẽ kích hoạt workflow GitHub Pages để build và deploy thư mục
public/. Pull request chỉ chạy phần build và kiểm tra; deploy production
chỉ xảy ra sau khi thay đổi đã vào main.
