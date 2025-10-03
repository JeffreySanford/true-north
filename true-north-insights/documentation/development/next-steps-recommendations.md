---
title: Next Steps Recommendations
description: Phased recommendations across Performance, DX, Analytics, Security, Internationalization, Accessibility, and Program Differentiation.
status: proposal
version: 1.0.0
owners: [platform, dx, security, marketing]
links:
  execution-seed: ../execution-seed.md
  design-backlog: ../design/tasks-backlog.md
  security-backlog: ../monorepo/security-and-audit.md
  jamestown-canonical: ../marketing/move-to-jamestown-veterans.md
  jamestown-onepager: ../marketing/move-to-jamestown-onepager.md
---

---

# Next Steps Recommendations

This document converts the unified execution seed and backlog artifacts into a **phased, acceptance‑criteria driven recommendation plan**. Each recommendation states: objective, rationale, dependencies, acceptance criteria, effort (dev days), risk notes, and measurable success indicators.

> Scope intentionally excludes already completed marketing + lazy loading work; it focuses on forward enhancements.

## Wave Overview (Strategic Ordering)

| Wave | Theme                                 | Primary Objectives                                                                                           | Why Now                                                          | Blockers Removed                                 |
| ---- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------ |
| 1    | Foundational Observability & Theming  | Analytics scaffold, baseline dashboards, re-enable Material Design 3 theme, bundle analysis, icon pruning    | Enables data-driven prioritization and design consistency        | Lazy loading + route restructuring complete      |
| 2    | Performance & Experience Optimization | Smart preload strategy, `@defer` adoption plan, critical CSS & image strategy, motion/a11y polish            | Reduces TTI & improves perceived speed ahead of heavier features | Baseline performance metrics exist (Wave 1)      |
| 3    | Quality & Resilience Tooling          | Visual regression harness, accessibility automated audits, i18n scaffolding, content externalization         | Introduces guardrails before scaling content breadth             | Stable design system tokens (Wave 1)             |
| 4    | Security & Trust Implementation       | CSP + security headers, rate limiting, RBAC/claims guards, audit chain POC, SBOM automation                  | Elevates enterprise readiness & procurement trust signals        | Lower churn risk after UX stabilization          |
| 5    | Growth & Experimentation              | A/B & multivariate harness, funnel event enrichment, retention cohort queries, personas refinement loop      | Data maturity enables actionable experimentation                 | Robust telemetry + dashboards (Waves 1–2)        |
| 6    | Program Differentiation Expansion     | Jamestown incentives automation hooks, partner portal preview stubs, veteran talent pipeline integration API | Converts narrative differentiator into functional moat           | Security + observability scaffolds (Waves 1 & 4) |

## Detailed Recommendations

## Analytics & Telemetry Scaffold (Wave 1)

**Objective:** Capture high-signal, low-noise product marketing funnel and engagement events.

**Rationale:** Informs conversion optimization, validates Jamestown positioning resonance, and feeds later experimentation layer.

**Dependencies:** None (foundation start). Cross-link to design tokens reactivation for consistent event naming.

**Implementation Notes:**

- Lightweight event service (Angular injectable) batching to `navigator.sendBeacon` fallback -> `fetch`.
- Event taxonomy: page_view, section_view (observer), cta_click, form_submit, scroll_depth (quartiles), animation_skip (prefers-reduced-motion), jamestown_interest_click.
- Use structured envelope `{ t: epoch_ms, userAnonId, sessionId, evt, props }`.

**Acceptance Criteria:**

1. Service sends beacons (<= 2kb per batch) with retry suppression (no duplicate events within 5s window per key).
2. Console debug toggle via `?debugEvents=1` prints normalized events.
3. Page & section view events < 2% dropped in throttled 3G simulated conditions.
4. Event schema documented in `docs/analytics-schema.md` with property dictionary.

**Effort:** 1.5d

**Success Indicator:** 100% of target pages emitting baseline events; dashboard shows distinct session, CTA conversion, Jamestown interest ratio.

## Baseline Metrics Dashboard (Wave 1)

**Objective:** Provide a living snapshot of funnel, engagement, performance, and veteran-program interest.

**Rationale:** Shared visibility accelerates cross-functional prioritization.

**Dependencies:** Analytics scaffold events.

**Acceptance Criteria:**

1. Single markdown or lightweight static HTML dashboard (no BI vendor dependency) auto-regenerated (script) daily from raw JSON log rollups.
2. Metrics: sessions, visits/page, CTA conversion %, Jamestown interest clicks %, avg scroll depth, time-to-interact (from RUM), bounce estimate.
3. Stored artifact committed or archived (retention 14 days minimum).

