import type { ChatMessage } from "../components/chat/ChatMessages";
import type { ChatSidebarUser, SidebarItem } from "../components/chat/ChatSidebar";
import {
    IconBarChart,
    IconBook,
    IconChat,
    IconCompose,
    IconFolder,
    IconSearch,
    IconWriting,
} from "../components/icons/ChatGPTIcons";
import type { ModeConfig } from "../components/ui/navigation/mode-selector";
import type { ModelConfig } from "../components/ui/navigation/model-selector";

export const sampleModels: ModelConfig[] = [
  { name: "Auto", shortName: "Auto", description: "Decides how long to think" },
  { name: "Instant", shortName: "Instant", description: "Answers right away" },
  { name: "Thinking", shortName: "Thinking", description: "Thinks longer for better answers" },
  { name: "Pro", shortName: "Pro", description: "Research-grade intelligence" },
];

export const sampleLegacyModels: ModelConfig[] = [
  { name: "GPT-4o", shortName: "GPT-4o", description: "Legacy model", isLegacy: true },
  { name: "GPT-4.1", shortName: "GPT-4.1", description: "Legacy model", isLegacy: true },
];

export const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I’m here to help. What would you like to work on?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    role: "user",
    content: "Can you help me design a better chat experience?",
    timestamp: new Date(Date.now() - 1000 * 60 * 28),
  },
  {
    id: "3",
    role: "assistant",
    content: "Absolutely. Let’s focus on navigation, input ergonomics, and visual hierarchy.",
    timestamp: new Date(Date.now() - 1000 * 60 * 27),
  },
];

export const sampleProjects: SidebarItem[] = [
  {
    id: "alpha",
    label: "Project Alpha",
    icon: <IconWriting className="size-4" />,
    color: "text-[var(--foundation-accent-blue)]",
  },
  {
    id: "beta",
    label: "Project Beta",
    icon: <IconBarChart className="size-4" />,
    color: "text-[var(--foundation-accent-green)]",
  },
  {
    id: "gamma",
    label: "Project Gamma",
    icon: <IconFolder className="size-4" />,
    color: "text-[var(--foundation-accent-orange)]",
  },
];

export const sampleGroupChats: SidebarItem[] = [
  {
    id: "group-1",
    label: "Summarize chat exchange",
    icon: (
      <div className="size-6 rounded-full bg-[var(--foundation-accent-red)] flex items-center justify-center flex-shrink-0">
        <IconChat className="size-3 text-white" />
      </div>
    ),
  },
];

export const sampleChatHistory = [
  "Design review follow-up",
  "Token audit fixes",
  "Widget flow polish",
  "UI library release plan",
  "Accessibility check",
];

export const sampleCategories = ["Investing", "Homework", "Writing", "Coding", "Research"];

export const sampleCategoryIcons = {
  Investing: <IconBarChart className="size-3" />,
  Homework: <IconBook className="size-3" />,
  Writing: <IconWriting className="size-3" />,
  Coding: <IconCompose className="size-3" />,
  Research: <IconSearch className="size-3" />,
};

export const sampleCategoryColors = {
  Investing:
    "bg-[var(--foundation-accent-green)]/20 text-[var(--foundation-accent-green)] border-[var(--foundation-accent-green)]/30",
  Homework:
    "bg-[var(--foundation-accent-blue)]/20 text-[var(--foundation-accent-blue)] border-[var(--foundation-accent-blue)]/30",
  Writing:
    "bg-[var(--foundation-accent-orange)]/20 text-[var(--foundation-accent-orange)] border-[var(--foundation-accent-orange)]/30",
  Coding:
    "bg-[var(--foundation-accent-red)]/20 text-[var(--foundation-accent-red)] border-[var(--foundation-accent-red)]/30",
  Research:
    "bg-[var(--foundation-accent-blue)]/20 text-[var(--foundation-accent-blue)] border-[var(--foundation-accent-blue)]/30",
};

export const sampleCategoryIconColors = {
  Investing: "text-[var(--foundation-accent-green)]",
  Homework: "text-[var(--foundation-accent-blue)]",
  Writing: "text-[var(--foundation-accent-orange)]",
  Coding: "text-[var(--foundation-accent-red)]",
  Research: "text-[var(--foundation-accent-blue)]",
};

export const sampleUser: ChatSidebarUser = {
  name: "Sample User",
  accountLabel: "Personal account",
  planLabel: "Pro",
};

export const sampleComposeModes: (ModeConfig & {
  contextConfig?: {
    mode?: string;
    selectedFiles?: string;
    fileTree?: string;
    codeMap?: string;
    gitDiff?: string;
  };
})[] = [
  {
    id: "chat",
    name: "Chat",
    subtitle: "Built-in preset",
    whenToUse: ["General questions", "Quick discussions"],
    about: "Standard chat mode for general interactions and questions.",
    contextConfig: {
      mode: "Chat",
      selectedFiles: "Auto",
      fileTree: "Off",
      codeMap: "Off",
      gitDiff: "Off",
    },
  },
  {
    id: "plan",
    name: "Plan",
    subtitle: "Built-in preset",
    whenToUse: ["Project planning", "Roadmaps"],
    about: "Planning mode for strategic thinking and architecture decisions.",
    contextConfig: {
      mode: "Plan",
      selectedFiles: "Manual",
      fileTree: "On",
      codeMap: "On",
      gitDiff: "Off",
    },
  },
  {
    id: "edit",
    name: "Edit",
    subtitle: "Built-in preset",
    whenToUse: ["Direct code modifications", "Focused implementation tasks"],
    about: "Direct code editing with precise changes.",
    contextConfig: {
      mode: "Edit",
      selectedFiles: "Auto",
      fileTree: "On",
      codeMap: "On",
      gitDiff: "On",
    },
  },
];
