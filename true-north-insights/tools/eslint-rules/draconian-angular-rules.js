/**
 * DRACONIAN ANGULAR ESLINT RULES
 * 
 * Enforces traditional Angular architecture with zero tolerance for modern anti-patterns.
 * These rules ensure strict adherence to NgModule-based architecture, Observable patterns,
 * and traditional dependency injection.
 * 
 * @author True North Insights
 * @version 2.0.0
 * @license Proprietary - Federal Contracting Standards
 */

const draconianAngularRules = {
  /**
   * RULE: enforce-ngmodule-architecture
   * Bans standalone components and enforces traditional NgModule patterns
   */
  'enforce-ngmodule-architecture': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Enforces NgModule architecture, bans standalone components',
        category: 'Traditional Architecture',
        recommended: true
      },
      fixable: null,
      schema: []
    },
    create(context) {
      return {
        Decorator(node) {
          if (node.expression.callee && node.expression.callee.name === 'Component') {
            const argumentsArray = node.expression.arguments && node.expression.arguments[0];
            const propertiesArray = argumentsArray && argumentsArray.properties;
            const standaloneProperty = propertiesArray && propertiesArray.find(
              prop => prop.key && prop.key.name === 'standalone'
            );
            
            if (standaloneProperty && standaloneProperty.value.value === true) {
              context.report({
                node,
                message: 'DRACONIAN VIOLATION: Standalone components are FORBIDDEN. Use traditional NgModule architecture only.'
              });
            }
          }
        }
      };
    }
  },

  /**
   * RULE: enforce-observable-patterns
   * Requires Observable return types and forbids async/await in services
   */
  'enforce-observable-patterns': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Enforces Observable patterns, forbids async/await in services',
        category: 'Observable Architecture',
        recommended: true
      },
      fixable: null,
      schema: []
    },
    create(context) {
      return {
        MethodDefinition(node) {
          // Check if this is in a service file
          const filename = context.getFilename();
          if (filename.includes('.service.ts')) {
            
            // Check for async methods
            if (node.value.async) {
              context.report({
                node,
                message: 'DRACONIAN VIOLATION: async/await is FORBIDDEN in services. Use Observable patterns only.'
              });
            }

            // Check for Promise return types
            if (node.value.returnType && 
                node.value.returnType.typeAnnotation && 
                node.value.returnType.typeAnnotation.typeName &&
                node.value.returnType.typeAnnotation.typeName.name === 'Promise') {
              context.report({
                node,
                message: 'DRACONIAN VIOLATION: Promise return types are FORBIDDEN in services. Use Observable&lt;T&gt; only.'
              });
            }
          }
        }
      };
    }
  },

  /**
   * RULE: enforce-constructor-injection
   * Requires constructor-based dependency injection, forbids inject() function
   */
  'enforce-constructor-injection': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Enforces constructor-based DI, forbids inject() function',
        category: 'Traditional DI',
        recommended: true
      },
      fixable: null,
      schema: []
    },
    create(context) {
      return {
        CallExpression(node) {
          if (node.callee && node.callee.name === 'inject') {
            context.report({
              node,
              message: 'DRACONIAN VIOLATION: inject() function is FORBIDDEN. Use constructor-based dependency injection only.'
            });
          }
        }
      };
    }
  },

  /**
   * RULE: enforce-rxjs-patterns
   * Requires proper RxJS patterns with shareReplay(1) and takeUntil
   */
  'enforce-rxjs-patterns': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Enforces proper RxJS patterns with shareReplay and takeUntil',
        category: 'RxJS Architecture',
        recommended: true
      },
      fixable: null,
      schema: []
    },
    create(context) {
      return {
        CallExpression(node) {
          // Check for HTTP calls without proper operators
          if (node.callee && 
              node.callee.type === 'MemberExpression' &&
              node.callee.property &&
              ['get', 'post', 'put', 'delete', 'patch'].includes(node.callee.property.name)) {
            
            // Look for parent pipe() call
            let parent = node.parent;
            let hasPipe = false;
            let hasShareReplay = false;
            let hasTakeUntil = false;

            while (parent) {
              if (parent.type === 'CallExpression' && 
                  parent.callee && 
                  parent.callee.property && 
                  parent.callee.property.name === 'pipe') {
                hasPipe = true;
                
                // Check pipe arguments for shareReplay and takeUntil
                parent.arguments.forEach(arg => {
                  if (arg.type === 'CallExpression' && arg.callee) {
                    if (arg.callee.name === 'shareReplay') hasShareReplay = true;
                    if (arg.callee.name === 'takeUntil') hasTakeUntil = true;
                  }
                });
                break;
              }
              parent = parent.parent;
            }

            if (hasPipe && !hasShareReplay) {
              context.report({
                node,
                message: 'DRACONIAN RECOMMENDATION: Observable should use shareReplay(1) for hot observable patterns.'
              });
            }

            if (hasPipe && !hasTakeUntil) {
              context.report({
                node,
                message: 'DRACONIAN RECOMMENDATION: Observable should use takeUntil(destroy$) for memory management.'
              });
            }
          }
        }
      };
    }
  },

  /**
   * RULE: enforce-traditional-imports
   * Forbids barrel exports and enforces explicit imports
   */
  'enforce-traditional-imports': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Forbids barrel exports, enforces explicit imports',
        category: 'Traditional Imports',
        recommended: true
      },
      fixable: null,
      schema: []
    },
    create(context) {
      return {
        ImportDeclaration(node) {
          const source = node.source.value;
          
          // Check for barrel imports (index files)
          if (source.endsWith('/index') || source.endsWith('/')) {
            context.report({
              node,
              message: 'DRACONIAN VIOLATION: Barrel imports are FORBIDDEN. Use explicit file imports only.'
            });
          }

          // Check for excessive wildcard imports
          const hasNamespaceImport = node.specifiers.some(spec => 
            spec.type === 'ImportNamespaceSpecifier'
          );
          
          if (hasNamespaceImport && !source.includes('rxjs') && !source.includes('@angular')) {
            context.report({
              node,
              message: 'DRACONIAN WARNING: Wildcard imports should be limited to rxjs and @angular packages.'
            });
          }
        }
      };
    }
  },

  /**
   * RULE: enforce-type-safety
   * Forbids 'any' types and enforces strict typing
   */
  'enforce-type-safety': {
    meta: {
      type: 'error',
      docs: {
        description: 'Forbids any types, enforces strict typing',
        category: 'Type Safety',
        recommended: true
      },
      fixable: null,
      schema: []
    },
    create(context) {
      return {
        TSAnyKeyword(node) {
          context.report({
            node,
            message: 'DRACONIAN VIOLATION: The "any" type is STRICTLY FORBIDDEN. Define explicit types.'
          });
        },
        
        TSTypeReference(node) {
          if (node.typeName && node.typeName.name === 'any') {
            context.report({
              node,
              message: 'DRACONIAN VIOLATION: The "any" type is STRICTLY FORBIDDEN. Define explicit types.'
            });
          }
        }
      };
    }
  },

  /**
   * RULE: enforce-onpush-change-detection
   * Requires OnPush change detection strategy for all components
   */
  'enforce-onpush-change-detection': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Requires OnPush change detection for performance',
        category: 'Performance',
        recommended: true
      },
      fixable: null,
      schema: []
    },
    create(context) {
      return {
        Decorator(node) {
          if (node.expression.callee && node.expression.callee.name === 'Component') {
            const argumentsArray = node.expression.arguments && node.expression.arguments[0];
            const propertiesArray = argumentsArray && argumentsArray.properties;
            const changeDetectionProperty = propertiesArray && propertiesArray.find(
              prop => prop.key && prop.key.name === 'changeDetection'
            );
            
            if (!changeDetectionProperty) {
              context.report({
                node,
                message: 'DRACONIAN REQUIREMENT: Components must specify changeDetection: ChangeDetectionStrategy.OnPush for performance.'
              });
            }
          }
        }
      };
    }
  },

  /**
   * RULE: enforce-destroy-pattern
   * Requires proper destroy$ pattern in all services and components
   */
  'enforce-destroy-pattern': {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Requires destroy$ pattern for memory management',
        category: 'Memory Management',
        recommended: true
      },
      fixable: null,
      schema: []
    },
    create(context) {
      return {
        ClassDeclaration(node) {
          const filename = context.getFilename();
          
          if (filename.includes('.service.ts') || filename.includes('.component.ts')) {
            let hasDestroySubject = false;
            let hasOnDestroyInterface = false;
            
            // Check for destroy$ property
            node.body.body.forEach(member => {
              if (member.type === 'PropertyDefinition' && 
                  member.key && 
                  member.key.name && 
                  member.key.name.includes('destroy')) {
                hasDestroySubject = true;
              }
            });
            
            // Check for OnDestroy implementation
            if (node.superClass || (node.implements && node.implements.length > 0)) {
              const nodeInterfaces = node.implements || [];
              hasOnDestroyInterface = nodeInterfaces.some(impl =>
                impl.expression && impl.expression.name === 'OnDestroy'
              );
            }
            
            if (!hasDestroySubject) {
              context.report({
                node,
                message: 'DRACONIAN REQUIREMENT: Services and Components must implement destroy$ pattern for memory management.'
              });
            }
            
            if (!hasOnDestroyInterface && filename.includes('.component.ts')) {
              context.report({
                node,
                message: 'DRACONIAN REQUIREMENT: Components must implement OnDestroy interface.'
              });
            }
          }
        }
      };
    }
  },

  /**
   * ULTRA-DRACONIAN RULE: enforce-immutable-patterns
   * Enforces immutable data patterns and bans mutating operations
   */
  'enforce-immutable-patterns': {
    meta: {
      type: 'problem',
      docs: {
        description: 'ULTRA-DRACONIAN: Enforce immutable data patterns',
        category: 'Federal Compliance - Data Integrity'
      },
      messages: {
        mutatingArray: 'ULTRA-DRACONIAN VIOLATION: Mutating array methods ({{method}}) are FORBIDDEN. Use immutable patterns with operators like map(), filter(), or spread syntax',
        directAssignment: 'ULTRA-DRACONIAN VIOLATION: Direct object property assignment is FORBIDDEN. Use immutable update patterns'
      }
    },
    create(context) {
      return {
        CallExpression(node) {
          const mutatingMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
          if (node.callee && node.callee.property && mutatingMethods.includes(node.callee.property.name)) {
            context.report({
              node,
              messageId: 'mutatingArray',
              data: { method: node.callee.property.name }
            });
          }
        },
        AssignmentExpression(node) {
          if (node.left.type === 'MemberExpression' && node.left.object.type !== 'ThisExpression') {
            context.report({
              node,
              messageId: 'directAssignment'
            });
          }
        }
      };
    }
  },

  /**
   * ULTRA-DRACONIAN RULE: enforce-federal-naming
   * Enforces federal government naming conventions
   */
  'enforce-federal-naming': {
    meta: {
      type: 'problem',
      docs: {
        description: 'ULTRA-DRACONIAN: Enforce federal naming conventions',
        category: 'Federal Compliance - Naming Standards'
      },
      messages: {
        invalidComponentName: 'ULTRA-DRACONIAN VIOLATION: Component names must follow federal naming: PascalCase with descriptive suffix',
        invalidServiceName: 'ULTRA-DRACONIAN VIOLATION: Service names must end with "Service" and use PascalCase',
        tooShortName: 'ULTRA-DRACONIAN VIOLATION: Variable name "{{name}}" is too short. Federal standards require minimum 4 characters'
      }
    },
    create(context) {
      return {
        ClassDeclaration(node) {
          if (!node.id || !node.id.name) return;
          
          const className = node.id.name;
          if (className.includes('Component') && !/^[A-Z][a-zA-Z]*Component$/.test(className)) {
            context.report({
              node,
              messageId: 'invalidComponentName'
            });
          }
          if (className.includes('Service') && !/^[A-Z][a-zA-Z]*Service$/.test(className)) {
            context.report({
              node,
              messageId: 'invalidServiceName'
            });
          }
        },
        VariableDeclarator(node) {
          if (node.id && node.id.name && node.id.name.length < 4 && !['i', 'j', 'k'].includes(node.id.name)) {
            context.report({
              node,
              messageId: 'tooShortName',
              data: { name: node.id.name }
            });
          }
        }
      };
    }
  },

  /**
   * ULTRA-DRACONIAN RULE: ban-modern-js-features
   * Bans modern JavaScript features for federal compatibility
   */
  'ban-modern-js-features': {
    meta: {
      type: 'problem',
      docs: {
        description: 'ULTRA-DRACONIAN: Ban modern JavaScript features for federal compatibility',
        category: 'Federal Compliance - Legacy Compatibility'
      },
      messages: {
        noOptionalChaining: 'ULTRA-DRACONIAN VIOLATION: Optional chaining (?.) is FORBIDDEN. Use explicit null checks',
        noNullishCoalescing: 'ULTRA-DRACONIAN VIOLATION: Nullish coalescing (??) is FORBIDDEN. Use explicit || operators',
        noPrivateFields: 'ULTRA-DRACONIAN VIOLATION: Private fields (#) are FORBIDDEN. Use traditional private conventions'
      }
    },
    create(context) {
      return {
        ChainExpression(node) {
          context.report({
            node,
            messageId: 'noOptionalChaining'
          });
        },
        LogicalExpression(node) {
          if (node.operator === '??') {
            context.report({
              node,
              messageId: 'noNullishCoalescing'
            });
          }
        },
        PropertyDefinition(node) {
          if (node.key && node.key.type === 'PrivateIdentifier') {
            context.report({
              node,
              messageId: 'noPrivateFields'
            });
          }
        }
      };
    }
  },

  /**
   * ULTRA-DRACONIAN RULE: enforce-comprehensive-documentation
   * Enforces comprehensive JSDoc documentation
   */
  'enforce-comprehensive-documentation': {
    meta: {
      type: 'problem',
      docs: {
        description: 'ULTRA-DRACONIAN: Enforce comprehensive JSDoc documentation',
        category: 'Federal Compliance - Documentation Standards'
      },
      messages: {
        missingClassDoc: 'ULTRA-DRACONIAN VIOLATION: All classes must have comprehensive JSDoc with @description, @author, and @since tags',
        missingMethodDoc: 'ULTRA-DRACONIAN VIOLATION: All public methods must have JSDoc with @param and @returns documentation'
      }
    },
    create(context) {
      return {
        ClassDeclaration(node) {
          const sourceCode = context.getSourceCode();
          let comments = sourceCode.getCommentsBefore(node);
          
          // If no comments before class, check before decorators
          if (!comments.length && node.parent && node.parent.type === 'ExportNamedDeclaration' && node.parent.declaration === node) {
            comments = sourceCode.getCommentsBefore(node.parent);
          }
          
          // Also check for decorators and get comments before them
          if (!comments.length) {
            const tokens = sourceCode.getTokensBefore(node, { includeComments: true });
            const decoratorStart = tokens.findIndex(token => token.value === '@');
            if (decoratorStart !== -1) {
              const commentsBeforeDecorator = tokens.slice(0, decoratorStart).filter(token => token.type === 'Block' || token.type === 'Line');
              if (commentsBeforeDecorator.length > 0) {
                comments = commentsBeforeDecorator;
              }
            }
          }
          
          if (!comments.some(comment => comment.value.includes('@description'))) {
            context.report({
              node,
              messageId: 'missingClassDoc'
            });
          }
        },
        MethodDefinition(node) {
          if (node.accessibility !== 'private') {
            const comments = context.getSourceCode().getCommentsBefore(node);
            if (!comments.some(comment => comment.value.includes('@param') || comment.value.includes('@returns'))) {
              context.report({
                node,
                messageId: 'missingMethodDoc'
              });
            }
          }
        }
      };
    }
  }
};

// Immutable export pattern for federal compliance
Object.defineProperty(module, 'exports', {
  value: draconianAngularRules,
  writable: false,
  configurable: false
});