**Effort:** 1d
**Success Indicator:** Daily dashboard update PR or artifact diff visible; stakeholders reference in planning.

## Material Design 3 Theme Reactivation (Wave 1)

**Objective:** Reinstate MD3 theming layer with patriotic palette + accessible contrast tokens.

**Rationale:** Consistent visual system before visual regression and a11y automation.

**Dependencies:** None (parallelizable with Analytics).

**Acceptance Criteria:**

1. Theme file exports semantic tokens (primary, accent, neutral, emphasis, surface-elevated) with dark mode contrast >= WCAG AA.
2. No raw hex colors in component templates (lint rule or grep audit passes).
3. Palette documented with contrast ratios.

**Effort:** 0.75d
**Success Indicator:** Style diff reduces ad-hoc inline styles by >70% vs prior commit.

## Bundle Analysis & Icon Pruning (Wave 1)

**Objective:** Ensure sustained under-budget initial bundles and remove unused iconography/assets.

**Rationale:** Maintain performance headroom prior to adding experimentation & security features.

**Dependencies:** Lazy loading already complete.

**Acceptance Criteria:**

1. Script producing size report (compressed & uncompressed) committed in `tools/perf/bundle-report.json`.
2. Remove unused Angular Material icon sets / SVGs (dead usage < 2 icons).
3. Budgets tightened (warn 780kb, error 920kb) with documented justification.

**Effort:** 0.5d
**Success Indicator:** CI budget gate passes; delta report trackable over time.

## Smart Preloading Strategy (Wave 2)

**Objective:** Improve subsequent navigation latency while preserving initial load budget.

**Rationale:** Strategic prefetch of most-likely next routes (predictive heuristics) lifts perceived responsiveness.

**Dependencies:** Bundle analysis output (identify largest lazy chunks).

**Acceptance Criteria:**

1. Custom PreloadingStrategy implementing heuristic (e.g., priority list + interaction hints + idle callback fallback).
2. No preloaded chunk fetched before TTI + 1s idle.
3. Lighthouse navigation metric (second route) improves >= 15% vs baseline.

**Effort:** 1d
**Success Indicator:** Controlled synthetic test demonstrates improved route interactive time.

## `@defer` Adoption Plan (Wave 2)

**Objective:** Progressive hydrate non-critical marketing fragments.

**Rationale:** Reduces main thread contention & improves TTI.

**Dependencies:** Preloading strategy design to avoid duplication.

**Acceptance Criteria:**

1. Identify 3+ candidate components (large imagery, testimonial carousel, secondary metrics panels) deferred.
2. Fallback skeletons visible < 50ms post route activation.
3. Interaction readiness unchanged for above-the-fold copy.

**Effort:** 1d
**Success Indicator:** TTI reduction >= 8% on affected routes.

## Accessibility Automation (Wave 3)

**Objective:** Enforce AA baseline & motion preference adherence in CI.

**Rationale:** Prevent regressions as experimentation & security overlays add surface area.

**Dependencies:** Theme tokens stable (Wave 1) to minimize churn.

**Acceptance Criteria:**

1. Pa11y (or axe) CI task scanning critical pages returns 0 serious/critical issues.
2. Snapshot of color contrast report archived per build.
3. prefers-reduced-motion test ensures animations skip & events still fire without duplication.

**Effort:** 1d
**Success Indicator:** Automated report diff shows ongoing compliance; failures block merge.

## Visual Regression Harness (Wave 3)

**Objective:** Detect unintended UI shifts quickly.

**Rationale:** Supports safe iteration on theming, security banners, and i18n expansion.

**Dependencies:** Theme tokens (Wave 1) complete.

**Acceptance Criteria:**

1. 10 key route/page baselines captured (desktop + narrow viewport).
2. Threshold tuned to ignore anti-aliasing noise (< 0.2% pixel delta) while flagging layout breaks.
3. GitHub (or CI) artifact attaches diff on failure.

**Effort:** 0.75d
**Success Indicator:** Intentional style tweak triggers predictable single diff.

## Internationalization Scaffolding (Wave 3)

**Objective:** Prepare for future multilingual expansion without retrofitting.

**Rationale:** Early key extraction reduces future translation backlog risk & ensures event taxonomy locale-agnostic.

**Dependencies:** Analytics event schema stable.

**Acceptance Criteria:**

1. i18n extraction produces message catalog with <= 5% hardcoded residual strings (grep audit).
2. Language switch stub toggles en->placeholder locale (e.g., es) with fallbacks.
3. Event payloads remain English-keyed (no locale leakage into structural fields).

