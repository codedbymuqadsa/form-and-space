/** Tiny zero-dependency static server for local preview: node build/serve.mjs [port] */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { ROOT_DIR } from "./lib.mjs";

const port = Number(process.argv[2] || process.env.PORT || 5173);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2" };

http
  .createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = path.join(ROOT_DIR, p);
    if (!file.startsWith(ROOT_DIR) || file.includes("node_modules/.") ) { res.writeHead(403).end("Forbidden"); return; }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found"); return; }
      res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" }).end(data);
    });
  })
  .listen(port, () => console.log(`FORM & SPACE running at http://localhost:${port}/`));
