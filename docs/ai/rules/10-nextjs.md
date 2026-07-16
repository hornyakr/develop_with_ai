# Next.js and React rules

- App Router only. Server Components are the default; add `use client` at the smallest interactive boundary.
- Never pass secrets, unrestricted database models, or unnecessary personal data across the server/client serialization boundary.
- Avoid request waterfalls: start independent work early and place meaningful Suspense boundaries around independently useful content.
- Cache only when scope, key, lifetime, privacy, tag, invalidation event, and owner are documented. Never put session-specific data in shared cache.
- Treat Server Functions/Actions and Route Handlers as public server boundaries: validate input, derive actor from the server session, enforce authorization, and return narrow typed results.
- `proxy.ts` may improve routing/UX but is not the sole authorization boundary.
- After framework changes run typecheck, relevant tests, and a production build. Async Server Component flows receive E2E coverage.
