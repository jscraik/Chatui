import { createHash } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";

import { colorTokens } from "./colors.js";
import { spacingScale } from "./spacing.js";
import { typographyTokens } from "./typography.js";

export interface DesignTokens {
    colors: typeof colorTokens;
    spacing: typeof spacingScale;
    typography: typeof typographyTokens;
}

export interface GenerationManifest {
    version: string;
    sha256: {
        swift: string;
        css: string;
    };
    generated: string;
}

export class TokenGenerator {
    private tokens: DesignTokens;

    constructor() {
        this.tokens = {
            colors: colorTokens,
            spacing: spacingScale,
            typography: typographyTokens,
        };
    }

    /**
     * Generate Swift constants from design tokens
     * Output is deterministic - same input produces identical file bytes
     */
    async generateSwift(): Promise<string> {
        const swiftContent = `import SwiftUI

/// Design tokens generated from the shared token system
/// This file provides Swift constants that match the CSS custom properties
/// Generated deterministically - same input produces identical output
public enum DesignTokens {
    
    // MARK: - Colors
    
    public enum Colors {
        
        public enum Background {
${this.generateColorConstants('background')}
            
            // Dynamic colors that adapt to system appearance
            public static let primary = Color.dynamicColor(
                light: lightPrimary,
                dark: darkPrimary
            )
            
            public static let secondary = Color.dynamicColor(
                light: lightSecondary,
                dark: darkSecondary
            )
            
            public static let tertiary = Color.dynamicColor(
                light: lightTertiary,
                dark: darkTertiary
            )
        }
        
        public enum Text {
${this.generateColorConstants('text')}
            
            // Dynamic colors that adapt to system appearance
            public static let primary = Color.dynamicColor(
                light: lightPrimary,
                dark: darkPrimary
            )
            
            public static let secondary = Color.dynamicColor(
                light: lightSecondary,
                dark: darkSecondary
            )
            
            public static let tertiary = Color.dynamicColor(
                light: lightTertiary,
                dark: darkTertiary
            )
            
            public static let inverted = Color.dynamicColor(
                light: lightInverted,
                dark: darkInverted
            )
        }
        
        public enum Icon {
${this.generateColorConstants('icon')}
            
            // Dynamic colors that adapt to system appearance
            public static let primary = Color.dynamicColor(
                light: lightPrimary,
                dark: darkPrimary
            )
            
            public static let secondary = Color.dynamicColor(
                light: lightSecondary,
                dark: darkSecondary
            )
            
            public static let tertiary = Color.dynamicColor(
                light: lightTertiary,
                dark: darkTertiary
            )
            
            public static let inverted = Color.dynamicColor(
                light: lightInverted,
                dark: darkInverted
            )
        }
        
        public enum Accent {
${this.generateAccentColorConstants()}
            
            // Dynamic colors that adapt to system appearance
            public static let blue = Color.dynamicColor(
                light: lightBlue,
                dark: darkBlue
            )
            
            public static let red = Color.dynamicColor(
                light: lightRed,
                dark: darkRed
            )
            
            public static let orange = Color.dynamicColor(
                light: lightOrange,
                dark: darkOrange
            )
            
            public static let green = Color.dynamicColor(
                light: lightGreen,
                dark: darkGreen
            )
        }
    }
    
    // MARK: - Typography
    
    public enum Typography {
        public static let fontFamily = "${this.tokens.typography.fontFamily}"
        
${this.generateTypographyConstants()}
    }
    
    // MARK: - Spacing
    
    public enum Spacing {
        public static let scale: [CGFloat] = [${this.tokens.spacing.join(', ')}]
        
        // Convenience accessors
${this.generateSpacingConstants()}
    }
    
    // MARK: - Corner Radius
    
    public enum CornerRadius {
        public static let small: CGFloat = 4
        public static let medium: CGFloat = 8
        public static let large: CGFloat = 12
        public static let extraLarge: CGFloat = 16
    }
    
    // MARK: - Accessibility
    
    public enum Accessibility {
        /// Focus ring color for keyboard navigation
        public static let focusRing = Color(hex: "#0285FF")
        
        /// Focus ring width for keyboard navigation
        public static let focusRingWidth: CGFloat = 2
        
        /// High contrast variants
        public enum HighContrast {
            public static let textOnBackground = Color(hex: "#FFFFFF")
            public static let backgroundContrast = Color(hex: "#000000")
            public static let borderContrast = Color(hex: "#FFFFFF")
        }
        
        /// Reduced motion preferences
        public enum Animation {
            public static let duration: Double = 0.25
            public static let reducedDuration: Double = 0.1
            
            /// Returns appropriate animation duration based on system preferences
            public static func duration(respectingMotionPreference: Bool = true) -> Double {
                if respectingMotionPreference {
                    return AccessibilityPreferences.prefersReducedMotion ? reducedDuration : duration
                }
                return duration
            }
        }
        
        /// System accessibility preferences
        public enum AccessibilityPreferences {
            /// Whether the user prefers reduced motion
            public static var prefersReducedMotion: Bool {
                NSWorkspace.shared.accessibilityDisplayShouldReduceMotion
            }
            
            /// Whether the user prefers high contrast
            public static var prefersHighContrast: Bool {
                NSWorkspace.shared.accessibilityDisplayShouldIncreaseContrast
            }
            
            /// Whether the user prefers reduced transparency
            public static var prefersReducedTransparency: Bool {
                NSWorkspace.shared.accessibilityDisplayShouldReduceTransparency
            }
        }
    }
}

// MARK: - Color Extensions

extension Color {
    /// Creates a Color from a hex string
    public init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
    
    /// Creates a dynamic color that adapts to light/dark mode
    public static func dynamicColor(light: Color, dark: Color) -> Color {
        return Color(NSColor(name: nil) { appearance in
            switch appearance.bestMatch(from: [.aqua, .darkAqua]) {
            case .darkAqua:
                return NSColor(dark)
            default:
                return NSColor(light)
            }
        })
    }
}

// MARK: - Accessibility Extensions

extension View {
    /// Applies focus ring styling for keyboard navigation
    public func accessibilityFocusRing() -> some View {
        self.overlay(
            RoundedRectangle(cornerRadius: DesignTokens.CornerRadius.medium)
                .stroke(DesignTokens.Accessibility.focusRing, lineWidth: DesignTokens.Accessibility.focusRingWidth)
                .opacity(0) // Will be shown by system focus management
        )
    }
    
    /// Applies high contrast styling when needed
    public func accessibilityHighContrast() -> some View {
        self.modifier(HighContrastModifier())
    }
}

private struct HighContrastModifier: ViewModifier {
    func body(content: Content) -> some View {
        if DesignTokens.Accessibility.AccessibilityPreferences.prefersHighContrast {
            content
                .foregroundColor(DesignTokens.Accessibility.HighContrast.textOnBackground)
                .background(DesignTokens.Accessibility.HighContrast.backgroundContrast)
        } else {
            content
        }
    }
}
`;

        return swiftContent;
    }

