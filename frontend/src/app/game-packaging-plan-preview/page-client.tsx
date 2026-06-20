"use client";

import { GamePackagingPlanPreviewPanel } from "@/lib/codexforge/game-packaging-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GamePackagingPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-packaging-plan-preview"
      workspaceLabel="Game Packaging Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GamePackagingPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}