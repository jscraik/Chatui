import { useEffect, useState } from "react";

import {
  IconBarChart,
  IconBook,
  IconCalendar,
  IconCamera,
  IconChat,
  IconClock,
  IconCompass,
  IconEdit,
  IconEmail,
  IconFlag,
  IconFlask,
  IconFolder,
  IconGlobe,
  IconHeadphones,
  IconImage,
  IconLightBulb,
  IconMapPin,
  IconMic,
  IconNotebook,
  IconPhone,
  IconPin,
  IconSettings,
  IconStar,
  IconStuffTools,
  IconTerminal,
  IconTrash,
  IconVideo,
  IconWriting,
} from "../../../icons";
import { IconButton } from "../../../components/ui/base/icon-button";
import { ModalBody, ModalDialog, ModalFooter } from "../../../components/ui/overlays/modal";
import { cn } from "../../../components/ui/utils";

interface IconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIconId?: string;
  currentColorId?: string;
  onSave: (iconId: string, colorId: string) => void;
  projectName: string;
}

// Complete 8-color palette with proper design tokens (light + dark)
const colors = [
  {
    id: "gray",
    name: "Gray",
    lightClass: "text-foundation-accent-gray-light",
    darkClass: "text-foundation-accent-gray",
    lightBg: "bg-foundation-accent-gray-light",
    darkBg: "bg-foundation-accent-gray",
  },
  {
    id: "red",
    name: "Red",
    lightClass: "text-foundation-accent-red-light",
    darkClass: "text-foundation-accent-red",
    lightBg: "bg-foundation-accent-red-light",
    darkBg: "bg-foundation-accent-red",
  },
  {
    id: "orange",
    name: "Orange",
    lightClass: "text-foundation-accent-orange-light",
    darkClass: "text-foundation-accent-orange",
    lightBg: "bg-foundation-accent-orange-light",
    darkBg: "bg-foundation-accent-orange",
  },
  {
    id: "yellow",
    name: "Yellow",
    lightClass: "text-foundation-accent-yellow-light",
    darkClass: "text-foundation-accent-yellow",
    lightBg: "bg-foundation-accent-yellow-light",
    darkBg: "bg-foundation-accent-yellow",
  },
  {
    id: "green",
    name: "Green",
    lightClass: "text-foundation-accent-green-light",
    darkClass: "text-foundation-accent-green",
    lightBg: "bg-foundation-accent-green-light",
    darkBg: "bg-foundation-accent-green",
  },
  {
    id: "blue",
    name: "Blue",
    lightClass: "text-foundation-accent-blue-light",
    darkClass: "text-foundation-accent-blue",
    lightBg: "bg-foundation-accent-blue-light",
    darkBg: "bg-foundation-accent-blue",
  },
  {
    id: "purple",
    name: "Purple",
    lightClass: "text-foundation-accent-purple-light",
    darkClass: "text-foundation-accent-purple",
    lightBg: "bg-foundation-accent-purple-light",
    darkBg: "bg-foundation-accent-purple",
  },
  {
    id: "pink",
    name: "Pink",
    lightClass: "text-foundation-accent-pink-light",
    darkClass: "text-foundation-accent-pink",
    lightBg: "bg-foundation-accent-pink-light",
    darkBg: "bg-foundation-accent-pink",
  },
];

// Helper to get CSS classes from color ID
const getColorClasses = (colorId: string) => {
  const color = colors.find((c) => c.id === colorId) ?? colors[0];
  return {
    text: `${color.lightClass} dark:${color.darkClass}`,
    bg: `${color.lightBg} dark:${color.darkBg}`,
  };
};

