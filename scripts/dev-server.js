const path = require("path");
const { serveStatic } = require("./server");

const rootDir = path.resolve(__dirname, "../public");
const port = Number(process.env.PORT || 5173);

serveStatic(rootDir, { port });
