import type { ComponentType } from "react";

import { ComposeTemplate } from "./ComposeTemplate";
import { ChatTemplate } from "./ChatTemplate";
import { ChatHeaderTemplate } from "./ChatHeaderTemplate";
import { ChatSidebarTemplate } from "./ChatSidebarTemplate";
import { ChatMessagesTemplate } from "./ChatMessagesTemplate";
import { ChatInputTemplate } from "./ChatInputTemplate";
import { ChatVariantsTemplate } from "./ChatVariantsTemplate";
import { AppsPanelTemplate } from "./AppsPanelTemplate";
import { ArchivedChatsPanelTemplate } from "./ArchivedChatsPanelTemplate";
import { AudioSettingsPanelTemplate } from "./AudioSettingsPanelTemplate";
import { CheckForUpdatesPanelTemplate } from "./CheckForUpdatesPanelTemplate";
import { DataControlsPanelTemplate } from "./DataControlsPanelTemplate";
import { ManageAppsPanelTemplate } from "./ManageAppsPanelTemplate";
import { NotificationsPanelTemplate } from "./NotificationsPanelTemplate";
import { PersonalizationPanelTemplate } from "./PersonalizationPanelTemplate";
import { SecurityPanelTemplate } from "./SecurityPanelTemplate";

export type TemplateId =
  | "compose"
  | "chat"
  | "chat-header"
  | "chat-sidebar"
  | "chat-messages"
  | "chat-input"
  | "chat-variants"
  | "settings-apps"
  | "settings-archived-chats"
  | "settings-audio"
  | "settings-check-updates"
  | "settings-data-controls"
  | "settings-manage-apps"
  | "settings-notifications"
  | "settings-personalization"
  | "settings-security";

export type TemplateDefinition = {
  id: TemplateId;
  title: string;
  description: string;
  Component: ComponentType;
};

export const templateRegistry: TemplateDefinition[] = [
  {
    id: "compose",
    title: "Compose",
    description: "Prompt builder and compose workflow template.",
    Component: ComposeTemplate,
  },
  {
    id: "chat",
    title: "Chat",
    description: "Full chat experience with sidebar, header, messages, and composer.",
    Component: ChatTemplate,
  },
  {
    id: "chat-header",
    title: "Chat Header",
    description: "Top navigation header for chat surfaces.",
    Component: ChatHeaderTemplate,
  },
  {
    id: "chat-sidebar",
    title: "Chat Sidebar",
    description: "Sidebar navigation for chat history and projects.",
    Component: ChatSidebarTemplate,
  },
  {
    id: "chat-messages",
    title: "Chat Messages",
    description: "Message list with assistant and user messages.",
    Component: ChatMessagesTemplate,
  },
  {
    id: "chat-input",
    title: "Chat Input",
    description: "Composer bar with attachments and send controls.",
    Component: ChatInputTemplate,
  },
  {
    id: "chat-variants",
    title: "Chat Variants",
    description: "Slot-based chat layout variations (split, compact, rail).",
    Component: ChatVariantsTemplate,
  },
  {
    id: "settings-apps",
    title: "Settings: Apps",
    description: "Apps settings panel template.",
    Component: AppsPanelTemplate,
  },
  {
    id: "settings-archived-chats",
    title: "Settings: Archived Chats",
    description: "Archived chats panel template.",
    Component: ArchivedChatsPanelTemplate,
  },
  {
    id: "settings-audio",
    title: "Settings: Audio",
    description: "Audio settings panel template.",
    Component: AudioSettingsPanelTemplate,
  },
  {
    id: "settings-check-updates",
    title: "Settings: Check for Updates",
    description: "Check for updates panel template.",
    Component: CheckForUpdatesPanelTemplate,
  },
  {
    id: "settings-data-controls",
    title: "Settings: Data Controls",
    description: "Data controls panel template.",
    Component: DataControlsPanelTemplate,
  },
  {
    id: "settings-manage-apps",
    title: "Settings: Manage Apps",
    description: "Manage apps panel template.",
    Component: ManageAppsPanelTemplate,
  },
  {
    id: "settings-notifications",
    title: "Settings: Notifications",
    description: "Notifications panel template.",
    Component: NotificationsPanelTemplate,
  },
  {
    id: "settings-personalization",
    title: "Settings: Personalization",
    description: "Personalization panel template.",
    Component: PersonalizationPanelTemplate,
  },
  {
    id: "settings-security",
    title: "Settings: Security",
    description: "Security panel template.",
    Component: SecurityPanelTemplate,
  },
];

export const getTemplate = (id: TemplateId): TemplateDefinition | undefined =>
  templateRegistry.find((template) => template.id === id);
