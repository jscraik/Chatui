interface ChatSidebarHistoryProps {
  chatHistory: string[];
  searchQuery: string;
}

/**
 * ChatSidebarHistory - Internal module
 * Renders "Recent" list + filtering
 *
 * Following best practice:
 * - Pure render component
 * - Parent owns state (search query)
 */
export function ChatSidebarHistory({ chatHistory, searchQuery }: ChatSidebarHistoryProps) {
  const filteredHistory = chatHistory.filter((chat) =>
    chat.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
      <div className="px-3 pb-2 text-[11px] text-muted-foreground font-medium tracking-wide uppercase">
        Recent
      </div>
      {filteredHistory.map((item, index) => (
        <button
          key={index}
          className="w-full text-left px-3 py-2 text-body-small text-text-secondary hover:bg-muted hover:text-foreground rounded-lg transition-colors line-clamp-1 font-normal"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
