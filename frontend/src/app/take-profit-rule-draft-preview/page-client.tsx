"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TakeProfitRuleDraftPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/take-profit-rule-draft-preview"
      workspaceLabel="Take Profit Rule Draft Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="take-profit-rule-draft-preview" />
    </CodexForgeAppShell>
  );
}
