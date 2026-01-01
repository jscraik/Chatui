import { sampleMessages } from "../../fixtures/sample-data";

import { ChatMessagesBlock } from "../blocks/ChatMessagesBlock";

export function ChatMessagesTemplate() {
  return (
    <div className="min-h-[520px] bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1">
      <ChatMessagesBlock messages={sampleMessages} />
    </div>
  );
}
