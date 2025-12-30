import type { ComponentProps } from "react";

import { ChatMessages } from "../../app/components/chat/ChatMessages";

export type ChatMessagesBlockProps = ComponentProps<typeof ChatMessages>;

export function ChatMessagesBlock(props: ChatMessagesBlockProps) {
  return <ChatMessages {...props} />;
}
