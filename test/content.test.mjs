import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = (p) =>
  readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8');
const has = (p, ...needles) => {
  const h = html(p);
  for (const n of needles) assert.ok(h.includes(n), `dist/${p} missing: ${n}`);
};

test('shell: nav + footer present on landing', () => {
  has('index.html', '◆ HomeAccounting', 'Self-host vs Cloud', 'AGPL-3.0');
});

test('hero: headline + two pillars + both CTAs + demo stub', () => {
  has(
    'index.html',
    'seconds', // truthful headline (no full-automation claim)
    'Almost no manual entry',
    'your server',
    'Sign up free', // cloud CTA (LAUNCH_MODE=cloud)
    'Self-host', // self-host CTA
    'demo.homeaccounting.com', // DEMO_URL stub
  );
});

test('capture: three methods, monobank + Telegram keywords, anchor', () => {
  has(
    'index.html',
    'id="capture"',
    'Bank import',
    'monobank',
    'Free-text prompt',
    'Telegram',
  );
});

test('hosting: both columns, routing, parity row', () => {
  has(
    'index.html',
    'id="hosting"',
    'Self-host',
    'Free cloud',
    'Free while in beta',
    'you can move between them',
  );
});

test('security strip: summary + link to /security', () => {
  has('index.html', 'encrypted at rest', 'href="/security"');
});

test('security page: pillars + disclosure + links resolve to security artifacts', () => {
  has(
    'security/index.html',
    'encrypted at rest',
    'Responsible disclosure',
    'SECURITY.md',
    'Run it yourself',
  );
});

test('deploy artifacts: CNAME + sitemap present in dist', () => {
  assert.equal(html('CNAME').trim(), 'www.homeaccounting.com');
  assert.ok(existsSync(new URL('../dist/sitemap-index.xml', import.meta.url)));
});
