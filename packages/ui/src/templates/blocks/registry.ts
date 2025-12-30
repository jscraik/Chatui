import { useState } from "react";

import { IconCheckmark, IconChevronDownMd } from "../../icons";
import {
  sampleCategories,
  sampleCategoryColors,
  sampleCategoryIconColors,
  sampleCategoryIcons,
  sampleChatHistory,
  sampleLegacyModels,
  sampleMessages,
  sampleModels,
  sampleProjects,
  sampleUser,
} from "../../app/data/sample-data";

import { ChatHeaderBlock } from "./ChatHeaderBlock";
import { ChatInputBlock } from "./ChatInputBlock";
import { ChatMessagesBlock } from "./ChatMessagesBlock";
import { ChatSidebarBlock } from "./ChatSidebarBlock";
import { SettingDropdownBlock } from "./SettingDropdownBlock";
import { SettingRowBlock } from "./SettingRowBlock";
import { SettingToggleBlock } from "./SettingToggleBlock";
import { TemplateFieldGroup } from "./TemplateFieldGroup";
import { TemplateFooterBar } from "./TemplateFooterBar";
import { TemplateFormField } from "./TemplateFormField";
import { TemplateHeaderBar } from "./TemplateHeaderBar";
import { TemplatePanel } from "./TemplatePanel";
import { TemplateShell } from "./TemplateShell";

export type BlockId =
  | "template-shell"
  | "template-panel"
  | "template-header-bar"
  | "template-footer-bar"
  | "template-form-field"
  | "template-field-group"
  | "chat-header"
  | "chat-sidebar"
  | "chat-messages"
  | "chat-input"
  | "setting-row"
  | "setting-toggle"
  | "setting-dropdown";

export type BlockDefinition = {
  id: BlockId;
  title: string;
  description: string;
  Component: () => JSX.Element;
};

function TemplateShellSample() {
  return (
    <TemplateShell
      sidebar={<div className="w-[200px] h-full bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2" />}
      header={<div className="px-4 py-2 text-sm">Header slot</div>}
      body={<div className="p-4 text-sm">Body slot</div>}
      footer={<div className="px-4 py-2 text-sm">Footer slot</div>}
      detail={<div className="w-[200px] h-full bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2" />}
    />
  );
}

function TemplatePanelSample() {
  return (
    <TemplatePanel
      header={<TemplateHeaderBar title="Panel Header" />}
      footer={<TemplateFooterBar leading={<span className="text-xs">Footer</span>} />}
    >
      <div className="p-4 text-sm text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary">
        TemplatePanel content.
      </div>
    </TemplatePanel>
  );
}

function TemplateHeaderBarSample() {
  return (
    <TemplateHeaderBar
      title="Header Bar"
      trailing={
        <button type="button" className="text-xs px-2 py-1 rounded bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-3">
          Action
        </button>
      }
    />
  );
}

function TemplateFooterBarSample() {
  return (
    <TemplateFooterBar
      leading={<span className="text-xs">Left</span>}
      trailing={<span className="text-xs">Right</span>}
    />
  );
}

function TemplateFormFieldSample() {
  return (
    <TemplateFormField label="Label">
      <input
        className="w-full rounded-lg border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 px-3 py-2 bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2 text-sm"
        placeholder="Input"
        aria-label="Template form field input"
      />
    </TemplateFormField>
  );
}

function TemplateFieldGroupSample() {
  const [value, setValue] = useState("");

  return (
    <TemplateFieldGroup
      label="Field Group"
      actions={
        <button type="button" className="text-xs px-2 py-1 rounded bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-3">
          Help
        </button>
      }
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 px-3 py-2 bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2 text-sm"
        placeholder="Text area"
        aria-label="Template field group input"
      />
    </TemplateFieldGroup>
  );
}

function ChatHeaderBlockSample() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"chat" | "compose">("chat");
  const [selectedModel, setSelectedModel] = useState(sampleModels[0]);

  return (
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
  );
}

