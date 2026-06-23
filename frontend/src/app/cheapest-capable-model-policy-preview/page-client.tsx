"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CheapestCapableModelPolicyPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cheapest-capable-model-policy-preview"
      workspaceLabel="Cheapest Capable Model Policy Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="cheapest-capable-model-policy-preview" />
    </CodexForgeAppShell>
  );
}
