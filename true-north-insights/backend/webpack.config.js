const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../../dist/backend'),
    filename: 'main.js',
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: process.env.NODE_ENV === 'production',
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMap: true,
    }),
  ],
};
