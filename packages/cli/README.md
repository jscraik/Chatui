# @chatui/cli

Unified developer CLI for the ChatUI monorepo (dev/build/test/mcp/tokens/versions).

See `CLI_SPEC.md` for the full interface contract.

## Install (workspace)

```bash
pnpm install
```

## Usage

```bash
pnpm chatui --help
pnpm chatui dev --exec
pnpm chatui build web --exec
pnpm chatui test e2e-web --exec
pnpm chatui mcp tools list --network
pnpm chatui doctor
```

## Command overview

- `dev [web|storybook|widgets|mcp|all]`
- `build [web|widgets|lib|macos|all]`
- `test [ui|e2e-web|a11y-widgets|visual-web|visual-storybook|swift|mcp-contract|all]`
- `mcp <dev|start|test|inspector|rpc|tools|resources|prompts>`
- `tokens <generate|validate>`
- `versions <sync|sync-swift>`
- `components new <Name>`
- `lint [--compliance]`
- `format [--check|--write]`
- `doctor`

## Safety / risk flags

- `--exec` is required to run external commands (dev/build/test/lint/format, etc).
- `--network` is required for MCP network requests.
- `--write` is required for commands that write files (tokens/versions/components).
- `--dry-run` prints the plan/request without executing (no `--exec`/`--network` required).

## Output modes

- Default: human-readable
- `--plain`: stable `key=value` lines (no child output unless `--verbose`/`--debug` or on error)
- `--json`: single JSON object (no logs; stable schema `chatui.command.v1`)

## Config & env

Precedence: flags > env > project config > user config > system.

- Project config: `chatui.config.json`
- User config: `~/.config/chatui/config.json`

Environment variables:
- `CHATUI_CONFIG` (config path override)
- `CHATUI_CWD` (working directory override)
- `CHATUI_COLOR=0|1` (force color off/on)
- `CHATUI_PNPM` (pnpm binary path override)
- `MCP_TEST_URL` (default: `http://127.0.0.1:8787`)
- `MCP_ENDPOINT` (default: `/mcp`)
- `MCP_PROTOCOL_VERSION` (default: `2024-11-05`)

## Examples

```bash
pnpm chatui dev --exec
pnpm chatui build web --exec --json
pnpm chatui test visual-storybook --update --exec
pnpm chatui mcp rpc tools/list --network
pnpm chatui mcp tools call --name display_chat --args @payload.json --network
pnpm chatui tokens validate --exec
pnpm chatui mcp tools list --dry-run --plain
```

## JSON output schema

```json
{
  "schema": "chatui.command.v1",
  "meta": {
    "tool": "chatui",
    "version": "x.y.z",
    "timestamp": "ISO-8601",
    "request_id": "optional"
  },
  "summary": "short summary",
  "status": "success|warn|error",
  "data": {},
  "errors": [
    {
      "code": "E_USAGE",
      "message": "human-readable message",
      "details": {},
      "hint": "optional fix or next step"
    }
  ]
}
```
