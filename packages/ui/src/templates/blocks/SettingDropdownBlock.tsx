import type { ComponentProps } from "react";

import { SettingDropdown } from "../../app/components/settings/SettingDropdown";

export type SettingDropdownBlockProps = ComponentProps<typeof SettingDropdown>;

export function SettingDropdownBlock(props: SettingDropdownBlockProps) {
  return <SettingDropdown {...props} />;
}
