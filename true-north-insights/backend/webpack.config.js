const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

/**
 * @description Immutable configuration object creation for webpack build
 * @returns {object} Webpack configuration object
 */
const createWebpackConfig = () => ({
  output: {
    path: join(__dirname, '../dist/backend'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ],
});

// Export immutable configuration using Object.freeze
Object.defineProperty(module, 'exports', {
  value: Object.freeze(createWebpackConfig()),
  writable: false,
  enumerable: true,
  configurable: false
});
