import draconian from './tools/eslint/index.js';

export default [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'draconian-angular': draconian,
    },
    rules: {
      'draconian-angular/no-direct-assignment': 'error',
      'draconian-angular/no-barrel-files': 'error',
      'draconian-angular/no-deeply-nested-relative-imports': [
        'error',
        { maxDepth: 2 },
      ],
      'draconian-angular/no-unnecessary-public-modifier': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'no-unused-vars': 'error',
      'react/prop-types': 'off',
    },
  },
];