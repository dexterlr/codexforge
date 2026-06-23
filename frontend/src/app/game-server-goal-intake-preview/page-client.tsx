"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameServerGoalIntakePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-server-goal-intake-preview"
      workspaceLabel="Game Server Goal Intake Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="game-server-goal-intake-preview" />
    </CodexForgeAppShell>
  );
}
