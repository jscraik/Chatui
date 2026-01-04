import { type ReactNode, useState, useId } from "react";

import { cn } from "./ui/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export type SettingDropdownBlockVariant = "default" | "card" | "compact" | "inline";
export type SettingDropdownBlockSize = "sm" | "md" | "lg";

export interface SettingDropdownOption {
  /** Unique value for the option */
  value: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Group label (for grouped options) */
  group?: string;
}

export interface SettingDropdownBlockProps {
  /** Main label text */
  label: string;
  /** Current selected value */
  value: string;
  /** Available options */
  options: SettingDropdownOption[];
  /** Callback when value changes */
  onValueChange: (value: string) => void;
  /** Description text below the row */
  description?: string;
  /** Dropdown alignment */
  align?: "start" | "end" | "center";
  /** Additional class names */
  className?: string;
  /** Visual variant */
  variant?: SettingDropdownBlockVariant;
  /** Size preset */
  size?: SettingDropdownBlockSize;
  /** Icon displayed before the label */
  icon?: ReactNode;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Whether the dropdown is in a loading state */
  loading?: boolean;
  /** Placeholder when no value is selected */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Whether to show a divider below */
  divider?: boolean;
  /** Badge next to the label */
  badge?: ReactNode;
  /** Minimum width for the dropdown menu */
  menuWidth?: number | string;
  /** Whether to show search input in dropdown */
  searchable?: boolean;
  /** ID for the dropdown */
  id?: string;
}

const variantStyles: Record<SettingDropdownBlockVariant, { container: string; trigger: string }> = {
  default: {
    container: "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-2 rounded-lg",
    trigger: "hover:bg-foundation-bg-light-3 dark:hover:bg-foundation-bg-dark-3",
  },
  card: {
    container:
      "bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2 border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 rounded-lg",
    trigger: "hover:bg-foundation-bg-light-3 dark:hover:bg-foundation-bg-dark-3",
  },
  compact: {
    container: "",
    trigger: "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-2",
  },
  inline: {
    container: "",
    trigger: "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-2",
  },
};

const sizeStyles: Record<
  SettingDropdownBlockSize,
  { padding: string; label: string; description: string; trigger: string; icon: string }
> = {
  sm: {
    padding: "px-2.5 py-2",
    label: "text-xs",
    description: "text-[11px]",
    trigger: "px-2 py-1 text-xs",
    icon: "size-4",
  },
  md: {
    padding: "px-3 py-2.5",
    label: "text-sm",
    description: "text-xs",
    trigger: "px-3 py-1.5 text-sm",
    icon: "size-5",
  },
  lg: {
    padding: "px-4 py-3",
    label: "text-base",
    description: "text-sm",
    trigger: "px-4 py-2 text-base",
    icon: "size-6",
  },
};

