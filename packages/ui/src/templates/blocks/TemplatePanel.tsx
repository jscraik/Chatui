import type { ReactNode } from "react";

import { cn } from "../../app/components/ui/utils";

export interface TemplatePanelProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function TemplatePanel({
  header,
  footer,
  children,
  className,
  bodyClassName,
}: TemplatePanelProps) {
  return (
    <div
      className={cn(
        "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1 border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 rounded-lg overflow-hidden",
        className,
      )}
    >
      {header ? <div className="shrink-0">{header}</div> : null}
      <div className={cn("bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1", bodyClassName)}>
        {children}
      </div>
      {footer ? <div className="shrink-0">{footer}</div> : null}
    </div>
  );
}
