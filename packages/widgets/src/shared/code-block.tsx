import type { ReactNode } from "react";
import { cn } from "@chatui/ui";

type CodeBlockProps = {
  children: ReactNode;
  className?: string;
  language?: string;
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
};

export function CodeBlock({ children, className, wrapLongLines }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "rounded-lg border border-default bg-surface-secondary p-3 text-xs font-mono text-primary overflow-x-auto",
        wrapLongLines && "whitespace-pre-wrap break-words",
        className,
      )}
    >
      <code>{children}</code>
    </pre>
  );
}
