"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function StopLossRuleDraftPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/stop-loss-rule-draft-preview"
      workspaceLabel="Stop Loss Rule Draft Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="stop-loss-rule-draft-preview" />
    </CodexForgeAppShell>
  );
}
