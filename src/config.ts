export type LaunchMode = 'cloud' | 'self-host-first';

// Open launch decision: cloud-at-launch vs self-host-first. Flip to
// 'self-host-first' to swap the cloud CTA to a waitlist. Default: cloud-at-launch.
export const LAUNCH_MODE: LaunchMode = 'cloud';

// Stubbed until the public read-only demo is live. Allow-listed in lychee.toml.
export const DEMO_URL = 'https://demo.homeaccounting.com';

export const APP_URL = 'https://homeaccounting.com/app';
export const GITHUB = {
  org: 'https://github.com/homeaccounting',
  web: 'https://github.com/homeaccounting/web',
  backend: 'https://github.com/homeaccounting/backend',
};
// Install/usage docs. Interim home = the backend README (self-host quickstart);
// repoint here if a dedicated docs site/repo lands.
export const DOCS_URL = `${GITHUB.backend}#readme`;
export const SECURITY_MD_URL = `${GITHUB.backend}/blob/master/SECURITY.md`; // resolves once SECURITY.md is published

// GoatCounter count endpoint for the homeaccounting site (create the site before go-live).
export const GOATCOUNTER = 'https://homeaccounting.goatcounter.com/count';

// Branded social-preview card (1200x630 @2x) rendered from the logo + tagline.
export const OG_IMAGE = '/og.png';

export function cloudCta(mode: LaunchMode = LAUNCH_MODE): {
  label: string;
  href: string;
} {
  return mode === 'cloud'
    ? { label: 'Sign up free', href: APP_URL }
    : { label: 'Join the waitlist', href: '#waitlist' };
}

// On-page anchor IDs — one source of truth so sections and nav/footer agree.
export const SECTION = { capture: 'capture', hosting: 'hosting' } as const;

// Marketing security page path — one source of truth for nav/footer/strip.
export const SECURITY_PAGE_URL = '/security';

// Screenshot/flow gallery page — one source of truth for nav/footer/links.
export const SCREENS_PAGE_URL = '/screens';

// Primary nav links (rendered by Nav.astro).
export const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Features', href: `/#${SECTION.capture}` },
  { label: 'Screens', href: SCREENS_PAGE_URL },
  { label: 'Self-host vs Cloud', href: `/#${SECTION.hosting}` },
  { label: 'Security', href: SECURITY_PAGE_URL },
  { label: 'Docs', href: DOCS_URL },
  { label: 'GitHub', href: GITHUB.org },
];

// Footer columns (rendered by Footer.astro). `notes` are non-link entries;
// `muted` ones are dimmed placeholders reserved for future launch issues.
export const FOOTER: {
  heading: string;
  links: { label: string; href: string }[];
  notes: { label: string; muted: boolean }[];
}[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Self-host vs Cloud', href: `/#${SECTION.hosting}` },
      { label: 'Security', href: SECURITY_PAGE_URL },
    ],
    notes: [{ label: 'Comparisons (soon)', muted: true }],
  },
  {
    heading: 'Code',
    links: [
      { label: 'web', href: GITHUB.web },
      { label: 'backend', href: GITHUB.backend },
      { label: 'Docs', href: DOCS_URL },
    ],
    notes: [],
  },
  {
    heading: 'Community & legal',
    links: [],
    // Community lives on homeaccounting.org (future); Privacy/ToS coming soon.
    notes: [
      { label: 'Community (.org, soon)', muted: true },
      { label: 'Privacy / ToS (soon)', muted: true },
      { label: 'AGPL-3.0', muted: false },
    ],
  },
];
