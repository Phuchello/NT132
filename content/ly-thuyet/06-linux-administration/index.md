---
title: Linux Administration
description: Quan sát và thay đổi trạng thái Linux host từ shell, identity, network đến service.
tags:
  - nt132
  - linux-administration
status: candidate
sources:
  - "6. Linux Adminstration.pdf"
---

Linux Server cho bạn biết một host có thể cung cấp những service nào. Trang này đi tiếp vào câu hỏi vận hành: **administrator quan sát, thay đổi và kiểm chứng host đang chạy các service đó ra sao?**

Trang học theo một đường đi duy nhất:

```text
Linux Server platform
→ shell / privilege
→ user và group identity
→ configuration state
→ interface / route / DNS state
→ socket / process state
→ remote administration
→ service operational state
```

![Mô hình kiến trúc Linux từ người dùng đến phần cứng](../../static/diagrams/linux-admin-architecture.svg)

## 1. Bản đồ học tập

| Câu hỏi cần trả lời                       | Phần tương ứng                                                                          | Kết quả mong đợi                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Linux host được cấu tạo theo các lớp nào? | [Kiến trúc Linux](./linux-administration/#1-kien-truc-linux-va-phan-ranh)               | Phân biệt user-space, shell, kernel và hardware.            |
| Làm sao thực thi lệnh an toàn?            | [Shell, help và privilege](./linux-administration/#3-shell-command-line-va-help)        | Quan sát trước khi thay đổi; hiểu root, `su`, `sudo`.       |
| Một user thực sự gồm những gì?            | [User, group và UID/GID](./linux-administration/#5-user-group-va-identity)              | Liên hệ tên người dùng với numeric identity và quyền file.  |
| Network host đang ở trạng thái nào?       | [Network state và tools](./linux-administration/#8-network-state-runtime-va-persistent) | Tách link, address, route, DNS và socket.                   |
| Tên miền được phân giải qua đâu?          | [Resolver pipeline](./linux-administration/#10-dns-name-resolution-va-resolver-state)   | Dùng `dig`/`host` để quan sát, không nhầm với cấu hình DNS. |
| SSH có thể tin host nào?                  | [SSH host-key trust](./linux-administration/#11-ssh-va-remote-administration)           | Xác minh fingerprint; không bỏ qua key mismatch.            |
| Service đã thực sự hoạt động chưa?        | [Operational service state](./linux-administration/#12-service-operational-state)       | Tách process, socket, path, log và application response.    |

## 2. Mô hình quản trị dựa trên state

Với mọi sự cố, hãy hỏi theo cùng một nhịp:

1. Trạng thái đúng cần tồn tại là gì?
2. Trạng thái đó được biểu diễn ở đâu: account database, kernel, connection profile, socket hay log?
3. Lệnh nào quan sát được nó?
4. Cấu hình hoặc lệnh nào thay đổi nó?
5. Thay đổi có side effect gì?
6. Kiểm chứng lại bằng bằng chứng nào?

Ví dụ, “user không mở được file” không phải chỉ là một câu hỏi về password. Hãy tách `id` và `getent` để kiểm tra identity, group credentials để kiểm tra membership, permission của filesystem, rồi mới kiểm tra authorization của service/share.

Mô hình này nối trực tiếp với [Linux Server](../05-server-platforms/linux-server/): platform cung cấp boundary, còn administration làm cho state trong boundary đó quan sát được và có thể kiểm chứng. [Tiếp theo trong lộ trình: Cloud Computing](../07-cloud-computing/).

## 3. Phạm vi và cách dùng trang

- Các lệnh quan sát như `id`, `ip`, `ss`, `dig` và `systemctl status` được ưu tiên trước mutation.
- Ví dụ thay đổi account, group, network hoặc power state chỉ là trace có phạm vi; không chạy tùy tiện trên production.
- Linux distribution, init system và network manager có thể khác nhau. Phần nào là ví dụ CentOS/SysV-era sẽ được gắn nhãn **LEGACY EXAMPLE**; phần cơ chế phổ biến hiện nay được gắn **CURRENT MECHANISM**.
- Mục tiêu là đọc được câu hỏi vận hành và chọn bằng chứng phù hợp, không phải thuộc một danh sách lệnh.

## 4. Tự kiểm tra nhanh

1. Vì sao shell không đồng nghĩa với kernel?
2. Một user name khác UID ở điểm nào?
3. Sau khi thêm user vào supplementary group, vì sao session đang mở có thể chưa thấy quyền mới?
4. Vì sao `ip addr` có thể đúng nhưng web request vẫn fail?
5. Lệnh nào giúp tách DNS failure khỏi socket/listener failure?
6. Vì sao SSH host-key mismatch cần điều tra thay vì xóa `known_hosts` ngay?

## 5. Nguồn và ownership

### A. Course source - Class B

- `6. Linux Adminstration.pdf` là nguồn chính. Slide bao phủ Linux overview, architecture, command line, account/group management, network configuration, DNS, network tools, SSH và network services.
- Các ví dụ `ifcfg-eth0`, `ifconfig`, `route`, `netstat`, `init 0`, `init 6` và RSA fingerprint được giữ lại để nhận diện terminology của course, nhưng không được trình bày như quy tắc current universal.

### B. Supplementary authoritative documentation

- [systemd bootup](https://www.freedesktop.org/software/systemd/man/latest/bootup.html) - conceptual boot ordering, targets và services.
- [systemctl manual](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html) - power state và service control trong môi trường systemd.
- [shadow-utils useradd(8)](https://man7.org/linux/man-pages/man8/useradd.8.html), [groupdel(8)](https://man7.org/linux/man-pages/man8/groupdel.8.html) - semantics của account/group state change.
- [Linux credentials(7)](https://man7.org/linux/man-pages/man7/credentials.7.html) - process credentials và supplementary groups.
- [NetworkManager reference](https://www.networkmanager.dev/docs/api/latest/nm-settings-nmcli.html) - connection profile và runtime activation.
- [nsswitch.conf(5)](https://man7.org/linux/man-pages/man5/nsswitch.conf.5.html) - lookup source/order của Name Service Switch.
- [OpenSSH manual](https://www.openssh.org/manual.html) - host key, authenticated channel và SSH client behavior.

### C. Author-derived

- State-management model, troubleshooting ladder, identity mapping, resolver flow, SSH trust flow và service-state flow là phần giải thích nguyên bản.
- Các sơ đồ SVG của chương là bản vẽ nguyên bản, không phải screenshot slide.
