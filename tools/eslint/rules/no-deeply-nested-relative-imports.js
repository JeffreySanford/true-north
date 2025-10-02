/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow deeply nested relative imports.",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          maxDepth: {
            type: "integer",
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      deeplyNestedRelativeImport: "Relative imports should not be more than {{maxDepth}} levels deep.",
    },
  },
  create: function (context) {
    const maxDepth = (context.options[0] && context.options[0].maxDepth) || 2;

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (importPath.startsWith("../")) {
          const depth = (importPath.match(/..\//g) || []).length;
          if (depth > maxDepth) {
            context.report({
              node,
              messageId: "deeplyNestedRelativeImport",
              data: {
                maxDepth,
              },
            });
          }
        }
      },
    };
  },
};
