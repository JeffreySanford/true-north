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

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow unnecessary 'public' modifiers in class members.",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      unnecessaryPublicModifier: "The 'public' modifier is unnecessary and can be removed.",
    },
  },
  create: function (context) {
    return {
      MethodDefinition(node) {
        if (node.accessibility === "public") {
          context.report({
            node,
            messageId: "unnecessaryPublicModifier",
            fix: function (fixer) {
              const sourceCode = context.getSourceCode();
              const publicKeyword = sourceCode.getFirstToken(node, {
                filter: (token) => token.value === "public",
              });
              if (publicKeyword) {
                return fixer.remove(publicKeyword);
              }
            },
          });
        }
      },
      PropertyDefinition(node) {
        if (node.accessibility === "public") {
          context.report({
            node,
            messageId: "unnecessaryPublicModifier",
            fix: function (fixer) {
              const sourceCode = context.getSourceCode();
              const publicKeyword = sourceCode.getFirstToken(node, {
                filter: (token) => token.value === "public",
              });
              if (publicKeyword) {
                return fixer.remove(publicKeyword);
              }
            },
          });
        }
      },
    };
  },
};
