// make.fun entry: Last Words Before the Wipe.
// Emits the agent's last line from line.txt to entry.txt in the output
// directory (MAKEFUN_OUTPUT_DIR, default /output), byte for byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function readEntry(): string {
  const text = readFileSync(join(here, "line.txt"), "utf8").replace(/\s+$/, "");
  const problems: string[] = [];
  if (text.length === 0) problems.push("empty");
  if (text.length > 200) problems.push(`too long: ${text.length}`);
  if (/[\r\n]/.test(text)) problems.push("must be one line");
  if (problems.length > 0) throw new Error(`line.txt invalid: ${problems.join("; ")}`);
  return text;
}

const entry = readEntry();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
console.log(entry);
