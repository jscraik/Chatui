# UI Structure Map

This map shows the current layout for the UI library after the per-component foldering pass. Use it to find where to add new components, stories, and tests.

## packages/ui/src/

```
packages/ui/src/
├── app/
│   ├── chat/
│   │   ├── AttachmentMenu/AttachmentMenu.tsx
│   │   ├── ChatHeader/ChatHeader.tsx
│   │   ├── ChatInput/ChatInput.tsx
│   │   ├── ChatMessages/ChatMessages.tsx
│   │   ├── ChatShell/ChatShell.tsx
│   │   ├── ChatSidebar/ChatSidebar.tsx
│   │   ├── ChatUIRoot/ChatUIRoot.tsx
│   │   ├── ChatView/ChatView.tsx
│   │   ├── ComposeView/ComposeView.tsx
│   │   ├── ChatInputDemo/ChatInputDemo.tsx
│   │   ├── ChatSidebar/
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── hooks/
│   │   │   └── modals/
│   │   ├── compose/
│   │   │   ├── ComposeInstructionsPanel/
│   │   │   ├── PromptBuilderSection/
│   │   │   └── ProEditConfigModal/
│   │   ├── chat-variants.tsx
│   │   ├── constants.ts
│   │   ├── iconHelpers.tsx
│   │   ├── slots.tsx
│   │   └── types.ts
│   ├── modals/
│   │   ├── DiscoverySettingsModal/
│   │   ├── IconPickerModal/
│   │   ├── SettingsModal/
│   │   └── settings/
│   │       ├── AboutSection/
│   │       ├── AccountSection/
│   │       ├── AppSection/
│   │       ├── ChatBarSection/
│   │       ├── SpeechSection/
│   │       ├── SuggestionsSection/
│   │       └── WorkWithAppsSection/
│   └── settings/
│       ├── AppsPanel/
│       ├── ArchivedChatsPanel/
│       ├── AudioSettingsPanel/
│       ├── CheckForUpdatesPanel/
│       ├── DataControlsPanel/
│       ├── ManageAppsPanel/
│       ├── NotificationsPanel/
│       ├── PersonalizationPanel/
│       ├── SecurityPanel/
│       ├── SettingDropdown/
│       ├── SettingRow/
│       ├── SettingToggle/
│       └── types.ts
├── components/
│   └── ui/
│       ├── base/<component>/<component>.tsx
│       ├── forms/<component>/<component>.tsx
│       ├── navigation/<component>/<component>.tsx
│       ├── overlays/<component>/<component>.tsx
│       ├── feedback/<component>/<component>.tsx
│       ├── data-display/<component>/<component>.tsx
│       └── chat/<component>/<component>.tsx
├── templates/
│   ├── <TemplateName>/<TemplateName>.tsx
│   ├── blocks/<BlockName>/<BlockName>.tsx
│   ├── demos/<DemoName>/<DemoName>.tsx
│   └── registry.ts
├── design-system/
│   └── showcase/
├── storybook/
├── icons/
├── integrations/
├── hooks/
├── fixtures/
├── testing/
├── utils/
└── styles/
```

## Conventions
- Per-component folders: a component and its stories/tests live together.
- Component folders export from `index.ts`, so imports can stay at the folder root.
- Shared utilities and types remain at the category root (e.g. `app/chat/types.ts`).
- Templates follow the same per-component convention, including `*.figmaConnect.tsx` files.

## Adding new components
1. Create a folder named after the component inside the correct category.
2. Add `<Component>.tsx` plus optional `.stories.tsx` / `.test.tsx` in the same folder.
3. Export from the category `index.ts` and any higher-level barrel you want.
