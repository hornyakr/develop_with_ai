# Tool and coding-environment matrix

The textual contract is shared; capabilities are not. Re-check installed tool documentation before relying on any row.

| Environment | Canonical load | Path-specific adapter | Shell/write control | MCP/subagent note |
|---|---|---|---|---|
| Claude Code | `CLAUDE.md` imports `AGENTS.md` | `.claude/rules/` | use least privilege and approval | capabilities vary by installed release |
| Codex | hierarchical `AGENTS.md` | nearer `AGENTS.md` | sandbox/approval profile | record actual profile in task brief |
| Gemini CLI | `GEMINI.md` import/context | tool configuration | explicit trust/command policy | verify current context semantics |
| GitHub Copilot | generated repository instructions | `.github/instructions/` | editor/agent mode dependent | do not assume shell isolation |
| Cursor | `AGENTS.md` + generated `.mdc` | glob/path rules | mode dependent | extension integrations are separate trust boundaries |
| Windsurf | `AGENTS.md` + generated rules | rule files | mode dependent | check Cascade permission settings |
| Zed | `AGENTS.md` / generated rule mirror | installed-version rules | mode dependent | verify actual rule discovery |

## Assignment rule

Choose the environment with the smallest capability set that can complete the task. A researcher does not need write; a builder does not need production credentials; a reviewer does not need to fix the code it reviews.
