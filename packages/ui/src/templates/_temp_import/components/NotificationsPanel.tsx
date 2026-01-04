import { IconChevronLeftMd, IconChevronRightMd } from "./icons/ChatGPTIcons";
import { SettingRow } from "./SettingRow";
import type { SettingsPanelProps } from "./types";

export function NotificationsPanel({ onBack }: SettingsPanelProps) {
  return (
    <>
      <div className="px-6 py-4 border-b border-[var(--foundation-text-dark-primary)]/10 flex items-center gap-3">
        <div className="flex gap-2">
          <button
            onClick={onBack}
            className="size-3 rounded-full bg-[var(--foundation-accent-red)] hover:bg-[var(--foundation-accent-red)]/80 transition-colors"
            aria-label="Close"
          />
          <div className="size-3 rounded-full bg-[var(--foundation-accent-orange)]" />
          <div className="size-3 rounded-full bg-[var(--foundation-accent-green)]" />
        </div>
        <button
          onClick={onBack}
          className="p-1 hover:bg-[var(--foundation-bg-dark-3)] rounded transition-colors"
        >
          <IconChevronLeftMd className="size-4 text-[var(--foundation-icon-dark-primary)]" />
        </button>
        <h2 className="text-[18px] font-semibold leading-[26px] tracking-[-0.45px] text-[var(--foundation-text-dark-primary)]">
          Notifications
        </h2>
      </div>

      <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-4">
        <div className="space-y-0.5">
          <SettingRow
            label="Responses"
            onClick={() => {}}
            right={
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-[var(--foundation-text-dark-secondary)]">
                  Push
                </span>
                <IconChevronRightMd className="size-4 text-[var(--foundation-icon-dark-tertiary)]" />
              </div>
            }
          />

          <SettingRow
            label="Turn safety notifications"
            onClick={() => {}}
            right={
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-[var(--foundation-text-dark-secondary)]">
                  Push, Email, SMS
                </span>
                <IconChevronRightMd className="size-4 text-[var(--foundation-icon-dark-tertiary)]" />
              </div>
            }
          />

          <SettingRow
            label="Group chats"
            onClick={() => {}}
            right={
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-[var(--foundation-text-dark-secondary)]">
                  Push
                </span>
                <IconChevronRightMd className="size-4 text-[var(--foundation-icon-dark-tertiary)]" />
              </div>
            }
          />

          <SettingRow
            label="Pulse daily updates"
            onClick={() => {}}
            right={
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-[var(--foundation-text-dark-secondary)]">
                  Push
                </span>
                <IconChevronRightMd className="size-4 text-[var(--foundation-icon-dark-tertiary)]" />
              </div>
            }
          />

          <SettingRow
            label="Pulse leaks"
            onClick={() => {}}
            right={
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-[var(--foundation-text-dark-secondary)]">
                  Push, Email
                </span>
                <IconChevronRightMd className="size-4 text-[var(--foundation-icon-dark-tertiary)]" />
              </div>
            }
          />

          <SettingRow
            label="Projects"
            onClick={() => {}}
            right={
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-[var(--foundation-text-dark-secondary)]">
                  Email
                </span>
                <IconChevronRightMd className="size-4 text-[var(--foundation-icon-dark-tertiary)]" />
              </div>
            }
          />

          <SettingRow
            label="Recommendations"
            onClick={() => {}}
            right={
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-[var(--foundation-text-dark-secondary)]">
                  Push, Email
                </span>
                <IconChevronRightMd className="size-4 text-[var(--foundation-icon-dark-tertiary)]" />
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}
