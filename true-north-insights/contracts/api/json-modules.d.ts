// Ambient JSON module declarations for contracts/api so dynamic imports type safely.
// We keep it narrow here; generation will later supply stronger types if desired.
declare module '*.json' {
  // Define a safe JSON value type instead of using Record utility
  type JsonValue =
    | string
    | number
    | boolean
    | null
    | { [key: string]: JsonValue }
    | JsonValue[];
  const value: JsonValue;
  export default value;
}
