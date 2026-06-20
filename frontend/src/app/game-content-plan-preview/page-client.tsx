"use client";

import { GameContentPlanPreviewPanel } from "@/lib/codexforge/game-content-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameContentPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-content-plan-preview"
      workspaceLabel="Game Content Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameContentPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}