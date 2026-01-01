import type { ReactNode } from "react";
import { Copy, ThumbsUp, ThumbsDown, Share, RefreshCw, MoreHorizontal, Pencil } from "lucide-react";

import { IconOpenAILogo, IconUser } from "../../../icons";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export type ChatMessageAction =
  | "copy"
  | "thumbs-up"
  | "thumbs-down"
  | "share"
  | "regenerate"
  | "more"
  | "edit";

interface ChatMessagesProps {
  emptyState?: ReactNode;
  messages?: ChatMessage[];
  onMessageAction?: (action: ChatMessageAction, message: ChatMessage) => void;
}

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm ChatGPT 5.2 Pro. I'm here to help you with any questions or tasks you have. What would you like to work on today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    role: "user",
    content:
      "Can you help me understand how to merge two different chat interfaces to create the best user experience?",
    timestamp: new Date(Date.now() - 1000 * 60 * 28),
  },
  {
    id: "3",
    role: "assistant",
    content: `Of course! When merging chat interfaces, you'll want to focus on several key principles:

1. **Navigation & Organization**: Combine the best sidebar navigation with clear chat history
2. **Input Experience**: Create a powerful yet intuitive input area with quick actions
3. **Visual Hierarchy**: Use proper spacing, typography, and colors to guide the user's eye
4. **Accessibility**: Ensure keyboard shortcuts and screen reader support
5. **Performance**: Keep the interface responsive and smooth

Would you like me to elaborate on any of these points?`,
    timestamp: new Date(Date.now() - 1000 * 60 * 27),
  },
  {
    id: "4",
    role: "user",
    content: "Yes, can you explain more about the visual hierarchy?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: "5",
    role: "assistant",
    content: `Absolutely! Visual hierarchy is crucial for a great chat interface. Here are the key elements:

**Typography**: Use consistent font sizes and weights. Primary text should be white (#FFFFFF), secondary text should be lighter (#CDCDCD), and tertiary text even lighter (#AFAFAF).

**Spacing**: Maintain consistent padding and margins. Chat bubbles should have comfortable spacing between them.

**Color Contrast**: Use a dark theme with proper contrast ratios to reduce eye strain and improve readability.

**Interactive Elements**: Buttons and clickable items should have clear hover states and visual feedback.`,
    timestamp: new Date(Date.now() - 1000 * 60 * 24),
  },
  {
    id: "6",
    role: "user",
    content: "What about the sidebar navigation?",
    timestamp: new Date(Date.now() - 1000 * 60 * 22),
  },
  {
    id: "7",
    role: "assistant",
    content: `Great question! The sidebar should include:

1. **Search functionality** at the top for quick access to past conversations
2. **Chat history** with clear visual separation between items
3. **Collapsible sections** like 'Today', 'Yesterday', 'Previous 7 days'
4. **User profile** section at the bottom
5. **Smooth animations** when expanding/collapsing

The sidebar should also be responsive - collapsible on desktop and an overlay drawer on mobile.`,
    timestamp: new Date(Date.now() - 1000 * 60 * 21),
  },
  {
    id: "8",
    role: "user",
    content: "How do I make it responsive?",
    timestamp: new Date(Date.now() - 1000 * 60 * 19),
  },
  {
    id: "9",
    role: "assistant",
    content: `Responsive design involves several strategies:

**Breakpoints**: Use media queries or CSS utilities to adjust layout at different screen sizes. Common breakpoints are 768px for tablets and 1024px for desktops.

**Flexible Layouts**: Use flexbox and grid layouts that adapt to available space.

**Touch Targets**: On mobile, ensure buttons are at least 44x44px for easy tapping.

**Overflow Handling**: Make sure scrollable areas work well on both desktop and mobile.

**Progressive Enhancement**: Start with a mobile-first approach, then enhance for larger screens.`,
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
  },
  {
    id: "10",
    role: "user",
    content: "Perfect! This is very helpful.",
    timestamp: new Date(Date.now() - 1000 * 60 * 16),
  },
];

export function ChatMessages({ emptyState, messages, onMessageAction }: ChatMessagesProps) {
  const resolvedMessages = messages ?? sampleMessages;

  if (emptyState && resolvedMessages.length === 0) {
    return <div className="flex min-h-0 flex-1 flex-col bg-background">{emptyState}</div>;
  }

  return (
    <div className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {resolvedMessages.map((message, index) => (
          <div key={message.id ?? index} className="group">
            {message.role === "assistant" ? (
              <div className="flex gap-3">
                <div className="mt-1">
                  <IconOpenAILogo className="size-6 text-foreground/80" />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="text-body-medium font-normal text-foreground whitespace-pre-wrap">
                    {message.content}
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 hover:bg-secondary rounded-md transition-colors"
                      title="Copy"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(message.content);
                        } catch (error) {
                          console.warn("Failed to copy to clipboard:", error);
                        } finally {
                          onMessageAction?.("copy", message);
                        }
                      }}
                    >
                      <Copy className="size-5" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-secondary rounded-md transition-colors"
                      title="Good response"
                      onClick={() => onMessageAction?.("thumbs-up", message)}
                    >
                      <ThumbsUp className="size-5" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-secondary rounded-md transition-colors"
                      title="Bad response"
                      onClick={() => onMessageAction?.("thumbs-down", message)}
                    >
                      <ThumbsDown className="size-5" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-secondary rounded-md transition-colors"
                      title="Share"
                      onClick={() => onMessageAction?.("share", message)}
                    >
                      <Share className="size-5" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-secondary rounded-md transition-colors"
                      title="Regenerate"
                      onClick={() => onMessageAction?.("regenerate", message)}
                    >
                      <RefreshCw className="size-5" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-secondary rounded-md transition-colors"
                      title="More"
                      onClick={() => onMessageAction?.("more", message)}
                    >
                      <MoreHorizontal className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="flex items-start gap-2 max-w-[70%]">
                  <div className="bg-[var(--accent-green)] text-accent-foreground text-body-medium font-normal rounded-[20px] px-4 py-6">
                    {message.content}
                  </div>
                  <div className="mt-1">
                    <IconUser className="size-6 text-foreground/70" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(message.content);
                        } catch (error) {
                          console.warn("Failed to copy to clipboard:", error);
                        } finally {
                          onMessageAction?.("copy", message);
                        }
                      }}
                      className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy"
                    >
                      <Copy className="size-3.5" />
                    </button>
                    <button
                      onClick={() => onMessageAction?.("edit", message)}
                      className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      title="Edit"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
