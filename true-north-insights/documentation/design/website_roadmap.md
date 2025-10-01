# True North Insights — Website Roadmap

## Phased Development Plan
```mermaid
gantt
    title Website Roadmap
    dateFormat  YYYY-MM-DD
    section Foundation
    Brand + IA + Copy          :a1, 2025-10-01, 14d
    NX Scaffold + Auth         :a2, after a1, 21d
    Public Pages + Forms       :a3, after a2, 21d
    section Portal (Demo)
    Demo Dashboard (read-only) :b1, after a3, 21d
    Audit Logs (demo)          :b2, after b1, 14d
    section Launch
    SEO/Perf + Security Pass   :c1, after b2, 7d
    Soft Launch                :c2, after c1, 7d
```

## Acceptance Criteria
- Public site live with marketing + contact flow
- Auth enabled with MFA
- Portal demo dashboard available
- Audit logs visible with seeded events
- Capability Statement PDF downloadable
- Accessibility + Performance: Lighthouse ≥ 90, WCAG AA
