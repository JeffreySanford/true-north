/**
 * DRACONIAN ESBUILD CONFIGURATION
 * 
 * High-performance build configuration with traditional Angular optimizations.
 * ESBuild provides superior performance while maintaining compatibility with
 * traditional NgModule architecture and Observable patterns.
 * 
 * @author True North Insights
 * @version 2.0.0
 * @performance Target: <45s cold builds, <5s incremental
 */

import { build, BuildOptions, Plugin, Metafile, OnResolveArgs } from 'esbuild';
import { angularEsbuildPlugin } from '@angular-devkit/build-angular/src/builders/dev-server/esbuild';

/**
 * PRODUCTION BUILD CONFIGURATION
 * Optimized for federal contracting performance requirements
 */
export const productionConfig: BuildOptions = {
  // Entry points for traditional Angular architecture
  entryPoints: {
    main: 'src/main.ts',
    polyfills: 'src/polyfills.ts',
    styles: 'src/styles.scss'
  },

  // Output configuration
  outdir: 'dist/frontend',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  
  // PERFORMANCE OPTIMIZATIONS
  bundle: true,
  minify: true,
  sourcemap: true,
  splitting: true,
  chunkNames: 'chunks/[name]-[hash]',
  assetNames: 'assets/[name]-[hash]',
  
  // DRACONIAN STANDARDS ENFORCEMENT
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.DRACONIAN_MODE': '"strict"',
    'ngDevMode': 'false',
    'ngI18nClosureMode': 'false'
  },

  // Traditional Angular compatibility
  plugins: [
    angularEsbuildPlugin({
      // Force traditional compilation
      aot: true,
      buildOptimizer: true,
      commonChunk: false,
      vendorChunk: false,
      
      // Strict type checking
      strictTemplates: true,
      strictInjectionParameters: true,
      
      // Performance optimizations
      optimization: {
        scripts: true,
        styles: true,
        fonts: true
      }
    })
  ],

  // Bundle analysis and size limits
  metafile: true,
  analyze: process.env.ANALYZE === 'true',
  
  // FEDERAL COMPLIANCE REQUIREMENTS
  legal: {
    // Include all license information
    comments: 'eof',
    target: 'esnext'
  },

  // Error handling
  logLevel: 'error',
  logLimit: 0,
  
  // Strict validation
  drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  
  // Traditional bundling patterns
  external: [
    // Allow Angular framework externals only
    '@angular/core',
    '@angular/common',
    '@angular/platform-browser'
  ],

  // Performance budgets (federal requirements)
  // Max bundle size: 2MB initial, 500KB per lazy chunk
  write: true
};

/**
 * DEVELOPMENT BUILD CONFIGURATION
 * Optimized for fast rebuilds during development
 */
export const developmentConfig: BuildOptions = {
  ...productionConfig,
  
  // Development optimizations
  minify: false,
  sourcemap: 'inline',
  
  // Fast rebuild settings
  incremental: true,
  watch: process.env.WATCH === 'true' ? {
    onRebuild(error, result) {
      if (error) {
        console.error('❌ DRACONIAN BUILD FAILED:', error);
      } else {
        console.log('✅ DRACONIAN BUILD SUCCESS:', new Date().toISOString());
        
        // Validate bundle size in development
        if (result && result.metafile) {
          validateBundleSize(result.metafile);
        }
      }
    }
  } : undefined,

  // Development-specific defines
  define: {
    ...productionConfig.define,
    'process.env.NODE_ENV': '"development"',
    'ngDevMode': 'true'
  },

  // Preserve debug information
  drop: [],
  
  // Fast compilation
  treeShaking: false
};

/**
 * BUNDLE SIZE VALIDATION
 * Enforces federal performance requirements
 */
