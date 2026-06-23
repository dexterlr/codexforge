"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterV2BoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-v2-boundary"
      workspaceLabel="Model Router v2 Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="model-router-v2-boundary" />
    </CodexForgeAppShell>
  );
}