    /**
     * Generate CSS custom properties from design tokens
     * This maintains compatibility with existing foundations.css
     */
    async generateCSS(): Promise<string> {
        const cssContent = `/*
  Apps SDK UI audit tokens (from Figma foundations).
  These are reference values for compliance checks and documentation.
  Do not use as styling defaults; prefer Apps SDK UI tokens/classes instead.
  Generated deterministically - same input produces identical output.
*/

:root {
  /* Dark backgrounds */
  --foundation-bg-dark-1: ${this.tokens.colors.background.dark.primary};
  --foundation-bg-dark-2: ${this.tokens.colors.background.dark.secondary};
  --foundation-bg-dark-3: ${this.tokens.colors.background.dark.tertiary};

  /* Dark text */
  --foundation-text-dark-primary: ${this.tokens.colors.text.dark.primary};
  --foundation-text-dark-secondary: ${this.tokens.colors.text.dark.secondary};
  --foundation-text-dark-tertiary: ${this.tokens.colors.text.dark.tertiary};

  /* Dark accents */
  --foundation-accent-blue: ${this.tokens.colors.accent.dark.blue};
  --foundation-accent-red: ${this.tokens.colors.accent.dark.red};
  --foundation-accent-orange: ${this.tokens.colors.accent.dark.orange};
  --foundation-accent-green: ${this.tokens.colors.accent.dark.green};

  /* Light backgrounds */
  --foundation-bg-light-1: ${this.tokens.colors.background.light.primary};
  --foundation-bg-light-2: ${this.tokens.colors.background.light.secondary};
  --foundation-bg-light-3: ${this.tokens.colors.background.light.tertiary};

  /* Light text */
  --foundation-text-light-primary: ${this.tokens.colors.text.light.primary};
  --foundation-text-light-secondary: ${this.tokens.colors.text.light.secondary};
  --foundation-text-light-tertiary: ${this.tokens.colors.text.light.tertiary};

  /* Light icon */
  --foundation-icon-light-primary: ${this.tokens.colors.icon.light.primary};
  --foundation-icon-light-secondary: ${this.tokens.colors.icon.light.secondary};
  --foundation-icon-light-tertiary: ${this.tokens.colors.icon.light.tertiary};
  --foundation-icon-light-inverted: ${this.tokens.colors.icon.light.inverted};

  /* Dark icon */
  --foundation-icon-dark-primary: ${this.tokens.colors.icon.dark.primary};
  --foundation-icon-dark-secondary: ${this.tokens.colors.icon.dark.secondary};
  --foundation-icon-dark-tertiary: ${this.tokens.colors.icon.dark.tertiary};
  --foundation-icon-dark-inverted: ${this.tokens.colors.icon.dark.inverted};

  /* Light accents */
  --foundation-accent-blue-light: ${this.tokens.colors.accent.light.blue};
  --foundation-accent-red-light: ${this.tokens.colors.accent.light.red};
  --foundation-accent-orange-light: ${this.tokens.colors.accent.light.orange};
  --foundation-accent-green-light: ${this.tokens.colors.accent.light.green};

  /* Spacing scale */
${this.generateCSSSpacing()}

  /* Typography */
  --foundation-font-family:
    "${this.tokens.typography.fontFamily}", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
${this.generateCSSTypography()}

  /* Accessibility */
  --foundation-focus-ring: #0285ff;
  --foundation-focus-ring-width: 2px;
  --foundation-animation-duration: 0.25s;
  --foundation-animation-duration-reduced: 0.1s;
  
  /* High contrast variants */
  --foundation-high-contrast-text: #ffffff;
  --foundation-high-contrast-bg: #000000;
  --foundation-high-contrast-border: #ffffff;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --foundation-text-dark-primary: var(--foundation-high-contrast-text);
    --foundation-text-light-primary: var(--foundation-high-contrast-bg);
    --foundation-bg-dark-1: var(--foundation-high-contrast-bg);
    --foundation-bg-light-1: var(--foundation-high-contrast-text);
    --foundation-focus-ring-width: 3px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  :root {
    --foundation-animation-duration: var(--foundation-animation-duration-reduced);
  }
  
  * {
    animation-duration: var(--foundation-animation-duration-reduced) !important;
    transition-duration: var(--foundation-animation-duration-reduced) !important;
  }
}

/* Focus ring utilities */
.foundation-focus-ring {
  outline: var(--foundation-focus-ring-width) solid var(--foundation-focus-ring);
  outline-offset: 2px;
}

.foundation-focus-ring:focus-visible {
  outline: var(--foundation-focus-ring-width) solid var(--foundation-focus-ring);
  outline-offset: 2px;
}

/* Accessibility utilities */
.foundation-high-contrast {
  color: var(--foundation-high-contrast-text);
  background-color: var(--foundation-high-contrast-bg);
  border: 1px solid var(--foundation-high-contrast-border);
}

.foundation-reduced-motion {
  animation: none !important;
  transition: none !important;
}
`;

        return cssContent;
    }

