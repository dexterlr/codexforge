"use client";

import { GameServerPlanPreviewPanel } from "@/lib/codexforge/game-server-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameServerPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-server-plan-preview"
      workspaceLabel="Game Server Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}