# Security & Auditing Backlog (Seed)

Status: Draft – no implementation yet. Estimates are rough, assuming a single senior engineer unless noted.

| ID     | Task                                   | Description / Scope                                                                     | Est. Effort | Dependencies         | Notes                                                  |
| ------ | -------------------------------------- | --------------------------------------------------------------------------------------- | ----------- | -------------------- | ------------------------------------------------------ |
| SEC-1  | CSP (Report-Only)                      | Add Content-Security-Policy meta (report-only), collect violations, iterate to enforced | 0.5d        | None                 | Start minimal: default-src 'self' plus needed CDNs     |
| SEC-2  | Dependency Audit Automation            | Add `npm audit` / OSS scanning (e.g., OWASP dep check) in CI pipeline                   | 0.5d        | CI workflow          | Fail on high severity after grace period               |
| SEC-3  | SBOM Generation                        | Generate CycloneDX or SPDX SBOM for frontend & backend builds                           | 1d          | Build scripts        | Use `cyclonedx-npm` and `cyclonedx-maven` or ts plugin |
| SEC-4  | OpenAPI Security Annotations           | Add auth scopes / 401/403 responses to spec                                             | 1d          | Stabilized endpoints | Paves way for client guardrails                        |
| SEC-5  | Authentication Layer Abstraction       | Introduce placeholder service (JWT/OAuth) with guards & interceptors                    | 2–3d        | SEC-4                | Keep feature-flagged until backend ready               |
| SEC-6  | Role / Claim-Based Route Guards        | Map roles to Angular routes & backend controllers                                       | 1.5d        | SEC-5                | Derive from decoded token claims                       |
| SEC-7  | Request Logging Middleware (Backend)   | Correlation ID, timing, principal, status, error summary                                | 1d          | None                 | Reuse for audit trail enrichment                       |
| SEC-8  | Structured Audit Event Model           | Define event schema (who/what/when/where) + writer service                              | 1–1.5d      | SEC-7                | Persist initially to file/console, future DB           |
| SEC-9  | Audit Persistence Layer                | Store audit events (Mongo/Postgres dual path) with TTL policy                           | 2d          | SEC-8                | Index on actor, resource, time                         |
| SEC-10 | Immutable Event Hash Chain (Prototype) | Hash link events for tamper-evidence (simple chain)                                     | 2d          | SEC-9                | Explore merkle later                                   |
| SEC-11 | Access Log Redaction Rules             | Define & enforce PII redaction patterns before storage                                  | 1d          | SEC-8                | Unit tests with sample payloads                        |
| SEC-12 | Security Headers Middleware            | Add HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy  | 0.5d        | None                 | Combine with SEC-1 rollout                             |
| SEC-13 | Rate Limiting / Throttling             | IP + token-based basic limiter (e.g., Nest rate-limiter)                                | 1d          | SEC-5                | Metrics exported for tuning                            |
| SEC-14 | Input Validation Hardening             | Add class-validator / zod schemas around all DTOs                                       | 1.5d        | None                 | Fail-fast with structured errors                       |
| SEC-15 | Centralized Error Sanitization         | Normalize error responses, strip stack traces in prod                                   | 0.5d        | SEC-14               | Improves signal for logging                            |
| SEC-16 | Sensitive Config Scan                  | Detect accidental secret commits (git hooks + CI)                                       | 0.5d        | None                 | Integrate gitleaks or trufflehog                       |
| SEC-17 | Log Aggregation Integration (Future)   | Ship logs to centralized store (ELK / OpenSearch)                                       | 2–3d        | SEC-7                | Defer until infra decision                             |
| SEC-18 | Audit Query API (Read Model)           | Filter by actor/resource/time; pagination & export                                      | 2d          | SEC-9                | Must enforce auth claims                               |
| SEC-19 | Frontend Audit Viewer (Admin)          | Lazy-loaded admin route to browse audit events                                          | 2d          | SEC-18               | Access via role guard                                  |
| SEC-20 | Security Testing Baseline              | Add minimal SAST (ESLint security rules) + dependency check gating                      | 1d          | SEC-2                | Extend later with DAST                                 |

## Recommended Implementation Order (Wave 1)

1. SEC-1, SEC-12 (headers + CSP report-only)
2. SEC-2, SEC-20 (pipeline hygiene)
3. SEC-7, SEC-14, SEC-15 (logging + validation hardening)
4. SEC-8, SEC-9 (audit event pipeline MVP)
5. SEC-11 (redaction)

## Wave 2

- SEC-5, SEC-6 (auth + roles) then SEC-13 (rate limiting)
- SEC-4 (spec hardening) once auth flows stable

## Wave 3

- SEC-10 (hash chaining), SEC-18, SEC-19 (viewer), SEC-3 (SBOM), SEC-16 (secret scan if not already), SEC-17 (aggregation)

## Effort Totals (Rough)

- Wave 1: ~6–6.5 dev days
- Wave 2: ~5–6 dev days
- Wave 3: ~9–10 dev days

## Acceptance Criteria Examples

- CSP reports visible in logs with zero high-risk external violations after 1 week
- Audit event persisted with correlationId, actorId, resourceId, action, timestamp, hash (if SEC-10 complete)
- Rate limiter returns 429 with standard error body and logged event

## Notes

- Keep audit storage append-only; no updates.
- Consider feature flags for viewer & hash chain prototype.
- Revisit storage choice once volume estimates available.
