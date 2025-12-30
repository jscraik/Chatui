import { useMemo, useState } from "react";

import { Button, IconButton } from "@chatui/ui";
import { templateRegistry } from "@chatui/ui/templates";

import type { Route } from "../Router";

interface TemplatesPageProps {
  onNavigate: (route: Route) => void;
}

export function TemplatesPage({ onNavigate }: TemplatesPageProps) {
  const [selectedId, setSelectedId] = useState(templateRegistry[0]?.id);

  const selectedTemplate = useMemo(
    () => templateRegistry.find((template) => template.id === selectedId) ?? templateRegistry[0],
    [selectedId],
  );

  const TemplateComponent = selectedTemplate?.Component;

  return (
    <div className="min-h-screen bg-foundation-bg-dark-1 text-foundation-text-dark-primary">
      <div className="border-b border-foundation-bg-dark-3 bg-foundation-bg-dark-2">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <IconButton
              icon={<span>←</span>}
              onClick={() => onNavigate("chat")}
              title="Back to Chat"
              variant="ghost"
            />
            <div>
              <h1 className="text-lg font-semibold text-foundation-text-dark-primary">
                Templates
              </h1>
              <p className="text-xs text-foundation-text-dark-tertiary">
                Reusable UI shells for ChatUI surfaces
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => onNavigate("variants")}>
            Variants
          </Button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-56px)]">
        <aside className="w-80 border-r border-foundation-bg-dark-3 bg-foundation-bg-dark-2 p-4 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-foundation-text-dark-tertiary">
            Template Library
          </div>
          <div className="space-y-2">
            {templateRegistry.map((template) => {
              const isActive = template.id === selectedId;
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedId(template.id)}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                    isActive
                      ? "border-foundation-accent-blue bg-foundation-accent-blue/15 text-foundation-text-dark-primary"
                      : "border-foundation-bg-dark-3 bg-foundation-bg-dark-1 text-foundation-text-dark-secondary hover:bg-foundation-bg-dark-3/60"
                  }`}
                >
                  <div className="text-sm font-semibold">{template.title}</div>
                  <p className="text-xs text-foundation-text-dark-tertiary mt-1">
                    {template.description}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 min-h-0 p-6">
          <div className="h-full min-h-[680px] rounded-2xl border border-foundation-bg-dark-3 bg-foundation-bg-dark-1 overflow-hidden shadow-2xl">
            {TemplateComponent ? (
              <TemplateComponent />
            ) : (
              <div className="h-full flex items-center justify-center text-foundation-text-dark-tertiary">
                Select a template to preview.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
