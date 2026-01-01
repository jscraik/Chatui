import {
  IconSearch,
  IconChat,
  IconChevronRightMd,
  IconFolder,
  IconWriting,
  IconBarChart,
  IconBook,
  IconCompose,
} from "../../icons";

import type { IconType } from "./constants";

/**
 * Icon mapping helper
 * Converts icon type strings to React components
 */
export function getIcon(iconType: IconType, className: string = "size-4") {
  const iconMap: Record<IconType, React.ReactNode> = {
    chat: <IconChat className={className} />,
    folder: <IconFolder className={className} />,
    "bar-chart": <IconBarChart className={className} />,
    writing: <IconWriting className={className} />,
    book: <IconBook className={className} />,
    compose: <IconCompose className={className} />,
    search: <IconSearch className={className} />,
    "chevron-right": <IconChevronRightMd className={className} />,
  };

  return iconMap[iconType] || <IconFolder className={className} />;
}

/**
 * Get category icon
 */
export function getCategoryIcon(category: string) {
  const iconMap: Record<string, React.ReactNode> = {
    Investing: <IconBarChart className="size-3" />,
    Homework: <IconBook className="size-3" />,
    Writing: <IconWriting className="size-3" />,
    Coding: <IconCompose className="size-3" />,
    Research: <IconSearch className="size-3" />,
  };

  return iconMap[category] || <IconFolder className="size-3" />;
}
