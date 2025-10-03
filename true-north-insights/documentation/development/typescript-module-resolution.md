# TypeScript Module Resolution Strategy

This project standardizes on `"moduleResolution": "bundler"` across the monorepo. This document explains why, how it is configured, and how to change it safely if future needs arise.

## Why `bundler`

`bundler` resolution (TS 5+) aligns TypeScript's resolver with modern ESM-aware bundlers (Webpack 5, Vite, esbuild, etc.):

- Supports `exports` / `imports` fields in `package.json` cleanly.
- Avoids legacy Node/Classic resolution corner cases.
- Reduces the need for path mapping hacks when consuming modern packages.
- Plays well with unified ESM / CJS interop when libraries ship conditional exports.

## Current Configuration

Root `tsconfig.base.json` (or `tsconfig.json`) includes:

```jsonc
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  }
}
```

Feature / app tsconfigs extend the root and DO NOT override `moduleResolution`, ensuring consistency:

```jsonc
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {}
}
```

## JSON Module Imports

`resolveJsonModule: true` enables direct importing of JSON (used by the API contract placeholder):

```ts
import spec from './openapi.json';
```

An ambient declaration (`contracts/api/json-modules.d.ts`) provides a broad fallback type. Replace with precise interfaces when the contract stabilizes.

## Interop Notes

- NestJS backend build (Webpack) emits CommonJS compatible wrapper while still allowing ESM-style authoring imports.
- Angular CLI (via Nx) already aligns with modern resolution and doesn't require overrides.
- Avoid mixing `moduleResolution: node` in subpackages; it can create subtle duplicate type graphs.

## When You Might Change It

Switch only if you introduce a tool that lacks `bundler` support (rare). Candidate alternatives:

| Scenario                                        | Consider                       |
| ----------------------------------------------- | ------------------------------ |
| Legacy tooling requiring classic Node algorithm | `"moduleResolution": "node"`   |
| Type acquisition anomalies in very old libs     | Temporary per-package override |

## Safe Migration Steps (If Ever Needed)

1. Introduce a new branch.
2. Change root to desired strategy (e.g. `node`).
3. Run: `npm run typecheck:backend && npm run test:unit`.
4. Fix any path / export resolution failures.
5. Update this document with rationale.

## Validation Pipeline Integration

The `typecheck:backend` script (added to `validate:all`) acts as an early warning system—if a change introduces an incompatible resolution expectation, CI fails fast.

## FAQ

**Q: Why not `node16` / `nodenext`?**  
Those modes focus on Node's hybrid ESM/CJS loader mapping semantics and add package.json condition parsing that is already covered via `bundler` for our use cases, while also introducing stricter file extension rules we don't currently need.

**Q: Do we need path aliases?**  
Prefer relative or package-based imports. Adding path aliases risks drift once code is published or restructured. If absolutely required, define them only in root and document them here.

**Q: How do contract JSON types become stronger?**  
Generate TypeScript types from OpenAPI (e.g. using `openapi-typescript`) and replace the ambient JSON module declaration with explicit typed imports.

---

Maintainer: Architecture / Platform Team
Last Updated: 2025-10-02

## Editor & Tooling Noise Mitigation (Added 2025-10-02)

Recent upgrades introduced spurious editor diagnostics for the module path:

```text
Cannot find module '@typescript-eslint/utils/ts-eslint'
```

and private identifier / missing symbol errors inside `node_modules` declarations (particularly `@typescript-eslint/*` and `nx/src/native`). The project compiler (`npx tsc --noEmit`) was clean; only the editor surfaced the noise when peeking declaration files.

### Solution Implemented

1. Added a shim module: `types/ts-eslint-shim.d.ts`

   ```ts
   declare module '@typescript-eslint/utils/ts-eslint' {
     export * from '@typescript-eslint/utils/dist/ts-eslint';
   }
   ```

2. Added a `paths` mapping in `tsconfig.base.json`:

   ```jsonc
   "paths": {
     "@typescript-eslint/utils/ts-eslint": ["node_modules/@typescript-eslint/utils/dist/ts-eslint/index.d.ts"],
     "@styles/*": ["frontend/src/styles/*"],
     "@types/*": ["types/*"]
   }
   ```

