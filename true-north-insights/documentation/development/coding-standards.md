# Coding Standards — Elegant & Opinionated

## Angular
- MD3 components; accessibility; OnPush; trackBy.
- RxJS **hot observables**; no Promise chains for streams.
- Smart/Presentational split; route resolvers for critical data.
- Strict TypeScript; `noImplicitAny`, `exactOptionalPropertyTypes`.

## NestJS
- Feature modules; providers small and single‑purpose.
- DTOs + Pipes (class‑validator) for all endpoints.
- Repositories implement interfaces; inject via tokens (`@Inject('TimeRepo')`).

## Error Copy
- Clear, human‑readable errors; do not leak stack traces to client.
