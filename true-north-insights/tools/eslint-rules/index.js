/**
 * DRACONIAN ANGULAR ESLINT PLUGIN
 * 
 * Registers custom ESLint rules for traditional Angular architecture enforcement.
 * This plugin ensures zero tolerance for modern anti-patterns and strict adherence
 * to NgModule-based, Observable-driven development patterns.
 * 
 * @author True North Insights
 * @version 2.0.0
 */

const draconianRules = require('./draconian-angular-rules');

const exportConfig = {
  rules: draconianRules,
  configs: {
    // Recommended configuration for all Angular projects
    recommended: {
      plugins: ['draconian-angular'],
      rules: {
        // CRITICAL VIOLATIONS - Build fails on these
        'draconian-angular/enforce-ngmodule-architecture': 'error',
        'draconian-angular/enforce-observable-patterns': 'error', 
        'draconian-angular/enforce-constructor-injection': 'error',
        'draconian-angular/enforce-type-safety': 'error',
        
        // WARNINGS - Must be addressed but don't fail build
        'draconian-angular/enforce-rxjs-patterns': 'warn',
        'draconian-angular/enforce-traditional-imports': 'warn',
        'draconian-angular/enforce-onpush-change-detection': 'warn',
        'draconian-angular/enforce-destroy-pattern': 'warn'
      }
    },
    
    // Strict configuration for federal contracting projects
    strict: {
      plugins: ['draconian-angular'],
      rules: {
        // ALL VIOLATIONS ARE ERRORS - Zero tolerance
        'draconian-angular/enforce-ngmodule-architecture': 'error',
        'draconian-angular/enforce-observable-patterns': 'error',
        'draconian-angular/enforce-constructor-injection': 'error',
        'draconian-angular/enforce-type-safety': 'error',
        'draconian-angular/enforce-rxjs-patterns': 'error',
        'draconian-angular/enforce-traditional-imports': 'error',
        'draconian-angular/enforce-onpush-change-detection': 'error',
        'draconian-angular/enforce-destroy-pattern': 'error'
      }
    }
  }
};

Object.defineProperty(module, 'exports', {
  value: Object.freeze(exportConfig),
  writable: false,
  enumerable: true,
  configurable: false
});