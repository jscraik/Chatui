import { readFile, writeFile } from "fs/promises";

const dtcgPath = new URL("../src/tokens/index.dtcg.json", import.meta.url);
const colorsPath = new URL("../src/colors.ts", import.meta.url);
const spacingPath = new URL("../src/spacing.ts", import.meta.url);
const typographyPath = new URL("../src/typography.ts", import.meta.url);

const banner = "// Generated from src/tokens/index.dtcg.json. Do not edit by hand.\n";

type DtcgToken = { value: string | number; type?: string };

function getValue(token: DtcgToken, path: string) {
  if (!token || token.value === undefined) {
    throw new Error(`Missing token value at ${path}`);
  }
  return token.value;
}

function buildColors(dtcg: any) {
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
        blue: getValue(c.accent.light.blue, "color.accent.light.blue"),
        red: getValue(c.accent.light.red, "color.accent.light.red"),
        orange: getValue(c.accent.light.orange, "color.accent.light.orange"),
        green: getValue(c.accent.light.green, "color.accent.light.green"),
        purple: getValue(c.accent.light.purple, "color.accent.light.purple"),
      },
      dark: {
        blue: getValue(c.accent.dark.blue, "color.accent.dark.blue"),
        red: getValue(c.accent.dark.red, "color.accent.dark.red"),
        orange: getValue(c.accent.dark.orange, "color.accent.dark.orange"),
        green: getValue(c.accent.dark.green, "color.accent.dark.green"),
        purple: getValue(c.accent.dark.purple, "color.accent.dark.purple"),
      },
    },
  } as const;
}

function buildSpacing(dtcg: any) {
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

function buildTypography(dtcg: any) {
  const t = dtcg.type;
  return {
    fontFamily: getValue(t.fontFamily, "type.fontFamily"),
    heading1: {
      size: getValue(t.heading1.size, "type.heading1.size"),
      lineHeight: getValue(t.heading1.lineHeight, "type.heading1.lineHeight"),
      weight: getValue(t.heading1.weight, "type.heading1.weight"),
      tracking: getValue(t.heading1.tracking, "type.heading1.tracking"),
    },
    heading2: {
      size: getValue(t.heading2.size, "type.heading2.size"),
      lineHeight: getValue(t.heading2.lineHeight, "type.heading2.lineHeight"),
      weight: getValue(t.heading2.weight, "type.heading2.weight"),
      tracking: getValue(t.heading2.tracking, "type.heading2.tracking"),
    },
    heading3: {
      size: getValue(t.heading3.size, "type.heading3.size"),
      lineHeight: getValue(t.heading3.lineHeight, "type.heading3.lineHeight"),
      weight: getValue(t.heading3.weight, "type.heading3.weight"),
      tracking: getValue(t.heading3.tracking, "type.heading3.tracking"),
    },
    body: {
      size: getValue(t.body.size, "type.body.size"),
      lineHeight: getValue(t.body.lineHeight, "type.body.lineHeight"),
      weight: getValue(t.body.weight, "type.body.weight"),
      emphasisWeight: getValue(t.body.emphasisWeight, "type.body.emphasisWeight"),
      tracking: getValue(t.body.tracking, "type.body.tracking"),
    },
    bodySmall: {
      size: getValue(t.bodySmall.size, "type.bodySmall.size"),
      lineHeight: getValue(t.bodySmall.lineHeight, "type.bodySmall.lineHeight"),
      weight: getValue(t.bodySmall.weight, "type.bodySmall.weight"),
      emphasisWeight: getValue(t.bodySmall.emphasisWeight, "type.bodySmall.emphasisWeight"),
      tracking: getValue(t.bodySmall.tracking, "type.bodySmall.tracking"),
    },
    caption: {
      size: getValue(t.caption.size, "type.caption.size"),
      lineHeight: getValue(t.caption.lineHeight, "type.caption.lineHeight"),
      weight: getValue(t.caption.weight, "type.caption.weight"),
      emphasisWeight: getValue(t.caption.emphasisWeight, "type.caption.emphasisWeight"),
      tracking: getValue(t.caption.tracking, "type.caption.tracking"),
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
