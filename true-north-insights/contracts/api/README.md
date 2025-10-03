# API Contract (Placeholder)

TypeSpec adoption is postponed. This directory reserves the location and Nx target wiring for a future contract-first workflow.

## Planned Flow

1. Author TypeSpec sources here (e.g., `main.tsp` + model files).
2. Run `nx run api-contract:build` to emit `generated/openapi.json`.
3. Commit the generated OpenAPI for diff-based review.
4. Backend & frontend import typed artifacts (models, clients) generated from the spec.

## Current State

- `openapi.json` is a placeholder file.
- A mock build script (`scripts/build-api-contract.mjs`) simply ensures folder structure and exits.

## Next Steps When Ready

- Install deps: `npm i -D @typespec/compiler @typespec/http @typespec/openapi3 @typespec/rest @typespec/versioning`.
- Add `tspconfig.yaml`.
- Replace placeholder script with `npx tsp compile contracts/api`.

