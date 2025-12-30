import type { ComponentProps } from "react";

import { ChatHeader } from "../../app/components/chat/ChatHeader";

export type ChatHeaderBlockProps = ComponentProps<typeof ChatHeader>;

export function ChatHeaderBlock(props: ChatHeaderBlockProps) {
  return <ChatHeader {...props} />;
}
