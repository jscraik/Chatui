import { readFile, writeFile } from "fs/promises";

const dtcgPath = new URL("../src/tokens/index.dtcg.json", import.meta.url);
const colorsPath = new URL("../src/colors.ts", import.meta.url);
const spacingPath = new URL("../src/spacing.ts", import.meta.url);
const typographyPath = new URL("../src/typography.ts", import.meta.url);

const banner = "// Generated from src/tokens/index.dtcg.json. Do not edit by hand.\n";

type DtcgToken = { value: string | number; type?: string };
type DtcgRoot = {
  color: {
    background: {
      light: { primary: DtcgToken; secondary: DtcgToken; tertiary: DtcgToken };
      dark: { primary: DtcgToken; secondary: DtcgToken; tertiary: DtcgToken };
    };
    text: {
      light: {
        primary: DtcgToken;
        secondary: DtcgToken;
        tertiary: DtcgToken;
        inverted: DtcgToken;
      };
      dark: {
        primary: DtcgToken;
        secondary: DtcgToken;
        tertiary: DtcgToken;
        inverted: DtcgToken;
      };
    };
    icon: {
      light: {
        primary: DtcgToken;
        secondary: DtcgToken;
        tertiary: DtcgToken;
        inverted: DtcgToken;
      };
      dark: {
        primary: DtcgToken;
        secondary: DtcgToken;
        tertiary: DtcgToken;
        inverted: DtcgToken;
      };
    };
    accent: {
      light: {
        gray: DtcgToken;
        red: DtcgToken;
        orange: DtcgToken;
        yellow: DtcgToken;
        green: DtcgToken;
        blue: DtcgToken;
        purple: DtcgToken;
        pink: DtcgToken;
        foreground: DtcgToken;
      };
      dark: {
        gray: DtcgToken;
        red: DtcgToken;
        orange: DtcgToken;
        yellow: DtcgToken;
        green: DtcgToken;
        blue: DtcgToken;
        purple: DtcgToken;
        pink: DtcgToken;
        foreground: DtcgToken;
      };
    };
    interactive: {
      light: { ring: DtcgToken };
      dark: { ring: DtcgToken };
    };
  };
  space: Record<string, DtcgToken>;
  type: {
    fontFamily: DtcgToken;
    web: {
      heading1: {
        size: DtcgToken;
        lineHeight: DtcgToken;
        weight: DtcgToken;
        tracking: DtcgToken;
      };
      heading2: {
        size: DtcgToken;
        lineHeight: DtcgToken;
        weight: DtcgToken;
        tracking: DtcgToken;
      };
      heading3: {
        size: DtcgToken;
        lineHeight: DtcgToken;
        weight: DtcgToken;
        tracking: DtcgToken;
      };
      body: {
        size: DtcgToken;
        lineHeight: DtcgToken;
        weight: DtcgToken;
        emphasisWeight: DtcgToken;
        tracking: DtcgToken;
      };
      bodySmall: {
        size: DtcgToken;
        lineHeight: DtcgToken;
        weight: DtcgToken;
        emphasisWeight: DtcgToken;
        tracking: DtcgToken;
      };
      caption: {
        size: DtcgToken;
        lineHeight: DtcgToken;
        weight: DtcgToken;
        tracking: DtcgToken;
      };
    };
  };
};

function getValue(token: DtcgToken, path: string) {
  if (!token || token.value === undefined) {
    throw new Error(`Missing token value at ${path}`);
  }
  return token.value;
}

function buildColors(dtcg: DtcgRoot) {
  const c = dtcg.color;
  return {
    background: {
      light: {
        primary: getValue(c.background.light.primary, "color.background.light.primary"),
        secondary: getValue(c.background.light.secondary, "color.background.light.secondary"),
        tertiary: getValue(c.background.light.tertiary, "color.background.light.tertiary"),
      },
      dark: {
        primary: getValue(c.background.dark.primary, "color.background.dark.primary"),
        secondary: getValue(c.background.dark.secondary, "color.background.dark.secondary"),
        tertiary: getValue(c.background.dark.tertiary, "color.background.dark.tertiary"),
      },
    },
    text: {
      light: {
        primary: getValue(c.text.light.primary, "color.text.light.primary"),
        secondary: getValue(c.text.light.secondary, "color.text.light.secondary"),
        tertiary: getValue(c.text.light.tertiary, "color.text.light.tertiary"),
        inverted: getValue(c.text.light.inverted, "color.text.light.inverted"),
      },
      dark: {
        primary: getValue(c.text.dark.primary, "color.text.dark.primary"),
        secondary: getValue(c.text.dark.secondary, "color.text.dark.secondary"),
        tertiary: getValue(c.text.dark.tertiary, "color.text.dark.tertiary"),
        inverted: getValue(c.text.dark.inverted, "color.text.dark.inverted"),
      },
    },
    icon: {
      light: {
        primary: getValue(c.icon.light.primary, "color.icon.light.primary"),
        secondary: getValue(c.icon.light.secondary, "color.icon.light.secondary"),
        tertiary: getValue(c.icon.light.tertiary, "color.icon.light.tertiary"),
        inverted: getValue(c.icon.light.inverted, "color.icon.light.inverted"),
      },
      dark: {
        primary: getValue(c.icon.dark.primary, "color.icon.dark.primary"),
        secondary: getValue(c.icon.dark.secondary, "color.icon.dark.secondary"),
        tertiary: getValue(c.icon.dark.tertiary, "color.icon.dark.tertiary"),
        inverted: getValue(c.icon.dark.inverted, "color.icon.dark.inverted"),
      },
    },
    accent: {
      light: {
        gray: getValue(c.accent.light.gray, "color.accent.light.gray"),
        red: getValue(c.accent.light.red, "color.accent.light.red"),
        orange: getValue(c.accent.light.orange, "color.accent.light.orange"),
        yellow: getValue(c.accent.light.yellow, "color.accent.light.yellow"),
        green: getValue(c.accent.light.green, "color.accent.light.green"),
        blue: getValue(c.accent.light.blue, "color.accent.light.blue"),
        purple: getValue(c.accent.light.purple, "color.accent.light.purple"),
        pink: getValue(c.accent.light.pink, "color.accent.light.pink"),
        foreground: getValue(c.accent.light.foreground, "color.accent.light.foreground"),
      },
      dark: {
        gray: getValue(c.accent.dark.gray, "color.accent.dark.gray"),
        red: getValue(c.accent.dark.red, "color.accent.dark.red"),
        orange: getValue(c.accent.dark.orange, "color.accent.dark.orange"),
        yellow: getValue(c.accent.dark.yellow, "color.accent.dark.yellow"),
        green: getValue(c.accent.dark.green, "color.accent.dark.green"),
        blue: getValue(c.accent.dark.blue, "color.accent.dark.blue"),
        purple: getValue(c.accent.dark.purple, "color.accent.dark.purple"),
        pink: getValue(c.accent.dark.pink, "color.accent.dark.pink"),
        foreground: getValue(c.accent.dark.foreground, "color.accent.dark.foreground"),
      },
    },
    interactive: {
      light: {
        ring: getValue(c.interactive.light.ring, "color.interactive.light.ring"),
      },
      dark: {
        ring: getValue(c.interactive.dark.ring, "color.interactive.dark.ring"),
      },
    },
  } as const;
}

