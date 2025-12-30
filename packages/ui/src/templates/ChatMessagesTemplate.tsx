import { ChatMessagesBlock } from "./blocks/ChatMessagesBlock";
import { sampleMessages } from "../app/data/sample-data";

export function ChatMessagesTemplate() {
  return (
    <div className="min-h-[520px] bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1">
      <ChatMessagesBlock messages={sampleMessages} />
    </div>
  );
}
