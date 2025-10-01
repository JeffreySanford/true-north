# CI/CD Pipeline — Quality Gates from Day One

## Stages
1. **Lint + Format:** ESLint, Prettier.
2. **Typecheck:** `tsc -p tsconfig.base.json`.
3. **Unit Tests:** `nx run-many --target=test`.
4. **Build:** `nx run-many --target=build` (frontend SSR optional).
5. **SBOM/SCA:** CycloneDX + Grype scanning.
6. **Docker:** multi‑stage build, non‑root user.
7. **Deploy:** Nginx + PM2; health checks; rollbacks.

## SBOM
```bash
# Example
npx @cyclonedx/cyclonedx-npm:make-sbom --output ./dist/sbom.json
grype sbom:./dist/sbom.json
```
