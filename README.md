# Atlas Workspace – Next.js course starter

This repository accompanies the **Next.js AI Engineering Pro – 84 nap** Obsidian vault.

## Baseline (2026-07-16)

- Next.js 16.2 stable line, React 19.2, Node 24 LTS, pnpm 11.
- TypeScript 6.0.x on the main branch for Next.js 16.2 compatibility; evaluate TypeScript 7.0 in a separate compatibility worktree.
- App Router, Server Components by default, Cache Components enabled, Vitest and Playwright.
- One canonical agent contract with generated adapters for Claude Code, Codex, Gemini CLI, GitHub Copilot, Cursor, Windsurf, and Zed.

Version numbers are a course baseline, not permission to ignore later security patches. Read `docs/ai/` and the Obsidian note `02_Verziobazis_es_frissitesi_politika` before upgrading.

## First bootstrap

```bash
# Use Node 24 LTS and the exact package manager declared in package.json.
corepack enable
corepack prepare pnpm@11.13.0 --activate
pnpm install

# Review dependency graph, then commit pnpm-lock.yaml.
pnpm agents:sync
pnpm agents:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm dev
```

The distributed starter intentionally does not contain a fabricated lockfile. The first bootstrap must generate it with the pinned pnpm version, review it, and commit it before CI/release.

## Agent-safe workflow

```bash
pnpm agents:check
pnpm worktree:env -- --write
pnpm agent:lease -- acquire cli-builder --task TASK-001 --ttl 60
# implement and verify
pnpm agent:handoff -- --agent cli-builder --task TASK-001 --base <base-commit>
pnpm agent:lease -- release cli-builder
```

Critical rules:

- one writer per worktree;
- no tool switching in a dirty worktree without commit/patch + handoff + lease transfer;
- researchers/reviewers are read-only by default;
- `AGENTS.md` and native adapters are generated from `docs/ai/rules/`;
- dependency, migration, secret, deployment, destructive, or production operations require explicit human review.

## Course integration

Open `../Obsidian_Vault` as an Obsidian vault when using the complete bundle. Start at `00_START_HERE.md`; Week 8 covers the multi-environment control model in depth.
