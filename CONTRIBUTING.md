# Contributing to the HomeAccounting Site

This repository is the marketing site at www.homeaccounting.com — an Astro
static site, deployed to GitHub Pages on every push to `master`.

## Where things go

- **Wrong, unclear, or outdated copy on the site** — Issues here.
- **Translations** — Issues here. See below.
- **Bug in the product itself** —
  [web](https://github.com/homeaccounting/web/issues) for the interface,
  [backend](https://github.com/homeaccounting/backend/issues) for the API.
- **Questions and ideas** —
  [Discussions](https://github.com/homeaccounting/backend/discussions), or the
  [community chat](https://www.homeaccounting.com/community) for anything
  conversational.
- **Security vulnerabilities** — never an issue; email
  `security@homeaccounting.com`.

## Development setup

```bash
nix develop     # Node 22, pnpm, just
just install
just run        # dev server on http://localhost:4321
just check      # build + astro check + content tests — what CI runs
just format     # Prettier
```

CI additionally runs a link check over the built site and a Lighthouse pass, so
do not add a link you have not clicked, and keep images compressed.

## Translations

The beachhead is Ukraine, so Ukrainian is the first translation and the one
most worth your time. English is the source of truth: translate from it, and
when the English copy changes the translation follows.

Translate the _meaning_, not the words. The marketing copy is deliberately
plain and slightly understated — please keep that register rather than making
it more enthusiastic.

## Content rules

- **No unverifiable claims.** Every factual statement about security, privacy,
  or capability has to be true of the shipped product today. "Encrypted at
  rest" is a claim about code, not an aspiration.
- **No competitor disparagement.** Comparison pages state facts, cite the
  source, and are dated. A competitor's shortcoming may be described; their
  team may not be insulted.
- **Screenshots come from the synthetic seed dataset.** Never a real account,
  real balances, or a real contact name. An illustrative mock must be labelled
  as one.
- **No trackers beyond the existing privacy-respecting analytics.** No
  third-party scripts, no fonts loaded from someone else's CDN, no pixels.
  Adding one is a change to the privacy promise, not a build detail.

## Commits, branches, pull requests

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for
messages — `<type>[(scope)][!]: <description>` — and
`<type>/<kebab-case-description>` for branches.

Branch off `master`, keep the change focused, run `just check`, and include a
screenshot of any visual change (both themes if it touches colour). Sign the
CLA — see below.

## Contributor Licence Agreement

Before your first pull request can be merged you will be asked to sign the
[Contributor Licence Agreement](CLA.md). A bot comments on the PR with a
one-line statement to post.

Yes, this applies to copy and translations too: they are copyrightable work,
and the agreement is what lets the project relicense the whole thing later
without tracing every contributor. You keep your copyright.

## Code of Conduct

Participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). Reports
go to `conduct@homeaccounting.com`.

## Licence

Contributions are licensed under [AGPL-3.0](LICENSE). The HomeAccounting name,
logo, and branded screenshots are excluded — see [NOTICE](NOTICE) and the
[trademark policy](https://github.com/homeaccounting/backend/blob/master/TRADEMARK.md).
