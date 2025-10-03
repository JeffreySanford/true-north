// Ambient JSON module declarations for contracts/api so dynamic imports type safely.
// We keep it narrow here; generation will later supply stronger types if desired.
declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}
