import type { Meta, StoryObj } from "@storybook/react";

import { ChatHeader } from "./ChatHeader";
import { Plus, Star, Settings } from "lucide-react";

const meta: Meta<typeof ChatHeader> = {
  title: "ChatUI/ChatHeader",
  component: ChatHeader,
  args: {
    isSidebarOpen: true,
    selectedModel: {
      name: "ChatGPT 5.2 Pro",
      shortName: "5.2 Pro",
      description: "Our most capable model",
    },
    viewMode: "chat",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ChatHeader>;

export const Default: Story = {
  render: (args) => (
    <div className="h-[80px] bg-[#0D0D0D]">
      <ChatHeader
        {...args}
        onSidebarToggle={() => {}}
        onModelChange={() => {}}
        onViewModeChange={() => {}}
      />
    </div>
  ),
};

export const WithCustomHeaderRight: Story = {
  render: (args) => (
    <div className="h-[80px] bg-[#0D0D0D]">
      <ChatHeader
        {...args}
        onSidebarToggle={() => {}}
        onModelChange={() => {}}
        onViewModeChange={() => {}}
        headerRight={
          <>
            <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors" aria-label="New chat">
              <Plus className="size-4 text-white/60" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors" aria-label="Star">
              <Star className="size-4 text-white/60" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors" aria-label="Settings">
              <Settings className="size-4 text-white/60" />
            </button>
          </>
        }
      />
    </div>
  ),
};

export const WithSingleAction: Story = {
  render: (args) => (
    <div className="h-[80px] bg-[#0D0D0D]">
      <ChatHeader
        {...args}
        onSidebarToggle={() => {}}
        onModelChange={() => {}}
        onViewModeChange={() => {}}
        headerRight={
          <button className="px-3 py-1.5 bg-[#2f7a4f] hover:bg-[#2a6b45] text-white rounded-lg transition-colors text-sm font-medium">
            Share Chat
          </button>
        }
      />
    </div>
  ),
};
