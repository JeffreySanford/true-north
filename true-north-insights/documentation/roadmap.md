# Roadmap — Evolution Path (v1 → Scale & Intelligence)

This roadmap reframes the earlier high‑level Pilot/Production buckets into well‑bounded phases with crisp objectives, measurable acceptance criteria, and risk mitigation paths. Phase 2 has been expanded to reflect real implementation work rather than a vague "pilot" label.

---

## Phase 1: MVP Foundation — COMPLETED ✅ (October 2, 2025)

Delivered:

- Material 3 interface & initial theming
- Auth (MFA) scaffold & session handling
- Public marketing pages + capability PDF export
- Dual persistence seed (Mongo + SQL) with audit log
- Baseline dev standards, logging, notification hooks

Acceptance (Locked):

- Public site accessible / stable navigation
- MFA login + demo dashboard visible
- Audit log entries produced for auth + seed access
- Seed data verified in both datastores

Post‑MVP Enhancement (Applied Immediately After Close):

- Replaced provisional Blog with Project feature (Table + Kanban + drag & drop) using typed seed ingestion & optimized state pattern.

Status: GREEN — No reopen conditions identified.

---

## Phase 2: Pilot Readiness & Customer Validation (Current)

Purpose: Transform the stable MVP into a demonstrable pilot package suitable for early adopters (internal stakeholders, select primes, OSDBU contacts) with foundational observability, deploy repeatability, and a credible project/task management slice.

### Core Epics

1. Deployment & Packaging
    - Create reproducible environment automation (container images + compose / initial IaC skeleton)
    - Parameterize runtime config (secrets, DB endpoints, feature flags)
    - Add version stamping (build metadata embedded in frontend & backend health endpoints)
2. Project / Task Management Expansion
    - Extend Project board with task detail drawer & inline status updates
    - Add filtering & basic metrics (burn hours, status distribution)
    - Persist drag & drop state (write‑back through API to persistence layer)
3. Observability & Telemetry
    - Structured logs with correlation ids
    - Minimal metrics endpoint (request count, latency histogram)
    - Client performance logging hook (Web Vitals baseline)
4. Access & Security Hardening (Pilot Scope)
    - Role separation (admin vs standard user) – coarse enforcement
    - Input validation review & security headers baseline
5. Feedback Loop Enablement
    - In‑app feedback capture (lightweight form + tagged event log)
    - Usage analytics events (page / feature interactions)
6. Data Persistence Maturation
    - Introduce migration mechanism (SQL) & schema version table
    - Add seed refresh task & integrity check script

### Deliverables

- Pilot deployment guide (internal) + minimal IaC/compose assets
- Project API endpoints (CRUD + reorder) with optimistic UI updates
- Basic metrics & health dashboards (manual or lightweight tool)
- Auth roles enforced on protected routes / endpoints

### Acceptance Criteria

- End‑to‑end Project task reorder persists & reloads identically
- Deploy can be repeated cleanly in a fresh environment < 30 minutes
- Metrics endpoint returns non‑empty data & health includes build hash
- Feedback submissions stored & queryable
- At least 1 admin and 1 non‑admin role tested; unauthorized routes blocked

### Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep in Project feature | Delays other epics | Hard cap for pilot (no sprint planning yet) |
| Over‑engineering observability | Lost time | Start with logs + minimal metrics; defer tracing |
| Role model complexity | Auth delays | Use coarse RBAC now; refine later in Phase 3 |
| Deployment drift | Inconsistent demos | Lock compose/IaC templates; doc required variables |

Exit Gate: Signed off internal pilot demo + reproducible deploy + persisted project interactions.

ETA (Target Window): 4–6 weeks from Phase 1 closure.

---

## Phase 3: Platform Hardening & Multi‑Tenant Foundations

Objectives:

- Introduce tenant boundary model (schema / database / discriminator evaluation)
- Add advanced security controls (rate limiting, alerting hooks)
- Enhance migrations (rollback, forward validation)
- Strengthen test matrix (integration + performance smoke)

Acceptance:

- Multi‑tenant isolation POC validated (no cross‑tenant data leakage)
- Security headers & rate limit in place; audit log enriched with tenant context
- Automated migration pipeline with rollback result evidence

