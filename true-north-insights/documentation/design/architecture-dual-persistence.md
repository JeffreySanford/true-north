# Architecture — Dual Persistence (MongoDB + SQL)

## High‑Level
```mermaid
flowchart LR
  U[User] --> FE[Angular 19/20 + MD3]
  FE --> GW[WebSocket/GraphQL Gateway]
  GW --> API[NestJS API]
  API -->|CQRS: Commands| CMD[App Services]
  API -->|CQRS: Queries| QRY[Query Services]
  CMD --> MONGO[(MongoDB)]
  CMD --> SQL[(PostgreSQL/MySQL/SQL Server)]
  QRY --> MONGO
  QRY --> SQL
  API --> AUD[Immutable Audit Log]
  SEC[RBAC • JWT • MFA • TLS • CSP] --- API
```
- **Why dual persistence?** Demonstrates mastery of both **document** and **relational** paradigms while keeping a single domain model (DTOs) and validation layer.
- **Pattern:** **CQRS‑inspired** split between command/write and query/read with repository interfaces hiding storage details.
- **Tenancy:** Start with single‑DB per environment; support multi‑tenant later via tenantId column/field or DB‑per‑tenant.

## Key Principles
- **Single Source DTOs** shared in `libs/shared/api-interfaces`.
- **Repositories** implement both **Mongoose** and **TypeORM** backends.
- **Audit trail** receives normalized events regardless of backing store.
