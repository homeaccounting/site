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
  has('index.html', 'HomeAccounting', 'Self-host vs Cloud', 'AGPL-3.0');
});

test('hero: headline + two pillars + both CTAs + demo stub', () => {
  has(
    'index.html',
    'seconds', // truthful headline (no full-automation claim)
    'Almost no manual entry',
    'your data',
    'Sign up free', // cloud CTA (LAUNCH_MODE=cloud)
    'Self-host', // self-host CTA
    'demo.homeaccounting.com', // DEMO_URL stub
  );
});

test('capture: three methods, monobank + PrivatBank + Telegram keywords, anchor', () => {
  has(
    'index.html',
    'id="capture"',
    'Bank import',
    'monobank',
    'PrivatBank',
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

test('community: footer links to /community, which lists the venues', () => {
  has('index.html', 'href="/community"');
  has(
    'community/index.html',
    'discord.gg/', // Discord invite
    't.me/', // Telegram channel
    'discussions', // GitHub Discussions
    'security@homeaccounting.com', // vulnerabilities do not go in chat
  );
});

test('deploy artifacts: CNAME + sitemap present in dist', () => {
  assert.equal(html('CNAME').trim(), 'www.homeaccounting.com');
  assert.ok(existsSync(new URL('../dist/sitemap-index.xml', import.meta.url)));
});

test('security.txt: published at /.well-known, required fields, renewal not due', () => {
  const txt = html('.well-known/security.txt');
  for (const field of ['Contact:', 'Expires:', 'Policy:', 'Canonical:'])
    assert.ok(
      txt.includes(field),
      `security.txt missing RFC 9116 field: ${field}`,
    );
  assert.ok(
    txt.includes('mailto:security@homeaccounting.com'),
    'security.txt must carry the security@ contact',
  );
  // RFC 9116 invalidates the file the moment Expires passes. Fail 30 days early
  // so renewal surfaces as a red build, not as a silently dead contact.
  const expires = new Date(txt.match(/^Expires:\s*(\S+)/m)[1]);
  const days = Math.round((expires - Date.now()) / 86400000);
  assert.ok(days > 30, `security.txt Expires is ${days} days away — renew it`);
});
