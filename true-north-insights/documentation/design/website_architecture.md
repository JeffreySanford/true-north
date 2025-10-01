# True North Insights — Website Architecture

## High-Level Architecture
```mermaid
flowchart LR
  U[User] --> FE[Angular + Material 3]
  FE --> GQL[WebSocket/GraphQL Gateway]
  GQL --> API[NestJS Backend]
  API --> DB[(MongoDB per Tenant)]
  API --> AUD[Immutable Audit Logs]
  SEC[RBAC • JWT • MFA • TLS] --- API
```

- **Frontend:** Angular 19/20 + MD3
- **Backend:** NestJS (Node.js) + GraphQL/REST
- **Database:** MongoDB (multi-tenant capable)
- **Security:** JWT, MFA, TLS, RBAC
- **Deployment:** NX monorepo, PM2 + Nginx
