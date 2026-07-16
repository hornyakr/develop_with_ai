# Verification rules

- Reproduce the baseline before editing. Do not hide or silently fix unrelated failures.
- Test pure policy and transformations at unit level; test DAL/database and server boundaries in integration; test async RSC, auth, navigation, streaming, and browser security in E2E.
- Every security-sensitive change needs at least one negative/adversarial test.
- A task is not complete until the task-specific gate and repository quality gate are reproducible. Report exact commands, exit codes, skipped checks, and residual risk.
- Never claim a command ran when it did not. A generated file or plausible output is not execution evidence.
