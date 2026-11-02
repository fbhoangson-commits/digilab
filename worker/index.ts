export interface Env {
  DB: D1Database;
  BOOKS: R2Bucket;
  APP_NAME: string;
}

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return json({ ok: true, app: env.APP_NAME, database: "configured", storage: "configured" });
    }
    if (url.pathname === "/api/books" && request.method === "GET") {
      const { results } = await env.DB.prepare(
        "SELECT id, book_code, title, description, file_format, page_count, allow_download FROM books WHERE status = 'PUBLISHED' ORDER BY created_at DESC LIMIT 100"
      ).all();
      return json({ items: results });
    }
    return json({ error: "NOT_FOUND", message: "API chưa được triển khai ở giai đoạn khởi tạo." }, 404);
  }
};