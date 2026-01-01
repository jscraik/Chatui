import { useState } from "react";

import {
  ColorsTab,
  Footer,
  Header,
  IconsTab,
  OverviewTab,
  SpacingTab,
  TabNavigation,
  TypographyTab,
  UsageTab,
  type DocTab,
} from "./docs";

/**
 * DesignSystemDocs - Main documentation page for the design system.
 * Displays design tokens, components, and usage examples across tabbed sections.
 */
export function DesignSystemDocs() {
  const [activeTab, setActiveTab] = useState<DocTab>("overview");

  return (
    <div className="min-h-screen bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-1">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "colors" && <ColorsTab />}
          {activeTab === "typography" && <TypographyTab />}
          {activeTab === "spacing" && <SpacingTab />}
          {activeTab === "icons" && <IconsTab />}
          {activeTab === "usage" && <UsageTab />}
        </div>
      </div>

      <Footer />
    </div>
  );
}
