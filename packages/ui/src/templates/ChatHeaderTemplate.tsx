import { useState } from "react";

import { ChatHeaderBlock } from "./blocks/ChatHeaderBlock";
import { sampleLegacyModels, sampleModels } from "../app/data/sample-data";

export function ChatHeaderTemplate() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"chat" | "compose">("chat");
  const [selectedModel, setSelectedModel] = useState(sampleModels[0]);

  return (
    <div className="min-h-[120px] bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1">
      <ChatHeaderBlock
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((prev) => !prev)}
        selectedModel={selectedModel}
        onModelChange={(model) => {
          if (typeof model === "string") {
            const resolved = [...sampleModels, ...sampleLegacyModels].find(
              (candidate) => candidate.name === model || candidate.shortName === model,
            );
            if (resolved) setSelectedModel(resolved);
            return;
          }
          setSelectedModel(model);
        }}
        models={sampleModels}
        legacyModels={sampleLegacyModels}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  );
}
