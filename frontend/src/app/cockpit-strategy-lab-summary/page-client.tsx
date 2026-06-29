"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitStrategyLabSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-strategy-lab-summary"
      workspaceLabel="Cockpit Strategy Lab Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="cockpit-strategy-lab-summary" />
    </CodexForgeAppShell>
  );
}
