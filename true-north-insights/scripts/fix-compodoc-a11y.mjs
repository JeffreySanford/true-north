#!/usr/bin/env node
/**
 * Post-process Compodoc generated HTML to address common accessibility & security hints:
 * 1. Ensure external links with target="_blank" include rel="noopener noreferrer".
 * 2. Add a <html lang="en"> attribute if missing.
 * 3. Add text to empty <a> elements (discernible text) via aria-label placeholder if no content.
 * 4. Optionally inject labels for orphan form controls (skipped here to avoid semantic guesswork).
 *
 * Usage:
 *   node scripts/fix-compodoc-a11y.mjs [--path dist/compodoc/frontend] [--dry-run]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
let root = 'dist/compodoc/frontend';
let dryRun = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--path' && args[i + 1]) {
    root = args[i + 1];
    i++;
  } else if (args[i] === '--dry-run') {
    dryRun = true;
  }
}

/** Recursively walk a directory */
function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      yield* walk(full);
    } else if (entry.endsWith('.html')) {
      yield full;
    }
  }
}

const report = {
  processed: 0,
  updated: 0,
  emptyAnchors: 0,
  relFixed: 0,
  langAdded: 0,
};

for (const file of walk(root)) {
  report.processed++;
  const original = readFileSync(file, 'utf8');
  let html = original;

  // Add lang attribute if missing on <html>
  if (!/<!doctype html>/i.test(html)) continue; // skip fragments
  if (!/<html[^>]*lang=/i.test(html)) {
    html = html.replace(/<html(\s|>)/i, '<html lang="en"$1');
    if (html !== original) report.langAdded++;
  }

  // Ensure rel noopener noreferrer for target _blank
  html = html.replace(
    /<a([^>]*?)target="_blank"([^>]*?)>/gi,
    (match, pre, post) => {
      if (/rel=/i.test(match)) {
        // ensure noopener
        if (!/noopener/i.test(match) || !/noreferrer/i.test(match)) {
          return match.replace(/rel="([^"]*)"/, (r, val) => {
            const parts = new Set(val.split(/\s+/).filter(Boolean));
            parts.add('noopener');
            parts.add('noreferrer');
            report.relFixed++;
            return `rel="${[...parts].join(' ')}"`;
          });
        }
        return match;
      } else {
        report.relFixed++;
        return `<a${pre}target="_blank" rel="noopener noreferrer"${post}>`;
      }
    }
  );

  // Detect empty anchors (<a>   </a>) without aria-label
  html = html.replace(/<a([^>]*?)>(\s*)<\/a>/gi, (match, attr, space) => {
    if (/aria-label=/i.test(match)) return match; // already labelled
    report.emptyAnchors++;
    return `<a${attr} aria-label="Link (no text)" data-a11y-added="true">${space}</a>`;
  });

  if (html !== original) {
    report.updated++;
    if (!dryRun) writeFileSync(file, html, 'utf8');
  }
}

console.log('[fix-compodoc-a11y] Result:', JSON.stringify(report, null, 2));
if (dryRun) console.log('[fix-compodoc-a11y] Dry run only — no files written.');
