// ============================================================================
// TEMPLATE REGISTRY
// ============================================================================
// This registry defines all templates available in the gallery.
// Components are imported from @chatui/ui - the canonical source.
//
// To add a new template:
// 1. Import the component from @chatui/ui
// 2. Add it to the templateRegistry array with metadata
// ============================================================================

import type { ComponentType } from "react";

// Import template components from @chatui/ui
import {
  ChatFullWidthTemplate,
  ChatTwoPaneTemplate,
  DashboardTemplate,
  ChatHeaderTemplate,
  ChatInputTemplate,
  ChatSidebarTemplate,
  ChatMessagesTemplate,
  ComposeTemplate,
} from "@chatui/ui/templates";

// Import settings panel templates
import {
  AppsPanelTemplate,
  ArchivedChatsPanelTemplate,
  AudioSettingsPanelTemplate,
  CheckForUpdatesPanelTemplate,
  DataControlsPanelTemplate,
  ManageAppsPanelTemplate,
  NotificationsPanelTemplate,
  PersonalizationPanelTemplate,
  SecurityPanelTemplate,
} from "@chatui/ui/templates";

// ----------------------------------------------------------------------------
// TEMPLATE DEFINITION
// ----------------------------------------------------------------------------

export interface TemplateDefinition {
  id: string;
  title: string;
  description: string;
  category: "components" | "design-system" | "templates" | "settings" | "layouts";
  Component: ComponentType<any>;
  previewProps?: Record<string, any>;
  tags?: string[];
}

// ----------------------------------------------------------------------------
// CATEGORIES
// ----------------------------------------------------------------------------

export const categories = {
  components: "UI Components",
  "design-system": "Design System",
  templates: "Templates",
  settings: "Settings Panels",
  layouts: "Layouts",
} as const;

// ----------------------------------------------------------------------------
// TEMPLATE REGISTRY
// ----------------------------------------------------------------------------

export const templateRegistry: TemplateDefinition[] = [
  // ==================== TEMPLATES ====================
  {
    id: "chat-full-width",
    title: "Chat Full Width",
    description: "Full-width chat layout with header, messages, and input sections.",
    category: "templates",
    Component: ChatFullWidthTemplate,
    previewProps: {
      header: <div className="p-4 border-b">Chat Header</div>,
      body: <div className="p-4">Chat Messages</div>,
      footer: <div className="p-4 border-t">Chat Input</div>,
    },
    tags: ["chat", "layout", "full-width"],
  },
  {
    id: "chat-two-pane",
    title: "Chat Two Pane",
    description: "Two-pane chat layout with sidebar and main content area.",
    category: "templates",
    Component: ChatTwoPaneTemplate,
    previewProps: {
      sidebar: <div className="p-4 border-r">Sidebar</div>,
      main: <div className="p-4">Main Chat</div>,
    },
    tags: ["chat", "layout", "two-pane"],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Dashboard template for widgets and cards.",
    category: "templates",
    Component: DashboardTemplate,
    previewProps: {
      title: "Dashboard",
      widgets: <div className="p-4">Dashboard Widgets</div>,
    },
    tags: ["dashboard", "layout", "widgets"],
  },

  // ==================== COMPONENTS ====================
  {
    id: "chat-header",
    title: "Chat Header",
    description: "Header component for chat interfaces.",
    category: "components",
    Component: ChatHeaderTemplate,
    previewProps: {
      title: "ChatGPT",
      model: "GPT-4",
    },
    tags: ["chat", "header", "component"],
  },
  {
    id: "chat-input",
    title: "Chat Input",
    description: "Input component for chat messages.",
    category: "components",
    Component: ChatInputTemplate,
    previewProps: {
      placeholder: "Message ChatGPT...",
      disabled: false,
    },
    tags: ["chat", "input", "component"],
  },
  {
    id: "chat-sidebar",
    title: "Chat Sidebar",
    description: "Sidebar component for chat history.",
    category: "components",
    Component: ChatSidebarTemplate,
    previewProps: {},
    tags: ["chat", "sidebar", "component"],
  },
  {
    id: "chat-messages",
    title: "Chat Messages",
    description: "Messages display component.",
    category: "components",
    Component: ChatMessagesTemplate,
    previewProps: {},
    tags: ["chat", "messages", "component"],
  },
  {
    id: "compose-view",
    title: "Compose View",
    description: "Compose view for creating new content.",
    category: "components",
    Component: ComposeTemplate,
    previewProps: {},
    tags: ["compose", "component"],
  },

  // ==================== SETTINGS PANELS ====================
  {
    id: "settings-personalization",
    title: "Personalization Panel",
    description: "Settings panel for personalization options.",
    category: "settings",
    Component: PersonalizationPanelTemplate,
    previewProps: {},
    tags: ["settings", "personalization", "panel"],
  },
  {
    id: "settings-notifications",
    title: "Notifications Panel",
    description: "Settings panel for notification preferences.",
    category: "settings",
    Component: NotificationsPanelTemplate,
    previewProps: {},
    tags: ["settings", "notifications", "panel"],
  },
  {
    id: "settings-data-controls",
    title: "Data Controls Panel",
    description: "Settings panel for data management.",
    category: "settings",
    Component: DataControlsPanelTemplate,
    previewProps: {},
    tags: ["settings", "data", "panel"],
  },
  {
    id: "settings-audio",
    title: "Audio Settings Panel",
    description: "Settings panel for audio preferences.",
    category: "settings",
    Component: AudioSettingsPanelTemplate,
    previewProps: {},
    tags: ["settings", "audio", "panel"],
  },
  {
    id: "settings-security",
    title: "Security Panel",
    description: "Settings panel for security options.",
    category: "settings",
    Component: SecurityPanelTemplate,
    previewProps: {},
    tags: ["settings", "security", "panel"],
  },
  {
    id: "settings-apps",
    title: "Apps Panel",
    description: "Settings panel for app management.",
    category: "settings",
    Component: AppsPanelTemplate,
    previewProps: {},
    tags: ["settings", "apps", "panel"],
  },
  {
    id: "settings-archived-chats",
    title: "Archived Chats Panel",
    description: "Settings panel for archived chats.",
    category: "settings",
    Component: ArchivedChatsPanelTemplate,
    previewProps: {},
    tags: ["settings", "archive", "panel"],
  },
  {
    id: "settings-manage-apps",
    title: "Manage Apps Panel",
    description: "Settings panel for managing installed apps.",
    category: "settings",
    Component: ManageAppsPanelTemplate,
    previewProps: {},
    tags: ["settings", "apps", "management"],
  },
  {
    id: "settings-check-updates",
    title: "Check for Updates Panel",
    description: "Settings panel for updates.",
    category: "settings",
    Component: CheckForUpdatesPanelTemplate,
    previewProps: {},
    tags: ["settings", "updates", "panel"],
  },
];

// ----------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------

export function getTemplatesByCategory(
  category: keyof typeof categories,
): TemplateDefinition[] {
  return templateRegistry.filter((template) => template.category === category);
}
