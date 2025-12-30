import type { ReactNode } from "react";

import { cn } from "../../app/components/ui/utils";

export interface TemplateShellProps {
  sidebar?: ReactNode;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  detail?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function TemplateShell({
  sidebar,
  header,
  body,
  footer,
  detail,
  className,
  contentClassName,
}: TemplateShellProps) {
  return (
    <div className={cn("flex h-full w-full min-h-0", className)}>
      {sidebar ? <aside className="shrink-0 h-full">{sidebar}</aside> : null}
      <section className={cn("flex-1 min-w-0 min-h-0 flex flex-col", contentClassName)}>
        {header ? <div className="shrink-0">{header}</div> : null}
        {body ? <div className="flex-1 min-h-0">{body}</div> : null}
        {footer ? <div className="shrink-0">{footer}</div> : null}
      </section>
      {detail ? <aside className="shrink-0 h-full">{detail}</aside> : null}
    </div>
  );
}
