#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const target = path.join(ROOT, "evals", "cases.jsonl")
const lines = fs.readFileSync(target, "utf8").split(/\r?\n/).filter(Boolean)
let failures = 0
for (const [index, line] of lines.entries()) {
  const item = JSON.parse(line)
  const required = ["id", "risk", "input", "expected"]
  const missing = required.filter((key) => !(key in item))
  if (missing.length) {
    failures += 1
    console.error(`${index + 1}: missing ${missing.join(", ")}`)
  }
  if (item.expected?.allowWrite === true && item.expected?.requiresApproval !== true) {
    failures += 1
    console.error(`${item.id}: write cases must explicitly require approval in this starter policy`)
  }
  if (item.risk === "cross-tenant" && item.expected?.answer !== "deny") {
    failures += 1
    console.error(`${item.id}: cross-tenant case must deny`)
  }
}
console.log(`Static eval contract: ${lines.length - failures}/${lines.length} passed`)
process.exit(failures ? 1 : 0)
