"use client";

import { ModelRouterV2RoutePanel } from "@/lib/codexforge/model-router-v2/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitModelRouterSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-model-router-summary"
      workspaceLabel="Cockpit Model Router Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterV2RoutePanel routeSlug="cockpit-model-router-summary" />
    </CodexForgeAppShell>
  );
}
