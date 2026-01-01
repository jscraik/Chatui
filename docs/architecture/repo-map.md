# Repo Map

This document provides a quick, task-oriented map of the repository so contributors can find the right surface fast.

## Top-level

- `apps/` — Shared services and tooling (e.g. `apps/mcp`).
- `platforms/` — Platform-specific code and apps.
  - `platforms/web/apps/web/src/app/` — app shell + router
  - `platforms/web/apps/web/src/features/` — feature slices (e.g. widget harness)
  - `platforms/web/apps/web/src/pages/` — route-level pages
  - `platforms/web/apps/templates-gallery/src/app/` — template gallery shell
  - `platforms/web/apps/storybook/.storybook/` — Storybook configuration + preview styles
- `packages/` — Reusable JS/TS packages (UI, tokens, runtime, widgets).
- `docs/` — Architecture, guides, audits, and build pipeline documentation.
- `scripts/` — Build pipeline, version sync, and compliance tooling.

## Platform surface

- `platforms/apple/`
  - `apps/macos/` — macOS apps (Xcode/SwiftPM projects) at `platforms/apple/apps/macos/`
  - `swift/` — Swift packages shared across macOS/iOS at `platforms/apple/swift/`
- `platforms/web/`
  - `platforms/web/apps/web/` — main web app
  - `platforms/web/apps/storybook/` — Storybook harness
  - `platforms/web/apps/templates-gallery/` — template gallery app

## JS/TS packages

- `packages/ui/` — React UI library
  - `src/app/` — app-level surfaces (chat, modals, settings)
  - `src/components/ui/` — base UI primitives + utilities
  - `src/design-system/` — design system docs + showcases
  - `src/fixtures/` — sample data for stories/templates
  - `src/hooks/` — shared hooks
  - `src/icons/` — canonical icon system
  - `src/integrations/` — Apps SDK + Figma adapters
  - `src/storybook/` — Storybook pages and docs
  - `src/templates/` — template composites
  - `src/testing/` — test utilities + mocks
- `packages/tokens/` — Design tokens + codegen
  - `src/` — token sources and generators
  - `tests/` — token validation tests
  - `docs/outputs/manifest.json` — generated validation manifest
- `packages/runtime/` — Shared runtime utilities
  - `src/` — runtime source
  - `docs/` — runtime docs
  - `tests/` — (reserved)
- `packages/widgets/` — Widget library + examples
  - `src/widgets/` — widget implementations (grouped by category)
  - `src/shared/` — shared widget utilities
  - `src/sdk/` — Apps SDK build tooling + generated manifest
  - `src/styles.css` — global widget styles
  - `tests/` — Playwright suites
  - `docs/` — (reserved)

## Key docs

- `docs/BUILD_PIPELINE.md` — End-to-end build pipeline
- `docs/architecture/` — Architecture + cross-platform design
- `docs/guides/` — How-tos and integration guides
- `docs/work/` — Work logs and validation notes
