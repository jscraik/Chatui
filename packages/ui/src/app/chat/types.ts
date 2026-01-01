import { ReactNode } from "react";

import type { IconType } from "./constants";

/**
 * Shared types for ChatSidebar internal modules
 * Following best practice: types are shared, but modules are internal-only
 */

export interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode; // Keep ReactNode for runtime items
  color?: string;
}

export interface SidebarItemConfig {
  id: string;
  label: string;
  iconType: IconType; // Use IconType for configuration
  color?: string;
}

export interface ChatSidebarUser {
  name: string;
  subtitle?: string;
  avatarUrl?: string;
  initials?: string;
}

export type MemoryOption = "default" | "project-only";
