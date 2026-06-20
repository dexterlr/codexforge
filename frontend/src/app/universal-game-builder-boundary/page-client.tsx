"use client";

import { UniversalGameBuilderBoundaryPanel } from "@/lib/codexforge/universal-game-builder-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalGameBuilderBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-game-builder-boundary"
      workspaceLabel="Universal Game Builder Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalGameBuilderBoundaryPanel />
    </CodexForgeAppShell>
  );
}