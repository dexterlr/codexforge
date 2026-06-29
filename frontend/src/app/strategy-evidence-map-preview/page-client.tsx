"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function StrategyEvidenceMapPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/strategy-evidence-map-preview"
      workspaceLabel="Strategy Evidence Map Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="strategy-evidence-map-preview" />
    </CodexForgeAppShell>
  );
}
