// Core App Components
export { ChatUIRoot } from "./app/chat/ChatUIRoot";

// Hooks
export * from "./hooks/useFocusTrap";
export * from "./hooks/useControllableState";

// Slots
export * from "./app/chat/slots";

// Main Chat Components
export * from "./app/chat/ChatHeader";
export * from "./app/chat/ChatInput";
export * from "./app/chat/ChatMessages";
export * from "./app/chat/ChatSidebar";
export * from "./app/chat/ChatShell";
export * from "./app/chat/chat-variants";
export * from "./app/chat/ComposeView";

// UI Components (prioritized over vendor)
export * from "./components/ui";

// Organized component exports for better tree-shaking
export * from "./components/ui/chat";
export * from "./components/ui/forms";
export * from "./components/ui/layout";

// Vendor Components (explicit exports with AppsSDK prefix to avoid conflicts)
export {
  AppsSDKUIProvider,
  Button as AppsSDKButton,
  Checkbox as AppsSDKCheckbox,
  Image as AppsSDKImage,
  Input as AppsSDKInput,
  Badge as AppsSDKBadge,
  CodeBlock as AppsSDKCodeBlock,
  Popover as AppsSDKPopover,
  Textarea as AppsSDKTextarea,
  Download as AppsSDKDownloadIcon,
  Sparkles as AppsSDKSparklesIcon,
} from "./integrations/apps-sdk";

// Icons (canonical source - 350+ icons from Figma)
export * from "./icons";

// Utils
export * from "./components/ui/utils";
export * from "./utils/theme";

// Templates (canonical source)
export * from "./templates";
