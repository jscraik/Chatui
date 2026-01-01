import type { ReactNode } from "react";

import {
  IconBarChart,
  IconBook,
  IconChat,
  IconCompose,
  IconFolder,
  IconSearch,
  IconWriting,
} from "../../../../icons/ChatGPTIcons";
import type { SidebarItem } from "../../types";

/**
 * Project data - default projects and configuration
 */

export const projects: SidebarItem[] = [
  {
    id: "apps-sdk",
    label: "Apps SDK Designer",
    icon: <IconWriting className="size-5" />,
    color: "text-[var(--accent-blue)]",
  },
  {
    id: "dadmode",
    label: "DADMODE",
    icon: <IconBarChart className="size-5" />,
    color: "text-[var(--accent-green)]",
  },
  {
    id: "peer",
    label: "PEER Framework",
    icon: <IconFolder className="size-5" />,
    color: "text-[var(--accent-orange)]",
  },
];

export const chatHistory = [
  "Greeting exchange",
  "Storybook and Apps SDK UI",
  "Conversation start",
  "Your Year with ChatGPT",
  "CRMO explanation and sensitivity",
  "Project governance complexity",
  "React Component Explorers",
  "Clone SwiftUI macOS App",
  "Apps SDK UI examples",
  "Governance framework expansion",
  "New chat",
  "Bobblehead figurine design",
  "Plushie transformation concept",
  "Plushie-style transformation",
  "3D pencil sketch generation",
  "Assistant response clarification",
  "Learn Year 7 Maths",
];

export const categories = ["Investing", "Homework", "Writing", "Coding", "Research"];

export const categoryIcons: Record<string, ReactNode> = {
  Investing: <IconBarChart className="size-3" />,
  Homework: <IconBook className="size-3" />,
  Writing: <IconWriting className="size-3" />,
  Coding: <IconCompose className="size-3" />,
  Research: <IconSearch className="size-3" />,
};

export const categoryColors: Record<string, string> = {
  Investing:
    "bg-[var(--accent-green)]/20 text-[var(--accent-green)] border-[var(--accent-green)]/30",
  Homework: "bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border-[var(--accent-blue)]/30",
  Writing:
    "bg-[var(--accent-orange)]/20 text-[var(--accent-orange)] border-[var(--accent-orange)]/30",
  Coding: "bg-[var(--accent-red)]/20 text-[var(--accent-red)] border-[var(--accent-red)]/30",
  Research: "bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border-[var(--accent-blue)]/30",
};

export const categoryIconColors: Record<string, string> = {
  Investing: "text-[var(--accent-green)]",
  Homework: "text-[var(--accent-blue)]",
  Writing: "text-[var(--accent-orange)]",
  Coding: "text-[var(--accent-red)]",
  Research: "text-[var(--accent-blue)]",
};

export const projectIconMap: { [key: string]: ReactNode } = {
  folder: <IconFolder className="size-4" />,
  chat: <IconChat className="size-4" />,
  "bar-chart": <IconBarChart className="size-4" />,
  writing: <IconWriting className="size-4" />,
  book: <IconBook className="size-4" />,
  compose: <IconCompose className="size-4" />,
};

export function getProjectIcon(iconId: string) {
  return projectIconMap[iconId] || <IconFolder className="size-4" />;
}