export function SettingDropdownBlock({
  label,
  value,
  options,
  onValueChange,
  description,
  align = "end",
  className,
  variant = "default",
  size = "md",
  icon,
  disabled = false,
  loading = false,
  placeholder = "Select...",
  error,
  divider = false,
  badge,
  menuWidth = 270,
  searchable = false,
  id,
}: SettingDropdownBlockProps) {
  const generatedId = useId();
  const dropdownId = id ?? generatedId;
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const { container, trigger: triggerVariant } = variantStyles[variant];
  const {
    padding,
    label: labelSize,
    description: descriptionSize,
    trigger: triggerSize,
    icon: iconSize,
  } = sizeStyles[size];

  const menuWidthValue = typeof menuWidth === "number" ? `${menuWidth}px` : menuWidth;

  // Filter options based on search
  const filteredOptions =
    searchable && searchQuery
      ? options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opt.description?.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : options;

  // Group options
  const groupedOptions = filteredOptions.reduce<Record<string, SettingDropdownOption[]>>(
    (acc, opt) => {
      const group = opt.group ?? "";
      if (!acc[group]) acc[group] = [];
      acc[group].push(opt);
      return acc;
    },
    {},
  );

  const handleValueChange = (newValue: string) => {
    onValueChange(newValue);
    setSearchQuery("");
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchQuery("");
    }
  };

  return (
    <div
      className={cn(
        divider && "border-b border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between transition-colors",
          padding,
          container,
          disabled && "opacity-50 pointer-events-none",
        )}
      >
        {/* Left side: Icon + Label */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && (
            <span
              className={cn(
                "shrink-0 text-foundation-icon-light-secondary dark:text-foundation-icon-dark-secondary",
                iconSize,
              )}
            >
              {icon}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <label
                htmlFor={dropdownId}
                className={cn(
                  "font-medium text-foundation-text-light-primary dark:text-foundation-text-dark-primary truncate",
                  labelSize,
                )}
              >
                {label}
              </label>
              {badge}
            </div>
          </div>
        </div>

        {/* Right side: Dropdown trigger */}
        <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild disabled={disabled || loading}>
            <button
              id={dropdownId}
              type="button"
              className={cn(
                "flex items-center gap-1.5 rounded-md transition-colors",
                triggerSize,
                triggerVariant,
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
                error && "ring-1 ring-foundation-accent-red",
              )}
              aria-label={label}
            >
              {loading ? (
                <svg
                  className="size-4 animate-spin text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary"
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
              ) : (
                <>
                  <span className="text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary truncate max-w-[150px]">
                    {selectedOption?.label ?? placeholder}
                  </span>
                  <svg
                    className={cn(
                      "size-3.5 text-foundation-icon-light-secondary dark:text-foundation-icon-dark-secondary transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={align}
            className={cn(
              "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-2 border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
            )}
            style={{ minWidth: menuWidthValue }}
          >
            {/* Search input */}
            {searchable && (
              <>
                <div className="px-2 pb-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    aria-label="Search options"
                    className={cn(
                      "w-full px-3 py-1.5 text-sm rounded-md",
                      "bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-3",
                      "text-foundation-text-light-primary dark:text-foundation-text-dark-primary",
                      "placeholder:text-foundation-text-light-tertiary dark:placeholder:text-foundation-text-dark-tertiary",
                      "border border-foundation-bg-light-3 dark:border-foundation-bg-dark-4",
                      "focus:outline-none focus:ring-2 focus:ring-foundation-accent-blue",
                    )}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <DropdownMenuSeparator />
              </>
            )}

            {/* Options */}
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuRadioGroup value={value} onValueChange={handleValueChange}>
                {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                  <div key={group || "default"}>
                    {group && (
                      <DropdownMenuLabel className="text-[11px] font-medium uppercase tracking-wider text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary">
                        {group}
                      </DropdownMenuLabel>
                    )}
                    {groupOptions.map((option) => (
                      <DropdownMenuRadioItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className={cn(
                          "hover:bg-foundation-bg-light-2 dark:hover:bg-foundation-bg-dark-3",
                          "focus:bg-foundation-bg-light-2 dark:focus:bg-foundation-bg-dark-3",
                          "data-[state=checked]:bg-foundation-bg-light-2 dark:data-[state=checked]:bg-foundation-bg-dark-3",
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {option.icon && (
                              <span className="shrink-0 text-foundation-icon-light-secondary dark:text-foundation-icon-dark-secondary">
                                {option.icon}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-foundation-text-light-primary dark:text-foundation-text-dark-primary truncate">
                                {option.label}
                              </div>
                              {option.description && (
                                <div className="text-xs text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary mt-0.5 line-clamp-2">
                                  {option.description}
                                </div>
                              )}
                            </div>
                          </div>
                          {value === option.value && (
                            <svg
                              className="size-4 text-foundation-accent-blue shrink-0 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </DropdownMenuRadioItem>
                    ))}
                    {group && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuRadioGroup>
              {filteredOptions.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary">
                  No options found
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      {description && !error && (
        <p
          className={cn(
            "text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary mt-1",
            padding,
            "pt-0",
            descriptionSize,
          )}
        >
          {description}
        </p>
      )}

      {/* Error message */}
      {error && (
        <div
          className={cn(
            "flex items-center gap-1.5 text-foundation-accent-red mt-1",
            padding,
            "pt-0",
            descriptionSize,
          )}
          role="alert"
        >
          <svg
            className="size-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// Compound component for dropdown group
export interface SettingDropdownGroupProps {
  children: ReactNode;
  label?: string;
  description?: string;
  className?: string;
}

export function SettingDropdownGroup({
  children,
  label,
  description,
  className,
}: SettingDropdownGroupProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {(label || description) && (
        <div className="px-3 py-2">
          {label && (
            <h3 className="text-sm font-medium text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
              {label}
            </h3>
          )}
          {description && (
            <p className="text-xs text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="divide-y divide-foundation-bg-light-3 dark:divide-foundation-bg-dark-3">
        {children}
      </div>
    </div>
  );
}
