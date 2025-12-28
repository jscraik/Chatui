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
  blue: "text-[var(--foundation-accent-blue)] bg-[var(--foundation-accent-blue)]/10",
  green: "text-[var(--foundation-accent-green)] bg-[var(--foundation-accent-green)]/10",
  orange: "text-[var(--foundation-accent-orange)] bg-[var(--foundation-accent-orange)]/10",
  default: "text-white/80 bg-[var(--foundation-bg-dark-2)]",
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
