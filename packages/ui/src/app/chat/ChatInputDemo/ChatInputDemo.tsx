import { ChatInput } from "../ChatInput";

export function ChatInputDemo() {
  const model = {
    name: "GPT-4",
    shortName: "GPT-4",
    description: "Most capable model",
  };

  return (
    <div className="h-full bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-foundation-text-light-primary dark:text-foundation-text-dark-primary text-xl font-semibold">
            Enhanced Chat Input Component
          </h2>
          <p className="text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary">
            Improved ChatGPT-style input with polished aesthetics and complete design token
            compliance
          </p>

          <div className="border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 rounded-lg overflow-hidden bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2">
            <ChatInput
              selectedModel={model}
              onSendMessage={(msg) => console.log("Send:", msg)}
              onAttachmentAction={(action) => console.log("Attachment:", action)}
              onMoreAction={(action) => console.log("More:", action)}
              onToolAction={(action) => console.log("Tool:", action)}
              onSearchToggle={(enabled) => console.log("Search:", enabled)}
              onResearchToggle={(enabled) => console.log("Research:", enabled)}
              onAutoClear={() => console.log("Auto-clear")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-foundation-text-light-primary dark:text-foundation-text-dark-primary text-lg font-semibold">
            Key Improvements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 rounded-lg bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2">
              <h3 className="font-medium mb-2 text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
                Design Token Compliance
              </h3>
              <ul className="text-[13px] text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary space-y-1">
                <li>• Complete foundation color system</li>
                <li>• Proper typography tokens</li>
                <li>• Consistent spacing scale</li>
                <li>• Semantic color usage</li>
              </ul>
            </div>

            <div className="p-4 border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 rounded-lg bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2">
              <h3 className="font-medium mb-2 text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
                Enhanced Interactions
              </h3>
              <ul className="text-[13px] text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary space-y-1">
                <li>• Smooth animations & transitions</li>
                <li>• Improved focus management</li>
                <li>• Better hover states</li>
                <li>• Accessible keyboard navigation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
