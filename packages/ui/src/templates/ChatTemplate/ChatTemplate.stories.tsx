import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChatTemplate } from "./ChatTemplate";

const meta: Meta<typeof ChatTemplate> = {
  title: "Templates/ChatTemplate",
  component: ChatTemplate,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    initialViewMode: "chat",
  },
};

export default meta;

type Story = StoryObj<typeof ChatTemplate>;

export const Default: Story = {};

export const ComposeMode: Story = {
  args: {
    initialViewMode: "compose",
  },
};
