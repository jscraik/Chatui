import { ChatInputBlock } from "./blocks/ChatInputBlock";
import { sampleModels } from "../app/data/sample-data";

export function ChatInputTemplate() {
  return (
    <div className="min-h-[140px] bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1">
      <ChatInputBlock selectedModel={sampleModels[0]} />
    </div>
  );
}
