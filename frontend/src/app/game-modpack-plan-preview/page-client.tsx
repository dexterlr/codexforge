"use client";

import { GameModpackPlanPreviewPanel } from "@/lib/codexforge/game-modpack-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameModpackPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-modpack-plan-preview"
      workspaceLabel="Game Modpack Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameModpackPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}