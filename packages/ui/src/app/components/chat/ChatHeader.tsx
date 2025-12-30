import { Download, IconShare, IconSidebar } from "../../../icons";
import { IconButton } from "../ui/base/icon-button";
import { ModelSelector, type ModelConfig } from "../ui/navigation/model-selector";
import { ViewModeToggle } from "../ui/navigation/view-mode-toggle";

interface ChatHeaderProps {
  onSidebarToggle: () => void;
  isSidebarOpen?: boolean;
  showSidebarToggle?: boolean;
  selectedModel?: string | ModelConfig;
  onModelChange?: (model: string | ModelConfig) => void;
  models?: ModelConfig[];
  legacyModels?: ModelConfig[];
  viewMode?: "chat" | "compose";
  onViewModeChange?: (mode: "chat" | "compose") => void;
  showViewModeToggle?: boolean;
  headerRight?: React.ReactNode;
}

export function ChatHeader({
  onSidebarToggle,
  isSidebarOpen,
  showSidebarToggle = true,
  selectedModel = "Default",
  onModelChange,
  models,
  legacyModels,
  viewMode = "chat",
  onViewModeChange,
  showViewModeToggle = true,
  headerRight,
}: ChatHeaderProps) {
  const resolvedModels = models ?? [];
  const resolvedLegacyModels = legacyModels ?? [];
  const modelName = typeof selectedModel === "string" ? selectedModel : selectedModel.shortName;

  return (
    <div className="h-14 border-b border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1 flex items-center justify-between px-4 flex-shrink-0 font-foundation">
      <div className="flex items-center gap-2">
        {showSidebarToggle ? (
          <IconButton
            onClick={onSidebarToggle}
            icon={<IconSidebar />}
            variant="outline"
            size="md"
            active={isSidebarOpen}
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          />
        ) : null}

        {showViewModeToggle ? (
          <ViewModeToggle value={viewMode} onChange={onViewModeChange ?? (() => {})} />
        ) : null}

        {viewMode !== "compose" && resolvedModels.length > 0 && (
          <ModelSelector
            value={modelName}
            onChange={onModelChange ?? (() => {})}
            models={resolvedModels}
            legacyModels={resolvedLegacyModels}
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        {headerRight}

        <IconButton icon={<Download />} variant="ghost" size="sm" title="Download conversation" />
        <IconButton icon={<IconShare />} variant="ghost" size="sm" title="Share conversation" />
      </div>
    </div>
  );
}
