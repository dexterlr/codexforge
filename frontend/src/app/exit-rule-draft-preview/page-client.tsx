"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ExitRuleDraftPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/exit-rule-draft-preview"
      workspaceLabel="Exit Rule Draft Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="exit-rule-draft-preview" />
    </CodexForgeAppShell>
  );
}
