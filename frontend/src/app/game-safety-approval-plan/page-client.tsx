"use client";

import { GameSafetyApprovalPlanPanel } from "@/lib/codexforge/game-safety-approval-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameSafetyApprovalPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-safety-approval-plan"
      workspaceLabel="Game Safety Approval Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameSafetyApprovalPlanPanel />
    </CodexForgeAppShell>
  );
}