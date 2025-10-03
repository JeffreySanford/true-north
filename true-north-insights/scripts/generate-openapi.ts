import { spawnSync } from 'node:child_process';

// Step 1: build backend (dev config is fine)
function run(cmd: string, args: string[]) {
  const res = spawnSync(cmd, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (res.status !== 0) {
    console.error(`[openapi] Command failed: ${cmd} ${args.join(' ')}`);
    process.exit(res.status ?? 1);
  }
}
run('npx', ['nx', 'build', 'backend', '--configuration=development']);

run('node', [
  '-e',
  "process.env.GENERATE_OPENAPI='1'; require('./dist/backend/main.js');",
]);

console.log('[openapi] Spec generated via compiled backend bootstrap.');
