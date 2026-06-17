"use client";

import { GameServerWorkflowProfilePanel } from "@/lib/codexforge/game-server-workflow-profile/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameServerWorkflowProfilePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-server-workflow-profile"
      workspaceLabel="Game Server Workflow Profile"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerWorkflowProfilePanel />
    </CodexForgeAppShell>
  );
}
