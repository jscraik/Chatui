import type { FormEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "../../../components/ui/utils";

import { AttachmentMenu, type AttachmentAction, type MoreAction } from "../AttachmentMenu";
import {
  IconArrowUp,
  IconClock,
  IconGlobe,
  IconHeadphones,
  IconMic,
  IconRefresh,
  IconTelescope,
} from "../../../icons";

// ============================================================================
// TYPES
// ============================================================================

interface ModelConfig {
  name: string;
  shortName: string;
  description: string;
}

export type ChatInputToolAction =
  | "terminal-add"
  | "code-open"
  | "code-insiders-open"
  | "notes-open"
  | "script-editor-open";

export type ChatInputAttachmentAction = AttachmentAction;

export interface ChatInputProps {
  /** Currently selected model */
  selectedModel: ModelConfig;
  /** Custom content for left side of composer */
  composerLeft?: ReactNode;
  /** Custom content for right side of composer */
  composerRight?: ReactNode;
  /** Callback when message is sent */
  onSendMessage?: (message: string) => void | Promise<void>;
  /** Callback for attachment actions */
  onAttachmentAction?: (action: AttachmentAction) => void;
  /** Callback for more menu actions */
  onMoreAction?: (action: MoreAction) => void;
  /** Callback for tool actions */
  onToolAction?: (action: ChatInputToolAction) => void;
  /** Callback when search is toggled */
  onSearchToggle?: (enabled: boolean) => void;
  /** Callback when research is toggled */
  onResearchToggle?: (enabled: boolean) => void;
  /** Callback for auto-clear action */
  onAutoClear?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ChatInput - Complete chat input with attachments, search/research toggles, tools menu, and voice input
 * Optimized for ChatGPT's polished aesthetic with full design token compliance
 */
export function ChatInput({
  selectedModel,
  composerLeft,
  composerRight,
  onSendMessage,
  onAttachmentAction,
  onMoreAction,
  onToolAction,
  onSearchToggle,
  onResearchToggle,
  onAutoClear,
  placeholder,
  disabled = false,
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [isResearchEnabled, setIsResearchEnabled] = useState(false);
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (message.trim() && !disabled) {
        void onSendMessage?.(message);
        setMessage("");
      }
    },
    [message, disabled, onSendMessage],
  );

  const handleSearchToggle = useCallback(() => {
    const newValue = !isSearchEnabled;
    setIsSearchEnabled(newValue);
    onSearchToggle?.(newValue);
  }, [isSearchEnabled, onSearchToggle]);

  const handleResearchToggle = useCallback(() => {
    const newValue = !isResearchEnabled;
    setIsResearchEnabled(newValue);
    onResearchToggle?.(newValue);
  }, [isResearchEnabled, onResearchToggle]);

  const dynamicPlaceholder = isSearchEnabled ? "Search the web" : placeholder || "Ask anything";

  return (
    <div
      className={cn(
        "border-t border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
        "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1",
        "p-4",
        className,
      )}
    >
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div
          className={cn(
            "rounded-[24px] overflow-hidden transition-all duration-200",
            "bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2",
            "border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
            "shadow-sm hover:shadow-md dark:shadow-black/10",
            "focus-within:border-foundation-accent-blue/50 focus-within:shadow-lg focus-within:shadow-foundation-accent-blue/5",
          )}
        >
          {/* Input Area */}
          <div className="px-4 py-3">
            {/* Active Mode Indicator */}
            {isSearchEnabled && (
              <div className="flex items-center gap-2 mb-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg",
                    "bg-foundation-accent-blue/10 text-foundation-accent-blue",
                    "text-[13px] font-medium leading-[18px] tracking-[-0.3px]",
                  )}
                >
                  <IconGlobe className="size-3.5" />
                  <span>Search</span>
                </div>
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={dynamicPlaceholder}
              aria-label={dynamicPlaceholder}
              disabled={disabled}
              rows={1}
              className={cn(
                "w-full bg-transparent resize-none focus:outline-none",
                "text-[16px] font-normal leading-[24px] tracking-[-0.32px]",
                "text-foundation-text-light-primary dark:text-foundation-text-dark-primary",
                "placeholder:text-foundation-text-light-tertiary dark:placeholder:text-foundation-text-dark-tertiary",
                disabled && "opacity-50 cursor-not-allowed",
              )}
              style={{ minHeight: "24px", maxHeight: "200px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.metaKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>

          {/* Action Bar */}
          <div
            className={cn(
              "flex items-center justify-between px-3 py-2",
              "border-t border-foundation-bg-light-3/50 dark:border-foundation-bg-dark-3/50",
            )}
          >
            {/* Left Actions */}
            <div className="flex items-center gap-1">
              {composerLeft}

              {/* Attachment Menu */}
              <AttachmentMenu
                onAttachmentAction={onAttachmentAction}
                onMoreAction={onMoreAction}
                isWebSearchActive={isSearchEnabled}
                onWebSearchToggle={handleSearchToggle}
                open={attachmentMenuOpen}
                onOpenChange={setAttachmentMenuOpen}
              />

              {/* Research Toggle */}
              <button
                type="button"
                onClick={handleResearchToggle}
                title="Research"
                className={cn(
                  "flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue focus-visible:ring-offset-1",
                  isResearchEnabled
                    ? "bg-foundation-accent-blue/15 text-foundation-accent-blue"
                    : cn(
                        "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
                        "text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary",
                        "hover:text-foundation-text-light-primary dark:hover:text-foundation-text-dark-primary",
                      ),
                )}
              >
                <IconTelescope className="size-4" />
                {isResearchEnabled && (
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px]">
                    Research
                  </span>
                )}
              </button>
              {/* Model Badge */}
              <div
                className={cn(
                  "ml-2 px-2.5 py-1 rounded-lg",
                  "bg-foundation-accent-blue/10 text-foundation-accent-blue",
                  "text-[12px] font-medium leading-[18px] tracking-[-0.32px]",
                )}
              >
                {selectedModel.shortName}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Auto-clear */}
              <button
                type="button"
                onClick={onAutoClear}
                title="Auto-clear conversation"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-normal leading-[18px] tracking-[-0.32px]",
                  "bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-3",
                  "hover:bg-foundation-bg-light-3 dark:hover:bg-foundation-bg-dark-4",
                  "text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary",
                  "hover:text-foundation-text-light-primary dark:hover:text-foundation-text-dark-primary",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue focus-visible:ring-offset-1",
                )}
              >
                <IconRefresh className="size-4" />
                <span>Auto-clear</span>
              </button>

              {composerRight}

              {/* History */}
              <button
                type="button"
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  "text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary",
                  "hover:bg-foundation-bg-light-3 dark:hover:bg-foundation-bg-dark-3",
                  "hover:text-foundation-text-light-primary dark:hover:text-foundation-text-dark-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue focus-visible:ring-offset-1",
                )}
                title="History"
              >
                <IconClock className="size-4" />
              </button>

              {/* Voice Input */}
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue focus-visible:ring-offset-1",
                  isRecording
                    ? "bg-foundation-accent-red/15 text-foundation-accent-red"
                    : cn(
                        "text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary",
                        "hover:bg-foundation-bg-light-3 dark:hover:bg-foundation-bg-dark-3",
                        "hover:text-foundation-text-light-primary dark:hover:text-foundation-text-dark-primary",
                      ),
                )}
                title="Voice input"
              >
                <IconMic className="size-4" />
              </button>
              {/* Advanced Features */}
              <button
                type="button"
                title="Advanced features"
                className={cn(
                  "flex items-center gap-1.5 p-2 rounded-full transition-all duration-200",
                  "bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500",
                  "hover:opacity-90 hover:scale-105 active:scale-95",
                  "shadow-lg shadow-purple-500/25",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue focus-visible:ring-offset-1",
                )}
              >
                <IconHeadphones className="size-4 text-white" />
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!message.trim() || disabled}
                title="Send message (Enter)"
                className={cn(
                  "flex items-center gap-1.5 p-2 rounded-full ml-1 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue focus-visible:ring-offset-1",
                  !message.trim() || disabled
                    ? "bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-3 opacity-40 cursor-not-allowed"
                    : "bg-foundation-accent-green hover:bg-foundation-accent-green/90 hover:scale-105 active:scale-95",
                  "text-white shadow-sm",
                )}
              >
                <IconArrowUp className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

ChatInput.displayName = "ChatInput";
