# ChatUI Widget Gallery (platforms/web/apps/web)

**Simplified app for visual widget testing and MCP widget build.**

## What this app is for

- **Widget Gallery**: Visual browser for all ChatGPT widgets in an iframe gallery
- **Widget Build**: Builds single-file `widget.html` used by the MCP server
- **Standalone Host**: Reference implementation for `@chatui/runtime`

## Quick Start

```bash
pnpm dev:web
```

Opens at `http://localhost:5173` showing the Widget Gallery.

## Widget Gallery Features

- **12 Widgets**: Dashboard, Chat View, Search Results, Compose, Chat Blocks, Kitchen Sink, Pizzaz Table
- **Iframe Previews**: Each widget loads in isolated iframe for accurate testing
- **Modal Testing**: Built-in controls to test modals (Settings, Icon Picker, Discovery Settings)
- **Keyboard Shortcuts**: `?` for help, `G` for next widget, `Esc` to close modals

## Build Widget for MCP

The MCP server uses the widget build:

```bash
pnpm -C platforms/web/apps/web build:widget
```

Creates `platforms/web/apps/web/dist/widget.html` — a single-file HTML bundle used by the MCP server.

## Environment Variables

- `VITE_API_BASE` (optional) — defaults to `http://localhost:8787`
- `VITE_WIDGETS_BASE` (optional) — defaults to `http://localhost:5173`

## Key Files

- `src/app/Router.tsx` — simplified router (just shows WidgetHarness)
- `src/features/widgets/WidgetHarness.tsx` — widget gallery UI
- `scripts/inline-widget.mjs` — widget bundler for MCP

## Verify

1. Open `http://localhost:5173`
2. Widget Gallery loads automatically
3. Click different widgets to see them rendered
4. Test modal controls in sidebar

## Troubleshooting

**Port 5173 is in use**
```bash
pnpm -C platforms/web/apps/web dev -- --port 5174
```

**Widgets show blank**
- Ensure MCP server is running: `pnpm mcp:start`
- Check `VITE_WIDGETS_BASE` points to widget server

## Removed (Simplified)

- ~~Chat UI demo~~ → Use `platforms/web/apps/templates-gallery` instead
- ~~Pages (Settings, Profile, About, Templates, Variants)~~ → Not needed
- ~~Sample data~~ → Not needed
- ~~Complex routing~~ → Simplified to single view
