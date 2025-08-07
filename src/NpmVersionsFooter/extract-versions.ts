import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * @typedef {Object} PackageMeta
 * @property {string} version
 */

/**
 * @typedef {Record<string, PackageMeta>} Packages
 */

// Define __dirname for ESM support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lockPath = path.resolve(__dirname, "../../package-lock.json");
const outPath = path.resolve(__dirname, "versions.json");

// Forced types for safety
/** @type {{ packages: Packages }} */
const lock = JSON.parse(fs.readFileSync(lockPath, "utf-8"));
/** @type {Packages} */
const packages = lock.packages || {};

const allowedPrefixes = [
  "@smals-belgium/",
  "@smals-belgium-shared/"
];

/** @type {Record<string, string>} */
const result = {};

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
