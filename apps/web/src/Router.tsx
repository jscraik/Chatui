import { lazy, Suspense, useCallback, useEffect, useState } from "react";

import {
  sampleChatHistory,
  sampleMessages,
  sampleModels,
  sampleProjects,
  sampleUser,
} from "./sample-data";

const ChatUIRoot = lazy(() => import("@chatui/ui").then((mod) => ({ default: mod.ChatUIRoot })));
const WidgetHarness = lazy(() =>
  import("./WidgetHarness").then((mod) => ({ default: mod.WidgetHarness })),
);
const AboutPage = lazy(() => import("./pages/AboutPage").then((mod) => ({ default: mod.AboutPage })));
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((mod) => ({ default: mod.ProfilePage })),
);
const SettingsPage = lazy(() =>
  import("./pages/SettingsPage").then((mod) => ({ default: mod.SettingsPage })),
);
const TemplatesPage = lazy(() =>
  import("./pages/TemplatesPage").then((mod) => ({ default: mod.TemplatesPage })),
);
const VariantsPage = lazy(() =>
  import("./pages/VariantsPage").then((mod) => ({ default: mod.VariantsPage })),
);

export type Route =
  | "chat"
  | "harness"
  | "settings"
  | "profile"
  | "about"
  | "templates"
  | "variants";

interface RouterProps {
  initialRoute?: Route;
}

export function Router({ initialRoute }: RouterProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>(() => {
    if (initialRoute) return initialRoute;

    // Parse route from URL
    const path = window.location.pathname;
    const search = window.location.search;

    if (path === "/harness" || search.includes("harness=true")) return "harness";
    if (path === "/settings") return "settings";
    if (path === "/profile") return "profile";
    if (path === "/about") return "about";
    if (path === "/templates") return "templates";
    if (path === "/variants") return "variants";

    return "chat";
  });

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/settings") setCurrentRoute("settings");
      else if (path === "/profile") setCurrentRoute("profile");
      else if (path === "/about") setCurrentRoute("about");
      else if (path === "/harness") setCurrentRoute("harness");
      else if (path === "/templates") setCurrentRoute("templates");
      else if (path === "/variants") setCurrentRoute("variants");
      else setCurrentRoute("chat");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Navigation function
  const navigate = useCallback((route: Route) => {
    setCurrentRoute(route);

    // Update URL without page reload
    const url = route === "chat" ? "/" : `/${route}`;
    window.history.pushState({}, "", url);
  }, []);

  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const detail = (event as CustomEvent<Route>).detail;
      if (!detail) return;
      navigate(detail);
    };

    window.addEventListener("navigate", handleNavigate);
    return () => window.removeEventListener("navigate", handleNavigate);
  }, [navigate]);

  // Render current page
  const renderPage = () => {
    switch (currentRoute) {
      case "harness":
        return <WidgetHarness />;
      case "settings":
        return <SettingsPage onNavigate={navigate} />;
      case "profile":
        return <ProfilePage onNavigate={navigate} />;
      case "about":
        return <AboutPage onNavigate={navigate} />;
      case "templates":
        return <TemplatesPage onNavigate={navigate} />;
      case "variants":
        return <VariantsPage onNavigate={navigate} />;
      case "chat":
      default:
        return (
          <ChatUIRoot
            models={sampleModels}
            messages={sampleMessages}
            projects={sampleProjects}
            chatHistory={sampleChatHistory}
            user={sampleUser}
          />
        );
    }
  };

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-foundation-bg-light-1 dark:bg-foundation-bg-dark-1 text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary p-6">
          Loading…
        </div>
      }
    >
      {renderPage()}
    </Suspense>
  );
}

// Navigation hook for components
export function useNavigation() {
  const navigate = (route: Route) => {
    window.dispatchEvent(new CustomEvent("navigate", { detail: route }));
  };

  return { navigate };
}
