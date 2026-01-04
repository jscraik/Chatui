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
import type { SidebarItem } from "../../shared/types";

/**
 * Project data - default projects and configuration
 */

/**
 * Default sidebar projects list.
 */
export const projects: SidebarItem[] = [
  {
    id: "apps-sdk",
    label: "Apps SDK Designer",
    icon: <IconWriting className="size-5" />,
    color: "text-foundation-accent-blue-light dark:text-foundation-accent-blue",
  },
  {
    id: "dadmode",
    label: "DADMODE",
    icon: <IconBarChart className="size-5" />,
    color: "text-foundation-accent-green-light dark:text-foundation-accent-green",
  },
  {
    id: "peer",
    label: "PEER Framework",
    icon: <IconFolder className="size-5" />,
    color: "text-foundation-accent-orange-light dark:text-foundation-accent-orange",
  },
];

/**
 * Default chat history labels.
 */
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

/**
 * Default sidebar categories.
 */
export const categories = ["Investing", "Homework", "Writing", "Coding", "Research"];

/**
 * Category icon elements by label.
 */
export const categoryIcons: Record<string, ReactNode> = {
  Investing: <IconBarChart className="size-5" />,
  Homework: <IconBook className="size-5" />,
  Writing: <IconWriting className="size-5" />,
  Coding: <IconCompose className="size-5" />,
  Research: <IconSearch className="size-5" />,
};

/**
 * Category badge class names by label.
 */
export const categoryColors: Record<string, string> = {
  Investing:
    "bg-foundation-accent-green-light/15 dark:bg-foundation-accent-green/15 text-foundation-accent-green-light dark:text-foundation-accent-green border-foundation-accent-green-light/30 dark:border-foundation-accent-green/30",
  Homework:
    "bg-foundation-accent-blue-light/15 dark:bg-foundation-accent-blue/15 text-foundation-accent-blue-light dark:text-foundation-accent-blue border-foundation-accent-blue-light/30 dark:border-foundation-accent-blue/30",
  Writing:
    "bg-foundation-accent-orange-light/15 dark:bg-foundation-accent-orange/15 text-foundation-accent-orange-light dark:text-foundation-accent-orange border-foundation-accent-orange-light/30 dark:border-foundation-accent-orange/30",
  Coding:
    "bg-foundation-accent-red-light/15 dark:bg-foundation-accent-red/15 text-foundation-accent-red-light dark:text-foundation-accent-red border-foundation-accent-red-light/30 dark:border-foundation-accent-red/30",
  Research:
    "bg-foundation-accent-blue-light/15 dark:bg-foundation-accent-blue/15 text-foundation-accent-blue-light dark:text-foundation-accent-blue border-foundation-accent-blue-light/30 dark:border-foundation-accent-blue/30",
};

/**
 * Category icon class names by label.
 */
export const categoryIconColors: Record<string, string> = {
  Investing: "text-foundation-accent-green-light dark:text-foundation-accent-green",
  Homework: "text-foundation-accent-blue-light dark:text-foundation-accent-blue",
  Writing: "text-foundation-accent-orange-light dark:text-foundation-accent-orange",
  Coding: "text-foundation-accent-red-light dark:text-foundation-accent-red",
  Research: "text-foundation-accent-blue-light dark:text-foundation-accent-blue",
};

/**
 * Project icon elements by icon identifier.
 */
export const projectIconMap: { [key: string]: ReactNode } = {
  folder: <IconFolder className="size-5" />,
  chat: <IconChat className="size-5" />,
  "bar-chart": <IconBarChart className="size-5" />,
  writing: <IconWriting className="size-5" />,
  book: <IconBook className="size-5" />,
  compose: <IconCompose className="size-5" />,
};

/**
 * Returns a project icon element for a given icon ID.
 *
 * @param iconId - Icon identifier.
 * @returns Icon element (folder icon as fallback).
 */
export function getProjectIcon(iconId: string) {
  return projectIconMap[iconId] || <IconFolder className="size-5" />;
}
