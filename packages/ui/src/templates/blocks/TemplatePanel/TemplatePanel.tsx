import { createContext, type ReactNode, useCallback, useContext, useState } from "react";

import { ScrollArea } from "../../../components/ui/base/scroll-area";
import { cn } from "../../../components/ui/utils";

// Context for panel state management
interface TemplatePanelContextValue {
  isCollapsed: boolean;
  isLoading: boolean;
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

const TemplatePanelContext = createContext<TemplatePanelContextValue | null>(null);

export function useTemplatePanel() {
  const context = useContext(TemplatePanelContext);
  if (!context) {
    throw new Error("useTemplatePanel must be used within a TemplatePanel");
  }
  return context;
}

export type TemplatePanelVariant = "default" | "elevated" | "outlined" | "ghost";
export type TemplatePanelSize = "sm" | "md" | "lg";

export interface TemplatePanelProps {
  /** Header content slot */
  header?: ReactNode;
  /** Footer content slot */
  footer?: ReactNode;
  /** Main body content */
  children: ReactNode;
  /** Additional class names for the root container */
  className?: string;
  /** Additional class names for the body section */
  bodyClassName?: string;
  /** Additional class names for the header section */
  headerClassName?: string;
  /** Additional class names for the footer section */
  footerClassName?: string;
  /** Visual variant of the panel */
  variant?: TemplatePanelVariant;
  /** Size preset affecting padding and border radius */
  size?: TemplatePanelSize;
  /** Whether the panel body is collapsible */
  collapsible?: boolean;
  /** Whether the panel starts collapsed */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Whether the panel is in a loading state */
  loading?: boolean;
  /** Whether body content should scroll */
  scrollable?: boolean;
  /** Maximum height for scrollable body */
  maxBodyHeight?: number | string;
  /** Whether to show dividers between header/body/footer */
  showDividers?: boolean;
  /** Whether to animate transitions */
  animated?: boolean;
  /** Accessible label for the panel */
  "aria-label"?: string;
  /** ID for the panel */
  id?: string;
}

const variantStyles: Record<TemplatePanelVariant, string> = {
  default:
    "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-2 border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 shadow-sm",
  elevated:
    "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-2 border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 shadow-lg",
  outlined: "bg-transparent border-2 border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
  ghost: "bg-transparent border-none shadow-none",
};

const sizeStyles: Record<TemplatePanelSize, { padding: string; radius: string }> = {
  sm: { padding: "p-3", radius: "rounded-md" },
  md: { padding: "p-4", radius: "rounded-lg" },
  lg: { padding: "p-6", radius: "rounded-xl" },
};

export function TemplatePanel({
  header,
  footer,
  children,
  className,
  bodyClassName,
  headerClassName,
  footerClassName,
  variant = "default",
  size = "md",
  collapsible = false,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapseChange,
  loading = false,
  scrollable = false,
  maxBodyHeight,
  showDividers = true,
  animated = true,
  "aria-label": ariaLabel,
  id,
}: TemplatePanelProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  const isControlled = controlledCollapsed !== undefined;
  const isCollapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const setCollapsed = useCallback(
    (collapsed: boolean) => {
      if (!isControlled) {
        setInternalCollapsed(collapsed);
      }
      onCollapseChange?.(collapsed);
    },
    [isControlled, onCollapseChange],
  );

  const toggleCollapse = useCallback(() => {
    if (collapsible) {
      setCollapsed(!isCollapsed);
    }
  }, [collapsible, isCollapsed, setCollapsed]);

  const contextValue: TemplatePanelContextValue = {
    isCollapsed,
    isLoading: loading,
    toggleCollapse,
    setCollapsed,
  };

  const transitionClasses = animated ? "transition-all duration-200 ease-in-out" : "";

  const dividerClasses = showDividers
    ? "border-foundation-bg-light-3 dark:border-foundation-bg-dark-3"
    : "border-transparent";

  const { padding, radius } = sizeStyles[size];

  const maxHeightValue = typeof maxBodyHeight === "number" ? `${maxBodyHeight}px` : maxBodyHeight;

  const bodyContent = (
    <div
      className={cn(
        "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1",
        padding,
        transitionClasses,
        collapsible && isCollapsed && "h-0 overflow-hidden opacity-0 !p-0",
        bodyClassName,
      )}
      style={scrollable && maxBodyHeight ? { maxHeight: maxHeightValue } : undefined}
      aria-hidden={collapsible && isCollapsed}
    >
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary">
            <svg className="size-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );

  return (
    <TemplatePanelContext.Provider value={contextValue}>
      <div
        id={id}
        className={cn(
          "overflow-hidden",
          variantStyles[variant],
          radius,
          transitionClasses,
          className,
        )}
        aria-label={ariaLabel}
        role={ariaLabel ? "region" : undefined}
      >
        {/* Header */}
        {header ? (
          <div className={cn("shrink-0 border-b", dividerClasses, headerClassName)}>{header}</div>
        ) : null}

        {/* Body */}
        {scrollable && !isCollapsed ? (
          <ScrollArea
            className="w-full"
            style={maxBodyHeight ? { maxHeight: maxHeightValue } : undefined}
          >
            {bodyContent}
          </ScrollArea>
        ) : (
          bodyContent
        )}

        {/* Footer */}
        {footer && (!collapsible || !isCollapsed) ? (
          <div
            className={cn("shrink-0 border-t", dividerClasses, transitionClasses, footerClassName)}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </TemplatePanelContext.Provider>
  );
}

// Compound component for panel header with collapse toggle
export interface TemplatePanelHeaderProps {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  showCollapseToggle?: boolean;
  className?: string;
}

export function TemplatePanelHeader({
  title,
  subtitle,
  leading,
  trailing,
  showCollapseToggle = false,
  className,
}: TemplatePanelHeaderProps) {
  const context = useContext(TemplatePanelContext);
  const isCollapsed = context?.isCollapsed ?? false;
  const toggleCollapse = context?.toggleCollapse;

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {leading}
        <div>
          <h3 className="text-sm font-medium text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {trailing}
        {showCollapseToggle && toggleCollapse && (
          <button
            type="button"
            onClick={toggleCollapse}
            className={cn(
              "inline-flex items-center justify-center rounded-md p-1.5",
              "text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary",
              "hover:bg-foundation-bg-light-3 dark:hover:bg-foundation-bg-dark-3",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
              "transition-colors duration-150",
            )}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? "Expand panel" : "Collapse panel"}
          >
            <svg
              className={cn(
                "size-4 transition-transform duration-200",
                isCollapsed && "-rotate-90",
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// Compound component for panel footer with actions
export interface TemplatePanelFooterProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function TemplatePanelFooter({ leading, trailing, className }: TemplatePanelFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2",
        className,
      )}
    >
      <div className="flex items-center gap-2">{leading}</div>
      <div className="flex items-center gap-2">{trailing}</div>
    </div>
  );
}
