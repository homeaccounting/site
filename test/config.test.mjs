import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cloudCta, demoCta, DISCORD_INVITE } from '../src/config.ts';

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

// tracker#20: the invite on the live site was a temporary one, due to 404 on
// 2026-10-21 and take /community, three READMEs, three CONTRIBUTING files and
// the issue-template contact links with it — everything resolves through this
// one constant. lychee cannot catch that: Discord rejects HEAD from CI
// runners, so discord.gg is excluded from the link check. The API does answer
// an unauthenticated GET, which is enough.
//
// Two temporary invites were pasted in before a permanent one, each looking
// identical to the eye. That is the case for asserting it rather than writing
// "must be never-expiring" in a comment.
test('the Discord invite never expires', async (t) => {
  const code = DISCORD_INVITE.split('/').pop();

  let res;
  try {
    res = await fetch(`https://discord.com/api/v10/invites/${code}`, {
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    // Discord being unreachable is not a defect in this repo. A revoked or
    // expiring invite is, and is handled below — the distinction is the point.
    return t.skip(`Discord API unreachable: ${err.message}`);
  }
  if (res.status === 429 || res.status >= 500)
    return t.skip(`Discord API returned ${res.status}`);

  assert.ok(
    res.ok,
    `Discord answered ${res.status} for invite ${code} — it has been revoked or never existed.`,
  );

  const invite = await res.json();
  assert.equal(
    invite.expires_at,
    null,
    `Discord invite ${code} expires at ${invite.expires_at}. Regenerate it with ` +
      '"Expire after: Never" and "Max number of uses: No limit", then update DISCORD_INVITE.',
  );
});
