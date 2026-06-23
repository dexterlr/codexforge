"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelPrivacyClassPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-privacy-class-preview"
      workspaceLabel="Model Privacy Class Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="model-privacy-class-preview" />
    </CodexForgeAppShell>
  );
}
