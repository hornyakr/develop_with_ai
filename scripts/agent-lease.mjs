#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const STATE_DIR = path.join(ROOT, ".agent", "state")
const STATE = path.join(STATE_DIR, "lease.json")
const [command = "status", ownerArg, ...rest] = process.argv.slice(2)

function option(name, fallback = undefined) {
  const index = rest.indexOf(name)
  return index >= 0 ? rest[index + 1] : fallback
}
function readLease() {
  if (!fs.existsSync(STATE)) return null
  try { return JSON.parse(fs.readFileSync(STATE, "utf8")) } catch { return null }
}
function active(lease) { return lease && Date.parse(lease.expiresAt) > Date.now() }
function save(lease) {
  fs.mkdirSync(STATE_DIR, { recursive: true })
  const temp = `${STATE}.${process.pid}.tmp`
  fs.writeFileSync(temp, JSON.stringify(lease, null, 2) + "\n", "utf8")
  fs.renameSync(temp, STATE)
}
function describe(lease) {
  if (!lease) return "free"
  return `${active(lease) ? "held" : "expired"}: owner=${lease.owner} task=${lease.task} expires=${lease.expiresAt}`
}

const current = readLease()
if (command === "status") {
  console.log(describe(current))
  process.exit(active(current) ? 0 : 0)
}
if (command === "acquire") {
  if (!ownerArg) throw new Error("Usage: agent-lease.mjs acquire <owner> --task <id> --ttl <minutes>")
  if (active(current) && current.owner !== ownerArg) {
    console.error(`Writer lease already held: ${describe(current)}`)
    process.exit(2)
  }
  const ttl = Number(option("--ttl", "60"))
  if (!Number.isFinite(ttl) || ttl <= 0 || ttl > 480) throw new Error("TTL must be 1..480 minutes")
  const lease = {
    owner: ownerArg,
    task: option("--task", "unspecified"),
    acquiredAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + ttl * 60_000).toISOString(),
    pid: process.pid,
  }
  save(lease)
  console.log(`acquired: ${describe(lease)}`)
  process.exit(0)
}
if (command === "release") {
  if (!current) { console.log("already free"); process.exit(0) }
  const force = rest.includes("--force")
  if (!force && ownerArg !== current.owner) {
    console.error(`Lease belongs to ${current.owner}; pass the same owner or use reviewed --force recovery.`)
    process.exit(2)
  }
  fs.rmSync(STATE, { force: true })
  console.log(`released lease previously held by ${current.owner}`)
  process.exit(0)
}
throw new Error(`Unknown command: ${command}`)
