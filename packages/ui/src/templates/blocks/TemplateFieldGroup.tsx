import type { ReactNode } from "react";

import { cn } from "../../app/components/ui/utils";

export interface TemplateFieldGroupProps {
  label: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
}

export function TemplateFieldGroup({
  label,
  actions,
  children,
  className,
  labelClassName,
}: TemplateFieldGroupProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <label
          className={cn(
            "text-[13px] leading-5 text-foundation-text-light-primary dark:text-foundation-text-dark-primary/70",
            labelClassName,
          )}
        >
          {label}
        </label>
        {actions ? <div className="flex items-center gap-1">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}
