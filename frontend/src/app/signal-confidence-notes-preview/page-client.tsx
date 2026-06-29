"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SignalConfidenceNotesPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/signal-confidence-notes-preview"
      workspaceLabel="Signal Confidence Notes Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="signal-confidence-notes-preview" />
    </CodexForgeAppShell>
  );
}
