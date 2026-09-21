# HomeAccounting — marketing site

The static site behind [www.homeaccounting.com](https://www.homeaccounting.com):
the pitch, the security page, and the screenshot gallery.

Built with [Astro](https://astro.build) and Tailwind, output as static files,
deployed to GitHub Pages on every push to `master`.

This repository is **only** the marketing site. The product lives in
[web](https://github.com/homeaccounting/web) (React client) and
[backend](https://github.com/homeaccounting/backend) (Haskell API).

## Development

```bash
nix develop      # Node 22, pnpm, just
just install
just run         # http://localhost:4321
just check       # build + astro check + content tests — what CI runs
just format      # Prettier
```

## Layout

```
src/pages/        index, security, screens
src/components/   Hero, CaptureMethods, SecurityStrip, HostingComparison, …
src/config.ts     shared copy and links, asserted by test/config.test.mjs
public/           screenshots and static assets
test/             content tests (Node's test runner)
```

Copy that appears in more than one place lives in `src/config.ts` rather than
being repeated in components, and the content tests assert it — so a claim can
only be changed in one place.

## Deployment

`.github/workflows/deploy.yml` builds on every push and pull request, runs the
content tests, a link check over the built output, and a Lighthouse pass, then
publishes `dist` to GitHub Pages on `master`. The custom domain is pinned by
`CNAME`.

## Contributing

- [`CONTRIBUTING.md`](CONTRIBUTING.md) — setup, translation guidance, and the
  content rules (no unverifiable claims, no real financial data in
  screenshots, no third-party trackers)
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) — reports go to
  `conduct@homeaccounting.com`
- [`CLA.md`](CLA.md) — Contributor Licence Agreement, signed once via a bot on
  your first pull request
- [Community](https://www.homeaccounting.com/community) — Discord (English) and Telegram (Ukrainian)
- [Discussions](https://github.com/orgs/homeaccounting/discussions) —
  questions and ideas

Ukrainian is the first translation target; see CONTRIBUTING.

## Security

Never report a vulnerability in a public issue — email
`security@homeaccounting.com`. The full policy is in
[backend/SECURITY.md](https://github.com/homeaccounting/backend/blob/master/SECURITY.md).

## Licence

[AGPL-3.0](LICENSE), like the rest of HomeAccounting. The name, logo, and
branded screenshots are excluded from that licence — see [NOTICE](NOTICE) and
the [trademark policy](https://github.com/homeaccounting/backend/blob/master/TRADEMARK.md).
