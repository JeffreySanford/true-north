/**
 * @fileoverview Entry point for the local ESLint plugin.
 * @author Jeffrey Sanford
 */

import noDirectAssignment from './rules/no-direct-assignment.js';
import noBarrelFiles from './rules/no-barrel-files.js';
import noDeeplyNestedRelativeImports from './rules/no-deeply-nested-relative-imports.js';
import noUnnecessaryPublicModifier from './rules/no-unnecessary-public-modifier.js';

export default {
  rules: {
    'no-direct-assignment': noDirectAssignment,
    'no-barrel-files': noBarrelFiles,
    'no-deeply-nested-relative-imports': noDeeplyNestedRelativeImports,
    'no-unnecessary-public-modifier': noUnnecessaryPublicModifier,
  },
};