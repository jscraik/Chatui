import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

import { cn } from "../../../components/ui/utils";
import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconDownload,
  IconShare,
  IconSidebar,
} from "../../../icons";

// Import ChatGPT-specific icons
import {
  IconSparkles,
  IconChat,
} from "../../../icons";

// Types
interface ModelConfig {
  name: string;
  shortName: string;
  description: string;
  isLegacy?: boolean;
  badge?: string;
}

interface ChatHeaderProps {
  /** Callback when sidebar toggle is clicked */
  onSidebarToggle?: () => void;
  /** Whether sidebar is currently open */
  isSidebarOpen?: boolean;
  /** Currently selected model (string or ModelConfig) */
  selectedModel?: string | ModelConfig;
  /** Callback when model changes */
  onModelChange?: (model: string | ModelConfig) => void;
  /** Current view mode */
  viewMode?: "chat" | "compose";
  /** Callback when view mode changes */
  onViewModeChange?: (mode: "chat" | "compose") => void;
  /** Custom content for the right side of the header */
  headerRight?: React.ReactNode;
  /** Show sidebar toggle button */
  showSidebarToggle?: boolean;
  /** Custom available models */
  models?: ModelConfig[];
  /** Custom legacy models */
  legacyModels?: ModelConfig[];
  /** Additional class names */
  className?: string;
}

const defaultModels: ModelConfig[] = [
  {
    name: "Auto",
    shortName: "Auto",
    description: "Decides how long to think",
    badge: "Recommended",
  },
  { name: "Instant", shortName: "Instant", description: "Answers right away" },
  { name: "Thinking", shortName: "Thinking", description: "Thinks longer for better answers" },
  { name: "Pro", shortName: "Pro", description: "Research-grade intelligence", badge: "New" },
];

const defaultLegacyModels: ModelConfig[] = [
  {
    name: "GPT-5.1 Instant",
    shortName: "GPT-5.1 Instant",
    description: "Legacy model",
    isLegacy: true,
  },
  {
    name: "GPT-5.1 Thinking",
    shortName: "GPT-5.1 Thinking",
    description: "Legacy model",
    isLegacy: true,
  },
  { name: "GPT-5.1 Pro", shortName: "GPT-5.1 Pro", description: "Legacy model", isLegacy: true },
  {
    name: "GPT-5 Instant",
    shortName: "GPT-5 Instant",
    description: "Legacy model",
    isLegacy: true,
  },
  {
    name: "GPT-5 Thinking",
    shortName: "GPT-5 Thinking",
    description: "Legacy model",
    isLegacy: true,
  },
  { name: "GPT-4o", shortName: "GPT-4o", description: "Legacy model", isLegacy: true },
  { name: "GPT-4.1", shortName: "GPT-4.1", description: "Legacy model", isLegacy: true },
];

