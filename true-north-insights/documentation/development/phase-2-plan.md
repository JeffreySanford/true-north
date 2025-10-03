---
title: Phase 2 Implementation Plan
status: draft
version: 0.1.0
owners: [platform, dx, data, security]
links:
  seed: ../data/demo-seed-data.md
  dual-persistence: ../design/architecture-dual-persistence.md
  quality-report: ../../scripts/quality-report.ts
  next-steps: ./next-steps-recommendations.md
---

## Executive Summary

Phase 2 hardens the platform by replacing brittle seed JSON with a definitive dual persistence data layer (SQL + Mongo), formalizing a versioned design system, and elevating engineering time & quality telemetry to first‑class data. This enables credible enterprise / defense contracting narratives (data mastery, auditability, performance insight) and unlocks later security & experimentation waves.

## Pillars

1. Definitive Data Backbone (SQL authoritative + Mongo document/event store)
2. Dual Persistence CQRS & Projection Layer
3. Design System Library (MD3 tokens + components)
4. Engineering Telemetry (build/test/lint durations, run history)
5. Sync Integrity & Observability
6. Developer Experience & VS Code Integration

## Scope (In / Out)

| In Scope                                                             | Out of Scope (Phase 2)                            |
| -------------------------------------------------------------------- | ------------------------------------------------- |
| Initial SQL schema (programs, enrollments, build_metrics, users)     | Full multi-tenant isolation strategy              |
| Mongo collections (telemetry_events, quality_runs, program_interest) | Advanced analytics warehouse (OLAP)               |
| Projection worker (basic)                                            | Distributed event bus (Kafka, NATS)               |
| Design system tokens + 3 base components                             | Complete component catalog                        |
| Time tracking enhancements (runId,start/end)                         | Manual time tracker UI                            |
| VS Code task integration & status bar timing                         | Full custom VS Code extension marketplace release |

## Data Model (Initial Cut)

### SQL (Authoritative)

| Table                  | Key Columns                                                                       | Purpose                              |
| ---------------------- | --------------------------------------------------------------------------------- | ------------------------------------ |
| users                  | id, email, created_at                                                             | Identity root                        |
| programs               | id, code, phase, kpi_target_json                                                  | Program definitions (Jamestown etc.) |
| enrollments            | id, user_id, program_id, status, created_at, meta_hash                            | Enrollment lifecycle                 |
| build_metrics          | id, run_id, project, target, status, duration_ms, cached, started_at, finished_at | Engineering run telemetry            |
| perf_aggregate (later) | day, project, target, p50, p95                                                    | Trend snapshots                      |

### Mongo (Flexible / Stream / Read Models)

| Collection       | Fields (core)                                     | Purpose                                      |
| ---------------- | ------------------------------------------------- | -------------------------------------------- |
| telemetry_events | \_id, t, event_type, anonId, sessionId, props{}   | Frontend funnel and engagement events        |
| quality_runs     | \_id (run_id), generatedAt, tasks[], aggregates[] | Full quality report snapshot                 |
| program_interest | \_id, program_code, anonId, stage, enrichment{}   | Jamestown + other programs interest pipeline |
| program_overview | program_id, participants_count, kpi_progress{}    | Denormalized projection for fast queries     |

## CQRS / Projection Flow

1. Write operation (enrollment create) persists SQL row.
2. Emits domain event (in-process for now) to projection handler.
3. Handler reads authoritative SQL row(s), constructs denormalized doc, upserts in Mongo.
4. Reconciliation job (cron) recomputes hash(meta) and logs discrepancies.

## Engineering Telemetry Enhancements

Enhance `quality-report.ts` (Phase 2 early):

- Add `runId` (ISO timestamp or ULID) per run.
- Add `startedAt` / `endedAt` per target.
- Optional flag `--persist` triggers POST to backend endpoint `/internal/quality-runs`.
- Backend: store per-target metrics in `build_metrics`; mirror summary to Mongo `quality_runs`.
- Later: daily job populates `perf_aggregate` with p50/p95 excluding cached tasks.

## Design System Library

Create `libs/design-system` containing:

