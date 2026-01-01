# Repo Structure Migration

This guide documents the 2026 restructure that improved discoverability and normalized package layouts. Use it to update local tooling, scripts, and bookmarks.

## Summary

- Apple platform code moved under `platforms/apple/`.
- `packages/tokens/outputs` moved to `packages/tokens/docs/outputs`.
- UI library app-level surfaces moved under `packages/ui/src/app/`.
- Design system demos consolidated under `packages/ui/src/design-system/`.
- Apps SDK adapters moved under `packages/ui/src/integrations/`.
- Testing helpers consolidated under `packages/ui/src/testing/`.
- Storybook demos/docs consolidated under `packages/ui/src/storybook/`.
- Templates gallery app renamed to `platforms/web/apps/templates-gallery/`.
- Web app + Storybook moved under `platforms/web/apps/`.
- Widget SDK tooling moved under `packages/widgets/src/sdk/`.
- `packages/runtime`, `packages/tokens`, and `packages/widgets` now follow `src/ /tests/ /docs/` conventions.

## Path map (old → new)

### Apple platform

- `apps/macos/*` → `platforms/apple/apps/macos/*`
- `swift/*` → `platforms/apple/swift/*`
- `swift/ui-swift/*` → `platforms/apple/swift/ui-swift/*`

### Apps

- `apps/web/*` → `platforms/web/apps/web/*`
- `apps/storybook/*` → `platforms/web/apps/storybook/*`
- `apps/ChatGPT-UI_templates/*` → `platforms/web/apps/templates-gallery/*`

### Tokens

- `packages/tokens/outputs/manifest.json` → `packages/tokens/docs/outputs/manifest.json`
- `packages/tokens/FIGMA_EXPORT_GUIDE.md` → `packages/tokens/docs/FIGMA_EXPORT_GUIDE.md`

### UI library

- `packages/ui/src/components/chat/*` → `packages/ui/src/app/chat/*`
- `packages/ui/src/components/modals/*` → `packages/ui/src/app/modals/*`
- `packages/ui/src/components/settings/*` → `packages/ui/src/app/settings/*`
- `packages/ui/src/components/showcase/*` → `packages/ui/src/design-system/showcase/*`
- `packages/ui/src/components/figma/*` → `packages/ui/src/integrations/figma/*`
- `packages/ui/src/components/icons/*` → `packages/ui/src/icons/legacy/*`
- `packages/ui/src/imports/*` → `packages/ui/src/icons/imports/*`
- `packages/ui/src/sdk/apps-sdk.ts` → `packages/ui/src/integrations/apps-sdk/index.ts`
- `packages/ui/src/vendor/appsSdkUi.ts` → `packages/ui/src/integrations/apps-sdk/vendor.ts`
- `packages/ui/src/tests/*` → `packages/ui/src/testing/*`
- `packages/ui/src/test/*` → `packages/ui/src/testing/*`

### Widgets

- `packages/widgets/src/plugins/*` → `packages/widgets/src/sdk/plugins/*`
- `packages/widgets/src/generated/*` → `packages/widgets/src/sdk/generated/*`

## Tooling updates to check

- Local scripts or CI steps that reference `apps/macos/` or `swift/` paths.
- Xcode project local package references (now relative to `platforms/apple/`).
- Token generation scripts that previously read from `packages/tokens/outputs/`.

## Verification checklist

- Build pipeline completes: `pnpm build`.
- Swift packages build: `pnpm test:swift:foundation` (and other variants).
- macOS apps open: `platforms/apple/apps/macos/ComponentGallery/Package.swift`.
- Token generation writes manifest to `packages/tokens/docs/outputs/manifest.json`.
