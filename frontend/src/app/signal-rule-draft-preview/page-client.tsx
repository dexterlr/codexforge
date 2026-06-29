"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SignalRuleDraftPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/signal-rule-draft-preview"
      workspaceLabel="Signal Rule Draft Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="signal-rule-draft-preview" />
    </CodexForgeAppShell>
  );
}