---

## Phase 4: Advanced Analytics & Insight Layer

Objectives:

- Aggregated metrics (task velocity, cycle time, utilization)
- Analytics API + materialized views / cached aggregates
- Visual dashboards (charts, trend lines) with export capability

Acceptance:

- 3+ analytics aggregates exposed via API
- Dashboard loads < 2s with sample production dataset volume

---

## Phase 5: Commercialization & Distribution

Objectives:

- On‑Prem / air‑gapped installer (packaged images + config generator)
- Licensing / feature flag framework
- Performance profiling & capacity guidance (scaling doc)

Acceptance:

- Installer executes full environment bootstrap ≤ 45 min
- Licensing key enables/disables at least one premium feature
- Load test baseline metrics documented (target concurrency & p95 latency)

---

## Phase 6: Intelligence & Automation (Forward Looking)

Objectives:

- Predictive workload estimation (ML assist / heuristic first pass)
- Recommendation engine for prioritization or risk surfacing
- Automated anomaly alerts on task burn vs estimate variance

Acceptance (Draft – subject to refinement):

- Estimation assist reduces manual estimate variance (>10% improvement over baseline sampling)
- At least one proactive alert surfaced & validated in pilot dataset

---

## High‑Level Timeline (Indicative)

```mermaid
gantt
     title True North Insights — Expanded Roadmap
     dateFormat  YYYY-MM-DD
     todayMarker off
     section Phase 1 (Done)
     MVP Foundation            :done, p1, 2025-09-11, 21d
     section Phase 2 (Active)
     Deploy & Packaging        :active, p2a, 2025-10-03, 10d
     Project Expansion         :p2b, after p2a, 10d
     Observability Baseline    :p2c, after p2a, 7d
     Role / Security Hardening :p2d, after p2b, 7d
     Feedback & Usage Events   :p2e, parallel p2c, 5d
     Data Migrations & Integrity:p2f, after p2b, 5d
     section Phase 3
     Multi‑Tenant Foundations  :p3a, after p2f, 21d
     Security Enhancements     :p3b, after p3a, 10d
     Robust Migration Pipeline :p3c, after p3a, 10d
     section Phase 4
     Analytics Aggregates      :p4a, after p3c, 21d
     Insight Dashboards        :p4b, after p4a, 14d
     section Phase 5
     On‑Prem Installer         :p5a, after p4b, 21d
     Licensing & Flags         :p5b, after p5a, 14d
     Perf & Scaling Guide      :p5c, after p5b, 14d
     section Phase 6
     Predictive Estimation POC :p6a, after p5c, 21d
     Recommendation Engine     :p6b, after p6a, 21d
```

Notes:

- Durations are indicative (working days) and will be revisited after Phase 2 midpoint review.
- Parallel tasks chosen for minimal coupling; dependency graph assumes early convergence on packaging + project API persistence.

---

## KPI & Metric Anchors (Preview)

| Phase | Primary KPI | Supporting Metrics |
|-------|-------------|--------------------|
| 2 | Pilot deploy reproducibility | MTTR for failed deploy, feature adoption events |
| 3 | Tenant isolation integrity | Security findings count, migration success rate |
| 4 | Dashboard engagement | Query latency, cache hit ratio |
| 5 | Install success rate | p95 latency under load, license activation latency |
| 6 | Estimation improvement | Alert precision/recall, estimation variance delta |

---

## Change Control

Each phase closes with: retrospective summary, metric snapshot, risk reassessment, and green/yellow/red status for proceeding. Phase scope changes require explicit impact note on timeline & KPIs.

---

## Next Immediate Actions (Phase 2 Execution Queue)

1. Containerization + compose baseline (tag build hash)
2. API layer for task reorder persistence
3. Metrics & health endpoint enrichment
4. Role guard scaffolding (admin vs user)
5. Feedback submission storage + listing endpoint
6. SQL migration version table + initial migration script

Tracking of these items will move into the issue/task system; this document remains strategic, not a granular sprint board.

---

## Effort & Time Tracking

This section consolidates planned vs. actual duration for major items. Actuals are populated when a phase or epic is formally closed. Where exact start dates were approximated, we note assumptions.

