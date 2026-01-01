import type { ComponentProps } from "react";

import { ChatInput } from "../../../app/chat/ChatInput";

export type ChatInputBlockProps = ComponentProps<typeof ChatInput>;

export function ChatInputBlock(props: ChatInputBlockProps) {
  return <ChatInput {...props} />;
}
