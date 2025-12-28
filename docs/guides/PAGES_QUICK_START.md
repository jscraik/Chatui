# Pages Quick Start Guide

## 🚀 Add a New Page in 5 Minutes

### Simple App Page (Most Common)

1. **Create the page file:**

```bash
# Create: apps/web/src/pages/MyPage.tsx
```

1. **Use this template:**

```tsx
import { Button, Card, IconButton } from "@chatui/ui";
import type { Route } from "../Router";

interface MyPageProps {
  onNavigate: (route: Route) => void;
}

export function MyPage({ onNavigate }: MyPageProps) {
  return (
    <div className="min-h-screen bg-[var(--foundation-bg-dark-1)]">
      <div className="border-b border-white/10 bg-[var(--foundation-bg-dark-2)]">
        <div className="flex items-center gap-3 p-4">
          <IconButton
            icon={<span>←</span>}
            onClick={() => onNavigate("chat")}
            title="Back to Chat"
            variant="ghost"
          />
          <h1 className="text-xl font-semibold text-white">My Page</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Welcome to My Page</h2>
          <p className="text-white/80">Add your content here!</p>
        </Card>
      </div>
    </div>
  );
}
```

1. **Add to Router (apps/web/src/Router.tsx):**

```tsx
// Add to Route type
export type Route =
  | "chat" | "harness" | "settings" | "profile" | "about"
  | "mypage";  // ← Add this

// Add to URL parsing (in useState initializer)
if (path === "/mypage") return "mypage";

// Add to renderPage() switch
case "mypage":
  return <MyPage onNavigate={navigate} />;

// Add to handlePopState
else if (path === "/mypage") setCurrentRoute("mypage");
```

1. **Navigate to your page:**

```tsx
<Button onClick={() => onNavigate("mypage")}>Go to My Page</Button>
```

1. **Test it:**

```bash
pnpm dev
# Visit: http://localhost:5176/mypage
```

## 🎯 Current Working Examples

- **Settings**: <http://localhost:5176/settings>
- **Profile**: <http://localhost:5176/profile>
- **About**: <http://localhost:5176/about>
- **Dashboard** (Storybook): Pages/DashboardPage

## 📚 Full Documentation

See `.kiro/steering/page-development.md` for complete patterns and advanced usage.

## 🔧 Need Help?

The steering system will automatically guide agents to follow these patterns when working with pages!
