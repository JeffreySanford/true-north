# Coding Standards — Elegant & Opinionated

## Angular
- MD3 components; accessibility; OnPush; trackBy.
- Prefer RxJS **hot observables** (BehaviorSubject/ReplaySubject) to coordinate multi‑view state over scattering many async pipes. Async pipes remain fine for simple one‑off read streams; for shared, mutable or drag‑and‑drop state (e.g. Project Kanban) centralize in a service or component-level subject and expose read‑only observables when needed.
- Avoid Promise chains for streams—stay in the observable world; compose with pipeable operators.
- Use Angular `inject()` over constructor injection inside Angular-managed classes (components, services) for cleaner DI and tree‑shakeability.
- Smart/Presentational split; route resolvers for critical data. Keep heavy orchestration in smart components/services, pass plain inputs to dumb components.
- Strict TypeScript; `noImplicitAny`, `exactOptionalPropertyTypes`. Always type JSON seed data via narrow interfaces; never use `any` for external data.
- State mutation rules: never mutate arrays in place when broadcasting; assign new arrays (e.g. with spread or slice) before `next()` to preserve change detection integrity.
- Drag & Drop (CDK) lists: update source & target immutably; ensure trackBy functions return stable ids.
- JSON imports: prefer default import (`import data from './file.json'`) and cast once at the boundary to a typed structure; do not deep cast throughout code.
- Unsubscribe: when using manual subscriptions (e.g. to seed hot subjects on init), manage via `takeUntil(destroy$)` or `signal` pattern. Keep template free of `| async` if state is locally cached for performance-sensitive zones.
- Testing: when a component relies on Material/CDK modules, import only required modules in the spec; mock services with minimal shape (only used methods).

### Standalone Components Policy

This codebase deliberately does **not** use Angular standalone components.

Rationale:

- Consistent module aggregation boundaries (layout, pages, feature modules) simplify lazy loading and dependency surfacing.
- Centralized imports (e.g. Material barrel, CDK utilities) reduce repetition and drift.
- Team conventions favor explicit NgModule scoping for clearer architectural review and enforcement.

Enforcement:

- ESLint rule (`no-restricted-syntax`) blocks `standalone: true` in any `@Component` decorator.
- CI script (see package.json `ci:check-standalone`) greps for occurrences as a safety net.
- Code review checklist includes: “No new standalone components.”

If future architectural direction changes (e.g., migration to fully standalone with `@Route` and signal inputs), remove the lint rule and adjust this section accordingly.

## NestJS

- Feature modules; providers small and single‑purpose.
- DTOs + Pipes (class‑validator) for all endpoints.
- Repositories implement interfaces; inject via tokens (`@Inject('TimeRepo')`).

## Error Copy

- Clear, human‑readable errors; do not leak stack traces to client.