/** ChatHeader - Complete chat interface header with mode toggle, model selector, and customizable actions */
export function ChatHeader({
  onSidebarToggle,
  isSidebarOpen,
  selectedModel = "Auto",
  onModelChange,
  viewMode = "chat",
  onViewModeChange,
  headerRight,
  showSidebarToggle = false,
  models = defaultModels,
  legacyModels = defaultLegacyModels,
  className,
}: ChatHeaderProps) {
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [isLegacyOpen, setIsLegacyOpen] = useState(false);

  const modelName = typeof selectedModel === "string" ? selectedModel : selectedModel.shortName;

  const handleModelSelect = (model: ModelConfig) => {
    onModelChange?.(model);
    setIsModelSelectorOpen(false);
    setIsLegacyOpen(false);
  };

  const isModelSelected = (model: ModelConfig) => {
    if (typeof selectedModel === "string") {
      return selectedModel === model.name || selectedModel === model.shortName;
    }
    return selectedModel.name === model.name;
  };

  return (
    <header
      className={cn(
        "h-14 border-b border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
        "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-2",
        "flex items-center justify-between px-4 shrink-0",
        className,
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-2">
        {/* Sidebar Toggle */}
        {showSidebarToggle && (
          <button
            type="button"
            onClick={onSidebarToggle}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isSidebarOpen}
            className={cn(
              "p-2 rounded-lg transition-colors duration-150",
              "text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary",
              "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
            )}
          >
            <IconSidebar className="size-5" />
          </button>
        )}

        {/* Compose/Chat Toggle */}
        <button
          type="button"
          onClick={() => onViewModeChange?.(viewMode === "compose" ? "chat" : "compose")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200",
            "border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
            "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
            viewMode === "compose" && "bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-3",
          )}
        >
          {viewMode === "compose" ? (
            <>
              <IconChat className="size-4 text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary" />
              <span className="text-sm font-medium text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary">
                Chat
              </span>
            </>
          ) : (
            <>
              <IconSparkles className="size-4 text-foundation-accent-blue" />
              <span className="text-sm font-medium text-foundation-accent-blue">Compose</span>
            </>
          )}
        </button>

        {/* Model Selector */}
        {viewMode !== "compose" && (
          <Popover.Root open={isModelSelectorOpen} onOpenChange={setIsModelSelectorOpen}>
            <Popover.Trigger asChild>
              <button
                type="button"
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150",
                  "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
                  isModelSelectorOpen && "bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-3",
                )}
              >
                <span className="text-sm font-semibold text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
                  ChatGPT
                </span>
                <span className="text-sm text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary">
                  {modelName}
                </span>
                <IconChevronDown
                  className={cn(
                    "size-4 text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary transition-transform duration-200",
                    isModelSelectorOpen && "rotate-180",
                  )}
                />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                forceMount
                side="bottom"
                align="start"
                sideOffset={8}
                className={cn(
                  "z-50 w-[320px] rounded-2xl overflow-hidden",
                  "border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
                  "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-2",
                  "shadow-xl",
                  "animate-in fade-in-0 zoom-in-95 duration-200",
                )}
              >
                <div className="p-2">
                  {/* Available Models */}
                  <div className="space-y-1">
                    {models.map((model) => (
                      <button
                        key={model.name}
                        type="button"
                        onClick={() => handleModelSelect(model)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors duration-150",
                          "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foundation-accent-blue",
                          "text-left group",
                          isModelSelected(model) &&
                            "bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-3",
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
                              {model.name}
                            </span>
                            {model.badge && (
                              <span
                                className={cn(
                                  "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                                  model.badge === "New"
                                    ? "bg-foundation-accent-green/10 text-foundation-accent-green"
                                    : "bg-foundation-accent-blue/10 text-foundation-accent-blue",
                                )}
                              >
                                {model.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary mt-0.5">
                            {model.description}
                          </p>
                        </div>
                        {isModelSelected(model) && (
                          <IconCheck className="size-4 text-foundation-accent-green shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-3 my-2" />

                  {/* Legacy Models Submenu */}
                  <Popover.Root open={isLegacyOpen} onOpenChange={setIsLegacyOpen}>
                    <Popover.Trigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors duration-150",
                          "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foundation-accent-blue",
                          "text-left",
                        )}
                      >
                        <span className="text-sm font-medium text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
                          Legacy models
                        </span>
                        <IconChevronRight
                          className={cn(
                            "size-4 text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary transition-transform duration-200",
                            isLegacyOpen && "rotate-90",
                          )}
                        />
                      </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        forceMount
                        side="right"
                        align="start"
                        sideOffset={8}
                        className={cn(
                          "z-50 w-[280px] rounded-2xl overflow-hidden",
                          "border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
                          "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-2",
                          "shadow-xl",
                          "animate-in fade-in-0 zoom-in-95 slide-in-from-left-2 duration-200",
                        )}
                      >
                        <div className="p-2 max-h-[320px] overflow-y-auto">
                          {legacyModels.map((model) => (
                            <button
                              key={model.name}
                              type="button"
                              onClick={() => handleModelSelect(model)}
                              className={cn(
                                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors duration-150",
                                "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foundation-accent-blue",
                                "text-left",
                                isModelSelected(model) &&
                                  "bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-3",
                              )}
                            >
                              <span className="text-sm text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
                                {model.name}
                              </span>
                              {isModelSelected(model) && (
                                <IconCheck className="size-4 text-foundation-accent-green shrink-0 ml-2" />
                              )}
                            </button>
                          ))}
                        </div>
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        {headerRight}
        <button
          type="button"
          aria-label="Download"
          className={cn(
            "p-2 rounded-lg transition-colors duration-150",
            "text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary",
            "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
            "hover:text-foundation-text-light-secondary dark:hover:text-foundation-text-dark-secondary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
          )}
        >
          <IconDownload className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Share"
          className={cn(
            "p-2 rounded-lg transition-colors duration-150",
            "text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary",
            "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
            "hover:text-foundation-text-light-secondary dark:hover:text-foundation-text-dark-secondary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
          )}
        >
          <IconShare className="size-4" />
        </button>
      </div>
    </header>
  );
}

// Export types for external use
export type { ChatHeaderProps };