### Legend

| Field | Meaning |
|-------|---------|
| Planned (d) | Original planned working days (calendar compressed) |
| Actual (d) | Actual elapsed working days (estimate if marked ≈) |
| Δ | Variance = Actual − Planned (positive = overrun) |
| Status | done / in‑progress / pending |

### Phase Summary

| Phase | Planned Window | Actual Window | Planned (d) | Actual (d) | Δ | Status | Notes |
|-------|----------------|---------------|-------------|-----------|----|--------|-------|
| 1 – MVP Foundation | 2025-09-11 → 2025-10-02 | 2025-09-11 → 2025-10-02 | 21 | 21 | 0 | done | Completed on target; post‑MVP Project enhancement added immediately |
| 2 – Pilot Readiness | 2025-10-03 → (est) 2025-11-14 | — | 30 (midpoint review at week 3) | — | — | in‑progress | Window assumes moderate parallelization; refine after midpoint |
| 3 – Multi‑Tenant Foundations | (Tentative) 2025-11-17 → 2025-12-19 | — | 31 | — | — | pending | Start contingent on Phase 2 gate |
| 4 – Analytics Layer | (Tentative) 2026-01-05 → 2026-02-07 | — | 35 | — | — | pending | Break includes holiday buffer |
| 5 – Commercialization | (Tentative) 2026-02-10 → 2026-03-21 | — | 30 | — | — | pending | Align with early customer onboarding |
| 6 – Intelligence & Automation | (Tentative) 2026-Q2 | — | 42 (initial slate) | — | — | pending | Subject to reprioritization after market feedback |

### Phase 1 Detailed Effort

| Epic / Deliverable | Planned (d) | Actual (d) | Δ | Status | Notes |
|--------------------|-------------|-----------|----|--------|-------|
| Scaffold + Auth (MFA) | 10 | 10 | 0 | done | Included MFA + session handling |
| Public Pages + PDF | 7 | 7 | 0 | done | Marketing content + export functionality |
| Demo Dashboard + Audit | 7 | 7 | 0 | done | Audit logging baseline integrated |
| Dual Persistence Seed | 7 | 7 | 0 | done | Verified Mongo + SQL parity |
| Post‑MVP Project Feature | (unplanned) 4 | 4 | 0 | done | Scope added without shifting closure date |

### Phase 2 Epic Tracking (Rolling)

| Epic | Planned (d) | Actual (d) | % Complete | Status | Notes |
|------|-------------|-----------|------------|--------|-------|
| Deployment & Packaging | 10 | — | 10% | in‑progress | Initial container strategy drafted (pending compose) |
| Project Expansion (API persistence) | 10 | — | 0% | pending | Awaiting persistence layer wiring |
| Observability & Telemetry | 7 | — | 0% | pending | Define metrics schema after packaging |
| Role / Security Hardening | 7 | — | 0% | pending | RBAC model design not started |
| Feedback & Usage Events | 5 | — | 0% | pending | Event taxonomy draft needed |
| Data Migrations & Integrity | 5 | — | 0% | pending | Choose migration tooling (e.g., Prisma/TypeORM vs custom) |

### Assumptions & Method

1. Working days assume a 5‑day week; holidays not yet modeled beyond broad buffers.
2. Variance tracked only after actual closure; partial progress uses % complete placeholder.
3. Midpoint review (Phase 2) will recalibrate remaining epic planned days.
4. Unplanned scope logged explicitly (e.g., Post‑MVP Project Feature) to preserve delta transparency.

### Update Procedure

1. When an epic closes: record end date, compute Actual (d) = (end − start) adjusted for weekends.
2. If effort drastically diverges (>20% overrun): add a Retrospective Note row under the involved phase.
3. Strip placeholder dashes once actuals exist; keep Δ column aligned.
4. Re-baseline downstream phases only after a phase gate—avoid silent drift.

### Pending Data Hooks (Future Automation)

- Scriptable extraction of actual working days from commit history tags.
- Health endpoint to expose build hash + phase flag for automated dashboards.
- Optional integration with issue tracker to auto-populate % Complete.

---

Last Updated (Effort Tables): 2025-10-02
