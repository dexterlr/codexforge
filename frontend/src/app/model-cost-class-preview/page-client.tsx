"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelCostClassPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-cost-class-preview"
      workspaceLabel="Model Cost Class Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="model-cost-class-preview" />
    </CodexForgeAppShell>
  );
}