- `tokens/` (SCSS or TS export): color palette, spacing scale, typography, elevations, motion durations.
- `components/` minimal set: Button, Card, SectionHeader (A11y: focus ring, ARIA roles).
- `README.md` usage guidelines (importing modules, theming strategy, do/don’t examples).
- Lint rule (grep or ESLint custom) to disallow ad-hoc hex colors outside token files.

## VS Code Integration Strategy

| Goal                         | Mechanism                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Show last quality run status | Generate `dist/quality/quality-run-status.txt` and use built-in file watch in status bar (settings or simple extension later) |
| Quick run command            | Add VS Code task `Quality: Full` invoking `npm run quality:full`                                                              |
| Timing feedback              | Script outputs ANSI timing summary; a future small internal extension could parse JSON and show trending arrow (↗/↘)          |
| Problem surfaces             | Convert regression rules to lint-style output (problem matcher) once thresholds added                                         |

### Initial VS Code Tasks (proposed tasks.json entries)

```jsonc
{
  "label": "Quality: Full",
  "type": "shell",
  "command": "npm run quality:full",
  "problemMatcher": []
}
```

## Backlog (Ordered)

| #   | Task                                                         | Effort (d) | Dependencies | Exit Criteria                            |
| --- | ------------------------------------------------------------ | ---------- | ------------ | ---------------------------------------- |
| 1   | SQL migrations (users, programs, enrollments, build_metrics) | 0.75       | -            | Migration runs locally; tables exist     |
| 2   | Mongo collection init scripts                                | 0.25       | 1            | Collections created; indices planned     |
| 3   | Repo interfaces + dual adapters                              | 1          | 1,2          | CRUD tests passing against both stores   |
| 4   | Projection handler (enrollments->program_overview)           | 0.75       | 3            | Overview updates after create/update     |
| 5   | Reconciliation job + hash logging                            | 0.5        | 4            | Job reports 0 diffs on clean data        |
| 6   | quality-report runId & timestamps                            | 0.25       | -            | JSON includes per-target timestamps      |
| 7   | Backend quality-runs endpoint + persistence                  | 0.75       | 6            | POST stores rows & summary               |
| 8   | perf aggregate cron (p50/p95)                                | 0.5        | 7            | Daily row created                        |
| 9   | design-system lib scaffold + tokens                          | 0.5        | -            | Library builds & imported in frontend    |
| 10  | base components + a11y checks                                | 0.75       | 9            | Axe scan 0 serious issues on demo page   |
| 11  | hex color lint prevention                                    | 0.25       | 9            | Lint fails on new raw hex outside tokens |
| 12  | VS Code task + status artifact                               | 0.25       | 6            | Task visible; status file updates        |
| 13  | Docs update & diagrams                                       | 0.5        | 4,7,9        | Updated architecture + plan committed    |

Total nominal: 7.75d (add 20% buffer ≈ 9.3d).

## Risks & Mitigations

| Risk                            | Impact           | Likelihood | Mitigation                                        |
| ------------------------------- | ---------------- | ---------- | ------------------------------------------------- |
| Over-engineer projection layer  | Delay            | Medium     | Keep in-process pub/sub now; evaluate queue later |
| Dual write inconsistencies      | Data drift       | Medium     | Hash + reconciliation job early                   |
| Token churn                     | Rework           | Low        | Freeze core palette before component expansion    |
| Telemetry noise (cached tasks)  | Misleading stats | Medium     | Exclude cached for aggregates                     |
| Migration lock contention in CI | Failing builds   | Low        | Use idempotent migrations & lock file             |

## Acceptance Criteria (Phase Exit)

1. Quality report JSON shows timestamps + persisted entries in DB.
2. At least one projection materialized & reconciled with zero diffs.
3. Design system imported by at least one existing page with removed inline hex colors.
4. VS Code task executes full quality pipeline; status file reflects last run outcome.
5. Documentation (this file + updated dual persistence) merged.

## Follow-On (Phase 3 Candidates)

- Introduce message broker (e.g., NATS) if event volume rises.
- Add experimentation harness metrics to telemetry_events.
- Expand design system (forms, modals, data table) with visual regression coverage.
- SLA regression gating (fail build if p95 build time > threshold N runs).

---

Change Log:

- 0.1.0 – Initial draft
