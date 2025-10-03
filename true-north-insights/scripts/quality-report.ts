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
}

interface ProjectAggregate {
  project: string;
  lint: TaskStatus;
  test: TaskStatus;
  build: TaskStatus;
  overall: TaskStatus;
}

const TARGETS = ['lint', 'test', 'build'] as const;

interface FileInventoryEntry {
  project: string;
  kind: 'lint' | 'test';
  pattern: string;
  files: string[];
}

async function main() {
  const startAll = Date.now();
  const graph = await createProjectGraphAsync();
  const results: TargetResult[] = [];
  const inventory: FileInventoryEntry[] = [];

  for (const project of Object.keys(graph.nodes).sort()) {
    const node = graph.nodes[project];
    const availableTargets = node.data?.targets
      ? Object.keys(node.data.targets)
      : [];
    // Collect lint file patterns if target exists and we can derive patterns.
    if (availableTargets.includes('lint')) {
      const lintTarget = node.data!.targets!['lint'];
      const lintPatterns: string[] =
        (lintTarget?.options as any)?.lintFilePatterns || [];
      for (const pattern of lintPatterns) {
        const files = fg.sync(pattern, { dot: false });
        inventory.push({ project, kind: 'lint', pattern, files });
      }
    }
    // Collect test spec files if test target exists.
    if (availableTargets.includes('test')) {
      const sourceRoot = (node.data as any).sourceRoot || node.data.root;
      const testPattern = `${
        sourceRoot ? sourceRoot : node.data.root
      }/**/*.spec.ts`;
      const files = fg.sync(testPattern, { dot: false });
      inventory.push({ project, kind: 'test', pattern: testPattern, files });
    }
    for (const target of TARGETS) {
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
      const proc = spawnSync('npx', ['nx', 'run', `${project}:${target}`], {
        encoding: 'utf-8',
      });
      const duration = Date.now() - started;
      const stdout = (proc.stdout || '') + (proc.stderr || '');
      const cached = /read the output from the cache/i.test(stdout);
      const success = proc.status === 0;
      results.push({
        project,
        target,
        status: success ? 'success' : 'failed',
        timeMs: duration,
        cached,
        exitCode: proc.status ?? undefined,
      });
      if (!success) {
        // Continue collecting other projects but note failure.
      }
    }
  }

  // Aggregate per project.
  const byProject: Record<string, ProjectAggregate> = {};
  for (const r of results) {
    if (!byProject[r.project]) {
      byProject[r.project] = {
        project: r.project,
        lint: 'skipped',
        test: 'skipped',
        build: 'skipped',
        overall: 'skipped',
      };
    }
    (byProject[r.project] as any)[r.target] = r.status;
  }

  for (const agg of Object.values(byProject)) {
    const statuses = [agg.lint, agg.test, agg.build];
    agg.overall = statuses.includes('failed')
      ? 'failed'
      : statuses.includes('success')
      ? 'success'
      : 'skipped';
  }

  // Prepare console table.
  const header = ['Project', 'Lint', 'Test', 'Build', 'Overall'];
  const rows = [header];
  for (const agg of Object.values(byProject).sort((a, b) =>
    a.project.localeCompare(b.project)
  )) {
    rows.push([agg.project, agg.lint, agg.test, agg.build, agg.overall]);
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
    results,
    aggregates: Object.values(byProject),
    inventory,
  };
  const outDir = path.join('dist', 'quality');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'quality-report.json');
  fs.writeFileSync(outFile, JSON.stringify(artifact, null, 2));
  console.log(`\nJSON report written: ${outFile}`);

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Quality report generation failed:', err);
  process.exit(1);
});
