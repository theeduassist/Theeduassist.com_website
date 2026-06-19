# Sanity Connection Setup

## Overview
Sanity handles our CMS backend under Project ID `jg4gi6mn`, Dataset `production`.

## Architecture
The frontend interfaces via `@sanity/astro` utilizing a securely stored backend viewer token.
1. **Config**: `astro.config.mjs` integrates the official Sanity client plugin.
2. **Client**: `src/lib/sanity/client.ts` uses `createClient` and pulls `process.env.SANITY_VIEWER_TOKEN` when generating builds. No tokens are exposed to `PUBLIC_` variables or browsers.
3. **Studio**: Exists fully isolated in `studio/`.

## Test Path
`src/pages/sanity-test.astro` confirms query capability by attempting to grab test posts.
