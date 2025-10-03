# OpenAPI & Swagger Integration

This project now generates an OpenAPI spec directly from the NestJS backend at runtime and during local development. The spec is committed (diff reviewed) and drives type‑safe consumption in the frontend (and future external clients).

### Endpoints

| Purpose                                   | URL                                     |
| ----------------------------------------- | --------------------------------------- |
| REST base                                 | `/api`                                  |
| Swagger UI                                | `/api/docs`                             |
| Raw JSON (same content as generated file) | `/contracts/api/generated/openapi.json` |

### Generation Flow

1. Backend boots (`backend/src/main.ts`):
   - Builds a Swagger document with `@nestjs/swagger`.
   - Serves UI at `/api/docs`.
   - Writes JSON to `contracts/api/generated/openapi.json`.
2. Run `npm run api-contract:regen` to (re)generate the spec + TypeScript types without starting the frontend build pipeline.
3. Generated types live at `contracts/api/generated/types.ts` and are imported via the path alias `@contracts/api`.

### Scripts

| Script               | Description                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `api-contract:build` | Ensures generated folder & placeholder (still runs – kept for forward TypeSpec migration). |
| `api-contract:types` | Runs `openapi-typescript` against generated spec to produce `types.ts`.                    |
| `api-contract:regen` | Convenience: runs build then type generation.                                              |

### Adding Endpoint Metadata

Annotate controllers & routes with OpenAPI decorators:

```ts
@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserDto })
  findOne(@Param('id') id: string) {
    /* ... */
  }
}
```

For complex DTOs create classes with `@ApiProperty()` decorators (DTO classes give richer schema vs interfaces which are erased at runtime).

### Type Consumption Pattern

```ts
import type { paths } from '@contracts/api';

type GetRootResponse = paths['/api/']['get']['responses']['200']['content']['application/json'];
```

> NOTE: `openapi-typescript` outputs a `paths` map with rich type metadata. Prefer narrowing via helper utilities for readability.

### Regeneration in CI

Add a step before frontend build:

1. `npm run api-contract:regen`
2. (Optional) fail build if `git diff --exit-code contracts/api/generated/openapi.json` to enforce spec commit discipline.

### Future: TypeSpec Migration

When ready:

1. Add TypeSpec sources in `contracts/api/`.
2. Replace build script with `npx tsp compile contracts/api --emit @typespec/openapi3`.
3. Feed emitted OpenAPI into the same `openapi-typescript` flow (script stays unchanged).

### Troubleshooting

| Issue               | Resolution                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Spec not updating   | Restart backend or run `api-contract:regen` if relying on persisted file.                                    |
| Missing route in UI | Ensure controller is imported in `AppModule` and decorated with `@Controller` & relevant Swagger decorators. |
| Type not generated  | Confirm path alias `@contracts/api` points to generated `types.ts` and script ran successfully.              |

### Security Note

In production, consider:

- Auth gating the `/api/docs` route (e.g., API key / session auth) or disabling entirely.
- Stripping internal-only tags with a document transformer before write.
