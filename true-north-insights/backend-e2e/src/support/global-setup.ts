import { waitForPortOpen } from '@nx/node/utils';
import { spawn } from 'child_process';
import { join } from 'path';

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  const host = process.env['HOST'] ?? 'localhost';
  const port = process.env['PORT'] ? Number(process.env['PORT']) : 3000;
  // Start backend server from built output
  const entry = join(process.cwd(), 'dist', 'backend', 'main.js');
  const child = spawn(process.execPath, [entry], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'test' },
  });
  (globalThis as any).__BACKEND_PID__ = child.pid;
  await waitForPortOpen(port, { host });

  // Hint: Use `globalThis` to pass variables to global teardown.
  (globalThis as any).__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
