# Repository Guidelines

## Project Structure & Module Organization
This is a pnpm workspace with app and package boundaries. Core locations:
- `apps/web/src` for the Vite React app that renders the UI.
- `apps/mcp` for the MCP server that exposes tools and widget resources.
- `apps/storybook` for component development and review.
- `packages/ui/src` for reusable UI (ChatUIRoot, header, sidebar, components).
- `packages/runtime/src` for Apps SDK runtime helpers and mocks.
Design references live under `guidelines/`. Public exports for the UI package are in `packages/ui/src/index.ts`.

## Build, Test, and Development Commands
Use Node 18+ and pnpm (repo pins `pnpm@9.15.0`).
- `pnpm install` installs all workspace deps.
- `pnpm dev` runs the web app (Vite).
- `pnpm build` builds the web app.
- `pnpm build:widget` builds the single-file widget HTML.
- `pnpm mcp:dev` / `pnpm mcp:start` run the MCP server.
- `pnpm storybook:dev` / `pnpm storybook:build` for Storybook.
App-specific commands can be run via `pnpm -C apps/web dev`.

## Coding Style & Naming Conventions
Use TypeScript and React (`.ts`/`.tsx`). Follow existing file style: 2-space indentation and double quotes in TS/TSX. Components use `PascalCase` (e.g., `ChatUIRoot`), hooks use `camelCase` with `use` prefix (e.g., `useControllableState`). Keep UI CSS in `packages/ui/src/styles/` and favor co-locating component helpers next to the component.

## Testing Guidelines
No test runner is configured in package scripts. Use Storybook for component-level verification and `pnpm preview` in `apps/web` for manual UI checks. If you add tests, place them alongside components (e.g., `Component.test.tsx` or `__tests__/`) and add a `test` script at the workspace or app level.

## Commit & Pull Request Guidelines
No explicit commit message convention is documented in-repo; follow existing history when available. Recommended format: Conventional Commits (e.g., `feat(ui): add sidebar toggle`, `fix(web): handle overlay focus`). PRs should include a short scope summary, affected apps/packages, steps to verify, and screenshots or clips for UI changes. Link related issues or tickets when applicable.

## Configuration & Environment Notes
Workspace wiring is in `pnpm-workspace.yaml`, and base TS settings in `tsconfig.base.json`. When changing shared UI, verify both `apps/web` and `apps/storybook` flows.