const icons = [
  { id: "folder", component: IconFolder, name: "Folder" },
  { id: "chat", component: IconChat, name: "Chat" },
  { id: "image", component: IconImage, name: "Image" },
  { id: "edit", component: IconEdit, name: "Edit" },
  { id: "compass", component: IconCompass, name: "Compass" },
  { id: "clock", component: IconClock, name: "Clock" },
  { id: "email", component: IconEmail, name: "Email" },
  { id: "phone", component: IconPhone, name: "Phone" },
  { id: "camera", component: IconCamera, name: "Camera" },
  { id: "mic", component: IconMic, name: "Microphone" },
  { id: "video", component: IconVideo, name: "Video" },
  { id: "headphones", component: IconHeadphones, name: "Headphones" },
  { id: "trash", component: IconTrash, name: "Trash" },
  { id: "settings", component: IconSettings, name: "Settings" },
  { id: "bar-chart", component: IconBarChart, name: "Chart" },
  { id: "flask", component: IconFlask, name: "Flask" },
  { id: "lightbulb", component: IconLightBulb, name: "Lightbulb" },
  { id: "star", component: IconStar, name: "Star" },
  { id: "flag", component: IconFlag, name: "Flag" },
  { id: "pin", component: IconPin, name: "Pin" },
  { id: "book", component: IconBook, name: "Book" },
  { id: "terminal", component: IconTerminal, name: "Terminal" },
  { id: "notebook", component: IconNotebook, name: "Notebook" },
  { id: "globe", component: IconGlobe, name: "Globe" },
  { id: "map-pin", component: IconMapPin, name: "Location" },
  { id: "calendar", component: IconCalendar, name: "Calendar" },
  { id: "writing", component: IconWriting, name: "Writing" },
  { id: "tools", component: IconStuffTools, name: "Tools" },
];

const getSelectedIconComponent = (selectedIcon: string) =>
  icons.find((icon) => icon.id === selectedIcon)?.component || IconFolder;

function IconPreview({
  selectedColorId,
  SelectedIconComponent,
}: {
  selectedColorId: string;
  SelectedIconComponent: React.ComponentType<{ className?: string }>;
}) {
  const colorClasses = getColorClasses(selectedColorId);

  return (
    <div className="flex items-center justify-center mb-8">
      <div
        className={cn(
          "p-6 rounded-2xl transition-all duration-200",
          "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-3/50",
          "border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3",
          "shadow-lg shadow-black/10",
          "motion-reduce:transition-none",
        )}
      >
        <SelectedIconComponent className={cn("size-10", colorClasses.text)} />
      </div>
    </div>
  );
}

function ColorPicker({
  selectedColorId,
  onSelect,
}: {
  selectedColorId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-body-small font-medium text-foundation-text-light-primary dark:text-foundation-text-dark-primary mb-4">
        Color
      </h3>
      <div className="flex items-center justify-center gap-3">
        {colors.map((color) => {
          const isSelected = selectedColorId === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onSelect(color.id)}
              aria-pressed={isSelected}
              className={cn(
                "size-12 rounded-full transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-foundation-accent-blue-light dark:focus-visible:ring-foundation-accent-blue",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-foundation-bg-light-1 dark:focus-visible:ring-offset-foundation-bg-dark-2",
                color.lightBg,
                `dark:${color.darkBg}`,
                isSelected
                  ? "ring-2 ring-foundation-text-light-primary dark:ring-foundation-text-dark-primary ring-offset-2 ring-offset-foundation-bg-light-1 dark:ring-offset-foundation-bg-dark-2 shadow-lg"
                  : "hover:shadow-md",
                "motion-reduce:transition-none",
              )}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            />
          );
        })}
      </div>
    </div>
  );
}

