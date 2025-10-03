import { createProjectGraphAsync } from '@nx/devkit';
import fg from 'fast-glob';
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

type TaskStatus = 'success' | 'failed' | 'skipped';

interface TargetResult {
  project: string;
  target: string;
  status: TaskStatus;
  timeMs: number;
  cached: boolean;
  exitCode?: number;
  startedAt?: string;
  endedAt?: string;
}

interface ProjectAggregate {
  project: string;
  lint: TaskStatus;
  test: TaskStatus;
  build: TaskStatus;
  e2e?: TaskStatus;
  overall: TaskStatus;
}

type CoreTarget = 'lint' | 'test' | 'build';
type OptionalTarget = 'e2e';
const TARGETS: readonly CoreTarget[] = ['lint', 'test', 'build'];
const OPTIONAL_TARGETS: readonly OptionalTarget[] = ['e2e'];

interface FileInventoryEntry {
  project: string;
  kind: 'lint' | 'test';
  pattern: string;
  files: string[];
}

type NxTargetConfig = {
  options?: {
    lintFilePatterns?: string[];
  };
};

async function main() {
  const startAll = Date.now();
  const runId = `run-${new Date().toISOString()}`;
  const graph = await createProjectGraphAsync();
  const results: TargetResult[] = [];
  const inventory: FileInventoryEntry[] = [];
  const nxJs = path.join(process.cwd(), 'node_modules', 'nx', 'bin', 'nx.js');
  const nodeExe = process.execPath;

  for (const project of Object.keys(graph.nodes).sort()) {
    const node = graph.nodes[project];
    const availableTargets = node.data?.targets
      ? Object.keys(node.data.targets)
      : [];
    // Collect lint file patterns if target exists and we can derive patterns.
    const nodeData = node.data as {
      targets?: { [key: string]: NxTargetConfig };
      root: string;
      sourceRoot?: string;
    };
    if (availableTargets.includes('lint')) {
      const lintTarget = nodeData.targets?.['lint'];
      const lintPatterns: string[] =
        lintTarget?.options?.lintFilePatterns ?? [];
      for (const pattern of lintPatterns) {
        const files = fg.sync(pattern, { dot: false });
        inventory.push({ project, kind: 'lint', pattern, files });
      }
    }
    // Collect test spec files if test target exists.
    if (availableTargets.includes('test')) {
      const sourceRoot = nodeData.sourceRoot || nodeData.root;
      const testPattern = `${
        sourceRoot ? sourceRoot : node.data.root
      }/**/*.spec.ts`;
      const files = fg.sync(testPattern, { dot: false });
      inventory.push({ project, kind: 'test', pattern: testPattern, files });
    }
    const targetsToRun = [
      ...TARGETS,
      ...OPTIONAL_TARGETS.filter((t) => availableTargets.includes(t)),
    ];
    for (const target of targetsToRun) {
      if (!availableTargets.includes(target)) {
        results.push({
          project,
          target,
          status: 'skipped',
          timeMs: 0,
          cached: false,
        });
        continue;
      }
      const started = Date.now();
      const startedAt = new Date().toISOString();
      const args = [nxJs, 'run', `${project}:${target}`];
      const proc = spawnSync(nodeExe, args, {
        encoding: 'utf-8',
        cwd: process.cwd(),
        timeout: 600000,
      });
      const duration = Date.now() - started;
      const endedAt = new Date().toISOString();
      const stdout = (proc.stdout || '') + (proc.stderr || '');
      const cached =
        /read the output from the cache|existing outputs match the cache/i.test(
          stdout
        );
      const success = proc.status === 0;
      results.push({
        project,
        target,
        status: success ? 'success' : 'failed',
        timeMs: duration,
        cached,
        exitCode: typeof proc.status === 'number' ? proc.status : undefined,
        startedAt,
        endedAt,
      });
      if (!success) {
        // Continue collecting other projects but note failure.
      }
    }
  }

  // Aggregate per project.
  const byProject: { [key: string]: ProjectAggregate } = {};
  for (const r of results) {
    if (!byProject[r.project]) {
      byProject[r.project] = {
        project: r.project,
        lint: 'skipped',
        test: 'skipped',
        build: 'skipped',
        e2e: 'skipped',
        overall: 'skipped',
      };
    }
    const agg = byProject[r.project];
    switch (r.target) {
      case 'lint':
        agg.lint = r.status;
        break;
      case 'test':
        agg.test = r.status;
        break;
      case 'build':
        agg.build = r.status;
        break;
      case 'e2e':
        agg.e2e = r.status;
        break;
    }
  }

  for (const agg of Object.values(byProject)) {
    const statuses = [agg.lint, agg.test, agg.build, agg.e2e ?? 'skipped'];
    agg.overall = statuses.includes('failed')
      ? 'failed'
      : statuses.includes('success')
      ? 'success'
      : 'skipped';
  }

  // Prepare console table.
  const header = ['Project', 'Lint', 'Test', 'Build', 'E2E', 'Overall'];
  const rows = [header];
  for (const agg of Object.values(byProject).sort((a, b) =>
    a.project.localeCompare(b.project)
  )) {
    rows.push([
      agg.project,
      agg.lint,
      agg.test,
      agg.build,
      agg.e2e ?? 'skipped',
      agg.overall,
    ]);
  }

  const colWidths = header.map((_, i) =>
    Math.max(...rows.map((r) => r[i].length))
  );
  const line = (r: string[]) =>
    r.map((c, i) => c.padEnd(colWidths[i])).join('  ');

  console.log('\nQuality Report (lint/test/build)');
  console.log('='.repeat(line(header).length));
  console.log(line(header));
  console.log('-'.repeat(line(header).length));
  for (let i = 1; i < rows.length; i++) console.log(line(rows[i]));

  const totalDuration = Date.now() - startAll;
  const failures = results.filter((r) => r.status === 'failed');
  console.log('\nSummary:');
  console.log(`  Projects: ${Object.keys(byProject).length}`);
  console.log(`  Tasks run: ${results.length}`);
  console.log(`  Failures: ${failures.length}`);
  console.log(`  Total time: ${totalDuration} ms`);

  // Emit JSON artifact.
  const artifact = {
    generatedAt: new Date().toISOString(),
    durationMs: totalDuration,
    runId,
    results,
    aggregates: Object.values(byProject),
    inventory,
  };
  const outDir = path.join('dist', 'quality');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'quality-report.json');
  fs.writeFileSync(outFile, JSON.stringify(artifact, null, 2));
  console.log(`\nJSON report written: ${outFile}`);

  // Optional: Print Playwright suites summary if present
  try {
    const pwPath = path.join('dist', 'quality', 'playwright-report.json');
    if (fs.existsSync(pwPath)) {
      const { size } = fs.statSync(pwPath);
      const sizeMb = size / (1024 * 1024);
      // Skip parsing very large reports to avoid long synchronous CPU work
      if (sizeMb > 8) {
        console.log(
          `\nPlaywright report detected (${sizeMb.toFixed(
            1
          )} MB) — skipping suites summary to keep run fast.`
        );
      } else {
        const parsed: unknown = JSON.parse(fs.readFileSync(pwPath, 'utf-8'));
        type Node = {
          title?: string;
          tests?: Array<{ title: string; outcome: string }>;
          suites?: Node[];
        };
        const root = parsed as Node;
        let passedCount = 0;
        const failedNames: string[] = [];
        const walk = (n: Node, prefix: string) => {
          const here = n.title
            ? prefix
              ? `${prefix} / ${n.title}`
              : n.title
            : prefix;
          if (n.tests) {
            for (const t of n.tests) {
              const name = `${here} :: ${t.title}`.trim();
              if (t.outcome === 'expected') passedCount++;
              else failedNames.push(name);
            }
          }
          if (n.suites) n.suites.forEach((s) => walk(s, here));
        };
        walk(root, '');
        console.log('\nPlaywright suites summary:');
        console.log(`  Passed: ${passedCount}`);
        console.log(`  Failed: ${failedNames.length}`);
        if (failedNames.length) {
          console.log('  Failed tests:');
          failedNames.slice(0, 20).forEach((f) => console.log(`    - ${f}`));
          if (failedNames.length > 20)
            console.log(`    ... and ${failedNames.length - 20} more`);
        }
      }
    }
  } catch (e) {
    console.warn('Unable to read Playwright JSON report:', e);
  }

  // Ensure the process terminates even if some lib leaves dangling handles
  const exitCode = failures.length > 0 ? 1 : 0;
  process.exit(exitCode);
}

main().catch((err) => {
  console.error('Quality report generation failed:', err);
  process.exit(1);
});
