import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cloudCta } from '../src/config.ts';

test('cloudCta: cloud mode → Sign up free / signup href', () => {
  const c = cloudCta('cloud');
  assert.equal(c.label, 'Sign up free');
  assert.match(c.href, /\/app\/?$|signup/i);
});

test('cloudCta: self-host-first mode → Join the waitlist', () => {
  const c = cloudCta('self-host-first');
  assert.equal(c.label, 'Join the waitlist');
});
