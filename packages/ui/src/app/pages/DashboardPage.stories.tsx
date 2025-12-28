import type { Meta, StoryObj } from "@storybook/react";

import { Button, ListItem } from "../components/ui";

import { DashboardPage } from "./DashboardPage";

const meta: Meta<typeof DashboardPage> = {
  title: "Pages/DashboardPage",
  component: DashboardPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onNavigate: { action: "navigate" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithToolOutput: Story = {
  args: {
    headerSlot: <div className="text-secondary text-sm">Tool-driven dashboard</div>,
    stats: [
      { label: "Active Projects", value: "12", change: "+2" },
      { label: "Weekly Runs", value: "438", change: "+18%" },
      { label: "Open Issues", value: "7", change: "-3" },
      { label: "Avg Response", value: "1.1s", change: "-6%" },
    ],
    recentChats: [
      { id: "t-1", title: "Release Readiness", model: "GPT-4o", time: "5 min ago" },
      { id: "t-2", title: "A11y Audit Review", model: "GPT-4", time: "2 hours ago" },
      { id: "t-3", title: "Partner Onboarding", model: "Claude", time: "Yesterday" },
    ],
  },
};

export const WithCustomHeader: Story = {
  args: {
    headerSlot: (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Export
        </Button>
        <Button size="sm">Upgrade</Button>
      </div>
    ),
  },
};

export const WithSidebar: Story = {
  args: {
    sidebarSlot: (
      <div className="space-y-4">
        <h3 className="text-primary font-medium">Quick Links</h3>
        <div className="space-y-1">
          <ListItem onClick={() => console.log("Analytics")}>📊 Analytics</ListItem>
          <ListItem onClick={() => console.log("Reports")}>📈 Reports</ListItem>
          <ListItem onClick={() => console.log("Export")}>💾 Export Data</ListItem>
          <ListItem onClick={() => console.log("Settings")}>⚙️ Settings</ListItem>
        </div>
      </div>
    ),
  },
};

export const FullyCustomized: Story = {
  args: {
    headerSlot: (
      <div className="flex items-center gap-3">
        <span className="text-secondary text-sm">Last updated: 2 min ago</span>
        <Button variant="outline" size="sm">
          Refresh
        </Button>
        <Button size="sm">Export</Button>
      </div>
    ),
    sidebarSlot: (
      <div className="space-y-6">
        <div>
          <h3 className="text-primary font-medium mb-3">Navigation</h3>
          <div className="space-y-1">
            <ListItem active>📊 Dashboard</ListItem>
            <ListItem>💬 Chats</ListItem>
            <ListItem>📈 Analytics</ListItem>
            <ListItem>⚙️ Settings</ListItem>
          </div>
        </div>

        <div>
          <h3 className="text-primary font-medium mb-3">Recent</h3>
          <div className="space-y-1">
            <ListItem>Code Review</ListItem>
            <ListItem>Planning Session</ListItem>
            <ListItem>Debug Help</ListItem>
          </div>
        </div>
      </div>
    ),
  },
};