function ChatSidebarBlockSample() {
  return (
    <ChatSidebarBlock
      isOpen={true}
      projects={sampleProjects}
      chatHistory={sampleChatHistory}
      categories={sampleCategories}
      categoryIcons={sampleCategoryIcons}
      categoryColors={sampleCategoryColors}
      categoryIconColors={sampleCategoryIconColors}
      user={sampleUser}
    />
  );
}

function ChatMessagesBlockSample() {
  return <ChatMessagesBlock messages={sampleMessages} />;
}

function ChatInputBlockSample() {
  return <ChatInputBlock selectedModel={sampleModels[0]} />;
}

function SettingRowBlockSample() {
  return (
    <SettingRowBlock
      label="Setting Row"
      description="Secondary description text."
      right={<IconChevronDownMd className="size-3.5 text-foundation-icon-light-secondary dark:text-foundation-icon-dark-secondary" />}
    />
  );
}

function SettingToggleBlockSample() {
  const [checked, setChecked] = useState(true);

  return (
    <SettingToggleBlock
      checked={checked}
      onCheckedChange={setChecked}
      label="Toggle Setting"
      description="Enable or disable this setting."
      icon={<IconCheckmark className="size-4 text-foundation-accent-green" />}
    />
  );
}

function SettingDropdownBlockSample() {
  const [value, setValue] = useState("default");

  return (
    <SettingDropdownBlock
      label="Dropdown Setting"
      value={value}
      onValueChange={setValue}
      options={[
        { value: "default", label: "Default" },
        { value: "compact", label: "Compact" },
      ]}
      description="Select a density mode."
    />
  );
}

export const blockRegistry: BlockDefinition[] = [
  {
    id: "template-shell",
    title: "Template Shell",
    description: "Layout shell with sidebar/header/body/footer/detail slots.",
    Component: TemplateShellSample,
  },
  {
    id: "template-panel",
    title: "Template Panel",
    description: "Card container with header and footer slots.",
    Component: TemplatePanelSample,
  },
  {
    id: "template-header-bar",
    title: "Template Header Bar",
    description: "Header bar with title + actions.",
    Component: TemplateHeaderBarSample,
  },
  {
    id: "template-footer-bar",
    title: "Template Footer Bar",
    description: "Footer bar with leading/trailing actions.",
    Component: TemplateFooterBarSample,
  },
  {
    id: "template-form-field",
    title: "Template Form Field",
    description: "Label + content stack for a single field.",
    Component: TemplateFormFieldSample,
  },
  {
    id: "template-field-group",
    title: "Template Field Group",
    description: "Label + actions + content group.",
    Component: TemplateFieldGroupSample,
  },
  {
    id: "chat-header",
    title: "Chat Header Block",
    description: "Header with view mode toggle and model menu.",
    Component: ChatHeaderBlockSample,
  },
  {
    id: "chat-sidebar",
    title: "Chat Sidebar Block",
    description: "Sidebar for chat navigation.",
    Component: ChatSidebarBlockSample,
  },
  {
    id: "chat-messages",
    title: "Chat Messages Block",
    description: "Message list with assistant/user content.",
    Component: ChatMessagesBlockSample,
  },
  {
    id: "chat-input",
    title: "Chat Input Block",
    description: "Composer with send action.",
    Component: ChatInputBlockSample,
  },
  {
    id: "setting-row",
    title: "Setting Row Block",
    description: "Reusable settings row.",
    Component: SettingRowBlockSample,
  },
  {
    id: "setting-toggle",
    title: "Setting Toggle Block",
    description: "Toggle row for settings.",
    Component: SettingToggleBlockSample,
  },
  {
    id: "setting-dropdown",
    title: "Setting Dropdown Block",
    description: "Dropdown selector for settings.",
    Component: SettingDropdownBlockSample,
  },
];

export const getBlock = (id: BlockId) => blockRegistry.find((block) => block.id === id);
