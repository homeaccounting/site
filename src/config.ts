export type LaunchMode = 'cloud' | 'self-host-first';

// The one open launch decision (launch-plan §11). Flip to 'self-host-first'
// to swap the cloud CTA to a waitlist. Default: cloud-at-launch.
export const LAUNCH_MODE: LaunchMode = 'cloud';

// Stubbed until tracker#13 (public read-only demo) lands. Allow-listed in lychee.toml.
export const DEMO_URL = 'https://demo.homeaccounting.com';

export const APP_URL = 'https://homeaccounting.com/app';
export const GITHUB = {
  web: 'https://github.com/homeaccounting/web',
  backend: 'https://github.com/homeaccounting/backend',
  docker: 'https://github.com/homeaccounting/docker',
};
// Docs live in the README/docs of the code repos (tracker#18).
export const DOCS_URL = `${GITHUB.backend}#readme`;
export const SECURITY_MD_URL = `${GITHUB.backend}/blob/master/SECURITY.md`; // resolves when #2 lands

// GoatCounter analytics site code (create the site before go-live).
export const GOATCOUNTER = 'https://homeaccounting.goatcounter.com/count';

export function cloudCta(mode: LaunchMode = LAUNCH_MODE): {
  label: string;
  href: string;
} {
  return mode === 'cloud'
    ? { label: 'Sign up free', href: APP_URL }
    : { label: 'Join the waitlist', href: '#waitlist' };
}
