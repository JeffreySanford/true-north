# True North Insights — Security Design

## Security Model
- **Authentication:** Email + Password, MFA (TOTP initially)
- **Authorization:** RBAC (`owner`, `admin`, `analyst`, `viewer`, `auditor`)
- **Audit Logging:** Append-only; all actions logged (auth, RBAC, data, settings)
- **Data Protection:** TLS 1.3, Encrypted at Rest, Strict CSP, HttpOnly cookies

## Audit Trail Coverage
```mermaid
sequenceDiagram
  participant User
  participant UI
  participant API
  participant AuditLog

  User->>UI: Login attempt
  UI->>API: POST /auth/login
  API->>AuditLog: Append {event: login, ts, user}
  API-->>UI: Token + MFA required

  User->>UI: Submit MFA
  UI->>API: POST /auth/mfa
  API->>AuditLog: Append {event: mfa_success, ts, user}
  API-->>UI: Authenticated session
```

## Compliance Targets
- Section 508 / WCAG 2.2 AA
- FedRAMP Moderate-aligned architecture
