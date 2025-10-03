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
      // Disallow use of Angular standalone components in this codebase
      // Matches: @Component({ ..., standalone: true, ... })
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Property[key.name="standalone"][value.value=true]'}
      ],
      // Disallow bootstrapApplication (standalone app bootstrap) to enforce NgModule architecture
      'no-restricted-imports': [
        'error',
        {
          'patterns': [
            {
              group: ['@angular/platform-browser'],
              importNames: ['bootstrapApplication'],
              message: 'Use traditional NgModule bootstrap (main.ts) instead of bootstrapApplication.'
            }
          ]
        }
      ],
    },
  },
];
