/**
 * Lightweight wrapper around the (future) generated OpenAPI spec.
 * When TypeSpec is introduced, imports here can stay stable for the rest of the repo.
 */

// Using dynamic import so bundlers can split it if needed.
type UnknownRecord = Record<string, unknown>;
interface OpenApiDocLike {
  info?: { title?: string; version?: string; description?: string };
}

export async function loadOpenApi(): Promise<UnknownRecord> {
  // The generated file may not exist yet; we intentionally lazy import the future generated artifact first.
  const specPromise: Promise<UnknownRecord | { default: UnknownRecord }> =
    import('./generated/openapi.json');
  let spec: UnknownRecord | { default: UnknownRecord };
  try {
    spec = await specPromise;
  } catch {
    spec = (await import('./openapi.json')) as
      | UnknownRecord
      | { default: UnknownRecord };
  }
  // Normalize CommonJS/ESM interop style default export without lingering any
  const maybeDefault = spec as { default?: UnknownRecord } | UnknownRecord;
  const resolved =
    (maybeDefault as { default?: UnknownRecord }).default ?? maybeDefault;
  return resolved as UnknownRecord;
}

// Example convenience accessor (extend later for typed helpers)
export interface ApiMetadata {
  title: string;
  version: string;
  description?: string;
}

export async function getApiMetadata(): Promise<ApiMetadata | undefined> {
  const doc = (await loadOpenApi()) as OpenApiDocLike;
  const info = doc.info;
  if (!info) return undefined;
  return {
    title: info.title ?? 'Unknown',
    version: info.version ?? '0.0.0',
    description: info.description,
  };
}
