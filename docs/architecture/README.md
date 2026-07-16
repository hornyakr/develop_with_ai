# Architecture index

Create ADRs for decisions that affect public contracts, data/security boundaries, framework behavior, deployment, or irreversible cost.

Target layers:

- `src/app`: routes, layouts, server rendering, thin request adapters.
- `src/components`: server-first UI; explicit client islands.
- `src/server/dal`: server-only tenant-scoped reads and DTOs.
- `src/server/actions`: validated commands; authorization; transaction; audit; cache invalidation after commit.
- `src/server/policy`: pure actor/action/resource authorization.
- `src/server/ai`: provider gateway, retrieval, tools, eval/tracing integration.
- `tests`, `e2e`, `evals`: risk-aligned verification.

The starter is intentionally minimal. Add a layer only with a real vertical slice and tests.
