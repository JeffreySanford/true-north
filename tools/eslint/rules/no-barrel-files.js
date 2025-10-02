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
    type: "problem",
    docs: {
      description: "Disallow barrel files.",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      barrelFile: "Do not use barrel files. Instead, import directly from the module.",
    },
  },
  create: function (context) {
    return {
      Program(node) {
        const exports = node.body.filter(
          (n) =>
            n.type === "ExportNamedDeclaration" ||
            n.type === "ExportAllDeclaration"
        );
        const imports = node.body.filter((n) => n.type === "ImportDeclaration");

        if (exports.length > 0 && imports.length === 0) {
          // This is likely a file that only exports, which is fine.
          return;
        }

        const reExports = exports.filter(
          (n) => n.source !== null || (n.specifiers && n.specifiers.length > 0)
        );

        if (reExports.length > 0 && reExports.length === exports.length) {
          context.report({
            node: node,
            messageId: "barrelFile",
          });
        }
      },
    };
  },
};
