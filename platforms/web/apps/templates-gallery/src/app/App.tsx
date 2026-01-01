import { useMemo, useState } from "react";
import {
  categories,
  getTemplatesByCategory,
  templateRegistry,
} from "../shared/template-registry";
import type { TemplateDefinition } from "../shared/template-registry";

export function App() {
  const [selectedId, setSelectedId] = useState(templateRegistry[0]?.id);

  const selectedTemplate = useMemo(
    () => templateRegistry.find((template) => template.id === selectedId) ?? templateRegistry[0],
    [selectedId],
  );

  const TemplateComponent = selectedTemplate?.Component;

  // Group templates by category
  const groupedTemplates = useMemo(() => {
    const categoryOrder: (keyof typeof categories)[] = ["components", "design-system", "templates", "settings", "layouts"];
    return categoryOrder
      .map((categoryKey) => ({
        categoryKey,
        categoryName: categories[categoryKey],
        templates: getTemplatesByCategory(categoryKey),
      }))
      .filter((group) => group.templates.length > 0);
  }, []);

  return (
    <div className="dark min-h-screen bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1 text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 border-b border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 bg-foundation-bg-light-2/95 dark:bg-foundation-bg-dark-2/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
              ChatUI Templates Gallery
            </h1>
            <p className="text-sm text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary mt-1">
              Template components from @chatui/ui
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-3 rounded-lg text-sm text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary">
              {templateRegistry.length} templates
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-screen pt-[89px]">
        {/* Sidebar */}
        <aside className="w-80 border-r border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2 overflow-y-auto">
          <div className="p-4">
            <div className="text-xs uppercase tracking-wider font-medium text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary mb-4 px-2">
              Template Library
            </div>
            <div className="flex-1 overflow-y-auto pb-4 space-y-6">
              {groupedTemplates.map((group) => (
                <div key={group.categoryKey}>
                  <div className="text-sm font-medium text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary mb-3 px-2">
                    {group.categoryName}
                  </div>
                  <div className="space-y-2">
                    {group.templates.map((template) => {
                      const isActive = template.id === selectedId;
                      return (
                        <button
                          key={template.id}
                          type="button"
                          onClick={() => setSelectedId(template.id)}
                          className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${
                            isActive
                              ? "border-foundation-accent-blue-light dark:border-foundation-accent-blue bg-foundation-accent-blue-light/10 dark:bg-foundation-accent-blue/10 text-foundation-text-light-primary dark:text-foundation-text-dark-primary shadow-sm"
                              : "border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1 text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary hover:bg-foundation-bg-light-3/50 dark:hover:bg-foundation-bg-dark-3/50 hover:border-foundation-bg-light-3 dark:hover:border-foundation-bg-dark-3"
                          }`}
                        >
                          <div className={`text-sm font-medium ${isActive ? 'text-foundation-text-light-primary dark:text-foundation-text-dark-primary' : ''}`}>
                            {template.title}
                          </div>
                          <p className="text-xs text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary mt-1 line-clamp-2">
                            {template.description}
                          </p>
                          {template.tags && template.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {template.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className={`px-2 py-0.5 text-xs rounded ${
                                    isActive
                                      ? 'bg-foundation-accent-blue-light/20 dark:bg-foundation-accent-blue/20 text-foundation-accent-blue-light dark:text-foundation-accent-blue'
                                      : 'text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-3'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 p-8 overflow-auto bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
              {selectedTemplate?.title}
            </h2>
            <p className="text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary mt-2">
              {selectedTemplate?.description}
            </p>
            {selectedTemplate?.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedTemplate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2 border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-foundation-bg-light-3 dark:border-foundation-bg-dark-3 bg-foundation-bg-light-2 dark:bg-foundation-bg-dark-2 shadow-lg">
            {TemplateComponent ? (
              <TemplateComponent {...selectedTemplate.previewProps} />
            ) : (
              <div className="h-full min-h-[600px] flex items-center justify-center text-foundation-text-light-tertiary dark:text-foundation-text-dark-tertiary">
                Select a template to preview
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
