import { spacingScale } from "@chatui/tokens";
import { useCallback, useState } from "react";

import { cn } from "../../components/ui/utils";

import { IconBook, IconCheck, IconCopy, IconGrid, IconScale } from "./spacing/icons";
import { SpacingCard } from "./spacing/SpacingCard";
import { ScaleBar } from "./spacing/ScaleDisplay";
import { UsageCard } from "./spacing/UsageExamples";

type ViewMode = "grid" | "scale" | "usage";

function Toast({ message, value, visible }: { message: string; value: string; visible: boolean }) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg bg-foundation-bg-dark-2 border border-foundation-bg-dark-3 flex items-center gap-3 transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="size-8 rounded-full bg-foundation-accent-green/10 flex items-center justify-center">
        <IconCheck className="size-4 text-foundation-accent-green" />
      </div>
      <div>
        <p className="text-sm font-medium text-foundation-text-dark-primary">{message}</p>
        <p className="text-xs font-mono text-foundation-text-dark-tertiary max-w-[200px] truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

/** SpacingShowcase displays all spacing tokens with grid, scale, and usage views. */
export function SpacingShowcase() {
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

  const spacingTokens = spacingScale.map((value) => ({ token: `space-${value}`, value }));
  const maxValue = Math.max(...spacingScale);

  return (
    <div className="w-full max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foundation-text-dark-primary">
            Spacing Showcase
          </h2>
          <p className="text-sm text-foundation-text-dark-tertiary mt-1">
            8px grid system with {spacingTokens.length} spacing tokens
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-foundation-bg-dark-2 border border-foundation-bg-dark-3">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
              viewMode === "grid"
                ? "bg-foundation-bg-dark-3 text-foundation-text-dark-primary shadow-sm"
                : "text-foundation-text-dark-tertiary hover:text-foundation-text-dark-secondary",
            )}
          >
            <IconGrid className="size-3.5" />
            Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode("scale")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
              viewMode === "scale"
                ? "bg-foundation-bg-dark-3 text-foundation-text-dark-primary shadow-sm"
                : "text-foundation-text-dark-tertiary hover:text-foundation-text-dark-secondary",
            )}
          >
            <IconScale className="size-3.5" />
            Scale
          </button>
          <button
            type="button"
            onClick={() => setViewMode("usage")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
              viewMode === "usage"
                ? "bg-foundation-bg-dark-3 text-foundation-text-dark-primary shadow-sm"
                : "text-foundation-text-dark-tertiary hover:text-foundation-text-dark-secondary",
            )}
          >
            <IconBook className="size-3.5" />
            Usage
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foundation-text-dark-primary">Spacing Scale</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {spacingTokens.map(({ token, value }) => (
              <SpacingCard
                key={token}
                token={token}
                value={value}
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
              />
            ))}
          </div>
        </section>
      )}

      {/* Scale View */}
      {viewMode === "scale" && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foundation-text-dark-primary">Visual Scale</h3>
          <div className="rounded-2xl border border-foundation-bg-dark-3 bg-foundation-bg-dark-2 p-5 space-y-2">
            {spacingTokens
              .filter((s) => s.value > 0)
              .map(({ token, value }) => (
                <ScaleBar
                  key={token}
                  token={token}
                  value={value}
                  maxValue={maxValue}
                  onCopy={copyToClipboard}
                  copiedValue={copiedValue}
                />
              ))}
          </div>
        </section>
      )}

      {/* Usage View */}
      {viewMode === "usage" && (
        <>
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-foundation-text-dark-primary">
              Usage Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UsageCard
                title="Major Sections"
                description="Use for major page sections and large gaps"
                token="space-64"
                value="64px"
                example={
                  <div className="flex flex-col gap-16">
                    <div className="h-8 bg-foundation-accent-blue/30 rounded" />
                    <div className="h-8 bg-foundation-accent-blue/30 rounded" />
                  </div>
                }
              />
              <UsageCard
                title="Component Spacing"
                description="Use between related components"
                token="space-32"
                value="32px"
                example={
                  <div className="flex flex-col gap-8">
                    <div className="h-8 bg-foundation-accent-green/30 rounded" />
                    <div className="h-8 bg-foundation-accent-green/30 rounded" />
                  </div>
                }
              />
              <UsageCard
                title="Element Spacing"
                description="Use between elements within a component"
                token="space-16"
                value="16px"
                example={
                  <div className="flex flex-col gap-4">
                    <div className="h-6 bg-foundation-accent-orange/30 rounded" />
                    <div className="h-6 bg-foundation-accent-orange/30 rounded" />
                  </div>
                }
              />
              <UsageCard
                title="Tight Spacing"
                description="Use for tight groupings and inline elements"
                token="space-8"
                value="8px"
                example={
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-foundation-accent-red/30 rounded" />
                    <div className="h-6 w-16 bg-foundation-accent-red/30 rounded" />
                  </div>
                }
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-foundation-text-dark-primary">
              Tailwind Usage
            </h3>
            <div className="rounded-2xl border border-foundation-bg-dark-3 bg-foundation-bg-dark-2 p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
                {[
                  { prop: "Padding", class: "p-4", result: "16px" },
                  { prop: "Margin", class: "m-8", result: "32px" },
                  { prop: "Gap", class: "gap-2", result: "8px" },
                  { prop: "Space", class: "space-y-6", result: "24px" },
                ].map(({ prop, class: cls, result }) => (
                  <div
                    key={prop}
                    className="flex items-center gap-4 p-3 rounded-lg bg-foundation-bg-dark-3/50"
                  >
                    <span className="text-foundation-text-dark-tertiary w-20">{prop}:</span>
                    <code className="text-foundation-accent-green">{cls}</code>
                    <span className="text-foundation-text-dark-secondary">→ {result}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-foundation-text-dark-primary">
              Container Padding
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { size: "SM", padding: "16px" },
                { size: "MD", padding: "24px" },
                { size: "LG", padding: "32px" },
              ].map(({ size, padding }) => (
                <div
                  key={size}
                  className="rounded-2xl border border-foundation-bg-dark-3 bg-foundation-bg-dark-2"
                  style={{ padding }}
                >
                  <div className="bg-foundation-bg-dark-3 rounded-lg p-4">
                    <div className="text-sm font-semibold text-foundation-text-dark-primary">
                      {size}
                    </div>
                    <div className="text-xs font-mono text-foundation-text-dark-tertiary">
                      padding: {padding}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-foundation-text-dark-primary">
              Component Gap
            </h3>
            <div className="rounded-2xl border border-foundation-bg-dark-3 bg-foundation-bg-dark-2 p-5 space-y-6">
              {[
                { size: "SM", gap: "8px" },
                { size: "MD", gap: "16px" },
                { size: "LG", gap: "24px" },
              ].map(({ size, gap }) => (
                <div key={size}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-foundation-text-dark-primary">
                      {size}
                    </span>
                    <span className="text-xs font-mono text-foundation-text-dark-tertiary">
                      gap: {gap}
                    </span>
                  </div>
                  <div className="flex" style={{ gap }}>
                    <div className="flex-1 h-12 bg-foundation-accent-green/30 rounded-lg" />
                    <div className="flex-1 h-12 bg-foundation-accent-green/30 rounded-lg" />
                    <div className="flex-1 h-12 bg-foundation-accent-green/30 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-foundation-text-dark-primary">
              Border Radius
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { size: "sm", value: "6px" },
                { size: "md", value: "8px" },
                { size: "lg", value: "12px" },
                { size: "xl", value: "16px" },
              ].map(({ size, value }) => (
                <div
                  key={size}
                  className="rounded-2xl border border-foundation-bg-dark-3 bg-foundation-bg-dark-2 p-4"
                >
                  <div className="mb-3">
                    <div className="text-sm font-semibold text-foundation-text-dark-primary">
                      {size}
                    </div>
                    <div className="text-xs font-mono text-foundation-text-dark-tertiary">
                      {value}
                    </div>
                  </div>
                  <div
                    className="w-full h-16 bg-foundation-accent-blue/30"
                    style={{ borderRadius: value }}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <Toast message="Copied to clipboard!" value={copiedValue ?? ""} visible={toastVisible} />
    </div>
  );
}
