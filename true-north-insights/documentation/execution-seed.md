# Execution Seed – Past, Present, Future Task Matrix

Status: Draft  
Last Updated: 2025-10-03

Purpose: Single reference snapshot aligning marketing, product, design, security planning, and Jamestown relocation program execution with time/effort estimates.

---

## 1. Legend
| Field | Meaning |
| ----- | ------- |
| Status | completed / in-progress / planned |
| Effort (d) | Estimated focused engineering or program days (ideal) |
| Wave | Suggested sequencing bucket (Foundation, Performance, Community, Scale, Hardening) |

## 2. Consolidated Task Table

| ID | Domain | Task | Status | Effort (d) | Wave | Source Doc / Link | Notes |
| -- | ------ | ---- | ------ | ---------- | ---- | ------------------ | ----- |
| GTM-1 | Performance | Add source-map bundle analysis script | planned | 0.5 | Foundation | Go-To-Market Playbook | Precedes DX-2 follow-ups |
| GTM-2 | Theming | Re-enable modern Material theme API | planned | 1 | Foundation | Playbook / Design Backlog | Requires review of disabled theme block |
| GTM-3 | Performance | Implement `@defer` non-critical sections | planned | 0.5 | Performance | Playbook / Design Backlog | After baseline metrics captured |
| GTM-4 | Insights | Add analytics service scaffold | planned | 0.5 | Foundation | Design Backlog | Capture nav + CTA first |
| GTM-5 | Quality | Add a11y automated axe scan script | planned | 0.5 | Foundation | Design Backlog | Integrate into CI (lint gate) |
| GTM-6 | Community | Fraternal partner outreach kit | planned | 1 | Community | Design Backlog / Jamestown | Deck + one-pager template |
| GTM-7 | Ops | Metrics dashboard automation (export) | planned | 1 | Scale | Playbook / Design Backlog | Post analytics service (GTM-4) |
| GTM-8 | Talent | Talent Track dashboard (ramp metrics) | planned | 1.5 | Scale | Talent Track / Design Backlog | Needs schema definition |
| GTM-9 | API | Add OpenAPI auth scope placeholders | planned | 0.5 | Foundation | Security Backlog | Align with future auth wave |
| GTM-10 | Performance | Route-based preloading strategy | planned | 0.5 | Performance | Design Backlog | After lazy load review |
| DX-1 | Theming | Material theme API re-enable | planned | 1 | Foundation | Design Backlog | Mirrors GTM-2 (merge) |
| DX-2 | Performance | Source-map bundle analysis script | planned | 0.5 | Foundation | Design Backlog | Mirrors GTM-1 (dedupe) |
| DX-3 | Performance | `@defer` hero images/sections | planned | 0.5 | Performance | Design Backlog | Same as GTM-3 (dedupe) |
| DX-4 | Analytics | Lightweight analytics service | planned | 0.5 | Foundation | Design Backlog | Same as GTM-4 (dedupe) |
| DX-5 | Accessibility | axe-core CI integration | planned | 0.5 | Foundation | Design Backlog | Same as GTM-5 (dedupe) |
| DX-6 | Community | Outreach kit (deck + one-pager) | planned | 1 | Community | Design Backlog | Tied to Jamestown program |
| DX-7 | Talent | Ramp & completion dashboard | planned | 1.5 | Scale | Design Backlog | Same as GTM-8 (dedupe) |
| DX-8 | Ops | Dashboard export automation | planned | 1 | Scale | Design Backlog | Same as GTM-7 (dedupe) |
| DX-9 | API | OpenAPI auth scope placeholders | planned | 0.5 | Foundation | Design Backlog | Same as GTM-9 (dedupe) |
| DX-10 | Navigation | Smart preloading strategy | planned | 0.5 | Performance | Design Backlog | Same as GTM-10 (dedupe) |
| DX-11 | Performance | Icon pruning & sprite optimization | planned | 0.5 | Performance | Design Backlog | After analysis (DX-2) |
| DX-12 | Motion | Motion audit & reduced-motion compliance | planned | 0.5 | Performance | Design Backlog | Pair with a11y wave |
| DX-13 | Documentation | Diagram visual index gallery | planned | 0.5 | Community | Design Backlog | Collect existing Mermaid |
| DX-14 | Community | Infographic one-pager export | completed | 0.75 | Community | One-Pager | Created initial markdown variant |
| DX-15 | Internationalization | i18n scaffolding | planned | 1 | Scale | Design Backlog | Precedes translation sourcing |
| DX-16 | Testing | Visual regression harness | planned | 1.5 | Hardening | Design Backlog | Needs baseline asset set |
| DX-17 | Security UX | Traceability affordances UI | planned | 1 | Hardening | Security Backlog | After auth scopes groundwork |
| SEC-1 | Headers | Security headers plan (CSP, HSTS) | planned | 0.5 | Foundation | Security Backlog | Implementation deferred |
| SEC-2 | Rate Limiting | API rate limit strategy doc | planned | 0.5 | Foundation | Security Backlog | Pre-implementation scope |
| SEC-3 | Audit Chain | Blockchain audit POC extension | planned | 1.5 | Scale | Security Backlog | Depends baseline event model |
| SEC-4 | SBOM | Automated SBOM generation | planned | 0.75 | Foundation | Security Backlog | For compliance posture |
| SEC-5 | Role Guards | Role/claim middleware design | planned | 0.75 | Foundation | Security Backlog | After auth scopes placeholder |
| JMT-1 | Housing MoUs Wave 1 | Partner outreach + agreements | planned | 2 | Foundation | Jamestown Program | Combine actions 1 & interest validation |
| JMT-2 | Intake Schema Finalization | Data fields + validation | planned | 0.5 | Foundation | Jamestown Program | Align with analytics events |
| JMT-3 | Stipend Funding Brief | Narrative + cost model | planned | 0.75 | Foundation | Jamestown Program | Precedes grant submission |
| JMT-4 | Fraternal Event Calendar | Q1–Q2 schedule lock | planned | 1 | Community | Jamestown Program | Consolidate sponsor commitments |
| JMT-5 | KPI Baseline Dashboard | Initial metric boards | planned | 1.5 | Foundation | Jamestown Program | May share infra with DX-4 |

