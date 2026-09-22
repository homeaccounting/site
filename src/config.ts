export type LaunchMode = 'cloud' | 'self-host-first';

// Open launch decision: cloud-at-launch vs self-host-first. Flip to
// 'self-host-first' to swap the cloud CTA to a waitlist. Default: cloud-at-launch.
export const LAUNCH_MODE: LaunchMode = 'cloud';

// The public demo (tracker#71) is live: web builds its VITE_DEMO sandbox to
// GitHub Pages, so every visitor gets an isolated, seeded, in-browser copy of
// the app. Set false to pull both CTAs if it ever goes down — see demoCta().
export const DEMO_LIVE = true;
export const DEMO_URL = 'https://demo.homeaccounting.com';

export const APP_URL = 'https://homeaccounting.com/app';

// Community venues. Raw invites are referenced ONLY by the /community hub page;
// every other repo and page links to COMMUNITY_URL instead, so rotating an
// invite or dropping a platform is a one-line change here rather than an edit
// across three repositories.
//
// Division of labour: Discord for real-time help in English, Telegram for the
// Ukrainian beachhead (Telegram is where that audience already lives, and the
// capture feature is Telegram-native), GitHub Discussions for anything a
// stranger might later search for — Discord and Telegram are not indexed, so
// durable answers have to land in Discussions or the docs.
export const DISCORD_INVITE = 'https://discord.gg/2rE3ZQHgv';

// Broadcast channel (Ukrainian), with comments open under each post via its
// linked discussion group — deliberately not a standalone chat group: Discord
// already covers chat, and an empty room reads worse than a quiet feed.
export const TELEGRAM_INVITE = 'https://t.me/homeaccounting';

// Org-level Discussions (source repository: the org's .github repo), so the
// forum is not presented as belonging to one code repo.
export const DISCUSSIONS_URL =
  'https://github.com/orgs/homeaccounting/discussions';

export const COMMUNITY_URL = '/community';
export const GITHUB = {
  org: 'https://github.com/homeaccounting',
  web: 'https://github.com/homeaccounting/web',
  backend: 'https://github.com/homeaccounting/backend',
  stack: 'https://github.com/homeaccounting/docker',
};

// Where "self-host" goes. Not the backend — self-hosting is the whole system
// (edge + api + web + postgres), and `docker` is the compose stack that runs
// it. It is also exactly what homeaccounting.com runs, which is the point:
// the self-host path cannot drift from production (tracker#72).
export const SELFHOST_URL = `${GITHUB.org}/docker`;
// Install/usage docs. Interim home = the backend README (self-host quickstart);
// repoint here if a dedicated docs site/repo lands.
export const DOCS_URL = `${GITHUB.backend}#readme`;

// Governance documents (added across all three repos in tracker#67). The site
// is where a prospective contributor lands first, so it has to link them.
export const LICENSE_URL = `${GITHUB.org}/site/blob/master/LICENSE`;
export const CONTRIBUTING_URL = `${GITHUB.org}/site/blob/master/CONTRIBUTING.md`;
export const CONDUCT_URL = `${GITHUB.org}/site/blob/master/CODE_OF_CONDUCT.md`;
export const SECURITY_MD_URL = `${GITHUB.backend}/blob/master/SECURITY.md`; // resolves once SECURITY.md is published

// GoatCounter count endpoint for the homeaccounting site (create the site before go-live).
export const GOATCOUNTER = 'https://homeaccounting-site.goatcounter.com/count';

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

// Until the demo is live, the closest honest thing we have is the screens
// gallery (real captures + flow clips), so the third CTA keeps pointing
// somewhere real rather than disappearing. On /screens itself the caller drops
// the button instead — linking to the page you are already on is not a CTA.
export function demoCta(live: boolean = DEMO_LIVE): {
  label: string;
  href: string;
} {
  return live
    ? { label: 'Try the live demo →', href: DEMO_URL }
    : { label: 'See the screens →', href: SCREENS_PAGE_URL };
}

// Primary nav links (rendered by Nav.astro).
export const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Features', href: `/#${SECTION.capture}` },
  { label: 'Screens', href: SCREENS_PAGE_URL },
  { label: 'Self-host vs Cloud', href: `/#${SECTION.hosting}` },
  { label: 'Security', href: SECURITY_PAGE_URL },
  { label: 'Docs', href: DOCS_URL },
  { label: 'Community', href: COMMUNITY_URL },
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
      { label: 'Self-host stack', href: SELFHOST_URL },
      { label: 'Docs', href: DOCS_URL },
      { label: 'Contributing', href: CONTRIBUTING_URL },
    ],
    notes: [],
  },
  {
    heading: 'Community & legal',
    links: [
      { label: 'Community — Discord & Telegram', href: COMMUNITY_URL },
      { label: 'Code of Conduct', href: CONDUCT_URL },
      { label: 'AGPL-3.0 licence', href: LICENSE_URL },
    ],
    // Privacy/ToS land with the hosted tier (tracker#10).
    notes: [{ label: 'Privacy / ToS (soon)', muted: true }],
  },
];
