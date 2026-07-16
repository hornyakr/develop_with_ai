#!/usr/bin/env node
import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const args = process.argv.slice(2)
function git(argv) {
  const result = spawnSync("git", argv, { cwd: ROOT, encoding: "utf8" })
  return result.status === 0 ? result.stdout.trim() : "detached"
}
function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 30) || "worktree"
}
const branch = git(["branch", "--show-current"])
const identity = `${ROOT}:${branch}`
const hash = crypto.createHash("sha256").update(identity).digest("hex").slice(0, 8)
const port = 3000 + (Number.parseInt(hash.slice(0, 4), 16) % 400)
const scope = `${slug(branch)}_${hash.slice(0, 6)}`
const env = [
  `NEXT_PORT=${port}`,
  `PORT=${port}`,
  `APP_URL=http://127.0.0.1:${port}`,
  `DATABASE_SCHEMA=wt_${scope}`,
  `CACHE_NAMESPACE=wt:${scope}`,
  `QUEUE_PREFIX=wt:${scope}`,
  `OBJECT_PREFIX=wt/${scope}/`,
].join("\n") + "\n"
if (args.includes("--write")) {
  const target = path.join(ROOT, ".env.worktree")
  fs.writeFileSync(target, env, { encoding: "utf8", mode: 0o600 })
  console.log(`wrote ${path.relative(ROOT, target)} for ${branch}`)
} else {
  process.stdout.write(env)
}
