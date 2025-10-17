const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const MIME_TYPES = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf"
};

function serveStatic(rootDir, { port = 3000, fallback = "index.html" } = {}) {
  const server = http.createServer((req, res) => {
    const requestedUrl = new URL(req.url, `http://${req.headers.host}`);
    const safePath = path.normalize(requestedUrl.pathname).replace(/^(\.\.[/\\])+/, "");
    let filePath = path.join(rootDir, safePath);

    if (filePath.endsWith(path.sep)) {
      filePath = path.join(filePath, "index.html");
    }

    fs.stat(filePath, (statErr, stats) => {
      if (statErr || stats.isDirectory()) {
        const fallbackPath = path.join(rootDir, fallback);
        streamFile(fallbackPath, "text/html", res, 200);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      streamFile(filePath, contentType, res, 200);
    });
  });

  server.listen(port, () => {
    console.log(`Static server running at http://localhost:${port}`);
    console.log(`Serving files from ${rootDir}`);
  });

  server.on("error", (error) => {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
  });

  return server;
}

function streamFile(filePath, contentType, res, statusCode) {
  const stream = fs.createReadStream(filePath);
  stream.on("error", () => {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  });
  res.writeHead(statusCode, { "Content-Type": contentType });
  stream.pipe(res);
}

module.exports = {
  serveStatic
};
