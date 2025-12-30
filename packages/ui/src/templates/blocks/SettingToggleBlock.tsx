import type { ComponentProps } from "react";

import { SettingToggle } from "../../app/components/settings/SettingToggle";

export type SettingToggleBlockProps = ComponentProps<typeof SettingToggle>;

export function SettingToggleBlock(props: SettingToggleBlockProps) {
  return <SettingToggle {...props} />;
}