3. Introduced `tsconfig.eslint.json` to give ESLint a dedicated graph (ensures `moduleResolution: bundler` + shim inclusion without emitting artifacts).
4. Updated `eslint.config.mjs` to set `languageOptions.parserOptions.project = ['./tsconfig.eslint.json']` for TypeScript files.

### Why Not Another Mode?

Switching to `node16` or `nodenext` would _also_ resolve the declaration, but adds extension resolution strictness and does not provide additional value for our current Angular + NestJS + bundler toolchain.

### Alternative Strategies (If Revisited Later)

| Option                          | Description                                                  | Pros                           | Cons                                                                |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------- |
| Ignore node_modules diagnostics | Rely on default suppression; avoid opening declaration files | Zero config                    | Editor noise reappears when exploring types                         |
| Switch to `node16`              | Use Node's conditional exports resolution                    | Familiar in backend ecosystems | File extension & package boundary churn; less aligned with bundlers |
| Remove shim later               | Once TypeScript / toolchain improves                         | Simplifies config              | Requires periodic re‑validation                                     |
| Use `typesVersions` map         | Map subpath in a published package variant                   | Standards-based                | Overkill for internal monorepo scenario                             |

### Clean Removal Path

If a future toolchain update renders the shim unnecessary:

1. Delete `types/ts-eslint-shim.d.ts`.
2. Remove the specific `paths` entry for `@typescript-eslint/utils/ts-eslint`.
3. Run `npx tsc --noEmit` & ESLint to confirm no regressions.
4. Update this section noting removal.

### Verification Commands

```bash
npx tsc --noEmit
npx eslint . --max-warnings=0
```

Result should remain clean. If issues return, re‑add shim or evaluate upgrading TypeScript (check release notes for resolver fixes).

---

## Composite Project & Editor Aggregation (Added 2025-10-03)

To eliminate lingering editor (VS Code Problems panel) diagnostics originating from `node_modules` declaration files, we introduced a **composite project graph** plus a lightweight **editor aggregation config**.

### Root Composite `tsconfig.json`

The root now declares project references so the TypeScript server treats the workspace as a single solution:

```jsonc
{
  "extends": "./tsconfig.base.json",
  "files": [],
  "references": [{ "path": "./frontend" }, { "path": "./backend" }, { "path": "./contracts/api" }, { "path": "./frontend-e2e" }, { "path": "./backend-e2e" }]
}
```

Benefits:

- Prevents creation of ad‑hoc inferred projects (a common cause of extra library scans).
- Ensures consistent compiler options (target/lib/skipLibCheck) across all leaves.
- Speeds up editor features via project graph caching.

### `tsconfig.editor.json`

An optional aggregator used solely by the editor (not by builds):

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "forceConsistentCasingInFileNames": true
  },
  "files": [],
  "references": [{ "path": "./frontend/tsconfig.app.json" }, { "path": "./frontend/tsconfig.spec.json" }, { "path": "./backend/tsconfig.app.json" }, { "path": "./backend/tsconfig.spec.json" }, { "path": "./contracts/api/tsconfig.json" }, { "path": "./frontend-e2e/tsconfig.json" }, { "path": "./backend-e2e/tsconfig.json" }]
}
```

Use cases:

- Explicitly drives which subprojects load in the editor.
- Can be extended later with editor-only `types` (e.g. Playwright/Jest) without polluting build graphs.

### VS Code Settings

Added `.vscode/settings.json` adjustment to reduce noisy daemon/project-level library diagnostics:

```jsonc
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.tsserver.experimental.enableProjectDiagnostics": false
}
```

Optional (leave off if you _want_ deep background library checks). This does **not** weaken compile safety—`npx tsc --noEmit` and CI remain the source of truth.

### Workflow After Changes

1. Save all files.
2. Run `npx tsc --noEmit` (should be clean).
3. Restart TS Server (VS Code Command Palette).
4. Problems panel should drop prior `node_modules` noise.

### Reverting (If Ever Needed)

1. Remove references array from root `tsconfig.json` (or restore previous file).
2. Delete `tsconfig.editor.json`.
3. Restart TS Server.
4. Confirm no unexpected regressions (you may see node_modules noise again).

### Why Not Just Rely on `skipLibCheck`?

`skipLibCheck` suppresses type _checking_ of library `.d.ts`, but the editor can still surface structural or syntax-related diagnostics when it loads them under different inferred contexts. Composite references focus the server so fewer stray contexts are created in the first place.

---
