const path = require("path");
const { serveStatic } = require("./server");

const rootDir = path.resolve(__dirname, "../dist");
const port = Number(process.env.PORT || 4173);

serveStatic(rootDir, { port });
