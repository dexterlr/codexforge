"use client";

import { LocalModelBridgeRoutePanel } from "@/lib/codexforge/local-model-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitLocalModelBridgeSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-local-model-bridge-summary"
      workspaceLabel="Cockpit Local Model Bridge Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelBridgeRoutePanel routeSlug="cockpit-local-model-bridge-summary" />
    </CodexForgeAppShell>
  );
}
