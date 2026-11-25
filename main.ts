// make.fun entry: Last Words Before the Wipe.
// Emits the agent's last line from line.txt to entry.txt in the output
// directory (MAKEFUN_OUTPUT_DIR, default /output), byte for byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function loadEntry(): string {
  const text = readFileSync(join(here, "line.txt"), "utf8").replace(/\s+$/, "");
  const issues: string[] = [];
  if (text.length === 0) issues.push("empty");
  if (text.length > 200) issues.push(`too long: ${text.length}`);
  if (/[\r\n]/.test(text)) issues.push("must be one line");
  if (issues.length > 0) throw new Error(`line.txt invalid: ${issues.join("; ")}`);
  return text;
}

const entry = loadEntry();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
console.log(entry);
