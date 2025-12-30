import { cn } from "../utils";

export interface ModelBadgeProps {
  /** Model name to display */
  name: string;
  /** Color variant */
  variant?: "blue" | "green" | "orange" | "default";
  /** Size variant */
  size?: "sm" | "md";
  /** Additional CSS classes */
  className?: string;
}

const variantStyles = {
  blue: "text-foundation-text-light-primary dark:text-foundation-text-dark-primary bg-foundation-accent-blue/10 dark:bg-foundation-accent-blue/20",
  green:
    "text-foundation-text-light-primary dark:text-foundation-text-dark-primary bg-foundation-accent-green/10 dark:bg-foundation-accent-green/20",
  orange:
    "text-foundation-text-light-primary dark:text-foundation-text-dark-primary bg-foundation-accent-orange/10 dark:bg-foundation-accent-orange/20",
  default: "text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-3",
};

/**
 * ModelBadge - A badge displaying the current model name
 *
 * @example
 * ```tsx
 * <ModelBadge name="GPT-4o" variant="blue" />
 * ```
 */
export function ModelBadge({ name, variant = "blue", size = "sm", className }: ModelBadgeProps) {
  const sizes = {
    sm: "px-2 py-1 text-[11px] leading-4",
    md: "px-3 py-1.5 text-[12px] leading-[18px]",
  };

  return (
    <div className={cn("rounded-md font-medium", variantStyles[variant], sizes[size], className)}>
      {name}
    </div>
  );
}

ModelBadge.displayName = "ModelBadge";
