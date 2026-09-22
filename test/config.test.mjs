import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cloudCta, demoCta } from '../src/config.ts';

test('cloudCta: cloud mode → Sign up free / signup href', () => {
  const c = cloudCta('cloud');
  assert.equal(c.label, 'Sign up free');
  assert.match(c.href, /\/app\/?$|signup/i);
});

test('cloudCta: self-host-first mode → Join the waitlist', () => {
  const c = cloudCta('self-host-first');
  assert.equal(c.label, 'Join the waitlist');
});

test('demoCta: demo live → the demo itself', () => {
  const d = demoCta(true);
  assert.equal(d.label, 'Try the live demo →');
  assert.match(d.href, /^https:\/\/demo\./);
});

test('demoCta: demo not live → the screens gallery, never a dead host', () => {
  const d = demoCta(false);
  assert.equal(d.href, '/screens');
  assert.doesNotMatch(d.label, /demo/i);
});
