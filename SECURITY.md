# Security Policy

This repository holds the HomeAccounting **marketing site**
(`www.homeaccounting.com`) — a static Astro build with no accounts, no database
and no user data. Vulnerabilities in the product itself belong in
[`backend`](https://github.com/homeaccounting/backend) or
[`web`](https://github.com/homeaccounting/web); the canonical policy for all
three repositories is
[backend/SECURITY.md](https://github.com/homeaccounting/backend/blob/master/SECURITY.md).

## Reporting a vulnerability

**Please do not open a public issue for security problems.**

Report privately via either:

- **GitHub Private Vulnerability Reporting** — the **“Report a vulnerability”**
  button under this repository’s **Security** tab (preferred).
- **Email** — `security@homeaccounting.com`.

Machine-readable contact:
[`/.well-known/security.txt`](https://www.homeaccounting.com/.well-known/security.txt)
(RFC 9116).

Please include the affected page or asset, steps to reproduce, and the impact.

## What to expect

As in the product policy: **acknowledgement within 3 business days**, an initial
assessment within **7 business days**, and **coordinated disclosure** with a
90-day target (sooner for actively-exploited issues).

## Scope for this repository

Most relevant here:

- **Cross-site scripting** in the built pages. Note `set:html` is used
  deliberately in `src/components/CaptureMethods.astro` for author-controlled
  literals — a way to reach it with data we do not control is a finding.
- **Anything that changes what `www.homeaccounting.com` serves**: the GitHub
  Pages deployment, the `CNAME`/DNS path, or the Actions workflows.
  `.github/workflows/cla.yml` uses `pull_request_target` deliberately and never
  checks out pull-request code — a way to make it do so is a finding.
- **Supply-chain issues** in the build dependencies, with demonstrated impact on
  the published output.
- **Subdomain takeover** of any `homeaccounting.com` name this site points at.

Generally out of scope: findings in the product itself (report those against
`backend` or `web`); missing response headers that GitHub Pages provides no way
to set; and reports amounting to "this site is static and has no login".

## Supported versions

Only what is currently deployed from `master`.
