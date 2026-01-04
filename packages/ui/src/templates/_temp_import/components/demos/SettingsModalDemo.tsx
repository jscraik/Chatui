import { SettingsModal } from "../SettingsModal";

export function SettingsModalDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1">
      <SettingsModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
