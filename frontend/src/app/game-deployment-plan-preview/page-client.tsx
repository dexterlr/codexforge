"use client";

import { GameDeploymentPlanPreviewPanel } from "@/lib/codexforge/game-deployment-plan-preview/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameDeploymentPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-deployment-plan-preview"
      workspaceLabel="Game Deployment Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameDeploymentPlanPreviewPanel />
    </CodexForgeAppShell>
  );
}