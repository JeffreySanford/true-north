/**
 * @fileoverview Entry point for the local ESLint plugin.
 * @author Jeffrey Sanford
 */
'use strict';

module.exports = {
  rules: {
    'no-direct-assignment': require('./rules/no-direct-assignment'),
    'no-barrel-files': require('./rules/no-barrel-files'),
    'no-deeply-nested-relative-imports': require('./rules/no-deeply-nested-relative-imports'),
    'no-unnecessary-public-modifier': require('./rules/no-unnecessary-public-modifier'),
    'prefer-standalone-components': require('./rules/prefer-standalone-components'),
  },
};