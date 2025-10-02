import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
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
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    plugins: {
      'draconian-angular': await import('./tools/eslint-rules/index.js').then(m => m.default || m)
    },
    // DRACONIAN ANGULAR ARCHITECTURE ENFORCEMENT
    rules: {
      // CRITICAL VIOLATIONS - Build fails on these
      'draconian-angular/enforce-ngmodule-architecture': 'error',
      'draconian-angular/enforce-observable-patterns': 'error', 
      'draconian-angular/enforce-constructor-injection': 'error',
      'draconian-angular/enforce-type-safety': 'error',
      
      // ULTRA-DRACONIAN TIER 1 RULES (MAXIMUM ENFORCEMENT)
      'draconian-angular/enforce-immutable-patterns': 'error',
      'draconian-angular/enforce-federal-naming': 'error',
      'draconian-angular/ban-modern-js-features': 'error',
      'draconian-angular/enforce-comprehensive-documentation': 'error',
      
      // DRACONIAN WARNING-LEVEL RULES (Still enforced, but won't block commits)
      'draconian-angular/enforce-rxjs-patterns': 'warn',
      'draconian-angular/enforce-traditional-imports': 'warn',
      'draconian-angular/enforce-onpush-change-detection': 'warn',
      'draconian-angular/enforce-destroy-pattern': 'warn',

      // Core TypeScript patterns for traditional architecture
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      
      // Disable problematic rules that conflict with traditional patterns
      '@nx/enforce-module-boundaries': 'warn'
    },
  },
];
