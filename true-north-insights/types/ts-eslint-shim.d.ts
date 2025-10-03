// Shim to help the editor resolve '@typescript-eslint/utils/ts-eslint'
// while using moduleResolution: bundler. The actual types live under dist/.
// This avoids spurious 2307 diagnostics in VS Code when inspecting node_modules declarations.

declare module '@typescript-eslint/utils/ts-eslint' {
  export * from '@typescript-eslint/utils/dist/ts-eslint';
}
