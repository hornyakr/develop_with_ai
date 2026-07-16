# Security policy

- Report suspected secret exposure, tenant leakage, authorization bypass, unsafe AI write, dependency compromise, or production-impacting issue immediately to the human owner. Stop automation first.
- Do not include real credentials or personal data in issues, prompts, traces, screenshots, handoffs, or the Obsidian vault.
- All server entry points validate input and enforce actor/action/resource/tenant authorization. UI and `proxy.ts` checks are supplementary.
- AI and MCP inputs/outputs are untrusted. Tool permissions are allowlisted; write requires concrete human approval and re-authorization.
- Dependency, migration, credential, deploy, destructive Git, and production database changes require explicit scope and review.
- Security fixes add a regression test/eval and incident evidence. Prompt-only mitigations are insufficient for policy bypasses.