## 3. Past Work (Completed Snapshot)
- Full lazy loading of marketing + legacy pages
- Security & auditing backlog drafted
- Jamestown canonical, market variant, and one-pager produced
- Design backlog created and linked
- Playbook visually enriched (diagrams + persona expansions)

## 4. Sequencing Recommendation (First 4 Weeks)
| Week | Focus | Primary Tasks |
| ---- | ----- | ------------- |
| 1 | Foundational Observability | DX-2, GTM-1, DX-4, GTM-4 |
| 2 | Performance & Theming | GTM-2/DX-1, DX-11, DX-3 |
| 3 | Community & Outreach | GTM-6/DX-6, JMT-1, JMT-4 |
| 4 | Metrics & Dashboard Seed | GTM-7/DX-8, GTM-8/DX-7, JMT-5 |

## 5. Dependency Highlights
- Bundle analysis (DX-2) precedes icon pruning (DX-11) & defer strategy (DX-3)
- Auth scope placeholders (GTM-9/DX-9) precede security UX (DX-17) and role guard design (SEC-5)
- Analytics scaffold (DX-4) required before KPI dashboard (DX-8/GTM-8, JMT-5)
- Outreach kit (GTM-6/DX-6) feeds fraternal calendar (JMT-4)

## 6. Open Considerations
| Topic | Question | Suggested Action |
| ----- | -------- | ---------------- |
| Data Model | Where to persist intake + cohort metrics? | Define minimal schema in repo docs (next iteration) |
| Auth & Security | Which provider / IdP timeline? | Add placeholder decision log entry |
| i18n | Federal readiness deadlines? | Decide quarter to introduce extraction |
| Analytics | PII boundaries for veterans? | Mask or hash at ingestion stage |

---
> Update this seed as tasks move from planned → in-progress → completed; keep deduping mirrored GTM/DX items.
