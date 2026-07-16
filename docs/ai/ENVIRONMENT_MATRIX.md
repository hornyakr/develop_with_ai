# Worktree environment matrix

| Resource | Isolation key | Creation | Cleanup owner |
|---|---|---|---|
| Git working tree/index | branch/worktree | `git worktree add` | integrator |
| writer state | `.agent/state/lease.json` | `agent:lease acquire` | current writer |
| dev server | deterministic port | `worktree:env --write` | builder |
| PostgreSQL | database/schema suffix | migration/bootstrap runbook | data/integrator |
| cache/queue/object store | namespace/prefix | environment provisioning | integrator |
| browser auth state | per-worktree file/profile | E2E setup | tester |
| preview deployment | branch/environment name | CI/platform | release operator |
| secrets | scoped secret manager injection | human/platform | security/release |

The environment script creates identifiers only. It never creates or copies secrets.
