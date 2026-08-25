import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = (p) =>
  readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8');
const has = (p, ...needles) => {
  const h = html(p);
  for (const n of needles) assert.ok(h.includes(n), `dist/${p} missing: ${n}`);
};

test('shell: nav + footer present on landing', () => {
  has('index.html', '◆ HomeAccounting', 'Self-host vs Cloud', 'AGPL-3.0');
});
