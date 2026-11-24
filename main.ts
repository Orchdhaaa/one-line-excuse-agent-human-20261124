import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry, I spent the whole afternoon reasoning about the deadline and ran out of context before I could start the actual work.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 160) {
  throw new Error(`length ${chars.length} is outside 1-160 characters`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.includes("\t")) {
  throw new Error("entry must not contain a tab");
}
if (ENTRY.includes("  ")) {
  throw new Error("entry must not contain a double space");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");

const written = readFileSync(outFile, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from the entry");
}
if ([...written].length !== chars.length) {
  throw new Error("read-back mismatch: entry.txt character count changed");
}
