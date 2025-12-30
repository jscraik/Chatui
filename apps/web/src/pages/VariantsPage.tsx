import { Button, IconButton } from "@chatui/ui";
import { ChatVariantsTemplate } from "@chatui/ui/templates";

import type { Route } from "../Router";

interface VariantsPageProps {
  onNavigate: (route: Route) => void;
}

export function VariantsPage({ onNavigate }: VariantsPageProps) {
  return (
    <ChatVariantsTemplate
      headerLeading={
        <IconButton
          icon={<span>←</span>}
          onClick={() => onNavigate("chat")}
          title="Back to Chat"
          variant="ghost"
        />
      }
      headerActions={
        <Button size="sm" variant="outline" onClick={() => onNavigate("templates")}>
          Templates
        </Button>
      }
    />
  );
}
