"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PositionSizingConceptPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/position-sizing-concept-preview"
      workspaceLabel="Position Sizing Concept Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="position-sizing-concept-preview" />
    </CodexForgeAppShell>
  );
}