function IconGrid({
  selectedIcon,
  selectedColorId,
  onSelect,
}: {
  selectedIcon: string;
  selectedColorId: string;
  onSelect: (id: string) => void;
}) {
  const selectedColorClasses = getColorClasses(selectedColorId);

  return (
    <div className="space-y-4">
      <h3 className="text-body-small font-medium text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
        Icon
      </h3>
      <div className="grid grid-cols-7 gap-2 max-h-[calc(var(--foundation-space-128)+var(--foundation-space-64)+var(--foundation-space-32))] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foundation-bg-light-3 dark:scrollbar-thumb-foundation-bg-dark-3">
        {icons.map((icon) => {
          const IconComponent = icon.component;
          const isSelected = selectedIcon === icon.id;

          return (
            <button
              key={icon.id}
              type="button"
              onClick={() => onSelect(icon.id)}
              aria-pressed={isSelected}
              className={cn(
                "p-3 rounded-xl transition-all duration-200 group border border-transparent",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-foundation-accent-blue-light dark:focus-visible:ring-foundation-accent-blue",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-foundation-bg-light-1 dark:focus-visible:ring-offset-foundation-bg-dark-2",
                isSelected
                  ? "bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-3 border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 shadow-sm"
                  : "hover:bg-foundation-bg-light-3/50 dark:hover:bg-foundation-bg-dark-3/50",
                "motion-reduce:transition-none",
              )}
              title={icon.name}
              aria-label={`Select ${icon.name} icon`}
            >
                <IconComponent
                  className={cn(
                    "size-5 transition-colors duration-200",
                    isSelected
                      ? selectedColorClasses.text
                      : "text-foundation-icon-light-secondary dark:text-foundation-icon-dark-secondary group-hover:text-foundation-icon-light-primary dark:group-hover:text-foundation-icon-dark-primary",
                    "motion-reduce:transition-none",
                  )}
                />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function IconPickerModal({
  isOpen,
  onClose,
  currentIconId,
  currentColorId = "gray",
  onSave,
  projectName,
}: IconPickerModalProps) {
  const [selectedColorId, setSelectedColorId] = useState(currentColorId);
  const [selectedIcon, setSelectedIcon] = useState(currentIconId ?? "folder");

  // Sync state when modal opens or props change (prevents stale state on reopen)
  useEffect(() => {
    if (!isOpen) return;
    setSelectedColorId(currentColorId);
    setSelectedIcon(currentIconId ?? "folder");
  }, [isOpen, currentColorId, currentIconId]);

  const handleSave = () => {
    onSave(selectedIcon, selectedColorId);
    onClose();
  };

  const SelectedIconComponent = getSelectedIconComponent(selectedIcon);
  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Choose icon"
      titleId="icon-picker-title"
      maxWidth="440px"
      description={`Select an icon and color for ${projectName}`}
      className="bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-2 border-foundation-bg-light-3 dark:border-foundation-bg-dark-3"
    >
      {/* Custom Header */}
      <div className="px-6 py-4 border-b border-foundation-bg-light-3 dark:border-foundation-bg-dark-3">
        <div className="flex items-center justify-between">
          <div>
            <h2
              id="icon-picker-title"
              className="text-body font-medium text-foundation-text-light-primary dark:text-foundation-text-dark-primary"
            >
              Choose icon
            </h2>
            <p className="text-caption text-foundation-text-light-primary dark:text-foundation-text-dark-secondary mt-0.5">
              {projectName}
            </p>
          </div>
          <IconButton
            onClick={onClose}
            title="Close dialog"
            ariaLabel="Close dialog"
            size="lg"
            variant="ghost"
            iconClassName="text-foundation-icon-light-secondary dark:text-foundation-icon-dark-secondary"
            className={cn(
              "size-12",
              "hover:bg-foundation-bg-light-3 dark:hover:bg-foundation-bg-dark-3",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-foundation-accent-blue-light dark:focus-visible:ring-foundation-accent-blue",
              "focus-visible:ring-offset-2",
              "focus-visible:ring-offset-foundation-bg-light-1 dark:focus-visible:ring-offset-foundation-bg-dark-2",
              "motion-reduce:transition-none",
            )}
            icon={
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            }
          />
        </div>
      </div>

      <ModalBody className="px-6 py-6">
        <IconPreview
          selectedColorId={selectedColorId}
          SelectedIconComponent={SelectedIconComponent}
        />
        <ColorPicker selectedColorId={selectedColorId} onSelect={setSelectedColorId} />
        <IconGrid
          selectedIcon={selectedIcon}
          selectedColorId={selectedColorId}
          onSelect={setSelectedIcon}
        />
      </ModalBody>

      <ModalFooter className="border-foundation-bg-light-3 dark:border-foundation-bg-dark-3">
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "px-4 py-2 rounded-lg transition-all duration-200",
            "text-body-small font-normal",
            "text-foundation-text-light-primary dark:text-foundation-text-dark-secondary",
            "hover:text-foundation-text-light-primary dark:hover:text-foundation-text-dark-primary",
            "hover:bg-foundation-bg-light-3 dark:hover:bg-foundation-bg-dark-3",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-foundation-accent-blue-light dark:focus-visible:ring-foundation-accent-blue",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-foundation-bg-light-1 dark:focus-visible:ring-offset-foundation-bg-dark-2",
            "motion-reduce:transition-none",
          )}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className={cn(
            "px-4 py-2 rounded-lg transition-all duration-200",
            "text-body-small font-medium",
            "bg-foundation-accent-green-light dark:bg-foundation-accent-green",
            "text-foundation-text-light-primary",
            "hover:opacity-90 active:opacity-95",
            "shadow-sm hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-foundation-accent-blue-light dark:focus-visible:ring-foundation-accent-blue",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-foundation-bg-light-1 dark:focus-visible:ring-offset-foundation-bg-dark-2",
            "motion-reduce:transition-none",
          )}
        >
          Done
        </button>
      </ModalFooter>
    </ModalDialog>
  );
}