    /**
     * Generate manifest with SHA hashes and metadata
     */
    async generateManifest(swiftContent: string, cssContent: string): Promise<GenerationManifest> {
        const swiftHash = createHash('sha256').update(swiftContent).digest('hex');
        const cssHash = createHash('sha256').update(cssContent).digest('hex');

        return {
            version: "1.0.0",
            sha256: {
                swift: swiftHash,
                css: cssHash,
            },
            generated: new Date().toISOString(),
        };
    }

    /**
     * Generate all outputs and write to appropriate directories
     */
    async generate(): Promise<void> {
        // Generate content
        const swiftContent = await this.generateSwift();
        const cssContent = await this.generateCSS();
        const manifest = await this.generateManifest(swiftContent, cssContent);

        // Determine output paths relative to packages/tokens
        const swiftOutputPath = join(process.cwd(), '../ui-swift/Sources/ChatUISwift/DesignTokens.swift');
        const cssOutputPath = join(process.cwd(), 'src/foundations.css');
        const manifestOutputPath = join(process.cwd(), 'outputs/manifest.json');

        await mkdir(dirname(swiftOutputPath), { recursive: true });
        await mkdir(dirname(cssOutputPath), { recursive: true });
        await mkdir(dirname(manifestOutputPath), { recursive: true });

        // Write files
        await writeFile(swiftOutputPath, swiftContent, 'utf8');
        await writeFile(cssOutputPath, cssContent, 'utf8');
        await writeFile(manifestOutputPath, JSON.stringify(manifest, null, 2), 'utf8');

        console.log('✅ Token generation complete');
        console.log(`   Swift: ${swiftOutputPath}`);
        console.log(`   CSS: ${cssOutputPath}`);
        console.log(`   Manifest: ${manifestOutputPath}`);
        console.log(`   Swift SHA: ${manifest.sha256.swift.substring(0, 8)}...`);
        console.log(`   CSS SHA: ${manifest.sha256.css.substring(0, 8)}...`);
    }

