"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelFallbackRoutePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-fallback-route-preview"
      workspaceLabel="Model Fallback Route Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="model-fallback-route-preview" />
    </CodexForgeAppShell>
  );
}
