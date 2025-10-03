# Design & Experience Backlog

Status: Draft  
Last Updated: 2025-10-03

---

## Purpose

Centralized backlog for UI/UX, visual system, interaction quality, and supporting operational design tasks derived from marketing expansions and product alignment.

## Task Inventory

| ID    | Area                 | Task                                                        | Rationale                       | Est (d) | Depends On              |
| ----- | -------------------- | ----------------------------------------------------------- | ------------------------------- | ------- | ----------------------- |
| DX-1  | Theming              | Re-enable modern Angular Material theme API (M3 tokens)     | Consistent palette + typography | 1       | None                    |
| DX-2  | Performance          | Add source-map bundle analysis + report script              | Track size vs. budgets          | 0.5     | GTM-1                   |
| DX-3  | Performance          | Introduce `@defer` for non-critical hero visuals            | Faster initial render           | 0.5     | DX-2                    |
| DX-4  | Analytics            | Scaffold lightweight analytics service (nav + CTA events)   | Capture funnel behaviors        | 0.5     | None                    |
| DX-5  | Accessibility        | Add automated axe-core script to CI                         | Prevent regressions             | 0.5     | None                    |
| DX-6  | Community            | Fraternal partner outreach kit (templated deck + one-pager) | Accelerate civic integrations   | 1       | Jamestown Program Doc   |
| DX-7  | Talent               | Talent Track dashboard (ramp, completion, referral metrics) | Visibility & recruiting proof   | 1.5     | Data schema draft       |
| DX-8  | Ops                  | Metrics dashboard export automation (markdown + PNG)        | Reduce manual reporting         | 1       | DX-2                    |
| DX-9  | API                  | OpenAPI auth scope placeholders + docs link                 | Prep for security layering      | 0.5     | Security backlog        |
| DX-10 | Navigation           | Route-based smart preloading strategy (interaction hint)    | Perceived snappiness            | 0.5     | Lazy routes stable      |
| DX-11 | Visual Assets        | Unified icon pruning & sprite optimization                  | Reduce bundle size              | 0.5     | DX-2                    |
| DX-12 | Motion               | Motion audit: reduce overdraw, respect reduced motion       | Performance + a11y              | 0.5     | None                    |
| DX-13 | Documentation        | Visual index of diagrams (Mermaid gallery)                  | Discovery & consistency         | 0.5     | Existing diagrams       |
| DX-14 | Jamestown            | One-pager infographic (Mermaid + compressed PNG export)     | Stakeholder briefing            | 0.75    | Jamestown Program Doc   |
| DX-15 | Internationalization | i18n scaffolding (ngx-translate or built-in extraction)     | Future federal bid readiness    | 1       | None                    |
| DX-16 | Testing              | Visual regression harness (e.g., Playwright + diff)         | Catch UI drift                  | 1.5     | Baseline screenshots    |
| DX-17 | Security UX          | Sensitive action affordances & audit annotation UI          | Clear traceability cues         | 1       | Security backlog wave 1 |

## Theme / Category Mapping

- Theming: DX-1
- Performance: DX-2, DX-3, DX-11
- Analytics & Metrics: DX-4, DX-7, DX-8
- Accessibility & Quality: DX-5, DX-12, DX-16
- Community / Jamestown: DX-6, DX-14
- API & Security Prep: DX-9, DX-17
- Navigation & Interaction: DX-10
- Documentation & Discoverability: DX-13, DX-15

## Cross-Links

- Go-To-Market Playbook: Backlog seeds GTM-1 → GTM-10
- Security & Auditing Backlog: Scopes for DX-9, DX-17
- Jamestown Veteran Program: Source for DX-6, DX-14

## Prioritization Waves (Suggested)

| Wave   | Focus                   | Candidates                |
| ------ | ----------------------- | ------------------------- |
| Wave 1 | Foundation & Insight    | DX-1, DX-2, DX-4, DX-5    |
| Wave 2 | Performance & Community | DX-3, DX-6, DX-10, DX-11  |
| Wave 3 | Metrics & Talent        | DX-7, DX-8, DX-13         |
| Wave 4 | Scale & Readiness       | DX-9, DX-14, DX-15, DX-17 |
| Wave 5 | Hardening               | DX-12, DX-16              |

## Done Criteria Template

Each task considered done when:

1. Code merged & lint/tests pass
2. Docs updated (if user-facing or architectural)
3. Metrics / baseline snapshot captured (if performance/analytics)
4. Linked artifacts updated (playbook, capability statement, or backlog)
5. A11y & reduced-motion respect validated (if UI visible)

---

> Submit enhancements or new tasks via PR with ID assignment and rationale.
