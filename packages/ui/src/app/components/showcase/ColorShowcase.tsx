import { colorTokens } from "@chatui/tokens";

interface ColorSwatchProps {
  name: string;
  value: string;
  borderClassName: string;
  textClassName: string;
  valueClassName: string;
}

function ColorSwatch({
  name,
  value,
  borderClassName,
  textClassName,
  valueClassName,
}: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`size-12 rounded-lg border shadow-sm ${borderClassName}`}
        style={{ backgroundColor: value }}
      />
      <div>
        <div className={`text-sm font-medium ${textClassName}`}>{name}</div>
        <div className={`text-xs font-mono ${valueClassName}`}>{value}</div>
      </div>
    </div>
  );
}

interface ColorGroupProps {
  title: string;
  colors: Record<string, string>;
  isDark?: boolean;
}

function ColorGroup({ title, colors, isDark = true }: ColorGroupProps) {
  const textClassName = isDark
    ? "text-foundation-text-dark-primary"
    : "text-foundation-text-light-primary";
  const valueClassName = isDark
    ? "text-foundation-text-dark-tertiary"
    : "text-foundation-text-light-tertiary";
  const borderClassName = isDark
    ? "border-foundation-text-dark-primary/10"
    : "border-foundation-text-light-primary/10";
  const groupClassName = isDark
    ? "bg-foundation-bg-dark-2 border-foundation-text-dark-primary/10"
    : "bg-foundation-bg-light-1 border-foundation-text-light-primary/10";

  return (
    <div className={`rounded-xl p-5 border ${groupClassName}`}>
      <h3 className={`text-sm font-semibold mb-4 ${textClassName}`}>{title}</h3>
      <div className="space-y-3">
        {Object.entries(colors).map(([name, value]) => (
          <ColorSwatch
            key={name}
            name={name}
            value={value}
            borderClassName={borderClassName}
            textClassName={textClassName}
            valueClassName={valueClassName}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * ColorShowcase displays all foundation color tokens from the design system.
 * Use this to verify colors match the Figma foundations spec.
 */
export function ColorShowcase() {
  return (
    <div className="w-full max-w-6xl space-y-8">
      {/* Dark Theme Colors */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-foundation-text-dark-primary">Dark Theme</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorGroup title="Backgrounds" colors={colorTokens.background.dark} isDark />
          <ColorGroup title="Text" colors={colorTokens.text.dark} isDark />
          <ColorGroup title="Icons" colors={colorTokens.icon.dark} isDark />
          <ColorGroup title="Accents" colors={colorTokens.accent.dark} isDark />
        </div>
      </section>

      {/* Light Theme Colors */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-foundation-text-light-primary">
          Light Theme
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorGroup title="Backgrounds" colors={colorTokens.background.light} isDark={false} />
          <ColorGroup title="Text" colors={colorTokens.text.light} isDark={false} />
          <ColorGroup title="Icons" colors={colorTokens.icon.light} isDark={false} />
          <ColorGroup title="Accents" colors={colorTokens.accent.light} isDark={false} />
        </div>
      </section>

      {/* CSS Variable Reference */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-foundation-text-dark-primary">
          CSS Variables (Live)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5 border border-foundation-text-dark-primary/10 bg-foundation-bg-dark-2">
            <h3 className="text-sm font-semibold mb-4 text-foundation-text-dark-primary">
              Dark Backgrounds
            </h3>
            <div className="space-y-3">
              {[
                { name: "--foundation-bg-dark-1", desc: "Primary" },
                { name: "--foundation-bg-dark-2", desc: "Secondary" },
                { name: "--foundation-bg-dark-3", desc: "Tertiary" },
              ].map(({ name, desc }) => (
                <div key={name} className="flex items-center gap-3">
                  <div
                    className="size-12 rounded-lg border border-foundation-text-dark-primary/10"
                    style={{ backgroundColor: `var(${name})` }}
                  />
                  <div>
                    <div className="text-sm font-medium text-foundation-text-dark-primary">
                      {desc}
                    </div>
                    <div className="text-xs font-mono text-foundation-text-dark-tertiary">
                      {name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 border border-foundation-text-dark-primary/10 bg-foundation-bg-dark-2">
            <h3 className="text-sm font-semibold mb-4 text-foundation-text-dark-primary">
              Accent Colors
            </h3>
            <div className="space-y-3">
              {[
                { name: "--foundation-accent-blue", desc: "Blue" },
                { name: "--foundation-accent-green", desc: "Green" },
                { name: "--foundation-accent-orange", desc: "Orange" },
                { name: "--foundation-accent-red", desc: "Red" },
              ].map(({ name, desc }) => (
                <div key={name} className="flex items-center gap-3">
                  <div
                    className="size-12 rounded-lg border border-foundation-text-dark-primary/10"
                    style={{ backgroundColor: `var(${name})` }}
                  />
                  <div>
                    <div className="text-sm font-medium text-foundation-text-dark-primary">
                      {desc}
                    </div>
                    <div className="text-xs font-mono text-foundation-text-dark-tertiary">
                      {name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
