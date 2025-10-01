# NX Scaffold & Structure — Elegant & Opinionated

## Workspace Layout
```text
apps/
  frontend/        # Angular 19/20 (MD3)
  backend/         # NestJS API (GraphQL + REST + WS)
libs/
  shared/api-interfaces/   # DTOs, repositories, event types
  shared/ui/               # UI atoms/molecules (Material, CDK)
  shared/util/             # rxjs operators, guards, helpers
  server/data/             # repo impl (Mongo + SQL)
  server/security/         # auth, RBAC, crypto
tools/
  schematics/              # generators for modules/components
```

## Suggested Commands
```bash
# Create workspace (pseudo example)
npx create-nx-workspace@latest true-north --preset=ts

# Angular app
nx g @nx/angular:app frontend --style=scss --routing=true

# Nest app
nx g @nx/nest:app backend

# Shared libs
nx g @nx/js:lib shared-api-interfaces --directory=libs/shared/api-interfaces --bundler=tsc
nx g @nx/angular:lib shared-ui --directory=libs/shared/ui
nx g @nx/js:lib shared-util --directory=libs/shared/util
nx g @nx/js:lib server-data --directory=libs/server/data
nx g @nx/js:lib server-security --directory=libs/server/security
```

## Module Boundaries
- Frontend only consumes `shared/*` libs.
- Backend owns persistence; exposes GraphQL/REST contracts typed to DTOs.
- Enforce via `nx.json` + `tsconfig` path rules + `eslint` dependency constraints.
