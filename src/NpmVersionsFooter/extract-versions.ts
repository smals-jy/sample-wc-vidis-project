import fs from "fs";
import path from "path";

const lockPath = path.resolve(__dirname, "../../package-lock.json");
const outPath = path.resolve(__dirname, "versions.json");

const lock = JSON.parse(fs.readFileSync(lockPath, "utf-8"));
const packages = lock.packages || {};
// fallback for lockfileVersion < 3:
const fallback = lock.dependencies || {};

const result: Record<string, string> = {};

// V3+ lockfile
for (const [pkg, meta] of Object.entries<any>(packages)) {
  if (pkg && pkg !== "") {
    // remove "node_modules/" prefix if present
    const name = pkg.startsWith("node_modules/") ? pkg.slice(13) : pkg;
    if (meta.version) result[name] = meta.version;
  }
}

// fallback for v1/v2 lockfiles
for (const [name, meta] of Object.entries<any>(fallback)) {
  if (!result[name] && meta.version) result[name] = meta.version;
}

fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
