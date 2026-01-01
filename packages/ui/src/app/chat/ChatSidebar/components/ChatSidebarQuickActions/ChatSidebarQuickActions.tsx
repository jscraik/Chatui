import { IconChat, IconFolder, IconDotsHorizontal } from "../../../../../icons";

import type { SidebarItem } from "../../../types";

interface ChatSidebarQuickActionsProps {
  selectedAction: string;
  projectsData: SidebarItem[];
  projectsExpanded: boolean;
  onNewChatClick: (actionId: string) => void;
  onNewProjectClick: () => void;
  onProjectSelect: (project: SidebarItem) => void;
  onProjectIconClick: (project: SidebarItem) => void;
  onToggleExpanded: () => void;
}

/**
 * ChatSidebarQuickActions - Internal module
 * Renders "ChatGPT", "New project", projects list, "See more/less"
 *
 * Following best practice:
 * - Parent owns state; children are pure render + callbacks
 * - No new exports during stabilization
 */
export function ChatSidebarQuickActions({
  selectedAction,
  projectsData,
  projectsExpanded,
  onNewChatClick,
  onNewProjectClick,
  onProjectSelect,
  onProjectIconClick,
  onToggleExpanded,
}: ChatSidebarQuickActionsProps) {
  const displayedProjects = projectsExpanded ? projectsData : projectsData.slice(0, 3);

  return (
    <div className="px-3 space-y-0.5">
      {/* ChatGPT */}
      <button
        onClick={() => onNewChatClick("chatgpt")}
        className="w-full flex items-center gap-3 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors group"
      >
        <IconChat className="size-4 flex-shrink-0" />
        <span className="text-body-small font-normal">ChatGPT</span>
      </button>

      {/* New Project */}
      <button
        onClick={onNewProjectClick}
        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors group"
      >
        <IconFolder className="size-4 flex-shrink-0" />
        <span className="text-body-small font-normal">New project</span>
      </button>

      {/* Projects List */}
      {displayedProjects.map((project) => (
        <button
          key={project.id}
          onClick={() => onProjectSelect(project)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
            selectedAction === project.id ? "bg-muted" : "hover:bg-muted"
          }`}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onProjectIconClick(project);
            }}
            className={`flex-shrink-0 ${project.color ?? ""} hover:opacity-70 transition-opacity cursor-pointer`}
          >
            {project.icon}
          </div>
          <span className="text-body-small font-normal">{project.label}</span>
        </button>
      ))}

      {/* See More/Less */}
      {projectsData.length > 3 && (
        <button
          onClick={onToggleExpanded}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
        >
          <IconDotsHorizontal className="size-4 flex-shrink-0" />
          <span className="text-body-small font-normal">
            {projectsExpanded ? "See less" : "See more"}
          </span>
        </button>
      )}
    </div>
  );
}
