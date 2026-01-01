/**
 * Sidebar constants - icon names and configuration data
 * Following best practice: Store data, not React elements
 * React elements are created in components where needed
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

export const categories = ["Investing", "Homework", "Writing", "Coding", "Research"] as const;

export const categoryColors = {
  Investing: "bg-accent-green/20 text-accent-green border-accent-green/30",
  Homework: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  Writing: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  Coding: "bg-orange-500/20 text-orange-500 border-orange-500/30",
  Research: "bg-pink-500/20 text-pink-500 border-pink-500/30",
} as const;

export const iconColorMap = {
  Investing: "text-accent-green",
  Homework: "text-blue-500",
  Writing: "text-purple-500",
  Coding: "text-orange-500",
  Research: "text-pink-500",
} as const;

// Icon type definitions (string identifiers, not JSX)
export type IconType =
  | "chat"
  | "folder"
  | "bar-chart"
  | "writing"
  | "book"
  | "compose"
  | "search"
  | "chevron-right";

// Quick action configurations (using icon type strings)
export const quickActionsConfig = [
  { id: "chatgpt", label: "ChatGPT", iconType: "chat" as IconType },
  { id: "gpts", label: "GPTs", iconType: "chevron-right" as IconType },
  { id: "new-project", label: "New project", iconType: "folder" as IconType },
];

// Initial projects configurations
export const initialProjectsConfig = [
  {
    id: "apps-sdk",
    label: "Apps SDK Designer",
    iconType: "writing" as IconType,
    color: "text-purple-500",
  },
  {
    id: "dadmode",
    label: "DADMODE",
    iconType: "bar-chart" as IconType,
    color: "text-accent-green",
  },
  {
    id: "peer",
    label: "PEER Framework",
    iconType: "folder" as IconType,
    color: "text-orange-500",
  },
];

// Category icon type mapping
export const categoryIconTypes: Record<string, IconType> = {
  Investing: "bar-chart",
  Homework: "book",
  Writing: "writing",
  Coding: "compose",
  Research: "search",
};
