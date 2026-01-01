import { useChatUISlots } from "../../../slots";

/**
 * ChatSidebarFooterSlot - Internal module
 * Reads useChatUISlots() and renders at the bottom
 *
 * Following best practice:
 * - Slots only at template/root
 * - ChatSidebar just includes <ChatSidebarFooterSlot /> in its layout
 * - ChatSidebar public props remain unchanged
 */
export function ChatSidebarFooterSlot() {
  const { sidebarFooter } = useChatUISlots();

  if (!sidebarFooter) {
    return null;
  }

  return <div className="border-t border-border">{sidebarFooter}</div>;
}
