import type { ReactNode } from "react";

import { cn } from "../../app/components/ui/utils";

export interface TemplateFooterBarProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function TemplateFooterBar({ leading, trailing, className }: TemplateFooterBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-2 bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1 border-t border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
        className,
      )}
    >
      <div className="flex items-center gap-1">{leading}</div>
      {trailing ? <div className="flex items-center gap-1">{trailing}</div> : null}
    </div>
  );
}
