# Performance & Bundle Optimization Guide

This guide outlines pragmatic, incremental steps to reduce the initial JavaScript payload and improve runtime performance for the `frontend` Angular (Nx) application while keeping code maintainable.

## 1. Measure First

Use source-map based tools to know what to fix:

- `npx nx build frontend --configuration=production --stats-json`
- Analyze: `npx webpack-bundle-analyzer dist/frontend/stats.json` (install analyzer locally if desired)
- Or: `npx source-map-explorer dist/frontend/*.js`

Track metrics over time (commit hash, initial bundle KB, main chunk KB) in a simple CSV or a README table.

## 2. Low-Effort Wins

| Strategy | Effort | Impact | Notes |
|----------|--------|--------|-------|
| Enable route-level lazy loading | Low | High | Split non‑critical pages (Project, Swagger) into separate chunks. |
| Standalone component imports only what is needed | Medium | Medium | Ensure imports are tree-shake friendly (no barrel over-import). |
| Remove unused polyfills | Low | Low-Med | Validate `polyfills` list. |
| Prefer OnPush for stable / data-driven components | Low | Med | Reduces change detection cost. |
| Extract large constant data to JSON & lazy fetch | Low | Med | Already leveraging seed JSON; ensure not bundled twice. |
| Prune console logging in production builds | Low | Low | Replace LoggingService console output with no-ops in prod. |
| Leverage Angular built-in deferred loading (`defer` blocks) | Med | High | For below-the-fold content (if using Angular >=17 features). |

## 3. Route-Level Code Splitting (Example)

Convert a direct component route to a lazy loaded one:

```ts
// Before
{ path: 'project', component: ProjectComponent }

// After (example; adjust actual path as needed)
{ path: 'project', loadComponent: () => import('./pages/project.component').then(m => m.ProjectComponent) }
```
If multiple related components grow, group them in a feature directory with an `index.ts` and lazy import a `ProjectFeatureComponent` that internally renders others.

## 4. Conditional / Deferred Loading (Angular >= 17)

Use `@defer` for non-critical sections:

```html
@defer (on viewport) {
  <app-heavy-stats-panel />
} @placeholder {
  <app-spinner />
}
```
This delays hydration / execution cost until visible.

## 5. Tree Shaking Hygiene

- Avoid `import * as X` when you only need one symbol.
- Avoid exporting large config objects from index barrels consumed widely.
- Keep side-effectful modules isolated.

## 6. Third-Party Review

Create a simple table of all runtime dependencies (`prod`) and justify each. Remove dead dependencies.

## 7. Logging & Diagnostics

Replace verbose runtime logging with a build-time environment flag:

```ts
if (environment.production) { loggingService.disableVerbose(); }
```

Or tree-shake a no-op provider using Angular DI with `useFactory`.

## 8. Bundle Budget Tracking

Current warning: Initial exceeds 650kb (reported ~790kb total). Increase budgets only after optimization attempts—not before.
Example stricter dev budget:

```json
{
  "type": "initial",
  "maximumWarning": "600kb",
  "maximumError": "900kb"
}
```

## 9. CSS & Styling

- Ensure global styles minimal; move feature-specific SCSS to component scope.
- Audit large Material themes; consider a custom theme building only required palettes.

## 10. Images & Assets

- Prefer SVG over PNG where suitable.
- Use `ngOptimizedImage` (Angular image directive) for responsive images if/when images are added.

## 11. Performance Budgets CI Check (Optional)

Add a script comparing previous `stats.json` with current; fail if > X% growth.

## 12. Build Caching & Nx

Nx already caches builds; ensure affected commands in CI use `nx affected --target=build` to minimize pipeline time.

## 13. Future Enhancements

| Idea | Description | Prereq |
|------|-------------|--------|
| Prefetch hints | `<link rel="prefetch" ...>` for likely next routes | Stable route analytics |
| Critical CSS extraction | Inline above-the-fold CSS | Larger marketing pages |
| Web Workers | Offload heavy calculations | Use case appears |
| SSR / Prerender | Improve TTFB & SEO | When marketing site pages added |

## 14. Quick Checklist Before Raising Budget

- [ ] Lazy loaded largest feature route(s)
- [ ] Removed unused imports / polyfills
- [ ] Logging trimmed in production
- [ ] Source-map size validated
- [ ] No unexpected large vendor additions

---
Feel free to request an automated script to diff bundle sizes—can be added next.
