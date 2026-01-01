import { typographyTokens } from "@chatui/tokens";
import { useCallback, useState } from "react";

import { cn } from "../../components/ui/utils";

import { IconCode, IconEye, IconSpecs } from "./typography/icons";
import { FontFamilyCard } from "./typography/FontFamilyCard";
import { Toast } from "./typography/Toast";
import { TypeStyleCard, TypeStyle } from "./typography/TypeStyleCard";

type ViewMode = "preview" | "specs" | "code";

/** TypographyShowcase displays all typography tokens with preview, specs, and code views. */
export function TypographyShowcase() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
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

  const typeStyles: TypeStyle[] = [
    {
      name: "heading-1",
      displayName: "Heading 1",
      size: `${typographyTokens.heading1.size}px`,
      weight: `${typographyTokens.heading1.weight}`,
      lineHeight: `${typographyTokens.heading1.lineHeight}px`,
      letterSpacing: `${typographyTokens.heading1.tracking}px`,
      className: "text-heading-1",
      description: "Page titles, hero sections",
    },
    {
      name: "heading-2",
      displayName: "Heading 2",
      size: `${typographyTokens.heading2.size}px`,
      weight: `${typographyTokens.heading2.weight}`,
      lineHeight: `${typographyTokens.heading2.lineHeight}px`,
      letterSpacing: `${typographyTokens.heading2.tracking}px`,
      className: "text-heading-2",
      description: "Section headers",
    },
    {
      name: "heading-3",
      displayName: "Heading 3",
      size: `${typographyTokens.heading3.size}px`,
      weight: `${typographyTokens.heading3.weight}`,
      lineHeight: `${typographyTokens.heading3.lineHeight}px`,
      letterSpacing: `${typographyTokens.heading3.tracking}px`,
      className: "text-heading-3",
      description: "Subsection headers, card titles",
    },
    {
      name: "body",
      displayName: "Body",
      size: `${typographyTokens.body.size}px`,
      weight: `${typographyTokens.body.weight}`,
      lineHeight: `${typographyTokens.body.lineHeight}px`,
      letterSpacing: `${typographyTokens.body.tracking}px`,
      className: "text-body",
      description: "Primary content, paragraphs",
    },
    {
      name: "body-small",
      displayName: "Body Small",
      size: `${typographyTokens.bodySmall.size}px`,
      weight: `${typographyTokens.bodySmall.weight}`,
      lineHeight: `${typographyTokens.bodySmall.lineHeight}px`,
      letterSpacing: `${typographyTokens.bodySmall.tracking}px`,
      className: "text-body-small",
      description: "Secondary content, descriptions",
    },
    {
      name: "caption",
      displayName: "Caption",
      size: `${typographyTokens.caption.size}px`,
      weight: `${typographyTokens.caption.weight}`,
      lineHeight: `${typographyTokens.caption.lineHeight}px`,
      letterSpacing: `${typographyTokens.caption.tracking}px`,
      className: "text-caption",
      description: "Labels, metadata, timestamps",
    },
  ];

  const fontFamilies = [
    {
      name: "SF Pro (Sans-serif)",
      family: typographyTokens.fontFamily,
      weights: ["400 Regular", "600 Semibold"],
      sample: "Aa Gg",
    },
    {
      name: "SF Mono (Monospace)",
      family: "SF Mono, Consolas, monospace",
      weights: ["400 Regular", "600 Semibold"],
      sample: "Aa Gg",
    },
  ];

  return (
    <div className="w-full max-w-6xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foundation-text-dark-primary">
            Typography Showcase
          </h2>
          <p className="text-sm text-foundation-text-dark-tertiary mt-1">
            Complete typography system with {typeStyles.length} text styles
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-foundation-bg-dark-2 border border-foundation-bg-dark-3">
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
              viewMode === "preview"
                ? "bg-foundation-bg-dark-3 text-foundation-text-dark-primary shadow-sm"
                : "text-foundation-text-dark-tertiary hover:text-foundation-text-dark-secondary",
            )}
          >
            <IconEye className="size-3.5" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => setViewMode("specs")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
              viewMode === "specs"
                ? "bg-foundation-bg-dark-3 text-foundation-text-dark-primary shadow-sm"
                : "text-foundation-text-dark-tertiary hover:text-foundation-text-dark-secondary",
            )}
          >
            <IconSpecs className="size-3.5" />
            Specs
          </button>
          <button
            type="button"
            onClick={() => setViewMode("code")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foundation-accent-blue",
              viewMode === "code"
                ? "bg-foundation-bg-dark-3 text-foundation-text-dark-primary shadow-sm"
                : "text-foundation-text-dark-tertiary hover:text-foundation-text-dark-secondary",
            )}
          >
            <IconCode className="size-3.5" />
            Code
          </button>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foundation-text-dark-primary">Font Families</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fontFamilies.map((f) => (
            <FontFamilyCard
              key={f.name}
              {...f}
              onCopy={copyToClipboard}
              copiedValue={copiedValue}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foundation-text-dark-primary">Headings</h3>
        <div className="space-y-4">
          {typeStyles
            .filter((s) => s.name.startsWith("heading"))
            .map((style) => (
              <TypeStyleCard
                key={style.name}
                style={style}
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
                viewMode={viewMode}
              />
            ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foundation-text-dark-primary">Body Text</h3>
        <div className="space-y-4">
          {typeStyles
            .filter((s) => s.name.startsWith("body") || s.name === "caption")
            .map((style) => (
              <TypeStyleCard
                key={style.name}
                style={style}
                onCopy={copyToClipboard}
                copiedValue={copiedValue}
                viewMode={viewMode}
              />
            ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foundation-text-dark-primary">Usage Examples</h3>
        <div className="rounded-2xl border border-foundation-bg-dark-3 bg-foundation-bg-dark-2 p-6 space-y-6">
          <div>
            <h4 className="text-heading-3 text-foundation-text-dark-primary mb-2">Section Title</h4>
            <p className="text-body text-foundation-text-dark-secondary">
              This is a typical section with a heading and body text. The heading uses heading-3
              style while the body uses regular body text for optimal readability.
            </p>
          </div>
          <div className="h-px bg-foundation-bg-dark-3" />
          <div className="flex items-center gap-3">
            <span className="text-body-small text-foundation-text-dark-tertiary">Label:</span>
            <span className="text-body text-foundation-text-dark-primary">Value text</span>
          </div>
          <div className="h-px bg-foundation-bg-dark-3" />
          <div>
            <p className="text-caption text-foundation-text-dark-tertiary mb-1">
              Caption or metadata
            </p>
            <p className="text-body-small text-foundation-text-dark-primary">
              Supporting information with smaller text
            </p>
          </div>
        </div>
      </section>

      <Toast message="Copied to clipboard!" value={copiedValue ?? ""} visible={toastVisible} />
    </div>
  );
}
