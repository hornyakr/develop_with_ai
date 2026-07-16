# Multi-environment workflow

- Canonical rules live in these fragments and the generated `AGENTS.md`. Tool-native files are generated adapters; do not edit them directly.
- Before writing: `pnpm agents:check`, `pnpm agent:lease -- acquire <owner> --task <id> --ttl 60`, then verify `git status` and worktree environment.
- Builders commit small coherent changes. Reviewers inspect diff and evidence without modifying application code.
- Shared files such as lockfiles, migrations, root config, schemas, and generated adapters belong to the integration owner unless explicitly assigned.
- Handoff includes base/result commit, changed contracts, commands, acceptance evidence, skipped checks, migration/env/deploy impact, and open risk.
- Release is performed by a human operator from a reviewed immutable commit with rollback and monitoring.
