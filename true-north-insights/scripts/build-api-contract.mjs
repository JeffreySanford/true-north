#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Placeholder build script until TypeSpec is adopted.
// Creates generated/openapi.json if not present and exits with success.

const root = process.cwd();
const contractsDir = resolve(root, 'contracts', 'api');
const outDir = resolve(contractsDir, 'generated');
const outFile = resolve(outDir, 'openapi.json');

mkdirSync(outDir, { recursive: true });

if (!existsSync(outFile)) {
  writeFileSync(outFile, JSON.stringify({
    openapi: '3.0.3',
    info: {
      title: 'True North API (Placeholder Generated)',
      version: '0.0.0',
      description: 'Generated placeholder file – replace by running TypeSpec compiler later.'
    },
    paths: {},
    components: {}
  }, null, 2));
  console.log('[api-contract] created generated/openapi.json placeholder');
} else {
  console.log('[api-contract] existing generated/openapi.json retained');
}

console.log('[api-contract] TypeSpec postponed – no compilation performed.');
