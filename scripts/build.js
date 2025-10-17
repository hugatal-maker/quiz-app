const fs = require("fs");
const path = require("path");

const sourceDir = path.resolve(__dirname, "../public");
const outDir = path.resolve(__dirname, "../dist");

function removeDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function copyDirectory(from, to) {
  fs.mkdirSync(to, { recursive: true });
  const entries = fs.readdirSync(from, { withFileTypes: true });

  entries.forEach((entry) => {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(src, dest);
    } else if (entry.isSymbolicLink()) {
      const link = fs.readlinkSync(src);
      fs.symlinkSync(link, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  });
}

function ensureSourceExists(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Source directory not found: ${dir}`);
  }
}

function build() {
  ensureSourceExists(sourceDir);
  removeDir(outDir);
  copyDirectory(sourceDir, outDir);
  console.log(`Build complete. Copied ${sourceDir} -> ${outDir}`);
}

try {
  build();
} catch (error) {
  console.error("Build failed:", error.message);
  process.exitCode = 1;
}
