import { sampleModels } from "../../fixtures/sample-data";

import { ChatInputBlock } from "../blocks/ChatInputBlock";

export function ChatInputTemplate() {
  return (
    <div className="min-h-[140px] bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1">
      <ChatInputBlock selectedModel={sampleModels[0]} />
    </div>
  );
}
