#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"))
const major = Number(process.versions.node.split(".")[0])
const baseline = {
  node: "24 LTS",
  packageManager: pkg.packageManager,
  next: pkg.dependencies.next,
  react: pkg.dependencies.react,
  typescript: pkg.devDependencies.typescript,
}
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), runtime: process.version, baseline }, null, 2))
if (major !== 24) {
  console.error(`Expected Node 24 LTS for the course baseline; current runtime is ${process.version}`)
  process.exitCode = 2
}
if (!fs.existsSync(path.join(ROOT, "pnpm-lock.yaml"))) {
  console.error("pnpm-lock.yaml is missing. Bootstrap with the pinned pnpm version, review the graph, and commit the lockfile before CI/release.")
  process.exitCode = 2
}
if (process.argv.includes("--online")) {
  for (const argv of [["outdated"], ["audit", "--prod"]]) {
    const result = spawnSync("pnpm", argv, { cwd: ROOT, stdio: "inherit" })
    if (result.status !== 0) process.exitCode = result.status ?? 1
  }
}
