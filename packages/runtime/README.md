# @chatui/runtime

Host adapters and helpers for ChatGPT Apps SDK widgets.

## Usage

```ts
import { HostProvider, createEmbeddedHost } from "@chatui/runtime";

const host = createEmbeddedHost();

export function App() {
  return (
    <HostProvider host={host}>
      {/* your widget */}
    </HostProvider>
  );
}
```

## widgetSessionId (observability)

The ChatGPT host attaches a per-widget session identifier on tool responses:

- `_meta["openai/widgetSessionId"]` (tool result metadata)

In a widget, you can access it via `window.openai.toolResponseMetadata` or
`host.toolResponseMetadata` in embedded mode:

```ts
const sessionId = (window.openai?.toolResponseMetadata as Record<string, unknown> | undefined)?.[
  "openai/widgetSessionId"
];

// Use this to correlate logs or client-side telemetry across tool calls
```

This ID is stable for the lifetime of the mounted widget instance and rotates
when the widget unmounts.
