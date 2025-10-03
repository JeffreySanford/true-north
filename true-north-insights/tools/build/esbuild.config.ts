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

import {
  build,
  BuildOptions,
  Plugin,
  Metafile,
  OnResolveArgs,
  OnLoadArgs,
  BuildResult,
  PluginBuild,
  BuildFailure,
} from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * Defines the shape of the expected environment variables, providing strong
 * typing for configuration values used throughout the build process.
 */
interface DraconianEnv {
  NODE_ENV: 'development' | 'production' | 'test';
  MAX_INITIAL_BUNDLE_SIZE_MB: number;
  MAX_LAZY_CHUNK_SIZE_KB: number;
  BUILD_PERFORMANCE_TARGET_MS: number;
  BUILD_OUTPUT_DIR: string;
  WATCH: boolean;
  DRACONIAN_MODE?: 'strict';
  // Allow for other untyped environment variables via explicit index signature
  [key: string]: string | number | boolean | undefined;
}

/**
 * Load environment variables from .env files
 * @param {string} environment - The build environment (e.g., 'production', 'development')
 * @returns {Record<string, string>} A record of environment variables.
 */
function loadEnvVariables(
  environment: 'development' | 'production' | 'test'
): DraconianEnv {
  const envPath = path.resolve(__dirname, '../../../../');
  const files = [
    `.env.${environment}.local`,
    `.env.${environment}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    environment !== 'test' && `.env.local`,
    '.env',
  ].filter(Boolean) as string[];

  const rawEnv: { [key: string]: string } = {};

  for (const file of files) {
    const filePath = path.join(envPath, file);
    if (fs.existsSync(filePath)) {
      const result = dotenv.parse(fs.readFileSync(filePath));
      // Merge, giving precedence to variables defined in earlier files
      Object.assign(rawEnv, result);
    }
  }

  // Also include process.env, with file-based variables taking precedence
  const processEnvFiltered = Object.fromEntries(
    Object.entries(process.env).filter(([, v]) => typeof v === 'string')
  ) as { [key: string]: string };

  const combinedEnv = { ...processEnvFiltered, ...rawEnv };

  // Parse and validate environment variables
  return {
    NODE_ENV: environment,
    MAX_INITIAL_BUNDLE_SIZE_MB:
      Number(combinedEnv['MAX_INITIAL_BUNDLE_SIZE_MB']) || 2,
    MAX_LAZY_CHUNK_SIZE_KB:
      Number(combinedEnv['MAX_LAZY_CHUNK_SIZE_KB']) || 500,
    BUILD_PERFORMANCE_TARGET_MS:
      Number(combinedEnv['BUILD_PERFORMANCE_TARGET_MS']) || 45000,
    BUILD_OUTPUT_DIR: combinedEnv['BUILD_OUTPUT_DIR'] || 'dist/frontend',
    WATCH: combinedEnv['WATCH'] === 'true',
    DRACONIAN_MODE:
      combinedEnv['DRACONIAN_MODE'] === 'strict' ? 'strict' : undefined,
    ...combinedEnv, // Include the rest of the raw env variables
  };
}

const env: DraconianEnv = loadEnvVariables(
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
    ? process.env.NODE_ENV
    : 'development'
);

const MAX_INITIAL_BUNDLE_SIZE_MB: number = env.MAX_INITIAL_BUNDLE_SIZE_MB;
const MAX_LAZY_CHUNK_SIZE_KB: number = env.MAX_LAZY_CHUNK_SIZE_KB;
const BUILD_PERFORMANCE_TARGET_MS: number = env.BUILD_PERFORMANCE_TARGET_MS;
const BUILD_OUTPUT_DIR: string = env.BUILD_OUTPUT_DIR;

/**
 * PRODUCTION BUILD CONFIGURATION
 * Optimized for federal contracting performance requirements
 */
export const productionConfig: BuildOptions = {
  // Entry points for traditional Angular architecture
  entryPoints: {
    main: 'src/main.ts',
    polyfills: 'src/polyfills.ts',
    styles: 'src/styles.scss',
  },

  // Output configuration
  outdir: BUILD_OUTPUT_DIR,
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
    'process.env.DRACONIAN_MODE': env.DRACONIAN_MODE
      ? `"${env.DRACONIAN_MODE}"`
      : '"strict"',
    ngDevMode: 'false',
    ngI18nClosureMode: 'false',
  },

  // Traditional Angular compatibility
  plugins: [],

  // Bundle analysis and size limits
  metafile: true,

  // FEDERAL COMPLIANCE REQUIREMENTS
  legalComments: 'eof',

  // Error handling
  logLevel: 'error',
  logLimit: 0,

  // Strict validation
  drop: env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],

  // Traditional bundling patterns
  external: [
    // Allow Angular framework externals only
    '@angular/core',
    '@angular/common',
    '@angular/platform-browser',
  ],

  // Performance budgets (federal requirements)
  write: true,
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

  // Development-specific defines
  define: {
    ...productionConfig.define,
    'process.env.NODE_ENV': '"development"',
    ngDevMode: 'true',
  },

  // Preserve debug information
  drop: [],

  // Fast compilation
  treeShaking: false,
};

/**
 * BUNDLE SIZE VALIDATION
 * Enforces federal performance requirements
 */
function validateBundleSize(metafile: Metafile): void {
  const outputs = Object.entries(metafile.outputs);
  let initialBundleSize = 0;
  let maxLazyChunkSize = 0;

  outputs.forEach(([outPath, info]) => {
    if (outPath.includes('main') || outPath.includes('polyfills')) {
      initialBundleSize += (info as { bytes: number }).bytes;
    } else if (outPath.endsWith('.js')) {
      maxLazyChunkSize = Math.max(
        maxLazyChunkSize,
        (info as { bytes: number }).bytes
      );
    }
  });

  // Convert to MB/KB
  const initialMB = initialBundleSize / (1024 * 1024);
  const lazyKB = maxLazyChunkSize / 1024;

  console.log(`📊 BUNDLE SIZE ANALYSIS:`);
  console.log(
    `   Initial Bundle: ${initialMB.toFixed(
      2
    )} MB (limit: ${MAX_INITIAL_BUNDLE_SIZE_MB}MB)`
  );
  console.log(
    `   Largest Lazy Chunk: ${lazyKB.toFixed(
      2
    )} KB (limit: ${MAX_LAZY_CHUNK_SIZE_KB}KB)`
  );

  // DRACONIAN ENFORCEMENT
  if (initialMB > MAX_INITIAL_BUNDLE_SIZE_MB) {
    throw new Error(
      `❌ DRACONIAN VIOLATION: Initial bundle (${initialMB.toFixed(
        2
      )}MB) exceeds ${MAX_INITIAL_BUNDLE_SIZE_MB}MB limit`
    );
  }

  if (lazyKB > MAX_LAZY_CHUNK_SIZE_KB) {
    throw new Error(
      `❌ DRACONIAN VIOLATION: Lazy chunk (${lazyKB.toFixed(
        2
      )}KB) exceeds ${MAX_LAZY_CHUNK_SIZE_KB}KB limit`
    );
  }

  console.log('✅ BUNDLE SIZE COMPLIANCE: All limits met');
}

/**
 * TRADITIONAL ANGULAR PLUGIN
 * Ensures compatibility with NgModule architecture
 */
export const traditionalAngularPlugin: Plugin = {
  name: 'draconian-angular',
  setup(build: PluginBuild) {
    // Validate imports for traditional patterns
    build.onLoad({ filter: /\.(ts|js)$/ }, async (args: OnLoadArgs) => {
      const contents = await fs.promises.readFile(args.path, 'utf8');

      // Check for forbidden patterns
      if (contents.includes('standalone: true')) {
        throw new Error(
          `❌ DRACONIAN VIOLATION in ${args.path}: Standalone components forbidden`
        );
      }

      if (contents.includes('inject(') && !args.path.includes('node_modules')) {
        throw new Error(
          `❌ DRACONIAN VIOLATION in ${args.path}: inject() function forbidden`
        );
      }

      return { contents, loader: 'ts' };
    });

    // Optimize Observable imports
    build.onResolve({ filter: /^rxjs/ }, (args: OnResolveArgs) => {
      // Force specific rxjs imports for better tree-shaking
      if (args.path === 'rxjs') {
        return {
          path: 'rxjs/operators',
          errors: [
            {
              text: 'DRACONIAN: Use specific rxjs imports for better performance',
            },
          ],
        };
      }
      return undefined;
    });
  },
};

/**
 * BUILD COMMAND EXECUTION
 */
export async function executeBuild(
  environment: 'development' | 'production' = 'production'
): Promise<BuildResult> {
  const baseConfig =
    environment === 'production' ? productionConfig : developmentConfig;

  console.log(`🚀 DRACONIAN BUILD STARTING (${environment.toUpperCase()})`);
  console.log(`   Target: ${baseConfig.target}`);
  console.log(`   Platform: ${baseConfig.platform}`);
  console.log(`   Format: ${baseConfig.format}`);

  const startTime = Date.now();

  const buildOptions: BuildOptions = {
    ...baseConfig,
    plugins: [...(baseConfig.plugins || []), traditionalAngularPlugin],
  };

  // Add incremental/watch properties directly for development
  const extraOptions: { incremental?: boolean; watch?: unknown } = {};
  if (environment === 'development') {
    extraOptions.incremental = true;
    if (env.WATCH) {
      extraOptions.watch = {
        onRebuild(error: BuildFailure | null, result: BuildResult | null) {
          if (error) {
            console.error('❌ DRACONIAN BUILD FAILED:', error);
          } else if (result) {
            console.log(
              '✅ DRACONIAN BUILD SUCCESS:',
              new Date().toISOString()
            );
            if (result.metafile) {
              validateBundleSize(result.metafile);
            }
          }
        },
      };
    }
  }

  const finalOptions = { ...buildOptions, ...extraOptions };

  try {
    const result = await build(finalOptions as BuildOptions);

    const duration = Date.now() - startTime;
    console.log(`✅ DRACONIAN BUILD SUCCESS: ${duration}ms`);

    if (result.metafile) {
      validateBundleSize(result.metafile);
    }

    // Performance validation
    if (
      environment === 'production' &&
      duration > BUILD_PERFORMANCE_TARGET_MS
    ) {
      console.warn(
        `⚠️  BUILD PERFORMANCE WARNING: ${duration}ms exceeds ${BUILD_PERFORMANCE_TARGET_MS}ms target`
      );
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
  build: executeBuild,
};
