"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function StrategyHypothesisPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/strategy-hypothesis-preview"
      workspaceLabel="Strategy Hypothesis Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="strategy-hypothesis-preview" />
    </CodexForgeAppShell>
  );
}
