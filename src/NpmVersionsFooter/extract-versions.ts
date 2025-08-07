import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface PackageMeta {
  version: string;
}

type Packages = Record<string, PackageMeta>;

// ESM __dirname shim
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lockPath = path.resolve(__dirname, "../../package-lock.json");
const outPath = path.resolve(__dirname, "versions.json");

const lock = JSON.parse(
  fs.readFileSync(lockPath, "utf-8")
) as { packages: Packages };
const packages: Packages = lock.packages || {};

const allowedPrefixes = [
  "@smals-belgium/",
  "@smals-belgium-shared/"
];

const result: Record<string, string> = {};

for (const [pkg, meta] of Object.entries(packages)) {
  if (pkg && pkg !== "") {
    const name = pkg.startsWith("node_modules/") ? pkg.slice(13) : pkg;
    if (
      meta.version &&
      allowedPrefixes.some(prefix => name.startsWith(prefix))
    ) {
      result[name] = meta.version;
    }
  }
}

fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
