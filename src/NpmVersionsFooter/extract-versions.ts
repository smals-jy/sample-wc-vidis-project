import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lockPath = path.resolve(__dirname, "../../package-lock.json");
const outPath = path.resolve(__dirname, "versions.json");

const lock = JSON.parse(fs.readFileSync(lockPath, "utf-8"));
const packages = lock.packages || {};
const fallback = lock.dependencies || {};

const result = {};

// V3+ lockfile
for (const [pkg, meta] of Object.entries(packages)) {
  if (pkg && pkg !== "") {
    const name = pkg.startsWith("node_modules/") ? pkg.slice(13) : pkg;
    if (meta.version) result[name] = meta.version;
  }
}

// fallback for v1/v2 lockfiles
for (const [name, meta] of Object.entries(fallback)) {
  if (!result[name] && meta.version) result[name] = meta.version;
}

fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
