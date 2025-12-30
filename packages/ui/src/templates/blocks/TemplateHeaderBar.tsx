import type { ReactNode } from "react";

import { cn } from "../../app/components/ui/utils";

export interface TemplateHeaderBarProps {
  title: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function TemplateHeaderBar({
  title,
  leading,
  trailing,
  className,
  titleClassName,
}: TemplateHeaderBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-[15px] leading-6 text-foundation-text-light-primary dark:text-foundation-text-dark-primary font-medium",
            titleClassName,
          )}
        >
          {title}
        </span>
        {leading}
      </div>
      {trailing ? <div className="flex items-center gap-2">{trailing}</div> : null}
    </div>
  );
}
