import type { ReactNode } from "react";

import { cn } from "../../app/components/ui/utils";

export interface TemplateFormFieldProps {
  label: string;
  htmlFor?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}

export function TemplateFormField({
  label,
  htmlFor,
  description,
  actions,
  children,
  className,
  labelClassName,
  descriptionClassName,
}: TemplateFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={htmlFor}
          className={cn(
            "text-[13px] leading-5 text-foundation-text-light-primary dark:text-foundation-text-dark-primary/70",
            labelClassName,
          )}
        >
          {label}
        </label>
        {actions ? <div className="flex items-center gap-1">{actions}</div> : null}
      </div>
      {description ? (
        <p
          className={cn(
            "text-[12px] leading-4 text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
