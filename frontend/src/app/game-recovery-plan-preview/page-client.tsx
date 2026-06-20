"use client";

import { GameRecoveryPlanPreviewPanel } from "@/lib/codexforge/game-recovery-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameRecoveryPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-recovery-plan-preview"
      workspaceLabel="Game Recovery Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameRecoveryPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}