function validateBundleSize(metafile: Metafile): void {
  const outputs = Object.entries(metafile.outputs);
  let initialBundleSize = 0;
  let maxLazyChunkSize = 0;

  outputs.forEach(([path, info]: [string, { bytes: number }]) => {
    if (path.includes('main') || path.includes('polyfills')) {
      initialBundleSize += info.bytes;
    } else if (path.endsWith('.js')) {
      maxLazyChunkSize = Math.max(maxLazyChunkSize, info.bytes);
    }
  });

  // Convert to MB/KB
  const initialMB = initialBundleSize / (1024 * 1024);
  const lazyKB = maxLazyChunkSize / 1024;

  console.log(`📊 BUNDLE SIZE ANALYSIS:`);
  console.log(`   Initial Bundle: ${initialMB.toFixed(2)} MB (limit: 2MB)`);
  console.log(`   Largest Lazy Chunk: ${lazyKB.toFixed(2)} KB (limit: 500KB)`);

  // DRACONIAN ENFORCEMENT
  if (initialMB > 2) {
    throw new Error(`❌ DRACONIAN VIOLATION: Initial bundle (${initialMB.toFixed(2)}MB) exceeds 2MB limit`);
  }
  
  if (lazyKB > 500) {
    throw new Error(`❌ DRACONIAN VIOLATION: Lazy chunk (${lazyKB.toFixed(2)}KB) exceeds 500KB limit`);
  }

  console.log('✅ BUNDLE SIZE COMPLIANCE: All limits met');
}

/**
 * TRADITIONAL ANGULAR PLUGIN
 * Ensures compatibility with NgModule architecture
 */
export const traditionalAngularPlugin = {
  name: 'draconian-angular',
  setup(build: any) {
    // Validate imports for traditional patterns
    build.onLoad({ filter: /\.(ts|js)$/ }, async (args: any) => {
      const contents = await require('fs').promises.readFile(args.path, 'utf8');
      
      // Check for forbidden patterns
      if (contents.includes('standalone: true')) {
        throw new Error(`❌ DRACONIAN VIOLATION in ${args.path}: Standalone components forbidden`);
      }
      
      if (contents.includes('inject(') && !args.path.includes('node_modules')) {
        throw new Error(`❌ DRACONIAN VIOLATION in ${args.path}: inject() function forbidden`);
      }

      return { contents, loader: 'ts' };
    });

    // Optimize Observable imports
    build.onResolve({ filter: /^rxjs/ }, (args: OnResolveArgs) => {
      // Force specific rxjs imports for better tree-shaking
      if (args.path === 'rxjs') {
        return { 
          path: 'rxjs/operators', 
          warning: 'DRACONIAN: Use specific rxjs imports for better performance'
        };
      }
      return undefined;
    });
  }
};

/**
 * BUILD COMMAND EXECUTION
 */
export async function executeBuild(environment: 'development' | 'production' = 'production'): Promise<unknown> {
  const config = environment === 'production' ? productionConfig : developmentConfig;
  
  console.log(`🚀 DRACONIAN BUILD STARTING (${environment.toUpperCase()})`);
  console.log(`   Target: ${config.target}`);
  console.log(`   Platform: ${config.platform}`);
  console.log(`   Format: ${config.format}`);
  
  const startTime = Date.now();
  
  try {
    const result = await build({
      ...config,
      plugins: [
        ...config.plugins || [],
        traditionalAngularPlugin
      ]
    });
    
    const duration = Date.now() - startTime;
    console.log(`✅ DRACONIAN BUILD SUCCESS: ${duration}ms`);
    
    if (result.metafile) {
      validateBundleSize(result.metafile);
    }
    
    // Performance validation
    if (environment === 'production' && duration > 45000) {
      console.warn(`⚠️  BUILD PERFORMANCE WARNING: ${duration}ms exceeds 45s target`);
    }
    
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ DRACONIAN BUILD FAILED: ${duration}ms`);
    console.error(error);
    throw error;
  }
}

// Export configurations
export default {
  production: productionConfig,
  development: developmentConfig,
  plugin: traditionalAngularPlugin,
  build: executeBuild
};