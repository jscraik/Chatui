// ============================================================================
// CHATUI CANONICAL ICON SYSTEM
// ============================================================================
// This is the SINGLE SOURCE OF TRUTH for all icons across the entire ChatUI
// repository. All apps (web, storybook, templates-gallery) must import icons
// from this file only.
//
// Icon System Breakdown:
// - 350+ ChatGPT icons (hardcoded SVG from Figma)
// - Lucide React icons (convenience re-exports)
// - Brand icons (GitHub, Notion, Slack, etc.)
// - Apps SDK UI icons (Download, Sparkles)
//
// Usage: import { IconCheckmark, IconSettings } from "@chatui/ui/icons"
// ============================================================================

import { chatGPTIconSizes } from "./ChatGPTIconSizes";

// ----------------------------------------------------------------------------
// CHATGPT ICONS (350+ production-ready icons from Figma)
// ----------------------------------------------------------------------------

// Core ChatGPT icons with hardcoded SVG paths
export * from "./chatgpt/ChatGPTIconsFixed";

// Additional ChatGPT icons (chevrons, arrows, specialized)
// Note: Some icons may overlap with ChatGPTIconsFixed - they're exported as is
export * from "./chatgpt/additional-icons";

// Missing ChatGPT icons
export * from "./chatgpt/missing-icons";
export { IconOperator } from "./legacy/chatgpt/misc";
export {
  IconArrowCurvedRight,
  IconArrowDownLg,
  IconArrowRotateCw,
  IconArrowTopRightSm,
  IconChevronUpDown,
  IconExpandLg,
  IconRegenerateStar,
  IconReply,
  IconShuffle,
} from "./legacy/chatgpt/arrows";

// Common icon aliases for consistency (not already in NAMED EXPORTS section)
export { ArrowUp as IconArrowUp } from "lucide-react";
export { Clock as IconClock } from "lucide-react";
export { Globe as IconGlobe, Globe as IconPublic } from "lucide-react";
export { Headphones as IconHeadphones } from "lucide-react";
export { Mic as IconMic } from "lucide-react";
export { Paperclip as IconPaperclip } from "lucide-react";
export { Plus as IconPlusComposer } from "lucide-react";

// ----------------------------------------------------------------------------
// BRAND ICONS
// ----------------------------------------------------------------------------

export {
  CanvaIcon,
  DropboxIcon,
  FigmaIcon,
  GitHubIcon,
  LinearIcon,
  MicrosoftIcon,
  NotionIcon,
  SharePointIcon,
  SlackIcon,
  TeamsIcon,
} from "./brands";

// ----------------------------------------------------------------------------
// LUCIDE REACT ICONS (convenience re-exports)
// ----------------------------------------------------------------------------

import {
  Archive,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Code,
  Copy,
  Folder,
  Grid3x3,
  Image,
  Lightbulb,
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  PanelLeft,
  Pencil,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings,
  Share,
  Star,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";

// ----------------------------------------------------------------------------
// APPS SDK UI ICONS
// ----------------------------------------------------------------------------

export { Download, Sparkles } from "../integrations/apps-sdk";
export { Download as IconDownload, Sparkles as IconSparkles } from "../integrations/apps-sdk";

// ----------------------------------------------------------------------------
// NAMED EXPORTS (Icon* prefix for consistency)
// ----------------------------------------------------------------------------

// These provide convenient aliases with Icon* prefix
export {
  Archive as IconArchive,
  ArrowLeft as IconArrowLeftSm,
  ArrowRight as IconArrowRightSm,
  ArrowUp as IconArrowUpSm,
  MessageSquare as IconChat,
  CheckCircle as IconCheckCircle,
  Check as IconCheckmark,
  Check as IconCheck,
  ChevronDown as IconChevronDownMd,
  ChevronLeft as IconChevronLeftMd,
  ChevronRight as IconChevronRightMd,
  ChevronUp as IconChevronUpMd,
  X as IconCloseBold,
  Code as IconCode,
  Copy as IconCopy,
  MoreHorizontal as IconDotsHorizontal,
  MoreVertical as IconDotsVertical,
  Pencil as IconEdit,
  Folder as IconFolder,
  Grid3x3 as IconGrid3x3,
  Image as IconImage,
  Lightbulb as IconLightBulb,
  Plus as IconPlusLg,
  Plus as IconPlusSm,
  Radio as IconRadio,
  RefreshCw as IconRegenerate,
  RefreshCw as IconRefresh,
  Search as IconSearch,
  Settings as IconSettings,
  Share as IconShare,
  PanelLeft as IconSidebar,
  Star as IconStar,
  ThumbsDown as IconThumbDown,
  ThumbsUp as IconThumbUp,
  X as IconX,
};

// ----------------------------------------------------------------------------
// ICON CATALOG (for browsing all icons)
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// SIZE UTILITIES
// ----------------------------------------------------------------------------

export { chatGPTIconSizes, getSizeClass } from "./ChatGPTIconSizes";
export type { ChatGPTIconSizes } from "./ChatGPTIconSizes";

// ----------------------------------------------------------------------------
// ICON PROPS TYPE
// ----------------------------------------------------------------------------

export interface IconProps {
  className?: string;
  size?: keyof typeof chatGPTIconSizes;
}
