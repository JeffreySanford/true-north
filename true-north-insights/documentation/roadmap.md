# Roadmap — From MVP to Production

```mermaid
gantt
    title True North Insights — Website + Platform Roadmap
    dateFormat  YYYY-MM-DD
    section MVP
    NX Scaffold + Auth (MFA)    :a1, 2025-10-01, 21d
    Public Pages + PDF          :a2, after a1, 21d
    Demo Dashboard + Audit      :a3, after a2, 21d
    Dual Persistence Seed       :a4, after a3, 14d
    section Pilot
    SAT Pilot Packaging         :b1, after a4, 21d
    OSDBU/Primes Outreach       :b2, after b1, 28d
    section Production
    Multi‑Tenant Hardening      :c1, after b2, 30d
    On‑Prem Installer           :c2, after c1, 21d
    Advanced Analytics          :c3, after c2, 30d
```

**Acceptance (MVP):**
- Public site live (Home, Solutions, Security, Case Studies, Contact).
- Capability PDF downloadable.
- Login with MFA; demo dashboard; audit log visible.
- Seeded data present **in both** Mongo and SQL.
