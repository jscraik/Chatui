import { useState } from "react";

import { ChatVariantSplitSidebar } from "../app/components/chat/chat-variants";
import {
  sampleCategories,
  sampleCategoryColors,
  sampleCategoryIconColors,
  sampleCategoryIcons,
  sampleChatHistory,
  sampleComposeModes,
  sampleGroupChats,
  sampleLegacyModels,
  sampleMessages,
  sampleModels,
  sampleProjects,
  sampleUser,
} from "../app/data/sample-data";

export interface ChatTemplateProps {
  initialViewMode?: "chat" | "compose";
}

export function ChatTemplate({ initialViewMode = "chat" }: ChatTemplateProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState(sampleModels[0]);
  const [viewMode, setViewMode] = useState<"chat" | "compose">(initialViewMode);

  return (
    <div className="h-full w-full">
      <ChatVariantSplitSidebar
        sidebarOpen={isSidebarOpen}
        onSidebarOpenChange={setIsSidebarOpen}
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
        composeModels={sampleModels}
        composeModes={sampleComposeModes}
        messages={sampleMessages}
        projects={sampleProjects}
        chatHistory={sampleChatHistory}
        groupChats={sampleGroupChats}
        categories={sampleCategories}
        categoryIcons={sampleCategoryIcons}
        categoryColors={sampleCategoryColors}
        categoryIconColors={sampleCategoryIconColors}
        user={sampleUser}
      />
    </div>
  );
}
