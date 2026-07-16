# Unified multi-environment workflow

1. Human/architect creates a task brief with base commit, scope, ownership, acceptance, negative cases, capability, and stop conditions.
2. Researcher reads version-matched docs and repository evidence; it does not edit code.
3. Create a branch/worktree and deterministic `.env.worktree`; acquire the single-writer lease.
4. Builder changes only owned paths, makes small commits, and records exact verification.
5. Tester and reviewer use a separate context, normally read-only, and challenge at least one failure/security case.
6. Builder addresses findings; reviewer re-checks the exact fix.
7. Generate a handoff. The integrator merges/cherry-picks in the integration worktree and runs the full gate.
8. Release operator promotes the reviewed immutable commit with human approval, monitoring, and rollback.

## Never mix silently

Do not let two coding environments alternate edits in the same dirty worktree. A change of tool requires: stop current writer, commit or preserve patch, release lease, write handoff, then acquire a new lease. Chat continuity is not repository continuity.
