import type { ComponentProps } from "react";

import { SettingRow } from "../../app/components/settings/SettingRow";

export type SettingRowBlockProps = ComponentProps<typeof SettingRow>;

export function SettingRowBlock(props: SettingRowBlockProps) {
  return <SettingRow {...props} />;
}
