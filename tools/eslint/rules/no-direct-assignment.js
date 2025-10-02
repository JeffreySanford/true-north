/**
 * @fileoverview Rule to enforce immutable update patterns by disallowing direct property assignment.
 * @author Jeffrey Sanford
 */

import {
  AST_NODE_TYPES
} from '@typescript-eslint/utils';

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct object property assignment to enforce immutable update patterns.',
      recommended: 'error',
    },
    messages: {
      noDirectAssignment: 'ULTRA-DRACONIAN VIOLATION: Direct object property assignment is FORBIDDEN. Use immutable update patterns.',
    },
    schema: [], // No options
  },

  create(context) {
    return {
      /**
       * @param {import('@typescript-eslint/types').TSESTree.AssignmentExpression} node
       */
      AssignmentExpression(node) {
        if (node.left.type === AST_NODE_TYPES.MemberExpression) {
          context.report({
            node,
            messageId: 'noDirectAssignment'
          });
        }
      },
    };
  },
};