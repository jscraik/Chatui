import { colorTokens } from "@chatui/tokens";
import { useCallback, useState } from "react";

import { cn } from "../../components/ui/utils";

import {
  IconGrid,
  IconLayers,
  IconPalette,
  IconSparkles,
  IconType,
} from "./colors/icons";
import { ColorGroup } from "./colors/ColorGroup";
import { CSSVariableSwatch } from "./colors/CSSVariableSwatch";
import { Toast } from "./colors/Toast";

type ViewMode = "grid" | "detailed";

/** ColorShowcase displays all foundation color tokens with Grid and Detailed views. Click any color to copy. */
export function ColorShowcase() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [toastVisible, setToastVisible] = useState(false);

  const copyToClipboard = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setToastVisible(true);
      setTimeout(() => {
        setCopiedValue(null);
        setToastVisible(false);
      }, 2000);
    } catch {
      /* ignore */
    }
  }, []);

  const getCategoryIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("text")) return <IconType className="size-4" />;
    if (t.includes("icon")) return <IconSparkles className="size-4" />;
    return <IconPalette className="size-4" />;
  };

  return (
    <div className="w-full max-w-6xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foundation-text-dark-primary">
            Color Showcase
          </h2>
          <p className="text-sm text-foundation-text-dark-tertiary mt-1">
            Click any color to copy the hex value
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-foundation-bg-dark-2 border border-foundation-bg-dark-3">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
              viewMode === "grid"
                ? "bg-foundation-bg-dark-3 text-foundation-text-dark-primary shadow-sm"
                : "text-foundation-text-dark-tertiary hover:text-foundation-text-dark-secondary hover:bg-foundation-bg-dark-3/50",
            )}
          >
            <IconGrid className="size-4" />
            Grid View
          </button>
          <button
            type="button"
            onClick={() => setViewMode("detailed")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
              viewMode === "detailed"
                ? "bg-foundation-bg-dark-3 text-foundation-text-dark-primary shadow-sm"
                : "text-foundation-text-dark-tertiary hover:text-foundation-text-dark-secondary hover:bg-foundation-bg-dark-3/50",
            )}
          >
            <IconLayers className="size-4" />
            Detailed View
          </button>
        </div>
      </div>

      {viewMode === "grid" && (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foundation-text-dark-primary">Dark Theme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ColorGroup
                title="Backgrounds"
                colors={colorTokens.background.dark}
                isDark
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
              />
              <ColorGroup
                title="Text"
                colors={colorTokens.text.dark}
                isDark
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
              />
              <ColorGroup
                title="Icons"
                colors={colorTokens.icon.dark}
                isDark
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
              />
              <ColorGroup
                title="Accents"
                colors={colorTokens.accent.dark}
                isDark
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
              />
            </div>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foundation-text-dark-primary">Light Theme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ColorGroup
                title="Backgrounds"
                colors={colorTokens.background.light}
                isDark={false}
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
              />
              <ColorGroup
                title="Text"
                colors={colorTokens.text.light}
                isDark={false}
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
              />
              <ColorGroup
                title="Icons"
                colors={colorTokens.icon.light}
                isDark={false}
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
              />
              <ColorGroup
                title="Accents"
                colors={colorTokens.accent.light}
                isDark={false}
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
              />
            </div>
          </section>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foundation-text-dark-primary">
              CSS Variables (Live)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl p-5 border border-foundation-bg-dark-3 bg-foundation-bg-dark-2">
                <h3 className="text-sm font-semibold mb-4 text-foundation-text-dark-primary">
                  Dark Backgrounds
                </h3>
                <div className="space-y-1">
                  {[
                    { name: "--foundation-bg-dark-1", desc: "Primary" },
                    { name: "--foundation-bg-dark-2", desc: "Secondary" },
                    { name: "--foundation-bg-dark-3", desc: "Tertiary" },
                  ].map(({ name, desc }) => (
                    <CSSVariableSwatch
                      key={name}
                      name={name}
                      description={desc}
                      onCopy={copyToClipboard}
                      isCopied={copiedValue === `var(${name})`}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-5 border border-foundation-bg-dark-3 bg-foundation-bg-dark-2">
                <h3 className="text-sm font-semibold mb-4 text-foundation-text-dark-primary">
                  Accent Colors
                </h3>
                <div className="space-y-1">
                  {[
                    { name: "--foundation-accent-blue", desc: "Blue" },
                    { name: "--foundation-accent-green", desc: "Green" },
                    { name: "--foundation-accent-orange", desc: "Orange" },
                    { name: "--foundation-accent-red", desc: "Red" },
                  ].map(({ name, desc }) => (
                    <CSSVariableSwatch
                      key={name}
                      name={name}
                      description={desc}
                      onCopy={copyToClipboard}
                      isCopied={copiedValue === `var(${name})`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {viewMode === "detailed" && (
        <div className="space-y-6">
          <ColorGroup
            title="Backgrounds / Light Mode"
            colors={colorTokens.background.light}
            isDark={false}
            onCopy={copyToClipboard}
            copiedValue={copiedValue}
            variant="detailed"
            icon={getCategoryIcon("background")}
          />
          <ColorGroup
            title="Backgrounds / Dark Mode"
            colors={colorTokens.background.dark}
            isDark
            onCopy={copyToClipboard}
            copiedValue={copiedValue}
            variant="detailed"
            icon={getCategoryIcon("background")}
          />
          <ColorGroup
            title="Text / Light Mode"
            colors={colorTokens.text.light}
            isDark={false}
            onCopy={copyToClipboard}
            copiedValue={copiedValue}
            variant="detailed"
            icon={getCategoryIcon("text")}
          />
          <ColorGroup
            title="Text / Dark Mode"
            colors={colorTokens.text.dark}
            isDark
            onCopy={copyToClipboard}
            copiedValue={copiedValue}
            variant="detailed"
            icon={getCategoryIcon("text")}
          />
          <ColorGroup
            title="Icons / Light Mode"
            colors={colorTokens.icon.light}
            isDark={false}
            onCopy={copyToClipboard}
            copiedValue={copiedValue}
            variant="detailed"
            icon={getCategoryIcon("icon")}
          />
          <ColorGroup
            title="Icons / Dark Mode"
            colors={colorTokens.icon.dark}
            isDark
            onCopy={copyToClipboard}
            copiedValue={copiedValue}
            variant="detailed"
            icon={getCategoryIcon("icon")}
          />
          <ColorGroup
            title="Accents / Light Mode"
            colors={colorTokens.accent.light}
            isDark={false}
            onCopy={copyToClipboard}
            copiedValue={copiedValue}
            variant="detailed"
            icon={getCategoryIcon("accent")}
          />
          <ColorGroup
            title="Accents / Dark Mode"
            colors={colorTokens.accent.dark}
            isDark
            onCopy={copyToClipboard}
            copiedValue={copiedValue}
            variant="detailed"
            icon={getCategoryIcon("accent")}
          />
        </div>
      )}

      <Toast message="Copied to clipboard!" value={copiedValue ?? ""} visible={toastVisible} />
    </div>
  );
}
