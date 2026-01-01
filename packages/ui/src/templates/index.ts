// ============================================================================
// ORIGINAL TEMPLATES
// ============================================================================

export * from "./ChatTwoPaneTemplate";
export * from "./ChatFullWidthTemplate";
export * from "./DashboardTemplate";
export * from "./ComposeTemplate";
export * from "./ChatTemplate";
export * from "./ChatHeaderTemplate";
export * from "./ChatSidebarTemplate";
export * from "./ChatMessagesTemplate";
export * from "./ChatInputTemplate";
export * from "./ChatVariantsTemplate";
export * from "./AppsPanelTemplate";
export * from "./ArchivedChatsPanelTemplate";
export * from "./AudioSettingsPanelTemplate";
export * from "./CheckForUpdatesPanelTemplate";
export * from "./DataControlsPanelTemplate";
export * from "./ManageAppsPanelTemplate";
export * from "./NotificationsPanelTemplate";
export * from "./PersonalizationPanelTemplate";
export * from "./SecurityPanelTemplate";

// ============================================================================
// NEW TEMPLATES FROM FIGMA EXPORT
// ============================================================================
// NOTE: These templates have been temporarily commented out due to import
// path issues. They need to be updated to work with the new structure.
//
// The template files have been copied to:
// - packages/ui/src/templates/demos/
// - packages/ui/src/templates/showcase/
//
// To enable a template:
// 1. Fix import paths in the component file to use relative imports from packages/ui/src/templates/
// 2. Uncomment the export below
// 3. Add to registry.ts

// Design System Showcases
// export * from "./DesignSystemDocs";
export * from "./ChatGPTIconCatalog";
// export * from "./showcase/ColorShowcase";
// export * from "./showcase/FoundationsShowcase";
// export * from "./showcase/IconographyShowcase";
// export * from "./showcase/SpacingShowcase";
// export * from "./showcase/TypographyShowcase";

// Template Block Demos
export * from "./demos/AttachmentMenuDemo";
export * from "./demos/ChatHeaderDemo";
export * from "./demos/ChatInputDemo";
export * from "./demos/DiscoverySettingsModalDemo";
export * from "./demos/IconPickerModalDemo";
export * from "./demos/ModelSelectorDemo";
export * from "./demos/SettingDropdownBlockDemo";
export * from "./demos/SettingRowBlockDemo";
export * from "./demos/SettingsModalDemo";
export * from "./demos/SettingToggleBlockDemo";
export * from "./demos/TemplateFieldGroupDemo";
export * from "./demos/TemplateFooterBarDemo";
export * from "./demos/TemplateFormFieldDemo";
export * from "./demos/TemplateHeaderBarDemo";
export * from "./demos/TemplatePanelDemo";
export * from "./demos/TemplateShellDemo";

// ============================================================================
// REGISTRY AND UTILITIES
// ============================================================================

export * from "./blocks";
export * from "./registry";
