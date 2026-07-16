# Version baseline and adoption lanes

| Layer | Main branch | Evaluation lane |
|---|---|---|
| Next.js | 16.2 stable + latest safe patch | 16.3 Preview only in isolated experiment |
| React | 19.2 compatible with installed Next | new minor/experimental only with framework support |
| Node | 24 LTS | current releases for compatibility evidence only |
| pnpm | 11.13.0 package manager baseline | newer minor after lockfile/CI review |
| TypeScript | 6.0.x | 7.0 compatibility branch; adopt after stable Next.js integration and full gate |

Every adoption PR includes official release/migration links, dependency and generated-file diff, clean build/test/eval evidence, security review, and rollback.