    private generateColorConstants(category: 'background' | 'text' | 'icon'): string {
        const colors = this.tokens.colors[category];
        const lines: string[] = [];

        // Light colors
        Object.entries(colors.light).forEach(([name, value]) => {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            lines.push(`            public static let light${capitalizedName} = Color(hex: "${value}")`);
        });

        lines.push('');

        // Dark colors
        Object.entries(colors.dark).forEach(([name, value]) => {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            lines.push(`            public static let dark${capitalizedName} = Color(hex: "${value}")`);
        });

        return lines.join('\n');
    }

    private generateAccentColorConstants(): string {
        const lines: string[] = [];

        // Light accent colors
        Object.entries(this.tokens.colors.accent.light).forEach(([name, value]) => {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            lines.push(`            public static let light${capitalizedName} = Color(hex: "${value}")`);
        });

        lines.push('');

        // Dark accent colors
        Object.entries(this.tokens.colors.accent.dark).forEach(([name, value]) => {
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            lines.push(`            public static let dark${capitalizedName} = Color(hex: "${value}")`);
        });

        return lines.join('\n');
    }

    private generateTypographyConstants(): string {
        const lines: string[] = [];

        Object.entries(this.tokens.typography).forEach(([key, value]) => {
            if (key === 'fontFamily') return; // Already handled above

            const enumName = key.charAt(0).toUpperCase() + key.slice(1);
            lines.push(`        public enum ${enumName} {`);
            lines.push(`            public static let size: CGFloat = ${value.size}`);
            lines.push(`            public static let lineHeight: CGFloat = ${value.lineHeight}`);
            lines.push(`            public static let weight = Font.Weight.${this.mapFontWeight(value.weight)}`);

            if ('emphasisWeight' in value) {
                lines.push(`            public static let emphasisWeight = Font.Weight.${this.mapFontWeight(value.emphasisWeight)}`);
            }

            lines.push(`            public static let tracking: CGFloat = ${value.tracking}`);
            lines.push(`        }`);
            lines.push('');
        });

        return lines.join('\n');
    }

    private generateSpacingConstants(): string {
        const spacingNames = ['xxl', 'xl', 'lg', 'lgMd', 'md', 'mdSm', 'sm', 'smXs', 'xs', 'xxs', 'xxxs', 'none'];
        const lines: string[] = [];

        this.tokens.spacing.forEach((value, index) => {
            if (index < spacingNames.length) {
                lines.push(`        public static let ${spacingNames[index]}: CGFloat = ${value}`);
            }
        });

        return lines.join('\n');
    }

    private generateCSSSpacing(): string {
        const lines: string[] = [];

        this.tokens.spacing.forEach((value) => {
            lines.push(`  --foundation-space-${value}: ${value}px;`);
        });

        return lines.join('\n');
    }

    private generateCSSTypography(): string {
        const lines: string[] = [];

        Object.entries(this.tokens.typography).forEach(([key, value]) => {
            if (key === 'fontFamily') return; // Already handled above

            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            lines.push(`  --foundation-${cssKey}-size: ${value.size}px;`);
            lines.push(`  --foundation-${cssKey}-line: ${value.lineHeight}px;`);
            lines.push(`  --foundation-${cssKey}-weight: ${value.weight};`);

            if ('emphasisWeight' in value) {
                lines.push(`  --foundation-${cssKey}-weight-emphasis: ${value.emphasisWeight};`);
            } else {
                lines.push(`  --foundation-${cssKey}-weight-regular: ${value.weight};`);
            }

            lines.push(`  --foundation-${cssKey}-tracking: ${value.tracking}px;`);
            lines.push('');
        });

        return lines.join('\n');
    }

    private mapFontWeight(weight: number): string {
        switch (weight) {
            case 100: return 'ultraLight';
            case 200: return 'thin';
            case 300: return 'light';
            case 400: return 'regular';
            case 500: return 'medium';
            case 600: return 'semibold';
            case 700: return 'bold';
            case 800: return 'heavy';
            case 900: return 'black';
            default: return 'regular';
        }
    }
}