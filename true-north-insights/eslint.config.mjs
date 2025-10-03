import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    // Global ignore patterns to prevent ESLint from traversing large or generated directories.
    // node_modules is ignored by ESLint by default when using the CLI in most setups, but being explicit
    // avoids surprises with flat config + editor integrations.
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/coverage',
      '**/.angular',
      '**/.angular/**',
      '**/documentation/**/*.html',
      '**/documentation/components',
      '**/documentation/injectables',
      '**/documentation/interfaces',
      '**/documentation/modules',
      '**/documentation/miscellaneous',
      '**/documentation/graph',
    ],
  },
  {
    // TypeScript sources – enable project for type-aware rules (future ready)
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        // Use dedicated ESLint tsconfig to ensure consistent moduleResolution (bundler) & shim inclusion
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            '^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$',
            // Temporary allowance for seed JSON import from documentation; consider moving to a proper data lib.
            '^../../../../documentation/data/time-tracking-seed.json$',
          ],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      // Disallow use of Angular standalone components in this codebase
      // Matches: @Component({ ..., standalone: true, ... })
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Property[key.name="standalone"][value.value=true]',
        },
      ],
      // Disallow bootstrapApplication (standalone app bootstrap) to enforce NgModule architecture
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@angular/platform-browser'],
              importNames: ['bootstrapApplication'],
              message:
                'Use traditional NgModule bootstrap (main.ts) instead of bootstrapApplication.',
            },
          ],
        },
      ],
    },
  },
  {
    // Plain JS (build tooling, custom ESLint rules, config files) – no TS project required
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
];
