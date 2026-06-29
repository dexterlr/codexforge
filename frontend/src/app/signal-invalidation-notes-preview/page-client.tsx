"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SignalInvalidationNotesPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/signal-invalidation-notes-preview"
      workspaceLabel="Signal Invalidation Notes Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="signal-invalidation-notes-preview" />
    </CodexForgeAppShell>
  );
}
