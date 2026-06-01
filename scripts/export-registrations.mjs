#!/usr/bin/env node
/**
 * Export all rows from the `registrations` table to a CSV file.
 * Uses the Convex CLI only — no admin UI in the app and no public list API.
 *
 * Usage:
 *   pnpm run export:registrations
 *   pnpm run export:registrations -- --prod
 *   pnpm run export:registrations -- --output ./my-export.csv
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const convexBin = join(projectRoot, "node_modules", ".bin", "convex");

const COLUMNS = [
  { key: "_id", header: "id" },
  { key: "firstName", header: "first_name" },
  { key: "lastName", header: "last_name" },
  { key: "email", header: "email" },
  { key: "phone", header: "phone" },
  { key: "organization", header: "organization" },
  { key: "attendeeType", header: "attendee_type" },
  { key: "department", header: "department" },
  { key: "childcare", header: "childcare" },
  { key: "registeredAt", header: "registered_at" },
];

function parseArgs(argv) {
  const flags = { prod: false, output: null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--prod") flags.prod = true;
    else if (arg === "--output" || arg === "-o") {
      flags.output = argv[++i];
      if (!flags.output) {
        console.error("Missing path after --output");
        process.exit(1);
      }
    } else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: pnpm run export:registrations [-- --prod] [-- --output path.csv]

  --prod          Export from production (default: dev deployment)
  --output, -o    Output file (default: exports/registrations-YYYY-MM-DD.csv)
`);
      process.exit(0);
    }
  }
  return flags;
}

function escapeCsv(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function formatRegisteredAt(ms) {
  if (typeof ms !== "number" || Number.isNaN(ms)) return "";
  return new Date(ms).toISOString();
}

function rowToCsv(doc) {
  return COLUMNS.map(({ key }) => {
    const raw = doc[key];
    const value =
      key === "registeredAt" ? formatRegisteredAt(raw) : raw ?? "";
    return escapeCsv(value);
  }).join(",");
}

function defaultOutputPath() {
  const date = new Date().toISOString().slice(0, 10);
  return resolve(process.cwd(), "exports", `registrations-${date}.csv`);
}

const { prod, output: outputArg } = parseArgs(process.argv.slice(2));
const outputPath = resolve(outputArg ?? defaultOutputPath());

const convexArgs = [
  "data",
  "registrations",
  "--format",
  "jsonLines",
  "--order",
  "asc",
  "--limit",
  "100000",
];
if (prod) convexArgs.push("--prod");

const result = spawnSync(convexBin, convexArgs, {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"],
  cwd: projectRoot,
});

if (result.status !== 0) {
  process.stderr.write(result.stderr || "");
  console.error(
    "\nExport failed. Run `pnpm exec convex dev` once to link a deployment, then retry.",
  );
  process.exit(result.status ?? 1);
}

const lines = result.stdout
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const docs = [];
for (const line of lines) {
  try {
    docs.push(JSON.parse(line));
  } catch {
    console.error("Skipping invalid JSON line:", line.slice(0, 80));
  }
}

docs.sort((a, b) => (a.registeredAt ?? 0) - (b.registeredAt ?? 0));

const header = COLUMNS.map((c) => c.header).join(",");
const body = docs.map(rowToCsv).join("\n");
const csv = `${header}\n${body}\n`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, csv, "utf8");

const deployment = prod ? "production" : "dev";
console.log(
  `Exported ${docs.length} registration(s) from ${deployment} → ${outputPath}`,
);