**Effort:** 1d
**Success Indicator:** New copy added post-scaffold auto-appears in extraction delta.

## Security Headers & CSP (Wave 4)

**Objective:** Harden client against common classes of attacks.

**Rationale:** Builds trust & passes procurement security review baseline.

**Dependencies:** Asset domains stabilized (icon pruning done) to simplify CSP allowlist.

**Acceptance Criteria:**

1. Headers: CSP (script-src 'self' strict-dynamic; object-src 'none'; frame-ancestors 'none'), HSTS (>= 6 months), X-Content-Type-Options, X-Frame-Options DENY (or CSP equivalent), Referrer-Policy strict-origin-when-cross-origin.
2. Report-only phase < 7 days then enforced.
3. No inline script/style violations remaining (hash/nonce strategy documented).

**Effort:** 1d
**Success Indicator:** Security scan passes with 0 high findings; CSP violation logs < 3 legitimate entries after enforcement.

## Rate Limiting & Audit Chain (Wave 4)

**Objective:** Prevent abusive form/API usage & establish tamper-evident event record (POC).

**Rationale:** Protects infrastructure & demonstrates forward-leaning audit posture.

**Dependencies:** Analytics service (reuse ingestion infra for signed ledger entries).

**Acceptance Criteria:**

1. IP + anonID heuristic rate limits form submissions (sliding window) with meaningful 429 JSON structure.
2. Audit chain POC: append-only log with hash(prev_hash + entry_payload) persisted; verification script passes integrity check.
3. Documentation of escalation playbook for anomalous spike detection.

**Effort:** 1.5d
**Success Indicator:** Pen test script cannot exceed defined threshold without receiving 429.

## RBAC / Claims Guards (Wave 4)

**Objective:** Introduce role-based route protection for forthcoming partner/admin views.

**Rationale:** Avoids architecting public-only assumptions into components.

**Dependencies:** Security headers baseline; minimal identity stub (JWT or mock provider).

**Acceptance Criteria:**

1. Guard denies unauthorized navigation with redirect + reason code event.
2. Role claims parsed and memoized; no synchronous blocking remote calls on navigation.
3. Public bundle excludes admin-only modules (verified via source map grep).

**Effort:** 1d
**Success Indicator:** Attempted deep link to protected route logs security event and is blocked.

## SBOM & Dependency Audit Automation (Wave 4)

**Objective:** Continuously generate Software Bill of Materials and surface vulnerability deltas.

**Rationale:** Strengthens compliance posture & speeds remediation cycles.

**Dependencies:** Stable dependency tree version after initial optimization.

**Acceptance Criteria:**

1. SBOM (CycloneDX JSON) generated each main branch build.
2. High/Critical findings cause CI warning (escalate to fail after agreed grace period).
3. Historical diff report (top-level dependency changes) stored 30 days.

**Effort:** 0.75d
**Success Indicator:** Automated PR comment attaches SBOM summary.

## Experimentation Harness (Wave 5)

**Objective:** Safely run A/B or multivariate tests with minimal bundle bloat.

**Rationale:** Data-driven iteration on messaging & Jamestown CTA placement.

**Dependencies:** Analytics baseline; performance optimizations to preserve budget headroom.

**Acceptance Criteria:**

1. Variant assignment deterministic per userAnonId (hash bucket) with override query param for QA.
2. Experiment config JSON <= 5kb fetched post-TTI.
3. Exposure + conversion events consistent (no double fire) across route changes.

**Effort:** 1.5d
**Success Indicator:** Test run log shows balanced allocation within 2% tolerance.

## Persona & Funnel Enrichment (Wave 5)

**Objective:** Enhance captured context for segment performance insights.

**Rationale:** Refines messaging adjustments & investor narrative quality.

**Dependencies:** Experimentation harness (to correlate variants with segments).

**Acceptance Criteria:**

1. Optional enrichment: derived_persona classification (ruleset documented) appended client-side before beacon send.
2. PII exclusion verified (no emails / raw form free text in payloads).
3. Dashboard segment drill-down live for at least 3 personas.

**Effort:** 0.75d
**Success Indicator:** Segment performance delta surfaced for at least one CTA.

## Jamestown Program Automation Hooks (Wave 6)

**Objective:** Transition Jamestown narrative into early operational touchpoints.

**Rationale:** Strengthens differentiation; signals tangible progress to stakeholders.

**Dependencies:** Security (RBAC) + analytics maturity for tracking.

**Acceptance Criteria:**

