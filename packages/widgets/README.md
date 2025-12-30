# @chatui/widgets

Standalone ChatUI widget bundles used by the MCP server and Cloudflare Workers deployment template.

## Table of contents
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Build](#build)
- [Verify](#verify)
- [Troubleshooting](#troubleshooting)
- [Related docs](#related-docs)

## Prerequisites

- Node.js 18+
- pnpm

## Structure

Widgets live under `packages/widgets/src/` as individual folders. Examples include:

- `dashboard-widget`
- `enhanced-example-widget`
- `shopping-cart`
- `search-results`

Shared utilities live in `packages/widgets/src/shared`.

## Development

```bash
pnpm -C packages/widgets dev
```

## Quick start

From the repo root:
```bash
pnpm build:widgets
```

## Build

```bash
pnpm -C packages/widgets build
```

From the repo root:

```bash
pnpm build:widgets
```

The Cloudflare deployment template copies widget assets from `packages/widgets/dist`.

## Verify

- `packages/widgets/dist/` contains HTML/JS bundles.
- `packages/cloudflare-template` can deploy the assets to Cloudflare.

## Troubleshooting

### Symptom: Widgets do not appear in MCP responses
Cause: Widgets are not built.
Fix:
```bash
pnpm build:widgets
```

### Symptom: Cloudflare deployment missing assets
Cause: `packages/widgets/dist` is empty.
Fix: Build widgets before deploying.

## Related docs

- Deployment: `docs/guides/CLOUDFLARE_DEPLOYMENT.md`
- MCP integration: `docs/guides/CHATGPT_INTEGRATION.md`
