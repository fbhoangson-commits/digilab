# VIỆT ÂU DIGITAL LIBRARY — Starter 0.1

Bộ khung khởi tạo frontend, Cloudflare Worker, D1 schema và PWA manifest.

## Trạng thái
- Có: giao diện responsive, điều hướng demo, trang chủ, kho sách, chi tiết sách, reader prototype, tủ sách, lịch sử, quiz demo, trang quản trị khung.
- Có: schema D1 ban đầu và Worker health/books endpoint.
- Chưa có: xác thực thật, upload R2, đọc file PDF/EPUB thật, đồng bộ tiến độ, AI, quiz backend, dashboard dữ liệu thật.
- Dữ liệu sách hiện là dữ liệu minh họa, không phải đầu sách đã cấp phép.

## Yêu cầu
- Node.js 20+
- Tài khoản Cloudflare Free
- GitHub repository riêng

## Chạy giao diện demo
```bash
npm install
npm run dev
```

## Kiểm tra build
```bash
npm run typecheck
npm run build
```

## Khởi tạo Cloudflare
1. Tạo D1 database tên `vietau-library`.
2. Tạo R2 bucket tên `vietau-library`.
3. Điền `database_id` thực tế vào `wrangler.toml`.
4. Chạy migration:
```bash
npx wrangler d1 migrations apply vietau-library --remote
```
5. Deploy Worker:
```bash
npx wrangler deploy
```
6. Build frontend và deploy Pages:
```bash
npm run deploy:pages
```

## Bảo mật trước khi đưa dữ liệu thật
- Không tạo tài khoản học sinh bằng mật khẩu mặc định dùng chung.
- Không public R2 bucket.
- Chỉ phát hành file qua API sau khi xác thực và kiểm tra quyền.
- Bổ sung CSRF protection, rate limit, session rotation và quy trình đặt lại mật khẩu.
- Thiết lập backup độc lập cho D1 và R2.
- Không dùng dữ liệu học sinh thật trong môi trường demo.

## Nguyên tắc phát triển
Mỗi tính năng nằm trong `src/features/<feature>/`. Không thay thế hoặc refactor module đã nghiệm thu ngoài phạm vi yêu cầu mới.
