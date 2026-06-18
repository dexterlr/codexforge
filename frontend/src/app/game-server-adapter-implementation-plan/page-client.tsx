"use client";

import { GameServerAdapterImplementationPlanPanel } from "@/lib/codexforge/game-server-adapter-implementation-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameServerAdapterImplementationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-server-adapter-implementation-plan"
      workspaceLabel="Game Server Adapter Implementation Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerAdapterImplementationPlanPanel />
    </CodexForgeAppShell>
  );
}
