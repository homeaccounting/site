# List available commands
help:
    @just --list

# Install dependencies
install:
    pnpm install

# Build the site into dist/
build:
    pnpm install --frozen-lockfile || pnpm install
    pnpm run build

# Watch sources and serve the dev server
run:
    pnpm run dev

# Open the site in a browser
open:
    open http://localhost:4321

# Remove generated artifacts
clean:
    rm -rf dist .astro node_modules/.astro

# Format sources
format:
    pnpm run format

# Build + content/unit tests + type check (the site's real gate)
# Glob (not a bare `test/` dir arg): Node 22.22.x's test runner fails to
# resolve a directory path ("Cannot find module '.../test'"); the glob form
# works on both Node 20.x and 22.22.x.
check: build
    pnpm run check
    node --test test/*.test.mjs
