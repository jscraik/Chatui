import type { ComponentProps } from "react";

import { ChatSidebar } from "../../../app/chat/ChatSidebar";

export type ChatSidebarBlockProps = ComponentProps<typeof ChatSidebar>;

export function ChatSidebarBlock(props: ChatSidebarBlockProps) {
  return <ChatSidebar {...props} />;
}
