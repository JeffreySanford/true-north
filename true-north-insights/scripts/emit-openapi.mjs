#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { setTimeout } from 'node:timers';

// Runs the built backend once; the backend writes openapi.json during bootstrap.
// We then terminate the process after a short grace period (enough to flush the file system write).

const child = spawn('node', ['dist/backend/main.js'], { stdio: 'inherit' });

const KILL_DELAY_MS = 1500;
setTimeout(() => {
  if (!child.killed) {
    child.kill();
    console.log(
      '[openapi:emit] Backend process terminated after emission window.'
    );
    console.log('[openapi:emit] OpenAPI emission complete.');
  }
}, KILL_DELAY_MS);

child.on('exit', (code) => {
  if (code && code !== 0) {
    console.error('[openapi:emit] backend exited with code', code);
    process.exit(code ?? 1);
  }
});