function buildSpacing(dtcg: DtcgRoot) {
  const space = dtcg.space;
  return [
    getValue(space.s128, "space.s128"),
    getValue(space.s64, "space.s64"),
    getValue(space.s48, "space.s48"),
    getValue(space.s40, "space.s40"),
    getValue(space.s32, "space.s32"),
    getValue(space.s24, "space.s24"),
    getValue(space.s16, "space.s16"),
    getValue(space.s12, "space.s12"),
    getValue(space.s8, "space.s8"),
    getValue(space.s4, "space.s4"),
    getValue(space.s2, "space.s2"),
    getValue(space.s0, "space.s0"),
  ] as const;
}

function buildTypography(dtcg: DtcgRoot) {
  const t = dtcg.type;
  // Use web platform values as default
  const web = t.web;
  return {
    fontFamily: getValue(t.fontFamily, "type.fontFamily"),
    heading1: {
      size: getValue(web.heading1.size, "type.web.heading1.size"),
      lineHeight: getValue(web.heading1.lineHeight, "type.web.heading1.lineHeight"),
      weight: getValue(web.heading1.weight, "type.web.heading1.weight"),
      tracking: getValue(web.heading1.tracking, "type.web.heading1.tracking"),
    },
    heading2: {
      size: getValue(web.heading2.size, "type.web.heading2.size"),
      lineHeight: getValue(web.heading2.lineHeight, "type.web.heading2.lineHeight"),
      weight: getValue(web.heading2.weight, "type.web.heading2.weight"),
      tracking: getValue(web.heading2.tracking, "type.web.heading2.tracking"),
    },
    heading3: {
      size: getValue(web.heading3.size, "type.web.heading3.size"),
      lineHeight: getValue(web.heading3.lineHeight, "type.web.heading3.lineHeight"),
      weight: getValue(web.heading3.weight, "type.web.heading3.weight"),
      tracking: getValue(web.heading3.tracking, "type.web.heading3.tracking"),
    },
    body: {
      size: getValue(web.body.size, "type.web.body.size"),
      lineHeight: getValue(web.body.lineHeight, "type.web.body.lineHeight"),
      weight: getValue(web.body.weight, "type.web.body.weight"),
      emphasisWeight: getValue(web.body.emphasisWeight, "type.web.body.emphasisWeight"),
      tracking: getValue(web.body.tracking, "type.web.body.tracking"),
    },
    bodySmall: {
      size: getValue(web.bodySmall.size, "type.web.bodySmall.size"),
      lineHeight: getValue(web.bodySmall.lineHeight, "type.web.bodySmall.lineHeight"),
      weight: getValue(web.bodySmall.weight, "type.web.bodySmall.weight"),
      emphasisWeight: getValue(web.bodySmall.emphasisWeight, "type.web.bodySmall.emphasisWeight"),
      tracking: getValue(web.bodySmall.tracking, "type.web.bodySmall.tracking"),
    },
    caption: {
      size: getValue(web.caption.size, "type.web.caption.size"),
      lineHeight: getValue(web.caption.lineHeight, "type.web.caption.lineHeight"),
      weight: getValue(web.caption.weight, "type.web.caption.weight"),
      emphasisWeight: getValue(web.caption.emphasisWeight, "type.web.caption.emphasisWeight"),
      tracking: getValue(web.caption.tracking, "type.web.caption.tracking"),
    },
  } as const;
}

const dtcgRaw = await readFile(dtcgPath, "utf8");
const dtcg = JSON.parse(dtcgRaw);

const colorTokens = buildColors(dtcg);
const spacingScale = buildSpacing(dtcg);
const typographyTokens = buildTypography(dtcg);

await writeFile(
  colorsPath,
  `${banner}export const colorTokens = ${JSON.stringify(colorTokens, null, 2)} as const;\n`,
);

await writeFile(
  spacingPath,
  `${banner}export const spacingScale = ${JSON.stringify(spacingScale)} as const;\n`,
);

await writeFile(
  typographyPath,
  `${banner}export const typographyTokens = ${JSON.stringify(typographyTokens, null, 2)} as const;\n`,
);
