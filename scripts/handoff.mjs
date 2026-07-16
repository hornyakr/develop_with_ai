#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const args = process.argv.slice(2)
function option(name, fallback = "") {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : fallback
}
function git(argv) {
  const result = spawnSync("git", argv, { cwd: ROOT, encoding: "utf8" })
  return result.status === 0 ? result.stdout.trim() : "unavailable"
}
function safe(value) { return value.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-|-$/g, "") }

const task = option("--task", "TASK")
const agent = option("--agent", "unknown-agent")
const base = option("--base", git(["rev-parse", "HEAD^"]).replace("unavailable", "unknown"))
const head = git(["rev-parse", "HEAD"])
const branch = git(["branch", "--show-current"])
const status = git(["status", "--short"])
const stat = git(["diff", "--stat", base === "unknown" ? "HEAD" : `${base}...HEAD`])
const now = new Date().toISOString()
const filename = `${now.slice(0, 19).replace(/[:T]/g, "-")}_${safe(task)}_${safe(agent)}.md`
const target = option("--output", path.join(ROOT, "docs", "handoffs", filename))
const body = `# ${task} – agent handoff

- Agent: ${agent}
- Timestamp: ${now}
- Branch: ${branch}
- Base commit: ${base}
- Result commit: ${head}

## Working tree status

\`\`\`text
${status || "clean"}
\`\`\`

## Diff summary

\`\`\`text
${stat || "no committed diff relative to base"}
\`\`\`

## Outcome and changed contracts

FILL IN

## Verification evidence

| Gate | Command/artifact | Result |
|---|---|---|
| Task-specific | FILL IN | FILL IN |

## Skipped checks and residual risk

FILL IN

## Migration, environment, cache, secret, and deploy impact

FILL IN

## Next exact step

FILL IN
`
if (args.includes("--dry-run")) {
  process.stdout.write(body)
} else {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, body, "utf8")
  console.log(path.relative(ROOT, target))
}