1. Interest form posts to structured intake queue (mock or real) with unique intent ID + signed hash.
2. Internal (guarded) view listing anonymized interest cohort metrics.
3. Incentive mapping config file (YAML) validated on build with schema.

**Effort:** 1d
**Success Indicator:** At least one synthetic intent record flows end-to-end with audit hash verification.

## Cross-Cutting Principles

- Minimize bundle impact: all optional frameworks loaded via dynamic import or after TTI.
- Observability first: every major feature emits health & usage metrics.
- Accessibility baked in: automated lint + CI scanners treat AA as non-negotiable.
- Documentation parity: each feature adds/update a doc stub (architecture, schema, or ops notes).
- Reversibility: Feature flags or configuration toggles for all experimental/POC layers.

## Risk & Mitigation Snapshot

| Risk                                              | Impact        | Likelihood | Mitigation                                                      |
| ------------------------------------------------- | ------------- | ---------- | --------------------------------------------------------------- |
| Scope creep in experimentation harness            | Delays Wave 5 | Medium     | Strict MVP (assignment + exposure + conversion only)            |
| Over-permissive CSP causes regressions            | Broken assets | Low        | Report-only trial + staged rollout                              |
| Performance regressions from analytics enrichment | Slower TTI    | Medium     | Defer enrichment until idle; measure delta in CI synthetic runs |
| i18n extraction churn due to copy iteration       | Rework        | Medium     | Freeze key IDs; map copy evolutions to same keys                |
| Visual regression flakiness                       | False alarms  | Medium     | Calibrate threshold & exclude dynamic regions                   |

## Consolidated Effort Projection

Summing nominal efforts (in dev days) excluding contingency:

Wave 1: 1.5 + 1 + 0.75 + 0.5 = 3.75d  
Wave 2: 1 + 1 = 2d  
Wave 3: 1 + 0.75 + 1 = 2.75d  
Wave 4: 1 + 1.5 + 1 + 0.75 = 4.25d  
Wave 5: 1.5 + 0.75 = 2.25d  
Wave 6: 1 = 1d  
**Total (nominal): 16d**  
Recommend adding 20% contingency (complex integration + security hardening) → **19.2d (~19–20d)**.

## Success Dashboard (Future State KPIs)

| Dimension   | KPI                                          | Baseline (Est.) | Target (Post Wave)   |
| ----------- | -------------------------------------------- | --------------- | -------------------- |
| Performance | TTI (primary marketing route)                | ~2.5s (3G Fast) | < 2.0s (Wave 2)      |
| Engagement  | CTA conversion rate                          | 2.0%            | 3.5% (Wave 5)        |
| Interest    | Jamestown interest click ratio               | 6% sessions     | 10% (Wave 6)         |
| Quality     | a11y serious violations                      | > 5 manual      | 0 automated (Wave 3) |
| Reliability | Visual regressions escaped to main / quarter | Unknown         | < 1 (Wave 3)         |
| Security    | High vuln (prod deps)                        | Untracked       | 0 open > 7d (Wave 4) |

## Integration With Existing Artifacts

- Execution Seed: Provides task IDs & historical status feeding into wave scheduling.
- Design Backlog: Supplies candidate visual polish items deferred until after Theme Reactivation.
- Security & Audit Backlog: Source-of-truth for expanded Wave 4 scope beyond MVP items included here.
- Jamestown Documents: Inform instrumentation focus (interest, pathway engagement) for analytics taxonomy.

## Next Immediate Actions (Actionable Sprint Slice)

| ID  | Action                                                    | Owner    | Effort | Exit Signal                             |
| --- | --------------------------------------------------------- | -------- | ------ | --------------------------------------- |
| N1  | Implement analytics scaffold service + event taxonomy doc | DX       | 1.5d   | Events logging + debug param verified   |
| N2  | Re-enable MD3 theme tokens + contrast validation          | DX       | 0.75d  | No raw hex grep; contrast report stored |
| N3  | Bundle & icon pruning script + tightened budgets          | DX       | 0.5d   | Report committed; budgets enforced      |
| N4  | Baseline dashboard generation script + first artifact     | Platform | 1d     | Dashboard artifact published            |

After completion, reassess metrics deltas to confirm readiness for Wave 2 performance initiatives.

## Change Log

- 1.0.0 – Initial recommendation plan drafted.

---

Cross-links: [Execution Seed](../execution-seed.md) | [Design Backlog](../design/tasks-backlog.md) | [Security & Audit Backlog](../monorepo/security-and-audit.md) | [Jamestown Program](../marketing/move-to-jamestown-veterans.md)
